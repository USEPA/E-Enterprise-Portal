<?php
/**
 * Created by PhpStorm.
 * User: smolinsk
 * Date: 11/8/2017
 * Time: 3:06 AM
 */

$field = array(
  'active' => 0,
  'cardinality' => 1,
  'deleted' => 0,
  'entity_types' => array(),
  'field_name' => 'esmt_configuration_form',
  'indexes' => array(
    'target_id' => array(
      0 => 'target_id',
    ),
  ),
  'locked' => 0,
  'module' => 'entityreference',
  'settings' => array(
    'handler' => 'base',
    'handler_settings' => array(
      'behaviors' => array(
        'views-select-list' => array(
          'status' => 0,
        ),
      ),
      'sort' => array(
        'direction' => 'ASC',
        'property' => 'title',
        'type' => 'property',
      ),
      'target_bundles' => array(
        'webform' => 'webform',
      ),
    ),
    'profile2_private' => FALSE,
    'target_type' => 'node',
  ),
  'translatable' => 0,
  'type' => 'entityreference',
);

$field_instance = array(
  'bundle' => 'esmt_service_provider',
  'custom_add_another' => '',
  'custom_remove' => '',
  'default_value' => NULL,
  'deleted' => 0,
  'description' => '',
  'display' => array(
    'default' => array(
      'label' => 'above',
      'module' => 'entityreference',
      'settings' => array(
        'link' => FALSE,
      ),
      'type' => 'entityreference_label',
      'weight' => 7,
    ),
    'teaser' => array(
      'label' => 'above',
      'settings' => array(),
      'type' => 'hidden',
      'weight' => 0,
    ),
  ),
  'entity_type' => 'node',
  'field_name' => 'esmt_configuration_form',
  'label' => 'Service Configuration Form',
  'required' => 0,
  'settings' => array(
    'custom_add_another' => '',
    'custom_remove' => '',
    'user_register_form' => FALSE,
  ),
  'widget' => array(
    'active' => 1,
    'module' => 'options',
    'settings' => array(),
    'type' => 'options_select',
    'weight' => 3,
  ),
);