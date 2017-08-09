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

  $form['be_well_informed_toggles']['bwi_file_upload_url'] = array(
    '#type' => 'textfield',
    '#title' => t('Specify URL to which XML files are being uploaded.'),
    '#default_value' => variable_get('bwi_file_upload_url', "example.com"),
    '#required' => TRUE,
  );

  return system_settings_form($form);
}
