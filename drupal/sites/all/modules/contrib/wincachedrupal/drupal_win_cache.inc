<?php

/**
 * @file
 * This integrates the drupal WinCache backend.
 */

/**
 * Win cache implementation.
 *
 * This is Drupal's win cache implementation. It uses Wincache
 * to store cached data. Each cache bin corresponds to a prefix of
 * the wincache variables with the same name. The name of this class
 * is DrupalWinCache instead of WinCacheDrupal for historical reasons
 * and backwards compatibility.
 */
class DrupalWinCache implements DrupalCacheInterface {

  /**
   * Test info is loaded at database bootstrap phase
   * but this cache can be used earlier. Make sure
   * we have a valid test prefix before any operation on
   * the cache is performed.
   *
   * @var string
   */
  private static $test_run_id;
  
  /**
   * Add test prefix to current binary key.
   *
   * @param string $prefix 
   */
  private static function AddTestPrefix(&$prefix) {
    // Try with the "official" test_run_id first.
    if (isset($GLOBALS['drupal_test_info']['test_run_id'])) {
      $prefix .= $GLOBALS['drupal_test_info']['test_run_id'];
      return;
    }
    // Try with the locally detected version.
    if (isset(static::$test_run_id)) {
      $prefix .= static::$test_run_id;
      return;
    }
  }

  /**
   * Name of current binary
   *
   * @var mixed
   */
  protected $bin;

  /**
   * The constructor.
   *
   * @param string $bin
   *   The bin parameter.
   */
  public function __construct($bin) {
    $this->bin = $bin;
    
    // If page_cache_without_database is enabled, we have to manually load the
    // $conf array out of cache_bootstrap.
    static $variables_loaded = FALSE;
    // NOTE: We don't call drupal_get_bootstrap_phase() because this would
    // break all 7.x Drupal installations prior to 7.33. For more information
    // see https://www.drupal.org/node/667098.
    if (!$variables_loaded && drupal_bootstrap(NULL, FALSE) < DRUPAL_BOOTSTRAP_VARIABLES) {
      // This cache can be used so early in the bootstrap that even testing environment has
      // not been initialized yet.... do so now otherwise caches between test environment
      // and regular environment can get mixed up.
      if ($test_prefix = drupal_valid_test_ua()) {
        // Keep a local copy of the current test_prefix.
        static::$test_run_id = $test_prefix;
      }
      // Now time to load the variables.
      global $conf;
      $variables_loaded = TRUE;
      // Try loading variables from cache. If that fails, we have to bootstrap
      // further in order to fetch them.
      if ($cached = cache_get('variables', 'cache_bootstrap')) {
        $variables = $cached->data;
        // Make sure variable overrides are applied, see variable_initialize().
        foreach ($conf as $name => $value) {
          $variables[$name] = $value;
        }
        $conf = $variables;
      }
      else {
        drupal_bootstrap(DRUPAL_BOOTSTRAP_VARIABLES, FALSE);
      }
    }
  }
  
  /**
   * Function which retrieves the safe key for the cache bin.
   *
   * @return string
   *   The safe WinCache key.
   */
  protected function binKey() {
    // This method used to generate a key depending on $SERVER['HOST']
    // but was refactored to align it to Memcache behaviour.
    // @see https://www.drupal.org/node/2426825
    $prefix = '';
    if ($prefix = $this->variable_get('wincache_key_prefix', '')) {
      $prefix .= '|';
    }
    // When simpletest is running, emulate the simpletest database prefix here
    // to avoid the child site setting cache entries in the parent site (or the other way round).
    static::AddTestPrefix($prefix);
    return $prefix . $this->bin . '|';
  }

  /**
   * Function which retrieves the safe key for the cache cid.
   *
   * @param string $cid
   *   The cache id.
   *
   * @return string
   *   The safe WinCache key.
   */
  protected function key($cid) {
    return $this->binKey() . $cid;
  }

  /**
   * Function which retrieves a cached item.
   *
   * @param string $cid
   *   The cache id.
   *
   * @return string
   *   The cached item.
   */
  public function get($cid) {
    // Garbage collection necessary when enforcing a minimum cache lifetime.
    $this->garbageCollection();

    $success = FALSE;

    // Fetch the data.
    $cache = wincache_ucache_get($this->key($cid), $success);

    // Should return FALSE on failure.
    if ($success === FALSE) {
      return FALSE;
    }

    // Return the prepared item.
    return $this->prepareItem($cache);
  }

