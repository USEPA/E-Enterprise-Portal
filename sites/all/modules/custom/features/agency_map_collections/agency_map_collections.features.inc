<?php
/**
 * @file
 * agency_map_collections.features.inc
 */

/**
 * Implements hook_views_api().
 */
function agency_map_collections_views_api($module = NULL, $api = NULL) {
  return array("api" => "3.0");
}

/**
 * Implements hook_node_info().
 */
function agency_map_collections_node_info() {
  $items = array(
    'agency_map' => array(
      'name' => t('Agency Map Collection'),
      'base' => 'node_content',
      'description' => t('AGOL agency map subscription from federal, state, tribal, and local agencies.'),
      'has_title' => '1',
      'title_label' => t('Title'),
      'help' => '',
    ),
  );
  drupal_alter('node_info', $items);
  return $items;
}
