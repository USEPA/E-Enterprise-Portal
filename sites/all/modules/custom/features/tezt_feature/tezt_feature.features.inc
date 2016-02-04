<?php
/**
 * @file
 * tezt_feature.features.inc
 */

/**
 * Implements hook_node_info().
 */
function tezt_feature_node_info() {
  $items = array(
    'tezt' => array(
      'name' => t('Tezt'),
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

function see_deleted(){
    return 'sth';
}
