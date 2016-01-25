<?php
/**
 * @file
 * Theme functions.
 */

/**
 * Override HTML for link lists.
 */
/*
function eenterprise_links($vars) {
  $links = $vars['links'];
  $attributes = $vars['attributes'];
  $heading = $vars['heading'];
  global $language_url;
  $output = '';

  if (count($links) > 0) {
    $output = '';

    // Treat the heading first if it is present to prepend it to the
    // list of links.
    if (!empty($heading)) {
      if (is_string($heading)) {
        // Prepare the array that will be used when the passed heading
        // is a string.
        $heading = array(
          'text' => $heading,
          // Set the default level of the heading.
          'level' => 'h2',
        );
      }
      $output .= '<' . $heading['level'];
      if (!empty($heading['class'])) {
        $output .= drupal_attributes(array('class' => $heading['class']));
      }
      $output .= '>' . check_plain($heading['text']) . '</' . $heading['level'] . '>';
    }

    $output .= '<ul' . drupal_attributes($attributes) . '>';
    $i = 1;

    foreach ($links as $key => $link) {
      $class = array($key);
      $class[] = 'menu-item';

      // Add link classes.
      $link['attributes']['class'][] = 'menu-link';

      if (isset($link['href']) && ($link['href'] == $_GET['q'] || ($link['href'] == '<front>' && drupal_is_front_page()))
           && (empty($link['language']) || $link['language']->language == $language_url->language)) {
        $class[] = 'active';
      }
      $output .= '<li' . drupal_attributes(array('class' => $class)) . '>';

      if (isset($link['href'])) {
        // Pass in $link as $options, they share the same keys.
        $output .= l($link['title'], $link['href'], $link);
      }
      elseif (!empty($link['title'])) {
        // Some links are actually not links, but we wrap these in <span> for adding title and class attributes.
        if (empty($link['html'])) {
          $link['title'] = check_plain($link['title']);
        }
        $span_attributes = '';
        if (isset($link['attributes'])) {
          $span_attributes = drupal_attributes($link['attributes']);
        }
        $output .= '<span' . $span_attributes . '>' . $link['title'] . '</span>';
      }

      $i++;
      $output .= "</li>\n";
    }

    $output .= '</ul>';
  }

  return $output;
}
*/

function eenterprise_menu_link(&$vars) {
	global $user;
	$name = $user->name;
	$path	= drupal_get_path_alias();
	$element = $vars['element'];
  $sub_menu = '';
  $childdepth = $element['#original_link']['depth'];
  $parentdepth = $childdepth - 1;
 
	if ($childdepth > 1) {
	  $element['#attributes']['data-menu-parent'] = $element['#original_link']['menu_name'] . '-' . $parentdepth;
	  $element['#localized_options']['attributes']['class'][] = $element['#original_link']['menu_name'] . '-' . $element['#original_link']['depth'];
		$element['#localized_options']['attributes']['class'][] = 'menu-item';
	}
	
  if ($element['#below']) {
    $sub_menu = drupal_render($element['#below']);
  }
	
	// Change Home link label to Workbench as appropriate
  if (isset($element['#original_link']['menu_name'])
        && $element['#original_link']['menu_name'] == 'main-menu') {
        if ($element['#title'] == 'Home') {
					//If the user is logged in either as a guest user or another user, Home link should be labeled Workbench
					//In other words, if the user is NOT logged in AND the user is not a guest user viewing the Disclaimer page, then Home should say Workbench
	        //$new_title = (!$user->uid == 0 && !($user->name == 'guest-user' && ($path != 'ee_disclaimer') || ($path != 'new-users'))) ? 'Workbench' : 'Home';
		        $new_title = (!$user->uid == 0 && !($user->name == 'guest-user' && ($path == 'new-users' || $path == 'bridge-landing' || $path == 'faqs' || $path == 'release-notes'))) ? 'Workbench' : 'Home';
	        
	        //If the user is viewing the Disclaimer page, then label should be Home link
	        if ($path == 'ee_disclaimer') {
		        $new_title = 'Home';
	        }
	        
	        //If the user is viewing the Disclaimer page and is not logged in, point link back to landing page
					if (($path == 'ee_disclaimer' || $path == 'new-users' || $path == 'bridge-landing' || $path == 'faqs' || $path == 'release-notes') && ($user->uid == 0 || $user->name == 'guest-user')) {
						$element['#href'] = 'eenterprise-new';	
					}
					else {
						$element['#href'] = 'workbench';
					}
	        $element['#title'] = $new_title;
        }
			else if ($element['#title'] != 'Home') {
				//If the user is viewing the Disclaimer page hide other main menu items
				if ($path == 'ee_disclaimer') {
					return null;
				}
			}
  }  
  
  if (isset($element['#original_link']['menu_name'])
      && $element['#original_link']['menu_name'] == 'user-menu'
      && $element['#title'] == 'My account') {
			//If the user is viewing the Disclaimer page and is not logged in, 
			if ($path == 'ee_disclaimer') {
				return null;
			}
	}
  
  //set the parent active when child is currently selected
  if(in_array("active-trail", $element['#attributes']['class'])){
      $element['#attributes']['class'][] = 'active';
  }
  // On primary navigation menu, class 'active' is not set on active menu item.
  // @see https://drupal.org/node/1896674
  if (($element['#href'] == current_path() || ($element['#href'] == '<front>' && drupal_is_front_page())) && (empty($element['#localized_options']['language']))) {
      $element['#attributes']['class'][] = 'active';
  }
  
  $item_classes = &$element['#attributes']['class'];
  $link_classes = &$element['#localized_options']['attributes']['class'];

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
      unset($link_classes[$remove_key]);
    }
  }
  $remove_key = array_search('menu-item', $link_classes);
    if (!is_null($remove_key)) {
			unset($link_classes[$remove_key]);
    }

  // Add global classes to all menu links.
  $item_classes[] = 'menu-item';
  $link_classes[] = 'menu-link';
  
  $output = l($element['#title'], $element['#href'], $element['#localized_options']);
  return '<li' . drupal_attributes($element['#attributes']) . '>' . $output . $sub_menu . "</li>\n";
}

