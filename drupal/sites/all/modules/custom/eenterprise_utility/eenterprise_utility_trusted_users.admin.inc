<?php
/**
 * Settings form.
 */
function trusted_users_list_settings($form, $form_state) {
    $form = array();

    $form['trusted_users_list_settings'] = array(
        '#type' => 'fieldset',
        '#title' => t('Use Trusted List for Authentication'),
        '#description' => t("Selecting yes allows users in the trusted list to log in. But rejects others."),
    );
    $form['trusted_users_list_settings']['list_used'] = array(
        '#type' => 'select',
        '#default_value' => variable_get('trusted_users_list_used'),
        '#title' => t('Use Trusted List?'),
        "#options" => array(
            "Yes" => t("Yes"),
            "No" => t("No")
        )
    );

    $form['#submit'][] = 'trusted_users_list_form_submit';
    return system_settings_form($form);
}

/**
 * Submit callback.
 */
function trusted_users_list_form_submit($form, &$form_state) {
    variable_set('trusted_users_list_used', $form_state['values']['list_used']);
}
