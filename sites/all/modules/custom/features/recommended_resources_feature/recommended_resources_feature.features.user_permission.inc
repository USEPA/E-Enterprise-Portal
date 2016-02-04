<?php
/**
 * @file
 * recommended_resources_feature.features.user_permission.inc
 */

/**
 * Implements hook_user_default_permissions().
 */
function recommended_resources_feature_user_default_permissions() {
  $permissions = array();

  // Exported permission: 'clear lgc feeds'.
  $permissions['clear lgc feeds'] = array(
    'name' => 'clear lgc feeds',
    'roles' => array(),
    'module' => 'feeds',
  );

  // Exported permission: 'create lgc_resource content'.
  $permissions['create lgc_resource content'] = array(
    'name' => 'create lgc_resource content',
    'roles' => array(),
    'module' => 'node',
  );

  // Exported permission: 'delete any lgc_resource content'.
  $permissions['delete any lgc_resource content'] = array(
    'name' => 'delete any lgc_resource content',
    'roles' => array(),
    'module' => 'node',
  );

  // Exported permission: 'delete own lgc_resource content'.
  $permissions['delete own lgc_resource content'] = array(
    'name' => 'delete own lgc_resource content',
    'roles' => array(),
    'module' => 'node',
  );

  // Exported permission: 'delete terms in lgc_audiences'.
  $permissions['delete terms in lgc_audiences'] = array(
    'name' => 'delete terms in lgc_audiences',
    'roles' => array(),
    'module' => 'taxonomy',
  );

  // Exported permission: 'delete terms in lgc_categories'.
  $permissions['delete terms in lgc_categories'] = array(
    'name' => 'delete terms in lgc_categories',
    'roles' => array(),
    'module' => 'taxonomy',
  );

  // Exported permission: 'delete terms in lgc_topics'.
  $permissions['delete terms in lgc_topics'] = array(
    'name' => 'delete terms in lgc_topics',
    'roles' => array(),
    'module' => 'taxonomy',
  );

  // Exported permission: 'edit any lgc_resource content'.
  $permissions['edit any lgc_resource content'] = array(
    'name' => 'edit any lgc_resource content',
    'roles' => array(),
    'module' => 'node',
  );

  // Exported permission: 'edit own lgc_resource content'.
  $permissions['edit own lgc_resource content'] = array(
    'name' => 'edit own lgc_resource content',
    'roles' => array(),
    'module' => 'node',
  );

  // Exported permission: 'edit terms in lgc_audiences'.
  $permissions['edit terms in lgc_audiences'] = array(
    'name' => 'edit terms in lgc_audiences',
    'roles' => array(),
    'module' => 'taxonomy',
  );

  // Exported permission: 'edit terms in lgc_categories'.
  $permissions['edit terms in lgc_categories'] = array(
    'name' => 'edit terms in lgc_categories',
    'roles' => array(),
    'module' => 'taxonomy',
  );

  // Exported permission: 'edit terms in lgc_topics'.
  $permissions['edit terms in lgc_topics'] = array(
    'name' => 'edit terms in lgc_topics',
    'roles' => array(),
    'module' => 'taxonomy',
  );

  // Exported permission: 'import lgc feeds'.
  $permissions['import lgc feeds'] = array(
    'name' => 'import lgc feeds',
    'roles' => array(),
    'module' => 'feeds',
  );

  // Exported permission: 'tamper lgc'.
  $permissions['tamper lgc'] = array(
    'name' => 'tamper lgc',
    'roles' => array(),
    'module' => 'feeds_tamper',
  );

  // Exported permission: 'unlock lgc feeds'.
  $permissions['unlock lgc feeds'] = array(
    'name' => 'unlock lgc feeds',
    'roles' => array(),
    'module' => 'feeds',
  );

  return $permissions;
}
