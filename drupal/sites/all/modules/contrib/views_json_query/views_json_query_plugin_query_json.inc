<?php
/**
 * @file
 * Query plugin for views_json_query.
 */

class views_json_query_plugin_query_json extends views_plugin_query {

  /**
   * Generate a query from all of the information supplied to the object.
   *
   * @param $get_count
   *   Provide a countquery if this is true, otherwise provide a normal query.
   */
  function query($get_count = FALSE) {
    $filters = array();

    if (isset($this->filter)) {
      foreach ($this->filter as $filter) {
        $filters[] = $filter->generate();
      }
    }
    // @todo Add an option for the filters to be 'and' or 'or'.
    return $filters;
  }

  /**
   * Builds the necessary info to execute the query.
   */
  function build(&$view) {
    $view->init_pager();

    // Let the pager modify the query to add limits.
    $this->pager->query();

    $view->build_info['query'] = $this->query();

    $view->build_info['query_args'] = array();
  }

  /**
   * Fetch file.
   */
  function fetch_file($uri) {
    $parsed = parse_url($uri);
    // Check for local file.
    if (empty($parsed['host'])) {
      if (!file_exists($uri)) {
        throw new Exception(t('Local file not found.'));
      }
      return file_get_contents($uri);
    }

    $destination = 'public://views_json_query';
    if (!file_prepare_directory($destination, FILE_CREATE_DIRECTORY |
      FILE_MODIFY_PERMISSIONS)) {
      throw new Exception(
        t('Files directory either cannot be created or is not writable.')
      );
    }

    $headers = array();
    $cache_file = 'views_json_query_' . md5($uri);
    if ($cache = cache_get($cache_file)) {
      $last_headers = $cache->data;

      if (!empty($last_headers['etag'])) {
        $headers['If-None-Match'] = $last_headers['etag'];
      }
      if (!empty($last_headers['last-modified'])) {
        $headers['If-Modified-Since'] = $last_headers['last-modified'];
      }
    }

    $result = drupal_http_request($uri, array('headers' => $headers));
    if (isset($result->error)) {
      $args = array('%error' => $result->error, '%uri' => $uri);
      $message = t('HTTP response: %error. URI: %uri', $args);
      throw new Exception($message);
    }
    $cache_file_uri = "$destination/$cache_file";

    if ($result->code == 304) {
      if (file_exists($cache_file_uri)) {
        return file_get_contents($cache_file_uri);
      }
      // We have the headers but no cache file. :(
      // Run it back.
      cache_clear_all($cache_file, 'cache');
      return $this->fetch_file($uri);
    }

    // As learned from Feeds caching mechanism, save to file.
    file_save_data($result->data, $cache_file_uri, FILE_EXISTS_REPLACE);
    cache_set($cache_file, $result->headers);
    return $result->data;
  }

  /**
   * Execute.
   */
  function execute(&$view) {
    $start = microtime(TRUE);

    // Avoid notices about $view->execute_time being undefined if the query
    // doesn't finish.
    $view->execute_time = NULL;

    // Make sure that an xml file exists.
    // This could happen if you come from the add wizard to the actual views
    // edit page.
    if (empty($this->options['json_file'])) {
      return FALSE;
    }

    $data = new stdClass();
    try {
      $data->contents = $this->fetch_file($this->options['json_file']);
    }
    catch (Exception $e) {
      drupal_set_message(
        t('Views Json Query') . ': ' . $e->getMessage(), 'error'
      );
      return;
    }

    // When content is empty, parsing it is pointless.
    if (!$data->contents) {
      if ($this->options['show_errors']) {
        drupal_set_message(t('Views Json Backend: File is empty.'), 'warning');
      }
      return;
    }

    // Go!
    $ret = $this->parse($view, $data);
    $view->execute_time = microtime(TRUE) - $start;

    if (!$ret) {
      if (version_compare(phpversion(), '5.3.0', '>=')) {
        $tmp = array(
          JSON_ERROR_NONE =>
          t('No error has occurred'),
          JSON_ERROR_DEPTH =>
          t('The maximum stack depth has been exceeded'),
          JSON_ERROR_STATE_MISMATCH =>
          t('Invalid or malformed JSON'),
          JSON_ERROR_CTRL_CHAR =>
          t('Control character error, possibly incorrectly encoded'),
          JSON_ERROR_SYNTAX =>
          t('Syntax error'),
          JSON_ERROR_UTF8 =>
          t('Malformed UTF-8 characters, possibly incorrectly encoded'),
        );
        $msg = $tmp[json_last_error()] . ' - ' . $this->options['json_file'];
        drupal_set_message($msg, 'error');
      }
      else {
        drupal_set_message(t(
          'Views Json Backend: Parse json error') .
          ' - ' . $this->options['json_file'], 'error'
        );
      }
    }
  }

  /**
   * Fetch data in array according to apath.
   *
   * @param string $apath
   *   Something like '1/name/0'
   *
   * @param array $array
   *
   * @return array
   */
  function apath($apath, $array) {
    $r = & $array;
    $paths = explode('/', trim($apath, '//'));
    foreach ($paths as $path) {
      if (is_array($r) && isset($r[$path])) {
        $r = & $r[$path];
      }
      elseif (is_object($r)) {
        $r = & $r->$path;
      }
      else {
        break;
      }
    }

    return $r;
  }

  /**
   * Define ops for using in filter.
   */
  function ops($op, $l, $r) {
    $table = array(
      '=' => create_function('$l,$r', 'return $l === $r;'),
      '!=' => create_function('$l,$r', 'return $l !== $r;'),
      'contains' => create_function('$l, $r', 'return strpos($l, $r) !== false;'),
      '!contains' => create_function('$l, $r', 'return strpos($l, $r) === false;'),
      'shorterthan' => create_function('$l, $r', 'return strlen($l) < $r;'),
      'longerthan' => create_function('$l, $r', 'return strlen($l) > $r;'),
    );

    return call_user_func_array($table[$op], array($l, $r));
  }

