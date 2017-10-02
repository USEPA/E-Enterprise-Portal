<?php

/**
 * @file
 * A wincache based implementation of the session backend.
 */
require_once dirname(__FILE__) . '/drupal_win_cache.inc';

// Check if wincache is available - if not include default session handler.
$session_file = dirname(__FILE__) . '/wincache-session-code.inc';

// Test WinCache session is enabled. There is no real way of doing this, so
// we do a regular check to see if wincache is enabled.
$wincache_session_enabled = (function_exists('wincache_ucache_info') && ($cache = @wincache_scache_info(TRUE)));

// Check we are running at least 5.4
$phpver_ok = version_compare(PHP_VERSION, '5.4.0') >= 0;

// Even if Wincache reports session is enabled, PHP might fail to initilize it.
global $wincache_session_error;
$wincache_session_error = FALSE;
if (ini_get('session.save_handler') != 'wincache') {
  function wincache_session_error_handler ($error_level, $message, $filename, $line, $context) {
    global $wincache_session_error;
    $wincache_session_error = TRUE;
  }

  set_error_handler('wincache_session_error_handler', E_ALL);
  ini_set('session.save_handler', 'wincache');
  restore_error_handler();
}

// If something is wrong, back to the default session handler.
if (!$wincache_session_enabled || !$phpver_ok || drupal_is_cli() || $wincache_session_error) {
  $session_file = DRUPAL_ROOT . '/includes/session.inc';
  ini_set('session.save_handler', 'files');
  // Session initialization is before database bootstrap... if db_log is
  // enabled this won't work.
  // watchdog('Wincache Session', 'The wincache session handler failed to initialize.', array(), WATCHDOG_NOTICE);
}

require_once $session_file;
