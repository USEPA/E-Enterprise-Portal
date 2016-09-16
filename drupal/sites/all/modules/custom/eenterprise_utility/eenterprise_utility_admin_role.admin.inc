<?php
/**
 * Settings form for loading currently used admin role
 */
function admin_role_settings($form, $form_state) {
    $form = array();

    $form['admin_role_settings']['admin_role'] = array(
        '#type' => 'textfield',
        '#title' => t('Current admin role'),
        '#default_value' => variable_get('current_admin_role'),
        '#required' => TRUE,
         '#maxlength' => 128,
    );

    $form['#submit'][] = 'admin_role_settings_form_submit';
    return system_settings_form($form);
}

/**
 * Submit callback.
 */
function admin_role_settings_form_submit($form, &$form_state) {
    variable_set('current_admin_role', $form_state['values']['admin_role']);
}