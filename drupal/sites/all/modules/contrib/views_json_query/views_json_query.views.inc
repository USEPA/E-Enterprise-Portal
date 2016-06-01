<?php
/**
 * @file
 * Views hooks for views_json_query.
 */

/**
 * Implements hook_views_data().
 */
function views_json_query_views_data() {
  $data = array();
  $data['json']['table']['group'] = t('Json');

  $data['json']['table']['base'] = array(
    'title' => t('Json'),
    'help' => t('Queries an Json file.'),
    'query class' => 'views_json_query',
  );

  $data['json']['value'] = array(
    'title' => t('value'),
    'help' => t('value in the Json file.'),
    'field' => array(
      'handler' => 'views_json_query_handler_field',
      'click sortable' => TRUE,
    ),
    'filter' => array(
      'handler' => 'views_json_query_handler_filter',
    ),
    'sort' => array(
      'handler' => 'views_json_query_handler_sort',
    ),
  );

  return $data;
}

/**
 * Implements hook_views_plugins().
 */
function views_json_query_views_plugins() {
  return array(
    'query' => array(
      'views_json_query' => array(
        'title' => t('Json'),
        'help' => t('Reads from an Json file.'),
        'handler' => 'views_json_query_plugin_query_json',
      ),
    ),
  );
}
