<?php
define("CREATED","created");
define("CUSTOM","custom");


/**
 * @file
 * Preprocess and process functions.
 */

/* ************************* @todo
ADD preprocess option to add needed ARIA attributes to menu elements that own a submenu


*/

/**
 * Override or insert variables into the maintenance page template.
 */
function eenterprise_preprocess_maintenance_page(&$vars) {
  // While markup for normal pages is split into page.tpl.php and html.tpl.php,
  // the markup for the maintenance page is all in the single
  // maintenance-page.tpl.php template. So, to have what's done in
  // eenterprise_preprocess_html() also happen on the maintenance page, it has to be
  // called here.
  eenterprise_preprocess_html($vars);
  $vars['title_attributes_array']['class'] = 'page-title';
}

/**
 * Override or insert variables into the html template.
 */
function eenterprise_preprocess_html(&$vars) {
  $vars['web_area_feed'] = '';
  $vars['base_path'] = base_path();
  $vars['path_to_eenterprise'] = drupal_get_path('theme', 'eenterprise');

  // Modify RDF output.
  $vars['rdf'] = new stdClass();
  if (module_exists('rdf') && isset($vars['rdf_namespaces'])) {
    $vars['doctype'] = '<!DOCTYPE html PUBLIC "-//W3C//DTD HTML+RDFa 1.1//EN">' . "\n";
    $vars['rdf']->version = ' version="HTML+RDFa 1.1"';
    $vars['rdf']->namespaces = $vars['rdf_namespaces'];
    $vars['rdf']->profile = ' profile="' . $vars['grddl_profile'] . '"';
  }
  else {
    $vars['doctype'] = '<!DOCTYPE html>' . "\n";
    $vars['rdf']->version = '';
    $vars['rdf']->namespaces = '';
    $vars['rdf']->profile = '';
  }

  // Add language body class.
  if (function_exists('locale')) {
    $vars['classes_array'][] = 'lang-' . $vars['language']->language;
  }

  // Add body classes for each page and section.
  if (!$vars['is_front']) {
    $path = drupal_get_path_alias($_GET['q']);
    list($section,) = explode('/', $path, 2);
    if (arg(0) == 'node') {
      if (arg(1) == 'add') {
        $section = 'page-node-add';
      }
      elseif (is_numeric(arg(1)) && (arg(2) == 'edit' || arg(2) == 'delete')) {
        $section = 'page-node-' . arg(2);
      }
    }
    $vars['classes_array'][] = drupal_html_class('section-' . $section);
  }

  // Remove uneccessary page-node- body class.
  $remove_key = array_search('page-node-', $vars['classes_array']);
  if (!is_null($remove_key)) {
    unset($vars['classes_array'][$remove_key]);
  }

  // Get node information.
  if (arg(0) == 'node' && is_numeric(arg(1))) {
    $node = node_load(arg(1));

    // Add body class for wide template.
    if (isset($node->type) && ($node->type == 'page' || $node->type == 'regulation') && isset($node->field_wide_template['und']['0']['value']) && $node->field_wide_template['und']['0']['value'] == '1') {
      $vars['classes_array'][] = 'wide-template';
    }
  }
}

/**
 * Override or insert variables into the page template.
 */
function eenterprise_preprocess_page(&$vars) {

	$vars['title_attributes_array']['class'] = 'page-title';
	$vars['content_language'] = language_default('language');
	if(!empty($vars['node']->field_language['und'][0]['value'])) {
		$vars['content_language'] = $vars['node']->field_language['und'][0]['value'];
	}

	// Test for anonymous user on login page
	if (user_is_anonymous() && arg(0) == 'user' && (arg(1) == '' || arg(1) == 'login')) {
		$vars['classes_array'][] = ' user-login';		
		$warning_message = variable_get('eenterprise_login_warning');
		
		// Add warning message to content section
		$vars['page']['content']['user_warning'] = array(
			'#tag' => 'div',
			'#attributes' => array(
			'id' => 'user-login-warning',
			'class' => 'col size-2of3',
		),
		'#value' => $warning_message,
		'#weight' => 10,
		'#theme' => 'html_tag',
		);
		
		// @todo - Adjust these grid classes to match Drupal eenterprise theme
		// Add css grid classes
		$vars['page']['content']['system_main']['#attributes']['class'] = 'col size-1of3';
		$vars['page']['content']['#prefix'] = "<div class='cols-2 row'>";
		$vars['page']['content']['#suffix'] = '</div>';
		}
		$search_form = drupal_get_form('search_form');
		$search_form_box = drupal_render($search_form);
		$vars['search_box'] = $search_form_box;
	
	}

