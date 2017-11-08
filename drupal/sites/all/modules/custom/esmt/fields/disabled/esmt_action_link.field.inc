<?php
/**
 * Created by PhpStorm.
 * User: smolinsk
 * Date: 11/1/2017
 * Time: 12:06 PM
 */

$field = [
  'field_name' => 'esmt_service_action_link',
  'type' => 'text',
  'entity_types' => array('node'),
];


$field_instance = [
  'field_name' => $field['field_name'],
  'entity_type' => 'node',
  'bundle' => 'esmt_service_provider',
  'label' => t('Service Action Link'),
  'widget' => array('type' => 'text_textfield'),
];