<?php
/**
 * Created by PhpStorm.
 * User: smolinsk
 * Date: 11/1/2017
 * Time: 12:06 PM
 */

$field = [
  'field_name' => 'esmt_mapping_scs_role',
  'type' => 'text',
  'entity_types' => array('node')
];


$field_instance = [
  'bundle' => 'esmt_scs_permission_mapping',
  'default_value' => NULL,
  'deleted' => 0,
  'description' => '',
  'display' => array(
    'default' => array(
      'label' => 'above',
      'module' => 'text',
      'settings' => array(),
      'type' => 'text_default',
      'weight' => 3,
    ),
    'teaser' => array(
      'label' => 'above',
      'settings' => array(),
      'type' => 'hidden',
      'weight' => 0,
    ),
  ),
  'entity_type' => 'node',
  'field_name' => $field['field_name'],
  'label' => 'SCS Role',
  'required' => FALSE,
  'settings' => array(
    'custom_add_another' => '',
    'custom_remove' => '',
    'text_processing' => 0,
    'user_register_form' => FALSE,
  ),
  'widget' => array(
    'module' => 'text',
    'settings' => array(
      'size' => 60,
    ),
    'type' => 'text_textfield',
    'weight' => 1,
  ),
];