<?php

/**
 * Defines a backend with a fast and a consistent backend chain.
 *
 * In order to mitigate a network roundtrip for each cache get operation, this
 * cache allows a fast backend to be put in front of a slow(er) backend.
 * Typically the fast backend will be something like APCu, and be bound to a
 * single web node, and will not require a network round trip to fetch a cache
 * item. The fast backend will also typically be inconsistent (will only see
 * changes from one web node). The slower backend will be something like Mysql,
 * Memcached or Redis, and will be used by all web nodes, thus making it
 * consistent, but also require a network round trip for each cache get.
 *
 * In addition to being useful for sites running on multiple web nodes, this
 * backend can also be useful for sites running on a single web node where the
 * fast backend (e.g., APCu) isn't shareable between the web and CLI processes.
 * Single-node configurations that don't have that limitation can just use the
 * fast cache backend directly.
 *
 * We always use the fast backend when reading (get()) entries from cache, but
 * check whether they were created before the last write (set()) to this
 * (chained) cache backend. Those cache entries that were created before the
 * last write are discarded, but we use their cache IDs to then read them from
 * the consistent (slower) cache backend instead; at the same time we update
 * the fast cache backend so that the next read will hit the faster backend
 * again. Hence we can guarantee that the cache entries we return are all
 * up-to-date, and maximally exploit the faster cache backend. This cache
 * backend uses and maintains a "last write timestamp" to determine which cache
 * entries should be discarded.
 *
 * Because this backend will mark all the cache entries in a bin as out-dated
 * for each write to a bin, it is best suited to bins with fewer changes.
 *
 * @ingroup cache
 */
class ChainedFastBackend implements DrupalCacheInterface {

  /**
   * Cache key prefix for the bin-specific entry to track the last write.
   */
  const LAST_WRITE_TIMESTAMP_PREFIX = 'last_write_timestamp_';

  /**
   * Identifier for the current webhead/process
   *
   * @var string
   */
  protected $headId;

  /**
   * @var string
   */
  protected $bin;

  /**
   * The consistent cache backend.
   *
   * @var DrupalCacheInterface
   */
  protected $consistentBackend;

  /**
   * The fast cache backend.
   *
   * @var DrupalCacheInterface
   */
  protected $fastBackend;

  /**
   * The time at which the last write to this cache bin happened.
   *
   * @var float|null
   */
  protected $lastWriteTimestamp;

  /**
   * Defer persisting to the end of the request.
   *
   * @var int
   */
  protected $last_invalidation = NULL;

  /**
   * Persist on shutdown.
   *
   * @var bool
   */
  protected $persistOnShutdown = NULL;

  /**
   * Generate or retrieve a key that identifies
   * the instance of the fastBackend.
   *
   * @return string
   */
  protected function GetHeadId() {
    // The headID is specific to a combination of Bin and Head
    // because the fastBackend instance here is already bin aware.
    if ($cache = $this->fastBackend->get('headid')) {
      return $cache->data;
    }

    // Generate a unique ID for this fast backend.
    $id = uniqid(microtime(TRUE), TRUE);
    $this->fastBackend->set('headid', $id);
    return $id;
  }

  /**
   * Constructs a ChainedFastBackend object.
   *
   * @param DrupalCacheInterface $consistent_backend
   *   The consistent cache backend.
   *
   * @param DrupalCacheInterface $fast_backend
   *   The fast cache backend.
   *
   * @param string $bin
   *   The cache bin for which the object is created.
   */
  public function __construct($bin) {
    global $conf;
    $this->consistentBackend = new $conf['consistentBackend']($bin);
    $this->fastBackend = new $conf['fastBackend']($bin);
    $this->headId = $this->GetHeadId();
    $this->bin = 'cache_' . $bin;
    $this->persistOnShutdown = TRUE;
    $this->lastWriteTimestamp = NULL;
  }

  /**
   * {@inheritdoc}
   */
  public function get($cid) {
    $cids = array($cid);
    $cache = $this->getMultiple($cids);
    return reset($cache);
  }

  /**
   * {@inheritdoc}
   */
  public function getMultiple(&$cids) {
    $cids_copy = $cids;
    $cache = array();

    // If we can determine the time at which the last write to the consistent
    // backend occurred (we might not be able to if it has been recently
    // flushed/restarted), then we can use that to validate items from the fast
    // backend, so try to get those first. Otherwise, we can't assume that
    // anything in the fast backend is valid, so don't even bother fetching
    // from there.
    $last_write_timestamp = $this->getLastWriteTimestamp();
    if ($last_write_timestamp) {
      // Items in the fast backend might be invalid based on their timestamp,
      // but we can't check the timestamp prior to getting the item, which
      // includes unserializing it. However, unserializing an invalid item can
      // throw an exception. For example, a __wakeup() implementation that
      // receives object properties containing references to code or data that
      // no longer exists in the application's current state.
      //
      // Unserializing invalid data, whether it throws an exception or not, is
      // a waste of time, but we only incur it while a cache invalidation has
      // not yet finished propagating to all the fast backend instances.
      //
      // Most cache backend implementations should not wrap their internal
      // get() implementations with a try/catch, because they have no reason to
      // assume that their data is invalid, and doing so would mask
      // unserialization errors of valid data. We do so here, only because the
      // fast backend is non-authoritative, and after discarding its
      // exceptions, we proceed to check the consistent (authoritative) backend
      // and allow exceptions from that to bubble up.
      try {
        $items = $this->fastBackend->getMultiple($cids);
      }
      catch (\Exception $e) {
        $cids = $cids_copy;
        $items = array();
      }

      // Even if items were successfully fetched from the fast backend, they
      // are potentially invalid if older than the last time the bin was
      // written to in the consistent backend, so only keep ones that aren't.
      foreach ($items as $item) {
        if ($item->created < $last_write_timestamp) {
          $cids[array_search($item->cid, $cids_copy)] = $item->cid;
        }
        else {
          $cache[$item->cid] = $item;
        }
      }
    }

    // If there were any cache entries that were not available in the fast
    // backend, retrieve them from the consistent backend and store them in the
    // fast one.
    if ($cids) {
      $missing = array();
      foreach ($this->consistentBackend->getMultiple($cids) as $item) {
        $cache[$item->cid] = $item;
        $missing[$item->cid] = (array) $item;
        $this->fastBackend->set($item->cid, $item->data, $item->expire);
      }
      // This means that the persistent backend has no lastWriteTimestamp
      // but we were able to retrieve data from it....
      if (!$last_write_timestamp && !empty($missing)) {
        $this->markAsOutdated();
      }
    }

    return $cache;
  }

