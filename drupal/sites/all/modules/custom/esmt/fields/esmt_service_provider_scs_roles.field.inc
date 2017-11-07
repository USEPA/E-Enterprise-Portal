<?php
/**
 * Created by PhpStorm.
 * User: smolinsk
 * Date: 11/1/2017
 * Time: 12:06 PM
 */

$field = [
  'field_name' => 'esmt_service_scs_roles',
  'type' => 'text',
  'entity_types' => array('node'),
  'cardinality' => FIELD_CARDINALITY_UNLIMITED
];


$field_instance = [
  'field_name' => $field['field_name'],
  'entity_type' => 'node',
  'bundle' => 'esmt_partner',
  'label' => t('SCS Roles'),
  'widget' => array('type' => 'text_textfield'),
];