<?php
/**
 * Created by PhpStorm.
 * User: smolinsk
 * Date: 10/26/2017
 * Time: 1:15 PM
 */


/**
 * Implements hook_views_default_views().
 */
function partner_area_views_default_views() {
  // Paste code form views export.
  $view = new view();
  $view->name = 'partner_service_provider';
  $view->description = '';
  $view->tag = 'default';
  $view->base_table = 'node';
  $view->human_name = 'Partner Service Provider';
  $view->core = 7;
  $view->api_version = '3.0';
  $view->disabled = FALSE; /* Edit this to true to make a default view disabled initially */

  /* Display: Master */
  $handler = $view->new_display('default', 'Master', 'default');
  $handler->display->display_options['css_class'] = 'ee-grid';
  $handler->display->display_options['use_more_always'] = FALSE;
  $handler->display->display_options['access']['type'] = 'perm';
  $handler->display->display_options['cache']['type'] = 'none';
  $handler->display->display_options['query']['type'] = 'views_query';
  $handler->display->display_options['exposed_form']['type'] = 'basic';
  $handler->display->display_options['pager']['type'] = 'full';
  $handler->display->display_options['pager']['options']['items_per_page'] = '25';
  $handler->display->display_options['style_plugin'] = 'list';
  $handler->display->display_options['style_options']['row_class'] = 'partner-service-provider-item line';
  $handler->display->display_options['style_options']['wrapper_class'] = 'partner-service-provider-item-list item-list';
  $handler->display->display_options['row_plugin'] = 'fields';
  /* Field: Content: Title */
  $handler->display->display_options['fields']['title']['id'] = 'title';
  $handler->display->display_options['fields']['title']['table'] = 'node';
  $handler->display->display_options['fields']['title']['field'] = 'title';
  $handler->display->display_options['fields']['title']['label'] = 'Service';
  $handler->display->display_options['fields']['title']['alter']['word_boundary'] = FALSE;
  $handler->display->display_options['fields']['title']['alter']['ellipsis'] = FALSE;
  $handler->display->display_options['fields']['title']['element_type'] = 'div';
  $handler->display->display_options['fields']['title']['element_wrapper_type'] = 'div';
  $handler->display->display_options['fields']['title']['element_wrapper_class'] = 'col-sm-4';
  $handler->display->display_options['fields']['title']['link_to_node'] = FALSE;
  /* Field: Content: Service Instructions */
  $handler->display->display_options['fields']['partner_service_instructions']['id'] = 'partner_service_instructions';
  $handler->display->display_options['fields']['partner_service_instructions']['table'] = 'field_data_partner_service_instructions';
  $handler->display->display_options['fields']['partner_service_instructions']['field'] = 'partner_service_instructions';
  $handler->display->display_options['fields']['partner_service_instructions']['label'] = 'Instructions';
  $handler->display->display_options['fields']['partner_service_instructions']['alter']['alter_text'] = TRUE;
  $handler->display->display_options['fields']['partner_service_instructions']['element_wrapper_type'] = 'div';
  $handler->display->display_options['fields']['partner_service_instructions']['element_wrapper_class'] = 'col-sm-4';
  /* Field: Content: Service Action Link */
  $handler->display->display_options['fields']['partner_service_action_link']['id'] = 'partner_service_action_link';
  $handler->display->display_options['fields']['partner_service_action_link']['table'] = 'field_data_partner_service_action_link';
  $handler->display->display_options['fields']['partner_service_action_link']['field'] = 'partner_service_action_link';
  $handler->display->display_options['fields']['partner_service_action_link']['label'] = '';
  $handler->display->display_options['fields']['partner_service_action_link']['alter']['alter_text'] = TRUE;
  $handler->display->display_options['fields']['partner_service_action_link']['alter']['text'] = '<a class="button usa-button" href=\'[partner_service_action_link-value]\'>Customize</a>';
  $handler->display->display_options['fields']['partner_service_action_link']['alter']['trim_whitespace'] = TRUE;
  $handler->display->display_options['fields']['partner_service_action_link']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['partner_service_action_link']['element_wrapper_type'] = 'div';
  $handler->display->display_options['fields']['partner_service_action_link']['element_wrapper_class'] = 'col-sm-4';
  /* Sort criterion: Content: Title */
  $handler->display->display_options['sorts']['title']['id'] = 'title';
  $handler->display->display_options['sorts']['title']['table'] = 'node';
  $handler->display->display_options['sorts']['title']['field'] = 'title';
  $handler->display->display_options['sorts']['title']['order'] = 'DESC';
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
    'partner_service_provider' => 'partner_service_provider',
  );

  /* Display: E-Enterprise Partner Area */
  $handler = $view->new_display('page', 'E-Enterprise Partner Area', 'page');
  $handler->display->display_options['display_description'] = 'Want to participate in an E-Enterprise shared service? Below you’ll find information about each service that can be customized f';
  $handler->display->display_options['path'] = 'partner-service-provider';

  /* Display: Block */
  $handler = $view->new_display('block', 'Block', 'block_1');

  $views[$view->name] = $view;
  return $views;
}