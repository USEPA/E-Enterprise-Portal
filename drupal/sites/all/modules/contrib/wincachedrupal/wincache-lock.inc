<?php

/**
 * @file
 * A wincache based implementation of a locking mechanism.
 * See includes/lock.inc for documenation
 */

require_once dirname(__FILE__) . '/drupal_win_cache.inc';

// Check if memcached is available - if not include default lock handler.
// @todo get rid of this conditional include as soon as this is done:
// http://drupal.org/node/1225404
$lock_file = dirname(__FILE__) . '/wincache-lock-code.inc';
// Test WinCache.
$wincache_ucache_enabled = (function_exists('wincache_ucache_info') && ($cache = @wincache_ucache_info(TRUE))) && ini_get('wincache.ucenabled') == TRUE;
if (!$wincache_ucache_enabled) {
  $lock_file = DRUPAL_ROOT . '/includes/lock.inc';
}
require_once $lock_file;
