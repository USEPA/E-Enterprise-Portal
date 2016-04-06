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

function eenterprise_preprocess_panels_pane(&$vars) {
    if ($vars['pane']->type == 'node_title') {
        $vars['template_files'][] = 'panels-pane';
    }
    $vars['attributes_array']['role'] = 'region';

}


/*
 * A function to override "function theme_form_element($variables)" from form.inc in core so that id
 * can be added to a description of a form element. After that aria-describedby attribute will be associated to this id.
 * */

function eenterprise_form_element($variables) {
    $element = &$variables['element'];
    // This function is invoked as theme wrapper, but the rendered form element
    // may not necessarily have been processed by form_builder().
    $element += array(
        '#title_display' => 'before',
    );

    // Add element #id for #type 'item'.
    if (isset($element['#markup']) && !empty($element['#id'])) {
        $attributes['id'] = $element['#id'];
    }
    // Add element's #type and #name as class to aid with JS/CSS selectors.
    $attributes['class'] = array('form-item');
    if (!empty($element['#type'])) {
        $attributes['class'][] = 'form-type-' . strtr($element['#type'], '_', '-');
    }
    if (!empty($element['#name'])) {
        $attributes['class'][] = 'form-item-' . strtr($element['#name'], array(' ' => '-', '_' => '-', '[' => '-', ']' => ''));
    }
    // Add a class for disabled elements to facilitate cross-browser styling.
    if (!empty($element['#attributes']['disabled'])) {
        $attributes['class'][] = 'form-disabled';
    }
    $output = '<div' . drupal_attributes($attributes) . '>' . "\n";

    // If #title is not set, we don't display any label or required marker.
    if (!isset($element['#title'])) {
        $element['#title_display'] = 'none';
    }
    $prefix = isset($element['#field_prefix']) ? '<span class="field-prefix">' . $element['#field_prefix'] . '</span> ' : '';
    $suffix = isset($element['#field_suffix']) ? ' <span class="field-suffix">' . $element['#field_suffix'] . '</span>' : '';

    switch ($element['#title_display']) {
        case 'before':
        case 'invisible':
            $output .= ' ' . theme('form_element_label', $variables);
            $output .= ' ' . $prefix . $element['#children'] . $suffix . "\n";
            break;

        case 'after':
            $output .= ' ' . $prefix . $element['#children'] . $suffix;
            $output .= ' ' . theme('form_element_label', $variables) . "\n";
            break;

        case 'none':
        case 'attribute':
            // Output no label and no required marker, only the children.
            $output .= ' ' . $prefix . $element['#children'] . $suffix . "\n";
            break;
    }

    if (!empty($element['#description'])) {
        $decription_attributes = array('class' => array('description'));
        if ($element['#id']) {
            $decription_attributes['id'] = $element['#id'] . '-description';
        }
        $output .= '<div' . drupal_attributes($decription_attributes) . '>' . $element['#description'] . "</div>\n";
    }


    $output .= "</div>\n";

    return $output;
}

/**
 * Preprocess textareas to add in aria attributes.
 */
function eenterprise_preprocess_textarea(&$variables) {
    eenterprise_add_aria_attributes($variables);
}

/**
 * Preprocess textfields to add in aria attributes.
 */
function eenterprise_preprocess_textfield(&$variables) {
    eenterprise_add_aria_attributes($variables);
}

/**
 * Generic function for adding aria-describedby attribute to form elements.
 * The attribute is added if the element includes a description.
 */
function eenterprise_add_aria_attributes(&$variables) {
    if (!empty($variables['element']['#description'])) {
        $variables['element']['#attributes']['aria-describedby'] = $variables['element']['#id'] . '-description';
    }
}

/**
 * Find and adjust messages such as error, status, and warning with desired wording
 */
function eenterprise_status_messages($variables) {
  $display = $variables['display'];
  $output = '';

  $status_heading = array(
    'status' => t('Success!'),
    'error' => t('Error message'),
    'warning' => t('Warning message'),
  );
  
    if (_exclude_message('Link check', 'warning', true)) drupal_set_message('', '');
  
  foreach (drupal_get_messages($display) as $type => $messages) {
	  if ($type == 'status' || $type == 'warning') {
		  $ariaattributes = "aria-live=\"polite\"";
		}
	  else if ($type == 'error') {
		  $ariaattributes = "role=\"alert\"";
	  }
	  
	  if ($type == 'status') {$usetype = 'success';}
	  else {$usetype = $type;}
	  
    $output .= "<div $ariaattributes class=\"usa-alert usa-alert-$usetype messages--$type messages $type\"><div class=\"usa-alert-body\">\n";
    if (!empty($status_heading[$type])) {
      $output .= '<h3 class="usa-alert-heading">' . $status_heading[$type] . "</h3>\n<p class=\"usa-alert-text\">";
    }
    if (count($messages) > 1) {
      $output .= " <ul class=\"messages__list\">\n";
      foreach ($messages as $message) {
        $output .= '  <li class=\"messages__item\">' . $message . "</li>\n";
      }
      $output .= " </ul>\n";
    }
    else {
      $output .= $messages[0];
    }
    $output .= "</p></div></div>\n";
  }
  return $output;
} 

function _exclude_message($mymessage, $mytype, $search) {
  $flag = false;
  if ($messageArr = drupal_set_message()) {
    foreach($messageArr as $type=>$messages) {
      if ($mytype==$type) {
        foreach($messages as $key=>$message) {
          if ($search) {
            if (stristr($message, $mymessage)) {
              unset($_SESSION['messages'][$type][intval($key)]);
              $flag = true;
            }
          } else {
            if ($mymessage==$message) {
              unset($_SESSION['messages'][$type][intval($key)]);
              $flag = true;
            }
          } 
        }
      }
      sort($_SESSION['messages'][$type]);
      if (count($_SESSION['messages'][$type])==0) unset($_SESSION['messages'][$type]);
      if (count($_SESSION['messages'])==0) unset($_SESSION['messages']);
    }
  }
  return $flag;
}