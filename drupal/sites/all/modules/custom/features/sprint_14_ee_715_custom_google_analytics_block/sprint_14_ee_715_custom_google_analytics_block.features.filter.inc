<?php
/**
 * @file
 * sprint_14_ee_715_custom_google_analytics_block.features.filter.inc
 */

/**
 * Implements hook_filter_default_formats().
 */
function sprint_14_ee_715_custom_google_analytics_block_filter_default_formats() {
  $formats = array();

  // Exported format: Allow Javascript.
  $formats['allow_javascript'] = array(
    'format' => 'allow_javascript',
    'name' => 'Allow Javascript',
    'cache' => 1,
    'status' => 1,
    'weight' => 0,
    'filters' => array(),
  );

  return $formats;
}
