<?php
/**
 * @file
 * app_connect.pages_default.inc
 */

/**
 * Implements hook_default_page_manager_pages().
 */
function app_connect_default_page_manager_pages() {
  $page = new stdClass();
  $page->disabled = FALSE; /* Edit this to true to make a default page disabled initially */
  $page->api_version = 1;
  $page->name = 'app_connect';
  $page->task = 'page';
  $page->admin_title = 'App Connect';
  $page->admin_description = 'App Connect page that will include lists of services, announcements, messages from EPA (e.g., MyCDX) and in the future State, Tribal, and Local.';
  $page->path = 'app-connect';
  $page->access = array(
    'logic' => 'and',
    'plugins' => array(
      0 => array(
        'name' => 'role',
        'settings' => array(
          'rids' => array(
            0 => 179002433,
          ),
        ),
        'context' => 'logged-in-user',
        'not' => FALSE,
      ),
    ),
  );
  $page->menu = array(
    'type' => 'none',
    'title' => 'App Connect',
    'name' => 'main-menu',
    'weight' => '0',
    'parent' => array(
      'type' => 'none',
      'title' => '',
      'name' => 'navigation',
      'weight' => '0',
    ),
  );
  $page->arguments = array();
  $page->conf = array(
    'admin_paths' => FALSE,
  );
  $page->default_handlers = array();
  $handler = new stdClass();
  $handler->disabled = FALSE; /* Edit this to true to make a default handler disabled initially */
  $handler->api_version = 1;
  $handler->name = 'page_app_connect__panel_context_eda28842-400f-42e1-a338-9b0ea3a34feb';
  $handler->task = 'page';
  $handler->subtask = 'app_connect';
  $handler->handler = 'panel_context';
  $handler->weight = 0;
  $handler->conf = array(
    'title' => 'Panel',
    'no_blocks' => 0,
    'pipeline' => 'standard',
    'body_classes_to_remove' => '',
    'body_classes_to_add' => 'app-connect',
    'css_id' => '',
    'css' => '',
    'contexts' => array(),
    'relationships' => array(),
  );
  $display = new panels_display();
  $display->layout = 'onecol';
  $display->layout_settings = array();
  $display->panel_settings = array(
    'style_settings' => array(
      'default' => NULL,
      'middle' => NULL,
    ),
  );
  $display->cache = array();
  $display->title = '';
  $display->uuid = '5d4dab3c-608b-4d8f-b74e-7a334fce615d';
  $display->content = array();
  $display->panels = array();
    $pane = new stdClass();
    $pane->pid = 'new-bb40992e-6285-4f83-bc42-cb6c2ec3a570';
    $pane->panel = 'middle';
    $pane->type = 'block';
    $pane->subtype = 'my_cdx-my_cdx';
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
    $pane->position = 0;
    $pane->locks = array();
    $pane->uuid = 'bb40992e-6285-4f83-bc42-cb6c2ec3a570';
    $display->content['new-bb40992e-6285-4f83-bc42-cb6c2ec3a570'] = $pane;
    $display->panels['middle'][0] = 'new-bb40992e-6285-4f83-bc42-cb6c2ec3a570';
  $display->hide_title = PANELS_TITLE_NONE;
  $display->title_pane = '0';
  $handler->conf['display'] = $display;
  $page->default_handlers[$handler->name] = $handler;
  $pages[''] = $page;

  return $pages;

}
