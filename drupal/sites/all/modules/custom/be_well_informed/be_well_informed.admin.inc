<?php
/**
 * Settings form for FRS NAAS Authentication and Zip code lookup services.
 */
function be_well_informed_settings($form, $form_state) {
    $form = array();
    $default_reload_time = 5;

    $form['be_well_informed_settings'] = array(
        '#type' => 'fieldset',
        '#title' => t('My CDX Widget configurations'),
    );
    $form['be_well_informed_settings']['cdx_service_endpoint'] = array(
        '#type' => 'textfield',
        '#title' => t('CDX Service Endpoint'),
        '#default_value' => variable_get('cdx_service_endpoint', "https://devngn.epacdxnode.net/cdx-register-II/services/RegisterMyCdxService?wsdl"),
        '#required' => TRUE,
    );

    $form['be_well_informed_settings']['be_well_informed_cache_reset_time'] = array(
      '#type' => 'textfield',
      '#title' => t('Time (minutes) for refresh rate of My CDX Data'),
      '#default_value' => variable_get('be_well_informed_cache_reset_time', $default_reload_time),
      '#element_validate' => array('element_validate_number'),
    );


    $form['#submit'][] = 'be_well_informed_settings_form_submit';
    return system_settings_form($form);
}

/**
 * Submit callback.
 */
function be_well_informed_settings_form_submit($form, &$form_state) {
    variable_set('be_well_informed_settings_valid', TRUE);
}