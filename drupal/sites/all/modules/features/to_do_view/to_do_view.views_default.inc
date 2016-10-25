<?php
/**
 * @file
 * to_do_view.views_default.inc
 */

/**
 * Implements hook_views_default_views().
 */
function to_do_view_views_default_views() {
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
    53 => '53',
    9 => '9',
    12 => '12',
    11 => '11',
    17 => '17',
    65 => '65',
    16 => '16',
    19 => '19',
    8 => '8',
    23 => '23',
    24 => '24',
    6 => '6',
    10 => '10',
    15 => '15',
    18 => '18',
    62 => '62',
    78 => '78',
    25 => '25',
    80 => '80',
    81 => '81',
    64 => '64',
    83 => '83',
    63 => '63',
    84 => '84',
  );
  $handler->display->display_options['cache']['type'] = 'time';
  $handler->display->display_options['cache']['results_lifespan'] = '3600';
  $handler->display->display_options['cache']['results_lifespan_custom'] = '0';
  $handler->display->display_options['cache']['output_lifespan'] = '3600';
  $handler->display->display_options['cache']['output_lifespan_custom'] = '0';
  $handler->display->display_options['query']['type'] = 'views_query';
  $handler->display->display_options['exposed_form']['type'] = 'basic';
  $handler->display->display_options['exposed_form']['options']['autosubmit'] = TRUE;
  $handler->display->display_options['pager']['type'] = 'mini';
  $handler->display->display_options['pager']['options']['items_per_page'] = '3';
  $handler->display->display_options['pager']['options']['offset'] = '0';
  $handler->display->display_options['pager']['options']['id'] = '1';
  $handler->display->display_options['style_plugin'] = 'table';
  $handler->display->display_options['style_options']['columns'] = array(
    'counter' => 'counter',
    'field_todo_lst_item' => 'field_todo_lst_item',
    'field_todo_lst_domain' => 'field_todo_lst_domain',
    'field_todo_lst_due' => 'field_todo_lst_due',
    'field_todo_lst_facility_name' => 'field_todo_lst_facility_name',
    'field_todo_lst_activ_source_url' => 'field_todo_lst_activ_source_url',
    'field_todo_lst_date_type' => 'field_todo_lst_date_type',
    'field_todo_lst_part_code' => 'field_todo_lst_part_code',
    'field_todo_lst_part_name' => 'field_todo_lst_part_name',
    'field_todo_lst_sub_part_code' => 'field_todo_lst_sub_part_code',
    'field_todo_lst_sub_part_name' => 'field_todo_lst_sub_part_name',
    'field_todo_lst_facility_reg_id' => 'field_todo_lst_facility_reg_id',
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
    'field_todo_lst_facility_name' => array(
      'sortable' => 0,
      'default_sort_order' => 'asc',
      'align' => '',
      'separator' => '',
      'empty_column' => 0,
    ),
    'field_todo_lst_activ_source_url' => array(
      'sortable' => 0,
      'default_sort_order' => 'asc',
      'align' => '',
      'separator' => '',
      'empty_column' => 0,
    ),
    'field_todo_lst_date_type' => array(
      'sortable' => 0,
      'default_sort_order' => 'asc',
      'align' => '',
      'separator' => '',
      'empty_column' => 0,
    ),
    'field_todo_lst_part_code' => array(
      'sortable' => 0,
      'default_sort_order' => 'asc',
      'align' => '',
      'separator' => '',
      'empty_column' => 0,
    ),
    'field_todo_lst_part_name' => array(
      'sortable' => 0,
      'default_sort_order' => 'asc',
      'align' => '',
      'separator' => '',
      'empty_column' => 0,
    ),
    'field_todo_lst_sub_part_code' => array(
      'sortable' => 0,
      'default_sort_order' => 'asc',
      'align' => '',
      'separator' => '',
      'empty_column' => 0,
    ),
    'field_todo_lst_sub_part_name' => array(
      'sortable' => 0,
      'default_sort_order' => 'asc',
      'align' => '',
      'separator' => '',
      'empty_column' => 0,
    ),
    'field_todo_lst_facility_reg_id' => array(
      'sortable' => 0,
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
  $handler->display->display_options['fields']['field_todo_lst_domain']['type'] = 'text_default';
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
  /* Field: Content: Facility Name */
  $handler->display->display_options['fields']['field_todo_lst_facility_name']['id'] = 'field_todo_lst_facility_name';
  $handler->display->display_options['fields']['field_todo_lst_facility_name']['table'] = 'field_data_field_todo_lst_facility_name';
  $handler->display->display_options['fields']['field_todo_lst_facility_name']['field'] = 'field_todo_lst_facility_name';
  $handler->display->display_options['fields']['field_todo_lst_facility_name']['exclude'] = TRUE;
  $handler->display->display_options['fields']['field_todo_lst_facility_name']['element_label_colon'] = FALSE;
  /* Field: Content: Activity Source URL */
  $handler->display->display_options['fields']['field_todo_lst_activ_source_url']['id'] = 'field_todo_lst_activ_source_url';
  $handler->display->display_options['fields']['field_todo_lst_activ_source_url']['table'] = 'field_data_field_todo_lst_activ_source_url';
  $handler->display->display_options['fields']['field_todo_lst_activ_source_url']['field'] = 'field_todo_lst_activ_source_url';
  $handler->display->display_options['fields']['field_todo_lst_activ_source_url']['exclude'] = TRUE;
  $handler->display->display_options['fields']['field_todo_lst_activ_source_url']['element_label_colon'] = FALSE;
  /* Field: Content: Date Type */
  $handler->display->display_options['fields']['field_todo_lst_date_type']['id'] = 'field_todo_lst_date_type';
  $handler->display->display_options['fields']['field_todo_lst_date_type']['table'] = 'field_data_field_todo_lst_date_type';
  $handler->display->display_options['fields']['field_todo_lst_date_type']['field'] = 'field_todo_lst_date_type';
  $handler->display->display_options['fields']['field_todo_lst_date_type']['exclude'] = TRUE;
  $handler->display->display_options['fields']['field_todo_lst_date_type']['element_label_colon'] = FALSE;
  /* Field: Content: Part Code */
  $handler->display->display_options['fields']['field_todo_lst_part_code']['id'] = 'field_todo_lst_part_code';
  $handler->display->display_options['fields']['field_todo_lst_part_code']['table'] = 'field_data_field_todo_lst_part_code';
  $handler->display->display_options['fields']['field_todo_lst_part_code']['field'] = 'field_todo_lst_part_code';
  $handler->display->display_options['fields']['field_todo_lst_part_code']['exclude'] = TRUE;
  $handler->display->display_options['fields']['field_todo_lst_part_code']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['field_todo_lst_part_code']['type'] = 'text_default';
  /* Field: Content: Part Name */
  $handler->display->display_options['fields']['field_todo_lst_part_name']['id'] = 'field_todo_lst_part_name';
  $handler->display->display_options['fields']['field_todo_lst_part_name']['table'] = 'field_data_field_todo_lst_part_name';
  $handler->display->display_options['fields']['field_todo_lst_part_name']['field'] = 'field_todo_lst_part_name';
  $handler->display->display_options['fields']['field_todo_lst_part_name']['exclude'] = TRUE;
  $handler->display->display_options['fields']['field_todo_lst_part_name']['element_label_colon'] = FALSE;
  /* Field: Content: Subpart Code */
  $handler->display->display_options['fields']['field_todo_lst_sub_part_code']['id'] = 'field_todo_lst_sub_part_code';
  $handler->display->display_options['fields']['field_todo_lst_sub_part_code']['table'] = 'field_data_field_todo_lst_sub_part_code';
  $handler->display->display_options['fields']['field_todo_lst_sub_part_code']['field'] = 'field_todo_lst_sub_part_code';
  $handler->display->display_options['fields']['field_todo_lst_sub_part_code']['exclude'] = TRUE;
  $handler->display->display_options['fields']['field_todo_lst_sub_part_code']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['field_todo_lst_sub_part_code']['type'] = 'text_default';
  /* Field: Content: Subpart Name */
  $handler->display->display_options['fields']['field_todo_lst_sub_part_name']['id'] = 'field_todo_lst_sub_part_name';
  $handler->display->display_options['fields']['field_todo_lst_sub_part_name']['table'] = 'field_data_field_todo_lst_sub_part_name';
  $handler->display->display_options['fields']['field_todo_lst_sub_part_name']['field'] = 'field_todo_lst_sub_part_name';
  $handler->display->display_options['fields']['field_todo_lst_sub_part_name']['exclude'] = TRUE;
  $handler->display->display_options['fields']['field_todo_lst_sub_part_name']['element_label_colon'] = FALSE;
  /* Field: Content: Facility Registry ID */
  $handler->display->display_options['fields']['field_todo_lst_facility_reg_id']['id'] = 'field_todo_lst_facility_reg_id';
  $handler->display->display_options['fields']['field_todo_lst_facility_reg_id']['table'] = 'field_data_field_todo_lst_facility_reg_id';
  $handler->display->display_options['fields']['field_todo_lst_facility_reg_id']['field'] = 'field_todo_lst_facility_reg_id';
  $handler->display->display_options['fields']['field_todo_lst_facility_reg_id']['exclude'] = TRUE;
  $handler->display->display_options['fields']['field_todo_lst_facility_reg_id']['element_label_colon'] = FALSE;
  /* Sort criterion: Content: Post date */
  $handler->display->display_options['sorts']['created']['id'] = 'created';
  $handler->display->display_options['sorts']['created']['table'] = 'node';
  $handler->display->display_options['sorts']['created']['field'] = 'created';
  $handler->display->display_options['sorts']['created']['order'] = 'DESC';
  /* Sort criterion: Content: Item (field_todo_lst_item) */
  $handler->display->display_options['sorts']['field_todo_lst_item_value']['id'] = 'field_todo_lst_item_value';
  $handler->display->display_options['sorts']['field_todo_lst_item_value']['table'] = 'field_data_field_todo_lst_item';
  $handler->display->display_options['sorts']['field_todo_lst_item_value']['field'] = 'field_todo_lst_item_value';
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
  $handler->display->display_options['filters']['type']['group'] = 1;
  /* Filter criterion: Global: PHP */
  $handler->display->display_options['filters']['php']['id'] = 'php';
  $handler->display->display_options['filters']['php']['table'] = 'views';
  $handler->display->display_options['filters']['php']['field'] = 'php';
  $handler->display->display_options['filters']['php']['group'] = 1;
  $handler->display->display_options['filters']['php']['use_php_setup'] = 0;
  $handler->display->display_options['filters']['php']['php_filter'] = 'global $user;
$node = node_load($data->nid);
if(empty($node->field_todo_lst_created_by) || ($node->field_todo_lst_created_by[\'und\'][0][\'value\'] != $user->uid))
    return TRUE;
else if($node->field_todo_lst_created_by[\'und\'][0][\'value\'] == $user->uid)
    return FALSE;';
  /* Filter criterion: Content: Domain (field_todo_lst_domain) */
  $handler->display->display_options['filters']['field_todo_lst_domain_value']['id'] = 'field_todo_lst_domain_value';
  $handler->display->display_options['filters']['field_todo_lst_domain_value']['table'] = 'field_data_field_todo_lst_domain';
  $handler->display->display_options['filters']['field_todo_lst_domain_value']['field'] = 'field_todo_lst_domain_value';
  $handler->display->display_options['filters']['field_todo_lst_domain_value']['value'] = array(
    'CEDRI' => 'CEDRI',
  );
  $handler->display->display_options['filters']['field_todo_lst_domain_value']['group'] = 1;
  $handler->display->display_options['filters']['field_todo_lst_domain_value']['exposed'] = TRUE;
  $handler->display->display_options['filters']['field_todo_lst_domain_value']['expose']['operator_id'] = 'field_todo_lst_domain_value_op';
  $handler->display->display_options['filters']['field_todo_lst_domain_value']['expose']['label'] = 'Domain';
  $handler->display->display_options['filters']['field_todo_lst_domain_value']['expose']['operator'] = 'field_todo_lst_domain_value_op';
  $handler->display->display_options['filters']['field_todo_lst_domain_value']['expose']['identifier'] = 'field_todo_lst_domain_value';
  $handler->display->display_options['filters']['field_todo_lst_domain_value']['expose']['required'] = TRUE;
  $handler->display->display_options['filters']['field_todo_lst_domain_value']['expose']['remember_roles'] = array(
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
    14 => 0,
    15 => 0,
    18 => 0,
    16 => 0,
    17 => 0,
    19 => 0,
    20 => 0,
    23 => 0,
    24 => 0,
    25 => 0,
    26 => 0,
    27 => 0,
    28 => 0,
    29 => 0,
    30 => 0,
    31 => 0,
    32 => 0,
    33 => 0,
  );
  /* Filter criterion: Content: Due (field_todo_lst_due) */
  $handler->display->display_options['filters']['field_todo_lst_due_value']['id'] = 'field_todo_lst_due_value';
  $handler->display->display_options['filters']['field_todo_lst_due_value']['table'] = 'field_data_field_todo_lst_due';
  $handler->display->display_options['filters']['field_todo_lst_due_value']['field'] = 'field_todo_lst_due_value';
  $handler->display->display_options['filters']['field_todo_lst_due_value']['group'] = 1;
  $handler->display->display_options['filters']['field_todo_lst_due_value']['exposed'] = TRUE;
  $handler->display->display_options['filters']['field_todo_lst_due_value']['expose']['operator_id'] = 'field_todo_lst_due_value_op';
  $handler->display->display_options['filters']['field_todo_lst_due_value']['expose']['label'] = 'Due';
  $handler->display->display_options['filters']['field_todo_lst_due_value']['expose']['use_operator'] = TRUE;
  $handler->display->display_options['filters']['field_todo_lst_due_value']['expose']['operator'] = 'field_todo_lst_due_value_op';
  $handler->display->display_options['filters']['field_todo_lst_due_value']['expose']['identifier'] = 'field_todo_lst_due_value';
  $handler->display->display_options['filters']['field_todo_lst_due_value']['expose']['remember_roles'] = array(
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
    14 => 0,
    15 => 0,
    18 => 0,
    16 => 0,
    17 => 0,
    19 => 0,
    20 => 0,
    23 => 0,
    24 => 0,
    25 => 0,
    26 => 0,
    27 => 0,
    28 => 0,
    29 => 0,
    30 => 0,
    31 => 0,
    32 => 0,
    33 => 0,
  );
  /* Filter criterion: Content: Part Code (field_todo_lst_part_code) */
  $handler->display->display_options['filters']['field_todo_lst_part_code_value']['id'] = 'field_todo_lst_part_code_value';
  $handler->display->display_options['filters']['field_todo_lst_part_code_value']['table'] = 'field_data_field_todo_lst_part_code';
  $handler->display->display_options['filters']['field_todo_lst_part_code_value']['field'] = 'field_todo_lst_part_code_value';
  $handler->display->display_options['filters']['field_todo_lst_part_code_value']['group'] = 1;
  $handler->display->display_options['filters']['field_todo_lst_part_code_value']['exposed'] = TRUE;
  $handler->display->display_options['filters']['field_todo_lst_part_code_value']['expose']['operator_id'] = 'field_todo_lst_part_code_value_op';
  $handler->display->display_options['filters']['field_todo_lst_part_code_value']['expose']['label'] = 'Part Code';
  $handler->display->display_options['filters']['field_todo_lst_part_code_value']['expose']['operator'] = 'field_todo_lst_part_code_value_op';
  $handler->display->display_options['filters']['field_todo_lst_part_code_value']['expose']['identifier'] = 'field_todo_lst_part_code_value';
  $handler->display->display_options['filters']['field_todo_lst_part_code_value']['expose']['remember_roles'] = array(
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
    14 => 0,
    15 => 0,
    18 => 0,
    16 => 0,
    17 => 0,
    19 => 0,
    20 => 0,
    23 => 0,
    24 => 0,
    25 => 0,
    26 => 0,
    27 => 0,
    28 => 0,
    29 => 0,
    30 => 0,
    31 => 0,
    32 => 0,
    33 => 0,
  );
  /* Filter criterion: Content: Subpart Code (field_todo_lst_sub_part_code) */
  $handler->display->display_options['filters']['field_todo_lst_sub_part_code_value']['id'] = 'field_todo_lst_sub_part_code_value';
  $handler->display->display_options['filters']['field_todo_lst_sub_part_code_value']['table'] = 'field_data_field_todo_lst_sub_part_code';
  $handler->display->display_options['filters']['field_todo_lst_sub_part_code_value']['field'] = 'field_todo_lst_sub_part_code_value';
  $handler->display->display_options['filters']['field_todo_lst_sub_part_code_value']['group'] = 1;
  $handler->display->display_options['filters']['field_todo_lst_sub_part_code_value']['exposed'] = TRUE;
  $handler->display->display_options['filters']['field_todo_lst_sub_part_code_value']['expose']['operator_id'] = 'field_todo_lst_sub_part_code_value_op';
  $handler->display->display_options['filters']['field_todo_lst_sub_part_code_value']['expose']['label'] = 'Subpart Code';
  $handler->display->display_options['filters']['field_todo_lst_sub_part_code_value']['expose']['operator'] = 'field_todo_lst_sub_part_code_value_op';
  $handler->display->display_options['filters']['field_todo_lst_sub_part_code_value']['expose']['identifier'] = 'field_todo_lst_sub_part_code_value';
  $handler->display->display_options['filters']['field_todo_lst_sub_part_code_value']['expose']['remember_roles'] = array(
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
    14 => 0,
    15 => 0,
    18 => 0,
    16 => 0,
    17 => 0,
    19 => 0,
    20 => 0,
    23 => 0,
    24 => 0,
    25 => 0,
    26 => 0,
    27 => 0,
    28 => 0,
    29 => 0,
    30 => 0,
    31 => 0,
    32 => 0,
    33 => 0,
    53 => 0,
    54 => 0,
    55 => 0,
    56 => 0,
    57 => 0,
    58 => 0,
    59 => 0,
    60 => 0,
    61 => 0,
    62 => 0,
    63 => 0,
    64 => 0,
    65 => 0,
    66 => 0,
    67 => 0,
    68 => 0,
    69 => 0,
    70 => 0,
    71 => 0,
    72 => 0,
    73 => 0,
    74 => 0,
    75 => 0,
    76 => 0,
  );
  /* Filter criterion: Content: Report Type Filter (field_todo_lst_rprt_type_filter) */
  $handler->display->display_options['filters']['field_todo_lst_rprt_type_filter_value']['id'] = 'field_todo_lst_rprt_type_filter_value';
  $handler->display->display_options['filters']['field_todo_lst_rprt_type_filter_value']['table'] = 'field_data_field_todo_lst_rprt_type_filter';
  $handler->display->display_options['filters']['field_todo_lst_rprt_type_filter_value']['field'] = 'field_todo_lst_rprt_type_filter_value';
  $handler->display->display_options['filters']['field_todo_lst_rprt_type_filter_value']['group'] = 1;
  $handler->display->display_options['filters']['field_todo_lst_rprt_type_filter_value']['exposed'] = TRUE;
  $handler->display->display_options['filters']['field_todo_lst_rprt_type_filter_value']['expose']['operator_id'] = 'field_todo_lst_rprt_type_filter_value_op';
  $handler->display->display_options['filters']['field_todo_lst_rprt_type_filter_value']['expose']['label'] = 'Report Type';
  $handler->display->display_options['filters']['field_todo_lst_rprt_type_filter_value']['expose']['operator'] = 'field_todo_lst_rprt_type_filter_value_op';
  $handler->display->display_options['filters']['field_todo_lst_rprt_type_filter_value']['expose']['identifier'] = 'field_todo_lst_rprt_type_filter_value';
  $handler->display->display_options['filters']['field_todo_lst_rprt_type_filter_value']['expose']['remember_roles'] = array(
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
    14 => 0,
    15 => 0,
    18 => 0,
    16 => 0,
    17 => 0,
    19 => 0,
    20 => 0,
    23 => 0,
    24 => 0,
    25 => 0,
    26 => 0,
    27 => 0,
    28 => 0,
    29 => 0,
    30 => 0,
    31 => 0,
    32 => 0,
    33 => 0,
  );

  /* Display: Page */
  $handler = $view->new_display('page', 'Page', 'page');
  $handler->display->display_options['path'] = 'to-do';

  /* Display: Block */
  $handler = $view->new_display('block', 'Block', 'block_1');
  $export['to_do'] = $view;

  return $export;
}
