<?php
/**
 * @file
 * page_manager_feature.features.user_role.inc
 */

/**
 * Implements hook_user_default_roles().
 */
function page_manager_feature_user_default_roles() {
  $roles = array();

  // Exported role: eactivity-dataflows.
  $roles['eactivity-dataflows'] = array(
    'name' => 'eactivity-dataflows',
    'weight' => 121,
    'machine_name' => '',
  );

  return $roles;
}
