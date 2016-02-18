<?php
/**
 * @file
 * cdx_facility_management_view.features.fe_block_settings.inc
 */

/**
 * Implements hook_default_fe_block_settings().
 */
function cdx_facility_management_view_default_fe_block_settings() {
  $export = array();

  $export['version'] = '2.0';

  $export['views-cdx_facility_management-block'] = array(
    'cache' => -1,
    'custom' => 0,
    'delta' => 'cdx_facility_management-block',
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
      'eenterprise' => array(
        'region' => '',
        'status' => 0,
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
    'title' => 'CDX Facility Management',
    'visibility' => 0,
  );

  return $export;
}
