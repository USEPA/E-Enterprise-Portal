<?php
/**
 * @file
 * recommended_resources_feature.features.user_role.inc
 */

/**
 * Implements hook_user_default_roles().
 */
function recommended_resources_feature_user_default_roles() {
  $roles = array();

  // Exported role: local_government_admin.
  $roles['local_government_admin'] = array(
    'name' => 'local_government_admin',
    'weight' => 70,
  );

  return $roles;
}
