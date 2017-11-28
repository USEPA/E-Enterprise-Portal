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
        'hide' => array(
          86156138 => 86156138,
        ),
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
    'weight' => -46,
    'customized' => 1,
  );
  // Exported menu link: main-menu_cdx:cdx.
  $menu_links['main-menu_cdx:cdx'] = array(
    'menu_name' => 'main-menu',
    'link_path' => 'cdx',
    'router_path' => 'cdx',
    'link_title' => 'CDX',
    'options' => array(
      'alter' => TRUE,
      'roles_for_menu' => array(
        'show' => array(
          179002433 => 179002433,
        ),
        'hide' => array(),
      ),
      'attributes' => array(),
      'item_attributes' => array(
        'id' => '',
        'class' => '',
        'style' => '',
      ),
      'identifier' => 'main-menu_cdx:cdx',
    ),
    'module' => 'system',
    'hidden' => 0,
    'external' => 0,
    'has_children' => 0,
    'expanded' => 0,
    'weight' => -48,
    'customized' => 1,
  );
  // Exported menu link: main-menu_scs:scs.
  $menu_links['main-menu_scs:scs'] = array(
    'menu_name' => 'main-menu',
    'link_path' => 'scs',
    'router_path' => 'scs',
    'link_title' => 'SCS',
    'options' => array(
      'alter' => TRUE,
      'roles_for_menu' => array(
        'show' => array(
          47628701 => 47628701,
        ),
        'hide' => array(),
      ),
      'attributes' => array(),
      'item_attributes' => array(
        'id' => '',
        'class' => '',
        'style' => '',
      ),
      'identifier' => 'main-menu_scs:scs',
    ),
    'module' => 'system',
    'hidden' => 0,
    'external' => 0,
    'has_children' => 0,
    'expanded' => 0,
    'weight' => -47,
    'customized' => 1,
  );

  // Translatables
  // Included for use with string extractors like potx.
  t('+');
  t('CDX');
  t('SCS');

  return $menu_links;
}