  /**
   * Prepare a cached item.
   *
   * Checks that items are either permanent or did not expire, and unserializes
   * data as appropriate.
   *
   * @param mixed $cache
   *   An item loaded from cache_get() or cache_get_multiple().
   *
   * @return string
   *   The item with data unserialized as appropriate or FALSE if there is no
   *   valid item to load.
   */
  protected function prepareItem($cache) {
    global $user;

    if (!property_exists($cache, 'data')) {
      return FALSE;
    }

    // If the data is permanent or we are not enforcing a minimum cache lifetime
    // always return the cached data.
    if ($cache->expire == CACHE_PERMANENT || !$this->variable_get('cache_lifetime', 0)) {
      if ($cache->serialized) {
        $cache->data = unserialize($cache->data);
      }
    }

    /*
    If enforcing a minimum cache lifetime, validate that the data is
    currently valid for this user before we return it by making sure
    the cache entry was created before the timestamp in the current
    session's cache timer. The cache variable is loaded into the $user
    object by _drupal_session_read()
    in session.inc. If the data is permanent or we're not enforcing a
    minimum cache lifetime always return the cached data.
     */
    // $user can be NULL if trying to access a cache item before session has been bootstraped.
    if ($cache->expire != CACHE_PERMANENT && $this->variable_get('cache_lifetime', 0) && $user) {
      if(isset($_SESSION['cache_expiration'][$this->binKey()]) && $_SESSION['cache_expiration'][$this->binKey()] > $cache->created_microtime) {
        // This cache data is too old and thus not valid for us, ignore it.
        return FALSE;
      }
    }

    if (isset($cache->headers)) {
      $cache->headers = unserialize($cache->headers);
    }

    return $cache;
  }

  /**
   * Get multiple cached items.
   *
   * @param array &$cids
   *   The array of keys.
   *
   * @return array
   *   The array of cached items.
   */
  public function getMultiple(&$cids) {
    // If requesting no $cids return empty array.
    // Otherwise warnings are triggered.
    if (empty($cids)) {
      return array();
    }

    // Garbage collection necessary when enforcing a minimum cache lifetime.
    $this->garbageCollection();

    // We need to search the cache with the proper keys and
    // be able to get the original $cid back.
    $keys = array();
    foreach ($cids as $cid) {
      $keys[$this->key($cid)] = $cid;
    }

    $success = FALSE;
    $fetch = wincache_ucache_get(array_keys($keys), $success);
    $cache = array();
    if ($success === TRUE) {
      foreach ($fetch as $key => $data) {
        // Prepare item can return false if the item has expired.
        if($item = $this->prepareItem($fetch[$key])) {
          $cache[$keys[$key]] = $item;
        }
      }
    }

    unset($fetch);
    $cids = array_diff($cids, array_keys($cache));
    return $cache;
  }

  /**
   * Garbage collection for get and getMultiple methods.
   */
  protected function garbageCollection() {
    // We need a flag to prevent garbage collection from being
    // called during garbage collection itself for the same binary.
    static $running = array();
    // Garbage collection necessary when enforcing a minimum cache lifetime.
    $cache_flush = $this->variable_get('cache_flush_' . $this->bin, 0);
    if (!isset($running[$this->bin]) && $cache_flush && ($cache_flush + $this->variable_get('cache_lifetime', 0) <= REQUEST_TIME)) {
      $running[$this->bin] = TRUE;
      // Reset the variable immediately to prevent a meltdown in
      // heavy load situations. If we are clearing the variables
      // binary then doing a variable set will trigger and endless loop.
      $this->variable_set('cache_flush_' . $this->bin, 0);
      // Time to flush old cache data.
      $this->clearTemporary();
      unset($running[$this->bin]);
    }
  }

