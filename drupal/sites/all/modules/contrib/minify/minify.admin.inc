<?php

/**
 * Menu callback to generate overview form
 */
function minify_js_callback() {
  if (!function_exists('curl_init')) {
    form_set_error('null', t('CURL library not avaliable. In order to use Minify please install CURL library.'));
  }

  $cache = variable_get('minify_captured_js', array());

  $options = array();
  if (!empty($cache)) {
    _minify_sort_array_by_column($cache, 'file_name');
    foreach ($cache as $key => $value) {
      $value['file_updated'] = _minify_is_file_updated($value);

      $options[$key] = array(
        'file_name' => _minify_file_name($value),
        'version' => ($value['version']) ? $value['version'] : 'N/A',
        'file_path' => _minify_file_path_links($value),
        'status' => _minify_file_status($value),
        'last_minify_at' => (0 != $value['last_minify_at']) ? format_date($value['last_minify_at'], 'medium') : 'N/A',
        'original_size' => _minify_original_file_size($value),
        'minified_size' => _minify_format_file_size($value['minified_size']),
        'operations' => _minify_operation_links($value),
      );
    }
  }

  $header = array(
    'file_name' => t('File name'),
    'version' => t('Version'),
    'file_path' => t('File path'),
    'status' => t('Status'),
    'last_minify_at' => t('Last minified/refresh'),
    'original_size' => t('Original size'),
    'minified_size' => t('Minified size'),
    'operations' => t('Operations'),
  );
  $form['js'] = array(
    '#type' => 'tableselect',
    '#header' => $header,
    '#options' => $options,
    '#empty' => '<b>' . t('JavaScript files not found, please visit some random pages at front end to capture JavaScript files.') . '</b>',
  );
  $form['minify'] = array(
    '#type' => 'submit',
    '#value' => t('Minify'),
    '#submit' => array('minify_js_submit'),
  );
  $form['clear_minify_cache'] = array(
    '#type' => 'submit',
    '#value' => t('Clear minify cache'),
    '#submit' => array('minify_clear_js_cache'),
  );
  return $form;
}

/**
 * Helper function to check file is updated or not, using file size
 */
function _minify_is_file_updated($details) {
  $file_size = filesize(drupal_realpath($details['file_path']));
  if ($details['original_size'] != $file_size && $details['status']) {
    return true;
  } else {
    return false;
  }
}

/**
 * Helper function to construct file name also include file version if avaliable
 */
function _minify_file_name($details) {
  if ($details['file_updated']) {
    return '<span class="marker">' . $details['file_name'] . ' </span>';
  } else {
    return $details['file_name'];
  }
}

function _minify_file_path_links($details) {
  return l('Original', $details['file_path'], array('attributes' => array('target' => '_blank', 'title' => $details['file_path'])))
    . (($details['status']) 
      ? (' | ' . l('Minified', $details['minified_file_path'], array('attributes' => array('target' => '_blank', 'title' => $details['minified_file_path'])))) 
      : ''
    );
}

/**
 * Helper function to construct operation links
 */
function _minify_operation_links($details) {
  $refresh_link = l('Refresh', 
    'admin/config/development/performance/minifyjs/refresh', 
    array('query' => array('file' => $details['file_path']), 'attributes' => array('title' => 'Refresh/regenerate the minified JS file.'))
  );

  $revert_link = l('Revert', 
    'admin/config/development/performance/minifyjs/revert', 
    array('query' => array('file' => $details['file_path']), 'attributes' => array('title' => 'Revert back to original state.'))
  );

  $minify = l('Minify', 
    'admin/config/development/performance/minifyjs/refresh', 
    array('query' => array('file' => $details['file_path']), 'attributes' => array('title' => 'Minify it.')));

  return ($details['status']) ? ($refresh_link . ' | ' . $revert_link) : $minify;
}

/**
 * Helper function to get original file size
 */
function _minify_original_file_size($details) {
  $file_size = filesize(drupal_realpath($details['file_path']));
  if ($details['file_updated']) {
    return '<span class="marker">' . _minify_format_file_size($file_size) . '</span>';
  } else {
    return _minify_format_file_size($details['original_size']);
  }
}

/**
 * Function to sort multidimensional array by column
 */
function _minify_sort_array_by_column(&$arr, $col, $dir = SORT_ASC) {
  $sort_col = array();
  foreach ($arr as $key=> $row) {
    $sort_col[$key] = $row[$col];
  }
  array_multisort($sort_col, $dir, $arr);
}

/**
 * Function to convert file size in human readable form
 */
