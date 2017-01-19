<?php

/**
 * @param $form
 * @param $form_state
 * @return mixed
 */
function eenterprise_utility_admin($form, $form_state) {
  $form = array();

  $form['eenterprise_utility_settings'] = array(
    '#type' => 'fieldset',
    '#title' => t('E-Enterprise Utility Configurations'),
  );

  $form['eenterprise_utility_settings']['ZipToCensusPlaceLookup_WFL'] = array(
    '#type' => 'textfield',
    '#title' => t('GPO Zip to Census Lookup'),
    '#default_value' => variable_get('ZipToCensusPlaceLookup_WFL', "https://services.arcgis.com/cJ9YHowT8TU7DUyn/arcgis/rest/services/ZipToCensusPlaceLookup_WFL/FeatureServer/1/query?"),
    '#required' => TRUE,
  );

  $form['eenterprise_utility_settings']['ZipToTribalLookups_WFL'] = array(
    '#type' => 'textfield',
    '#title' => t('GPO Zip to Tribe Lookup'),
    '#default_value' => variable_get('ZipToTribalLookups_WFL', "https://services.arcgis.com/cJ9YHowT8TU7DUyn/arcgis/rest/services/ZipToTribalLookups_WFL/FeatureServer/1/query?"),
    '#required' => TRUE,
  );

  $form['#validate'][] = 'eenterprise_utility_form_validate';
  $form['#submit'][] = 'eenterprise_utility_admin_form_submit';
  return system_settings_form($form);
}

/**
 * @param $form
 * @param $form_state
 */
function eenterprise_utility_admin_form_submit($form, &$form_state){

}

/**
 * Implements hook_validate().
 */
function eenterprise_utility_form_validate($form, &$form_state) {

}