  /**
   * {@inheritdoc}
   */
  public function set($cid, $data, $expire = Cache::PERMANENT) {
    $this->consistentBackend->set($cid, $data, $expire);
    $this->fastBackend->set($cid, $data, $expire);
    $this->markAsOutdated();
  }

  /**
   * {@inheritdoc}
   */
  public function setMultiple(array $items) {
    $this->consistentBackend->setMultiple($items);
    $this->fastBackend->setMultiple($items);
    $this->markAsOutdated();
  }

  /**
   * {@inheritdoc}
   */
  public function clear($cid = NULL, $wildcard = FALSE) {
    $this->consistentBackend->clear($cid, $wildcard);
    $this->fastBackend->clear($cid, $wildcard);
    $this->markAsOutdated();
  }

  /**
   * {@inheritdoc}
   */
  public function isEmpty() {
    return $this->consistentBackend->isEmpty();
  }

  /**
   * Gets the last write timestamp.
   */
  protected function getLastWriteTimestamp() {
    if ($this->lastWriteTimestamp === NULL) {
      $cache = $this->consistentBackend->get(self::LAST_WRITE_TIMESTAMP_PREFIX . $this->bin);
      if ($cache && $cache->data['head'] != $this->headId) {
        $this->lastWriteTimestamp = $cache->data['timestamp'];
      }
      else {
        // If this was a cache miss we need to inmediately write something to the persistent cache
        // because backends such as memcache with stampeede protection enabled will
        // issue a lock now that lasts until this is writen! We should not worry about marking
        // this as updated because if it was a cache miss, the whole binary whould be empty.
        if ($cache === FALSE) {
          $this->lastWriteTimestamp = 0;
          $this->markAsOutdated(TRUE);
        }
        // If we are here this means that either the binary has never been invalidated,
        // or that the last invalidation was actually made by ourselves so we retain
        // the previous invalidation timestamp that we had.
        $current = $cache && $cache->data['head'] == $this->headId ? $cache->data['timestamp'] : 0;
        $cache = $this->fastBackend->get(self::LAST_WRITE_TIMESTAMP_PREFIX . $this->bin);
        $this->lastWriteTimestamp = $cache && !empty($cache->data) ? $cache->data : $current;
      }
    }

    return $this->lastWriteTimestamp;
  }

  /**
   * Marks the fast cache bin as outdated because of a write.
   */
  protected function markAsOutdated($force = FALSE) {
    // Clocks on a single server can drift. Multiple servers may have slightly
    // differing opinions about the current time. Given that, do not assume
    // 'now' on this server is always later than our stored timestamp.
    // Also add 1 millisecond, to ensure that caches written earlier in the same
    // millisecond are invalidated. It is possible that caches will be later in
    // the same millisecond and are then incorrectly invalidated, but that only
    // costs one additional roundtrip to the persistent cache.
    $now = round(microtime(TRUE) + .001, 3);
    if ($force) {
      $this->doMarkAsOutdated($now);
    }
    elseif ($now > $this->getLastWriteTimestamp()) {
      if ($this->persistOnShutdown) {
        $this->last_invalidation = $now;
      }
      else {
        $this->doMarkAsOutdated($now);
      }
    }

  }

  /**
   * Does the actual marking as updated!
   *
   * @param int $now
   */
  protected function doMarkAsOutdated($now) {
    $this->fastBackend->set(self::LAST_WRITE_TIMESTAMP_PREFIX . $this->bin, $this->lastWriteTimestamp);
    $this->consistentBackend->set(self::LAST_WRITE_TIMESTAMP_PREFIX . $this->bin, array('head' => $this->headId, 'timestamp' => $now));
  }

  /**
   * Do the invalidation at the end of the request.
   */
  public function __destruct()  {
    if ($this->persistOnShutdown && $this->last_invalidation != NULL) {
      // Persistent backend usually rely on high levels of bootstrap
      // memcache up to Variables and database up to database
      drupal_bootstrap(DRUPAL_BOOTSTRAP_DATABASE);
      $this->doMarkAsOutdated($this->last_invalidation);
    }
  }

}
