<?php
/**
 * @file
 * Contains the theme's functions to manipulate Drupal's default markup.
 *
 * Complete documentation for this file is available online.
 * @see https://drupal.org/node/1728096
 */

// @todo - Update epa theme_key to oneepa once all files exist
if ($GLOBALS['theme_key'] === 'oneepa') {
  require_once dirname(__FILE__) . '/inc/process.inc';
  require_once dirname(__FILE__) . '/inc/theme.inc';

  // Add tablesorter library.
//  libraries_load('tablesorter');

  // Add base theme style sheets.
  $base_stylesheets = array(
    //'base.css',
    //'typography.css',
    //'drupal.css',
    //'layout.css',
  );
  foreach ($base_stylesheets as $val) {
    drupal_add_css(
      drupal_get_path('theme', $GLOBALS['theme_key']) . '/css/' . $val,
      array('group' => CSS_THEME, 'every_page' => TRUE)
    );
  }

  // Add style sheet overrides.
  if (module_exists('contextual')) {
    drupal_add_css(
      drupal_get_path('theme', $GLOBALS['theme_key']) . '/css/core/contextual.css',
      array('group' => CSS_THEME, 'every_page' => TRUE)
    );
  }
  if (module_exists('comment')) {
    drupal_add_css(
      drupal_get_path('theme', $GLOBALS['theme_key']) . '/css/core/comment.css',
      array('group' => CSS_THEME, 'every_page' => TRUE)
    );
  }
  if (module_exists('search')) {
    drupal_add_css(
      drupal_get_path('theme', $GLOBALS['theme_key']) . '/css/core/search.css',
      array('group' => CSS_THEME, 'every_page' => TRUE)
    );
  }
  if (module_exists('date_api')) {
    drupal_add_css(
      drupal_get_path('theme', $GLOBALS['theme_key']) . '/css/contrib/date.css',
      array('group' => CSS_THEME, 'every_page' => TRUE)
    );
  }

  // Add design theme style sheets.
  $design_stylesheets = array(
    //'design.css',
    'mobile-menu.css',
    'drop-down-menu.css',
    'lib/colorbox.css',
    'styles.css',
  );
  foreach ($design_stylesheets as $val) {
    drupal_add_css(
      drupal_get_path('theme', $GLOBALS['theme_key']) . '/css/' . $val,
      array('group' => CSS_THEME, 'every_page' => TRUE)
    );
  }

  // Add Homes style sheet.
  if (theme_get_setting('use_holmes') && user_access('administer nodes')) {
    drupal_add_css(
      drupal_get_path('theme', $GLOBALS['theme_key']) . '/css/lib/holmes.css',
      array('group' => CSS_THEME)
    );
  }

  // Add IE conditional style sheet.
  drupal_add_css(
    drupal_get_path('theme', $GLOBALS['theme_key']) . '/css/ie.css',
    array(
      'group' => CSS_THEME,
      'browsers' => array('IE' => 'lt IE 9', '!IE' => FALSE),
      'every_page' => TRUE,
    )
  );

  if (module_exists('libraries')) {
    libraries_load('hoverIntent');
  }
}

