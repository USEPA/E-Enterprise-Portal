<?php
define("CREATED","created");
define("CUSTOM","custom");

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

  // Empty user lgc topics
// / unset($_SESSION['user_lgc_topics']);
}

/**
 * Override or insert variables into the html template.
 */
function eenterprise_preprocess_html(&$vars) {
  $vars['web_area_feed'] = '';
  $vars['base_path'] = base_path();
  $vars['path_to_eenterprise'] = drupal_get_path('theme', 'eenterprise');

  // Get settings for HTML5 and responsive support. array_filter() removes
  // items from the array that have been disabled.
  $html5_respond_meta = array_filter((array) theme_get_setting('eenterprise_html5_respond_meta'));
  $vars['add_respond_js']          = in_array('respond', $html5_respond_meta);
  $vars['add_html5_shim']          = in_array('html5', $html5_respond_meta);
  $vars['default_mobile_metatags'] = in_array('meta', $html5_respond_meta);

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

  // Attributes for html element.
  $vars['html_attributes_array'] = array(
    'lang' => $vars['language']->language,
    'dir' => $vars['language']->dir,
  );

  // Send X-UA-Compatible HTTP header to force IE to use the most recent
  // rendering engine or use Chrome's frame rendering engine if available.
  // This also prevents the IE compatibility mode button to appear when using
  // conditional classes on the html tag.
  if (is_null(drupal_get_http_header('X-UA-Compatible'))) {
    drupal_add_http_header('X-UA-Compatible', 'IE=edge,chrome=1');
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
 * Override or insert variables in the html_tag theme function.
 */
function eenterprise_process_html_tag(&$vars) {
  $tag = &$vars['element'];

  if ($tag['#tag'] == 'style' || $tag['#tag'] == 'script') {
    // Remove redundant type attribute and CDATA comments.
    unset($tag['#attributes']['type'], $tag['#value_prefix'], $tag['#value_suffix']);

    // Remove media="all" but leave others unaffected.
    if (isset($tag['#attributes']['media']) && $tag['#attributes']['media'] === 'all') {
      unset($tag['#attributes']['media']);
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
	
	if(!empty($vars['node'])){
		switch ($vars['node']->type) {
			case 'page':
				$menu_trail = menu_set_active_trail();
				$active_primary_title = $menu_trail[1]['link_title'];
				break;
		}
	}
	
	// Test for anonymous user on login page
	if (user_is_anonymous() && arg(0) == 'user' && (arg(1) == '' || arg(1) == 'login')) {
		$vars['classes_array'][] = ' user-login';		
		$warning_message = variable_get('eenterprise_login_warning');	
	}
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

  // Add grid and background classes as needed
  if ($vars['region'] == 'disclaimer') {
    $vars['classes_array'][] = 'usa-grid usa-background-dark';
  }

  if ($vars['region'] == 'navigation') {
    $vars['classes_array'][] = 'usa-grid';
  }

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

