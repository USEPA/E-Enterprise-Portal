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

  $cgp_definition = variable_get('cgp_definition', array('value' => variable_get('cgp_definition', '<dl>
    <dt>Active (NOI)</dt>
    <dd>CGP NOI that has been certified, submitted to EPA, and completed a 14-day review process. Active NOIs are considered covered under the CGP permit.</dd>
    <dt>Active (LEW)</dt>
    <dd>A LEW that has been certified and submitted to EPA. Active LEWs are considered covered under the waiver from needing CGP coverage.</dd>
    <dt>Submitted to EPA</dt>
    <dd>CGP NOI that has been certified and submitted to EPA and is undergoing the 14-day review process.</dd>
    <dt>Active - Pending Change</dt>
    <dd>CGP NOI that is Active but has had a Change NOI submitted to EPA and is currently undergoing the 14-day review process. Once the Change NOI becomes Active, the original NOI will become Archived.</dd>
    <dt>Archived</dt>
    <dd>When a Change NOI or LEW has been submitted to EPA and becomes Active, the original NOI or LEW becomes Archived and is no longer Active.</dd>
    <dt>Terminated</dt>
    <dd>CGP NOI that has been terminated for a project that no longer needs permit coverage. Projects are only eligible for termination after meeting the requirements of Part 8 of EPA’s 2017 CGP.</dd>
    <dt>Discontinued</dt>
    <dd>A LEW that has been discontinued for a project that no longer needs or is eligible for the waiver for permit coverage.</dd>
</dl>'), 'format' => NULL));

  $form['construction_permits_settings']['cgp_definition'] = array(
    '#type' => 'text_format',
    '#title' => t('CGP Definitions'),
    '#default_value' => $cgp_definition['value'],
    '#format' => $cgp_definition['format'],
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