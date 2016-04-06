<?php
/**
 * Settings form for e-activity dataflow.
 */
function eactivity_dataflow_list_settings($form, $form_state) {
    $form = array();

    $form['eactivity_settings'] = array(
        '#type' => 'fieldset',
        '#title' => t('E-Activity Dataflow Settings'),
        '#description' => t("Fill in E-Activity Dataflow Settings."),
    );
    $form['eactivity_settings']['eactivity_auth_reg_wsdl'] = array(
        '#type' => 'textfield',
        '#size' => 120,
        '#title' => t('E-Activity Authentication/Registration WSDL'),
        '#default_value' => variable_get('eactivity_auth_reg_wsdl'),
        '#required' => TRUE,
    );
    $form['eactivity_settings']['eactivity_auth_reg_username'] = array(
        '#type' => 'textfield',
        '#title' => t('E-Activity Auth/Reg Username'),
        '#default_value' => variable_get('eactivity_auth_reg_username'),
        '#required' => TRUE,
    );
    $form['eactivity_settings']['eactivity_auth_reg_password'] = array(
        '#type' => 'password',
        '#title' => t('E-Activity Auth/Reg Password'),
        '#default_value' => variable_get('eactivity_auth_reg_password'),
        '#required' => TRUE,
    );
    $form['eactivity_settings']['eactivity_auth_reg_domain'] = array(
        '#type' => 'textfield',
        '#title' => t('E-Activity Auth/Reg Domain'),
        '#default_value' => variable_get('eactivity_auth_reg_domain'),
        '#required' => TRUE,
    );
    $form['eactivity_settings']['eactivity_auth_reg_auth_method'] = array(
        '#type' => 'textfield',
        '#title' => t('E-Activity Auth/Reg Authentication Method'),
        '#default_value' => variable_get('eactivity_auth_reg_auth_method'),
        '#required' => TRUE,
    );

    $form['eactivity_settings']['eactivity_dataflow_wsdl'] = array(
        '#type' => 'textfield',
        '#size' => 120,
        '#title' => t('E-Activity Dataflow WSDL (put test/dev/prod if using local wsdl source)'),
        '#default_value' => variable_get('eactivity_dataflow_wsdl'),
        '#required' => TRUE,
    );

    $form['eactivity_settings']['eactivity_dataflow_local'] = array(
        '#type' => 'checkbox',
        '#title' => t('Local eactivity dataflow source?'),
        '#default_value' => variable_get('eactivity_dataflow_local'),
        '#required' => FALSE,
    );
    $form['eactivity_settings']['attains_destination_url'] = array(
        '#type' => 'textfield',
        '#title' => t('Attains Destination URL'),
        '#default_value' => variable_get('attains_destination_url'),
        '#required' => TRUE,
    );
    //This config item is used to allow code execution for CDX username changes. CDX usernames should have @cdx at the end.
    $form['eactivity_settings']['cdx_usernames_mitigation'] = array(
        '#type' => 'textfield',
        '#title' => t('CDX Usernames Mitigation'),
        '#default_value' => variable_get('cdx_usernames_mitigation'),
        '#required' => TRUE,
    );

    $form['#submit'][] = 'eactivity_dataflow_settings_form_submit';
    return system_settings_form($form);
}

/**
 * Submit callback.
 */
function eactivity_dataflow_settings_form_submit($form, &$form_state) {
    variable_set('eactivity_dataflow_settings_valid', TRUE);
}
