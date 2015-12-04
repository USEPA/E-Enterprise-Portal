<?php
/**
 * @file
 * other_items_of_interest_.features.user_role.inc
 */

/**
 * Implements hook_user_default_roles().
 */
function other_items_of_interest__user_default_roles() {
  $roles = array();

  // Exported role: state_admin.
  $roles['state_admin'] = array(
    'name' => 'state_admin',
    'weight' => 32,
  );

  // Exported role: state_user.
  $roles['state_user'] = array(
    'name' => 'state_user',
    'weight' => 33,
  );

  return $roles;
}
