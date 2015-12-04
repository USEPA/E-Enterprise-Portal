<?php
/**
 * @file
 * app_connect.features.menu_links.inc
 */

/**
 * Implements hook_menu_default_menu_links().
 */
function app_connect_menu_default_menu_links() {
  $menu_links = array();

  // Exported menu link: main-menu_app-connect:app-connect-new
  $menu_links['main-menu_app-connect:app-connect-new'] = array(
    'menu_name' => 'main-menu',
    'link_path' => 'app-connect-new',
    'router_path' => 'app-connect-new',
    'link_title' => 'App Connect',
    'options' => array(
      'attributes' => array(
        'title' => '',
      ),
      'identifier' => 'main-menu_app-connect:app-connect-new',
    ),
    'module' => 'system',
    'hidden' => 0,
    'external' => 0,
    'has_children' => 0,
    'expanded' => 0,
    'weight' => 1,
    'customized' => 1,
  );
  // Translatables
  // Included for use with string extractors like potx.
  t('App Connect');


  return $menu_links;
}
