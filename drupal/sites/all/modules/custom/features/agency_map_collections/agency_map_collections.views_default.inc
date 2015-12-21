<?php
/**
 * @file
 * agency_map_collections.views_default.inc
 */

/**
 * Implements hook_views_default_views().
 */
function agency_map_collections_views_default_views() {
  $export = array();

  $view = new view();
  $view->name = 'agency_map_list';
  $view->description = '';
  $view->tag = 'default';
  $view->base_table = 'node';
  $view->human_name = 'Agency Map List';
  $view->core = 7;
  $view->api_version = '3.0';
  $view->disabled = FALSE; /* Edit this to true to make a default view disabled initially */

  /* Display: Master */
  $handler = $view->new_display('default', 'Master', 'default');
  $handler->display->display_options['title'] = 'Agency Map Collections';
  $handler->display->display_options['use_ajax'] = TRUE;
  $handler->display->display_options['use_more_always'] = FALSE;
  $handler->display->display_options['access']['type'] = 'perm';
  $handler->display->display_options['cache']['type'] = 'none';
  $handler->display->display_options['query']['type'] = 'views_query';
  $handler->display->display_options['exposed_form']['type'] = 'basic';
  $handler->display->display_options['pager']['type'] = 'full';
  $handler->display->display_options['pager']['options']['items_per_page'] = '10';
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
  /* Header: Global: Text area */
  $handler->display->display_options['header']['area']['id'] = 'area';
  $handler->display->display_options['header']['area']['table'] = 'views';
  $handler->display->display_options['header']['area']['field'] = 'area';
  $handler->display->display_options['header']['area']['empty'] = TRUE;
  $handler->display->display_options['header']['area']['content'] = '<a href="/new-agency-map" class="button primary-action">Add an agency map collection</a>';
  $handler->display->display_options['header']['area']['format'] = 'full_html';
  /* Field: Content: Agency map URL */
  $handler->display->display_options['fields']['field_ee_agency_map_url_1']['id'] = 'field_ee_agency_map_url_1';
  $handler->display->display_options['fields']['field_ee_agency_map_url_1']['table'] = 'field_data_field_ee_agency_map_url';
  $handler->display->display_options['fields']['field_ee_agency_map_url_1']['field'] = 'field_ee_agency_map_url';
  $handler->display->display_options['fields']['field_ee_agency_map_url_1']['label'] = '';
  $handler->display->display_options['fields']['field_ee_agency_map_url_1']['exclude'] = TRUE;
  $handler->display->display_options['fields']['field_ee_agency_map_url_1']['alter']['strip_tags'] = TRUE;
  $handler->display->display_options['fields']['field_ee_agency_map_url_1']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['field_ee_agency_map_url_1']['settings'] = array(
    'trim_length' => '80',
    'nofollow' => 0,
  );
  /* Field: Content: Agency */
  $handler->display->display_options['fields']['field_ee_agency_map_agency']['id'] = 'field_ee_agency_map_agency';
  $handler->display->display_options['fields']['field_ee_agency_map_agency']['table'] = 'field_data_field_ee_agency_map_agency';
  $handler->display->display_options['fields']['field_ee_agency_map_agency']['field'] = 'field_ee_agency_map_agency';
  /* Field: Content: Agency map URL */
  $handler->display->display_options['fields']['field_ee_agency_map_url']['id'] = 'field_ee_agency_map_url';
  $handler->display->display_options['fields']['field_ee_agency_map_url']['table'] = 'field_data_field_ee_agency_map_url';
  $handler->display->display_options['fields']['field_ee_agency_map_url']['field'] = 'field_ee_agency_map_url';
  $handler->display->display_options['fields']['field_ee_agency_map_url']['settings'] = array(
    'trim_length' => '80',
    'nofollow' => 0,
  );
  /* Field: Content: Nid */
  $handler->display->display_options['fields']['nid']['id'] = 'nid';
  $handler->display->display_options['fields']['nid']['table'] = 'node';
  $handler->display->display_options['fields']['nid']['field'] = 'nid';
  $handler->display->display_options['fields']['nid']['exclude'] = TRUE;
  /* Field: Content: orgid */
  $handler->display->display_options['fields']['field_orgid']['id'] = 'field_orgid';
  $handler->display->display_options['fields']['field_orgid']['table'] = 'field_data_field_orgid';
  $handler->display->display_options['fields']['field_orgid']['field'] = 'field_orgid';
  $handler->display->display_options['fields']['field_orgid']['exclude'] = TRUE;
  /* Field: Content: Agency contact email */
  $handler->display->display_options['fields']['field_ee_agency_map_email']['id'] = 'field_ee_agency_map_email';
  $handler->display->display_options['fields']['field_ee_agency_map_email']['table'] = 'field_data_field_ee_agency_map_email';
  $handler->display->display_options['fields']['field_ee_agency_map_email']['field'] = 'field_ee_agency_map_email';
  /* Field: Content: owner */
  $handler->display->display_options['fields']['field_owner']['id'] = 'field_owner';
  $handler->display->display_options['fields']['field_owner']['table'] = 'field_data_field_owner';
  $handler->display->display_options['fields']['field_owner']['field'] = 'field_owner';
  $handler->display->display_options['fields']['field_owner']['label'] = 'Owner';
  /* Field: Content: state */
  $handler->display->display_options['fields']['field_state']['id'] = 'field_state';
  $handler->display->display_options['fields']['field_state']['table'] = 'field_data_field_state';
  $handler->display->display_options['fields']['field_state']['field'] = 'field_state';
  $handler->display->display_options['fields']['field_state']['label'] = 'State';
  /* Field: Content: Edit link */
  $handler->display->display_options['fields']['edit_node']['id'] = 'edit_node';
  $handler->display->display_options['fields']['edit_node']['table'] = 'views_entity_node';
  $handler->display->display_options['fields']['edit_node']['field'] = 'edit_node';
  $handler->display->display_options['fields']['edit_node']['label'] = 'Actions';
  $handler->display->display_options['fields']['edit_node']['alter']['alter_text'] = TRUE;
  $handler->display->display_options['fields']['edit_node']['alter']['text'] = 'Edit';
  $handler->display->display_options['fields']['edit_node']['alter']['make_link'] = TRUE;
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
    'agency_map' => 'agency_map',
  );
  /* Filter criterion: Global: PHP */
  $handler->display->display_options['filters']['php']['id'] = 'php';
  $handler->display->display_options['filters']['php']['table'] = 'views';
  $handler->display->display_options['filters']['php']['field'] = 'php';
  $handler->display->display_options['filters']['php']['use_php_setup'] = 0;
  $handler->display->display_options['filters']['php']['php_filter'] = 'global $user;

