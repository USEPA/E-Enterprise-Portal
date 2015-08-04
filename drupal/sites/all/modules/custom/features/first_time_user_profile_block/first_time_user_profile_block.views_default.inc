<?php
/**
 * @file
 * first_time_user_profile_block.views_default.inc
 */

/**
 * Implements hook_views_default_views().
 */
function first_time_user_profile_block_views_default_views() {
  $export = array();

  $view = new view();
  $view->name = 'first_time_user_profile';
  $view->description = '';
  $view->tag = 'default';
  $view->base_table = 'users';
  $view->human_name = 'First Time User Profile';
  $view->core = 7;
  $view->api_version = '3.0';
  $view->disabled = FALSE; /* Edit this to true to make a default view disabled initially */

  /* Display: Master */
  $handler = $view->new_display('default', 'Master', 'default');
  $handler->display->display_options['title'] = 'First Time User Profile';
  $handler->display->display_options['use_more_always'] = FALSE;
  $handler->display->display_options['access']['type'] = 'perm';
  $handler->display->display_options['access']['perm'] = 'access user profiles';
  $handler->display->display_options['cache']['type'] = 'none';
  $handler->display->display_options['query']['type'] = 'views_query';
  $handler->display->display_options['exposed_form']['type'] = 'basic';
  $handler->display->display_options['pager']['type'] = 'full';
  $handler->display->display_options['pager']['options']['items_per_page'] = '10';
  $handler->display->display_options['style_plugin'] = 'editableviews_table';
  $handler->display->display_options['style_options']['columns'] = array(
    'field_zip_code_editable' => 'field_zip_code_editable',
  );
  $handler->display->display_options['style_options']['default'] = '-1';
  $handler->display->display_options['style_options']['info'] = array(
    'field_zip_code_editable' => array(
      'align' => '',
      'separator' => '',
      'empty_column' => 0,
    ),
  );
  /* Field: User: Zip Code (editable) */
  $handler->display->display_options['fields']['field_zip_code_editable']['id'] = 'field_zip_code_editable';
  $handler->display->display_options['fields']['field_zip_code_editable']['table'] = 'field_data_field_zip_code';
  $handler->display->display_options['fields']['field_zip_code_editable']['field'] = 'field_zip_code_editable';
  $handler->display->display_options['fields']['field_zip_code_editable']['click_sort_column'] = 'field_field_primary_value';
  $handler->display->display_options['fields']['field_zip_code_editable']['settings'] = array(
    'view_mode' => 'default',
  );
  $handler->display->display_options['fields']['field_zip_code_editable']['delta_offset'] = '0';
  $handler->display->display_options['fields']['field_zip_code_editable']['widget_type'] = '0';
  $handler->display->display_options['fields']['field_zip_code_editable']['suppress_label'] = 0;
  $handler->display->display_options['fields']['field_zip_code_editable']['suppress_description'] = 0;
  /* Field: User: Interests (editable) */
  $handler->display->display_options['fields']['field_profile_interests_editable']['id'] = 'field_profile_interests_editable';
  $handler->display->display_options['fields']['field_profile_interests_editable']['table'] = 'field_data_field_profile_interests';
  $handler->display->display_options['fields']['field_profile_interests_editable']['field'] = 'field_profile_interests_editable';
  $handler->display->display_options['fields']['field_profile_interests_editable']['delta_offset'] = '0';
  $handler->display->display_options['fields']['field_profile_interests_editable']['widget_type'] = '0';
  $handler->display->display_options['fields']['field_profile_interests_editable']['suppress_label'] = 0;
  $handler->display->display_options['fields']['field_profile_interests_editable']['suppress_description'] = 0;
  /* Sort criterion: User: Created date */
  $handler->display->display_options['sorts']['created']['id'] = 'created';
  $handler->display->display_options['sorts']['created']['table'] = 'users';
  $handler->display->display_options['sorts']['created']['field'] = 'created';
  $handler->display->display_options['sorts']['created']['order'] = 'DESC';
  /* Filter criterion: User: Current */
  $handler->display->display_options['filters']['uid_current']['id'] = 'uid_current';
  $handler->display->display_options['filters']['uid_current']['table'] = 'users';
  $handler->display->display_options['filters']['uid_current']['field'] = 'uid_current';
  $handler->display->display_options['filters']['uid_current']['value'] = '1';

  /* Display: Page */
  $handler = $view->new_display('page', 'Page', 'page');
  $handler->display->display_options['path'] = 'first-time-user-profile';

  /* Display: Block */
  $handler = $view->new_display('block', 'Block', 'block');
  $handler->display->display_options['defaults']['pager'] = FALSE;
  $handler->display->display_options['pager']['type'] = 'some';
  $handler->display->display_options['pager']['options']['items_per_page'] = '5';
  $export['first_time_user_profile'] = $view;

  return $export;
}