  /**
   * Set an item in the cache.
   *
   * @param string $cid
   *   The key of the data to be cached.
   *
   * @param string $data
   *   The data to be cached.
   *
   * @param string $expire
   *   The expire mode.
   *
   * @param array $headers
   *   The headers.
   */
  public function set($cid, $data, $expire = CACHE_PERMANENT, array $headers = NULL) {

    $created_microtime = round(microtime(TRUE), 3);
    // Create new cache object.
    $cache = new stdClass();
    $cache->cid = $cid;
    $cache->serialized = 0;
    $cache->created = REQUEST_TIME;
    $cache->created_microtime = $created_microtime;
    $cache->expire = $expire;
    $cache->headers = isset($headers) ? serialize($headers) : NULL;

    if (is_object($data)) {
      $cache->serialized = 1;
      $cache->data = serialize($data);
    }
    else {
      $cache->data = $data;
    }

    // What kind of expiration is being used.
    switch ($expire) {
      case CACHE_PERMANENT:
        $set_result = wincache_ucache_set($this->key($cid), $cache);
        break;

      case CACHE_TEMPORARY:
        $cache_lifetime = $this->variable_get('cache_lifetime', 0);
        $set_result = wincache_ucache_set($this->key($cid), $cache, $cache_lifetime);
        break;

      default:
        // Ensure that timeout is at least 1 s.
        $timeout = (int) max($expire - time(), 1);
        $set_result = wincache_ucache_set($this->key($cid), $cache, $timeout);
        break;
    }
    return $set_result;
  }
  
  /**
   * Adds a variable in user cache only if variable does not already exist in the cache.
   *
   * @param string $cid
   *   The key of the data to be cached.
   *
   * @param string $data
   *   The data to be cached.
   *
   * @param string $expire
   *   The expire mode.
   *
   * @param array $headers
   *   The headers.
   */
  public function add($cid, $data, $expire = CACHE_PERMANENT, array $headers = NULL) {
    $created_microtime = round(microtime(TRUE), 3);
    // Create new cache object.
    $cache = new stdClass();
    $cache->cid = $cid;
    $cache->serialized = 0;
    $cache->created = REQUEST_TIME;
    $cache->created_microtime = $created_microtime;
    $cache->expire = $expire;
    $cache->headers = isset($headers) ? serialize($headers) : NULL;

    if (is_object($data)) {
      $cache->serialized = 1;
      $cache->data = serialize($data);
    }
    else {
      $cache->data = $data;
    }
    set_error_handler(function() { /* Prevent Drupal from logging any exceptions or warning thrown here */ }, E_ALL);
    // What kind of expiration is being used.
    switch ($expire) {
      case CACHE_PERMANENT:
        $set_result = @wincache_ucache_add($this->key($cid), $cache);
        break;
      case CACHE_TEMPORARY:
        $cache_lifetime = $this->variable_get('cache_lifetime', 0);
        $set_result = @wincache_ucache_add($this->key($cid), $cache, $cache_lifetime);
        break;
      default:
        // Ensure that timeout is at least 1 s.
        $timeout = (int) max($expire - time(), 1);
        $set_result = @wincache_ucache_add($this->key($cid), $cache, $timeout);
        break;
    }
    restore_error_handler();
    return $set_result;
  }

  /**
   * Clear all cache items that were stored
   * using the CACHE_TEMPORARY mode.
   */
  public function clearTemporary() {
    // This can be slow with big caches, prevent race.
    $binkey = $this->binKey();
    if ((!$this->lockInit()) || lock_acquire('wincache_clear_temporary_' . $binkey) === FALSE) {
      return;
    }
    // Retrieve list of all cached items.
    $data = wincache_ucache_info();
    $keys = array();
    $items = array_column($data['ucache_entries'], 'key_name');
    $matches = preg_grep('/^' . preg_quote($binkey) . '/', $items);
    foreach($matches as $key) {
      $cache = wincache_ucache_get($key);
      if ($cache && $cache->expire == CACHE_TEMPORARY) {
        $keys[] = $key;
      }
    }
    // Only bother wincache if something is to be cleared.
    if (!empty($keys)) {
      wincache_ucache_delete($keys);
    }
    lock_release('wincache_clear_temporary_' . $binkey);
    // TODO: Probably nice to log something on failure, including
    // the list of failing cache keys.
  }

