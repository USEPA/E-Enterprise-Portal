<?php
/**
 * @file
 * developer_resources_area.features.user_permission.inc
 */

/**
 * Implements hook_user_default_permissions().
 */
function developer_resources_area_user_default_permissions() {
  $permissions = array();

  // Exported permission: 'create developer_resource content'.
  $permissions['create developer_resource content'] = array(
    'name' => 'create developer_resource content',
    'roles' => array(),
    'module' => 'node',
  );

  // Exported permission: 'delete any developer_resource content'.
  $permissions['delete any developer_resource content'] = array(
    'name' => 'delete any developer_resource content',
    'roles' => array(),
    'module' => 'node',
  );

  // Exported permission: 'delete own developer_resource content'.
  $permissions['delete own developer_resource content'] = array(
    'name' => 'delete own developer_resource content',
    'roles' => array(),
    'module' => 'node',
  );

  // Exported permission: 'delete terms in developer_resource'.
  $permissions['delete terms in developer_resource'] = array(
    'name' => 'delete terms in developer_resource',
    'roles' => array(),
    'module' => 'taxonomy',
  );

  // Exported permission: 'edit any developer_resource content'.
  $permissions['edit any developer_resource content'] = array(
    'name' => 'edit any developer_resource content',
    'roles' => array(),
    'module' => 'node',
  );

  // Exported permission: 'edit own developer_resource content'.
  $permissions['edit own developer_resource content'] = array(
    'name' => 'edit own developer_resource content',
    'roles' => array(),
    'module' => 'node',
  );

  // Exported permission: 'edit terms in developer_resource'.
  $permissions['edit terms in developer_resource'] = array(
    'name' => 'edit terms in developer_resource',
    'roles' => array(),
    'module' => 'taxonomy',
  );

  return $permissions;
}
