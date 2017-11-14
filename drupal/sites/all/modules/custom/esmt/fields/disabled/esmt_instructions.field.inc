<?php
/**
 * Created by PhpStorm.
 * User: smolinsk
 * Date: 11/1/2017
 * Time: 12:05 PM
 */

$field = [
  'field_name' => 'esmt_service_instructions',
  'type' => 'text_long',
  'entity_types' => array('node'),
];

$field_instance = [
  'field_name' => $field['field_name'],
  'entity_type' => 'node',
  'bundle' => 'esmt_service_provider',
  'label' => t('Service Instructions'),
  'widget' => [array('type' => 'text_textarea')],
];