function greentrees_html_head_alter(&$head_elements) {
	  // Add title.
  $head_title = 'US Environmental Protection Agency';
  if (!empty($head_elements['metatag_DC.title']['#value'])) {
    $head_title = $head_elements['metatag_DC.title']['#value'];

    // If we're on a child page of a web area, add web area title to the title.
    if ($node = menu_get_object()) {
      if ($group = og_context()) {
        if (og_is_member('node', $group['gid'], 'node', $node)) {
          $wrapper = entity_metadata_wrapper('node', $group['gid']);
          $head_title .= ' | '. $wrapper->field_long_name->value(array('sanitize' => TRUE));
        }
      }
    }
  }
  // Use a custom title if we're on the log in page.
  else if ($_GET['q'] == 'user') {
    $head_title = 'e-Enterprise Log In';
  }
  $head_elements['head_title'] = array(
    '#type' => 'markup',
    '#markup' => "<title>$head_title | US EPA</title>",
    '#weight' => -4,
  );

  // Add weights to EPA metatags.
  $head_elements['metatag_DC.title']['#weight'] = -4;
  $head_elements['metatag_DC.description']['#weight'] = -4;

  $head_elements['metatag_generator']['#weight'] = -6;

  // HTML5 charset declaration.
  $head_elements['system_meta_content_type']['#attributes'] = array(
    'charset' => 'utf-8',
  );

  // Add handheld friendly meta tag.
  if (theme_get_setting('use_handheld_friendly')) {
    $head_elements['handheld_friendly'] = array(
      '#type' => 'html_tag',
      '#tag' => 'meta',
      '#weight' => -6,
      '#attributes' => array(
        'name' => 'HandheldFriendly',
        'content' => 'true',
      ),
    );
  }

  // Add mobile optimized meta tag.
  if (theme_get_setting('use_mobile_optimized')) {
    $head_elements['mobile_optimized'] = array(
      '#type' => 'html_tag',
      '#tag' => 'meta',
      '#weight' => -6,
      '#attributes' => array(
        'name' => 'MobileOptimized',
        'content' => 'width',
      ),
    );
  }

  // Add iOS mobile meta tags.
  if (theme_get_setting('use_ios_meta')) {
    $head_elements['ios_web_app'] = array(
      '#type' => 'html_tag',
      '#tag' => 'meta',
      '#weight' => -6,
      '#attributes' => array(
        'name' => 'apple-mobile-web-app-capable',
        'content' => 'yes',
      ),
    );
    $head_elements['ios_status_bar'] = array(
      '#type' => 'html_tag',
      '#tag' => 'meta',
      '#weight' => -6,
      '#attributes' => array(
        'name' => 'apple-mobile-web-app-status-bar-style',
        'content' => 'black-translucent',
      ),
    );
  }

  // Optimize mobile viewport.
  if (theme_get_setting('use_mobile_viewport')) {
    $head_elements['mobile_viewport'] = array(
      '#type' => 'html_tag',
      '#tag' => 'meta',
      '#weight' => -6,
      '#attributes' => array(
        'name' => 'viewport',
        'content' => filter_xss(theme_get_setting('mobile_viewport_value')),
      ),
    );
  }

  // Remove image toolbar in IE.
  $head_elements['ie_image_toolbar'] = array(
    '#type' => 'html_tag',
    '#tag' => 'meta',
    '#weight' => -6,
    '#attributes' => array(
      'http-equiv' => 'ImageToolbar',
      'content' => 'false',
    ),
  );

  // Better font rendering in IE.
  $head_elements['ie_cleartype'] = array(
    '#type' => 'html_tag',
    '#tag' => 'meta',
    '#weight' => -6,
    '#attributes' => array(
      'http-equiv' => 'cleartype',
      'content' => 'on',
    ),
  );

  if ($term = menu_get_object('taxonomy_term', 2)) {
    // Add the RSS feed link to the HTTP headers.
    $head_elements['term_rss'] = array(
      '#type' => 'html_tag',
      '#tag' => 'meta',
      '#attributes' => array(
        'rel' => 'alternate',
        'type' => 'application/rss+xml',
        'title' => check_plain($term->name),
        'href' => url('taxonomy/term/' . $term->tid . '/feed', array('absolute' => TRUE)),
      ),
    );
  }
}

/**
 * Implements hook_js_alter().
 */
function greentrees_js_alter(&$js) {
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
function greentrees_css_alter(&$css) {
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

function greentrees_menu_link(&$variables) {
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
 * Hook Theme for oneepa.
 */
function greentrees_theme($existing, $type, $theme, $path){
    $items['user_profile_form'] = array(
        'render element' => 'form',
        'template' => 'user_profile_form',
        'path' => drupal_get_path('theme', 'oneepa') . '/templates/forms',
    );

    return $items;
}

function greentrees_preprocess_menu_tree(&$variables) {
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