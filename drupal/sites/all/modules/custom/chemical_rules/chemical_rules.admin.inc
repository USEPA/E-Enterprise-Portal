<?php
/**
 * Settings form for Chemical Rules configurations.
 */
function chemical_rules_settings($form, $form_state) {
    $form = array();

    $form['chemical_rules_settings'] = array(
        '#type' => 'fieldset',
        '#title' => t('Chemical Rules configurations'),
    );

    $form['chemical_rules_settings']['cdx_program_facility_endpoint'] = array(
        '#type' => 'textfield',
        '#title' => t('CDX Program Facility Service Endpoint'),
        '#default_value' => variable_get('cdx_program_facility_endpoint', "https://devngn.epacdxnode.net/cdx-register-II/services/RegisterProgramFacilityService?wsdl"),
        '#required' => TRUE,
    );

    $form['chemical_rules_settings']['naics_dataflows'] = array(
      '#type' => 'textfield',
      '#title' => t('NAICS Dataflows'),
      '#description' => t('Comma delimited list of dataflows where NAICS codes are applicable. Ex. TRIMEweb,FAR'),
      '#default_value' => variable_get('naics_dataflows'),
    );

    $form['chemical_rules_settings']['naics_getbycode_endpoint'] = array(
        '#type' => 'textfield',
        '#title' => t('NAICS Get Code(s) by Code Service Endpoint'),
        '#description' => t('Endpoint to append NAICS code to in order to retrieve detail information (assumes 2012 year set)'),
        '#default_value' => variable_get('naics_getbycode_endpoint', 'https://ends2.epa.gov/RestProxy/Query?Node=.NetNode2&Dataflow=NAICS&Request=GetNAICSCodesByCode_v1.0&Params=CodeSetYear|2012;Code|'),
        '#maxlength' => 256,
    );

    $form['#submit'][] = 'chemical_rules_settings_form_submit';
    return system_settings_form($form);
}

/**
 * Submit callback.
 */
function chemical_rules_settings_form_submit($form, &$form_state) {
    variable_set('chemical_rules_settings_valid', TRUE);
}