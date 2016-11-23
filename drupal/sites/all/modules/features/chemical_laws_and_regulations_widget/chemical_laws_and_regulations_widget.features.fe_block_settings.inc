<?php
/**
 * @file
 * chemical_laws_and_regulations_widget.features.fe_block_settings.inc
 */

/**
 * Implements hook_default_fe_block_settings().
 */
function chemical_laws_and_regulations_widget_default_fe_block_settings() {
  $export = array();

  $export['version'] = '2.0';

  $export['chemical_rules-chemical_rules'] = array(
    'cache' => 1,
    'css_class' => '',
    'custom' => 0,
    'delta' => 'chemical_rules',
    'module' => 'chemical_rules',
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
      'eenterprise' => array(
        'region' => '',
        'status' => 0,
        'theme' => 'eenterprise',
        'weight' => 0,
      ),
      'seven' => array(
        'region' => '',
        'status' => 0,
        'theme' => 'seven',
        'weight' => 0,
      ),
    ),
    'title' => '',
    'visibility' => 0,
  );

  return $export;
}
