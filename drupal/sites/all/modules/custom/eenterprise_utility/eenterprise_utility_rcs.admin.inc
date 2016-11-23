<?php
/**
 * Settings form for RCS Data consumption to load LGC resources.
 */
function rcs_settings($form, $form_state) {
    $form = array();
    // Amount of minutes to wait before reloading the RCS data
    $default_reload_time = 5;

    $form['rcs_settings'] = array(
        '#type' => 'fieldset',
        '#title' => t('RCS Data configurations'),
    );
    $form['rcs_settings']['rcs_endpoint_url'] = array(
        '#type' => 'textfield',
        '#title' => t('RCS Endpoint URL'),
        '#default_value' => variable_get('rcs_endpoint_url'),
        '#required' => FALSE,
      '#maxlength' => 1024,

    );

    $form['rcs_settings']['rcs_cache_reset_time'] = array(
      '#type' => 'textfield',
      '#title' => t('Time (minutes) for refresh rate of RCS data'),
      '#default_value' => variable_get('rcs_cache_reset_time', $default_reload_time),
      '#element_validate' => array('element_validate_number'),
    );

    $form['rcs_settings']['rcs_service_timeout'] = array(
      '#type' => 'textfield',
      '#title' => t('Time (seconds) before timing out RCS data'),
      '#default_value' => variable_get('rcs_service_timeout', 30),
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