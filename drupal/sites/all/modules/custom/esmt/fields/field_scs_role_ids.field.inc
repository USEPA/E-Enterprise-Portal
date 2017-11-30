<?php
/**
 * Created by PhpStorm.
 * User: smolinsk
 * Date: 11/1/2017
 * Time: 12:06 PM
 */

$field = [
  'active' => 1,
  'cardinality' => -1,
  'deleted' => 0,
  'entity_types' => array(),
  'field_name' => 'field_scs_role_ids',
  'indexes' => array(),
  'locked' => 0,
  'module' => 'number',
  'settings' => array(
    'profile2_private' => FALSE,
  ),
  'translatable' => 0,
  'type' => 'number_integer',
];


$field_instance = [
  'bundle' => 'esmt_service_provider',
  'default_value' => NULL,
  'deleted' => 0,
  'description' => '',
  'display' => array(
    'default' => array(
      'label' => 'above',
      'module' => 'number',
      'settings' => array(
        'decimal_separator' => '.',
        'prefix_suffix' => TRUE,
        'scale' => 0,
        'thousand_separator' => '',
      ),
      'type' => 'number_integer',
      'weight' => 10,
    ),
    'teaser' => array(
      'label' => 'above',
      'settings' => array(),
      'type' => 'hidden',
      'weight' => 0,
    ),
  ),
  'entity_type' => 'node',
  'field_name' => 'field_scs_role_ids',
  'label' => 'SCS Role IDs',
  'required' => 0,
  'settings' => array(
    'max' => '',
    'min' => '',
    'prefix' => '',
    'suffix' => '',
    'user_register_form' => FALSE,
  ),
  'widget' => array(
    'active' => 0,
    'module' => 'number',
    'settings' => array(),
    'type' => 'number',
    'weight' => 7,
  ),
];