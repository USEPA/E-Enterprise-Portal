<?php
/**
 * @file
 * workbench_header.features.user_permission.inc
 */

/**
 * Implements hook_user_default_permissions().
 */
function workbench_header_user_default_permissions() {
  $permissions = array();

  // Exported permission: 'use text format allow_javascript'.
  $permissions['use text format allow_javascript'] = array(
    'name' => 'use text format allow_javascript',
    'roles' => array(
      'admin' => 'admin',
    ),
    'module' => 'filter',
  );

  return $permissions;
}
