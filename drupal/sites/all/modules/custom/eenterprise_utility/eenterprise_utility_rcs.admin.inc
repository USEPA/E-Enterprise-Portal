<?php
/**
 * Settings form for CDX Facility Management Widget.
 */
function rcs_settings($form, $form_state) {
    $form = array();
    $reset_time = variable_get('rcs_cache_reset_time');
    if (!isset($reset_time)) {
        $reset_time = 5; // default of 5 minutes
    }
    $form['rcs_settings'] = array(
        '#type' => 'fieldset',
        '#title' => t('RCS Data configurations'),
    );
    $form['rcs_settings']['rcs_endpoint_url'] = array(
        '#type' => 'textfield',
        '#title' => t('RCS Endpoint URL'),
        '#default_value' => variable_get('rcs_endpoint_url'),
        '#required' => TRUE,
      '#maxlength' => 1024,

    );

    $form['rcs_settings']['rcs_cache_reset_time'] = array(
      '#type' => 'textfield',
      '#title' => t('Time (minutes) for refresh rate of RCS data'),
      '#default_value' => $reset_time,
      '#element_validate' => array('element_validate_number'),
    );

    $form['#submit'][] = 'rcs_settings_auth_settings_form_submit';
    return system_settings_form($form);
}

/**
 * Submit callback.
 */
function rcs_settings_auth_settings_form_submit($form, &$form_state) {
    variable_set('rcs_settings_auth_settings_valid', TRUE);
}