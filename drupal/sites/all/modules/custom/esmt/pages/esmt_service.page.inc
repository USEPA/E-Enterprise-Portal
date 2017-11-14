<?php

$page = new stdClass();
$page->disabled = FALSE; /* Edit this to true to make a default page disabled initially */
$page->api_version = 1;
$page->name = 'esmt_service_provider';
$page->task = 'page';
$page->admin_title = 'E-Enterprise Partner Area';
$page->admin_description = 'partner services page';
$page->path = 'esmt-service';
$page->access = array();
$page->menu = array();
$page->arguments = array();
$page->conf = array(
  'admin_paths' => FALSE,
);
$page->default_handlers = array();
$handler = new stdClass();
$handler->disabled = FALSE; /* Edit this to true to make a default handler disabled initially */
$handler->api_version = 1;
$handler->name = 'page_esmt_service__panel';
$handler->task = 'page';
$handler->subtask = 'esmt_service';
$handler->handler = 'panel_context';
$handler->weight = 0;
$handler->conf = array(
  'title' => 'Panel',
  'no_blocks' => 0,
  'pipeline' => 'standard',
  'body_classes_to_remove' => '',
  'body_classes_to_add' => '',
  'css_id' => 'esmt-service',
  'css' => '',
  'contexts' => array(),
  'relationships' => array(),
  'name' => 'panel',
);
$display = new panels_display();
$display->layout = 'flexible';
$display->layout_settings = array();
$display->panel_settings = array(
  'style_settings' => array(
    'default' => NULL,
    'center' => NULL,
  ),
);
$display->cache = array();
$display->title = 'Partner Area Introduction';
$display->uuid = '4c354fbf-14b0-4f6b-bd5d-d58cabef51de';
$display->content = array();
$display->panels = array();
$pane = new stdClass();
$pane->pid = 'new-1c34dd44-d422-4bc6-bdfe-69442ef42353';
$pane->panel = 'center';
$pane->type = 'custom';
$pane->subtype = 'custom';
$pane->shown = TRUE;
$pane->access = array();
$pane->configuration = array(
  'admin_title' => 'esmt-service',
  'title' => 'E-Enterprise Partner Area',
  'body' => '<div><strong>Want to participate in an E-Enterprise shared service?</strong></div><div>&nbsp;</div><div>Below you’ll find information about each service that can be customized for your area, along with templates and</div><div>instructions. You can manage and configure your service participation.</div>',
  'format' => 'full_html',
  'substitute' => TRUE,
);
$pane->cache = array();
$pane->style = array(
  'settings' => NULL,
);
$pane->css = array();
$pane->extras = array();
$pane->position = 0;
$pane->locks = array();
$pane->uuid = '1c34dd44-d422-4bc6-bdfe-69442ef42353';
$display->content['new-1c34dd44-d422-4bc6-bdfe-69442ef42353'] = $pane;
$display->panels['center'][0] = 'new-1c34dd44-d422-4bc6-bdfe-69442ef42353';
$pane = new stdClass();
$pane->pid = 'new-891677a6-7417-4479-bc1c-9cc09118cbb1';
$pane->panel = 'center';
$pane->type = 'block';
$pane->subtype = 'views-a6d071593e4132b9aa1c7cd60b757889';
$pane->shown = TRUE;
$pane->access = array();
$pane->configuration = array(
  'override_title' => 0,
  'override_title_text' => '',
  'override_title_heading' => 'h2',
);
$pane->cache = array();
$pane->style = array(
  'settings' => NULL,
);
$pane->css = array();
$pane->extras = array();
$pane->position = 1;
$pane->locks = array();
$pane->uuid = '891677a6-7417-4479-bc1c-9cc09118cbb1';
$display->content['new-891677a6-7417-4479-bc1c-9cc09118cbb1'] = $pane;
$display->panels['center'][1] = 'new-891677a6-7417-4479-bc1c-9cc09118cbb1';
$display->hide_title = PANELS_TITLE_NONE;
$display->title_pane = 'new-1c34dd44-d422-4bc6-bdfe-69442ef42353';
$handler->conf['display'] = $display;
$page->default_handlers[$handler->name] = $handler;