function _minify_format_file_size($f_size) {
  if(0 == $f_size) {
    $f_size = 'N/A';
  } elseif ($f_size >= 1048576) {
    $f_size = number_format($f_size / 1048576, 2) . ' MB';
  } elseif ($f_size >= 1024) {
    $f_size = number_format($f_size / 1024, 2) . ' KB';
  } elseif ($f_size > 1) {
    $f_size = $f_size . ' bytes';
  }
  return $f_size;
}

/**
 * Function to return file status
 */
function _minify_file_status($details) {
  if ($details['file_updated'] && $details['status']) {
    $status = ' <span class="marker">Out of sync</span>';
  } else if ($details['status']) {
    $status = 'Minified';
  } else {
    $status = 'Non-minified';
  }
  return $status;
}

/**
 * Submit function to handle overview for submission
 */
function minify_js_submit($form, &$form_state) {

  /* Filter out non-selected values */
  $selected_scripts = array_filter($form_state['values']['js']);

  $operations = array();
  foreach ($selected_scripts as $script) {
    $operations[] = array('minify_batch_process', array($script));
  }

  $batch = array(
    'title' => t('Minify'),
    'init_message' => t('Minify starting.'),
    'operations' => $operations,
    'file' => drupal_get_path('module', 'minify') . '/' . 'minify.admin.inc',
  );

  batch_set($batch);

  /* Setting redirect in batch_process */
  batch_process('admin/config/development/performance/minifyjs');

}

/**
 * Function to execute minify batch process
 */
function minify_batch_process($script, &$context) {
  $cache_data = variable_get('minify_captured_js', array());

  $info = pathinfo($script);
  $context['message'] = t('Now processing <i>@file_name</i>', array('@file_name' => $info['basename']));

  _minify_process_minify($script, $cache_data);
}

/**
 * Submit callback to clear captured data
 */
function minify_clear_js_cache($form, &$form_state) {
  $minify_dir = variable_get('file_public_path', conf_path() . '/files') . '/minify';
  $files = file_scan_directory($minify_dir, '/.*\.*$/');
  foreach ($files as $key => $value) {
    drupal_unlink($key);
  }
  variable_del('minify_captured_js');
  variable_set('minify_js', 0);
  watchdog('minify', 'Minify cache cleared.', array(), WATCHDOG_NOTICE);
  drupal_set_message(t('Minify cache cleared.'));
  drupal_goto('admin/config/development/performance/minifyjs');
}

/**
 * Helper function to process minify call
 */
function _minify_process_minify($script, &$cache_data) {
  $js_code = urlencode(trim(file_get_contents(drupal_realpath($script))));
  $post_data = _minify_get_post_fields($js_code);
  $response = _minify_send_request($post_data);
  if (isset($response['response'])) {
    $response_obj = $response['response'];

    if (!isset($response_obj->warnings) && !isset($response_obj->serverErrors)) {
      $min_js_path = _minify_construct_min_js_path($script, $cache_data[$script]['version']);
      if (file_put_contents($min_js_path, $response_obj->compiledCode)) {

        watchdog('minify', '%old_path minified successfully as %new_path.', array('%old_path' => $script, '%new_path' => $min_js_path), WATCHDOG_NOTICE);
        drupal_set_message(t('%old_path minified successfully as %new_path.', array('%old_path' => $script, '%new_path' => $min_js_path)));

        $cache_data[$script]['minified_file_path'] = $min_js_path;
        $cache_data[$script]['original_size'] = filesize(drupal_realpath($script));
        $cache_data[$script]['minified_size'] = $response_obj->statistics->compressedSize;
        $cache_data[$script]['status'] = true;
        $cache_data[$script]['last_minify_at'] = time();
        $cache_data[$script]['error'] = 0;
        $cache_data[$script]['error_msg'] = '';
      } //File save if end
    } else if (isset($response_obj->warnings)) {
      $warning = $response_obj->warnings[0]->warning;

      $cache_data[$script]['error'] = 1;
      $cache_data[$script]['error_msg'] = $warning;

      watchdog('minify', 'Failed to generate minified JS. Error: %warning', array('%warning' => $warning), WATCHDOG_ERROR);
      form_set_error('null', t('Failed to generate minified JS. Error: %warning', array('%warning' => $warning)));
    } else if (isset($response_obj->serverErrors)) {
      watchdog('minify', 'Server error, Too many compiles performed recently. Try again later.', array(), WATCHDOG_ERROR);
      form_set_error('null', t('Server error, Too many compiles performed recently. Try again later.'));
    }

    /* Update the cache */
    variable_set('minify_captured_js', $cache_data);

  } // Response isset if end
}

