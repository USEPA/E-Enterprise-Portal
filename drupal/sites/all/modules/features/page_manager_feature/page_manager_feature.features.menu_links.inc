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
    'weight' => 0,
    'customized' => 1,
  );
  // Exported menu link: main-menu_cdx:register_link/cdx.
  $menu_links['main-menu_cdx:register_link/cdx'] = array(
    'menu_name' => 'main-menu',
    'link_path' => 'register_link/cdx',
    'router_path' => 'register_link/%',
    'link_title' => 'CDX',
    'options' => array(
      'roles_for_menu' => array(
        'show' => array(),
        'hide' => array(
          179002433 => 179002433,
        ),
      ),
      'attributes' => array(),
      'item_attributes' => array(
        'id' => '',
        'class' => '',
        'style' => '',
      ),
      'alter' => TRUE,
      'identifier' => 'main-menu_cdx:register_link/cdx',
    ),
    'module' => 'menu',
    'hidden' => 0,
    'external' => 0,
    'has_children' => 0,
    'expanded' => 0,
    'weight' => 0,
    'customized' => 1,
    'parent_identifier' => 'main-menu_:<front>',
  );
  // Exported menu link: main-menu_scs:node/51170.
  $menu_links['main-menu_scs:node/51170'] = array(
    'menu_name' => 'main-menu',
    'link_path' => 'node/51170',
    'router_path' => 'node/%',
    'link_title' => 'SCS',
    'options' => array(
      'alter' => TRUE,
      'roles_for_menu' => array(
        'show' => array(
          111006868 => 111006868,
        ),
        'hide' => array(
          47628701 => 47628701,
        ),
      ),
      'attributes' => array(),
      'item_attributes' => array(
        'id' => '',
        'class' => '',
        'style' => '',
      ),
      'identifier' => 'main-menu_scs:node/51170',
    ),
    'module' => 'menu',
    'hidden' => 0,
    'external' => 0,
    'has_children' => 0,
    'expanded' => 0,
    'weight' => 0,
    'customized' => 0,
    'parent_identifier' => 'main-menu_:<front>',
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
    'weight' => 0,
    'customized' => 1,
  );

  // Translatables
  // Included for use with string extractors like potx.
  t('+');
  t('App Connect');
  t('CDX');
  t('SCS');

  return $menu_links;
}
