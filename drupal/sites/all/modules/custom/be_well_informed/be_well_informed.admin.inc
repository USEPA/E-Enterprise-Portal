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

  $form['be_well_informed_toggles']['bwi_service_url'] = array(
    '#type' => 'textfield',
    '#title' => t('Specify URL to where the BWI service is located.'),
    '#default_value' => variable_get("bwi_service_url", 'https://nodeweb.epacdxnode.net/BWIService/bwievaluation'),
    '#required' => TRUE,
  );

  $form['be_well_informed_toggles']['bwi_sample_partner'] = array(
    '#type' => 'checkbox',
    '#title' => t('Toggles sample partner xml.  It is exposed on the partner dropdown.'),
    '#default_value' => variable_get('bwi_sample_partner', false),
    '#required' => FALSE,
  );

  $form['be_well_informed_configuration'] = array(
    '#type' => 'fieldset',
    '#title' => t('Configuration'),
  );


  $bwi_body = variable_get('bwi_body', ['value' => variable_get('bwi_body', '<p> Have a well and wonder what your water testing results mean?</p><p> The Be Well Informed Guide lets you enter your test results and get feedback about health concerns and water treatment choices for your state or tribe.</p><p> Be Well Informed was created for residents, and has the most common contaminants that affect wells. It may not have all the contaminants present in your area - for those it does have, it can provide useful information.</p><p> A quick disclaimer before we start.</p><p class="widget-note"> Information provided on this website is for informational purposes only and should not be substituted for direct consultation with a qualified water treatment professional. Other conditions or factors related to your well or home not considered by this online guide may determine the most appropriate water treatment option.</p><p class="widget-note powered-by-nhbwi">Powered by: <a href="https://xml2.des.state.nh.us/DWITool/Welcome.aspx" target="_blank">New Hampshire Be <em>Well</em> Informed</a></p>'), 'format' => NULL]);

  $form['be_well_informed_configuration']['bwi_body'] = array(
    '#type' => 'text_format',
    '#title' => t('Be Well Informed Introductory Text'),
    '#default_value' => $bwi_body['value'],
    '#format' => $bwi_body['format'],
    '#required' => FALSE,
  );

  return system_settings_form($form);
}