if ($user->uid > 1) {
    if (in_array(\'state_admin\', $user->roles)) {
        $user_data = user_load($user->uid);
        $user_state = $user_data->field_admin_state[LANGUAGE_NONE][0][\'safe_value\'];
        $thisData = node_load($data->nid);
        $row_state = $thisData->field_state[LANGUAGE_NONE][0][\'safe_value\'];
        if ($row_state === $user_state) {
            return FALSE;
        } else {
            return TRUE;
        }
    } else {
        return TRUE;
    }
} else {
    return FALSE;
}';

  /* Display: Page */
  $handler = $view->new_display('page', 'Page', 'page');
  $handler->display->display_options['path'] = 'agency-map-list';
  $export['agency_map_list'] = $view;

  $view = new view();
  $view->name = 'new_agency_map';
  $view->description = '';
  $view->tag = 'default';
  $view->base_table = 'node';
  $view->human_name = 'New Agency Map';
  $view->core = 7;
  $view->api_version = '3.0';
  $view->disabled = FALSE; /* Edit this to true to make a default view disabled initially */

  /* Display: Master */
  $handler = $view->new_display('default', 'Master', 'default');
  $handler->display->display_options['title'] = 'New Agency Map Collection';
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
  $handler->display->display_options['path'] = 'new-agency-map';
  $export['new_agency_map'] = $view;

  return $export;
}
