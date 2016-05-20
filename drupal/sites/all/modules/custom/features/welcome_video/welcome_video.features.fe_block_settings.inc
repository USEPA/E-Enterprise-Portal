<?php
/**
 * @file
 * welcome_video.features.fe_block_settings.inc
 */

/**
 * Implements hook_default_fe_block_settings().
 */
function welcome_video_default_fe_block_settings() {
  $export = array();

  $export['version'] = '2.0';

  $export['block-ee_bridge_login'] = array(
    'cache' => -1,
    'css_class' => '',
    'custom' => 0,
    'machine_name' => 'ee_bridge_login',
    'module' => 'block',
    'node_types' => array(),
    'pages' => 'eenterprise-new
eenterprise-alternate
bridge-landing
workbench
ee_disclaimer',
    'roles' => array(
      'anonymous user' => 1,
    ),
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
        'weight' => -26,
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
    'title' => '',
    'visibility' => 0,
  );

  return $export;
}
