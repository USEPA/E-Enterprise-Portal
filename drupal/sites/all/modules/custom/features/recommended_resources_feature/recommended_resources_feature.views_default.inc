<?php
/**
 * @file
 * recommended_resources_feature.views_default.inc
 */

/**
 * Implements hook_views_default_views().
 */
function recommended_resources_feature_views_default_views() {
  $export = array();

  $view = new view();
  $view->name = 'lgc_manage_my_topics';
  $view->description = '';
  $view->tag = 'default';
  $view->base_table = 'taxonomy_term_data';
  $view->human_name = 'LGC: Manage My Topics';
  $view->core = 7;
  $view->api_version = '3.0';
  $view->disabled = FALSE; /* Edit this to true to make a default view disabled initially */

  /* Display: Master */
  $handler = $view->new_display('default', 'Master', 'default');
  $handler->display->display_options['title'] = 'LGC: Manage My Topics';
  $handler->display->display_options['use_ajax'] = TRUE;
  $handler->display->display_options['use_more_always'] = FALSE;
  $handler->display->display_options['access']['type'] = 'perm';
  $handler->display->display_options['cache']['type'] = 'none';
  $handler->display->display_options['query']['type'] = 'views_query';
  $handler->display->display_options['exposed_form']['type'] = 'basic';
  $handler->display->display_options['pager']['type'] = 'none';
  $handler->display->display_options['pager']['options']['offset'] = '0';
  $handler->display->display_options['style_plugin'] = 'default';
  $handler->display->display_options['row_plugin'] = 'fields';
  /* Field: Taxonomy term: Name */
  $handler->display->display_options['fields']['name']['id'] = 'name';
  $handler->display->display_options['fields']['name']['table'] = 'taxonomy_term_data';
  $handler->display->display_options['fields']['name']['field'] = 'name';
  $handler->display->display_options['fields']['name']['label'] = '';
  $handler->display->display_options['fields']['name']['alter']['word_boundary'] = FALSE;
  $handler->display->display_options['fields']['name']['alter']['ellipsis'] = FALSE;
  $handler->display->display_options['fields']['name']['element_label_colon'] = FALSE;
  /* Filter criterion: Taxonomy vocabulary: Machine name */
  $handler->display->display_options['filters']['machine_name']['id'] = 'machine_name';
  $handler->display->display_options['filters']['machine_name']['table'] = 'taxonomy_vocabulary';
  $handler->display->display_options['filters']['machine_name']['field'] = 'machine_name';
  $handler->display->display_options['filters']['machine_name']['value'] = array(
    'lgc_topics' => 'lgc_topics',
  );
  /* Filter criterion: Taxonomy term: Name */
  $handler->display->display_options['filters']['name']['id'] = 'name';
  $handler->display->display_options['filters']['name']['table'] = 'taxonomy_term_data';
  $handler->display->display_options['filters']['name']['field'] = 'name';
  $handler->display->display_options['filters']['name']['operator'] = 'contains';
  $handler->display->display_options['filters']['name']['exposed'] = TRUE;
  $handler->display->display_options['filters']['name']['expose']['operator_id'] = 'name_op';
  $handler->display->display_options['filters']['name']['expose']['label'] = 'Filter: ';
  $handler->display->display_options['filters']['name']['expose']['operator'] = 'name_op';
  $handler->display->display_options['filters']['name']['expose']['identifier'] = 'name';
  $handler->display->display_options['filters']['name']['expose']['remember_roles'] = array(
    2 => '2',
    1 => 0,
    3 => 0,
    4 => 0,
    5 => 0,
    6 => 0,
    7 => 0,
    8 => 0,
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
    89 => 0,
    90 => 0,
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
    78 => 0,
    80 => 0,
    81 => 0,
    82 => 0,
    83 => 0,
    84 => 0,
    85 => 0,
    86 => 0,
    87 => 0,
    88 => 0,
    91 => 0,
    92 => 0,
    93 => 0,
    94 => 0,
  );

  /* Display: Block */
  $handler = $view->new_display('block', 'Block', 'block');
  $handler->display->display_options['block_description'] = 'manage_my_topics';

  /* Display: Page */
  $handler = $view->new_display('page', 'Page', 'manage_my_topics_page');
  $handler->display->display_options['path'] = 'lgc_manage_my_topics';
  $export['lgc_manage_my_topics'] = $view;

  $view = new view();
  $view->name = 'lgc_resources';
  $view->description = '';
  $view->tag = 'default';
  $view->base_table = 'json';
  $view->human_name = 'LGC Resources';
  $view->core = 7;
  $view->api_version = '3.0';
  $view->disabled = FALSE; /* Edit this to true to make a default view disabled initially */

  /* Display: Master */
  $handler = $view->new_display('default', 'Master', 'default');
  $handler->display->display_options['title'] = 'LGC Resources';
  $handler->display->display_options['use_more_always'] = FALSE;
  $handler->display->display_options['access']['type'] = 'none';
  $handler->display->display_options['cache']['type'] = 'none';
  $handler->display->display_options['query']['type'] = 'views_query';
  $handler->display->display_options['query']['options']['json_file'] = 'http://localhost/rcs_lgc_resources_json_all';
  $handler->display->display_options['query']['options']['row_apath'] = 'resources';
  $handler->display->display_options['query']['options']['show_errors'] = 1;
  $handler->display->display_options['exposed_form']['type'] = 'basic';
  $handler->display->display_options['pager']['type'] = 'none';
  $handler->display->display_options['pager']['options']['offset'] = '0';
  $handler->display->display_options['style_plugin'] = 'datatables';
  /* Field: ResourceName: value */
  $handler->display->display_options['fields']['value']['id'] = 'value';
  $handler->display->display_options['fields']['value']['table'] = 'json';
  $handler->display->display_options['fields']['value']['field'] = 'value';
  $handler->display->display_options['fields']['value']['label'] = 'Resource';
  $handler->display->display_options['fields']['value']['key'] = 'ResourceName';
  /* Field: DescriptionText: value */
  $handler->display->display_options['fields']['value_1']['id'] = 'value_1';
  $handler->display->display_options['fields']['value_1']['table'] = 'json';
  $handler->display->display_options['fields']['value_1']['field'] = 'value';
  $handler->display->display_options['fields']['value_1']['label'] = 'Info';
  $handler->display->display_options['fields']['value_1']['exclude'] = TRUE;
  $handler->display->display_options['fields']['value_1']['key'] = 'DescriptionText';
  /* Field: (i) icon */
  $handler->display->display_options['fields']['nothing']['id'] = 'nothing';
  $handler->display->display_options['fields']['nothing']['table'] = 'views';
  $handler->display->display_options['fields']['nothing']['field'] = 'nothing';
  $handler->display->display_options['fields']['nothing']['ui_name'] = '(i) icon';
  $handler->display->display_options['fields']['nothing']['label'] = 'Info';
  $handler->display->display_options['fields']['nothing']['alter']['text'] = '<div>[value_1]</div>
<span></span>';
  /* Field: PrimaryOrganizationText: value */
  $handler->display->display_options['fields']['value_9']['id'] = 'value_9';
  $handler->display->display_options['fields']['value_9']['table'] = 'json';
  $handler->display->display_options['fields']['value_9']['field'] = 'value';
  $handler->display->display_options['fields']['value_9']['label'] = 'Source';
  $handler->display->display_options['fields']['value_9']['key'] = 'PrimaryOrganizationText';
  /* Field: TopicText: value */
  $handler->display->display_options['fields']['value_3']['id'] = 'value_3';
  $handler->display->display_options['fields']['value_3']['table'] = 'json';
  $handler->display->display_options['fields']['value_3']['field'] = 'value';
  $handler->display->display_options['fields']['value_3']['label'] = 'Topic';
  $handler->display->display_options['fields']['value_3']['key'] = 'TopicText';
  /* Field: CategoryTagsText: value */
  $handler->display->display_options['fields']['value_4']['id'] = 'value_4';
  $handler->display->display_options['fields']['value_4']['table'] = 'json';
  $handler->display->display_options['fields']['value_4']['field'] = 'value';
  $handler->display->display_options['fields']['value_4']['label'] = 'Category';
  $handler->display->display_options['fields']['value_4']['key'] = 'CategoryTagsText';
  /* Field: ResourceTypeText: value */
  $handler->display->display_options['fields']['value_5']['id'] = 'value_5';
  $handler->display->display_options['fields']['value_5']['table'] = 'json';
  $handler->display->display_options['fields']['value_5']['field'] = 'value';
  $handler->display->display_options['fields']['value_5']['label'] = 'Tool Type';
  $handler->display->display_options['fields']['value_5']['key'] = 'ResourceTypeText';
  /* Field: AccessLevelText: value */
  $handler->display->display_options['fields']['value_6']['id'] = 'value_6';
  $handler->display->display_options['fields']['value_6']['table'] = 'json';
  $handler->display->display_options['fields']['value_6']['field'] = 'value';
  $handler->display->display_options['fields']['value_6']['label'] = 'Training Level';
  $handler->display->display_options['fields']['value_6']['key'] = 'AccessLevelText';
  /* Field: ShareRequirementsText: value */
  $handler->display->display_options['fields']['value_7']['id'] = 'value_7';
  $handler->display->display_options['fields']['value_7']['table'] = 'json';
  $handler->display->display_options['fields']['value_7']['field'] = 'value';
  $handler->display->display_options['fields']['value_7']['label'] = 'Data Requirements';
  $handler->display->display_options['fields']['value_7']['key'] = 'ShareRequirementsText';
  /* Field: SubtypeText: value */
  $handler->display->display_options['fields']['value_8']['id'] = 'value_8';
  $handler->display->display_options['fields']['value_8']['table'] = 'json';
  $handler->display->display_options['fields']['value_8']['field'] = 'value';
  $handler->display->display_options['fields']['value_8']['label'] = 'Relevance';
  $handler->display->display_options['fields']['value_8']['key'] = 'SubtypeText';

  /* Display: page */
  $handler = $view->new_display('page', 'page', 'page');
  $handler->display->display_options['path'] = 'lgc-resources';

  /* Display: All Resources */
  $handler = $view->new_display('block', 'All Resources', 'rcs_resources_all');

  /* Display: Resources by Topic */
  $handler = $view->new_display('block', 'Resources by Topic', 'rcs_resources_topic');
  $handler->display->display_options['defaults']['query'] = FALSE;
  $handler->display->display_options['query']['type'] = 'views_query';
  $handler->display->display_options['query']['options']['json_file'] = 'http://localhost/rcs_lgc_resources_json_by_topic';
  $handler->display->display_options['query']['options']['row_apath'] = 'resources';
  $handler->display->display_options['query']['options']['show_errors'] = 1;

  /* Display: Resources by User */
  $handler = $view->new_display('block', 'Resources by User', 'rcs_resources_user');
  $handler->display->display_options['defaults']['query'] = FALSE;
  $handler->display->display_options['query']['type'] = 'views_query';
  $handler->display->display_options['query']['options']['json_file'] = 'http://localhost/rcs_lgc_resources_json_by_user';
  $handler->display->display_options['query']['options']['row_apath'] = 'resources';
  $handler->display->display_options['query']['options']['show_errors'] = 1;

  /* Display: LGC Resource Page Wrapper */
  $handler = $view->new_display('block', 'LGC Resource Page Wrapper', 'block_1');
  $export['lgc_resources'] = $view;

  $view = new view();
  $view->name = 'local_government_resource_editor';
  $view->description = '';
  $view->tag = 'default';
  $view->base_table = 'node';
  $view->human_name = 'Local Government Resource Editor';
  $view->core = 7;
  $view->api_version = '3.0';
  $view->disabled = FALSE; /* Edit this to true to make a default view disabled initially */

  /* Display: Master */
  $handler = $view->new_display('default', 'Master', 'default');
  $handler->display->display_options['title'] = 'Resource Editor';
  $handler->display->display_options['css_class'] = 'usa-table';
  $handler->display->display_options['use_more_always'] = FALSE;
  $handler->display->display_options['access']['type'] = 'perm';
  $handler->display->display_options['cache']['type'] = 'none';
  $handler->display->display_options['query']['type'] = 'views_query';
  $handler->display->display_options['exposed_form']['type'] = 'basic';
  $handler->display->display_options['pager']['type'] = 'none';
  $handler->display->display_options['pager']['options']['offset'] = '0';
  $handler->display->display_options['style_plugin'] = 'datatables';
  $handler->display->display_options['style_options']['columns'] = array(
    'title' => 'title',
    'nothing' => 'nothing',
    'field_lgc_id' => 'field_lgc_id',
    'field_lgc_category' => 'field_lgc_category',
    'field_lgc_description' => 'field_lgc_description',
    'field_lgc_topic' => 'field_lgc_topic',
    'edit_node' => 'edit_node',
    'php' => 'php',
  );
  $handler->display->display_options['style_options']['default'] = '-1';
  $handler->display->display_options['style_options']['info'] = array(
    'title' => array(
      'sortable' => 1,
      'default_sort_order' => 'asc',
      'align' => '',
      'separator' => '',
      'empty_column' => 0,
    ),
    'nothing' => array(
      'align' => '',
      'separator' => '',
      'empty_column' => 0,
    ),
    'field_lgc_id' => array(
      'sortable' => 1,
      'default_sort_order' => 'asc',
      'align' => '',
      'separator' => '',
      'empty_column' => 0,
    ),
    'field_lgc_category' => array(
      'sortable' => 1,
      'default_sort_order' => 'asc',
      'align' => '',
      'separator' => '',
      'empty_column' => 0,
    ),
    'field_lgc_description' => array(
      'sortable' => 1,
      'default_sort_order' => 'asc',
      'align' => '',
      'separator' => '',
      'empty_column' => 0,
    ),
    'field_lgc_topic' => array(
      'sortable' => 1,
      'default_sort_order' => 'asc',
      'align' => '',
      'separator' => '',
      'empty_column' => 0,
    ),
    'edit_node' => array(
      'align' => '',
      'separator' => '',
      'empty_column' => 0,
    ),
    'php' => array(
      'sortable' => 1,
      'default_sort_order' => 'asc',
      'align' => '',
      'separator' => '',
      'empty_column' => 0,
    ),
  );
  $handler->display->display_options['style_options']['elements'] = array(
    'search_box' => 1,
    'table_info' => 1,
    'save_state' => 0,
    'table_tools' => 0,
  );
  $handler->display->display_options['style_options']['layout'] = array(
    'autowidth' => 1,
    'themeroller' => 0,
    'sdom' => '',
  );
  $handler->display->display_options['style_options']['pages'] = array(
    'pagination_style' => '0',
    'length_change' => 0,
    'display_length' => '10',
  );
  /* Header: Global: Text area */
  $handler->display->display_options['header']['area']['id'] = 'area';
  $handler->display->display_options['header']['area']['table'] = 'views';
  $handler->display->display_options['header']['area']['field'] = 'area';
  $handler->display->display_options['header']['area']['empty'] = TRUE;
  $handler->display->display_options['header']['area']['content'] = '<a href="/new-local-resource" class="usa-button primary-action">Add a resource</a>';
  $handler->display->display_options['header']['area']['format'] = 'full_html';
  /* Footer: Global: Text area */
  $handler->display->display_options['footer']['area']['id'] = 'area';
  $handler->display->display_options['footer']['area']['table'] = 'views';
  $handler->display->display_options['footer']['area']['field'] = 'area';
  $handler->display->display_options['footer']['area']['content'] = '<a href="/new-local-resource" class="usa-button primary-action">Add a resource</a>';
  $handler->display->display_options['footer']['area']['format'] = 'full_html';
  /* Relationship: Content: Author */
  $handler->display->display_options['relationships']['uid']['id'] = 'uid';
  $handler->display->display_options['relationships']['uid']['table'] = 'node';
  $handler->display->display_options['relationships']['uid']['field'] = 'uid';
  /* Field: Content: Title */
  $handler->display->display_options['fields']['title']['id'] = 'title';
  $handler->display->display_options['fields']['title']['table'] = 'node';
  $handler->display->display_options['fields']['title']['field'] = 'title';
  $handler->display->display_options['fields']['title']['label'] = '';
  $handler->display->display_options['fields']['title']['exclude'] = TRUE;
  $handler->display->display_options['fields']['title']['alter']['word_boundary'] = FALSE;
  $handler->display->display_options['fields']['title']['alter']['ellipsis'] = FALSE;
  $handler->display->display_options['fields']['title']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['title']['link_to_node'] = FALSE;
  /* Field: Global: PHP */
  $handler->display->display_options['fields']['php']['id'] = 'php';
  $handler->display->display_options['fields']['php']['table'] = 'views';
  $handler->display->display_options['fields']['php']['field'] = 'php';
  $handler->display->display_options['fields']['php']['label'] = 'Resources';
  $handler->display->display_options['fields']['php']['use_php_setup'] = 0;
  $handler->display->display_options['fields']['php']['php_value'] = 'echo $row->title;';
  $handler->display->display_options['fields']['php']['php_output'] = '<?php
echo $row->title;
?>';
  $handler->display->display_options['fields']['php']['use_php_click_sortable'] = '2';
  $handler->display->display_options['fields']['php']['php_click_sortable'] = '';
  /* Field: Content: ID */
  $handler->display->display_options['fields']['field_lgc_id']['id'] = 'field_lgc_id';
  $handler->display->display_options['fields']['field_lgc_id']['table'] = 'field_data_field_lgc_id';
  $handler->display->display_options['fields']['field_lgc_id']['field'] = 'field_lgc_id';
  /* Field: Content: Category */
  $handler->display->display_options['fields']['field_lgc_category']['id'] = 'field_lgc_category';
  $handler->display->display_options['fields']['field_lgc_category']['table'] = 'field_data_field_lgc_category';
  $handler->display->display_options['fields']['field_lgc_category']['field'] = 'field_lgc_category';
  $handler->display->display_options['fields']['field_lgc_category']['type'] = 'taxonomy_term_reference_plain';
  /* Field: Content: Description */
  $handler->display->display_options['fields']['field_lgc_description']['id'] = 'field_lgc_description';
  $handler->display->display_options['fields']['field_lgc_description']['table'] = 'field_data_field_lgc_description';
  $handler->display->display_options['fields']['field_lgc_description']['field'] = 'field_lgc_description';
  /* Field: Content: Topic */
  $handler->display->display_options['fields']['field_lgc_topic']['id'] = 'field_lgc_topic';
  $handler->display->display_options['fields']['field_lgc_topic']['table'] = 'field_data_field_lgc_topic';
  $handler->display->display_options['fields']['field_lgc_topic']['field'] = 'field_lgc_topic';
  $handler->display->display_options['fields']['field_lgc_topic']['type'] = 'taxonomy_term_reference_plain';
  /* Field: Content: Edit link */
  $handler->display->display_options['fields']['edit_node']['id'] = 'edit_node';
  $handler->display->display_options['fields']['edit_node']['table'] = 'views_entity_node';
  $handler->display->display_options['fields']['edit_node']['field'] = 'edit_node';
  $handler->display->display_options['fields']['edit_node']['label'] = 'Actions';
  $handler->display->display_options['fields']['edit_node']['text'] = 'Edit';
  /* Sort criterion: Content: Post date */
  $handler->display->display_options['sorts']['created']['id'] = 'created';
  $handler->display->display_options['sorts']['created']['table'] = 'node';
  $handler->display->display_options['sorts']['created']['field'] = 'created';
  $handler->display->display_options['sorts']['created']['order'] = 'DESC';
  /* Filter criterion: Content: Type */
  $handler->display->display_options['filters']['type']['id'] = 'type';
  $handler->display->display_options['filters']['type']['table'] = 'node';
  $handler->display->display_options['filters']['type']['field'] = 'type';
  $handler->display->display_options['filters']['type']['value'] = array(
    'lgc_resource' => 'lgc_resource',
  );

  /* Display: Page */
  $handler = $view->new_display('page', 'Page', 'page');
  $handler->display->display_options['path'] = 'local-resource-editor';
  $export['local_government_resource_editor'] = $view;

  $view = new view();
  $view->name = 'new_local_government_resource';
  $view->description = '';
  $view->tag = 'default';
  $view->base_table = 'node';
  $view->human_name = 'New Local Government Resource';
  $view->core = 7;
  $view->api_version = '3.0';
  $view->disabled = FALSE; /* Edit this to true to make a default view disabled initially */

  /* Display: Master */
  $handler = $view->new_display('default', 'Master', 'default');
  $handler->display->display_options['title'] = 'New Resource';
  $handler->display->display_options['use_more_always'] = FALSE;
  $handler->display->display_options['access']['type'] = 'perm';
  $handler->display->display_options['cache']['type'] = 'none';
  $handler->display->display_options['query']['type'] = 'views_query';
  $handler->display->display_options['exposed_form']['type'] = 'basic';
  $handler->display->display_options['pager']['type'] = 'full';
  $handler->display->display_options['pager']['options']['items_per_page'] = '10';
  $handler->display->display_options['style_plugin'] = 'default';
  $handler->display->display_options['row_plugin'] = 'node';
  /* Field: Content: Title */
  $handler->display->display_options['fields']['title']['id'] = 'title';
  $handler->display->display_options['fields']['title']['table'] = 'node';
  $handler->display->display_options['fields']['title']['field'] = 'title';
  $handler->display->display_options['fields']['title']['label'] = '';
  $handler->display->display_options['fields']['title']['alter']['word_boundary'] = FALSE;
  $handler->display->display_options['fields']['title']['alter']['ellipsis'] = FALSE;
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

  /* Display: Page */
  $handler = $view->new_display('page', 'Page', 'page');
  $handler->display->display_options['path'] = 'new-local-resource';
  $export['new_local_government_resource'] = $view;

  $view = new view();
  $view->name = 'recommended_resources';
  $view->description = '';
  $view->tag = 'default';
  $view->base_table = 'node';
  $view->human_name = 'Recommended Resources';
  $view->core = 7;
  $view->api_version = '3.0';
  $view->disabled = FALSE; /* Edit this to true to make a default view disabled initially */

  /* Display: Master */
  $handler = $view->new_display('default', 'Master', 'default');
  $handler->display->display_options['title'] = 'Resources for Local Communities';
  $handler->display->display_options['use_ajax'] = TRUE;
  $handler->display->display_options['use_more_always'] = FALSE;
  $handler->display->display_options['access']['type'] = 'perm';
  $handler->display->display_options['cache']['type'] = 'none';
  $handler->display->display_options['query']['type'] = 'views_query';
  $handler->display->display_options['exposed_form']['type'] = 'basic';
  $handler->display->display_options['pager']['type'] = 'none';
  $handler->display->display_options['pager']['options']['offset'] = '0';
  $handler->display->display_options['style_plugin'] = 'datatables';
  $handler->display->display_options['style_options']['default_row_class'] = FALSE;
  $handler->display->display_options['style_options']['row_class_special'] = FALSE;
  $handler->display->display_options['style_options']['columns'] = array(
    'title_1' => 'title_1',
    'field_lgc_description' => 'field_lgc_description',
    'field_lgc_link' => 'field_lgc_link',
    'nothing' => 'nothing',
  );
  $handler->display->display_options['style_options']['default'] = '-1';
  $handler->display->display_options['style_options']['info'] = array(
    'title_1' => array(
      'sortable' => 0,
      'default_sort_order' => 'asc',
      'align' => '',
      'separator' => '',
      'empty_column' => 0,
    ),
    'field_lgc_description' => array(
      'sortable' => 0,
      'default_sort_order' => 'asc',
      'align' => '',
      'separator' => '',
      'empty_column' => 0,
    ),
    'field_lgc_link' => array(
      'sortable' => 0,
      'default_sort_order' => 'asc',
      'align' => '',
      'separator' => '',
      'empty_column' => 0,
    ),
    'nothing' => array(
      'align' => '',
      'separator' => '',
      'empty_column' => 1,
    ),
  );
  $handler->display->display_options['style_options']['elements'] = array(
    'search_box' => 1,
    'table_info' => 1,
    'save_state' => 0,
    'table_tools' => 0,
  );
  $handler->display->display_options['style_options']['layout'] = array(
    'autowidth' => 0,
    'themeroller' => 0,
    'sdom' => '',
  );
  $handler->display->display_options['style_options']['pages'] = array(
    'pagination_style' => '0',
    'length_change' => 1,
    'display_length' => '10',
  );
  /* Field: Content: Title */
  $handler->display->display_options['fields']['title_1']['id'] = 'title_1';
  $handler->display->display_options['fields']['title_1']['table'] = 'node';
  $handler->display->display_options['fields']['title_1']['field'] = 'title';
  $handler->display->display_options['fields']['title_1']['label'] = 'Tool';
  $handler->display->display_options['fields']['title_1']['exclude'] = TRUE;
  $handler->display->display_options['fields']['title_1']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['title_1']['link_to_node'] = FALSE;
  /* Field: Content: Topic */
  $handler->display->display_options['fields']['field_lgc_topic']['id'] = 'field_lgc_topic';
  $handler->display->display_options['fields']['field_lgc_topic']['table'] = 'field_data_field_lgc_topic';
  $handler->display->display_options['fields']['field_lgc_topic']['field'] = 'field_lgc_topic';
  $handler->display->display_options['fields']['field_lgc_topic']['exclude'] = TRUE;
  $handler->display->display_options['fields']['field_lgc_topic']['type'] = 'taxonomy_term_reference_plain';
  /* Field: Content: Description */
  $handler->display->display_options['fields']['field_lgc_description']['id'] = 'field_lgc_description';
  $handler->display->display_options['fields']['field_lgc_description']['table'] = 'field_data_field_lgc_description';
  $handler->display->display_options['fields']['field_lgc_description']['field'] = 'field_lgc_description';
  $handler->display->display_options['fields']['field_lgc_description']['exclude'] = TRUE;
  /* Field: Content: Link */
  $handler->display->display_options['fields']['field_lgc_link']['id'] = 'field_lgc_link';
  $handler->display->display_options['fields']['field_lgc_link']['table'] = 'field_data_field_lgc_link';
  $handler->display->display_options['fields']['field_lgc_link']['field'] = 'field_lgc_link';
  $handler->display->display_options['fields']['field_lgc_link']['exclude'] = TRUE;
  /* Field: Global: Custom text */
  $handler->display->display_options['fields']['nothing']['id'] = 'nothing';
  $handler->display->display_options['fields']['nothing']['table'] = 'views';
  $handler->display->display_options['fields']['nothing']['field'] = 'nothing';
  $handler->display->display_options['fields']['nothing']['label'] = '';
  $handler->display->display_options['fields']['nothing']['alter']['text'] = '<span class="lgc-resource-link"><a href="[field_lgc_link]" target="_blank">[title_1]</a></span>
<span class="lgc-resource-description ee-bootstrap-tooltip" data-toggle="tooltip" title=[field_lgc_description]>[field_lgc_description]</span>
<span class="lgc-resource-topic">[field_lgc_topic]</span>';
  $handler->display->display_options['fields']['nothing']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['nothing']['hide_empty'] = TRUE;
  /* Sort criterion: Content: Post date */
  $handler->display->display_options['sorts']['created']['id'] = 'created';
  $handler->display->display_options['sorts']['created']['table'] = 'node';
  $handler->display->display_options['sorts']['created']['field'] = 'created';
  $handler->display->display_options['sorts']['created']['order'] = 'DESC';
  /* Contextual filter: Content: Topic (field_lgc_topic) */
  $handler->display->display_options['arguments']['field_lgc_topic_tid']['id'] = 'field_lgc_topic_tid';
  $handler->display->display_options['arguments']['field_lgc_topic_tid']['table'] = 'field_data_field_lgc_topic';
  $handler->display->display_options['arguments']['field_lgc_topic_tid']['field'] = 'field_lgc_topic_tid';
  $handler->display->display_options['arguments']['field_lgc_topic_tid']['default_argument_type'] = 'fixed';
  $handler->display->display_options['arguments']['field_lgc_topic_tid']['summary']['number_of_records'] = '0';
  $handler->display->display_options['arguments']['field_lgc_topic_tid']['summary']['format'] = 'default_summary';
  $handler->display->display_options['arguments']['field_lgc_topic_tid']['summary_options']['items_per_page'] = '25';
  $handler->display->display_options['arguments']['field_lgc_topic_tid']['break_phrase'] = TRUE;
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
    'lgc_resource' => 'lgc_resource',
  );
  /* Filter criterion: Content: Title */
  $handler->display->display_options['filters']['title']['id'] = 'title';
  $handler->display->display_options['filters']['title']['table'] = 'node';
  $handler->display->display_options['filters']['title']['field'] = 'title';
  $handler->display->display_options['filters']['title']['operator'] = '!=';

  /* Display: Page */
  $handler = $view->new_display('page', 'Page', 'page');
  $handler->display->display_options['defaults']['arguments'] = FALSE;
  $handler->display->display_options['path'] = 'recommended-resources';

  /* Display: Local Government Wrapper */
  $handler = $view->new_display('block', 'Local Government Wrapper', 'block');
  $handler->display->display_options['defaults']['pager'] = FALSE;
  $handler->display->display_options['pager']['type'] = 'none';
  $handler->display->display_options['pager']['options']['offset'] = '0';
  $handler->display->display_options['defaults']['style_plugin'] = FALSE;
  $handler->display->display_options['style_plugin'] = 'datatables';
  $handler->display->display_options['style_options']['columns'] = array(
    'title_1' => 'title_1',
    'field_lgc_description' => 'field_lgc_description',
    'field_lgc_link' => 'field_lgc_link',
    'nothing' => 'nothing',
  );
  $handler->display->display_options['style_options']['default'] = '-1';
  $handler->display->display_options['style_options']['info'] = array(
    'title_1' => array(
      'sortable' => 0,
      'default_sort_order' => 'asc',
      'align' => '',
      'separator' => '',
      'empty_column' => 0,
    ),
    'field_lgc_description' => array(
      'sortable' => 1,
      'default_sort_order' => 'asc',
      'align' => '',
      'separator' => '',
      'empty_column' => 0,
    ),
    'field_lgc_link' => array(
      'sortable' => 1,
      'default_sort_order' => 'asc',
      'align' => '',
      'separator' => '',
      'empty_column' => 0,
    ),
    'nothing' => array(
      'align' => '',
      'separator' => '',
      'empty_column' => 0,
    ),
  );
  $handler->display->display_options['style_options']['elements'] = array(
    'search_box' => 1,
    'table_info' => 1,
    'save_state' => 0,
    'table_tools' => 0,
  );
  $handler->display->display_options['style_options']['layout'] = array(
    'autowidth' => 0,
    'themeroller' => 0,
    'sdom' => '',
  );
  $handler->display->display_options['style_options']['pages'] = array(
    'pagination_style' => '0',
    'length_change' => 1,
    'display_length' => '10',
  );
  $handler->display->display_options['defaults']['style_options'] = FALSE;
  $handler->display->display_options['defaults']['row_plugin'] = FALSE;
  $handler->display->display_options['defaults']['row_options'] = FALSE;

  /* Display: Services */
  $handler = $view->new_display('services', 'Services', 'services_1');
  $handler->display->display_options['defaults']['fields'] = FALSE;
  /* Field: Content: Title */
  $handler->display->display_options['fields']['title_1']['id'] = 'title_1';
  $handler->display->display_options['fields']['title_1']['table'] = 'node';
  $handler->display->display_options['fields']['title_1']['field'] = 'title';
  $handler->display->display_options['fields']['title_1']['label'] = 'Tool';
  $handler->display->display_options['fields']['title_1']['exclude'] = TRUE;
  $handler->display->display_options['fields']['title_1']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['title_1']['link_to_node'] = FALSE;
  /* Field: Content: Description */
  $handler->display->display_options['fields']['field_lgc_description']['id'] = 'field_lgc_description';
  $handler->display->display_options['fields']['field_lgc_description']['table'] = 'field_data_field_lgc_description';
  $handler->display->display_options['fields']['field_lgc_description']['field'] = 'field_lgc_description';
  /* Field: Content: Link */
  $handler->display->display_options['fields']['field_lgc_link']['id'] = 'field_lgc_link';
  $handler->display->display_options['fields']['field_lgc_link']['table'] = 'field_data_field_lgc_link';
  $handler->display->display_options['fields']['field_lgc_link']['field'] = 'field_lgc_link';
  /* Field: Content: Nid */
  $handler->display->display_options['fields']['nid']['id'] = 'nid';
  $handler->display->display_options['fields']['nid']['table'] = 'node';
  $handler->display->display_options['fields']['nid']['field'] = 'nid';
  $handler->display->display_options['fields']['nid']['label'] = 'nid';
  $handler->display->display_options['defaults']['arguments'] = FALSE;
  /* Contextual filter: Content: Nid */
  $handler->display->display_options['arguments']['nid']['id'] = 'nid';
  $handler->display->display_options['arguments']['nid']['table'] = 'node';
  $handler->display->display_options['arguments']['nid']['field'] = 'nid';
  $handler->display->display_options['arguments']['nid']['default_argument_type'] = 'fixed';
  $handler->display->display_options['arguments']['nid']['summary']['number_of_records'] = '0';
  $handler->display->display_options['arguments']['nid']['summary']['format'] = 'default_summary';
  $handler->display->display_options['arguments']['nid']['summary_options']['items_per_page'] = '25';
  $handler->display->display_options['path'] = 'local_resources';

  /* Display: All resources table */
  $handler = $view->new_display('block', 'All resources table', 'block_to_be_rendered');
  $handler->display->display_options['defaults']['pager'] = FALSE;
  $handler->display->display_options['pager']['type'] = 'none';
  $handler->display->display_options['pager']['options']['offset'] = '0';
  $handler->display->display_options['defaults']['style_plugin'] = FALSE;
  $handler->display->display_options['style_plugin'] = 'datatables';
  $handler->display->display_options['style_options']['columns'] = array(
    'title_1' => 'title_1',
    'field_lgc_description' => 'field_lgc_description',
    'field_lgc_link' => 'field_lgc_link',
    'nothing' => 'nothing',
  );
  $handler->display->display_options['style_options']['default'] = '-1';
  $handler->display->display_options['style_options']['info'] = array(
    'title_1' => array(
      'sortable' => 0,
      'default_sort_order' => 'asc',
      'align' => '',
      'separator' => '',
      'empty_column' => 0,
    ),
    'field_lgc_description' => array(
      'sortable' => 1,
      'default_sort_order' => 'asc',
      'align' => '',
      'separator' => '',
      'empty_column' => 0,
    ),
    'field_lgc_link' => array(
      'sortable' => 1,
      'default_sort_order' => 'asc',
      'align' => '',
      'separator' => '',
      'empty_column' => 0,
    ),
    'nothing' => array(
      'align' => '',
      'separator' => '',
      'empty_column' => 0,
    ),
  );
  $handler->display->display_options['style_options']['elements'] = array(
    'search_box' => 1,
    'table_info' => 1,
    'save_state' => 0,
    'table_tools' => 0,
  );
  $handler->display->display_options['style_options']['layout'] = array(
    'autowidth' => 0,
    'themeroller' => 0,
    'sdom' => '',
  );
  $handler->display->display_options['style_options']['pages'] = array(
    'pagination_style' => '0',
    'length_change' => 1,
    'display_length' => '10',
  );
  $handler->display->display_options['defaults']['style_options'] = FALSE;
  $handler->display->display_options['defaults']['row_plugin'] = FALSE;
  $handler->display->display_options['defaults']['row_options'] = FALSE;
  $export['recommended_resources'] = $view;

  $view = new view();
  $view->name = 'user_recommended_resources';
  $view->description = '';
  $view->tag = 'default';
  $view->base_table = 'users';
  $view->human_name = 'User Recommended Resources';
  $view->core = 7;
  $view->api_version = '3.0';
  $view->disabled = FALSE; /* Edit this to true to make a default view disabled initially */

  /* Display: Master */
  $handler = $view->new_display('default', 'Master', 'default');
  $handler->display->display_options['title'] = 'User Recommended Resources';
  $handler->display->display_options['use_more_always'] = FALSE;
  $handler->display->display_options['access']['type'] = 'role';
  $handler->display->display_options['access']['role'] = array(
    2 => '2',
  );
  $handler->display->display_options['cache']['type'] = 'none';
  $handler->display->display_options['query']['type'] = 'views_query';
  $handler->display->display_options['query']['options']['distinct'] = TRUE;
  $handler->display->display_options['exposed_form']['type'] = 'basic';
  $handler->display->display_options['pager']['type'] = 'none';
  $handler->display->display_options['style_plugin'] = 'datatables';
  /* Relationship: User: LGC Topics of Interest (field_lgc_topics_of_interest) */
  $handler->display->display_options['relationships']['field_lgc_topics_of_interest_tid']['id'] = 'field_lgc_topics_of_interest_tid';
  $handler->display->display_options['relationships']['field_lgc_topics_of_interest_tid']['table'] = 'field_data_field_lgc_topics_of_interest';
  $handler->display->display_options['relationships']['field_lgc_topics_of_interest_tid']['field'] = 'field_lgc_topics_of_interest_tid';
  $handler->display->display_options['relationships']['field_lgc_topics_of_interest_tid']['required'] = TRUE;
  /* Relationship: Taxonomy term: Content using Topic */
  $handler->display->display_options['relationships']['reverse_field_lgc_topic_node']['id'] = 'reverse_field_lgc_topic_node';
  $handler->display->display_options['relationships']['reverse_field_lgc_topic_node']['table'] = 'taxonomy_term_data';
  $handler->display->display_options['relationships']['reverse_field_lgc_topic_node']['field'] = 'reverse_field_lgc_topic_node';
  $handler->display->display_options['relationships']['reverse_field_lgc_topic_node']['relationship'] = 'field_lgc_topics_of_interest_tid';
  $handler->display->display_options['relationships']['reverse_field_lgc_topic_node']['required'] = TRUE;
  /* Field: Content: Title */
  $handler->display->display_options['fields']['title']['id'] = 'title';
  $handler->display->display_options['fields']['title']['table'] = 'node';
  $handler->display->display_options['fields']['title']['field'] = 'title';
  $handler->display->display_options['fields']['title']['relationship'] = 'reverse_field_lgc_topic_node';
  $handler->display->display_options['fields']['title']['exclude'] = TRUE;
  $handler->display->display_options['fields']['title']['link_to_node'] = FALSE;
  /* Field: Content: Description */
  $handler->display->display_options['fields']['field_lgc_description']['id'] = 'field_lgc_description';
  $handler->display->display_options['fields']['field_lgc_description']['table'] = 'field_data_field_lgc_description';
  $handler->display->display_options['fields']['field_lgc_description']['field'] = 'field_lgc_description';
  $handler->display->display_options['fields']['field_lgc_description']['relationship'] = 'reverse_field_lgc_topic_node';
  $handler->display->display_options['fields']['field_lgc_description']['exclude'] = TRUE;
  /* Field: Content: Topic */
  $handler->display->display_options['fields']['field_lgc_topic']['id'] = 'field_lgc_topic';
  $handler->display->display_options['fields']['field_lgc_topic']['table'] = 'field_data_field_lgc_topic';
  $handler->display->display_options['fields']['field_lgc_topic']['field'] = 'field_lgc_topic';
  $handler->display->display_options['fields']['field_lgc_topic']['relationship'] = 'reverse_field_lgc_topic_node';
  $handler->display->display_options['fields']['field_lgc_topic']['exclude'] = TRUE;
  $handler->display->display_options['fields']['field_lgc_topic']['type'] = 'taxonomy_term_reference_plain';
  /* Field: Content: Link */
  $handler->display->display_options['fields']['field_lgc_link']['id'] = 'field_lgc_link';
  $handler->display->display_options['fields']['field_lgc_link']['table'] = 'field_data_field_lgc_link';
  $handler->display->display_options['fields']['field_lgc_link']['field'] = 'field_lgc_link';
  $handler->display->display_options['fields']['field_lgc_link']['relationship'] = 'reverse_field_lgc_topic_node';
  $handler->display->display_options['fields']['field_lgc_link']['exclude'] = TRUE;
  /* Field: Global: Custom text */
  $handler->display->display_options['fields']['nothing']['id'] = 'nothing';
  $handler->display->display_options['fields']['nothing']['table'] = 'views';
  $handler->display->display_options['fields']['nothing']['field'] = 'nothing';
  $handler->display->display_options['fields']['nothing']['alter']['text'] = '<span class="lgc-resource-link"><a href="[field_lgc_link]" target="_blank">[title]</a></span>
