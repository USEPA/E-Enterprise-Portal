<?php
/**
 * @file
 * linked_accounts_feature.features.menu_links.inc
 */

/**
 * Implements hook_menu_default_menu_links().
 */
function linked_accounts_feature_menu_default_menu_links() {
  $menu_links = array();

  // Exported menu link: main-menu_:linked_accounts.
  $menu_links['main-menu_:linked_accounts'] = array(
    'menu_name' => 'main-menu',
    'link_path' => 'linked_accounts',
    'router_path' => 'linked_accounts',
    'link_title' => '+',
    'options' => array(
      'attributes' => array(
        'class' => array(
          0 => 'parent-link',
        ),
      ),
      'identifier' => 'main-menu_:linked_accounts',
    ),
    'module' => 'system',
    'hidden' => 0,
    'external' => 0,
    'has_children' => 1,
    'expanded' => 1,
    'weight' => 0,
    'customized' => 0,
  );
  // Exported menu link: main-menu_cdx:cdx.
  $menu_links['main-menu_cdx:cdx'] = array(
    'menu_name' => 'main-menu',
    'link_path' => 'cdx',
    'router_path' => 'cdx',
    'link_title' => 'CDX',
    'options' => array(
      'identifier' => 'main-menu_cdx:cdx',
    ),
    'module' => 'system',
    'hidden' => 0,
    'external' => 0,
    'has_children' => 0,
    'expanded' => 0,
    'weight' => -50,
    'customized' => 1,
    'parent_identifier' => 'main-menu_:linked_accounts',
  );
  // Exported menu link: main-menu_scs:scs.
  $menu_links['main-menu_scs:scs'] = array(
    'menu_name' => 'main-menu',
    'link_path' => 'scs',
    'router_path' => 'scs',
    'link_title' => 'SCS',
    'options' => array(
      'identifier' => 'main-menu_scs:scs',
    ),
    'module' => 'system',
    'hidden' => 0,
    'external' => 0,
    'has_children' => 0,
    'expanded' => 0,
    'weight' => -49,
    'customized' => 1,
    'parent_identifier' => 'main-menu_:linked_accounts',
  );

  // Translatables
  // Included for use with string extractors like potx.
  t('+');
  t('CDX');
  t('SCS');

  return $menu_links;
}