  /**
   * Parse.
   */
  function parse(&$view, $data) {
    $ret = json_decode($data->contents, FALSE);
    if (!$ret) {
      return FALSE;
    }

    // Get rows.
    $ret = $this->apath($this->options['row_apath'], $ret);

    // Filter.
    foreach ($ret as $k => $row) {
      $check = TRUE;
      foreach ($view->build_info['query'] as $filter) {
        $l = $row[$filter[0]];
        $check = $this->ops($filter[1], $l, $filter[2]);
        if (!$check) {
          break;
        }
      }
      if (!$check) {
        unset($ret[$k]);
      }
    }

    try {
      if ($this->pager->use_count_query() || !empty($view->get_total_rows)) {
        // Hackish execute_count_query implementation.
        $this->pager->total_items = count($ret);
        if (!empty($this->pager->options['offset'])) {
          $this->pager->total_items -= $this->pager->options['offset'];
        }

        $this->pager->update_page_info();
      }

      // Deal with offset & limit.
      $offset = !empty($this->offset) ? intval($this->offset) : 0;
      $limit = !empty($this->limit) ? intval($this->limit) : 0;
      $ret = $limit ? array_slice($ret, $offset, $limit) : array_slice($ret, $offset);

      $result = array();
      foreach ($ret as $row) {
        $new_row = new stdClass();
        $new_row = $this->parse_row(NULL, $row, $row);
        $result[] = (object) $new_row;
      }
 
      if (!empty($this->orderby)) {
        // Array reverse, because the most specific are first.
        foreach (array_reverse($this->orderby) as $orderby) {
          $orderby->sort($result);
        }
      }
      $view->result = $result;
      $view->total_rows = count($result);

      $this->pager->post_execute($view->result);

      return TRUE;
    }
    catch (Exception $e) {
      $view->result = array();
      if (!empty($view->live_preview)) {
        drupal_set_message(time());
        drupal_set_message($e->getMessage(), 'error');
      }
      else {
        debug($e->getMessage(), 'Views Json Backend');
      }
    }
  }

  /**
   * Parse row.
   *
   * A recursive function to flatten the json object.
   * Example:
   * {person:{name:{first_name:"John", last_name:"Doe"}}}
   * becomes:
   * $row->person/name/first_name = "John",
   * $row->person/name/last_name = "Doe"
   */   
  function parse_row($parent_key, $parent_row, &$row) {
    $props = get_object_vars($parent_row);

    foreach ($props as $key => $value) {
      if (is_object($value)) {
        unset($row->$key);
        $this->parse_row(
          is_null($parent_key) ? $key : $parent_key . '/' . $key,
          $value,
          $row
        );
      }
      else {
        if ($parent_key) {
          $new_key = $parent_key . '/' . $key;
          $row->$new_key = $value;
        }
        else {
          $row->$key = $value;
        }
      }
    }

    return $row;
  }
 
  /**
   * Add signature.
   */
  function add_signature(&$view) {
  }

  /**
   * Option definition.
   */
  function option_definition() {
    $options = parent::option_definition();
    $options['json_file'] = array('default' => '');
    $options['row_apath'] = array('default' => '');
    $options['show_errors'] = array('default' => TRUE);

    return $options;
  }

  /**
   * Options form.
   */
  function options_form(&$form, &$form_state) {
    $form['json_file'] = array(
      '#type' => 'textfield',
      '#title' => t('Json File'),
      '#default_value' => $this->options['json_file'],
      '#description' => t("The URL or path to the Json file."),
      '#maxlength' => 1024,
    );
    $form['row_apath'] = array(
      '#type' => 'textfield',
      '#title' => t('Row Apath'),
      '#default_value' => $this->options['row_apath'],
      '#description' => t("Apath to records.<br />Apath is just a simple array item find method. Ex:<br /><pre>array('data' => \n\tarray('records' => \n\t\tarray(\n\t\t\tarray('name' => 'yarco', 'sex' => 'male'),\n\t\t\tarray('name' => 'someone', 'sex' => 'male')\n\t\t)\n\t)\n)</pre><br />You want 'records', so Apath could be set to 'data/records'. <br />Notice: prefix '/' or postfix '/' will be trimed, so never mind you add it or not."),
      '#required' => TRUE,
    );
    $form['show_errors'] = array(
      '#type' => 'checkbox',
      '#title' => t('Show Json errors'),
      '#default_value' => $this->options['show_errors'],
      '#description' => t('If there were any errors during Json parsing, display them. It is recommended to leave this on during development.'),
      '#required' => FALSE,
    );
  }

  /**
   * Add field.
   */
  function add_field($table, $field, $alias = '', $params = array()) {
    $alias = $field;

    // Add field info array.
    if (empty($this->fields[$field])) {
      $this->fields[$field] = array(
        'field' => $field,
        'table' => $table,
        'alias' => $alias,
      ) + $params;
    }

    return $field;
  }

  /**
   * Add Order By.
   */
  function add_orderby($orderby) {
    $this->orderby[] = $orderby;
  }

  /**
   * Add Filter.
   */
  function add_filter($filter) {
    $this->filter[] = $filter;
  }

  /**
   * Return info to base the uniqueness of the result on.
   *
   * @return array
   *   Array with query unique data.
   */
  function get_cache_info() {
    return array(
      'json_file' => $this->options['json_file'],
      'row_apath' => $this->options['row_apath'],
    );
  }
}
