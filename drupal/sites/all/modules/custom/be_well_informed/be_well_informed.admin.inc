<?php

/**
 * @param $form
 * @param $form_state
 * @return mixed
 */
function be_well_informed_admin($form, $form_state) {
  $form = array();

  // Sample data
  $form['be_well_informed_toggles'] = array(
    '#type' => 'fieldset',
    '#title' => t('Feature Toggles & debugging'),
  );

  $form['be_well_informed_toggles']['bwi_pdf_debug'] = array(
    '#type' => 'checkbox',
    '#title' => t('Toggles the PDF view to shown as HTML for debugging purposes.'),
    '#default_value' => variable_get('bwi_pdf_debug', false),
    '#required' => FALSE,
  );

  $form['be_well_informed_toggles']['bwi_js_debug_mode'] = array(
    '#type' => 'checkbox',
    '#title' => t('Toggles meaning information used by javascript.'),
    '#default_value' => variable_get('bwi_js_debug_mode', false),
    '#required' => FALSE,
  );

  $form['#validate'][] = 'be_well_informed_form_validate';
  $form['#submit'][] = 'be_well_informed_admin_form_submit';
  return system_settings_form($form);
}

/**
 * @param $form
 * @param $form_state
 */
function be_well_informed_admin_form_submit($form, &$form_state){

}

/**
 * Implements hook_validate().
 */
function be_well_informed_form_validate($form, &$form_state) {

}