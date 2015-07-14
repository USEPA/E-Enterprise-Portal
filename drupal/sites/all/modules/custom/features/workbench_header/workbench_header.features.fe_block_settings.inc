<?php
/**
 * @file
 * workbench_header.features.fe_block_settings.inc
 */

/**
 * Implements hook_default_fe_block_settings().
 */
function workbench_header_default_fe_block_settings() {
  $export = array();

  $export['version'] = '2.0';

  $export['block-ee_header_locations'] = array(
    'cache' => -1,
    'custom' => 0,
    'machine_name' => 'ee_header_locations',
    'module' => 'block',
    'node_types' => array(),
    'pages' => '',
    'roles' => array(
      'authenticated user' => 2,
    ),
    'themes' => array(
      'bartik' => array(
        'region' => '',
        'status' => 0,
        'theme' => 'bartik',
        'weight' => 0,
      ),
      'bootstrap' => array(
        'region' => '',
        'status' => 0,
        'theme' => 'bootstrap',
        'weight' => 0,
      ),
      'greentrees' => array(
        'region' => 'nav-bar',
        'status' => 1,
        'theme' => 'greentrees',
        'weight' => -21,
      ),
      'oneepa' => array(
        'region' => 'header',
        'status' => 1,
        'theme' => 'oneepa',
        'weight' => 0,
      ),
      'seven' => array(
        'region' => '',
        'status' => 0,
        'theme' => 'seven',
        'weight' => 0,
      ),
      'zen' => array(
        'region' => '',
        'status' => 0,
        'theme' => 'zen',
        'weight' => 0,
      ),
    ),
    'title' => '',
    'visibility' => 0,
  );

  $export['block-ee_social_media'] = array(
    'cache' => -1,
    'custom' => 0,
    'machine_name' => 'ee_social_media',
    'module' => 'block',
    'node_types' => array(),
    'pages' => '',
    'roles' => array(),
    'themes' => array(
      'bartik' => array(
        'region' => '',
        'status' => 0,
        'theme' => 'bartik',
        'weight' => 0,
      ),
      'bootstrap' => array(
        'region' => '',
        'status' => 0,
        'theme' => 'bootstrap',
        'weight' => 0,
      ),
      'greentrees' => array(
        'region' => 'footer',
        'status' => 1,
        'theme' => 'greentrees',
        'weight' => -22,
      ),
      'oneepa' => array(
        'region' => '',
        'status' => 0,
        'theme' => 'oneepa',
        'weight' => 0,
      ),
      'seven' => array(
        'region' => '',
        'status' => 0,
        'theme' => 'seven',
        'weight' => 0,
      ),
      'zen' => array(
        'region' => '',
        'status' => 0,
        'theme' => 'zen',
        'weight' => 0,
      ),
    ),
    'title' => 'Spread the Word',
    'visibility' => 0,
  );

  $export['block-greentrees_ee_header'] = array(
    'cache' => -1,
    'custom' => 0,
    'machine_name' => 'greentrees_ee_header',
    'module' => 'block',
    'node_types' => array(),
    'pages' => '',
    'roles' => array(
      'anonymous user' => 1,
      'authenticated user' => 2,
    ),
    'themes' => array(
      'bartik' => array(
        'region' => '',
        'status' => 0,
        'theme' => 'bartik',
        'weight' => 0,
      ),
      'bootstrap' => array(
        'region' => '',
        'status' => 0,
        'theme' => 'bootstrap',
        'weight' => 0,
      ),
      'greentrees' => array(
        'region' => 'header',
        'status' => 1,
        'theme' => 'greentrees',
        'weight' => -23,
      ),
      'oneepa' => array(
        'region' => '',
        'status' => 0,
        'theme' => 'oneepa',
        'weight' => 0,
      ),
      'seven' => array(
        'region' => '',
        'status' => 0,
        'theme' => 'seven',
        'weight' => 0,
      ),
      'zen' => array(
        'region' => '',
        'status' => 0,
        'theme' => 'zen',
        'weight' => 0,
      ),
    ),
    'title' => '',
    'visibility' => 0,
  );

  $export['block-workbenchheader'] = array(
    'cache' => -1,
    'custom' => 0,
    'machine_name' => 'workbenchheader',
    'module' => 'block',
    'node_types' => array(),
    'pages' => 'workbench',
    'roles' => array(),
    'themes' => array(
      'bartik' => array(
        'region' => '',
        'status' => 0,
        'theme' => 'bartik',
        'weight' => 0,
      ),
      'bootstrap' => array(
        'region' => '',
        'status' => 0,
        'theme' => 'bootstrap',
        'weight' => 0,
      ),
      'greentrees' => array(
        'region' => '',
        'status' => 0,
        'theme' => 'greentrees',
        'weight' => -17,
      ),
      'oneepa' => array(
        'region' => '',
        'status' => 0,
        'theme' => 'oneepa',
        'weight' => -17,
      ),
      'seven' => array(
        'region' => '',
        'status' => 0,
        'theme' => 'seven',
        'weight' => 0,
      ),
      'zen' => array(
        'region' => '',
        'status' => 0,
        'theme' => 'zen',
        'weight' => 0,
      ),
    ),
    'title' => '',
    'visibility' => 1,
  );

  $export['eenterprise_bridge_auth-eenterprise_bridge_auth'] = array(
    'cache' => 1,
    'custom' => 0,
    'delta' => 'eenterprise_bridge_auth',
    'module' => 'eenterprise_bridge_auth',
    'node_types' => array(),
    'pages' => '',
    'roles' => array(),
    'themes' => array(
      'bartik' => array(
        'region' => '',
        'status' => 0,
        'theme' => 'bartik',
        'weight' => 0,
      ),
      'bootstrap' => array(
        'region' => '',
        'status' => 0,
        'theme' => 'bootstrap',
        'weight' => 0,
      ),
      'greentrees' => array(
        'region' => 'header',
        'status' => 1,
        'theme' => 'greentrees',
        'weight' => -21,
      ),
      'oneepa' => array(
        'region' => '',
        'status' => 0,
        'theme' => 'oneepa',
        'weight' => 3,
      ),
      'seven' => array(
        'region' => '',
        'status' => 0,
        'theme' => 'seven',
        'weight' => 0,
      ),
      'zen' => array(
        'region' => 'content',
        'status' => 1,
        'theme' => 'zen',
        'weight' => 0,
      ),
    ),
    'title' => '',
    'visibility' => 0,
  );

  $export['menu-menu-ee-workbench-cdx-menu'] = array(
    'cache' => -1,
    'custom' => 0,
    'delta' => 'menu-ee-workbench-cdx-menu',
    'module' => 'menu',
    'node_types' => array(),
    'pages' => '',
    'roles' => array(
      'admin' => 3,
      'Certifier' => 9,
      'Delegated Certifier' => 12,
      'EPA Reviewer' => 11,
      'federal-regulator' => 4,
      'industry-user' => 5,
      'Preparer' => 8,
      'regional-regulator' => 6,
      'State Reviewer' => 10,
      'state-regulator' => 7,
    ),
    'themes' => array(
      'bartik' => array(
        'region' => '',
        'status' => 0,
        'theme' => 'bartik',
        'weight' => 0,
      ),
      'bootstrap' => array(
        'region' => '',
        'status' => 0,
        'theme' => 'bootstrap',
        'weight' => 0,
      ),
      'greentrees' => array(
        'region' => 'nav-bar',
        'status' => 1,
        'theme' => 'greentrees',
        'weight' => -23,
      ),
      'oneepa' => array(
        'region' => 'header',
        'status' => 1,
        'theme' => 'oneepa',
        'weight' => -19,
      ),
      'seven' => array(
        'region' => '',
        'status' => 0,
        'theme' => 'seven',
        'weight' => 0,
      ),
      'zen' => array(
        'region' => '',
        'status' => 0,
        'theme' => 'zen',
        'weight' => 0,
      ),
    ),
    'title' => '',
    'visibility' => 0,
  );

  $export['menu-menu-ee-workbench-public-menu'] = array(
    'cache' => -1,
    'custom' => 0,
    'delta' => 'menu-ee-workbench-public-menu',
    'module' => 'menu',
    'node_types' => array(),
    'pages' => '',
    'roles' => array(
      'Public User' => 13,
    ),
    'themes' => array(
      'bartik' => array(
        'region' => '',
        'status' => 0,
        'theme' => 'bartik',
        'weight' => 0,
      ),
      'bootstrap' => array(
        'region' => '',
        'status' => 0,
        'theme' => 'bootstrap',
        'weight' => 0,
      ),
      'greentrees' => array(
        'region' => 'nav-bar',
        'status' => 1,
        'theme' => 'greentrees',
        'weight' => -22,
      ),
      'oneepa' => array(
        'region' => 'header',
        'status' => 1,
        'theme' => 'oneepa',
        'weight' => -18,
      ),
      'seven' => array(
        'region' => '',
        'status' => 0,
        'theme' => 'seven',
        'weight' => 0,
      ),
      'zen' => array(
        'region' => '',
        'status' => 0,
        'theme' => 'zen',
        'weight' => 0,
      ),
    ),
    'title' => '',
    'visibility' => 0,
  );

  $export['menu-menu-footer-disclaimers'] = array(
    'cache' => -1,
    'custom' => 0,
    'delta' => 'menu-footer-disclaimers',
    'module' => 'menu',
    'node_types' => array(),
    'pages' => '',
    'roles' => array(),
    'themes' => array(
      'bartik' => array(
        'region' => '',
        'status' => 0,
        'theme' => 'bartik',
        'weight' => 0,
      ),
      'bootstrap' => array(
        'region' => '',
        'status' => 0,
        'theme' => 'bootstrap',
        'weight' => 0,
      ),
      'greentrees' => array(
        'region' => 'footer',
        'status' => 1,
        'theme' => 'greentrees',
        'weight' => -21,
      ),
      'oneepa' => array(
        'region' => '',
        'status' => 0,
        'theme' => 'oneepa',
        'weight' => -10,
      ),
      'seven' => array(
        'region' => '',
        'status' => 0,
        'theme' => 'seven',
        'weight' => 0,
      ),
      'zen' => array(
        'region' => '',
        'status' => 0,
        'theme' => 'zen',
        'weight' => 0,
      ),
    ),
    'title' => '',
    'visibility' => 0,
  );

  $export['system-user-menu'] = array(
    'cache' => -1,
    'custom' => 0,
    'delta' => 'user-menu',
    'module' => 'system',
    'node_types' => array(),
    'pages' => '',
    'roles' => array(),
    'themes' => array(
      'bartik' => array(
        'region' => '',
        'status' => 0,
        'theme' => 'bartik',
        'weight' => 0,
      ),
      'bootstrap' => array(
        'region' => '',
        'status' => 0,
        'theme' => 'bootstrap',
        'weight' => 0,
      ),
      'greentrees' => array(
        'region' => 'top_header',
        'status' => 1,
        'theme' => 'greentrees',
        'weight' => 4,
      ),
      'oneepa' => array(
        'region' => '',
        'status' => 0,
        'theme' => 'oneepa',
        'weight' => 4,
      ),
      'seven' => array(
        'region' => '',
        'status' => 0,
        'theme' => 'seven',
        'weight' => 0,
      ),
      'zen' => array(
        'region' => '',
        'status' => 0,
        'theme' => 'zen',
        'weight' => 0,
      ),
    ),
    'title' => '',
    'visibility' => 0,
  );

  return $export;
}
