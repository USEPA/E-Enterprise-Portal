<?php
/**
 * @file
 * app_connect.features.user_permission.inc
 */

/**
 * Implements hook_user_default_permissions().
 */
function app_connect_user_default_permissions() {
  $permissions = array();

  // Exported permission: 'create ee_program_service content'.
  $permissions['create ee_program_service content'] = array(
    'name' => 'create ee_program_service content',
    'roles' => array(),
    'module' => 'node',
  );

  // Exported permission: 'delete any ee_program_service content'.
  $permissions['delete any ee_program_service content'] = array(
    'name' => 'delete any ee_program_service content',
    'roles' => array(),
    'module' => 'node',
  );

  // Exported permission: 'delete own ee_program_service content'.
  $permissions['delete own ee_program_service content'] = array(
    'name' => 'delete own ee_program_service content',
    'roles' => array(),
    'module' => 'node',
  );

  // Exported permission: 'delete terms in ee_external_program_service_status'.
  $permissions['delete terms in ee_external_program_service_status'] = array(
    'name' => 'delete terms in ee_external_program_service_status',
    'roles' => array(),
    'module' => 'taxonomy',
  );

  // Exported permission: 'delete terms in programs'.
  $permissions['delete terms in programs'] = array(
    'name' => 'delete terms in programs',
    'roles' => array(),
    'module' => 'taxonomy',
  );

  // Exported permission: 'edit any ee_program_service content'.
  $permissions['edit any ee_program_service content'] = array(
    'name' => 'edit any ee_program_service content',
    'roles' => array(),
    'module' => 'node',
  );

  // Exported permission: 'edit own ee_program_service content'.
  $permissions['edit own ee_program_service content'] = array(
    'name' => 'edit own ee_program_service content',
    'roles' => array(),
    'module' => 'node',
  );

  // Exported permission: 'edit terms in ee_external_program_service_status'.
  $permissions['edit terms in ee_external_program_service_status'] = array(
    'name' => 'edit terms in ee_external_program_service_status',
    'roles' => array(),
    'module' => 'taxonomy',
  );

  // Exported permission: 'edit terms in programs'.
  $permissions['edit terms in programs'] = array(
    'name' => 'edit terms in programs',
    'roles' => array(),
    'module' => 'taxonomy',
  );

  return $permissions;
}
