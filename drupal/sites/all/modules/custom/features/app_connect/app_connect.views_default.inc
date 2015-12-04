<?php
/**
 * @file
 * app_connect.views_default.inc
 */

/**
 * Implements hook_views_default_views().
 */
function app_connect_views_default_views() {
  $export = array();

  $view = new view();
  $view->name = 'app_connect';
  $view->description = '';
  $view->tag = 'default';
  $view->base_table = 'node';
  $view->human_name = 'App Connect';
  $view->core = 7;
  $view->api_version = '3.0';
  $view->disabled = FALSE; /* Edit this to true to make a default view disabled initially */

  /* Display: Master */
  $handler = $view->new_display('default', 'Master', 'default');
  $handler->display->display_options['title'] = 'App Connect';
  $handler->display->display_options['use_more_always'] = FALSE;
  $handler->display->display_options['access']['type'] = 'perm';
  $handler->display->display_options['cache']['type'] = 'none';
  $handler->display->display_options['query']['type'] = 'views_query';
  $handler->display->display_options['exposed_form']['type'] = 'basic';
  $handler->display->display_options['pager']['type'] = 'full';
  $handler->display->display_options['pager']['options']['items_per_page'] = '10';
  $handler->display->display_options['style_plugin'] = 'table';
  $handler->display->display_options['style_options']['columns'] = array(
    'field_ee_program_service_url_1' => 'field_ee_program_service_url_1',
    'title' => 'title',
    'field_ee_program_service_url' => 'field_ee_program_service_url',
    'field_ee_program_service_domain' => 'field_ee_program_service_domain',
    'field_ee_program_service_status' => 'field_ee_program_service_status',
    'field_ee_program_service_role' => 'field_ee_program_service_role',
  );
  $handler->display->display_options['style_options']['default'] = '-1';
  $handler->display->display_options['style_options']['info'] = array(
    'field_ee_program_service_url_1' => array(
      'sortable' => 0,
      'default_sort_order' => 'asc',
      'align' => '',
      'separator' => '',
      'empty_column' => 0,
    ),
    'title' => array(
      'sortable' => 1,
      'default_sort_order' => 'asc',
      'align' => '',
      'separator' => '',
      'empty_column' => 0,
    ),
    'field_ee_program_service_url' => array(
      'sortable' => 0,
      'default_sort_order' => 'asc',
      'align' => '',
      'separator' => '',
      'empty_column' => 0,
    ),
    'field_ee_program_service_domain' => array(
      'sortable' => 0,
      'default_sort_order' => 'asc',
      'align' => '',
      'separator' => '',
      'empty_column' => 0,
    ),
    'field_ee_program_service_status' => array(
      'sortable' => 0,
      'default_sort_order' => 'asc',
      'align' => '',
      'separator' => '',
      'empty_column' => 0,
    ),
    'field_ee_program_service_role' => array(
      'sortable' => 1,
      'default_sort_order' => 'asc',
      'align' => '',
      'separator' => '',
      'empty_column' => 0,
    ),
  );
  /* Header: Global: Text area */
  $handler->display->display_options['header']['area']['id'] = 'area';
  $handler->display->display_options['header']['area']['table'] = 'views';
  $handler->display->display_options['header']['area']['field'] = 'area';
  /* Field: Content: Program Service URL */
  $handler->display->display_options['fields']['field_ee_program_service_url_1']['id'] = 'field_ee_program_service_url_1';
  $handler->display->display_options['fields']['field_ee_program_service_url_1']['table'] = 'field_data_field_ee_program_service_url';
  $handler->display->display_options['fields']['field_ee_program_service_url_1']['field'] = 'field_ee_program_service_url';
  $handler->display->display_options['fields']['field_ee_program_service_url_1']['label'] = '';
  $handler->display->display_options['fields']['field_ee_program_service_url_1']['exclude'] = TRUE;
  $handler->display->display_options['fields']['field_ee_program_service_url_1']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['field_ee_program_service_url_1']['settings'] = array(
    'trim_length' => '80',
    'nofollow' => 0,
  );
  /* Field: Content: Title */
  $handler->display->display_options['fields']['title']['id'] = 'title';
  $handler->display->display_options['fields']['title']['table'] = 'node';
  $handler->display->display_options['fields']['title']['field'] = 'title';
  $handler->display->display_options['fields']['title']['alter']['alter_text'] = TRUE;
  $handler->display->display_options['fields']['title']['alter']['text'] = '<p class="mapset-title"><a href="[field_ee_map_set_url_1]">[title]</a></p><p class="mapset-description">[field_ee_map_set_description]</p>';
  $handler->display->display_options['fields']['title']['link_to_node'] = FALSE;
  /* Field: Content: Program Service Status */
  $handler->display->display_options['fields']['field_ee_program_service_status']['id'] = 'field_ee_program_service_status';
  $handler->display->display_options['fields']['field_ee_program_service_status']['table'] = 'field_data_field_ee_program_service_status';
  $handler->display->display_options['fields']['field_ee_program_service_status']['field'] = 'field_ee_program_service_status';
  $handler->display->display_options['fields']['field_ee_program_service_status']['label'] = '';
  $handler->display->display_options['fields']['field_ee_program_service_status']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['field_ee_program_service_status']['type'] = 'taxonomy_term_reference_plain';
  /* Field: Content: Program Service URL */
  $handler->display->display_options['fields']['field_ee_program_service_url']['id'] = 'field_ee_program_service_url';
  $handler->display->display_options['fields']['field_ee_program_service_url']['table'] = 'field_data_field_ee_program_service_url';
  $handler->display->display_options['fields']['field_ee_program_service_url']['field'] = 'field_ee_program_service_url';
  $handler->display->display_options['fields']['field_ee_program_service_url']['label'] = '';
  $handler->display->display_options['fields']['field_ee_program_service_url']['exclude'] = TRUE;
  $handler->display->display_options['fields']['field_ee_program_service_url']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['field_ee_program_service_url']['settings'] = array(
    'trim_length' => '80',
    'nofollow' => 0,
  );
  /* Field: Content: Role */
  $handler->display->display_options['fields']['field_ee_program_service_role']['id'] = 'field_ee_program_service_role';
  $handler->display->display_options['fields']['field_ee_program_service_role']['table'] = 'field_data_field_ee_program_service_role';
  $handler->display->display_options['fields']['field_ee_program_service_role']['field'] = 'field_ee_program_service_role';
  $handler->display->display_options['fields']['field_ee_program_service_role']['label'] = '';
  $handler->display->display_options['fields']['field_ee_program_service_role']['alter']['alter_text'] = TRUE;
  $handler->display->display_options['fields']['field_ee_program_service_role']['alter']['text'] = '[field_ee_program_service_role]';
  $handler->display->display_options['fields']['field_ee_program_service_role']['alter']['make_link'] = TRUE;
  $handler->display->display_options['fields']['field_ee_program_service_role']['alter']['path'] = '[field_ee_program_service_url]';
  $handler->display->display_options['fields']['field_ee_program_service_role']['alter']['rel'] = 'external';
  $handler->display->display_options['fields']['field_ee_program_service_role']['element_label_colon'] = FALSE;
  /* Field: Content: Program Service Domain */
  $handler->display->display_options['fields']['field_ee_program_service_domain']['id'] = 'field_ee_program_service_domain';
  $handler->display->display_options['fields']['field_ee_program_service_domain']['table'] = 'field_data_field_ee_program_service_domain';
  $handler->display->display_options['fields']['field_ee_program_service_domain']['field'] = 'field_ee_program_service_domain';
  $handler->display->display_options['fields']['field_ee_program_service_domain']['label'] = '';
  $handler->display->display_options['fields']['field_ee_program_service_domain']['exclude'] = TRUE;
  $handler->display->display_options['fields']['field_ee_program_service_domain']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['field_ee_program_service_domain']['type'] = 'taxonomy_term_reference_plain';
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
    'ee_program_service' => 'ee_program_service',
  );
  /* Filter criterion: Content: Program Service Domain (field_ee_program_service_domain) */
  $handler->display->display_options['filters']['field_ee_program_service_domain_tid']['id'] = 'field_ee_program_service_domain_tid';
  $handler->display->display_options['filters']['field_ee_program_service_domain_tid']['table'] = 'field_data_field_ee_program_service_domain';
  $handler->display->display_options['filters']['field_ee_program_service_domain_tid']['field'] = 'field_ee_program_service_domain_tid';
  $handler->display->display_options['filters']['field_ee_program_service_domain_tid']['value'] = array(
    172786 => '172786',
  );
  $handler->display->display_options['filters']['field_ee_program_service_domain_tid']['type'] = 'select';
  $handler->display->display_options['filters']['field_ee_program_service_domain_tid']['vocabulary'] = 'ee_partner_domain';

  /* Display: App Connect Page */
  $handler = $view->new_display('page', 'App Connect Page', 'page');
  $handler->display->display_options['defaults']['header'] = FALSE;
  /* Header: Global: Text area */
  $handler->display->display_options['header']['area']['id'] = 'area';
  $handler->display->display_options['header']['area']['table'] = 'views';
  $handler->display->display_options['header']['area']['field'] = 'area';
  $handler->display->display_options['header']['area']['content'] = '<a id="manage-services" class="button btn-medium" href="https://dev.epacdx.net/ProgramServices" rel="external" target="_blank">Manage program services</a>';
  $handler->display->display_options['header']['area']['format'] = 'full_html';
  $handler->display->display_options['defaults']['fields'] = FALSE;
  /* Field: Content: Program Service URL */
  $handler->display->display_options['fields']['field_ee_program_service_url_1']['id'] = 'field_ee_program_service_url_1';
  $handler->display->display_options['fields']['field_ee_program_service_url_1']['table'] = 'field_data_field_ee_program_service_url';
  $handler->display->display_options['fields']['field_ee_program_service_url_1']['field'] = 'field_ee_program_service_url';
  $handler->display->display_options['fields']['field_ee_program_service_url_1']['label'] = '';
  $handler->display->display_options['fields']['field_ee_program_service_url_1']['exclude'] = TRUE;
  $handler->display->display_options['fields']['field_ee_program_service_url_1']['alter']['strip_tags'] = TRUE;
  $handler->display->display_options['fields']['field_ee_program_service_url_1']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['field_ee_program_service_url_1']['settings'] = array(
    'trim_length' => '80',
    'nofollow' => 0,
  );
  /* Field: Content: Title */
  $handler->display->display_options['fields']['title']['id'] = 'title';
  $handler->display->display_options['fields']['title']['table'] = 'node';
  $handler->display->display_options['fields']['title']['field'] = 'title';
  $handler->display->display_options['fields']['title']['alter']['alter_text'] = TRUE;
  $handler->display->display_options['fields']['title']['alter']['text'] = '<a href="[field_ee_program_service_url_1]">[title]</a>';
  $handler->display->display_options['fields']['title']['link_to_node'] = FALSE;
  /* Field: Content: Program Service URL */
  $handler->display->display_options['fields']['field_ee_program_service_url']['id'] = 'field_ee_program_service_url';
  $handler->display->display_options['fields']['field_ee_program_service_url']['table'] = 'field_data_field_ee_program_service_url';
  $handler->display->display_options['fields']['field_ee_program_service_url']['field'] = 'field_ee_program_service_url';
  $handler->display->display_options['fields']['field_ee_program_service_url']['label'] = '';
  $handler->display->display_options['fields']['field_ee_program_service_url']['exclude'] = TRUE;
  $handler->display->display_options['fields']['field_ee_program_service_url']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['field_ee_program_service_url']['settings'] = array(
    'trim_length' => '80',
    'nofollow' => 0,
  );
  /* Field: Content: Program Service Domain */
  $handler->display->display_options['fields']['field_ee_program_service_domain']['id'] = 'field_ee_program_service_domain';
  $handler->display->display_options['fields']['field_ee_program_service_domain']['table'] = 'field_data_field_ee_program_service_domain';
  $handler->display->display_options['fields']['field_ee_program_service_domain']['field'] = 'field_ee_program_service_domain';
  $handler->display->display_options['fields']['field_ee_program_service_domain']['label'] = '';
  $handler->display->display_options['fields']['field_ee_program_service_domain']['exclude'] = TRUE;
  $handler->display->display_options['fields']['field_ee_program_service_domain']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['field_ee_program_service_domain']['type'] = 'taxonomy_term_reference_plain';
  /* Field: Content: Program Service Status */
  $handler->display->display_options['fields']['field_ee_program_service_status']['id'] = 'field_ee_program_service_status';
  $handler->display->display_options['fields']['field_ee_program_service_status']['table'] = 'field_data_field_ee_program_service_status';
  $handler->display->display_options['fields']['field_ee_program_service_status']['field'] = 'field_ee_program_service_status';
  $handler->display->display_options['fields']['field_ee_program_service_status']['label'] = 'Status';
  $handler->display->display_options['fields']['field_ee_program_service_status']['type'] = 'taxonomy_term_reference_plain';
  /* Field: Content: Role */
  $handler->display->display_options['fields']['field_ee_program_service_role']['id'] = 'field_ee_program_service_role';
  $handler->display->display_options['fields']['field_ee_program_service_role']['table'] = 'field_data_field_ee_program_service_role';
  $handler->display->display_options['fields']['field_ee_program_service_role']['field'] = 'field_ee_program_service_role';
  $handler->display->display_options['fields']['field_ee_program_service_role']['alter']['alter_text'] = TRUE;
  $handler->display->display_options['fields']['field_ee_program_service_role']['alter']['text'] = '[field_ee_program_service_role]';
  $handler->display->display_options['fields']['field_ee_program_service_role']['alter']['make_link'] = TRUE;
  $handler->display->display_options['fields']['field_ee_program_service_role']['alter']['path'] = '[field_ee_program_service_url_1]';
  $handler->display->display_options['fields']['field_ee_program_service_role']['alter']['rel'] = 'external';
  $handler->display->display_options['path'] = 'app-connect';
  $handler->display->display_options['menu']['type'] = 'normal';
  $handler->display->display_options['menu']['title'] = 'App Connect';
  $handler->display->display_options['menu']['weight'] = '1';
  $handler->display->display_options['menu']['name'] = 'main-menu';
  $handler->display->display_options['menu']['context'] = 0;
  $handler->display->display_options['menu']['context_only_inline'] = 0;

  /* Display: All */
  $handler = $view->new_display('block', 'All', 'block');
  $handler->display->display_options['defaults']['pager'] = FALSE;
  $handler->display->display_options['pager']['type'] = 'some';
  $handler->display->display_options['pager']['options']['items_per_page'] = '5';
  $handler->display->display_options['defaults']['style_plugin'] = FALSE;
  $handler->display->display_options['style_plugin'] = 'table';
  $handler->display->display_options['style_options']['columns'] = array(
    'title' => 'title',
    'field_ee_program_service_status' => 'field_ee_program_service_status',
    'field_ee_program_service_url' => 'field_ee_program_service_url',
    'field_ee_program_service_role' => 'field_ee_program_service_role',
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
    'field_ee_program_service_status' => array(
      'sortable' => 0,
      'default_sort_order' => 'asc',
      'align' => '',
      'separator' => '',
      'empty_column' => 0,
    ),
    'field_ee_program_service_url' => array(
      'sortable' => 0,
      'default_sort_order' => 'asc',
      'align' => '',
      'separator' => '',
      'empty_column' => 0,
    ),
    'field_ee_program_service_role' => array(
      'sortable' => 0,
      'default_sort_order' => 'asc',
      'align' => '',
      'separator' => '',
      'empty_column' => 0,
    ),
  );
  $handler->display->display_options['defaults']['style_options'] = FALSE;
  $handler->display->display_options['defaults']['row_plugin'] = FALSE;
  $handler->display->display_options['defaults']['row_options'] = FALSE;
  $handler->display->display_options['block_description'] = 'Block All Program Services';

  /* Display: EPA */
  $handler = $view->new_display('block', 'EPA', 'block_1');
  $handler->display->display_options['defaults']['title'] = FALSE;
  $handler->display->display_options['title'] = 'EPA Program Services';
  $handler->display->display_options['defaults']['pager'] = FALSE;
  $handler->display->display_options['pager']['type'] = 'some';
  $handler->display->display_options['pager']['options']['items_per_page'] = '5';
  $handler->display->display_options['defaults']['style_plugin'] = FALSE;
  $handler->display->display_options['style_plugin'] = 'table';
  $handler->display->display_options['style_options']['columns'] = array(
    'title' => 'title',
    'field_ee_program_service_status' => 'field_ee_program_service_status',
    'field_ee_program_service_url' => 'field_ee_program_service_url',
    'field_ee_program_service_role' => 'field_ee_program_service_role',
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
    'field_ee_program_service_status' => array(
      'sortable' => 0,
      'default_sort_order' => 'asc',
      'align' => '',
      'separator' => '',
      'empty_column' => 0,
    ),
    'field_ee_program_service_url' => array(
      'sortable' => 0,
      'default_sort_order' => 'asc',
      'align' => '',
      'separator' => '',
      'empty_column' => 0,
    ),
    'field_ee_program_service_role' => array(
      'sortable' => 0,
      'default_sort_order' => 'asc',
      'align' => '',
      'separator' => '',
      'empty_column' => 0,
    ),
  );
  $handler->display->display_options['defaults']['style_options'] = FALSE;
  $handler->display->display_options['defaults']['row_plugin'] = FALSE;
  $handler->display->display_options['defaults']['row_options'] = FALSE;
  $handler->display->display_options['defaults']['header'] = FALSE;
  /* Header: Global: Text area */
  $handler->display->display_options['header']['area']['id'] = 'area';
  $handler->display->display_options['header']['area']['table'] = 'views';
  $handler->display->display_options['header']['area']['field'] = 'area';
  $handler->display->display_options['header']['area']['content'] = '<div class="epa-services-actions"><a href="https://dev.epacdx.net/ProgramServices">Manage program services</a>  <a href="https://dev.epacdx.net/ProgramServices/AddProgramServiceSelectDataflow">Add program service</a></div>';
  $handler->display->display_options['header']['area']['format'] = 'full_html';
  $handler->display->display_options['defaults']['filter_groups'] = FALSE;
  $handler->display->display_options['defaults']['filters'] = FALSE;
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
    'ee_program_service' => 'ee_program_service',
  );
  /* Filter criterion: Content: Program Service Domain (field_ee_program_service_domain) */
  $handler->display->display_options['filters']['field_ee_program_service_domain_tid']['id'] = 'field_ee_program_service_domain_tid';
  $handler->display->display_options['filters']['field_ee_program_service_domain_tid']['table'] = 'field_data_field_ee_program_service_domain';
  $handler->display->display_options['filters']['field_ee_program_service_domain_tid']['field'] = 'field_ee_program_service_domain_tid';
  $handler->display->display_options['filters']['field_ee_program_service_domain_tid']['value'] = array(
    172786 => '172786',
  );
  $handler->display->display_options['filters']['field_ee_program_service_domain_tid']['type'] = 'select';
  $handler->display->display_options['filters']['field_ee_program_service_domain_tid']['vocabulary'] = 'ee_partner_domain';
  $handler->display->display_options['block_description'] = 'Block EPA Program Services';

  /* Display: State */
  $handler = $view->new_display('block', 'State', 'block_2');
  $handler->display->display_options['defaults']['title'] = FALSE;
  $handler->display->display_options['title'] = 'State Program Services';
  $handler->display->display_options['defaults']['pager'] = FALSE;
  $handler->display->display_options['pager']['type'] = 'some';
  $handler->display->display_options['pager']['options']['items_per_page'] = '5';
  $handler->display->display_options['defaults']['style_plugin'] = FALSE;
  $handler->display->display_options['style_plugin'] = 'table';
  $handler->display->display_options['style_options']['columns'] = array(
    'title' => 'title',
    'field_ee_program_service_status' => 'field_ee_program_service_status',
    'field_ee_program_service_url' => 'field_ee_program_service_url',
    'field_ee_program_service_role' => 'field_ee_program_service_role',
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
    'field_ee_program_service_status' => array(
      'sortable' => 0,
      'default_sort_order' => 'asc',
      'align' => '',
      'separator' => '',
      'empty_column' => 0,
    ),
    'field_ee_program_service_url' => array(
      'sortable' => 0,
      'default_sort_order' => 'asc',
      'align' => '',
      'separator' => '',
      'empty_column' => 0,
    ),
    'field_ee_program_service_role' => array(
      'sortable' => 0,
      'default_sort_order' => 'asc',
      'align' => '',
      'separator' => '',
      'empty_column' => 0,
    ),
  );
  $handler->display->display_options['defaults']['style_options'] = FALSE;
  $handler->display->display_options['defaults']['row_plugin'] = FALSE;
  $handler->display->display_options['defaults']['row_options'] = FALSE;
  $handler->display->display_options['defaults']['filter_groups'] = FALSE;
  $handler->display->display_options['defaults']['filters'] = FALSE;
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
    'ee_program_service' => 'ee_program_service',
  );
  /* Filter criterion: Content: Program Service Domain (field_ee_program_service_domain) */
  $handler->display->display_options['filters']['field_ee_program_service_domain_tid']['id'] = 'field_ee_program_service_domain_tid';
  $handler->display->display_options['filters']['field_ee_program_service_domain_tid']['table'] = 'field_data_field_ee_program_service_domain';
  $handler->display->display_options['filters']['field_ee_program_service_domain_tid']['field'] = 'field_ee_program_service_domain_tid';
  $handler->display->display_options['filters']['field_ee_program_service_domain_tid']['value'] = array(
    172787 => '172787',
  );
  $handler->display->display_options['filters']['field_ee_program_service_domain_tid']['type'] = 'select';
  $handler->display->display_options['filters']['field_ee_program_service_domain_tid']['vocabulary'] = 'ee_partner_domain';
  $handler->display->display_options['block_description'] = 'Block State Program Services';

  /* Display: Tribal */
  $handler = $view->new_display('block', 'Tribal', 'block_3');
  $handler->display->display_options['defaults']['title'] = FALSE;
  $handler->display->display_options['title'] = 'Tribal Program Services';
  $handler->display->display_options['defaults']['pager'] = FALSE;
  $handler->display->display_options['pager']['type'] = 'some';
  $handler->display->display_options['pager']['options']['items_per_page'] = '5';
  $handler->display->display_options['defaults']['style_plugin'] = FALSE;
  $handler->display->display_options['style_plugin'] = 'table';
  $handler->display->display_options['style_options']['columns'] = array(
    'title' => 'title',
    'field_ee_program_service_status' => 'field_ee_program_service_status',
    'field_ee_program_service_url' => 'field_ee_program_service_url',
    'field_ee_program_service_role' => 'field_ee_program_service_role',
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
    'field_ee_program_service_status' => array(
      'sortable' => 0,
      'default_sort_order' => 'asc',
      'align' => '',
      'separator' => '',
      'empty_column' => 0,
    ),
    'field_ee_program_service_url' => array(
      'sortable' => 0,
      'default_sort_order' => 'asc',
      'align' => '',
      'separator' => '',
      'empty_column' => 0,
    ),
    'field_ee_program_service_role' => array(
      'sortable' => 0,
      'default_sort_order' => 'asc',
      'align' => '',
      'separator' => '',
      'empty_column' => 0,
    ),
  );
  $handler->display->display_options['defaults']['style_options'] = FALSE;
  $handler->display->display_options['defaults']['row_plugin'] = FALSE;
  $handler->display->display_options['defaults']['row_options'] = FALSE;
  $handler->display->display_options['defaults']['filter_groups'] = FALSE;
  $handler->display->display_options['defaults']['filters'] = FALSE;
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
    'ee_program_service' => 'ee_program_service',
  );
  /* Filter criterion: Content: Program Service Domain (field_ee_program_service_domain) */
  $handler->display->display_options['filters']['field_ee_program_service_domain_tid']['id'] = 'field_ee_program_service_domain_tid';
  $handler->display->display_options['filters']['field_ee_program_service_domain_tid']['table'] = 'field_data_field_ee_program_service_domain';
  $handler->display->display_options['filters']['field_ee_program_service_domain_tid']['field'] = 'field_ee_program_service_domain_tid';
  $handler->display->display_options['filters']['field_ee_program_service_domain_tid']['value'] = array(
    172788 => '172788',
  );
  $handler->display->display_options['filters']['field_ee_program_service_domain_tid']['type'] = 'select';
  $handler->display->display_options['filters']['field_ee_program_service_domain_tid']['vocabulary'] = 'ee_partner_domain';
  $handler->display->display_options['block_description'] = 'Block Tribal Program Services';

  /* Display: Local */
  $handler = $view->new_display('block', 'Local', 'block_4');
  $handler->display->display_options['defaults']['title'] = FALSE;
  $handler->display->display_options['title'] = 'Local Program Services';
  $handler->display->display_options['defaults']['pager'] = FALSE;
  $handler->display->display_options['pager']['type'] = 'some';
  $handler->display->display_options['pager']['options']['items_per_page'] = '5';
  $handler->display->display_options['defaults']['style_plugin'] = FALSE;
  $handler->display->display_options['style_plugin'] = 'table';
  $handler->display->display_options['style_options']['columns'] = array(
    'title' => 'title',
    'field_ee_program_service_status' => 'field_ee_program_service_status',
    'field_ee_program_service_url' => 'field_ee_program_service_url',
    'field_ee_program_service_role' => 'field_ee_program_service_role',
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
    'field_ee_program_service_status' => array(
      'sortable' => 0,
      'default_sort_order' => 'asc',
      'align' => '',
      'separator' => '',
      'empty_column' => 0,
    ),
    'field_ee_program_service_url' => array(
      'sortable' => 0,
      'default_sort_order' => 'asc',
      'align' => '',
      'separator' => '',
      'empty_column' => 0,
    ),
    'field_ee_program_service_role' => array(
      'sortable' => 0,
      'default_sort_order' => 'asc',
      'align' => '',
      'separator' => '',
      'empty_column' => 0,
    ),
  );
  $handler->display->display_options['defaults']['style_options'] = FALSE;
  $handler->display->display_options['defaults']['row_plugin'] = FALSE;
  $handler->display->display_options['defaults']['row_options'] = FALSE;
  $handler->display->display_options['defaults']['filter_groups'] = FALSE;
  $handler->display->display_options['defaults']['filters'] = FALSE;
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
    'ee_program_service' => 'ee_program_service',
  );
  /* Filter criterion: Content: Program Service Domain (field_ee_program_service_domain) */
  $handler->display->display_options['filters']['field_ee_program_service_domain_tid']['id'] = 'field_ee_program_service_domain_tid';
  $handler->display->display_options['filters']['field_ee_program_service_domain_tid']['table'] = 'field_data_field_ee_program_service_domain';
  $handler->display->display_options['filters']['field_ee_program_service_domain_tid']['field'] = 'field_ee_program_service_domain_tid';
  $handler->display->display_options['filters']['field_ee_program_service_domain_tid']['value'] = array(
    172788 => '172788',
  );
  $handler->display->display_options['filters']['field_ee_program_service_domain_tid']['type'] = 'select';
  $handler->display->display_options['filters']['field_ee_program_service_domain_tid']['vocabulary'] = 'ee_partner_domain';
  $handler->display->display_options['block_description'] = 'Block Local Program Services';
  $export['app_connect'] = $view;

  $view = new view();
  $view->name = 'app_connect_new';
  $view->description = '';
  $view->tag = 'default';
  $view->base_table = 'node';
  $view->human_name = 'App Connect New';
  $view->core = 7;
  $view->api_version = '3.0';
  $view->disabled = FALSE; /* Edit this to true to make a default view disabled initially */

  /* Display: Master */
  $handler = $view->new_display('default', 'Master', 'default');
  $handler->display->display_options['title'] = 'App Connect';
  $handler->display->display_options['use_more_always'] = FALSE;
  $handler->display->display_options['access']['type'] = 'perm';
  $handler->display->display_options['cache']['type'] = 'none';
  $handler->display->display_options['query']['type'] = 'views_query';
  $handler->display->display_options['exposed_form']['type'] = 'basic';
  $handler->display->display_options['pager']['type'] = 'full';
  $handler->display->display_options['pager']['options']['items_per_page'] = '10';
  $handler->display->display_options['style_plugin'] = 'table';
  $handler->display->display_options['style_options']['columns'] = array(
    'field_ee_program_service_url_1' => 'field_ee_program_service_url_1',
    'title' => 'title',
    'field_ee_program_service_url' => 'field_ee_program_service_url',
    'field_ee_program_service_domain' => 'field_ee_program_service_domain',
    'field_ee_program_service_status' => 'field_ee_program_service_status',
    'field_ee_program_service_role' => 'field_ee_program_service_role',
  );
  $handler->display->display_options['style_options']['default'] = '-1';
  $handler->display->display_options['style_options']['info'] = array(
    'field_ee_program_service_url_1' => array(
      'sortable' => 0,
      'default_sort_order' => 'asc',
      'align' => '',
      'separator' => '',
      'empty_column' => 0,
    ),
    'title' => array(
      'sortable' => 1,
      'default_sort_order' => 'asc',
      'align' => '',
      'separator' => '',
      'empty_column' => 0,
    ),
    'field_ee_program_service_url' => array(
      'sortable' => 0,
      'default_sort_order' => 'asc',
      'align' => '',
      'separator' => '',
      'empty_column' => 0,
    ),
    'field_ee_program_service_domain' => array(
      'sortable' => 0,
      'default_sort_order' => 'asc',
      'align' => '',
      'separator' => '',
      'empty_column' => 0,
    ),
    'field_ee_program_service_status' => array(
      'sortable' => 0,
      'default_sort_order' => 'asc',
      'align' => '',
      'separator' => '',
      'empty_column' => 0,
    ),
    'field_ee_program_service_role' => array(
      'sortable' => 1,
      'default_sort_order' => 'asc',
      'align' => '',
      'separator' => '',
      'empty_column' => 0,
    ),
  );
  /* Header: Global: Text area */
  $handler->display->display_options['header']['area']['id'] = 'area';
  $handler->display->display_options['header']['area']['table'] = 'views';
  $handler->display->display_options['header']['area']['field'] = 'area';
  /* Field: Content: Program Service URL */
  $handler->display->display_options['fields']['field_ee_program_service_url_1']['id'] = 'field_ee_program_service_url_1';
  $handler->display->display_options['fields']['field_ee_program_service_url_1']['table'] = 'field_data_field_ee_program_service_url';
  $handler->display->display_options['fields']['field_ee_program_service_url_1']['field'] = 'field_ee_program_service_url';
  $handler->display->display_options['fields']['field_ee_program_service_url_1']['label'] = '';
  $handler->display->display_options['fields']['field_ee_program_service_url_1']['exclude'] = TRUE;
  $handler->display->display_options['fields']['field_ee_program_service_url_1']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['field_ee_program_service_url_1']['settings'] = array(
    'trim_length' => '80',
    'nofollow' => 0,
  );
  /* Field: Content: Title */
  $handler->display->display_options['fields']['title']['id'] = 'title';
  $handler->display->display_options['fields']['title']['table'] = 'node';
  $handler->display->display_options['fields']['title']['field'] = 'title';
  $handler->display->display_options['fields']['title']['alter']['alter_text'] = TRUE;
  $handler->display->display_options['fields']['title']['alter']['text'] = '<p class="mapset-title"><a href="[field_ee_map_set_url_1]">[title]</a></p><p class="mapset-description">[field_ee_map_set_description]</p>';
  $handler->display->display_options['fields']['title']['link_to_node'] = FALSE;
  /* Field: Content: Program Service Status */
  $handler->display->display_options['fields']['field_ee_program_service_status']['id'] = 'field_ee_program_service_status';
  $handler->display->display_options['fields']['field_ee_program_service_status']['table'] = 'field_data_field_ee_program_service_status';
  $handler->display->display_options['fields']['field_ee_program_service_status']['field'] = 'field_ee_program_service_status';
  $handler->display->display_options['fields']['field_ee_program_service_status']['label'] = '';
  $handler->display->display_options['fields']['field_ee_program_service_status']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['field_ee_program_service_status']['type'] = 'taxonomy_term_reference_plain';
  /* Field: Content: Program Service URL */
  $handler->display->display_options['fields']['field_ee_program_service_url']['id'] = 'field_ee_program_service_url';
  $handler->display->display_options['fields']['field_ee_program_service_url']['table'] = 'field_data_field_ee_program_service_url';
  $handler->display->display_options['fields']['field_ee_program_service_url']['field'] = 'field_ee_program_service_url';
  $handler->display->display_options['fields']['field_ee_program_service_url']['label'] = '';
  $handler->display->display_options['fields']['field_ee_program_service_url']['exclude'] = TRUE;
  $handler->display->display_options['fields']['field_ee_program_service_url']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['field_ee_program_service_url']['settings'] = array(
    'trim_length' => '80',
    'nofollow' => 0,
  );
  /* Field: Content: Role */
  $handler->display->display_options['fields']['field_ee_program_service_role']['id'] = 'field_ee_program_service_role';
  $handler->display->display_options['fields']['field_ee_program_service_role']['table'] = 'field_data_field_ee_program_service_role';
  $handler->display->display_options['fields']['field_ee_program_service_role']['field'] = 'field_ee_program_service_role';
  $handler->display->display_options['fields']['field_ee_program_service_role']['label'] = '';
  $handler->display->display_options['fields']['field_ee_program_service_role']['alter']['alter_text'] = TRUE;
  $handler->display->display_options['fields']['field_ee_program_service_role']['alter']['text'] = '[field_ee_program_service_role]';
  $handler->display->display_options['fields']['field_ee_program_service_role']['alter']['make_link'] = TRUE;
  $handler->display->display_options['fields']['field_ee_program_service_role']['alter']['path'] = '[field_ee_program_service_url]';
  $handler->display->display_options['fields']['field_ee_program_service_role']['alter']['rel'] = 'external';
  $handler->display->display_options['fields']['field_ee_program_service_role']['element_label_colon'] = FALSE;
  /* Field: Content: Program Service Domain */
  $handler->display->display_options['fields']['field_ee_program_service_domain']['id'] = 'field_ee_program_service_domain';
  $handler->display->display_options['fields']['field_ee_program_service_domain']['table'] = 'field_data_field_ee_program_service_domain';
  $handler->display->display_options['fields']['field_ee_program_service_domain']['field'] = 'field_ee_program_service_domain';
  $handler->display->display_options['fields']['field_ee_program_service_domain']['label'] = '';
  $handler->display->display_options['fields']['field_ee_program_service_domain']['exclude'] = TRUE;
  $handler->display->display_options['fields']['field_ee_program_service_domain']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['field_ee_program_service_domain']['type'] = 'taxonomy_term_reference_plain';
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
    'ee_program_service' => 'ee_program_service',
  );
  /* Filter criterion: Content: Program Service Domain (field_ee_program_service_domain) */
  $handler->display->display_options['filters']['field_ee_program_service_domain_tid']['id'] = 'field_ee_program_service_domain_tid';
  $handler->display->display_options['filters']['field_ee_program_service_domain_tid']['table'] = 'field_data_field_ee_program_service_domain';
  $handler->display->display_options['filters']['field_ee_program_service_domain_tid']['field'] = 'field_ee_program_service_domain_tid';
  $handler->display->display_options['filters']['field_ee_program_service_domain_tid']['value'] = array(
    172786 => '172786',
  );
  $handler->display->display_options['filters']['field_ee_program_service_domain_tid']['type'] = 'select';
  $handler->display->display_options['filters']['field_ee_program_service_domain_tid']['vocabulary'] = 'ee_partner_domain';

  /* Display: App Connect Page */
  $handler = $view->new_display('page', 'App Connect Page', 'page');
  $handler->display->display_options['defaults']['header'] = FALSE;
  /* Header: Global: Text area */
  $handler->display->display_options['header']['area']['id'] = 'area';
  $handler->display->display_options['header']['area']['table'] = 'views';
  $handler->display->display_options['header']['area']['field'] = 'area';
  $handler->display->display_options['header']['area']['content'] = '<a id="manage-services" style="background-image:linear-gradient(to bottom, rgba(255, 255, 255, 0.2) 0%, rgba(0, 0, 0, 0.15) 100%);text-decoration:none;background-color: #337ab7;border:1px solid #2e6da4;color:#fff;border-radius:4px;padding:5px 8px;font-size:87.5%;font-weight:bold;" href="https://dev.epacdx.net/ProgramServices" rel="external" target="_blank">Manage program services</a>';
  $handler->display->display_options['header']['area']['format'] = 'full_html';
  $handler->display->display_options['defaults']['fields'] = FALSE;
  /* Field: Content: Program Service URL */
  $handler->display->display_options['fields']['field_ee_program_service_url_1']['id'] = 'field_ee_program_service_url_1';
  $handler->display->display_options['fields']['field_ee_program_service_url_1']['table'] = 'field_data_field_ee_program_service_url';
  $handler->display->display_options['fields']['field_ee_program_service_url_1']['field'] = 'field_ee_program_service_url';
  $handler->display->display_options['fields']['field_ee_program_service_url_1']['label'] = '';
  $handler->display->display_options['fields']['field_ee_program_service_url_1']['exclude'] = TRUE;
  $handler->display->display_options['fields']['field_ee_program_service_url_1']['alter']['strip_tags'] = TRUE;
  $handler->display->display_options['fields']['field_ee_program_service_url_1']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['field_ee_program_service_url_1']['settings'] = array(
    'trim_length' => '80',
    'nofollow' => 0,
  );
  /* Field: Content: Title */
  $handler->display->display_options['fields']['title']['id'] = 'title';
  $handler->display->display_options['fields']['title']['table'] = 'node';
  $handler->display->display_options['fields']['title']['field'] = 'title';
  $handler->display->display_options['fields']['title']['alter']['alter_text'] = TRUE;
  $handler->display->display_options['fields']['title']['alter']['text'] = '<a href="[field_ee_program_service_url_1]">[title]</a>';
  $handler->display->display_options['fields']['title']['link_to_node'] = FALSE;
  /* Field: Content: Program Service URL */
  $handler->display->display_options['fields']['field_ee_program_service_url']['id'] = 'field_ee_program_service_url';
  $handler->display->display_options['fields']['field_ee_program_service_url']['table'] = 'field_data_field_ee_program_service_url';
  $handler->display->display_options['fields']['field_ee_program_service_url']['field'] = 'field_ee_program_service_url';
  $handler->display->display_options['fields']['field_ee_program_service_url']['label'] = '';
  $handler->display->display_options['fields']['field_ee_program_service_url']['exclude'] = TRUE;
  $handler->display->display_options['fields']['field_ee_program_service_url']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['field_ee_program_service_url']['settings'] = array(
    'trim_length' => '80',
    'nofollow' => 0,
  );
  /* Field: Content: Program Service Domain */
  $handler->display->display_options['fields']['field_ee_program_service_domain']['id'] = 'field_ee_program_service_domain';
  $handler->display->display_options['fields']['field_ee_program_service_domain']['table'] = 'field_data_field_ee_program_service_domain';
  $handler->display->display_options['fields']['field_ee_program_service_domain']['field'] = 'field_ee_program_service_domain';
  $handler->display->display_options['fields']['field_ee_program_service_domain']['label'] = '';
  $handler->display->display_options['fields']['field_ee_program_service_domain']['exclude'] = TRUE;
  $handler->display->display_options['fields']['field_ee_program_service_domain']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['field_ee_program_service_domain']['type'] = 'taxonomy_term_reference_plain';
  /* Field: Content: Program Service Status */
  $handler->display->display_options['fields']['field_ee_program_service_status']['id'] = 'field_ee_program_service_status';
  $handler->display->display_options['fields']['field_ee_program_service_status']['table'] = 'field_data_field_ee_program_service_status';
  $handler->display->display_options['fields']['field_ee_program_service_status']['field'] = 'field_ee_program_service_status';
  $handler->display->display_options['fields']['field_ee_program_service_status']['label'] = 'Status';
  $handler->display->display_options['fields']['field_ee_program_service_status']['type'] = 'taxonomy_term_reference_plain';
  /* Field: Content: Role */
  $handler->display->display_options['fields']['field_ee_program_service_role']['id'] = 'field_ee_program_service_role';
  $handler->display->display_options['fields']['field_ee_program_service_role']['table'] = 'field_data_field_ee_program_service_role';
  $handler->display->display_options['fields']['field_ee_program_service_role']['field'] = 'field_ee_program_service_role';
  $handler->display->display_options['fields']['field_ee_program_service_role']['alter']['alter_text'] = TRUE;
  $handler->display->display_options['fields']['field_ee_program_service_role']['alter']['text'] = '[field_ee_program_service_role]';
  $handler->display->display_options['fields']['field_ee_program_service_role']['alter']['make_link'] = TRUE;
  $handler->display->display_options['fields']['field_ee_program_service_role']['alter']['path'] = '[field_ee_program_service_url_1]';
  $handler->display->display_options['fields']['field_ee_program_service_role']['alter']['rel'] = 'external';
  $handler->display->display_options['path'] = 'app-connect-new';
  $handler->display->display_options['menu']['type'] = 'normal';
  $handler->display->display_options['menu']['title'] = 'App Connect';
  $handler->display->display_options['menu']['weight'] = '1';
  $handler->display->display_options['menu']['name'] = 'main-menu';
  $handler->display->display_options['menu']['context'] = 0;
  $handler->display->display_options['menu']['context_only_inline'] = 0;

  /* Display: All */
  $handler = $view->new_display('block', 'All', 'block');
  $handler->display->display_options['defaults']['pager'] = FALSE;
  $handler->display->display_options['pager']['type'] = 'some';
  $handler->display->display_options['pager']['options']['items_per_page'] = '5';
  $handler->display->display_options['defaults']['style_plugin'] = FALSE;
  $handler->display->display_options['style_plugin'] = 'table';
  $handler->display->display_options['style_options']['columns'] = array(
    'title' => 'title',
    'field_ee_program_service_status' => 'field_ee_program_service_status',
    'field_ee_program_service_url' => 'field_ee_program_service_url',
    'field_ee_program_service_role' => 'field_ee_program_service_role',
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
    'field_ee_program_service_status' => array(
      'sortable' => 0,
      'default_sort_order' => 'asc',
      'align' => '',
      'separator' => '',
      'empty_column' => 0,
    ),
    'field_ee_program_service_url' => array(
      'sortable' => 0,
      'default_sort_order' => 'asc',
      'align' => '',
      'separator' => '',
      'empty_column' => 0,
    ),
    'field_ee_program_service_role' => array(
      'sortable' => 0,
      'default_sort_order' => 'asc',
      'align' => '',
      'separator' => '',
      'empty_column' => 0,
    ),
  );
  $handler->display->display_options['defaults']['style_options'] = FALSE;
  $handler->display->display_options['defaults']['row_plugin'] = FALSE;
  $handler->display->display_options['defaults']['row_options'] = FALSE;
  $handler->display->display_options['block_description'] = 'Block All Program Services';

  /* Display: EPA */
  $handler = $view->new_display('block', 'EPA', 'block_1');
  $handler->display->display_options['defaults']['title'] = FALSE;
  $handler->display->display_options['title'] = 'EPA Program Services';
  $handler->display->display_options['defaults']['pager'] = FALSE;
  $handler->display->display_options['pager']['type'] = 'some';
  $handler->display->display_options['pager']['options']['items_per_page'] = '5';
  $handler->display->display_options['defaults']['style_plugin'] = FALSE;
  $handler->display->display_options['style_plugin'] = 'table';
  $handler->display->display_options['style_options']['columns'] = array(
    'title' => 'title',
    'field_ee_program_service_status' => 'field_ee_program_service_status',
    'field_ee_program_service_url' => 'field_ee_program_service_url',
    'field_ee_program_service_role' => 'field_ee_program_service_role',
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
    'field_ee_program_service_status' => array(
      'sortable' => 0,
      'default_sort_order' => 'asc',
      'align' => '',
      'separator' => '',
      'empty_column' => 0,
    ),
    'field_ee_program_service_url' => array(
      'sortable' => 0,
      'default_sort_order' => 'asc',
      'align' => '',
      'separator' => '',
      'empty_column' => 0,
    ),
    'field_ee_program_service_role' => array(
      'sortable' => 0,
      'default_sort_order' => 'asc',
      'align' => '',
      'separator' => '',
      'empty_column' => 0,
    ),
  );
  $handler->display->display_options['defaults']['style_options'] = FALSE;
  $handler->display->display_options['defaults']['row_plugin'] = FALSE;
  $handler->display->display_options['defaults']['row_options'] = FALSE;
  $handler->display->display_options['defaults']['header'] = FALSE;
  /* Header: Global: Text area */
  $handler->display->display_options['header']['area']['id'] = 'area';
  $handler->display->display_options['header']['area']['table'] = 'views';
  $handler->display->display_options['header']['area']['field'] = 'area';
  $handler->display->display_options['header']['area']['content'] = '<div class="epa-services-actions"><a href="https://dev.epacdx.net/ProgramServices">Manage program services</a>  <a href="https://dev.epacdx.net/ProgramServices/AddProgramServiceSelectDataflow">Add program service</a></div>';
  $handler->display->display_options['header']['area']['format'] = 'full_html';
  $handler->display->display_options['defaults']['filter_groups'] = FALSE;
  $handler->display->display_options['defaults']['filters'] = FALSE;
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
    'ee_program_service' => 'ee_program_service',
  );
  /* Filter criterion: Content: Program Service Domain (field_ee_program_service_domain) */
  $handler->display->display_options['filters']['field_ee_program_service_domain_tid']['id'] = 'field_ee_program_service_domain_tid';
  $handler->display->display_options['filters']['field_ee_program_service_domain_tid']['table'] = 'field_data_field_ee_program_service_domain';
  $handler->display->display_options['filters']['field_ee_program_service_domain_tid']['field'] = 'field_ee_program_service_domain_tid';
  $handler->display->display_options['filters']['field_ee_program_service_domain_tid']['value'] = array(
    172786 => '172786',
  );
  $handler->display->display_options['filters']['field_ee_program_service_domain_tid']['type'] = 'select';
  $handler->display->display_options['filters']['field_ee_program_service_domain_tid']['vocabulary'] = 'ee_partner_domain';
  $handler->display->display_options['block_description'] = 'Block EPA Program Services';

  /* Display: State */
  $handler = $view->new_display('block', 'State', 'block_2');
  $handler->display->display_options['defaults']['title'] = FALSE;
  $handler->display->display_options['title'] = 'State Program Services';
  $handler->display->display_options['defaults']['pager'] = FALSE;
  $handler->display->display_options['pager']['type'] = 'some';
  $handler->display->display_options['pager']['options']['items_per_page'] = '5';
  $handler->display->display_options['defaults']['style_plugin'] = FALSE;
  $handler->display->display_options['style_plugin'] = 'table';
  $handler->display->display_options['style_options']['columns'] = array(
    'title' => 'title',
    'field_ee_program_service_status' => 'field_ee_program_service_status',
    'field_ee_program_service_url' => 'field_ee_program_service_url',
    'field_ee_program_service_role' => 'field_ee_program_service_role',
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
    'field_ee_program_service_status' => array(
      'sortable' => 0,
      'default_sort_order' => 'asc',
      'align' => '',
      'separator' => '',
      'empty_column' => 0,
    ),
    'field_ee_program_service_url' => array(
      'sortable' => 0,
      'default_sort_order' => 'asc',
      'align' => '',
      'separator' => '',
      'empty_column' => 0,
    ),
    'field_ee_program_service_role' => array(
      'sortable' => 0,
      'default_sort_order' => 'asc',
      'align' => '',
      'separator' => '',
      'empty_column' => 0,
    ),
  );
  $handler->display->display_options['defaults']['style_options'] = FALSE;
  $handler->display->display_options['defaults']['row_plugin'] = FALSE;
  $handler->display->display_options['defaults']['row_options'] = FALSE;
  $handler->display->display_options['defaults']['filter_groups'] = FALSE;
  $handler->display->display_options['defaults']['filters'] = FALSE;
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
    'ee_program_service' => 'ee_program_service',
  );
  /* Filter criterion: Content: Program Service Domain (field_ee_program_service_domain) */
  $handler->display->display_options['filters']['field_ee_program_service_domain_tid']['id'] = 'field_ee_program_service_domain_tid';
  $handler->display->display_options['filters']['field_ee_program_service_domain_tid']['table'] = 'field_data_field_ee_program_service_domain';
  $handler->display->display_options['filters']['field_ee_program_service_domain_tid']['field'] = 'field_ee_program_service_domain_tid';
  $handler->display->display_options['filters']['field_ee_program_service_domain_tid']['value'] = array(
    172787 => '172787',
  );
  $handler->display->display_options['filters']['field_ee_program_service_domain_tid']['type'] = 'select';
  $handler->display->display_options['filters']['field_ee_program_service_domain_tid']['vocabulary'] = 'ee_partner_domain';
  $handler->display->display_options['block_description'] = 'Block State Program Services';

  /* Display: Tribal */
  $handler = $view->new_display('block', 'Tribal', 'block_3');
  $handler->display->display_options['defaults']['title'] = FALSE;
  $handler->display->display_options['title'] = 'Tribal Program Services';
  $handler->display->display_options['defaults']['pager'] = FALSE;
  $handler->display->display_options['pager']['type'] = 'some';
  $handler->display->display_options['pager']['options']['items_per_page'] = '5';
  $handler->display->display_options['defaults']['style_plugin'] = FALSE;
  $handler->display->display_options['style_plugin'] = 'table';
  $handler->display->display_options['style_options']['columns'] = array(
    'title' => 'title',
    'field_ee_program_service_status' => 'field_ee_program_service_status',
    'field_ee_program_service_url' => 'field_ee_program_service_url',
    'field_ee_program_service_role' => 'field_ee_program_service_role',
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
    'field_ee_program_service_status' => array(
      'sortable' => 0,
      'default_sort_order' => 'asc',
      'align' => '',
      'separator' => '',
      'empty_column' => 0,
    ),
    'field_ee_program_service_url' => array(
      'sortable' => 0,
      'default_sort_order' => 'asc',
      'align' => '',
      'separator' => '',
      'empty_column' => 0,
    ),
    'field_ee_program_service_role' => array(
      'sortable' => 0,
      'default_sort_order' => 'asc',
      'align' => '',
      'separator' => '',
      'empty_column' => 0,
    ),
  );
  $handler->display->display_options['defaults']['style_options'] = FALSE;
  $handler->display->display_options['defaults']['row_plugin'] = FALSE;
  $handler->display->display_options['defaults']['row_options'] = FALSE;
  $handler->display->display_options['defaults']['filter_groups'] = FALSE;
  $handler->display->display_options['defaults']['filters'] = FALSE;
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
    'ee_program_service' => 'ee_program_service',
  );
  /* Filter criterion: Content: Program Service Domain (field_ee_program_service_domain) */
  $handler->display->display_options['filters']['field_ee_program_service_domain_tid']['id'] = 'field_ee_program_service_domain_tid';
  $handler->display->display_options['filters']['field_ee_program_service_domain_tid']['table'] = 'field_data_field_ee_program_service_domain';
  $handler->display->display_options['filters']['field_ee_program_service_domain_tid']['field'] = 'field_ee_program_service_domain_tid';
  $handler->display->display_options['filters']['field_ee_program_service_domain_tid']['value'] = array(
    172788 => '172788',
  );
  $handler->display->display_options['filters']['field_ee_program_service_domain_tid']['type'] = 'select';
  $handler->display->display_options['filters']['field_ee_program_service_domain_tid']['vocabulary'] = 'ee_partner_domain';
  $handler->display->display_options['block_description'] = 'Block Tribal Program Services';

  /* Display: Local */
  $handler = $view->new_display('block', 'Local', 'block_4');
  $handler->display->display_options['defaults']['title'] = FALSE;
  $handler->display->display_options['title'] = 'Local Program Services';
  $handler->display->display_options['defaults']['pager'] = FALSE;
  $handler->display->display_options['pager']['type'] = 'some';
  $handler->display->display_options['pager']['options']['items_per_page'] = '5';
  $handler->display->display_options['defaults']['style_plugin'] = FALSE;
  $handler->display->display_options['style_plugin'] = 'table';
  $handler->display->display_options['style_options']['columns'] = array(
    'title' => 'title',
    'field_ee_program_service_status' => 'field_ee_program_service_status',
    'field_ee_program_service_url' => 'field_ee_program_service_url',
    'field_ee_program_service_role' => 'field_ee_program_service_role',
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
    'field_ee_program_service_status' => array(
      'sortable' => 0,
      'default_sort_order' => 'asc',
      'align' => '',
      'separator' => '',
      'empty_column' => 0,
    ),
    'field_ee_program_service_url' => array(
      'sortable' => 0,
      'default_sort_order' => 'asc',
      'align' => '',
      'separator' => '',
      'empty_column' => 0,
    ),
    'field_ee_program_service_role' => array(
      'sortable' => 0,
      'default_sort_order' => 'asc',
      'align' => '',
      'separator' => '',
      'empty_column' => 0,
    ),
  );
  $handler->display->display_options['defaults']['style_options'] = FALSE;
  $handler->display->display_options['defaults']['row_plugin'] = FALSE;
  $handler->display->display_options['defaults']['row_options'] = FALSE;
  $handler->display->display_options['defaults']['filter_groups'] = FALSE;
  $handler->display->display_options['defaults']['filters'] = FALSE;
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
    'ee_program_service' => 'ee_program_service',
  );
  /* Filter criterion: Content: Program Service Domain (field_ee_program_service_domain) */
  $handler->display->display_options['filters']['field_ee_program_service_domain_tid']['id'] = 'field_ee_program_service_domain_tid';
  $handler->display->display_options['filters']['field_ee_program_service_domain_tid']['table'] = 'field_data_field_ee_program_service_domain';
  $handler->display->display_options['filters']['field_ee_program_service_domain_tid']['field'] = 'field_ee_program_service_domain_tid';
  $handler->display->display_options['filters']['field_ee_program_service_domain_tid']['value'] = array(
    172788 => '172788',
  );
  $handler->display->display_options['filters']['field_ee_program_service_domain_tid']['type'] = 'select';
  $handler->display->display_options['filters']['field_ee_program_service_domain_tid']['vocabulary'] = 'ee_partner_domain';
  $handler->display->display_options['block_description'] = 'Block Local Program Services';
  $export['app_connect_new'] = $view;

  return $export;
}
