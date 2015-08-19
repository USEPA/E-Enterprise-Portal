<?php
/**
 * @file
 * Contains the theme's functions to manipulate Drupal's default markup.
 *
 * Complete documentation for this file is available online.
 * @see https://drupal.org/node/1728096
 */

if ($GLOBALS['theme_key'] === 'eenterprise') {
  require_once dirname(__FILE__) . '/inc/process.inc';
  require_once dirname(__FILE__) . '/inc/theme.inc';

  if (module_exists('libraries')) {
    libraries_load('hoverIntent');
  }
}
function eenterprise_js_alter(&$js) {
  // Unwanted scripts.
  $remove[] = drupal_get_path('module', 'panels') . '/js/panels.js';

  // Remove unwanted scripts.
  foreach ($remove as $val) {
    unset($js[$val]);
  }

  // Optimize the scope of scripts for front-end performance.
  if (theme_get_setting('optimize_scripts')) {

    // Scripts that go in the header.
    $header_scripts = array();
    if (module_exists('modernizr')) {
      $header_scripts[] = drupal_get_path('module', 'modernizr') . '/modernizr.min.js';
    }
    if (module_exists('respondjs')) {
      $header_scripts[] = drupal_get_path('module', 'respondjs') . '/lib/respond.min.js';
    }

    // Move all scripts to the footer.
    foreach ($js as $key => $script) {
      $js[$key]['scope'] = 'footer';

      if(in_array((string) $key, $header_scripts)){
        $js[$key]['scope'] = 'header';
      }
    }
  }
}

// epa_css_alter from EPA Drupal template.php
function eenterprise_css_alter(&$css) {
  if ($GLOBALS['theme_key'] === 'epa') {
    // Replace jQuery UI theme style sheet.
    if (isset($css['misc/ui/jquery.ui.theme.css'])) {
      unset($css['misc/ui/jquery.ui.theme.css']);
      $stylesheet = drupal_get_path('theme', $GLOBALS['theme_key']) . '/css/lib/jquery.ui.theme.css';
      $css[$stylesheet] = array(
        'group' => 100,
        'type' => 'file',
        'weight' => 0.008,
        'every_page' => FALSE,
        'media' => 'all',
        'preprocess' => TRUE,
        'data' => $stylesheet,
        'browsers' => array('IE' => TRUE, '!IE' => TRUE),
      );
    }
    
    // Unwanted core stylesheets.
    $remove[] = 'misc/vertical-tabs.css';
    $remove[] = 'misc/vertical-tabs-rtl.css';
    $remove[] = drupal_get_path('module', 'field') . '/theme/field.css';
    $remove[] = drupal_get_path('module', 'field') . '/theme/field-rtl.css';
    $remove[] = drupal_get_path('module', 'file') . '/file.css';
    $remove[] = drupal_get_path('module', 'filter') . '/filter.css';
    $remove[] = drupal_get_path('module', 'node') . '/node.css';
    $remove[] = drupal_get_path('module', 'system') . '/system.admin.css';
    $remove[] = drupal_get_path('module', 'system') . '/system.admin-rtl.css';
    $remove[] = drupal_get_path('module', 'system') . '/system.base.css';
    $remove[] = drupal_get_path('module', 'system') . '/system.base-rtl.css';
    $remove[] = drupal_get_path('module', 'system') . '/system.maintenance.css';
    $remove[] = drupal_get_path('module', 'system') . '/system.menus.css';
    $remove[] = drupal_get_path('module', 'system') . '/system.menus-rtl.css';
    $remove[] = drupal_get_path('module', 'system') . '/system.messages.css';
    $remove[] = drupal_get_path('module', 'system') . '/system.messages-rtl.css';
    $remove[] = drupal_get_path('module', 'system') . '/system.theme.css';
    $remove[] = drupal_get_path('module', 'system') . '/system.theme-rtl.css';
    $remove[] = drupal_get_path('module', 'user') . '/user.css';
    $remove[] = drupal_get_path('module', 'user') . '/user-rtl.css';
    
    // Remove unwanted style sheets.
    foreach ($remove as $val) {
      unset($css[$val]);
    }
  }
}

function eenterprise_menu_link(&$variables) {
  $element = $variables['element'];
  $sub_menu = '';
 
  $element['#attributes']['data-menu-parent'] = $element['#original_link']['menu_name'] . '-' . $element['#original_link']['depth'];
  $element['#localized_options']['attributes']['class'][] = $element['#original_link']['menu_name'] . '-' . $element['#original_link']['depth'];
  $element['#localized_options']['attributes']['class'][] = 'menu-item';
 
  if ($element['#below']) {
    $sub_menu = drupal_render($element['#below']);
  }
 
  $output = l($element['#title'], $element['#href'], $element['#localized_options']);
  return '<li' . drupal_attributes($element['#attributes']) . '>' . $output . $sub_menu . "</li>\n";
}

/**
 * @param $existing
 * @param $type
 * @param $theme
 * @param $path
 * Hook Theme for eenterprise.
 */
function eenterprise_theme($existing, $type, $theme, $path){
    $items['user_profile_form'] = array(
        'render element' => 'form',
        'template' => 'user_profile_form',
        'path' => drupal_get_path('theme', 'eenterprise') . '/templates/forms',
    );

    return $items;
}

function eenterprise_preprocess_menu_tree(&$variables) {
  $tree = new DOMDocument();
  @$tree->loadHTML($variables['tree']);
  $links = $tree->getElementsByTagname('li');
  $parent = '';
 
  foreach ($links as $link) {
    $parent = $link->getAttribute('data-menu-parent');
    break;
  }
 
  $variables['menu_parent'] = $parent;
}