  /**
   * Remove an item from the cache.
   *
   * @param string $cid
   *   The key of the data to be removed.
   *
   * @param string $wildcard
   *   The wildcard.
   */
  public function clear($cid = NULL, $wildcard = FALSE) {
    global $user;

    if (empty($cid)) {
      if ($this->variable_get('cache_lifetime', 0)) {
        // We store the time in the current user's $user->cache variable which
        // will be saved into the sessions bin by _drupal_session_write(). We
        // then simulate that the cache was flushed for this user by not
        // returning cached data that was cached before the timestamp.
        // Eliminate $user->cache and {session}.cache in favor of
        // $_SESSION['cache_expiration'][$bin] (Performance).
        if(empty($_SESSION['cache_expiration'])) {
          $_SESSION['cache_expiration'] = array();
        }
        $_SESSION['cache_expiration'][$this->binKey()] = round(microtime(TRUE), 3);

        $cache_flush = $this->variable_get('cache_flush_' . $this->bin, 0);
        if ($cache_flush == 0) {
          // This is the first request to clear the cache, start a timer.
          $this->variable_set('cache_flush_' . $this->bin, REQUEST_TIME);
        }
        elseif (REQUEST_TIME > ($cache_flush + $this->variable_get('cache_lifetime', 0))) {
          // Clear the cache for everyone, cache_lifetime seconds have
          // passed since the first request to clear the cache.
          $this->clearTemporary();
          $this->variable_set('cache_flush_' . $this->bin, 0);
        }
      }
      else {
        $this->clearTemporary();
      }
    }
    else {
      $keys = array();
      if ($wildcard) {
        $data = wincache_ucache_info();
        $prefix = NULL;
        if ($cid == '*') {
          $prefix = $this->binKey();
        }
        else {
          $prefix = $this->key($cid);
        }
        $k = array_column($data['ucache_entries'], 'key_name');
        $keys = preg_grep('/^' . preg_quote($prefix) . '/', $k);
      }
      elseif (is_array($cid)) {
        foreach ($cid as $delete_cid) {
          $keys[] = $this->key($delete_cid);
        }
      }
      else {
        $keys[] = $this->key($cid);
      }
      // Delete all items at once.
      wincache_ucache_delete($keys);
    }
  }

  /**
   * Checks cache is empty.
   *
   * @return bool
   *   TRUE if empty FALSE otherwise.
   */
  public function isEmpty() {
    $data = wincache_ucache_info();
    $items = array_column($data['ucache_entries'], 'key_name');
    $matches = preg_grep('/^' . preg_quote($this->binKey()) . '/', $items);
    return empty($matches);
  }
  
  /**
   * variable_get wrapper.
   */
  private function variable_get($name, $default = NULL) {
    return variable_get($name, $default);
  }
  
  /**
   * Re-implementation of variable_set() that writes through instead of clearing.
   *
   * Taken from memcache.inc
   */
  private function variable_set($name, $value) {
    global $conf;
    
    // We need to have at least bootstrapped up to Database.
    if (drupal_bootstrap(NULL, FALSE) < DRUPAL_BOOTSTRAP_DATABASE) {
      drupal_bootstrap(DRUPAL_BOOTSTRAP_DATABASE, FALSE);
    }

    // When lots of writes happen in a short period of time db_merge can throw
    // errors. This should only happen if another request has written the variable
    // first, so we catch the error to prevent a fatal error.
    try {
      db_merge('variable')
        ->key(array('name' => $name))
        ->fields(array('value' => serialize($value)))
        ->execute();
    }
    catch (Exception $e) {
      // We can safely ignore the error, since it's likely a cache flush timestamp
      // which should still be accurate.
    }

    // If the variables are cached, get a fresh copy, update with the new value
    // and set it again.
    if ($cached = cache_get('variables', 'cache_bootstrap')) {
      $variables = $cached->data;
      $variables[$name] = $value;
      cache_set('variables', $variables, 'cache_bootstrap');
    }
    // If the variables aren't cached, there's no need to do anything.
    $conf[$name] = $value;
  }
  
  /**
   * Helper function to load locking framework if not already loaded.
   *
   * Taken from memache.inc
   *
   * @return bool
   *   Whether the locking system was initialized successfully. This must always
   *   return TRUE or throw an exception.
   */
  public function lockInit() {
    // On a cache miss when page_cache_without_database is enabled, we can end
    // up here without the lock system being initialized. Bootstrap drupal far
    // enough to load the lock system.
    if (!function_exists('lock_acquire')) {
      drupal_bootstrap(DRUPAL_BOOTSTRAP_VARIABLES, FALSE);
    }

    if (!function_exists('lock_acquire')) {
      // Bootstrap failed, log error.
      register_shutdown_function('watchdog', 'memcache', 'Bootstrap failed in lockInit(), lock_acquire() is not available. (phase:!phase)', array('!phase' => drupal_get_bootstrap_phase()), WATCHDOG_ERROR);
      return FALSE;
    }

    return TRUE;
  }
  
}
