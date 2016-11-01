<?php
/**
 * @file
 * chemical_laws_and_regulations_content_types_and_view.views_default.inc
 */

/**
 * Implements hook_views_default_views().
 */
function chemical_laws_and_regulations_content_types_and_view_views_default_views() {
  $export = array();

  $view = new view();
  $view->name = 'chemical_rules_all_chemicals';
  $view->description = '';
  $view->tag = 'default';
  $view->base_table = 'node';
  $view->human_name = 'Chemical Rules All Chemicals';
  $view->core = 7;
  $view->api_version = '3.0';
  $view->disabled = FALSE; /* Edit this to true to make a default view disabled initially */

  /* Display: Master */
  $handler = $view->new_display('default', 'Master', 'default');
  $handler->display->display_options['title'] = 'Chemical Rules All Saved Chemicals';
  $handler->display->display_options['use_more_always'] = FALSE;
  $handler->display->display_options['access']['type'] = 'perm';
  $handler->display->display_options['cache']['type'] = 'none';
  $handler->display->display_options['query']['type'] = 'views_query';
  $handler->display->display_options['exposed_form']['type'] = 'basic';
  $handler->display->display_options['pager']['type'] = 'full';
  $handler->display->display_options['pager']['options']['items_per_page'] = '10';
  $handler->display->display_options['style_plugin'] = 'default';
  $handler->display->display_options['row_plugin'] = 'fields';
  /* Field: Content: Nid */
  $handler->display->display_options['fields']['nid']['id'] = 'nid';
  $handler->display->display_options['fields']['nid']['table'] = 'node';
  $handler->display->display_options['fields']['nid']['field'] = 'nid';
  $handler->display->display_options['fields']['nid']['label'] = '';
  $handler->display->display_options['fields']['nid']['exclude'] = TRUE;
  $handler->display->display_options['fields']['nid']['element_label_colon'] = FALSE;
  /* Field: Content: Count */
  $handler->display->display_options['fields']['field_chem_rules_search_count']['id'] = 'field_chem_rules_search_count';
  $handler->display->display_options['fields']['field_chem_rules_search_count']['table'] = 'field_data_field_chem_rules_search_count';
  $handler->display->display_options['fields']['field_chem_rules_search_count']['field'] = 'field_chem_rules_search_count';
  $handler->display->display_options['fields']['field_chem_rules_search_count']['label'] = '';
  $handler->display->display_options['fields']['field_chem_rules_search_count']['exclude'] = TRUE;
  $handler->display->display_options['fields']['field_chem_rules_search_count']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['field_chem_rules_search_count']['settings'] = array(
    'thousand_separator' => ' ',
    'prefix_suffix' => 1,
  );
  /* Field: Content: CAS # */
  $handler->display->display_options['fields']['field_chem_rules_casregistrynum']['id'] = 'field_chem_rules_casregistrynum';
  $handler->display->display_options['fields']['field_chem_rules_casregistrynum']['table'] = 'field_data_field_chem_rules_casregistrynum';
  $handler->display->display_options['fields']['field_chem_rules_casregistrynum']['field'] = 'field_chem_rules_casregistrynum';
  $handler->display->display_options['fields']['field_chem_rules_casregistrynum']['label'] = '';
  $handler->display->display_options['fields']['field_chem_rules_casregistrynum']['exclude'] = TRUE;
  $handler->display->display_options['fields']['field_chem_rules_casregistrynum']['alter']['alter_text'] = TRUE;
  $handler->display->display_options['fields']['field_chem_rules_casregistrynum']['element_label_colon'] = FALSE;
  /* Field: Content: Internal Tracking Number */
  $handler->display->display_options['fields']['field_chem_rules_epachemintnum']['id'] = 'field_chem_rules_epachemintnum';
  $handler->display->display_options['fields']['field_chem_rules_epachemintnum']['table'] = 'field_data_field_chem_rules_epachemintnum';
  $handler->display->display_options['fields']['field_chem_rules_epachemintnum']['field'] = 'field_chem_rules_epachemintnum';
  $handler->display->display_options['fields']['field_chem_rules_epachemintnum']['label'] = '';
  $handler->display->display_options['fields']['field_chem_rules_epachemintnum']['exclude'] = TRUE;
  $handler->display->display_options['fields']['field_chem_rules_epachemintnum']['element_label_colon'] = FALSE;
  /* Field: Content: Chemical Systemic Name */
  $handler->display->display_options['fields']['field_chem_rules_systematicname']['id'] = 'field_chem_rules_systematicname';
  $handler->display->display_options['fields']['field_chem_rules_systematicname']['table'] = 'field_data_field_chem_rules_systematicname';
  $handler->display->display_options['fields']['field_chem_rules_systematicname']['field'] = 'field_chem_rules_systematicname';
  $handler->display->display_options['fields']['field_chem_rules_systematicname']['label'] = '';
  $handler->display->display_options['fields']['field_chem_rules_systematicname']['alter']['alter_text'] = TRUE;
  $handler->display->display_options['fields']['field_chem_rules_systematicname']['alter']['text'] = '<a href="#" data-cr-srs="[field_chem_rules_epachemintnum]" data-cr-nid="[nid]">[field_chem_rules_casregistrynum]: [field_chem_rules_systematicname]</a> (Search count: [field_chem_rules_search_count])';
  $handler->display->display_options['fields']['field_chem_rules_systematicname']['element_label_colon'] = FALSE;
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
    'chemical_searches' => 'chemical_searches',
  );

  /* Display: Page */
  $handler = $view->new_display('page', 'Page', 'page');
  $handler->display->display_options['path'] = 'chemical-rules-favorite-chemicals';

  /* Display: Block */
  $handler = $view->new_display('block', 'Block', 'block');
  $handler->display->display_options['defaults']['pager'] = FALSE;
  $handler->display->display_options['pager']['type'] = 'some';
  $handler->display->display_options['pager']['options']['items_per_page'] = '5';
  $handler->display->display_options['defaults']['style_plugin'] = FALSE;
  $handler->display->display_options['style_plugin'] = 'default';
  $handler->display->display_options['defaults']['style_options'] = FALSE;
  $handler->display->display_options['defaults']['row_plugin'] = FALSE;
  $handler->display->display_options['row_plugin'] = 'fields';
  $handler->display->display_options['defaults']['row_options'] = FALSE;
  $export['chemical_rules_all_chemicals'] = $view;

  $view = new view();
  $view->name = 'chemical_rules_favorite_chemicals';
  $view->description = '';
  $view->tag = 'default';
  $view->base_table = 'node';
  $view->human_name = 'Chemical Rules Favorite Chemicals';
  $view->core = 7;
  $view->api_version = '3.0';
  $view->disabled = FALSE; /* Edit this to true to make a default view disabled initially */

  /* Display: Master */
  $handler = $view->new_display('default', 'Master', 'default');
  $handler->display->display_options['title'] = 'Chemical Rules Favorite Chemicals';
  $handler->display->display_options['use_more_always'] = FALSE;
  $handler->display->display_options['access']['type'] = 'perm';
  $handler->display->display_options['cache']['type'] = 'none';
  $handler->display->display_options['query']['type'] = 'views_query';
  $handler->display->display_options['exposed_form']['type'] = 'basic';
  $handler->display->display_options['pager']['type'] = 'full';
  $handler->display->display_options['pager']['options']['items_per_page'] = '10';
  $handler->display->display_options['style_plugin'] = 'default';
  $handler->display->display_options['row_plugin'] = 'fields';
  /* Field: Content: CAS # */
  $handler->display->display_options['fields']['field_chem_rules_casregistrynum']['id'] = 'field_chem_rules_casregistrynum';
  $handler->display->display_options['fields']['field_chem_rules_casregistrynum']['table'] = 'field_data_field_chem_rules_casregistrynum';
  $handler->display->display_options['fields']['field_chem_rules_casregistrynum']['field'] = 'field_chem_rules_casregistrynum';
  $handler->display->display_options['fields']['field_chem_rules_casregistrynum']['label'] = '';
  $handler->display->display_options['fields']['field_chem_rules_casregistrynum']['exclude'] = TRUE;
  $handler->display->display_options['fields']['field_chem_rules_casregistrynum']['alter']['alter_text'] = TRUE;
  $handler->display->display_options['fields']['field_chem_rules_casregistrynum']['element_label_colon'] = FALSE;
  /* Field: Content: Internal Tracking Number */
  $handler->display->display_options['fields']['field_chem_rules_epachemintnum']['id'] = 'field_chem_rules_epachemintnum';
  $handler->display->display_options['fields']['field_chem_rules_epachemintnum']['table'] = 'field_data_field_chem_rules_epachemintnum';
  $handler->display->display_options['fields']['field_chem_rules_epachemintnum']['field'] = 'field_chem_rules_epachemintnum';
  $handler->display->display_options['fields']['field_chem_rules_epachemintnum']['label'] = '';
  $handler->display->display_options['fields']['field_chem_rules_epachemintnum']['exclude'] = TRUE;
  $handler->display->display_options['fields']['field_chem_rules_epachemintnum']['element_label_colon'] = FALSE;
  /* Field: Content: Chemical Systemic Name */
  $handler->display->display_options['fields']['field_chem_rules_systematicname']['id'] = 'field_chem_rules_systematicname';
  $handler->display->display_options['fields']['field_chem_rules_systematicname']['table'] = 'field_data_field_chem_rules_systematicname';
  $handler->display->display_options['fields']['field_chem_rules_systematicname']['field'] = 'field_chem_rules_systematicname';
  $handler->display->display_options['fields']['field_chem_rules_systematicname']['label'] = '';
  $handler->display->display_options['fields']['field_chem_rules_systematicname']['alter']['alter_text'] = TRUE;
  $handler->display->display_options['fields']['field_chem_rules_systematicname']['alter']['text'] = '<a href="#" data-cr-srs="[field_chem_rules_epachemintnum]">[field_chem_rules_casregistrynum]: [field_chem_rules_systematicname]</a>';
  $handler->display->display_options['fields']['field_chem_rules_systematicname']['element_label_colon'] = FALSE;
  /* Field: Content: Author uid */
  $handler->display->display_options['fields']['uid']['id'] = 'uid';
  $handler->display->display_options['fields']['uid']['table'] = 'node';
  $handler->display->display_options['fields']['uid']['field'] = 'uid';
  $handler->display->display_options['fields']['uid']['label'] = '';
  $handler->display->display_options['fields']['uid']['exclude'] = TRUE;
  $handler->display->display_options['fields']['uid']['element_label_colon'] = FALSE;
  /* Sort criterion: Content: Post date */
  $handler->display->display_options['sorts']['created']['id'] = 'created';
  $handler->display->display_options['sorts']['created']['table'] = 'node';
  $handler->display->display_options['sorts']['created']['field'] = 'created';
  $handler->display->display_options['sorts']['created']['order'] = 'DESC';
  /* Contextual filter: Content: Author uid */
  $handler->display->display_options['arguments']['uid']['id'] = 'uid';
  $handler->display->display_options['arguments']['uid']['table'] = 'node';
  $handler->display->display_options['arguments']['uid']['field'] = 'uid';
  $handler->display->display_options['arguments']['uid']['default_action'] = 'default';
  $handler->display->display_options['arguments']['uid']['default_argument_type'] = 'current_user';
  $handler->display->display_options['arguments']['uid']['summary']['number_of_records'] = '0';
  $handler->display->display_options['arguments']['uid']['summary']['format'] = 'default_summary';
  $handler->display->display_options['arguments']['uid']['summary_options']['items_per_page'] = '25';
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
    'user_favorite_chemicals' => 'user_favorite_chemicals',
  );

  /* Display: Page */
  $handler = $view->new_display('page', 'Page', 'page');
  $handler->display->display_options['path'] = 'chemical-rules-favorite-chemicals';

  /* Display: Block */
  $handler = $view->new_display('block', 'Block', 'block');
  $handler->display->display_options['defaults']['pager'] = FALSE;
  $handler->display->display_options['pager']['type'] = 'some';
  $handler->display->display_options['pager']['options']['items_per_page'] = '5';
  $handler->display->display_options['defaults']['style_plugin'] = FALSE;
  $handler->display->display_options['style_plugin'] = 'default';
  $handler->display->display_options['defaults']['style_options'] = FALSE;
  $handler->display->display_options['defaults']['row_plugin'] = FALSE;
  $handler->display->display_options['row_plugin'] = 'fields';
  $handler->display->display_options['defaults']['row_options'] = FALSE;
  $export['chemical_rules_favorite_chemicals'] = $view;

  $view = new view();
  $view->name = 'chemical_rules_favorite_laws';
  $view->description = '';
  $view->tag = 'default';
  $view->base_table = 'node';
  $view->human_name = 'Chemical Rules Favorite Laws';
  $view->core = 7;
  $view->api_version = '3.0';
  $view->disabled = FALSE; /* Edit this to true to make a default view disabled initially */

  /* Display: Master */
  $handler = $view->new_display('default', 'Master', 'default');
  $handler->display->display_options['title'] = 'Chemical Rules Favorite Laws';
  $handler->display->display_options['use_more_always'] = FALSE;
  $handler->display->display_options['access']['type'] = 'perm';
  $handler->display->display_options['cache']['type'] = 'none';
  $handler->display->display_options['query']['type'] = 'views_query';
  $handler->display->display_options['exposed_form']['type'] = 'basic';
  $handler->display->display_options['pager']['type'] = 'full';
  $handler->display->display_options['pager']['options']['items_per_page'] = '10';
  $handler->display->display_options['style_plugin'] = 'default';
  $handler->display->display_options['row_plugin'] = 'fields';
  /* Field: Content: Author uid */
  $handler->display->display_options['fields']['uid']['id'] = 'uid';
  $handler->display->display_options['fields']['uid']['table'] = 'node';
  $handler->display->display_options['fields']['uid']['field'] = 'uid';
  $handler->display->display_options['fields']['uid']['label'] = '';
  $handler->display->display_options['fields']['uid']['exclude'] = TRUE;
  $handler->display->display_options['fields']['uid']['element_label_colon'] = FALSE;
  /* Field: Content: Law name */
  $handler->display->display_options['fields']['field_chem_rules_law_name']['id'] = 'field_chem_rules_law_name';
  $handler->display->display_options['fields']['field_chem_rules_law_name']['table'] = 'field_data_field_chem_rules_law_name';
  $handler->display->display_options['fields']['field_chem_rules_law_name']['field'] = 'field_chem_rules_law_name';
  $handler->display->display_options['fields']['field_chem_rules_law_name']['label'] = '';
  $handler->display->display_options['fields']['field_chem_rules_law_name']['exclude'] = TRUE;
  $handler->display->display_options['fields']['field_chem_rules_law_name']['element_label_colon'] = FALSE;
  /* Field: Content: Law URL */
  $handler->display->display_options['fields']['field_chem_rules_law_url']['id'] = 'field_chem_rules_law_url';
  $handler->display->display_options['fields']['field_chem_rules_law_url']['table'] = 'field_data_field_chem_rules_law_url';
  $handler->display->display_options['fields']['field_chem_rules_law_url']['field'] = 'field_chem_rules_law_url';
  $handler->display->display_options['fields']['field_chem_rules_law_url']['label'] = '';
  $handler->display->display_options['fields']['field_chem_rules_law_url']['alter']['alter_text'] = TRUE;
  $handler->display->display_options['fields']['field_chem_rules_law_url']['alter']['text'] = '<a href="[field_chem_rules_law_url]" rel="external" target="_blank">[field_chem_rules_law_name]</a>';
  $handler->display->display_options['fields']['field_chem_rules_law_url']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['field_chem_rules_law_url']['settings'] = array(
    'trim_length' => '80',
    'nofollow' => 0,
  );
  /* Sort criterion: Content: Post date */
  $handler->display->display_options['sorts']['created']['id'] = 'created';
  $handler->display->display_options['sorts']['created']['table'] = 'node';
  $handler->display->display_options['sorts']['created']['field'] = 'created';
  $handler->display->display_options['sorts']['created']['order'] = 'DESC';
  /* Contextual filter: Content: Author uid */
  $handler->display->display_options['arguments']['uid']['id'] = 'uid';
  $handler->display->display_options['arguments']['uid']['table'] = 'node';
  $handler->display->display_options['arguments']['uid']['field'] = 'uid';
  $handler->display->display_options['arguments']['uid']['default_action'] = 'default';
  $handler->display->display_options['arguments']['uid']['default_argument_type'] = 'current_user';
  $handler->display->display_options['arguments']['uid']['summary']['number_of_records'] = '0';
  $handler->display->display_options['arguments']['uid']['summary']['format'] = 'default_summary';
  $handler->display->display_options['arguments']['uid']['summary_options']['items_per_page'] = '25';
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
    'user_favorite_laws' => 'user_favorite_laws',
  );

  /* Display: Page */
  $handler = $view->new_display('page', 'Page', 'page');
  $handler->display->display_options['path'] = 'chemical-rules-favorite-laws';

  /* Display: Block */
  $handler = $view->new_display('block', 'Block', 'block');
  $handler->display->display_options['defaults']['pager'] = FALSE;
  $handler->display->display_options['pager']['type'] = 'some';
  $handler->display->display_options['pager']['options']['items_per_page'] = '5';
  $handler->display->display_options['defaults']['style_plugin'] = FALSE;
  $handler->display->display_options['style_plugin'] = 'default';
  $handler->display->display_options['defaults']['style_options'] = FALSE;
  $handler->display->display_options['defaults']['row_plugin'] = FALSE;
  $handler->display->display_options['row_plugin'] = 'fields';
  $handler->display->display_options['defaults']['row_options'] = FALSE;
  $export['chemical_rules_favorite_laws'] = $view;

  return $export;
}
