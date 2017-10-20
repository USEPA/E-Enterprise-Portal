<?php
/**
 * Created by PhpStorm.
 * User: smolinsk
 * Date: 10/20/2017
 * Time: 11:19 AM
 */


/**
 * @param $form
 * @param $form_state
 * @return mixed
 */
function partner_area_admin_form($form, $form_state) {
  $form = array();

  $form['partner_area_settings'] = array(
    '#type' => 'fieldset',
    '#title' => t('Partner Area configurations'),
  );

  /*$form['partner_area_settings']['_eep_service_endpoint'] = array(
    '#type' => 'textfield',
    '#title' => t('Sample Service Endpoint'),
    '#default_value' => variable_get('_eep_service_endpoint', ""),
    '#required' => TRUE,
  );*/

  $form['#validate'][] = 'partner_area_admin_form_validate';
  $form['#submit'][] = 'partner_area_admin_form_submit';
  return system_settings_form($form);
}

/**
 * @param $form
 * @param $form_state
 */
function partner_area_admin_form_submit($form, &$form_state){

}

/**
 * Implements hook_validate().
 */
function partner_area_admin_form_validate($form, &$form_state) {

}

function partner_area_update_install() {

  //variable_set('_eep_service_endpoint', '');

  // Setup custom content type
  _add_partner_service_provider_content_type();
}

function _add_partner_service_provider_content_type() {

  // Check if the partner_service_provider content type exists
  $type = node_type_load('partner_service_provider');
  if (!$type) {
    $type = [
      'type' => 'partner_service_provider',
      'name' => t('Partner Service Provider'),
      'base' => 'node_content',
      'description' => t(
        "Services that is made available for EEP partners to use"),
      'custom' => 1,
      'modified' => 1,
      'locked' => 0,
    ];

    $type = node_type_set_defaults($type);

    // Create the custom fields
    // 1) Instructions
    $field = [
      'field_name' => 'partner_service_instructions',
      'type' => 'text_long',
      'entity_types' => array('node'),
    ];

    // Check if it exists
    $prior_field = field_read_field($field['field_name'], ['include_inactive' => TRUE]);
    if (empty($prior_field)) {
      $field_partner_service_instructions = field_create_field($field);

      $instance = [
        'field_name' => $field['field_name'],
        'entity_type' => 'node',
        'bundle' => $type['type'],
        'label' => t('Service Instructions'),
        'widget' => [array('type' => 'text_textarea')],
      ];
      $instance_partner_service_instructions = field_create_instance($instance);
    }


    // 2) Action/Link
    $field = [
      'field_name' => 'partner_service_action_link',
      'type' => 'text',
      'entity_types' => array('node'),
    ];

    // Check if it exists
    $prior_field = field_read_field($field['field_name'], ['include_inactive' => TRUE]);
    if (empty($prior_field)) {
      $field_partner_service_action_link = field_create_field($field);

      $instance = [
        'field_name' => $field['field_name'],
        'entity_type' => 'node',
        'bundle' => $type['type'],
        'label' => t('Service Action Link'),
        'widget' => array('type' => 'text_textfield'),
      ];
      $instance_partner_service_action_link = field_create_instance($instance);
    }

    node_type_save($type);
    node_add_body_field($type);
  }
}