<?php
/**
 * @file
 * workbench_progress_tracker_view.views_default.inc
 */

/**
 * Implements hook_views_default_views().
 */
function workbench_progress_tracker_view_views_default_views() {
  $export = array();

  $view = new view();
  $view->name = 'progress_tracker';
  $view->description = '';
  $view->tag = 'default';
  $view->base_table = 'node';
  $view->human_name = 'Progress Tracker';
  $view->core = 7;
  $view->api_version = '3.0';
  $view->disabled = FALSE; /* Edit this to true to make a default view disabled initially */

  /* Display: Master */
  $handler = $view->new_display('default', 'Master', 'default');
  $handler->display->display_options['title'] = 'Progress Tracker';
  $handler->display->display_options['use_ajax'] = TRUE;
  $handler->display->display_options['use_more_always'] = FALSE;
  $handler->display->display_options['access']['type'] = 'role';
  $handler->display->display_options['access']['role'] = array(
    9 => '9',
    12 => '12',
    11 => '11',
    8 => '8',
    6 => '6',
    10 => '10',
  );
  $handler->display->display_options['cache']['type'] = 'none';
  $handler->display->display_options['query']['type'] = 'views_query';
  $handler->display->display_options['exposed_form']['type'] = 'basic';
  $handler->display->display_options['exposed_form']['options']['autosubmit'] = TRUE;
  $handler->display->display_options['pager']['type'] = 'mini';
  $handler->display->display_options['pager']['options']['items_per_page'] = '4';
  $handler->display->display_options['pager']['options']['offset'] = '0';
  $handler->display->display_options['pager']['options']['id'] = '0';
  $handler->display->display_options['style_plugin'] = 'table';
  $handler->display->display_options['style_options']['columns'] = array(
    'counter' => 'counter',
    'field_prog_tracker_app' => 'field_prog_tracker_app',
    'field_prog_track_domain' => 'field_prog_track_domain',
    'field_prog_track_status' => 'field_prog_track_status',
    'field_prog_track_updated' => 'field_prog_track_updated',
    'field_prog_track_actions' => 'field_prog_track_actions',
  );
  $handler->display->display_options['style_options']['default'] = 'field_prog_tracker_app';
  $handler->display->display_options['style_options']['info'] = array(
    'counter' => array(
      'align' => '',
      'separator' => '',
      'empty_column' => 0,
    ),
    'field_prog_tracker_app' => array(
      'sortable' => 1,
      'default_sort_order' => 'asc',
      'align' => '',
      'separator' => '',
      'empty_column' => 0,
    ),
    'field_prog_track_domain' => array(
      'sortable' => 0,
      'default_sort_order' => 'asc',
      'align' => '',
      'separator' => '',
      'empty_column' => 0,
    ),
    'field_prog_track_status' => array(
      'sortable' => 0,
      'default_sort_order' => 'asc',
      'align' => '',
      'separator' => '',
      'empty_column' => 0,
    ),
    'field_prog_track_updated' => array(
      'sortable' => 0,
      'default_sort_order' => 'asc',
      'align' => '',
      'separator' => '',
      'empty_column' => 0,
    ),
    'field_prog_track_actions' => array(
      'sortable' => 0,
      'default_sort_order' => 'asc',
      'align' => '',
      'separator' => '',
      'empty_column' => 0,
    ),
  );
  /* Field: Global: View result counter */
  $handler->display->display_options['fields']['counter']['id'] = 'counter';
  $handler->display->display_options['fields']['counter']['table'] = 'views';
  $handler->display->display_options['fields']['counter']['field'] = 'counter';
  $handler->display->display_options['fields']['counter']['label'] = '#';
  $handler->display->display_options['fields']['counter']['counter_start'] = '1';
  $handler->display->display_options['fields']['counter']['reverse'] = 0;
  /* Field: Content: Application */
  $handler->display->display_options['fields']['field_prog_tracker_app']['id'] = 'field_prog_tracker_app';
  $handler->display->display_options['fields']['field_prog_tracker_app']['table'] = 'field_data_field_prog_tracker_app';
  $handler->display->display_options['fields']['field_prog_tracker_app']['field'] = 'field_prog_tracker_app';
  $handler->display->display_options['fields']['field_prog_tracker_app']['label'] = 'Item';
  /* Field: Content: Domain */
  $handler->display->display_options['fields']['field_prog_track_domain']['id'] = 'field_prog_track_domain';
  $handler->display->display_options['fields']['field_prog_track_domain']['table'] = 'field_data_field_prog_track_domain';
  $handler->display->display_options['fields']['field_prog_track_domain']['field'] = 'field_prog_track_domain';
  $handler->display->display_options['fields']['field_prog_track_domain']['element_label_colon'] = FALSE;
  /* Field: Content: Status */
  $handler->display->display_options['fields']['field_prog_track_status']['id'] = 'field_prog_track_status';
  $handler->display->display_options['fields']['field_prog_track_status']['table'] = 'field_data_field_prog_track_status';
  $handler->display->display_options['fields']['field_prog_track_status']['field'] = 'field_prog_track_status';
  /* Field: Content: Updated */
  $handler->display->display_options['fields']['field_prog_track_updated']['id'] = 'field_prog_track_updated';
  $handler->display->display_options['fields']['field_prog_track_updated']['table'] = 'field_data_field_prog_track_updated';
  $handler->display->display_options['fields']['field_prog_track_updated']['field'] = 'field_prog_track_updated';
  $handler->display->display_options['fields']['field_prog_track_updated']['label'] = 'Date';
  $handler->display->display_options['fields']['field_prog_track_updated']['settings'] = array(
    'format_type' => 'shorttime',
    'fromto' => 'both',
    'multiple_number' => '',
    'multiple_from' => '',
    'multiple_to' => '',
  );
  /* Field: Content: Actions */
  $handler->display->display_options['fields']['field_prog_track_actions']['id'] = 'field_prog_track_actions';
  $handler->display->display_options['fields']['field_prog_track_actions']['table'] = 'field_data_field_prog_track_actions';
  $handler->display->display_options['fields']['field_prog_track_actions']['field'] = 'field_prog_track_actions';
  /* Field: Content: Date Type */
  $handler->display->display_options['fields']['field_prog_track_date_type']['id'] = 'field_prog_track_date_type';
  $handler->display->display_options['fields']['field_prog_track_date_type']['table'] = 'field_data_field_prog_track_date_type';
  $handler->display->display_options['fields']['field_prog_track_date_type']['field'] = 'field_prog_track_date_type';
  $handler->display->display_options['fields']['field_prog_track_date_type']['label'] = '';
  $handler->display->display_options['fields']['field_prog_track_date_type']['exclude'] = TRUE;
  $handler->display->display_options['fields']['field_prog_track_date_type']['element_label_colon'] = FALSE;
  /* Field: Content: Item Description */
  $handler->display->display_options['fields']['field_prog_track_item_desc']['id'] = 'field_prog_track_item_desc';
  $handler->display->display_options['fields']['field_prog_track_item_desc']['table'] = 'field_data_field_prog_track_item_desc';
  $handler->display->display_options['fields']['field_prog_track_item_desc']['field'] = 'field_prog_track_item_desc';
  $handler->display->display_options['fields']['field_prog_track_item_desc']['label'] = '';
  $handler->display->display_options['fields']['field_prog_track_item_desc']['exclude'] = TRUE;
  $handler->display->display_options['fields']['field_prog_track_item_desc']['element_label_colon'] = FALSE;
  /* Field: Content: Item Details */
  $handler->display->display_options['fields']['field_prog_track_item_details']['id'] = 'field_prog_track_item_details';
  $handler->display->display_options['fields']['field_prog_track_item_details']['table'] = 'field_data_field_prog_track_item_details';
  $handler->display->display_options['fields']['field_prog_track_item_details']['field'] = 'field_prog_track_item_details';
  $handler->display->display_options['fields']['field_prog_track_item_details']['label'] = '';
  $handler->display->display_options['fields']['field_prog_track_item_details']['exclude'] = TRUE;
  $handler->display->display_options['fields']['field_prog_track_item_details']['element_label_colon'] = FALSE;
  /* Sort criterion: Content: Post date */
  $handler->display->display_options['sorts']['created']['id'] = 'created';
  $handler->display->display_options['sorts']['created']['table'] = 'node';
  $handler->display->display_options['sorts']['created']['field'] = 'created';
  $handler->display->display_options['sorts']['created']['order'] = 'DESC';
  /* Filter criterion: Content: Published */
  $handler->display->display_options['filters']['status']['id'] = 'status';
  $handler->display->display_options['filters']['status']['table'] = 'node';
  $handler->display->display_options['filters']['status']['field'] = 'status';
  $handler->display->display_options['filters']['status']['value'] = 1;
  $handler->display->display_options['filters']['status']['group'] = 1;
  $handler->display->display_options['filters']['status']['expose']['operator'] = FALSE;
  /* Filter criterion: Content: Type */
  $handler->display->display_options['filters']['type']['id'] = 'type';
  $handler->display->display_options['filters']['type']['table'] = 'node';
  $handler->display->display_options['filters']['type']['field'] = 'type';
  $handler->display->display_options['filters']['type']['value'] = array(
    'progress_tracker' => 'progress_tracker',
  );
  /* Filter criterion: Content: Category (field_prog_track_category) */
  $handler->display->display_options['filters']['field_prog_track_category_value']['id'] = 'field_prog_track_category_value';
  $handler->display->display_options['filters']['field_prog_track_category_value']['table'] = 'field_data_field_prog_track_category';
  $handler->display->display_options['filters']['field_prog_track_category_value']['field'] = 'field_prog_track_category_value';
  $handler->display->display_options['filters']['field_prog_track_category_value']['exposed'] = TRUE;
  $handler->display->display_options['filters']['field_prog_track_category_value']['expose']['operator_id'] = 'field_prog_track_category_value_op';
  $handler->display->display_options['filters']['field_prog_track_category_value']['expose']['label'] = 'Category';
  $handler->display->display_options['filters']['field_prog_track_category_value']['expose']['operator'] = 'field_prog_track_category_value_op';
  $handler->display->display_options['filters']['field_prog_track_category_value']['expose']['identifier'] = 'field_prog_track_category_value';
  $handler->display->display_options['filters']['field_prog_track_category_value']['expose']['remember_roles'] = array(
    2 => '2',
    1 => 0,
    3 => 0,
    4 => 0,
    5 => 0,
    6 => 0,
    7 => 0,
    8 => 0,
    9 => 0,
    10 => 0,
    11 => 0,
    12 => 0,
    13 => 0,
  );

  /* Display: Page */
  $handler = $view->new_display('page', 'Page', 'page');
  $handler->display->display_options['path'] = 'progress-tracker';

  /* Display: Block */
  $handler = $view->new_display('block', 'Block', 'block_1');
  $export['progress_tracker'] = $view;

  return $export;
}
