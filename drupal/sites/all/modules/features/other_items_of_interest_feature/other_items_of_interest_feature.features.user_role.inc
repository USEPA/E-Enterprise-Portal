<?php
/**
 * @file
 * other_items_of_interest_feature.features.user_role.inc
 */

/**
 * Implements hook_user_default_roles().
 */
function other_items_of_interest_feature_user_default_roles() {
  $roles = array();

  // Exported role: state_admin.
  $roles['state_admin'] = array(
    'name' => 'state_admin',
    'weight' => 32,
    'machine_name' => 'state_admin',
  );

  // Exported role: state_user.
  $roles['state_user'] = array(
    'name' => 'state_user',
    'weight' => 33,
    'machine_name' => 'state_user',
  );

  return $roles;
}
