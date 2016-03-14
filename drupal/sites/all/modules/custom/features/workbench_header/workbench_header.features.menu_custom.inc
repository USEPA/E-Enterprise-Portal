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

  // Exported menu: main-menu.
  $menus['main-menu'] = array(
    'menu_name' => 'main-menu',
    'title' => 'Main menu',
    'description' => '',
  );
  // Exported menu: menu-footer-disclaimers.
  $menus['menu-footer-disclaimers'] = array(
    'menu_name' => 'menu-footer-disclaimers',
    'title' => 'Footer Disclaimers',
    'description' => 'Footer policy links including E-Enterprise home, Privacy and Security Notice, Accessibility.',
  );
  // Exported menu: user-menu.
  $menus['user-menu'] = array(
    'menu_name' => 'user-menu',
    'title' => 'User menu',
    'description' => 'The <em>User</em> menu contains links related to the user\'s account, as well as the \'Log out\' link.',
  );
  // Translatables
  // Included for use with string extractors like potx.
  t('Footer Disclaimers');
  t('Footer policy links including E-Enterprise home, Privacy and Security Notice, Accessibility.');
  t('Main menu');
  t('The <em>User</em> menu contains links related to the user\'s account, as well as the \'Log out\' link.');
  t('User menu');


  return $menus;
}
