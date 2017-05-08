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