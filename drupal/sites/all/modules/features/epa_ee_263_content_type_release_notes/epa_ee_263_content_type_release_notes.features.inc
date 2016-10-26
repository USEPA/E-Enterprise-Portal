<?php
/**
 * @file
 * epa_ee_263_content_type_release_notes.features.inc
 */

/**
 * Implements hook_node_info().
 */
function epa_ee_263_content_type_release_notes_node_info() {
  $items = array(
    'epa_release_notes' => array(
      'name' => t('EPA Release Notes'),
      'base' => 'node_content',
      'description' => t('In progress and release notes for e-Enterprise'),
      'has_title' => '1',
      'title_label' => t('Release'),
      'help' => '',
    ),
  );
  drupal_alter('node_info', $items);
  return $items;
}