/**
 * Override HTML for main menu links.
 */
function eenterprise_links__system_main_menu($vars) {

  // Display the main menu as a drop-down menu.
  if (theme_get_setting('use_dropdowns')) {
    $pid = variable_get('menu_main_links_source', 'main-menu');
    $tree = menu_tree($pid);

    return '<h2 class="element-invisible">' . t('Main menu') . '</h2>' . drupal_render($tree);
  }

  return eenterprise_links($vars);
}

 /**
  * Override HTML for menu trees.
  */
function eenterprise_menu_tree($vars) {

  return '<ul class="menu">' . $vars['tree'] . '</ul>';
}

/**
 * Override HTML for primary and secondary local tasks.
 */
function eenterprise_menu_local_tasks($vars) {
  $output = '';
 
 
	  if (!empty($vars['primary'])) {
	    $vars['primary']['#prefix'] = '<h2 class="element-invisible">' . t('Primary tasks') . '</h2>';
	    $vars['primary']['#prefix'] .= '<ul class="menu pillbox">';
	    $vars['primary']['#suffix'] = '</ul>';
	    $output .= drupal_render($vars['primary']);
	  }
	
	  if (!empty($vars['secondary'])) {
	    $vars['secondary']['#prefix'] = '<h2 class="element-invisible">' . t('Secondary tasks') . '</h2>';
	    $vars['secondary']['#prefix'] .= '<ul class="menu pipeline">';
	    $vars['secondary']['#suffix'] = '</ul>';
	    $output .= drupal_render($vars['secondary']);
	  }

  return $output;
}

/**
 * Override HTML for individual primary and secondary local task.
 */
function eenterprise_menu_local_task($vars) {
  $link = $vars['element']['#link'];
  $link_text = $link['title'];

  if (!empty($vars['element']['#active'])) {
    // Add text to indicate active tab for non-visual users.
    $active = '<span class="element-invisible">' . t('(active tab)') . '</span>';

    // If the link does not contain HTML already, check_plain() it now.
    // After we set 'html'=TRUE the link will not be sanitized by l().
    if (empty($link['localized_options']['html'])) {
      $link['title'] = check_plain($link['title']);
    }
    $link['localized_options']['html'] = TRUE;
    $link_text = t('!local-task-title!active', array('!local-task-title' => $link['title'], '!active' => $active));
  }

  // Add menu-link class.
  $link['localized_options']['attributes']['class'][] = 'menu-link';

  return '<li class="menu-item' . (!empty($vars['element']['#active']) ? ' active' : '') . '">' . l($link_text, $link['href'], $link['localized_options']) . "</li>\n";
}


/**
 * Override HTML for item lists.
 */
