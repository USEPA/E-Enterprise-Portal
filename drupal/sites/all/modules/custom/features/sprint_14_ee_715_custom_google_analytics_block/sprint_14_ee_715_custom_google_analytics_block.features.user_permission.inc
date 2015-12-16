<?php
/**
 * @file
 * sprint_14_ee_715_custom_google_analytics_block.features.user_permission.inc
 */

/**
 * Implements hook_user_default_permissions().
 */
function sprint_14_ee_715_custom_google_analytics_block_user_default_permissions() {
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
