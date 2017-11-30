<?php
/**
 * Created by PhpStorm.
 * User: smolinsk
 * Date: 11/8/2017
 * Time: 3:06 AM
 */

$field = array(
  'active' => 1,
  'cardinality' => 1,
  'deleted' => 0,
  'entity_types' => array(),
  'field_name' => 'field_esmt_configuration_link',
  'indexes' => array(
    'format' => array(
      0 => 'format',
    ),
  ),
  'locked' => 0,
  'module' => 'text',
  'settings' => array(
    'max_length' => 580,
    'profile2_private' => FALSE,
  ),
  'translatable' => 0,
  'type' => 'text',
);

$field_instance = array(
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
      'weight' => 15,
    ),
    'teaser' => array(
      'label' => 'above',
      'settings' => array(),
      'type' => 'hidden',
      'weight' => 0,
    ),
  ),
  'entity_type' => 'node',
  'field_name' => 'field_esmt_configuration_link',
  'label' => 'ESMT Configuration Link',
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
    'weight' => 12,
  ),
);