<?php

/**
 * @param $form
 * @param $form_state
 * @return mixed
 */
function linked_accounts_admin($form, $form_state) {
  $form = array();

  $form['linked_accounts_settings'] = array(
    '#type' => 'fieldset',
    '#title' => t('Linked Accounts Configurations'),
  );

  $form['linked_accounts_settings']['cdx_dashboard_path'] = array(
    '#type' => 'textfield',
    '#title' => t('CDX Dashboard Relative Path'),
    '#default_value' => variable_get('cdx_dashboard_path', "cdx"),
    '#required' => TRUE,
  );

  $form['linked_accounts_settings']['scs_dashboard_path'] = array(
    '#type' => 'textfield',
    '#title' => t('SCS Dashboard Relative Link'),
    '#default_value' => variable_get('scs_dashboard_path', "scs"),
    '#required' => TRUE,
  );

  $form['scs_settings'] = array(
    '#type' => 'fieldset',
    '#title' => t('SCS Configurations'),
  );

  $form['scs_settings']['scs_auth_reg_username'] = array(
    '#type' => 'textfield',
    '#title' => t('Authorized Username'),
    '#default_value' => variable_get('scs_auth_reg_username', "")
  );

  $form['scs_settings']['scs_auth_reg_password'] = array(
    '#type' => 'textfield',
    '#title' => t('Authorized Password'),
    '#default_value' => variable_get('scs_auth_reg_password', "")
  );

  $form['scs_settings']['scs_auth_endpoint'] = array(
    '#type' => 'textfield',
    '#title' => t('Authentication URL'),
    '#default_value' => variable_get('scs_auth_endpoint', "https://encromerrdev.epacdxnode.net/scs-portal-ws/services/SharedPortalService?wsdl")
  );

  $form['scs_settings']['scs_handoff_auth_endpoint'] = array(
    '#type' => 'textfield',
    '#title' => t('Authentication URL for Handoff Token'),
    '#default_value' => variable_get('scs_handoff_auth_endpoint', "https://encromerrdev.epacdxnode.net/scs-portal-ws/services/SharedPortalSecurityService?wsdl")
  );
  $form['scs_settings']['scs_handoff_url'] = array(
    '#type' => 'textfield',
    '#title' => t('URL for Handoff'),
    '#default_value' => variable_get('scs_handoff_url', "https://encromerrdev.epacdxnode.net/Handoff")
  );

  $form['cdx_settings'] = array(
    '#type' => 'fieldset',
    '#title' => t('CDX Configurations'),
  );

  $form['cdx_settings']['cdx_auth_reg_username'] = array(
    '#type' => 'textfield',
    '#title' => t('Authorized Username'),
    '#default_value' => variable_get('cdx_auth_reg_username', "")
  );

  $form['cdx_settings']['cdx_auth_reg_password'] = array(
    '#type' => 'textfield',
    '#title' => t('Authorized Password'),
    '#default_value' => variable_get('cdx_auth_reg_password', "")
  );

  $form['cdx_settings']['cdx_auth_endpoint'] = array(
    '#type' => 'textfield',
    '#title' => t('Authentication URL'),
    '#default_value' => variable_get('cdx_auth_endpoint', "")
  );

  $form['#validate'][] = 'linked_accounts_form_validate';
  $form['#submit'][] = 'linked_accounts_admin_form_submit';
  return system_settings_form($form);
}

/**
 * @param $form
 * @param $form_state
 */
function linked_accounts_admin_form_submit($form, &$form_state){

}

/**
 * Implements hook_validate().
 */
function linked_accounts_form_validate($form, &$form_state) {

}