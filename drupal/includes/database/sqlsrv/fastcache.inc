<?php

/**
 * @file
 * fastcache class.
 */

include_once 'fastcacheitem.inc';

/**
 * Static caching layer.
 *
 * Database layer for SQL Server
 * is very Regex intensive.
 * Cannot use a regultar cache
 * backend because the enormous number
 * of cache_get and cache_set calls
 * end up crashing memcache or wincache!
 * Here everything is statically managed
 * and sent to a real cache backend once
 * the request is over.
 */
class fastcache {

  // @var fastcacheitem[]  $fastcacheitems
  private static $fastcacheitems = array();

  // @var bool $enabled
  private static $enabled = NULL;

  // @var bool $shutdown_registered
  private static $shutdown_registered = FALSE;

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
   * Add test prefix to current binary key, and account for atomic
   * items where $bin = NULL;
   *
   * @param string $prefix
   */
  private static function FixKeyAndBin(&$cid, &$bin) {
    // We always need a binary, if non is specified, this item
    // should be treated as having it's own binary.
    if (empty($bin)) {
      $bin = $cid;
    }
    // Try with the "official" test_run_id first.
    if (isset($GLOBALS['drupal_test_info']['test_run_id'])) {
      $bin = $GLOBALS['drupal_test_info']['test_run_id'] . $bin;
      return;
    }
    // Only do this once per request, if the this is the testing system
    // then $GLOBALS['drupal_test_info']['test_run_id'] will be set upon
    // test context switching.
    if (!isset(static::$test_run_id)) {
      if ($test_prefix = drupal_valid_test_ua()) {
        // Keep a local copy of the current test_prefix.
        static::$test_run_id = $test_prefix;
      }
      else {
        static::$test_run_id = '';
      }
    }

    $bin = static::$test_run_id . $bin;
  }

  /**
   * Although the cache might be enabled, using locks
   * is optional. Only use locks when a fastck locking
   * backend is available, such as Wincache.
   */
  public static function UseLocks() {
    global $WINCACHE_LOCK_ACTIVE;
    return $WINCACHE_LOCK_ACTIVE;
  }

  /**
   * Tell if cache persistence is enabled. If not, this cache
   * will behave as DRUPAL_STATIC until the end of request.
   *
   * Only enable this cache if the backend is DrupalWinCache
   * and the lock implementation is DrupalWinCache
   */
  public static function Enabled($refresh = FALSE) {
    if (static::$enabled === NULL || $refresh) {
      // Make sure _cache_get_object exists, if fastache
      // used out of database driver there is a chance that
      // cache storage might not yet be initialized.
      if (function_exists('_cache_get_object')) {
        // If you only bootstrap to database the lock system is not yet started
        // but if locking is not database dependant (memcache or wincache) you can run
        // lock_initialize is ASAP.
        $lock_file = variable_get('lock_inc', 'includes/lock.inc');
        if ($lock_file != 'includes/lock.inc') {
          require_once DRUPAL_ROOT . '/' . $lock_file;
          lock_initialize();
        }
        // Only enabled storage if Cache Backend is DrupalWinCache or ChainedFastBackend.
        $object = _cache_get_object('fastcache');
        static::$enabled = (is_a($object, \DrupalWinCache::class) || is_a($object, \ChainedFastBackend::class));
      }
      else {
        static::$enabled = FALSE;
      }
    }
    return static::$enabled;
  }

  /**
   * cache_clear_all wrapper.
   */
  public static function cache_clear_all($cid = NULL, $bin = NULL, $wildcard = FALSE, $volatile = FALSE) {
    static::FixKeyAndBin($cid, $bin);
    if (!$volatile && !isset(static::$fastcacheitems[$bin])) {
      static::cache_load_ensure($bin, TRUE);
    }
    // If the cache did not exist, it will still not be loaded.
    if (isset(static::$fastcacheitems[$bin])) {
      static::$fastcacheitems[$bin]->clear($cid, $wildcard);
    }
  }

  /**
   * Ensure cache binary is statically loaded.
   */
  private static function cache_load_ensure($bin, $skiploadifempty = FALSE) {
    if (!isset(static::$fastcacheitems[$bin])) {
      // If storage is enabled, try to load from cache.
      if (static::Enabled()) {
        if ($cache = cache_get($bin, 'fastcache')) {
          static::$fastcacheitems[$bin] = new fastcacheitem($bin, $cache);
        }
        // Don't bother initializing this.
        elseif ($skiploadifempty) {
          return;
        }
      }
      // If still not set, initialize.
      if (!isset(static::$fastcacheitems[$bin])) {
        static::$fastcacheitems[$bin] = new fastcacheitem($bin);
      }
    }
  }

  /**
   * cache_get wrapper.
   */
  public static function cache_get($cid, $bin = NULL) {
    static::FixKeyAndBin($cid, $bin);
    static::cache_load_ensure($bin);
    return static::$fastcacheitems[$bin]->data_get($cid);
  }

  /**
   * cache_set wrapper.
   */
  public static function cache_set($cid, $data, $bin = NULL) {
    static::FixKeyAndBin($cid, $bin);
    static::cache_load_ensure($bin);
    if (static::$fastcacheitems[$bin]->changed == FALSE) {
      static::$fastcacheitems[$bin]->changed = TRUE;
      // Do not lock if this is an atomic binary ($cid = $bin).
      if ($cid === $bin) {
        static::$fastcacheitems[$bin]->persist = TRUE;
        static::$fastcacheitems[$bin]->locked = FALSE;
      }
      else {
        // Do persist or lock if it is not enabled!
        if (static::Enabled()) {
          // Hold this locks longer than usual because
          // they run after the request has finished.
          if (static::UseLocks()) {
            if (function_exists('lock_acquire') && lock_acquire('fastcache_' . $bin, 120)) {
              static::$fastcacheitems[$bin]->persist = TRUE;
              static::$fastcacheitems[$bin]->locked = TRUE;
            }
          }
          else {
            static::$fastcacheitems[$bin]->persist = TRUE;
          }
        }
      }
      // Register shutdown persistence once, only if enabled!
      if (static::$shutdown_registered == FALSE && static::Enabled()) {
        register_shutdown_function(array('fastcache','fastcache_persist'));
        static::$shutdown_registered = TRUE;
      }
    }
    static::$fastcacheitems[$bin]->data_set($cid, $data);
  }

  /**
   * Called on shutdown, persists the cache
   * if necessary.
   */
  public static function fastcache_persist () {
    // Try to be the last of the last...
    register_shutdown_function(array('fastcache','_fastcache_persist'));
  }

  /**
   * Persist the binaries.
   */
  public static function _fastcache_persist () {
    foreach (static::$fastcacheitems as &$cache) {
      if ($cache->persist == TRUE) {
        cache_set($cache->bin, $cache->rawdata(), 'fastcache', CACHE_TEMPORARY);
        if ($cache->locked) {
          lock_release('fastcache_' . $cache->bin);
        }
      }
      // The binaries might be utilized on other shutdown functions...
      $cache->changed = FALSE;
      $cache->persist = FALSE;
      $cache->locked = FALSE;
    }

    // Fastcache may be reutilized during shutdown, make sure
    // persistence triggers run again.
    static::$shutdown_registered = FALSE;
  }
}