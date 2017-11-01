<?php
/**
 * Created by PhpStorm.
 * User: smolinsk
 * Date: 11/1/2017
 * Time: 10:20 AM
 */


// Paste code form views export.
$view = new view();
$view->name = 'esmt_service_provider';
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
$handler->display->display_options['style_options']['row_class'] = 'esmt-service-provider-item line';
$handler->display->display_options['style_options']['wrapper_class'] = 'esmt-service-provider-item-list item-list';
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
$handler->display->display_options['fields']['esmt_service_instructions']['id'] = 'esmt_service_instructions';
$handler->display->display_options['fields']['esmt_service_instructions']['table'] = 'field_data_esmt_service_instructions';
$handler->display->display_options['fields']['esmt_service_instructions']['field'] = 'esmt_service_instructions';
$handler->display->display_options['fields']['esmt_service_instructions']['label'] = 'Instructions';
$handler->display->display_options['fields']['esmt_service_instructions']['alter']['alter_text'] = TRUE;
$handler->display->display_options['fields']['esmt_service_instructions']['element_wrapper_type'] = 'div';
$handler->display->display_options['fields']['esmt_service_instructions']['element_wrapper_class'] = 'col-sm-4';
/* Field: Content: Service Action Link */
$handler->display->display_options['fields']['esmt_service_action_link']['id'] = 'esmt_service_action_link';
$handler->display->display_options['fields']['esmt_service_action_link']['table'] = 'field_data_esmt_service_action_link';
$handler->display->display_options['fields']['esmt_service_action_link']['field'] = 'esmt_service_action_link';
$handler->display->display_options['fields']['esmt_service_action_link']['label'] = '';
$handler->display->display_options['fields']['esmt_service_action_link']['alter']['alter_text'] = TRUE;
$handler->display->display_options['fields']['esmt_service_action_link']['alter']['text'] = '<a class="button usa-button" href=\'[esmt_service_action_link-value]\'>Customize</a>';
$handler->display->display_options['fields']['esmt_service_action_link']['alter']['trim_whitespace'] = TRUE;
$handler->display->display_options['fields']['esmt_service_action_link']['element_label_colon'] = FALSE;
$handler->display->display_options['fields']['esmt_service_action_link']['element_wrapper_type'] = 'div';
$handler->display->display_options['fields']['esmt_service_action_link']['element_wrapper_class'] = 'col-sm-4';
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
  'esmt_service_provider' => 'esmt_service_provider',
);

/* Display: E-Enterprise Partner Area */
$handler = $view->new_display('page', 'E-Enterprise Partner Area', 'page');
$handler->display->display_options['display_description'] = 'Want to participate in an E-Enterprise shared service? Below you’ll find information about each service that can be customized f';
$handler->display->display_options['path'] = 'esmt-service-provider';

/* Display: Block */
$handler = $view->new_display('block', 'Block', 'block_1');