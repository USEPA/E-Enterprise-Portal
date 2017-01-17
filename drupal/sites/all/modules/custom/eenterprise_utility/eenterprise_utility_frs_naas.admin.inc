<?php
/**
 * Settings form for FRS NAAS Authentication and Zip code lookup services.
 */
function frs_naas_auth_settings($form, $form_state) {
    $form = array();

    $form['frs_naas_settings'] = array(
        '#type' => 'fieldset',
        '#title' => t('FRS NAAS and Lookup Settings'),
        '#description' => t("Fill in FRS NAAS Authentication for token and Zip code, Latitude and Longitude Lookup Settings."),
    );
    $form['frs_naas_settings']['frs_api_lookup_ip'] = array(
        '#type' => 'textfield',
        '#title' => t('FRS API Lookup IP'),
        '#default_value' => variable_get('frs_api_lookup_ip'),
        '#required' => TRUE,
    );
    $form['frs_naas_settings']['frs_api_lookup_url'] = array(
        '#type' => 'textfield',
        '#size' => 120,
        '#title' => t('FRS API Lookup URL'),
        '#default_value' => variable_get('frs_api_lookup_url'),
        '#required' => TRUE,
    );
    $form['frs_naas_settings']['cdx_node_token_wsdl'] = array(
        '#type' => 'textfield',
        '#size' => 120,
        '#title' => t('CDX Node WSDL'),
        '#default_value' => variable_get('cdx_node_token_wsdl'),
        '#required' => TRUE,
    );

    $form['frs_naas_settings']['cdx_node_token_email'] = array(
        '#type' => 'textfield',
        '#title' => t('CDX Node Auth Email'),
        '#default_value' => variable_get('cdx_node_token_email'),
        '#required' => TRUE,
    );

    $form['frs_naas_settings']['cdx_node_token_password'] = array(
        '#type' => 'password',
        '#title' => t('CDX Node Auth Password'),
        '#default_value' => variable_get('cdx_node_token_password'),
        '#required' => TRUE,
    );
    $form['frs_naas_settings']['cdx_node_token_domain'] = array(
        '#type' => 'textfield',
        '#title' => t('CDX Node Auth Domain'),
        '#default_value' => variable_get('cdx_node_token_domain'),
        '#required' => TRUE,
    );
    $form['frs_naas_settings']['cdx_node_token_auth_method'] = array(
        '#type' => 'textfield',
        '#title' => t('CDX Node Authentication Method'),
        '#default_value' => variable_get('cdx_node_token_auth_method'),
        '#required' => TRUE,
    );
    $form['frs_naas_settings']['frs_test_proxy'] = array(
      '#type' => 'textfield',
      '#title' => t('Proxy Url if using Test Proxy'),
      '#default_value' => variable_get('frs_test_proxy'),
    );
    $form['frs_naas_settings']['frs_test_proxy_base_url'] = array(
      '#type' => 'textfield',
      '#title' => t('Base URL if using Test Proxy'),
      '#default_value' => variable_get('frs_test_proxy_base_url'),
    );

    $form['#submit'][] = 'frs_naas_auth_settings_form_submit';
    return system_settings_form($form);
}

/**
 * Submit callback.
 */
function frs_naas_auth_settings_form_submit($form, &$form_state) {
    variable_set('frs_naas_auth_settings_valid', TRUE);
}