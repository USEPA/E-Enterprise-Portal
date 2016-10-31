<?php
/**
 * @file
 * progress_tracker_view.views_default.inc
 */

/**
 * Implements hook_views_default_views().
 */
function progress_tracker_view_views_default_views() {
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
  $handler->display->display_options['pager']['options']['id'] = '0';
  $handler->display->display_options['style_plugin'] = 'table';
  $handler->display->display_options['style_options']['columns'] = array(
    'counter' => 'counter',
    'field_prog_tracker_app' => 'field_prog_tracker_app',
    'field_prog_track_domain' => 'field_prog_track_domain',
    'field_prog_track_status' => 'field_prog_track_status',
    'field_prog_track_updated' => 'field_prog_track_updated',
    'field_prog_track_actions_link' => 'field_prog_track_actions_link',
    'field_prog_track_date_type' => 'field_prog_track_date_type',
    'field_prog_track_item_desc' => 'field_prog_track_item_desc',
    'field_prog_track_item_details' => 'field_prog_track_item_details',
    'field_prog_track_facility_name' => 'field_prog_track_facility_name',
    'field_prog_track_actions_dnload' => 'field_prog_track_actions_dnload',
    'field_prog_track_facility_reg_id' => 'field_prog_track_facility_reg_id',
    'field_prog_track_part_code' => 'field_prog_track_part_code',
    'field_prog_track_part_name' => 'field_prog_track_part_name',
    'field_prog_track_sub_part_code' => 'field_prog_track_sub_part_code',
    'field_prog_track_sub_part_name' => 'field_prog_track_sub_part_name',
    'field_prog_track_status_note' => 'field_prog_track_status_note',
  );
  $handler->display->display_options['style_options']['default'] = 'field_prog_track_updated';
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
      'sortable' => 1,
      'default_sort_order' => 'asc',
      'align' => '',
      'separator' => '',
      'empty_column' => 0,
    ),
    'field_prog_track_status' => array(
      'sortable' => 1,
      'default_sort_order' => 'asc',
      'align' => '',
      'separator' => '',
      'empty_column' => 0,
    ),
    'field_prog_track_updated' => array(
      'sortable' => 1,
      'default_sort_order' => 'asc',
      'align' => '',
      'separator' => '',
      'empty_column' => 0,
    ),
    'field_prog_track_actions_link' => array(
      'sortable' => 0,
      'default_sort_order' => 'asc',
      'align' => '',
      'separator' => '',
      'empty_column' => 0,
    ),
    'field_prog_track_date_type' => array(
      'sortable' => 0,
      'default_sort_order' => 'asc',
      'align' => '',
      'separator' => '',
      'empty_column' => 0,
    ),
    'field_prog_track_item_desc' => array(
      'sortable' => 0,
      'default_sort_order' => 'asc',
      'align' => '',
      'separator' => '',
      'empty_column' => 0,
    ),
    'field_prog_track_item_details' => array(
      'sortable' => 0,
      'default_sort_order' => 'asc',
      'align' => '',
      'separator' => '',
      'empty_column' => 0,
    ),
    'field_prog_track_facility_name' => array(
      'sortable' => 0,
      'default_sort_order' => 'asc',
      'align' => '',
      'separator' => '',
      'empty_column' => 0,
    ),
    'field_prog_track_actions_dnload' => array(
      'sortable' => 0,
      'default_sort_order' => 'asc',
      'align' => '',
      'separator' => '',
      'empty_column' => 0,
    ),
    'field_prog_track_facility_reg_id' => array(
      'sortable' => 0,
      'default_sort_order' => 'asc',
      'align' => '',
      'separator' => '',
      'empty_column' => 0,
    ),
    'field_prog_track_part_code' => array(
      'sortable' => 0,
      'default_sort_order' => 'asc',
      'align' => '',
      'separator' => '',
      'empty_column' => 0,
    ),
    'field_prog_track_part_name' => array(
      'sortable' => 0,
      'default_sort_order' => 'asc',
      'align' => '',
      'separator' => '',
      'empty_column' => 0,
    ),
    'field_prog_track_sub_part_code' => array(
      'sortable' => 0,
      'default_sort_order' => 'asc',
      'align' => '',
      'separator' => '',
      'empty_column' => 0,
    ),
    'field_prog_track_sub_part_name' => array(
      'sortable' => 0,
      'default_sort_order' => 'asc',
      'align' => '',
      'separator' => '',
      'empty_column' => 0,
    ),
    'field_prog_track_status_note' => array(
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
  $handler->display->display_options['empty']['area']['content'] = 'You have no items in progress at this time.';
  $handler->display->display_options['empty']['area']['format'] = 'full_html';
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
  $handler->display->display_options['fields']['field_prog_track_actions_link']['id'] = 'field_prog_track_actions_link';
  $handler->display->display_options['fields']['field_prog_track_actions_link']['table'] = 'field_data_field_prog_track_actions_link';
  $handler->display->display_options['fields']['field_prog_track_actions_link']['field'] = 'field_prog_track_actions_link';
  $handler->display->display_options['fields']['field_prog_track_actions_link']['exclude'] = TRUE;
  $handler->display->display_options['fields']['field_prog_track_actions_link']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['field_prog_track_actions_link']['settings'] = array(
    'trim_length' => '80',
    'nofollow' => 0,
  );
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
  /* Field: Content: Facility Name */
  $handler->display->display_options['fields']['field_prog_track_facility_name']['id'] = 'field_prog_track_facility_name';
  $handler->display->display_options['fields']['field_prog_track_facility_name']['table'] = 'field_data_field_prog_track_facility_name';
  $handler->display->display_options['fields']['field_prog_track_facility_name']['field'] = 'field_prog_track_facility_name';
  $handler->display->display_options['fields']['field_prog_track_facility_name']['exclude'] = TRUE;
  $handler->display->display_options['fields']['field_prog_track_facility_name']['element_label_colon'] = FALSE;
  /* Field: Content: Actions */
  $handler->display->display_options['fields']['field_prog_track_actions_dnload']['id'] = 'field_prog_track_actions_dnload';
  $handler->display->display_options['fields']['field_prog_track_actions_dnload']['table'] = 'field_data_field_prog_track_actions_dnload';
  $handler->display->display_options['fields']['field_prog_track_actions_dnload']['field'] = 'field_prog_track_actions_dnload';
  /* Field: Content: Facility Registry ID */
  $handler->display->display_options['fields']['field_prog_track_facility_reg_id']['id'] = 'field_prog_track_facility_reg_id';
  $handler->display->display_options['fields']['field_prog_track_facility_reg_id']['table'] = 'field_data_field_prog_track_facility_reg_id';
  $handler->display->display_options['fields']['field_prog_track_facility_reg_id']['field'] = 'field_prog_track_facility_reg_id';
  $handler->display->display_options['fields']['field_prog_track_facility_reg_id']['exclude'] = TRUE;
  $handler->display->display_options['fields']['field_prog_track_facility_reg_id']['element_label_colon'] = FALSE;
  /* Field: Content: Part Code */
  $handler->display->display_options['fields']['field_prog_track_part_code']['id'] = 'field_prog_track_part_code';
  $handler->display->display_options['fields']['field_prog_track_part_code']['table'] = 'field_data_field_prog_track_part_code';
  $handler->display->display_options['fields']['field_prog_track_part_code']['field'] = 'field_prog_track_part_code';
  $handler->display->display_options['fields']['field_prog_track_part_code']['exclude'] = TRUE;
  $handler->display->display_options['fields']['field_prog_track_part_code']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['field_prog_track_part_code']['type'] = 'text_default';
  /* Field: Content: Part Name */
  $handler->display->display_options['fields']['field_prog_track_part_name']['id'] = 'field_prog_track_part_name';
  $handler->display->display_options['fields']['field_prog_track_part_name']['table'] = 'field_data_field_prog_track_part_name';
  $handler->display->display_options['fields']['field_prog_track_part_name']['field'] = 'field_prog_track_part_name';
  $handler->display->display_options['fields']['field_prog_track_part_name']['exclude'] = TRUE;
  $handler->display->display_options['fields']['field_prog_track_part_name']['element_label_colon'] = FALSE;
  /* Field: Content: Subpart Code */
  $handler->display->display_options['fields']['field_prog_track_sub_part_code']['id'] = 'field_prog_track_sub_part_code';
  $handler->display->display_options['fields']['field_prog_track_sub_part_code']['table'] = 'field_data_field_prog_track_sub_part_code';
  $handler->display->display_options['fields']['field_prog_track_sub_part_code']['field'] = 'field_prog_track_sub_part_code';
  $handler->display->display_options['fields']['field_prog_track_sub_part_code']['exclude'] = TRUE;
  $handler->display->display_options['fields']['field_prog_track_sub_part_code']['element_label_colon'] = FALSE;
  /* Field: Content: Sub Part Name */
  $handler->display->display_options['fields']['field_prog_track_sub_part_name']['id'] = 'field_prog_track_sub_part_name';
  $handler->display->display_options['fields']['field_prog_track_sub_part_name']['table'] = 'field_data_field_prog_track_sub_part_name';
  $handler->display->display_options['fields']['field_prog_track_sub_part_name']['field'] = 'field_prog_track_sub_part_name';
  $handler->display->display_options['fields']['field_prog_track_sub_part_name']['label'] = 'Subpart Name';
  $handler->display->display_options['fields']['field_prog_track_sub_part_name']['exclude'] = TRUE;
  $handler->display->display_options['fields']['field_prog_track_sub_part_name']['element_label_colon'] = FALSE;
  /* Field: Content: Status Note */
  $handler->display->display_options['fields']['field_prog_track_status_note']['id'] = 'field_prog_track_status_note';
  $handler->display->display_options['fields']['field_prog_track_status_note']['table'] = 'field_data_field_prog_track_status_note';
  $handler->display->display_options['fields']['field_prog_track_status_note']['field'] = 'field_prog_track_status_note';
  $handler->display->display_options['fields']['field_prog_track_status_note']['exclude'] = TRUE;
  $handler->display->display_options['fields']['field_prog_track_status_note']['element_label_colon'] = FALSE;
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
  $handler->display->display_options['filters']['type']['group'] = 1;
  /* Filter criterion: Content: Domain (field_prog_track_domain) */
  $handler->display->display_options['filters']['field_prog_track_domain_value']['id'] = 'field_prog_track_domain_value';
  $handler->display->display_options['filters']['field_prog_track_domain_value']['table'] = 'field_data_field_prog_track_domain';
  $handler->display->display_options['filters']['field_prog_track_domain_value']['field'] = 'field_prog_track_domain_value';
  $handler->display->display_options['filters']['field_prog_track_domain_value']['group'] = 1;
  $handler->display->display_options['filters']['field_prog_track_domain_value']['exposed'] = TRUE;
  $handler->display->display_options['filters']['field_prog_track_domain_value']['expose']['operator_id'] = 'field_prog_track_domain_value_op';
  $handler->display->display_options['filters']['field_prog_track_domain_value']['expose']['label'] = 'Domain';
  $handler->display->display_options['filters']['field_prog_track_domain_value']['expose']['operator'] = 'field_prog_track_domain_value_op';
  $handler->display->display_options['filters']['field_prog_track_domain_value']['expose']['identifier'] = 'field_prog_track_domain_value';
  $handler->display->display_options['filters']['field_prog_track_domain_value']['expose']['remember_roles'] = array(
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
  );
  /* Filter criterion: Global: PHP */
  $handler->display->display_options['filters']['php']['id'] = 'php';
  $handler->display->display_options['filters']['php']['table'] = 'views';
  $handler->display->display_options['filters']['php']['field'] = 'php';
  $handler->display->display_options['filters']['php']['group'] = 1;
  $handler->display->display_options['filters']['php']['use_php_setup'] = 0;
  $handler->display->display_options['filters']['php']['php_filter'] = 'global $user;
if($user->uid == 1)
    return FALSE;
$node = node_load($data->nid);
if(empty($node->field_prog_track_created_by) || ($node->field_prog_track_created_by[\'und\'][0][\'value\'] != $user->uid))
    return TRUE;
else if($node->field_prog_track_created_by[\'und\'][0][\'value\'] == $user->uid)
    return FALSE;';
  /* Filter criterion: Content: Part Code (field_prog_track_part_code) */
  $handler->display->display_options['filters']['field_prog_track_part_code_value']['id'] = 'field_prog_track_part_code_value';
  $handler->display->display_options['filters']['field_prog_track_part_code_value']['table'] = 'field_data_field_prog_track_part_code';
  $handler->display->display_options['filters']['field_prog_track_part_code_value']['field'] = 'field_prog_track_part_code_value';
  $handler->display->display_options['filters']['field_prog_track_part_code_value']['group'] = 1;
  $handler->display->display_options['filters']['field_prog_track_part_code_value']['exposed'] = TRUE;
  $handler->display->display_options['filters']['field_prog_track_part_code_value']['expose']['operator_id'] = 'field_prog_track_part_code_value_op';
  $handler->display->display_options['filters']['field_prog_track_part_code_value']['expose']['label'] = 'Part Code';
  $handler->display->display_options['filters']['field_prog_track_part_code_value']['expose']['operator'] = 'field_prog_track_part_code_value_op';
  $handler->display->display_options['filters']['field_prog_track_part_code_value']['expose']['identifier'] = 'field_prog_track_part_code_value';
  $handler->display->display_options['filters']['field_prog_track_part_code_value']['expose']['remember_roles'] = array(
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
  );
  /* Filter criterion: Content: Subpart Code (field_prog_track_sub_part_code) */
  $handler->display->display_options['filters']['field_prog_track_sub_part_code_value']['id'] = 'field_prog_track_sub_part_code_value';
  $handler->display->display_options['filters']['field_prog_track_sub_part_code_value']['table'] = 'field_data_field_prog_track_sub_part_code';
  $handler->display->display_options['filters']['field_prog_track_sub_part_code_value']['field'] = 'field_prog_track_sub_part_code_value';
  $handler->display->display_options['filters']['field_prog_track_sub_part_code_value']['group'] = 1;
  $handler->display->display_options['filters']['field_prog_track_sub_part_code_value']['exposed'] = TRUE;
  $handler->display->display_options['filters']['field_prog_track_sub_part_code_value']['expose']['operator_id'] = 'field_prog_track_sub_part_code_value_op';
  $handler->display->display_options['filters']['field_prog_track_sub_part_code_value']['expose']['label'] = 'Subpart Code';
  $handler->display->display_options['filters']['field_prog_track_sub_part_code_value']['expose']['operator'] = 'field_prog_track_sub_part_code_value_op';
  $handler->display->display_options['filters']['field_prog_track_sub_part_code_value']['expose']['identifier'] = 'field_prog_track_sub_part_code_value';
  $handler->display->display_options['filters']['field_prog_track_sub_part_code_value']['expose']['remember_roles'] = array(
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
  /* Filter criterion: Content: Report Type Filter (field_prog_track_rep_type_filter) */
  $handler->display->display_options['filters']['field_prog_track_rep_type_filter_value']['id'] = 'field_prog_track_rep_type_filter_value';
  $handler->display->display_options['filters']['field_prog_track_rep_type_filter_value']['table'] = 'field_data_field_prog_track_rep_type_filter';
  $handler->display->display_options['filters']['field_prog_track_rep_type_filter_value']['field'] = 'field_prog_track_rep_type_filter_value';
  $handler->display->display_options['filters']['field_prog_track_rep_type_filter_value']['group'] = 1;
  $handler->display->display_options['filters']['field_prog_track_rep_type_filter_value']['exposed'] = TRUE;
  $handler->display->display_options['filters']['field_prog_track_rep_type_filter_value']['expose']['operator_id'] = 'field_prog_track_rep_type_filter_value_op';
  $handler->display->display_options['filters']['field_prog_track_rep_type_filter_value']['expose']['label'] = 'Report Type';
  $handler->display->display_options['filters']['field_prog_track_rep_type_filter_value']['expose']['operator'] = 'field_prog_track_rep_type_filter_value_op';
  $handler->display->display_options['filters']['field_prog_track_rep_type_filter_value']['expose']['identifier'] = 'field_prog_track_rep_type_filter_value';
  $handler->display->display_options['filters']['field_prog_track_rep_type_filter_value']['expose']['remember_roles'] = array(
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
  );

  /* Display: Page */
  $handler = $view->new_display('page', 'Page', 'page');
  $handler->display->display_options['path'] = 'progress-tracker';

  /* Display: Block */
  $handler = $view->new_display('block', 'Block', 'block_1');
  $export['progress_tracker'] = $view;

  return $export;
}