function eenterprise_item_list($vars) {
  $items = $vars['items'];
  $title = $vars['title'];
  $type = $vars['type'];
  $attributes = $vars['attributes'];

  $output = '';
  if (isset($title) && $title !== '') {
    $output .= '<h3>' . $title . '</h3>';
  }

  if (!empty($items)) {
    $output .= "<$type" . drupal_attributes($attributes) . '>';
    $num_items = count($items);
    foreach ($items as $i => $item) {
      $attributes = array();
      $children = array();
      $data = '';
      if (is_array($item)) {
        foreach ($item as $key => $value) {
          check_item_value($key, $value, $data, $children, $attributes);
        }
      }
      else {
        $data = $item;
      }
      if (count($children) > 0) {
        // Render nested list.
        $data .= theme_item_list(array('items' => $children, 'title' => NULL, 'type' => $type, 'attributes' => $attributes));
      }
      if ($i == 0) {
        $attributes['class'][] = 'first';
      }
      if ($i == $num_items - 1) {
        $attributes['class'][] = 'last';
      }
      $output .= '<li' . drupal_attributes($attributes) . '>' . $data . "</li>\n";
    }
    $output .= "</$type>";
  }
  return $output;
}

/**
 * Override HTML for default panel regions.
 */
function eenterprise_panels_default_style_render_region($vars) {
  $output = implode('', $vars['panes']);
  return $output;
}

/**
 * Override HTML for default tables.
 */
function eenterprise_table($vars) {
  $header = $vars['header'];
  $rows = $vars['rows'];
  $attributes = $vars['attributes'];
  $caption = $vars['caption'];
  $colgroups = $vars['colgroups'];
  $sticky = $vars['sticky'];
  $empty = $vars['empty'];

  // Add sticky headers, if applicable.
  if (count($header) && $sticky) {
    drupal_add_js('misc/tableheader.js');
    // Add 'sticky-enabled' class to the table to identify it for JS.
    // This is needed to target tables constructed by this function.
    $attributes['class'][] = 'sticky-enabled';
  }

  $output = '<table' . drupal_attributes($attributes) . ">\n";

  if (isset($caption)) {
    $output .= '<caption>' . $caption . "</caption>\n";
  }

  // Format the table columns:
  $output = format_table_cols($colgroups, $output);

  // Add the 'empty' row message if available.
  if (!count($rows) && $empty) {
    $header_count = 0;
    foreach ($header as $header_cell) {
      if (is_array($header_cell)) {
        $header_count += isset($header_cell['colspan']) ? $header_cell['colspan'] : 1;
      }
      else {
        $header_count++;
      }
    }
    $rows[] = array(array('data' => $empty, 'colspan' => $header_count, 'class' => array('empty', 'message')));
  }

  // Format the table header:
  if (count($header)) {
    $ts = tablesort_init($header);
    // HTML requires that the thead tag has tr tags in it followed by tbody
    // tags. Using ternary operator to check and see if we have any rows.
    $output .= (count($rows) ? ' <thead><tr>' : ' <tr>');
    foreach ($header as $cell) {
      $cell = tablesort_header($cell, $header, $ts);
      // Add scope='row' for accessible tables.
      if (!is_array($cell)) {
        $cell = array('data' => $cell);
      }
      $cell['scope'] = 'col';
      $output .= _theme_table_cell($cell, TRUE);
    }
    // Using ternary operator to close the tags based on whether or not there are rows
    $output .= (count($rows) ? " </tr></thead>\n" : "</tr>\n");
  }
  else {
    $ts = array();
  }

  // Format the table rows:
  if (count($rows)) {
    $output .= "<tbody>\n";
    foreach ($rows as $row) {
      $attributes = array();

      // Check if we're dealing with a simple or complex row
      if (isset($row['data'])) {
        check_row_complexity($row, $attributes, $cells);
      }
      else {
        $cells = $row;
      }
      
      if (count($cells)) {
        // Build row
        $output .= ' <tr' . drupal_attributes($attributes) . '>';
        $i = 0;
        foreach ($cells as $cell) {
          $cell = tablesort_cell($cell, $header, $ts, $i);
		  $i++;
          $output .= _theme_table_cell($cell);
        }
        $output .= " </tr>\n";
      }
    }
    $output .= "</tbody>\n";
  }

  $output .= "</table>\n";
  return $output;
}

function format_table_cols($colgroups, $output){
    if (count($colgroups)) {
        foreach ($colgroups as $number => $colgroup) {
            $attributes = array();

            // Check if we're dealing with a simple or complex column
            if (isset($colgroup['data'])) {
                check_column_complexity($colgroup, $attributes, $cols);
            }
            else {
                $cols = $colgroup;
            }

            // Build colgroup
            if (is_array($cols) && count($cols)) {
                $output .= ' <colgroup' . drupal_attributes($attributes) . '>';
                foreach ($cols as $col) {
                    $output .= ' <col' . drupal_attributes($col) . ' />';
                }
                $output .= " </colgroup>\n";
            }
            else {
                $output .= ' <colgroup' . drupal_attributes($attributes) . " />\n";
            }
        }
    }
    return $output;
}


