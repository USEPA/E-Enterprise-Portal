<?php

/**
 * @param $form
 * @param $form_state
 * @return mixed
 */
function construction_permits_admin($form, $form_state) {
  $form = array();

  $form['construction_permits_settings'] = array(
    '#type' => 'fieldset',
    '#title' => t('Construction Permits configurations'),
  );

  $form['construction_permits_settings']['cdx_program_facility_endpoint'] = array(
    '#type' => 'textfield',
    '#title' => t('CGP Form Search Endpoint'),
    '#default_value' => variable_get('cgp_form_endpoint', "https://devngn.epacdxnode.net/oeca-cgp-web/api/public/v1/form"),
    '#required' => TRUE,
  );

  // Sample data
  $form['construction_permits_toggles'] = array(
    '#type' => 'fieldset',
    '#title' => t('Feature Toggles'),
  );

  $form['construction_permits_toggles']['cgp_form_endpoint_sample_data'] = array(
    '#type' => 'checkbox',
    '#title' => t('Use Sample Data for the CGP Form Search Endpoint'),
    '#default_value' => variable_get('cgp_form_endpoint_sample_data', false),
    '#required' => FALSE,
  );

  $form['#validate'][] = 'construction_permits_form_validate';
  $form['#submit'][] = 'construction_permits_admin_form_submit';
  return system_settings_form($form);
}

/**
 * @param $form
 * @param $form_state
 */
function construction_permits_admin_form_submit($form, &$form_state){

}

/**
 * Implements hook_validate().
 */
function construction_permits_form_validate($form, &$form_state) {

}