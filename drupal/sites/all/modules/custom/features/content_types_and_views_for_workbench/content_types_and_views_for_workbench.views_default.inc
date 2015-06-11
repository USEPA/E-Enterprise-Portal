<?php
/**
 * @file
 * content_types_and_views_for_workbench.views_default.inc
 */

/**
 * Implements hook_views_default_views().
 */
function content_types_and_views_for_workbench_views_default_views() {
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
  $handler->display->display_options['use_more_always'] = FALSE;
  $handler->display->display_options['access']['type'] = 'perm';
  $handler->display->display_options['cache']['type'] = 'none';
  $handler->display->display_options['query']['type'] = 'views_query';
  $handler->display->display_options['exposed_form']['type'] = 'basic';
  $handler->display->display_options['pager']['type'] = 'mini';
  $handler->display->display_options['pager']['options']['items_per_page'] = '3';
  $handler->display->display_options['pager']['options']['offset'] = '0';
  $handler->display->display_options['pager']['options']['id'] = '0';
  $handler->display->display_options['style_plugin'] = 'table';
  /* Field: Global: Math expression */
  $handler->display->display_options['fields']['expression']['id'] = 'expression';
  $handler->display->display_options['fields']['expression']['table'] = 'views';
  $handler->display->display_options['fields']['expression']['field'] = 'expression';
  $handler->display->display_options['fields']['expression']['label'] = '#';
  $handler->display->display_options['fields']['expression']['precision'] = '0';
  $handler->display->display_options['fields']['expression']['expression'] = 'x=0;x=x+1';
  /* Field: Content: Application */
  $handler->display->display_options['fields']['field_prog_tracker_application']['id'] = 'field_prog_tracker_application';
  $handler->display->display_options['fields']['field_prog_tracker_application']['table'] = 'field_data_field_prog_tracker_application';
  $handler->display->display_options['fields']['field_prog_tracker_application']['field'] = 'field_prog_tracker_application';
  /* Field: Content: Actions */
  $handler->display->display_options['fields']['field_prog_tracker_actions']['id'] = 'field_prog_tracker_actions';
  $handler->display->display_options['fields']['field_prog_tracker_actions']['table'] = 'field_data_field_prog_tracker_actions';
  $handler->display->display_options['fields']['field_prog_tracker_actions']['field'] = 'field_prog_tracker_actions';
  /* Field: Content: Status */
  $handler->display->display_options['fields']['field_prog_tracker_status']['id'] = 'field_prog_tracker_status';
  $handler->display->display_options['fields']['field_prog_tracker_status']['table'] = 'field_data_field_prog_tracker_status';
  $handler->display->display_options['fields']['field_prog_tracker_status']['field'] = 'field_prog_tracker_status';
  /* Field: Content: Updated */
  $handler->display->display_options['fields']['field_prog_tracker_updated']['id'] = 'field_prog_tracker_updated';
  $handler->display->display_options['fields']['field_prog_tracker_updated']['table'] = 'field_data_field_prog_tracker_updated';
  $handler->display->display_options['fields']['field_prog_tracker_updated']['field'] = 'field_prog_tracker_updated';
  $handler->display->display_options['fields']['field_prog_tracker_updated']['settings'] = array(
    'format_type' => 'long',
    'fromto' => 'both',
    'multiple_number' => '',
    'multiple_from' => '',
    'multiple_to' => '',
  );
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

  /* Display: Page */
  $handler = $view->new_display('page', 'Page', 'page');
  $handler->display->display_options['path'] = 'progress-tracker';

  /* Display: Block */
  $handler = $view->new_display('block', 'Block', 'block_1');
  $export['progress_tracker'] = $view;

  $view = new view();
  $view->name = 'to_do';
  $view->description = '';
  $view->tag = 'default';
  $view->base_table = 'node';
  $view->human_name = 'To Do';
  $view->core = 7;
  $view->api_version = '3.0';
  $view->disabled = FALSE; /* Edit this to true to make a default view disabled initially */

  /* Display: Master */
  $handler = $view->new_display('default', 'Master', 'default');
  $handler->display->display_options['title'] = 'To Do';
  $handler->display->display_options['use_ajax'] = TRUE;
  $handler->display->display_options['use_more_always'] = FALSE;
  $handler->display->display_options['access']['type'] = 'perm';
  $handler->display->display_options['cache']['type'] = 'none';
  $handler->display->display_options['query']['type'] = 'views_query';
  $handler->display->display_options['exposed_form']['type'] = 'basic';
  $handler->display->display_options['pager']['type'] = 'mini';
  $handler->display->display_options['pager']['options']['items_per_page'] = '3';
  $handler->display->display_options['pager']['options']['offset'] = '0';
  $handler->display->display_options['pager']['options']['id'] = '0';
  $handler->display->display_options['style_plugin'] = 'table';
  $handler->display->display_options['style_options']['columns'] = array(
    'title' => 'title',
  );
  $handler->display->display_options['style_options']['default'] = '-1';
  $handler->display->display_options['style_options']['info'] = array(
    'title' => array(
      'sortable' => 0,
      'default_sort_order' => 'asc',
      'align' => '',
      'separator' => '',
      'empty_column' => 0,
    ),
  );
  /* Field: Content: Item */
  $handler->display->display_options['fields']['field_todo_list_item']['id'] = 'field_todo_list_item';
  $handler->display->display_options['fields']['field_todo_list_item']['table'] = 'field_data_field_todo_list_item';
  $handler->display->display_options['fields']['field_todo_list_item']['field'] = 'field_todo_list_item';
  /* Field: Content: Domain */
  $handler->display->display_options['fields']['field_todo_list_domain']['id'] = 'field_todo_list_domain';
  $handler->display->display_options['fields']['field_todo_list_domain']['table'] = 'field_data_field_todo_list_domain';
  $handler->display->display_options['fields']['field_todo_list_domain']['field'] = 'field_todo_list_domain';
  /* Field: Content: Due */
  $handler->display->display_options['fields']['field_todo_list_due']['id'] = 'field_todo_list_due';
  $handler->display->display_options['fields']['field_todo_list_due']['table'] = 'field_data_field_todo_list_due';
  $handler->display->display_options['fields']['field_todo_list_due']['field'] = 'field_todo_list_due';
  $handler->display->display_options['fields']['field_todo_list_due']['settings'] = array(
    'format_type' => 'long',
    'fromto' => 'both',
    'multiple_number' => '',
    'multiple_from' => '',
    'multiple_to' => '',
  );
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
    'to_do_list' => 'to_do_list',
  );

  /* Display: Page */
  $handler = $view->new_display('page', 'Page', 'page');
  $handler->display->display_options['path'] = 'to-do';

  /* Display: Block */
  $handler = $view->new_display('block', 'Block', 'block_1');
  $export['to_do'] = $view;

  return $export;
}
