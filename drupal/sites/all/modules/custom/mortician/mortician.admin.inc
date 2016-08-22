<?php

/**
 * Menu callback to generate overview form
 */
function mortician_callback() {
  $options = array();
  $deadModules = getDeadModules();
  if (!empty($deadModules)) {
    foreach ($deadModules as $index => $module) {
      $options[$index] = array(
        'file_name' => $module->info['name'],
        'version' => ($module->info['version']) ? $module->info['version'] : 'N/A',
        'file_path' => $module->filename,
        'operations' => _mortician_operation_links($module),
      );
    }
  }
  $header = array(
    'file_name' => t('Module name'),
    'version' => t('Version'),
    'file_path' => t('File path'),
    'operations' => t('Operations'),
  );
  $form['modules'] = array(
    '#type' => 'tableselect',
    '#header' => $header,
    '#options' => $options,
    '#empty' => '<b>' . t('No dead modules found.') . '</b>',
  );
  $form['clear_dead_modules'] = array(
    '#type' => 'submit',
    '#value' => t('Clear dead modules'),
    '#submit' => array('clear_dead_modules'),
  );
  return $form;
}


/**
 * Helper function to remove modules
 */
function _mortician_remove_callback() {
  global $user;
  $moduleIndex = $_GET['module'];
  $moduleIndex = check_plain($moduleIndex);
  mortician_remove_module($moduleIndex);
  drupal_goto('admin/config/development/performance/mortician');
}

/**
 * Helper function to construct operation links
 */
function _mortician_operation_links($details) {
  $remove_link = l('Remove',
    'admin/config/development/performance/mortician/remove',
    array('query' => array('module' => $details->filename), 'attributes' => array('title' => 'Remove the module.'))
  );

  return $remove_link;
}


/**
 * Submit callback to clear captured data
 */
function clear_dead_modules($form, &$form_state) {
  foreach ($form_state['values']['modules'] as $index => $filename) {
    mortician_remove_module($filename);
  }
}