<span class="lgc-resource-description ee-bootstrap-tooltip" data-toggle="tooltip" title=[field_lgc_description]>[field_lgc_description]</span>
<span class="lgc-resource-topic">[field_lgc_topic]</span>';
  /* Sort criterion: User: Created date */
  $handler->display->display_options['sorts']['created']['id'] = 'created';
  $handler->display->display_options['sorts']['created']['table'] = 'users';
  $handler->display->display_options['sorts']['created']['field'] = 'created';
  $handler->display->display_options['sorts']['created']['order'] = 'DESC';
  /* Contextual filter: Content: Topic (field_lgc_topic) */
  $handler->display->display_options['arguments']['field_lgc_topic_tid']['id'] = 'field_lgc_topic_tid';
  $handler->display->display_options['arguments']['field_lgc_topic_tid']['table'] = 'field_data_field_lgc_topic';
  $handler->display->display_options['arguments']['field_lgc_topic_tid']['field'] = 'field_lgc_topic_tid';
  $handler->display->display_options['arguments']['field_lgc_topic_tid']['relationship'] = 'reverse_field_lgc_topic_node';
  $handler->display->display_options['arguments']['field_lgc_topic_tid']['default_argument_type'] = 'fixed';
  $handler->display->display_options['arguments']['field_lgc_topic_tid']['summary']['number_of_records'] = '0';
  $handler->display->display_options['arguments']['field_lgc_topic_tid']['summary']['format'] = 'default_summary';
  $handler->display->display_options['arguments']['field_lgc_topic_tid']['summary_options']['items_per_page'] = '25';
  $handler->display->display_options['arguments']['field_lgc_topic_tid']['break_phrase'] = TRUE;
  /* Filter criterion: User: Active */
  $handler->display->display_options['filters']['status']['id'] = 'status';
  $handler->display->display_options['filters']['status']['table'] = 'users';
  $handler->display->display_options['filters']['status']['field'] = 'status';
  $handler->display->display_options['filters']['status']['value'] = '1';
  $handler->display->display_options['filters']['status']['group'] = 1;
  $handler->display->display_options['filters']['status']['expose']['operator'] = FALSE;
  /* Filter criterion: User: Current */
  $handler->display->display_options['filters']['uid_current']['id'] = 'uid_current';
  $handler->display->display_options['filters']['uid_current']['table'] = 'users';
  $handler->display->display_options['filters']['uid_current']['field'] = 'uid_current';
  $handler->display->display_options['filters']['uid_current']['value'] = '1';

  /* Display: Page */
  $handler = $view->new_display('page', 'Page', 'page');
  $handler->display->display_options['path'] = 'user-recommended-resources';

  /* Display: Block */
  $handler = $view->new_display('block', 'Block', 'block');
  $handler->display->display_options['defaults']['pager'] = FALSE;
  $handler->display->display_options['pager']['type'] = 'none';
  $handler->display->display_options['pager']['options']['offset'] = '0';
  $handler->display->display_options['defaults']['style_plugin'] = FALSE;
  $handler->display->display_options['style_plugin'] = 'datatables';
  $handler->display->display_options['style_options']['columns'] = array(
    'name' => 'name',
    'title' => 'title',
    'field_lgc_description' => 'field_lgc_description',
    'field_lgc_link' => 'field_lgc_link',
    'nothing' => 'nothing',
    'php' => 'php',
  );
  $handler->display->display_options['style_options']['default'] = '-1';
  $handler->display->display_options['style_options']['info'] = array(
    'name' => array(
      'sortable' => 0,
      'default_sort_order' => 'asc',
      'align' => '',
      'separator' => '',
      'empty_column' => 0,
    ),
    'title' => array(
      'sortable' => 0,
      'default_sort_order' => 'asc',
      'align' => '',
      'separator' => '',
      'empty_column' => 0,
    ),
    'field_lgc_description' => array(
      'sortable' => 0,
      'default_sort_order' => 'asc',
      'align' => '',
      'separator' => '',
      'empty_column' => 0,
    ),
    'field_lgc_link' => array(
      'sortable' => 0,
      'default_sort_order' => 'asc',
      'align' => '',
      'separator' => '',
      'empty_column' => 0,
    ),
    'nothing' => array(
      'align' => '',
      'separator' => '',
      'empty_column' => 0,
    ),
    'php' => array(
      'align' => '',
      'separator' => '',
      'empty_column' => 0,
    ),
  );
  $handler->display->display_options['style_options']['elements'] = array(
    'search_box' => 1,
    'table_info' => 1,
    'save_state' => 0,
    'table_tools' => 0,
  );
  $handler->display->display_options['style_options']['layout'] = array(
    'autowidth' => 0,
    'themeroller' => 0,
    'sdom' => '',
  );
  $handler->display->display_options['style_options']['pages'] = array(
    'pagination_style' => '0',
    'length_change' => 0,
    'display_length' => '10',
  );
  $handler->display->display_options['defaults']['style_options'] = FALSE;
  $handler->display->display_options['defaults']['row_plugin'] = FALSE;
  $handler->display->display_options['defaults']['row_options'] = FALSE;
  $export['user_recommended_resources'] = $view;

  return $export;
}
