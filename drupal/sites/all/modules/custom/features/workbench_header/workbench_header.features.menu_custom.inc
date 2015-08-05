<?php
/**
 * @file
 * workbench_header.features.menu_custom.inc
 */

/**
 * Implements hook_menu_default_menu_custom().
 */
function workbench_header_menu_default_menu_custom() {
  $menus = array();

  // Exported menu: menu-ee-workbench-cdx-menu.
  $menus['menu-ee-workbench-cdx-menu'] = array(
    'menu_name' => 'menu-ee-workbench-cdx-menu',
    'title' => 'EE Workbench CDX Menu',
    'description' => 'Menu with Home, Facilities, Reporting, etc. for regulatees and regulators',
  );
  // Exported menu: menu-ee-workbench-public-menu.
  $menus['menu-ee-workbench-public-menu'] = array(
    'menu_name' => 'menu-ee-workbench-public-menu',
    'title' => 'EE Workbench Public Menu',
    'description' => 'Menu with Home, Air, Water, etc. that adjusts based on user',
  );
  // Exported menu: user-menu.
  $menus['user-menu'] = array(
    'menu_name' => 'user-menu',
    'title' => 'User menu',
    'description' => 'The <em>User</em> menu contains links related to the user\'s account, as well as the \'Log out\' link.',
  );
  // Translatables
  // Included for use with string extractors like potx.
  t('EE Workbench CDX Menu');
  t('EE Workbench Public Menu');
  t('Menu with Home, Air, Water, etc. that adjusts based on user');
  t('Menu with Home, Facilities, Reporting, etc. for regulatees and regulators');
  t('The <em>User</em> menu contains links related to the user\'s account, as well as the \'Log out\' link.');
  t('User menu');


  return $menus;
}
