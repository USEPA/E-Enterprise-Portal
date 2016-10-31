<?php
/**
 * @file
 * chemical_laws_and_regulations_content_types_and_view.features.inc
 */

/**
 * Implements hook_views_api().
 */
function chemical_laws_and_regulations_content_types_and_view_views_api($module = NULL, $api = NULL) {
  return array("api" => "3.0");
}

/**
 * Implements hook_node_info().
 */
function chemical_laws_and_regulations_content_types_and_view_node_info() {
  $items = array(
    'chemical_searches' => array(
      'name' => t('Chemical Searches'),
      'base' => 'node_content',
      'description' => t('Content type for storing chemicals returned by SRS after user search and re-using in future to show trending and popular chemicals'),
      'has_title' => '1',
      'title_label' => t('Title'),
      'help' => '',
    ),
    'user_favorite_chemicals' => array(
      'name' => t('User Favorite Chemicals'),
      'base' => 'node_content',
      'description' => t('Content type for storing user\'s favorite chemicals and re-using in future to show trending and popular chemicals'),
      'has_title' => '1',
      'title_label' => t('Title'),
      'help' => '',
    ),
    'user_favorite_laws' => array(
      'name' => t('User Favorite Laws'),
      'base' => 'node_content',
      'description' => t('Content type for storing user\'s favorite laws and regulations'),
      'has_title' => '1',
      'title_label' => t('Title'),
      'help' => '',
    ),
  );
  drupal_alter('node_info', $items);
  return $items;
}