/**
 * Helper function to construct post request data
 */
function _minify_get_post_fields($js_code) {
  $post_data_array = array();
  $post_data_array[] = 'js_code=' . $js_code;
  $post_data_array[] = 'compilation_level=WHITESPACE_ONLY';
  $post_data_array[] = 'output_format=json';
  $post_data_array[] = 'warning_level=DEFAULT';
  $post_data_array[] = 'use_closure_library=' . true;
  $post_data_array[] = 'output_info=warnings';
  $post_data_array[] = 'output_info=errors';
  $post_data_array[] = 'output_info=compiled_code';
  $post_data_array[] = 'output_info=statistics';
  /* Prepare POST request query string */
  return implode('&', $post_data_array);
}

/**
 * Helper function to send CURL request
 */
function _minify_send_request($post_data) {
  if (function_exists('curl_init')) {
    $curl = curl_init();
    curl_setopt($curl, CURLOPT_URL, "closure-compiler.appspot.com/compile");
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($curl, CURLOPT_POSTFIELDS, $post_data);
    curl_setopt($curl, CURLOPT_POST, true);
    $response = json_decode(curl_exec($curl));
    $httpcode = curl_getinfo($curl, CURLINFO_HTTP_CODE);
    curl_close($curl);
    return array('response' => $response, 'http_code' => $httpcode);
  }
}

/**
 * Helper function to construct minified js path
 */
function _minify_construct_min_js_path($script, $version) {
  $minify_js_dir = variable_get('file_public_path', conf_path() . '/files') . '/minify/';
  if (!is_dir($minify_js_dir)) {
    drupal_mkdir($minify_js_dir);
  }

  $path_parts = pathinfo($script);
  $file_name = implode('.', array_filter(array($path_parts['filename'], $version, 'min', $path_parts['extension'])));
  /* Construct path */
  $min_file_path = $minify_js_dir . $file_name;
  
  $cache_data = variable_get('minify_captured_js', array());
  /* Loop and check if newly constructed file path is exist */
  /* Also skip index the array index for same file */
  foreach ($cache_data as $key => $value) {
    if( ($script != $key) && (isset($value['minified_file_path'])) ) {
      $i = 1;
      /* Append number till we get unique path, if new constructed file path is exist */
      while( ($value['minified_file_path'] == $min_file_path) ) {
        $file_name = $path_parts['filename'] . '_' . $i . '.min.' . $path_parts['extension'];
        $min_file_path = $minify_js_dir . $file_name;
        $i++;
      }
    }
  }

  return $min_file_path;
}

/**
 * Helper function to remove minified js from cache
 */
function _minify_js_revert_callback() {
  $cache_data = variable_get('minify_captured_js', array());
  if (!empty($cache_data)) {
    $key = $_GET['file'];
    if (isset($cache_data[$key])) {
      /* Reset cache data record to prevent use of minified js */
      $minified_file_path = $cache_data[$key]['minified_file_path'];
      $cache_data[$key]['minified_file_path'] = '';
      $cache_data[$key]['minified_size'] = 0;
      $cache_data[$key]['status'] = false;
      $cache_data[$key]['last_minify_at'] = 0;
      
      /* Set status flag, if even single javascript is minified */
      $status_flag = false;
      foreach ($cache_data as $key => $value) {
        if ($cache_data[$key]['status']) {
          $status_flag = true;
        }
      }
      
      /* Delete variable when, even single javascript is not minified to uncheck checkbox from performance page */
      if (!$status_flag) {
        variable_del('minify_js');
      }

      variable_set('minify_captured_js', $cache_data);
      
      /* delete the file */
      drupal_unlink($minified_file_path);

      $path_parts = pathinfo($key);
      $file_name = $path_parts['filename'] . '.min.' . $path_parts['extension'];
      watchdog('minify', '%file_name reverted successfully.', array('%file_name' => $file_name), WATCHDOG_NOTICE);
      drupal_set_message(t('%file_name reverted successfully.', array('%file_name' => $file_name)));
    }
  }
  drupal_goto('admin/config/development/performance/minifyjs');
}

/**
 * Helper function to regenerate minified js
 */
function _minify_js_refresh_callback() {
  $file = $_GET['file'];
  $cache_data = variable_get('minify_captured_js', array());
  _minify_process_minify($file, $cache_data);
  drupal_goto('admin/config/development/performance/minifyjs');
}
