<?php
/**
 * @file
 * progress_tracker_content_type_export.features.inc
 */

/**
 * Implements hook_node_info().
 */
function progress_tracker_content_type_export_node_info() {
  $items = array(
    'progress_tracker' => array(
      'name' => t('Progress Tracker'),
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
