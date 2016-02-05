<?php
/**
 * @file
 * sprint_14_ee_715_custom_google_analytics_block.features.fe_block_settings.inc
 */

/**
 * Implements hook_default_fe_block_settings().
 */
function sprint_14_ee_715_custom_google_analytics_block_default_fe_block_settings() {
  $export = array();

  $export['version'] = '2.0';

  $export['block-cdx_custom_analytics'] = array(
    'cache' => -1,
    'custom' => 0,
    'machine_name' => 'cdx_custom_analytics',
    'module' => 'block',
    'node_types' => array(),
    'pages' => 'workbench',
    'roles' => array(),
    'themes' => array(
      'bartik' => array(
        'region' => '',
        'status' => 0,
        'theme' => 'bartik',
        'weight' => 0,
      ),
      'bootstrap' => array(
        'region' => '',
        'status' => 0,
        'theme' => 'bootstrap',
        'weight' => 0,
      ),
      'eenterprise' => array(
        'region' => 'header',
        'status' => 1,
        'theme' => 'eenterprise',
        'weight' => 0,
      ),
      'greentrees' => array(
        'region' => '',
        'status' => 0,
        'theme' => 'greentrees',
        'weight' => 0,
      ),
      'oneepa' => array(
        'region' => '',
        'status' => 0,
        'theme' => 'oneepa',
        'weight' => 0,
      ),
      'seven' => array(
        'region' => '',
        'status' => 0,
        'theme' => 'seven',
        'weight' => 0,
      ),
      'zen' => array(
        'region' => '',
        'status' => 0,
        'theme' => 'zen',
        'weight' => 0,
      ),
    ),
    'title' => 'CDX and Lead Analytics Tracking',
    'visibility' => 1,
  );

  return $export;
}
