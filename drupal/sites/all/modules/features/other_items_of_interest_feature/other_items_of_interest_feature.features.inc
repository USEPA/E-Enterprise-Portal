<?php
/**
 * @file
 * other_items_of_interest_feature.features.inc
 */

/**
 * Implements hook_views_api().
 */
function other_items_of_interest_feature_views_api($module = NULL, $api = NULL) {
  return array("api" => "3.0");
}

/**
 * Implements hook_node_info().
 */
function other_items_of_interest_feature_node_info() {
  $items = array(
    'state_resource' => array(
      'name' => t('Resource'),
      'base' => 'node_content',
      'description' => '',
      'has_title' => '1',
      'title_label' => t('Source'),
      'help' => t('Help instructions.'),
    ),
  );
  drupal_alter('node_info', $items);
  return $items;
}