/**
 * Override or insert variables into the node template.
 */
function eenterprise_preprocess_node(&$vars) {
  // Set title any time we're viewing a node (need to do this to make it work for revision viewing pages)
  if($vars['page']) {
    drupal_set_title($vars['title'], PASS_THROUGH);
  }

  $vars['classes_array'][] = 'clearfix';
  $vars['attributes_array']['role'][] = 'article';
  $vars['title_attributes_array']['class'][] = 'article-title';
  $vars['content_attributes_array']['class'][] = 'article-content';
  $vars['datetime'] = format_date($vars[CREATED], CUSTOM, 'c');
  $vars['date'] = format_date($vars[CREATED], CUSTOM, 'F j, Y');
  if (variable_get('node_submitted_' . $vars['node']->type, TRUE)) {
/*
    $vars['submitted'] = t('!datetime by !username',
      array(
        '!datetime' => '<time class="node-date" datetime="' . $vars['datetime'] . '" pubdate="pubdate">' . $vars['date'] . '</time>',
        '!username' => $vars['name'],
      )
    );
*/
	if ($vars['node']->type == 'ee_user_agreement') {
		$vars['submitted'] = t('Last revised: !datetime',
	      array(
	        '!datetime' => '<time class="node-date" datetime="' . $vars['datetime'] . '" pubdate="pubdate">' . $vars['date'] . '</time>'
	      )
	    );
	}
	else {
		$vars['submitted'] = t('Last updated: !datetime',
	      array(
	        '!datetime' => '<time class="node-date" datetime="' . $vars['datetime'] . '" pubdate="pubdate">' . $vars['date'] . '</time>'
	      )
	    );
	}
  }
  else {
    $vars['submitted'] = '';
  }
  $vars['unpublished'] = '';
  if (!$vars['status']) {
    $vars['unpublished'] = '<div class="unpublished">' . t('Unpublished') . '</div>';
  }
}

/**
 * Override or insert variables into the region template.
 */
function eenterprise_preprocess_region(&$vars) {
  // Remove region class.
  array_shift($vars['classes_array']);

  // Remove classes from main content region.
  if ($vars['region'] == 'content') {
    $vars['classes_array'] = array();
  }

  // Add clearfix to preface and highlighted regions.
  if ($vars['region'] == 'preface' || $vars['region'] == 'highlighted') {
    $vars['classes_array'][] = 'clearfix';
  }

  // Add region-sidebar class to sidebar regions.
  if ($vars['region'] == 'sidebar_first' || $vars['region'] == 'sidebar_second') {
    $vars['classes_array'][] = 'region-sidebar';
  }
}

/**
 * Override or insert variables into the block template.
 */
function eenterprise_preprocess_block(&$vars) {
  if ($vars['block_html_id'] == 'block-system-main-menu') {
    $vars['classes_array'][] = 'main-nav clearfix';
    $vars['title_attributes_array']['class'][] = 'element-invisible';
  }
  // Add class for feature machine name  
  if (module_exists('fe_block') && $vars['elements']['#block']->module == 'block') {    
    $machine_name = db_query("SELECT machine_name FROM {fe_block_boxes} WHERE bid = :bid", array('bid' => $vars['elements']['#block']->delta))->fetchField();
    if (!empty($machine_name)) {
      $vars['classes_array'][] = 'block--' . str_replace('_', '-', $machine_name);    
      $vars['title_attributes_array']['class'][] = 'element-invisible';
    }  
  }
}

/**
 * Change the search form to use the "search" input element of HTML5.
 */
function eenterprise_preprocess_search_block_form(&$vars) {
  $vars['search_form'] = str_replace('type="text"', 'type="search"', $vars['search_form']);
  $vars['classes_array'][] = 'epa-search';  
}

/**
 * Override or insert variables into the menu link theme function.
 */
function eenterprise_preprocess_menu_link(&$vars) {
  $item_classes = &$vars['element']['#attributes']['class'];
  $link_classes = &$vars['element']['#localized_options']['attributes']['class'];

  // Remove uneccessary item classes.
  $remove = array(
    'first',
    'last',
    'leaf',
    'is-leaf',
    'menu__link',
  );
  foreach ($remove as $val) {
    $remove_key = array_search($val, $item_classes);
    if (!is_null($remove_key)) {
      unset($item_classes[$remove_key]);
    }
  }

  // Add global classes to all menu links.
  $item_classes[] = 'menu-item';
  $link_classes[] = 'menu-link';
}
