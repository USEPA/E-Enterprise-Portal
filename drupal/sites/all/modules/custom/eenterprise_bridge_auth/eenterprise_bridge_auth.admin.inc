<?php
/**
 * @file
 * Implements the module's settings form and related callbacks.
 */

/**
 * Settings form.
 */
function eenterprise_bridge_auth_settings($form, $form_state) {
  $form = array();

  $form['eebridge_settings'] = array(
    '#type' => 'fieldset',
    '#title' => t('E-Enterprise Bridge Settings'),
    '#description' => t("Enter the E-Enterprise Bridge application details here."),
  );
  $form['eebridge_settings']['eenterprise_bridge_auth_issuer'] = array(
    '#type' => 'textfield',
    '#title' => t('Issuer'),
    '#default_value' => variable_get('eenterprise_bridge_auth_issuer'),
    '#required' => TRUE,
  );
  $form['eebridge_settings']['eenterprise_bridge_auth_realm'] = array(
    '#type' => 'textfield',
    '#title' => t('Realm'),
    '#default_value' => variable_get('eenterprise_bridge_auth_realm'),
    '#required' => TRUE,
  );
  $form['eebridge_settings']['eenterprise_bridge_auth_reply'] = array(
    '#type' => 'textfield',
    '#title' => t('Reply'),
    '#default_value' => variable_get('eenterprise_bridge_auth_reply'),
    '#required' => TRUE,
  );
  $form['eebridge_settings']['verify_saml_peer'] = array(
    '#type' => 'checkbox',
    '#title' => t('Only accept SSO from Verified SAML Peers'),
    '#default_value' => variable_get('verify_saml_peer'),
  );
  $form['eebridge_settings']['saml_peers'] = array(
    '#type' => 'textfield',
    '#title' => t('Accepted SAML Fingerprints, isolated by |'),
    '#default_value' => variable_get('saml_peers'),
    '#maxlength' => 1024,
  );

  $form['#validate'][] = 'eenterprise_bridge_auth_settings_validate';
  $form['#submit'][] = 'eenterprise_bridge_auth_settings_submit';

  return system_settings_form($form);
}

/**
 * Form validate callback.
 */
function eenterprise_bridge_auth_settings_validate($form, &$form_state) {
  if (form_get_errors()) {
    return;
  }
}

/**
 * Form submit callback.
 */
function eenterprise_bridge_auth_settings_submit($form, &$form_state) {
  variable_set('eenterprise_bridge_auth_settings_valid', TRUE);
}
