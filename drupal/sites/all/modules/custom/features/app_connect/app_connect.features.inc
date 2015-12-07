<?php
/**
 * @file
 * app_connect.features.inc
 */

/**
 * Implements hook_views_api().
 */
function app_connect_views_api($module = NULL, $api = NULL) {
  return array("api" => "3.0");
}

/**
 * Implements hook_node_info().
 */
function app_connect_node_info() {
  $items = array(
    'ee_program_service' => array(
      'name' => t('Program Service'),
      'base' => 'node_content',
      'description' => '',
      'has_title' => '1',
      'title_label' => t('Title'),
      'help' => '',
    ),
  );
  drupal_alter('node_info', $items);
  return $items;
}
