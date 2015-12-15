<?php
/**
 * @file
 * faqs_and_views.features.inc
 */

/**
 * Implements hook_views_api().
 */
function faqs_and_views_views_api($module = NULL, $api = NULL) {
  return array("api" => "3.0");
}

/**
 * Implements hook_node_info().
 */
function faqs_and_views_node_info() {
  $items = array(
    'ee_faqs' => array(
      'name' => t('EE FAQs'),
      'base' => 'node_content',
      'description' => t('Frequently asked questions for E-Enterprise'),
      'has_title' => '1',
      'title_label' => t('Title'),
      'help' => '',
    ),
  );
  drupal_alter('node_info', $items);
  return $items;
}