/**
 * Override HTML for file links.
 * We don't use icon images.
 */
function eenterprise_file_link($vars) {
  $file = $vars['file'];

  $url = file_create_url($file->uri);

  // Set options as per anchor format described at
  // http://microformats.org/wiki/file-format-examples
  $options = array(
    'attributes' => array(
      'type' => $file->filemime . '; length=' . $file->filesize,
      'class' => 'file-link',
    ),
  );

  // Use the description as the link text if available.
  if (empty($file->description)) {
    $link_text = $file->filename;
  }
  else {
    $link_text = $file->description;
    $options['attributes']['title'] = check_plain($file->filename);
  }

  // Append (PDF) to PDF links.
  if ($file->filemime == 'application/pdf') {
    $link_text .= ' (PDF)';
  }

  return l($link_text, $url, $options);
}


/**
 * Returns HTML for a query pager.
 */
function eenterprise_pager($vars) {
  $tags = $vars['tags'];
  $element = $vars['element'];
  $parameters = $vars['parameters'];
  $quantity = $vars['quantity'];
  global $pager_page_array, $pager_total;

  // Calculate various markers within this pager piece:
  // Middle is used to "center" pages around the current page.
  $pager_middle = ceil($quantity / 2);
  // Current is the page we are currently paged to.
  $pager_current = $pager_page_array[$element] + 1;
  // First is the first page listed by this pager piece (re quantity).
  $pager_first = $pager_current - $pager_middle + 1;
  // Last is the last page listed by this pager piece (re quantity).
  $pager_last = $pager_current + $quantity - $pager_middle;
  // Max is the maximum page number.
  $pager_max = $pager_total[$element];

  // Prepare for generation loop.
  $i = $pager_first;
  if ($pager_last > $pager_max) {
    // Adjust "center" if at end of query.
    $i = $i + ($pager_max - $pager_last);
    $pager_last = $pager_max;
  }
  if ($i <= 0) {
    // Adjust "center" if at start of query.
    $pager_last = $pager_last + (1 - $i);
    $i = 1;
  }

  $li_first = theme('pager_first', array(
    'text' => (isset($tags[0]) ? $tags[0] : t('« first')),
    'element' => $element,
    'parameters' => $parameters,
  ));
  $li_previous = theme('pager_previous', array(
    'text' => (isset($tags[1]) ? $tags[1] : t('‹ previous')),
    'element' => $element,
    'interval' => 1,
    'parameters' => $parameters,
  ));
  $li_next = theme('pager_next', array(
    'text' => (isset($tags[3]) ? $tags[3] : t('next ›')),
    'element' => $element,
    'interval' => 1,
    'parameters' => $parameters,
  ));
  $li_last = theme('pager_last', array(
    'text' => (isset($tags[4]) ? $tags[4] : t('last »')),
    'element' => $element,
    'parameters' => $parameters,
  ));

  if ($pager_total[$element] > 1) {
    if ($li_first) {
      $items[] = array(
        'class' => array('pager__item', 'pager__item--first'),
        'data' => $li_first,
      );
    }
    if ($li_previous) {
      $items[] = array(
        'class' => array('pager__item', 'pager__item--previous'),
        'data' => $li_previous,
      );
    }

    // When there is more than one page, create the pager list.
    if ($i != $pager_max) {
      if ($i > 1) {
        $items[] = array(
          'class' => array('pager__item', 'pager__item--ellipsis'),
          'role' => 'presentation',
          'data' => '…',
        );
      }
      // Now generate the actual pager piece.
      for (; $i <= $pager_last && $i <= $pager_max; $i++) {
        if ($i < $pager_current) {
          $items[] = array(
            'class' => array('pager__item'),
            'data' => theme('pager_previous', array(
              'text' => $i,
              'element' => $element,
              'interval' => ($pager_current - $i),
              'parameters' => $parameters,
            )),
          );
        }
        if ($i == $pager_current) {
          $items[] = array(
            'class' => array('pager__item', 'pager__item--current'),
            'data' => '<span class="element-invisible">' . t('Currently on page') . ' </span>' . $i,
          );
        }
        if ($i > $pager_current) {
          $items[] = array(
            'class' => array('pager__item'),
            'data' => theme('pager_next', array(
              'text' => $i,
              'element' => $element,
              'interval' => ($i - $pager_current),
              'parameters' => $parameters,
            )),
          );
        }
      }
      if ($i < $pager_max) {
        $items[] = array(
          'class' => array('pager__item', 'pager__item--ellipsis'),
          'role' => 'presentation',
          'data' => '…',
        );
      }
    }
    // End generation.
    if ($li_next) {
      $items[] = array(
        'class' => array('pager__item', 'pager__item--next'),
        'data' => $li_next,
      );
    }
    if ($li_last) {
      $items[] = array(
        'class' => array('pager__item', 'pager__item--last'),
        'data' => $li_last,
      );
    }
    return '<nav role="navigation"><h2 class="element-invisible">' . t('Pages') . '</h2>' . theme('item_list', array(
      'items' => $items,
      'attributes' => array('class' => array('pager')),
    )) . '</nav>';
  }
}

