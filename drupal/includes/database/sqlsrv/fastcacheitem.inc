<?php

/**
 * @file
 * fastcacheitem Class.
 */

class fastcacheitem {
  public $persist = FALSE;
  public $changed = FALSE;
  public $locked = FALSE;
  public $bin;
  private $data;

  /**
   * Construct with a DrupalCacheInterface object
   * that comes from a real cache storage.
   */
  public function __construct($binary, $cache = NULL) {
    if (isset($cache)) {
      $this->data = $cache->data;
    }
    else {
      $this->data = array();
    }
    $this->bin = $binary;
  }

  /**
   * Aux starsWith string.
   */
  private function startsWith($haystack, $needle) {
    return $needle === "" || strpos($haystack, $needle) === 0;
  }

  /**
   * Get the global contents of this cache.
   * Used to be sent to a real cache
   * storage.
   */
  public function rawdata() {
    return $this->data;
  }

  /**
   * Set a value in cache.
   *
   * @param mixed $key
   * @param mixed $value
   */
  public function data_set($key, $value) {
    $container = new stdClass();
    $container->data = $value;
    $this->data[$key] = $container;
  }

  /**
   * Retrieve a value from cache.
   *
   * @param mixed $key
   * @return bool|stdClass
   */
  public function data_get($key) {
    if (isset($this->data[$key])) {
      return $this->data[$key];
    }
    return FALSE;
  }

  /**
   * Clear a cache item.
   *
   * @param string $key
   *   If set, the cache ID or an array of cache IDs. Otherwise, all cache entries that
   **  can expire are deleted. The $wildcard argument will be ignored if set to NULL.
   * @param bool $wildcard
   *  If TRUE, the $cid argument must contain a string value and cache
   *  IDs starting with $cid are deleted in addition to the exact cache
   *  ID specified by $cid. If $wildcard is TRUE and $cid is '*', the entire cache is emptied.
   */
  public function clear($key, $wildcard = FALSE) {
    if (!isset($key)) {
      if (empty($this->data)) {
        return;
      }
      else {
        $this->data = array();
      }
    }
    elseif (isset($key) && $wildcard === FALSE) {
      unset($this->data[$key]);
    }
    else {
      if ($key == '*') {
        // Completely reset this binary.
        unset($this->data);
        $this->data = array();
      }
      else {
        // Only reset items that start with $key.
        foreach ($this->data as $k => $v) {
          if ($this->startsWith($k, $key)) {
            unset($this->data[$k]);
          }
        }
      }
    }
    $this->persist = TRUE;
  }
}