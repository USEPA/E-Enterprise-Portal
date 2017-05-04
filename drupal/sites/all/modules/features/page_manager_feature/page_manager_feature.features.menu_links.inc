<?php
/**
 * @file
 * page_manager_feature.features.menu_links.inc
 */

/**
 * Implements hook_menu_default_menu_links().
 */
function page_manager_feature_menu_default_menu_links() {
  $menu_links = array();

  // Exported menu link: main-menu_:<front>.
  $menu_links['main-menu_:<front>'] = array(
    'menu_name' => 'main-menu',
    'link_path' => '<front>',
    'router_path' => '',
    'link_title' => '+',
    'options' => array(
      'identifier' => 'main-menu_:<front>',
      'alter' => TRUE,
      'roles_for_menu' => array(
        'show' => array(
          111006868 => 111006868,
        ),
        'hide' => array(),
      ),
      'attributes' => array(
        'id' => 'access_all_accounts',
      ),
      'item_attributes' => array(
        'id' => '',
        'class' => '',
        'style' => '',
      ),
    ),
    'module' => 'menu',
    'hidden' => 0,
    'external' => 1,
    'has_children' => 1,
    'expanded' => 1,
    'weight' => 1,
    'customized' => 1,
  );
  // Exported menu link: main-menu_app-connect:app-connect-new.
  $menu_links['main-menu_app-connect:app-connect-new'] = array(
    'menu_name' => 'main-menu',
    'link_path' => 'app-connect-new',
    'router_path' => 'app-connect-new',
    'link_title' => 'App Connect',
    'options' => array(
      'attributes' => array(),
      'identifier' => 'main-menu_app-connect:app-connect-new',
    ),
    'module' => 'system',
    'hidden' => 1,
    'external' => 0,
    'has_children' => 0,
    'expanded' => 0,
    'weight' => -46,
    'customized' => 1,
  );

  // Translatables
  // Included for use with string extractors like potx.
  t('+');
  t('App Connect');

  return $menu_links;
}
