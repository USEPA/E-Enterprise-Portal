<?php

/**
 * @file
 * Administration pages for Webform Replay module.
 */

/**
 * Webform Replay settings form.
 */
function webform_replay_admin($form, &$form_state) {

  // Get available webform components.
  $components = webform_components();

  // Remove components that are known not to have user input.
  $exclude = array('fieldset', 'hidden', 'markup', 'pagebreak');
  $components = array_diff_key($components, array_flip($exclude));

  $options = array();
  foreach ($components as $key => $component) {
    $options[$key] = $component['label'];
  }

  $form['webform_replay_components'] = array(
    '#type' => 'checkboxes',
    '#title' => t("Webform component types"),
    '#options' => $options,
    '#default_value' => variable_get('webform_replay_components', array(NULL)),
    '#description' => t('Select component types for which field replay is available.'),
  );

  $form['actions']['#type'] = 'actions';
  $form['actions']['submit'] = array('#type' => 'submit', '#value' => t('Save configuration'));

  return system_settings_form($form);

}
