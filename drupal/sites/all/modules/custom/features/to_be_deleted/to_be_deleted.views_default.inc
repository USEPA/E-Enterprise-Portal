<?php
/**
 * @file
 * to_be_deleted.views_default.inc
 */

/**
 * Implements hook_views_default_views().
 */
function to_be_deleted_views_default_views() {
  $export = array();

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
  $handler->display->display_options['access']['type'] = 'role';
  $handler->display->display_options['access']['role'] = array(
    14 => '14',
    9 => '9',
    12 => '12',
    11 => '11',
    17 => '17',
    16 => '16',
    19 => '19',
    8 => '8',
    6 => '6',
    10 => '10',
    15 => '15',
    18 => '18',
  );
  $handler->display->display_options['cache']['type'] = 'none';
  $handler->display->display_options['query']['type'] = 'views_query';
  $handler->display->display_options['exposed_form']['type'] = 'basic';
  $handler->display->display_options['pager']['type'] = 'mini';
  $handler->display->display_options['pager']['options']['items_per_page'] = '3';
  $handler->display->display_options['pager']['options']['offset'] = '0';
  $handler->display->display_options['pager']['options']['id'] = '0';
  $handler->display->display_options['style_plugin'] = 'table';
  $handler->display->display_options['style_options']['columns'] = array(
    'counter' => 'counter',
    'field_todo_lst_item' => 'field_todo_lst_item',
    'field_todo_lst_domain' => 'field_todo_lst_domain',
    'field_todo_lst_due' => 'field_todo_lst_due',
  );
  $handler->display->display_options['style_options']['default'] = 'field_todo_lst_due';
  $handler->display->display_options['style_options']['info'] = array(
    'counter' => array(
      'align' => '',
      'separator' => '',
      'empty_column' => 0,
    ),
    'field_todo_lst_item' => array(
      'sortable' => 1,
      'default_sort_order' => 'asc',
      'align' => '',
      'separator' => '',
      'empty_column' => 0,
    ),
    'field_todo_lst_domain' => array(
      'sortable' => 1,
      'default_sort_order' => 'asc',
      'align' => '',
      'separator' => '',
      'empty_column' => 0,
    ),
    'field_todo_lst_due' => array(
      'sortable' => 1,
      'default_sort_order' => 'asc',
      'align' => '',
      'separator' => '',
      'empty_column' => 0,
    ),
  );
  /* No results behavior: Global: Text area */
  $handler->display->display_options['empty']['area']['id'] = 'area';
  $handler->display->display_options['empty']['area']['table'] = 'views';
  $handler->display->display_options['empty']['area']['field'] = 'area';
  $handler->display->display_options['empty']['area']['empty'] = TRUE;
  $handler->display->display_options['empty']['area']['content'] = 'You have no tasks at this time.';
  $handler->display->display_options['empty']['area']['format'] = 'full_html';
  /* Field: Global: View result counter */
  $handler->display->display_options['fields']['counter']['id'] = 'counter';
  $handler->display->display_options['fields']['counter']['table'] = 'views';
  $handler->display->display_options['fields']['counter']['field'] = 'counter';
  $handler->display->display_options['fields']['counter']['label'] = '#';
  $handler->display->display_options['fields']['counter']['counter_start'] = '1';
  $handler->display->display_options['fields']['counter']['reverse'] = 0;
  /* Field: Content: Item */
  $handler->display->display_options['fields']['field_todo_lst_item']['id'] = 'field_todo_lst_item';
  $handler->display->display_options['fields']['field_todo_lst_item']['table'] = 'field_data_field_todo_lst_item';
  $handler->display->display_options['fields']['field_todo_lst_item']['field'] = 'field_todo_lst_item';
  /* Field: Content: Domain */
  $handler->display->display_options['fields']['field_todo_lst_domain']['id'] = 'field_todo_lst_domain';
  $handler->display->display_options['fields']['field_todo_lst_domain']['table'] = 'field_data_field_todo_lst_domain';
  $handler->display->display_options['fields']['field_todo_lst_domain']['field'] = 'field_todo_lst_domain';
  /* Field: Content: Due */
  $handler->display->display_options['fields']['field_todo_lst_due']['id'] = 'field_todo_lst_due';
  $handler->display->display_options['fields']['field_todo_lst_due']['table'] = 'field_data_field_todo_lst_due';
  $handler->display->display_options['fields']['field_todo_lst_due']['field'] = 'field_todo_lst_due';
  $handler->display->display_options['fields']['field_todo_lst_due']['settings'] = array(
    'format_type' => 'shorttime',
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
  /* Filter criterion: Global: PHP */
  $handler->display->display_options['filters']['php']['id'] = 'php';
  $handler->display->display_options['filters']['php']['table'] = 'views';
  $handler->display->display_options['filters']['php']['field'] = 'php';
  $handler->display->display_options['filters']['php']['use_php_setup'] = 0;
  $handler->display->display_options['filters']['php']['php_filter'] = 'global $user;
$node = node_load($data->nid);
if(empty($node->field_todo_lst_created_by) || ($node->field_todo_lst_created_by[\'und\'][0][\'value\'] != $user->uid))
    return TRUE;
else if($node->field_todo_lst_created_by[\'und\'][0][\'value\'] == $user->uid)
    return FALSE;';

  /* Display: Page */
  $handler = $view->new_display('page', 'Page', 'page');
  $handler->display->display_options['path'] = 'to-do';

  /* Display: Block */
  $handler = $view->new_display('block', 'Block', 'block_1');
  $export['to_do'] = $view;

  return $export;
}
