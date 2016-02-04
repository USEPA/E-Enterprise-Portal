<?php
/**
 * Settings form for CDX Facility Management Widget.
 */
function cdx_facility_widget_settings($form, $form_state) {
    $form = array();

    $form['cdx_facility_widget_settings'] = array(
        '#type' => 'fieldset',
        '#title' => t('CDX Facility Management Widget Resource Settings'),
        '#description' => t("Fill in Resource URL for CDX Facility Management Widget."),
    );
    $form['cdx_facility_widget_settings']['cdx_facility_resource_url'] = array(
        '#type' => 'textfield',
        '#title' => t('CDX Facility Resource URL'),
        '#default_value' => variable_get('cdx_facility_resource_url'),
        '#required' => TRUE,
    );
    $form['cdx_facility_widget_settings']['cdx_facility_user_logout_session'] = array(
        '#type' => 'textfield',
        '#title' => t('Time (minutes) user is allowed to be logged in before CDX no longer accepts token'),
        '#default_value' => variable_get('cdx_facility_user_logout_session'),
        '#element_validate' => array('element_validate_number'),
        '#required' => TRUE,
    );

    $form['cdx_facility_widget_settings']['cdx_facility_token_expiration'] = array(
        '#type' => 'textfield',
        '#title' => t('Time (seconds) before NAAS token for CDX widget expires'),
        '#default_value' => variable_get('cdx_facility_token_expiration'),
        '#element_validate' => array('element_validate_number'),
        '#required' => TRUE,
    );

    $form['cdx_facility_widget_settings']['cdx_facility_naas_wsdl'] = array(
        '#type' => 'textfield',
        '#title' => t('CDX Facility WSDL'),
        '#default_value' => variable_get('cdx_facility_naas_wsdl'),
        '#required' => TRUE,
    );
    $form['cdx_facility_widget_settings']['cdx_facility_password'] = array(
        '#type' => 'password',
        '#title' => t('WSDL Password- same as FRS settings password.'),
        '#default_value' => variable_get('cdx_facility_password'),
        '#required' => TRUE,
    );
    $form['cdx_facility_widget_settings']['cdx_facility_local'] = array(
        '#type' => 'checkbox',
        '#title' => t('Load WSDL from server instead of service endpoint.'),
        '#default_value' => variable_get('cdx_facility_local'),
        '#required' => FALSE,
    );

    // temp for testing on aws
    $form['cdx_facility_widget_settings']['temp_create_new_token'] = array(
        '#type' => 'checkbox',
        '#title' => t('Create new token (instead of using one from bridge)?'),
        '#default_value' => variable_get('temp_create_new_token'),
        '#required' => FALSE,
    );
    $form['cdx_facility_widget_settings']['local_testing'] = array(
        '#type' => 'checkbox',
        '#title' => t('Local testing?'),
        '#default_value' => variable_get('local_testing'),
        '#description' => t('Only use for local development environments.'),
        '#required' => FALSE,
    );
    $form['cdx_facility_widget_settings']['local_testing_user_id'] = array(
        '#type' => 'textfield',
        '#title' => t('Testing User ID '),
        '#default_value' => variable_get('local_testing_user_id'),
        '#description' => t('Only for local development environments or for admin. This user id will be used for the widget.'),
        '#required' => FALSE,
    );




    $form['#submit'][] = 'cdx_facility_widget_auth_settings_form_submit';
    return system_settings_form($form);
}

/**
 * Submit callback.
 */
function cdx_facility_widget_auth_settings_form_submit($form, &$form_state) {
    variable_set('cdx_facility_widget_auth_settings_valid', TRUE);
}