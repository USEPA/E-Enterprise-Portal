<?php
/**
 * @file
 * faqs_and_views.features.user_permission.inc
 */

/**
 * Implements hook_user_default_permissions().
 */
function faqs_and_views_user_default_permissions() {
  $permissions = array();

  // Exported permission: 'create ee_faqs content'.
  $permissions['create ee_faqs content'] = array(
    'name' => 'create ee_faqs content',
    'roles' => array(),
    'module' => 'node',
  );

  // Exported permission: 'delete any ee_faqs content'.
  $permissions['delete any ee_faqs content'] = array(
    'name' => 'delete any ee_faqs content',
    'roles' => array(),
    'module' => 'node',
  );

  // Exported permission: 'delete own ee_faqs content'.
  $permissions['delete own ee_faqs content'] = array(
    'name' => 'delete own ee_faqs content',
    'roles' => array(),
    'module' => 'node',
  );

  // Exported permission: 'delete terms in faq_categories'.
  $permissions['delete terms in faq_categories'] = array(
    'name' => 'delete terms in faq_categories',
    'roles' => array(),
    'module' => 'taxonomy',
  );

  // Exported permission: 'edit any ee_faqs content'.
  $permissions['edit any ee_faqs content'] = array(
    'name' => 'edit any ee_faqs content',
    'roles' => array(),
    'module' => 'node',
  );

  // Exported permission: 'edit own ee_faqs content'.
  $permissions['edit own ee_faqs content'] = array(
    'name' => 'edit own ee_faqs content',
    'roles' => array(),
    'module' => 'node',
  );

  // Exported permission: 'edit terms in faq_categories'.
  $permissions['edit terms in faq_categories'] = array(
    'name' => 'edit terms in faq_categories',
    'roles' => array(),
    'module' => 'taxonomy',
  );

  return $permissions;
}