/**
 * Returns HTML for a link to a specific query result page.
 */
function eenterprise_pager_link($vars) {
  $text = $vars['text'];
  $page_new = $vars['page_new'];
  $element = $vars['element'];
  $parameters = $vars['parameters'];
  $attributes = &$vars['attributes'];
  $classes = &$vars['attributes']['class'];

  // Add default link class.
  $classes[] = 'pager__link';

  $page = isset($_GET['page']) ? $_GET['page'] : '';
  if ($new_page = implode(',', pager_load_array($page_new[$element], $element, explode(',', $page)))) {
    $parameters['page'] = $new_page;
  }

  $query = array();
  if (count($parameters)) {
    $query = drupal_get_query_parameters($parameters, array());
  }
  if ($query_pager = pager_get_query_parameters()) {
    $query = array_merge($query, $query_pager);
  }

  // Set accessible description for each pager link.
  static $a11y_text = NULL;
  static $titles = NULL;
  if (!isset($titles)) {
    $titles = array(
      t('« first') => t('First page'),
      t('‹ previous') => t('Previous page'),
      t('next ›') => t('Next page'),
      t('last »') => t('Last page'),
    );
  }
  if (isset($titles[$text])) {
    $a11y_text = $titles[$text];
  }
  elseif (is_numeric($text)) {
    $a11y_text = t('Page') . ' ';
  }

  // Change text and link attributes for first, previous, next, & last links.
  // @todo Add arrows using CSS :before.
  if ($text == '« first') {
    $text = '';
    $classes[] = 'pager__link--first';
  }
  if ($text == '‹ previous') {
    $text = '';
    $attributes['rel'][] = 'prev';
    $classes[] = 'pager__link--previous';
  }
  if ($text == 'next ›') {
    $text = '';
    $attributes['rel'][] = 'next';
    $classes[] = 'pager__link--next';
  }
  if ($text == 'last »') {
    $text = '';
    $classes[] = 'pager__link--last';
  }

  // @todo l() cannot be used here, since it adds an 'active' class based on the
  //   path only (which is always the current path for pager links). Apparently,
  //   none of the pager links is active at any time - but it should still be
  //   possible to use l() here.
  // @see http://drupal.org/node/1410574
  $attributes['href'] = url($_GET['q'], array('query' => $query));
  return '<a' . drupal_attributes($attributes) . '>' . '<span class="element-invisible">' . check_plain($a11y_text) . '</span>' . check_plain($text) . '</a>';
}

/**
 * Overrides HTML for a marker for required form elements.
 */
function eenterprise_form_required_marker($variables) {
  $attributes = array(
    'class' => 'form-required',
    'title' => t('This field is required.'),
  );
  return '<span' . drupal_attributes($attributes) . '>' .t('*') . '</span>';
}

//TODO: Can we come up with a better name for this function if necessary?
function check_column_complexity($colgroup, &$attributes, &$cols){

  foreach ($colgroup as $key => $value) {
    if ($key == 'data') {
      $cols = $value;
    }
    else {
      $attributes[$key] = $value;
    }
  }

}

//TODO: Can we come up with a better name for this function if necessary?
function check_row_complexity($row, &$attributes, &$cells){

  foreach ($row as $key => $value) {
    if ($key == 'data') {
      $cells = $value;
    }
    else {
      $attributes[$key] = $value;
    }
  }

}

//TODO: Can we come up with a better name for this function if necessary?
function check_item_value($key, $value, &$data, &$children, &$attributes){

  if ($key == 'data') {
    $data = $value;
  }
  elseif ($key == 'children') {
    $children = $value;
  }
  else {
    $attributes[$key] = $value;
  }

}