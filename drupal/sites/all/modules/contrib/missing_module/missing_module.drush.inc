<?php

/**
 * @file
 * Find modules missing in file system.
 */

/**
 * Implements hook_drush_command().
 */
function missing_module_drush_command() {
  $items = array();
  $items['list-missing-modules'] = array(
    'description' => "Lists modules activated in database, that are missing in filesystem.",
    'examples' => array(
      'drush mm' => 'Lists modules activated in database, that are missing in filesystem.',
    ),
    'aliases' => array('mm'),
  );
  return $items;
}

/**
 * Implements drush_hook().
 */
function drush_missing_module_list_missing_modules() {
  $modules = missing_module_find_missing();

  if ($modules) {
    drush_log(count($modules) . " Missing module(s) found.", 'warning');
    foreach ($modules as $mm) {
      drush_log("MODULE: $mm", 'warning');
    }

    drush_log("To fix run: drush dl " . implode(array_keys($modules), " "), 'warning');
  }
  else {
    drush_log("no missing modules found.", 'success');
  }
}
