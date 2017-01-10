<?php
/**
 * @file
 * developer_resources_area.features.inc
 */

/**
 * Implements hook_views_api().
 */
function developer_resources_area_views_api($module = NULL, $api = NULL) {
  return array("api" => "3.0");
}

/**
 * Implements hook_node_info().
 */
function developer_resources_area_node_info() {
  $items = array(
    'developer_resource' => array(
      'name' => t('Developer Resource'),
      'base' => 'node_content',
      'description' => t('Resources for Developers.  Used in /for-developers page / For Developers view.'),
      'has_title' => '1',
      'title_label' => t('Title'),
      'help' => '',
    ),
  );
  drupal_alter('node_info', $items);
  return $items;
}
