<?php
/**
 * @file
 * content_types_and_views_for_workbench.features.inc
 */

/**
 * Implements hook_views_api().
 */
function content_types_and_views_for_workbench_views_api($module = NULL, $api = NULL) {
  return array("api" => "3.0");
}

/**
 * Implements hook_node_info().
 */
function content_types_and_views_for_workbench_node_info() {
  $items = array(
    'progress_tracker' => array(
      'name' => t('Progress Tracker'),
      'base' => 'node_content',
      'description' => '',
      'has_title' => '1',
      'title_label' => t('Title'),
      'help' => '',
    ),
    'to_do_list' => array(
      'name' => t('To Do List'),
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
