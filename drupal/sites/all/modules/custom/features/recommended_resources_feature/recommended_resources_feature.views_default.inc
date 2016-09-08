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
  $handler->display->display_options['query']['options']['json_file'] = variable_get('eenterprise_bridge_auth_realm', 'http://localhost') . '/rcs_lgc_resources_json_all';
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
  $handler->display->display_options['fields']['value']['exclude'] = TRUE;
  $handler->display->display_options['fields']['value']['key'] = 'ResourceName';
  /* Field: LocationResourceText: value */
  $handler->display->display_options['fields']['value_2']['id'] = 'value_2';
  $handler->display->display_options['fields']['value_2']['table'] = 'json';
  $handler->display->display_options['fields']['value_2']['field'] = 'value';
  $handler->display->display_options['fields']['value_2']['label'] = 'URL';
  $handler->display->display_options['fields']['value_2']['exclude'] = TRUE;
  $handler->display->display_options['fields']['value_2']['key'] = 'LocationResourceText';
  /* Field: Linked Resource Name */
  $handler->display->display_options['fields']['nothing_1']['id'] = 'nothing_1';
  $handler->display->display_options['fields']['nothing_1']['table'] = 'views';
  $handler->display->display_options['fields']['nothing_1']['field'] = 'nothing';
  $handler->display->display_options['fields']['nothing_1']['ui_name'] = 'Linked Resource Name';
  $handler->display->display_options['fields']['nothing_1']['label'] = 'Resource';
  $handler->display->display_options['fields']['nothing_1']['alter']['text'] = '<a href="[value_2]" target="_blank">[value]</a>';
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
<a href="#" class="favorites-ignore"><span class="sr-only">Details for [value]</sr></a>';
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
  $handler->display->display_options['query']['options']['json_file'] = variable_get('eenterprise_bridge_auth_realm', 'http://localhost') . '/rcs_lgc_resources_json_by_topic';
  $handler->display->display_options['query']['options']['row_apath'] = 'resources';
  $handler->display->display_options['query']['options']['show_errors'] = 1;

  /* Display: Resources by User */
  $handler = $view->new_display('block', 'Resources by User', 'rcs_resources_user');
  $handler->display->display_options['defaults']['query'] = FALSE;
  $handler->display->display_options['query']['type'] = 'views_query';
  $handler->display->display_options['query']['options']['json_file'] = variable_get('eenterprise_bridge_auth_realm', 'http://localhost') . '/rcs_lgc_resources_json_by_user';
  $handler->display->display_options['query']['options']['row_apath'] = 'resources';
  $handler->display->display_options['query']['options']['show_errors'] = 1;

  /* Display: LGC Resource Page Wrapper */
  $handler = $view->new_display('block', 'LGC Resource Page Wrapper', 'block_1');
  $export['lgc_resources'] = $view;

  return $export;
}
