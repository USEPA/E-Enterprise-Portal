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


    $form['#submit'][] = 'cdx_facility_widget_auth_settings_form_submit';
    return system_settings_form($form);
}

/**
 * Submit callback.
 */
function cdx_facility_widget_auth_settings_form_submit($form, &$form_state) {
    variable_set('cdx_facility_widget_auth_settings_valid', TRUE);
}