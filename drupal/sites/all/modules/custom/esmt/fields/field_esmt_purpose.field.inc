<?php
/**
 * Created by PhpStorm.
 * User: smolinsk
 * Date: 11/1/2017
 * Time: 12:06 PM
 */

$field = [
  'active' => 1,
  'cardinality' => 1,
  'deleted' => 0,
  'entity_types' => array(),
  'field_name' => 'field_esmt_purpose',
  'indexes' => array(
    'format' => array(
      0 => 'format',
    ),
  ),
  'locked' => 0,
  'module' => 'text',
  'settings' => array(
    'max_length' => 255,
    'profile2_private' => FALSE,
  ),
  'translatable' => 0,
  'type' => 'text',
];


$field_instance = [
  'bundle' => 'esmt_service_provider',
  'default_value' => NULL,
  'deleted' => 0,
  'description' => '',
  'display' => array(
    'default' => array(
      'label' => 'above',
      'module' => 'text',
      'settings' => array(),
      'type' => 'text_default',
      'weight' => 11,
    ),
    'teaser' => array(
      'label' => 'above',
      'settings' => array(),
      'type' => 'hidden',
      'weight' => 0,
    ),
  ),
  'entity_type' => 'node',
  'field_name' => 'field_esmt_purpose',
  'label' => 'Purpose',
  'required' => 0,
  'settings' => array(
    'text_processing' => 0,
    'user_register_form' => FALSE,
  ),
  'widget' => array(
    'active' => 1,
    'module' => 'text',
    'settings' => array(
      'size' => 60,
    ),
    'type' => 'text_textfield',
    'weight' => 8,
  ),
];