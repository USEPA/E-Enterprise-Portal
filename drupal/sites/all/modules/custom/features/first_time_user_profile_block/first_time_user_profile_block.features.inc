<?php
/**
 * @file
 * first_time_user_profile_block.features.inc
 */

/**
 * Implements hook_views_api().
 */
function first_time_user_profile_block_views_api($module = NULL, $api = NULL) {
  return array("api" => "3.0");
}

/**
 * Implements hook_node_info().
 */
function first_time_user_profile_block_node_info() {
  $items = array(
    'user_location_preferences' => array(
      'name' => t('User Location Preferences'),
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
