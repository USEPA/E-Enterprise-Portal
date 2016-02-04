<?php
/**
 * @file
 * faqs_and_views.views_default.inc
 */

/**
 * Implements hook_views_default_views().
 */
function faqs_and_views_views_default_views() {
  $export = array();

  $view = new view();
  $view->name = 'faqs';
  $view->description = '';
  $view->tag = 'default';
  $view->base_table = 'node';
  $view->human_name = 'FAQs';
  $view->core = 7;
  $view->api_version = '3.0';
  $view->disabled = FALSE; /* Edit this to true to make a default view disabled initially */

  /* Display: Master */
  $handler = $view->new_display('default', 'Master', 'default');
  $handler->display->display_options['title'] = 'FAQs';
  $handler->display->display_options['use_more_always'] = FALSE;
  $handler->display->display_options['access']['type'] = 'perm';
  $handler->display->display_options['cache']['type'] = 'none';
  $handler->display->display_options['query']['type'] = 'views_query';
  $handler->display->display_options['exposed_form']['type'] = 'basic';
  $handler->display->display_options['pager']['type'] = 'none';
  $handler->display->display_options['style_plugin'] = 'default';
  $handler->display->display_options['style_options']['grouping'] = array(
    0 => array(
      'field' => 'field_faq_category',
      'rendered' => 1,
      'rendered_strip' => 1,
    ),
  );
  $handler->display->display_options['style_options']['default_row_class'] = FALSE;
  $handler->display->display_options['style_options']['row_class_special'] = FALSE;
  $handler->display->display_options['row_plugin'] = 'fields';
  /* Header: Global: PHP */
  $handler->display->display_options['header']['php']['id'] = 'php';
  $handler->display->display_options['header']['php']['table'] = 'views';
  $handler->display->display_options['header']['php']['field'] = 'php';
  $handler->display->display_options['header']['php']['php_output'] = '<h2>On This Page</h2>';
  /* Field: Content: Title */
  $handler->display->display_options['fields']['title']['id'] = 'title';
  $handler->display->display_options['fields']['title']['table'] = 'node';
  $handler->display->display_options['fields']['title']['field'] = 'title';
  $handler->display->display_options['fields']['title']['label'] = '';
  $handler->display->display_options['fields']['title']['alter']['alter_text'] = TRUE;
  $handler->display->display_options['fields']['title']['alter']['text'] = '<h4>[title]</h4>';
  $handler->display->display_options['fields']['title']['alter']['word_boundary'] = FALSE;
  $handler->display->display_options['fields']['title']['alter']['ellipsis'] = FALSE;
  $handler->display->display_options['fields']['title']['alter']['strip_tags'] = TRUE;
  $handler->display->display_options['fields']['title']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['title']['link_to_node'] = FALSE;
  /* Field: Content: Answer */
  $handler->display->display_options['fields']['field_faq_answer']['id'] = 'field_faq_answer';
  $handler->display->display_options['fields']['field_faq_answer']['table'] = 'field_data_field_faq_answer';
  $handler->display->display_options['fields']['field_faq_answer']['field'] = 'field_faq_answer';
  $handler->display->display_options['fields']['field_faq_answer']['label'] = '';
  $handler->display->display_options['fields']['field_faq_answer']['element_label_colon'] = FALSE;
  /* Field: Content: FAQ Category */
  $handler->display->display_options['fields']['field_faq_category']['id'] = 'field_faq_category';
  $handler->display->display_options['fields']['field_faq_category']['table'] = 'field_data_field_faq_category';
  $handler->display->display_options['fields']['field_faq_category']['field'] = 'field_faq_category';
  $handler->display->display_options['fields']['field_faq_category']['label'] = '';
  $handler->display->display_options['fields']['field_faq_category']['exclude'] = TRUE;
  $handler->display->display_options['fields']['field_faq_category']['alter']['strip_tags'] = TRUE;
  $handler->display->display_options['fields']['field_faq_category']['element_label_colon'] = FALSE;
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
    'ee_faqs' => 'ee_faqs',
  );

  /* Display: Page */
  $handler = $view->new_display('page', 'Page', 'page');
  $handler->display->display_options['defaults']['header'] = FALSE;
  /* Header: Global: PHP */
  $handler->display->display_options['header']['php']['id'] = 'php';
  $handler->display->display_options['header']['php']['table'] = 'views';
  $handler->display->display_options['header']['php']['field'] = 'php';
  $handler->display->display_options['header']['php']['php_output'] = '<h2>On This Page</h2>';
  /* Header: Global: View area */
  $handler->display->display_options['header']['view']['id'] = 'view';
  $handler->display->display_options['header']['view']['table'] = 'views';
  $handler->display->display_options['header']['view']['field'] = 'view';
  $handler->display->display_options['header']['view']['view_to_insert'] = 'faqs:entityreference_1';
  $handler->display->display_options['defaults']['fields'] = FALSE;
  /* Field: Content: Title */
  $handler->display->display_options['fields']['title']['id'] = 'title';
  $handler->display->display_options['fields']['title']['table'] = 'node';
  $handler->display->display_options['fields']['title']['field'] = 'title';
  $handler->display->display_options['fields']['title']['label'] = '';
  $handler->display->display_options['fields']['title']['alter']['alter_text'] = TRUE;
  $handler->display->display_options['fields']['title']['alter']['text'] = '<h4>[title]</h4>';
  $handler->display->display_options['fields']['title']['alter']['word_boundary'] = FALSE;
  $handler->display->display_options['fields']['title']['alter']['ellipsis'] = FALSE;
  $handler->display->display_options['fields']['title']['alter']['strip_tags'] = TRUE;
  $handler->display->display_options['fields']['title']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['title']['link_to_node'] = FALSE;
  /* Field: Content: Answer */
  $handler->display->display_options['fields']['field_faq_answer']['id'] = 'field_faq_answer';
  $handler->display->display_options['fields']['field_faq_answer']['table'] = 'field_data_field_faq_answer';
  $handler->display->display_options['fields']['field_faq_answer']['field'] = 'field_faq_answer';
  $handler->display->display_options['fields']['field_faq_answer']['label'] = '';
  $handler->display->display_options['fields']['field_faq_answer']['element_label_colon'] = FALSE;
  /* Field: Content: FAQ Category */
  $handler->display->display_options['fields']['field_faq_category']['id'] = 'field_faq_category';
  $handler->display->display_options['fields']['field_faq_category']['table'] = 'field_data_field_faq_category';
  $handler->display->display_options['fields']['field_faq_category']['field'] = 'field_faq_category';
  $handler->display->display_options['fields']['field_faq_category']['label'] = '';
  $handler->display->display_options['fields']['field_faq_category']['exclude'] = TRUE;
  $handler->display->display_options['fields']['field_faq_category']['alter']['strip_tags'] = TRUE;
  $handler->display->display_options['fields']['field_faq_category']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['field_faq_category']['element_default_classes'] = FALSE;
  $handler->display->display_options['fields']['field_faq_category']['type'] = 'taxonomy_term_reference_plain';
  $handler->display->display_options['defaults']['sorts'] = FALSE;
  /* Sort criterion: Content: FAQ Category (field_faq_category) */
  $handler->display->display_options['sorts']['field_faq_category_tid']['id'] = 'field_faq_category_tid';
  $handler->display->display_options['sorts']['field_faq_category_tid']['table'] = 'field_data_field_faq_category';
  $handler->display->display_options['sorts']['field_faq_category_tid']['field'] = 'field_faq_category_tid';
  $handler->display->display_options['path'] = 'faqs';

  /* Display: Entity Reference */
  $handler = $view->new_display('entityreference', 'Entity Reference', 'entityreference_1');
  $handler->display->display_options['defaults']['title'] = FALSE;
  $handler->display->display_options['defaults']['group_by'] = FALSE;
  $handler->display->display_options['group_by'] = TRUE;
  $handler->display->display_options['pager']['type'] = 'some';
  $handler->display->display_options['defaults']['style_plugin'] = FALSE;
  $handler->display->display_options['style_plugin'] = 'entityreference_style';
  $handler->display->display_options['style_options']['search_fields'] = array(
    'field_faq_category' => 'field_faq_category',
    'title' => 0,
    'field_faq_answer' => 0,
  );
  $handler->display->display_options['defaults']['style_options'] = FALSE;
  $handler->display->display_options['defaults']['row_plugin'] = FALSE;
  $handler->display->display_options['row_plugin'] = 'entityreference_fields';
  $handler->display->display_options['defaults']['row_options'] = FALSE;
  $handler->display->display_options['defaults']['fields'] = FALSE;
  /* Field: Content: FAQ Category */
  $handler->display->display_options['fields']['field_faq_category']['id'] = 'field_faq_category';
  $handler->display->display_options['fields']['field_faq_category']['table'] = 'field_data_field_faq_category';
  $handler->display->display_options['fields']['field_faq_category']['field'] = 'field_faq_category';
  $handler->display->display_options['fields']['field_faq_category']['label'] = '';
  $handler->display->display_options['fields']['field_faq_category']['alter']['alter_text'] = TRUE;
  $handler->display->display_options['fields']['field_faq_category']['alter']['text'] = '<a href="#[field_faq_category-tid]">[field_faq_category]</a>';
  $handler->display->display_options['fields']['field_faq_category']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['field_faq_category']['type'] = 'taxonomy_term_reference_plain';
  $export['faqs'] = $view;

  return $export;
}
