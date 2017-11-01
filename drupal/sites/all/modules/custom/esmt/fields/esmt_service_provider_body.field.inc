<?php
/**
 * Created by PhpStorm.
 * User: smolinsk
 * Date: 11/1/2017
 * Time: 12:06 PM
 */

$field = [
  'field_name' => 'body',
  'type' => 'text_with_summary',
  'entity_types' => array('node'),
];


$field_instance = [
  'field_name' => $field['field_name'],
  'entity_type' => 'node',
  'bundle' => 'esmt_service_provider',
  'label' => 'Body',
  'widget' => array('type' => 'text_textarea_with_summary'),
  'settings' => array('display_summary' => TRUE),
  'display' => array(
    'default' => array(
      'label' => 'hidden',
      'type' => 'text_default',
    ),
    'teaser' => array(
      'label' => 'hidden',
      'type' => 'text_summary_or_trimmed',
    ),
  ),
];