<?php
/**
 * @file
 * developer_resources_area.features.menu_links.inc
 */

/**
 * Implements hook_menu_default_menu_links().
 */
function developer_resources_area_menu_default_menu_links() {
  $menu_links = array();

  // Exported menu link: management_footer-disclaimers:admin/structure/menu/manage/menu-footer-disclaimers.
  $menu_links['management_footer-disclaimers:admin/structure/menu/manage/menu-footer-disclaimers'] = array(
    'menu_name' => 'management',
    'link_path' => 'admin/structure/menu/manage/menu-footer-disclaimers',
    'router_path' => 'admin/structure/menu/manage/%',
    'link_title' => 'Footer Disclaimers',
    'options' => array(
      'identifier' => 'management_footer-disclaimers:admin/structure/menu/manage/menu-footer-disclaimers',
    ),
    'module' => 'menu',
    'hidden' => 0,
    'external' => 0,
    'has_children' => 0,
    'expanded' => 0,
    'weight' => 0,
    'customized' => 0,
    'parent_identifier' => 'management_menus:admin/structure/menu',
  );
  // Exported menu link: navigation_developer-resource:node/add/developer-resource.
  $menu_links['navigation_developer-resource:node/add/developer-resource'] = array(
    'menu_name' => 'navigation',
    'link_path' => 'node/add/developer-resource',
    'router_path' => 'node/add/developer-resource',
    'link_title' => 'Developer Resource',
    'options' => array(
      'attributes' => array(
        'title' => 'Resources for Developers.  Used in /for-developers page / For Developers view.',
      ),
      'identifier' => 'navigation_developer-resource:node/add/developer-resource',
    ),
    'module' => 'system',
    'hidden' => 0,
    'external' => 0,
    'has_children' => 0,
    'expanded' => 0,
    'weight' => 0,
    'customized' => 0,
    'parent_identifier' => 'navigation_add-content:node/add',
  );

  // Translatables
  // Included for use with string extractors like potx.
  t('Developer Resource');
  t('Footer Disclaimers');

  return $menu_links;
}
