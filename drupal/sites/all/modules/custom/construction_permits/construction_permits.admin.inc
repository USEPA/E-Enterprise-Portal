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

  $form['construction_permits_settings']['cgp_api_endpoint'] = array(
    '#type' => 'textfield',
    '#title' => t('CGP Form Search Endpoint'),
    '#default_value' => variable_get('cgp_api_endpoint', "https://devngn.epacdxnode.net/oeca-cgp-web/api/public/v1"),
    '#required' => TRUE,
  );

  $cgp_body = variable_get('cgp_body', array('value' => variable_get('cgp_body', '<p class="widget-note">Source: <a href="https://www.epa.gov/" target="_blank" rel="external">US Environmental Protection Agency</a></p> <p>Find Notices of Intent (NOIs), Notices of Termination (NOTs), or Low Erosivity Waivers (LEWs) submitted under the U.S. EPA 2017 Construction General Permit (CGP).&nbsp; At this time, search results will only include activity with the national NPDES eReporting Tool (NeT-CGP) for U.S. EPA lead and participating states and tribes.</p> <h3>Enter one or more search criteria</h3>'), 'format' => NULL));

  $form['construction_permits_settings']['cgp_body'] = array(
    '#type' => 'text_format',
    '#title' => t('CGP Content'),
    '#default_value' => $cgp_body['value'],
    '#format' => $cgp_body['format'],
    '#required' => FALSE,
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