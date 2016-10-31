<?php
/**
 * @file
 * faqs_and_views.features.menu_links.inc
 */

/**
 * Implements hook_menu_default_menu_links().
 */
function faqs_and_views_menu_default_menu_links() {
  $menu_links = array();

  // Exported menu link: user-menu_faqs:faqs
  $menu_links['user-menu_faqs:faqs'] = array(
    'menu_name' => 'user-menu',
    'link_path' => 'faqs',
    'router_path' => 'faqs',
    'link_title' => 'FAQs',
    'options' => array(
      'attributes' => array(
        'title' => '',
      ),
      'identifier' => 'user-menu_faqs:faqs',
    ),
    'module' => 'menu',
    'hidden' => 0,
    'external' => 0,
    'has_children' => 0,
    'expanded' => 0,
    'weight' => 0,
    'customized' => 1,
  );
  // Translatables
  // Included for use with string extractors like potx.
  t('FAQs');


  return $menu_links;
}
