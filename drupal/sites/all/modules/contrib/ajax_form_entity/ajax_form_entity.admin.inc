<?php
/**
 * @file
 * Administration form settings
 */

/**
 * Implements hook_form().
 */
function ajax_form_entity_form() {

  $form = array();
  $form['#prefix'] = '<div id="form-message-wrapper"></div>';

  $entities = _ajax_form_entity_load_entities();
  foreach ($entities as $entity_name => $entity) {
    $form[$entity_name] = array(
      '#type' => 'vertical_tabs',
      '#prefix' => $entity['label'],
    );
    // Store the ID for the future.
    $form[$entity_name]['id'] = array(
      '#type' => 'value',
      '#value' => $entity['entity keys']['id'],
    );
    // Get all display types for the entity.
    $view_modes = array();
    foreach($entity['view modes'] AS $key => $value) {
      $view_modes[$key] = t($value['label']);
    }
    foreach ($entity['bundles'] as $bundle_name => $bundle) {
      $settings = variable_get('ajax_form_entity_' . $entity_name . '_' . $bundle_name, NULL);

      $form[$entity_name][$bundle_name] = array(
        '#type' => 'fieldset',
        '#title' => check_plain($bundle['label']),
      );
      $form[$entity_name][$bundle_name][$entity_name . '_' . $bundle_name . '_activate'] = array(
        '#type' => 'checkbox',
        '#title' => t('Activate for') . ' ' . check_plain($bundle['label']),
        '#default_value' => isset($settings) ? $settings['activate'] : 0,
      );
      $form[$entity_name][$bundle_name][$entity_name . '_' . $bundle_name . '_edit_activate'] = array(
        '#type' => 'checkbox',
        '#title' => t('Add an AJAX edit link'),
        '#default_value' => isset($settings) ? $settings['edit_activate'] : 0,
      );
      $form[$entity_name][$bundle_name][$entity_name . '_' . $bundle_name . '_delete_activate'] = array(
        '#type' => 'checkbox',
        '#title' => t('Add an AJAX delete link'),
        '#default_value' => isset($settings) ? $settings['delete_activate'] : 0,
      );
      $form[$entity_name][$bundle_name]['creation'] = array(
        '#type' => 'fieldset',
        '#description' => t('Creation settings'),
        '#collapsible' => FALSE,
        '#collapsed' => TRUE,
      );
      $form[$entity_name][$bundle_name]['creation'][$entity_name . '_' . $bundle_name . '_message'] = array(
        '#type' => 'checkbox',
        '#title' => t('Show confirmation messages if any'),
        '#default_value' => isset($settings) ? $settings['message'] : 1,
      );
      $form[$entity_name][$bundle_name]['creation'][$entity_name . '_' . $bundle_name . '_reload'] = array(
        '#type' => 'checkbox',
        '#title' => t('Reload the form after creation'),
        '#description' => t('Check this box if you wish to be able to create again after submission'),
        '#default_value' => isset($settings) ? $settings['reload'] : 1,
      );
      $id = str_replace('_', '-', $entity_name . '-' . $bundle_name);
      $form[$entity_name][$bundle_name]['creation'][$entity_name . '_' . $bundle_name . '_view_mode_region'] = array(
        '#type' => 'select',
        '#title' => t('On creation'),
        '#options' => array(
          'top' => t('Show the result at the top'),
          'bottom' => t('Show the result at the bottom'),
          'id'  => t('Append to <div id="!div"></div>', array('!div' => $id)),
          0 => t('Do not show the result'),
        ),
        '#description' => t('Note that for <em>append to</em> option, it is up to you to put the div wherever you want in the page.<br />Note also that classes @class will be masked.', array('@class' => '.remove-' . $id)),
        '#default_value' => isset($settings) ? $settings['view_mode_region'] : 'top',
      );
      $form[$entity_name][$bundle_name]['creation'][$entity_name . '_' . $bundle_name . '_view_mode'] = array(
        '#type' => 'select',
        '#title' => t('View mode'),
        '#options' => $view_modes,
        '#default_value' => isset($settings) ? $settings['view_mode'] : current($view_modes),
      );
    }
  }
  $form['submit'] = array(
    '#type' => 'submit',
    '#value' => t('Save configurations'),
  );
  return $form;
}

/**
 * Saves one variable per bundle.
 * Implements hook_form_submit().
 */
function ajax_form_entity_form_submit($form, &$form_state) {

  $entities = _ajax_form_entity_load_entities();
  foreach ($entities as $entity_name => $entity) {
    $settings = array();
    $settings['id'] = $form[$entity_name]['id']['#value'];
    foreach ($entity['bundles'] as $bundle_name => $bundle) {
      $settings['activate'] = $form_state['values'][$entity_name . '_' . $bundle_name . '_activate'];
      $settings['edit_activate'] = $form_state['values'][$entity_name . '_' . $bundle_name . '_edit_activate'];
      $settings['delete_activate'] = $form_state['values'][$entity_name . '_' . $bundle_name . '_delete_activate'];
      $settings['message'] = $form_state['values'][$entity_name . '_' . $bundle_name . '_message'];
      $settings['reload'] = $form_state['values'][$entity_name . '_' . $bundle_name . '_reload'];
      $settings['view_mode_region'] = $form_state['values'][$entity_name . '_' . $bundle_name . '_view_mode_region'];
      $settings['view_mode'] = $form_state['values'][$entity_name . '_' . $bundle_name . '_view_mode'];
      variable_set('ajax_form_entity_' . $entity_name . '_' . $bundle_name, $settings);
    }
  }

  // Clear entity info to rebuild extra fields (ajax link on display).
  entity_info_cache_clear();
  drupal_set_message(t('Configurations have been saved'));
}
