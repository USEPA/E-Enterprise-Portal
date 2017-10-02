<?php

/**
 * @file
 * Admin page callbacks for the system module.
 */

/**
 * Menu callback: return information about WinCache.
 */
function WincacheDrupalStatsPageCallback() {
  // Wincache.php can be accesed on it's own if drupal module disabled,
  // so integrate custom security to prevent double login when
  // used from Drupal module.
  define('BYPASS_SECURITY_CHECK', TRUE);
  // This page was developed by Microsoft, just adapted to Drupal
  // coding standards.
  module_load_include('php', 'wincachedrupal', 'misc/wincache');
  drupal_exit();
}
