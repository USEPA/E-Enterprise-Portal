<?php
/**
 * @file
 * ee_link_checker.features.menu_links.inc
 */

/**
 * Implements hook_menu_default_menu_links().
 */
function ee_link_checker_menu_default_menu_links() {
  $menu_links = array();

  // Exported menu link: management_broken-links:admin/reports/linkchecker
  $menu_links['management_broken-links:admin/reports/linkchecker'] = array(
    'menu_name' => 'management',
    'link_path' => 'admin/reports/linkchecker',
    'router_path' => 'admin/reports/linkchecker',
    'link_title' => 'Broken links',
    'options' => array(
      'attributes' => array(
        'title' => 'Shows a list of broken links in content.',
      ),
      'identifier' => 'management_broken-links:admin/reports/linkchecker',
    ),
    'module' => 'system',
    'hidden' => 0,
    'external' => 0,
    'has_children' => 0,
    'expanded' => 0,
    'weight' => 0,
    'customized' => 0,
    'parent_identifier' => 'management_reports:admin/reports',
  );
  // Exported menu link: management_link-checker:admin/config/content/linkchecker
  $menu_links['management_link-checker:admin/config/content/linkchecker'] = array(
    'menu_name' => 'management',
    'link_path' => 'admin/config/content/linkchecker',
    'router_path' => 'admin/config/content/linkchecker',
    'link_title' => 'Link checker',
    'options' => array(
      'attributes' => array(
        'title' => 'Configure the content types that should be checked for broken links and how the hypertext links will be checked and reported and repaired.',
      ),
      'identifier' => 'management_link-checker:admin/config/content/linkchecker',
    ),
    'module' => 'system',
    'hidden' => 0,
    'external' => 0,
    'has_children' => 0,
    'expanded' => 0,
    'weight' => 0,
    'customized' => 0,
    'parent_identifier' => 'management_content-authoring:admin/config/content',
  );
  // Translatables
  // Included for use with string extractors like potx.
  t('Broken links');
  t('Link checker');


  return $menu_links;
}
