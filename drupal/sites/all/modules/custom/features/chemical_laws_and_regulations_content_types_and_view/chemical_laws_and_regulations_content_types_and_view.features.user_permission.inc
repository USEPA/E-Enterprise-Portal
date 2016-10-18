<?php
/**
 * @file
 * chemical_laws_and_regulations_content_types_and_view.features.user_permission.inc
 */

/**
 * Implements hook_user_default_permissions().
 */
function chemical_laws_and_regulations_content_types_and_view_user_default_permissions() {
  $permissions = array();

  // Exported permission: 'create chemical_searches content'.
  $permissions['create chemical_searches content'] = array(
    'name' => 'create chemical_searches content',
    'roles' => array(),
    'module' => 'node',
  );

  // Exported permission: 'create user_favorite_chemicals content'.
  $permissions['create user_favorite_chemicals content'] = array(
    'name' => 'create user_favorite_chemicals content',
    'roles' => array(),
    'module' => 'node',
  );

  // Exported permission: 'create user_favorite_laws content'.
  $permissions['create user_favorite_laws content'] = array(
    'name' => 'create user_favorite_laws content',
    'roles' => array(),
    'module' => 'node',
  );

  // Exported permission: 'delete any chemical_searches content'.
  $permissions['delete any chemical_searches content'] = array(
    'name' => 'delete any chemical_searches content',
    'roles' => array(),
    'module' => 'node',
  );

  // Exported permission: 'delete any user_favorite_chemicals content'.
  $permissions['delete any user_favorite_chemicals content'] = array(
    'name' => 'delete any user_favorite_chemicals content',
    'roles' => array(),
    'module' => 'node',
  );

  // Exported permission: 'delete any user_favorite_laws content'.
  $permissions['delete any user_favorite_laws content'] = array(
    'name' => 'delete any user_favorite_laws content',
    'roles' => array(),
    'module' => 'node',
  );

  // Exported permission: 'delete own chemical_searches content'.
  $permissions['delete own chemical_searches content'] = array(
    'name' => 'delete own chemical_searches content',
    'roles' => array(),
    'module' => 'node',
  );

  // Exported permission: 'delete own user_favorite_chemicals content'.
  $permissions['delete own user_favorite_chemicals content'] = array(
    'name' => 'delete own user_favorite_chemicals content',
    'roles' => array(),
    'module' => 'node',
  );

  // Exported permission: 'delete own user_favorite_laws content'.
  $permissions['delete own user_favorite_laws content'] = array(
    'name' => 'delete own user_favorite_laws content',
    'roles' => array(),
    'module' => 'node',
  );

  // Exported permission: 'edit any chemical_searches content'.
  $permissions['edit any chemical_searches content'] = array(
    'name' => 'edit any chemical_searches content',
    'roles' => array(),
    'module' => 'node',
  );

  // Exported permission: 'edit any user_favorite_chemicals content'.
  $permissions['edit any user_favorite_chemicals content'] = array(
    'name' => 'edit any user_favorite_chemicals content',
    'roles' => array(),
    'module' => 'node',
  );

  // Exported permission: 'edit any user_favorite_laws content'.
  $permissions['edit any user_favorite_laws content'] = array(
    'name' => 'edit any user_favorite_laws content',
    'roles' => array(),
    'module' => 'node',
  );

  // Exported permission: 'edit own chemical_searches content'.
  $permissions['edit own chemical_searches content'] = array(
    'name' => 'edit own chemical_searches content',
    'roles' => array(),
    'module' => 'node',
  );

  // Exported permission: 'edit own user_favorite_chemicals content'.
  $permissions['edit own user_favorite_chemicals content'] = array(
    'name' => 'edit own user_favorite_chemicals content',
    'roles' => array(),
    'module' => 'node',
  );

  // Exported permission: 'edit own user_favorite_laws content'.
  $permissions['edit own user_favorite_laws content'] = array(
    'name' => 'edit own user_favorite_laws content',
    'roles' => array(),
    'module' => 'node',
  );

  return $permissions;
}
