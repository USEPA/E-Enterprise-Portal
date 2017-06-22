<?php
/**
 * Settings form for lgc Data consumption to load LGC resources.
 */
function lgc_settings($form, $form_state) {
  $form = array();
  // Amount of minutes to wait before reloading the LGC data
  $default_reload_time = 5;

  $form['lgc_settings'] = array(
    '#type' => 'fieldset',
    '#title' => t('LGC Data configurations'),
  );
  $form['lgc_settings']['rcs_lgc_endpoint_url'] = array(
    '#type' => 'textfield',
    '#title' => t('LGC RCS Endpoint URL'),
    '#default_value' => variable_get('rcs_lgc_endpoint_url'),
    '#required' => FALSE,
    '#maxlength' => 1024,
  );
  $form['lgc_settings']['mo_lgc_endpoint_url'] = array(
    '#type' => 'textfield',
    '#title' => t('LGC Missouri Endpoint URL'),
    '#default_value' => variable_get('mo_lgc_endpoint_url'),
    '#required' => FALSE,
    '#maxlength' => 1024,
  );
  $form['lgc_settings']['lgc_cache_reset_time'] = array(
    '#type' => 'textfield',
    '#title' => t('Time (minutes) for refresh rate of LGC data'),
    '#default_value' => variable_get('lgc_cache_reset_time', $default_reload_time),
    '#element_validate' => array('element_validate_number'),
  );

  $form['lgc_settings']['lgc_service_timeout'] = array(
    '#type' => 'textfield',
    '#title' => t('Time (seconds) before timing out LGC data'),
    '#default_value' => variable_get('lgc_service_timeout', 30),
    '#element_validate' => array('element_validate_number'),
  );

  $form['#submit'][] = 'lgc_settings_auth_settings_form_submit';
  return system_settings_form($form);
}

/**
 * Submit callback.
 */
function lgc_settings_auth_settings_form_submit($form, &$form_state) {
  variable_set('lgc_settings_auth_settings_valid', TRUE);
}