<?php
/**
 * @file
 * epa_ee_340_favorite_links_views_block.features.fe_block_settings.inc
 */

/**
 * Implements hook_default_fe_block_settings().
 */
function epa_ee_340_favorite_links_views_block_default_fe_block_settings() {
  $export = array();

  $export['version'] = '2.0';

  $export['views-favorite_sites-block'] = array(
    'cache' => -1,
    'custom' => 0,
    'delta' => 'favorite_sites-block',
    'module' => 'views',
    'node_types' => array(),
    'pages' => '',
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
