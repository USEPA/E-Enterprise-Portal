<?php
/**
 * @file
 * page_manager_feature.pages_default.inc
 */

/**
 * Implements hook_default_page_manager_pages().
 */
function page_manager_feature_default_page_manager_pages() {
  $page = new stdClass();
  $page->disabled = FALSE; /* Edit this to true to make a default page disabled initially */
  $page->api_version = 1;
  $page->name = 'App Connect';
  $page->task = 'page';
  $page->admin_title = 'App Connect';
  $page->admin_description = 'App Connect page that will include lists of services, announcements, messages from EPA (e.g., MyCDX) and in the future State, Tribal, and Local.';
  $page->path = 'app-connect';
  $page->access = array();
  $page->menu = array(
    'type' => 'normal',
    'title' => 'App Connect',
    'name' => 'main-menu',
    'weight' => '1',
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
  $handler->name = 'page_App Connect__panel_context_537de068-7a69-4d4f-aaaa-791c37a9ac55';
  $handler->task = 'page';
  $handler->subtask = 'App Connect';
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
    'name' => '',
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
    $pane->pid = 'new-120f30fb-116c-4a17-863a-cb0b40e09270';
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
    $pane->uuid = '120f30fb-116c-4a17-863a-cb0b40e09270';
    $display->content['new-120f30fb-116c-4a17-863a-cb0b40e09270'] = $pane;
    $display->panels['middle'][0] = 'new-120f30fb-116c-4a17-863a-cb0b40e09270';
  $display->hide_title = PANELS_TITLE_NONE;
  $display->title_pane = '0';
  $handler->conf['display'] = $display;
  $page->default_handlers[$handler->name] = $handler;
  $pages['App Connect'] = $page;

  $page = new stdClass();
  $page->disabled = FALSE; /* Edit this to true to make a default page disabled initially */
  $page->api_version = 1;
  $page->name = 'Workbench';
  $page->task = 'page';
  $page->admin_title = 'Workbench Page';
  $page->admin_description = '';
  $page->path = 'workbench';
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
  $handler->name = 'page_Workbench__panel_context_873ae150-66a9-4c6b-8797-6c54cc787253';
  $handler->task = 'page';
  $handler->subtask = 'Workbench';
  $handler->handler = 'panel_context';
  $handler->weight = 0;
  $handler->conf = array(
    'title' => 'Panel',
    'no_blocks' => 0,
    'pipeline' => 'standard',
    'body_classes_to_remove' => '',
    'body_classes_to_add' => '',
    'css_id' => '',
    'css' => '',
    'contexts' => array(),
    'relationships' => array(),
    'name' => '',
  );
  $display = new panels_display();
  $display->layout = 'grid';
  $display->layout_settings = array();
  $display->panel_settings = array(
    'style_settings' => array(
      'default' => NULL,
      'left' => NULL,
      'right' => NULL,
      'middle' => NULL,
    ),
  );
  $display->cache = array();
  $display->title = '';
  $display->uuid = 'e7182543-9c60-4e64-8c6c-df36734d6f92';
  $display->content = array();
  $display->panels = array();
    $pane = new stdClass();
    $pane->pid = 'new-85b52159-62eb-4ab2-b1e9-fbcb54680cd2';
    $pane->panel = 'middle';
    $pane->type = 'block';
    $pane->subtype = 'views-to_do-block_1';
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
    $pane->css = array(
      'css_id' => '',
      'css_class' => 'grid-stack-item-content',
    );
    $pane->extras = array();
    $pane->position = 0;
    $pane->locks = array();
    $pane->uuid = '85b52159-62eb-4ab2-b1e9-fbcb54680cd2';
    $display->content['new-85b52159-62eb-4ab2-b1e9-fbcb54680cd2'] = $pane;
    $display->panels['middle'][0] = 'new-85b52159-62eb-4ab2-b1e9-fbcb54680cd2';
    $pane = new stdClass();
    $pane->pid = 'new-280a3e26-50d1-43f8-a2a2-063aec99e52a';
    $pane->panel = 'middle';
    $pane->type = 'block';
    $pane->subtype = 'views-progress_tracker-block_1';
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
    $pane->css = array(
      'css_id' => '',
      'css_class' => 'grid-stack-item-content',
    );
    $pane->extras = array();
    $pane->position = 1;
    $pane->locks = array();
    $pane->uuid = '280a3e26-50d1-43f8-a2a2-063aec99e52a';
    $display->content['new-280a3e26-50d1-43f8-a2a2-063aec99e52a'] = $pane;
    $display->panels['middle'][1] = 'new-280a3e26-50d1-43f8-a2a2-063aec99e52a';
    $pane = new stdClass();
    $pane->pid = 'new-5fd232de-43bc-42a2-a1a0-9c43d58cfee1';
    $pane->panel = 'middle';
    $pane->type = 'block';
    $pane->subtype = 'views-recommended_resources-block';
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
    $pane->css = array(
      'css_id' => '',
      'css_class' => 'grid-stack-item-content beta-ribbon',
    );
    $pane->extras = array();
    $pane->position = 2;
    $pane->locks = array();
    $pane->uuid = '5fd232de-43bc-42a2-a1a0-9c43d58cfee1';
    $display->content['new-5fd232de-43bc-42a2-a1a0-9c43d58cfee1'] = $pane;
    $display->panels['middle'][2] = 'new-5fd232de-43bc-42a2-a1a0-9c43d58cfee1';
    $pane = new stdClass();
    $pane->pid = 'new-4b53b55f-0026-4673-8a1b-8fc366379285';
    $pane->panel = 'middle';
    $pane->type = 'block';
    $pane->subtype = 'be_well_informed-be_well_informed';
    $pane->shown = TRUE;
    $pane->access = array();
    $pane->configuration = array(
      'override_title' => 1,
      'override_title_text' => 'Be Well Informed',
      'override_title_heading' => 'h2',
    );
    $pane->cache = array();
    $pane->style = array(
      'settings' => NULL,
    );
    $pane->css = array(
      'css_id' => '',
      'css_class' => 'grid-stack-item-content',
    );
    $pane->extras = array();
    $pane->position = 3;
    $pane->locks = array();
    $pane->uuid = '4b53b55f-0026-4673-8a1b-8fc366379285';
    $display->content['new-4b53b55f-0026-4673-8a1b-8fc366379285'] = $pane;
    $display->panels['middle'][3] = 'new-4b53b55f-0026-4673-8a1b-8fc366379285';
    $pane = new stdClass();
    $pane->pid = 'new-a431d8a4-17af-450f-be07-a70d274173b4';
    $pane->panel = 'middle';
    $pane->type = 'block';
    $pane->subtype = 'views-my_air_quality_chart-block_1';
    $pane->shown = TRUE;
    $pane->access = array();
    $pane->configuration = array(
      'override_title' => 1,
      'override_title_text' => 'My Air',
      'override_title_heading' => 'h2',
    );
    $pane->cache = array();
    $pane->style = array(
      'settings' => NULL,
    );
    $pane->css = array(
      'css_id' => '',
      'css_class' => 'grid-stack-item-content',
    );
    $pane->extras = array();
    $pane->position = 4;
    $pane->locks = array();
    $pane->uuid = 'a431d8a4-17af-450f-be07-a70d274173b4';
    $display->content['new-a431d8a4-17af-450f-be07-a70d274173b4'] = $pane;
    $display->panels['middle'][4] = 'new-a431d8a4-17af-450f-be07-a70d274173b4';
    $pane = new stdClass();
    $pane->pid = 'new-f33184f4-db8a-4638-9ea2-6f4f36a5752e';
    $pane->panel = 'middle';
    $pane->type = 'block';
    $pane->subtype = 'views-my_environment_mapper-block';
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
    $pane->css = array(
      'css_id' => '',
      'css_class' => 'grid-stack-item-content',
    );
    $pane->extras = array();
    $pane->position = 5;
    $pane->locks = array();
    $pane->uuid = 'f33184f4-db8a-4638-9ea2-6f4f36a5752e';
    $display->content['new-f33184f4-db8a-4638-9ea2-6f4f36a5752e'] = $pane;
    $display->panels['middle'][5] = 'new-f33184f4-db8a-4638-9ea2-6f4f36a5752e';
    $pane = new stdClass();
    $pane->pid = 'new-eff56a90-83bc-4a41-b093-d63a4c04fd75';
    $pane->panel = 'middle';
    $pane->type = 'block';
    $pane->subtype = 'views-village_green_block-block_1';
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
    $pane->css = array(
      'css_id' => '',
      'css_class' => 'grid-stack-item-content',
    );
    $pane->extras = array();
    $pane->position = 6;
    $pane->locks = array();
    $pane->uuid = 'eff56a90-83bc-4a41-b093-d63a4c04fd75';
    $display->content['new-eff56a90-83bc-4a41-b093-d63a4c04fd75'] = $pane;
    $display->panels['middle'][6] = 'new-eff56a90-83bc-4a41-b093-d63a4c04fd75';
    $pane = new stdClass();
    $pane->pid = 'new-e5f9e068-ef73-482f-84f2-031172e318b1';
    $pane->panel = 'middle';
    $pane->type = 'block';
    $pane->subtype = 'views-my_maps-block_1';
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
    $pane->css = array(
      'css_id' => '',
      'css_class' => 'grid-stack-item-content',
    );
    $pane->extras = array();
    $pane->position = 7;
    $pane->locks = array();
    $pane->uuid = 'e5f9e068-ef73-482f-84f2-031172e318b1';
    $display->content['new-e5f9e068-ef73-482f-84f2-031172e318b1'] = $pane;
    $display->panels['middle'][7] = 'new-e5f9e068-ef73-482f-84f2-031172e318b1';
    $pane = new stdClass();
    $pane->pid = 'new-41a62bd8-42e1-47d4-be14-64804ac3e5f0';
    $pane->panel = 'middle';
    $pane->type = 'block';
    $pane->subtype = 'views-first_time_user_profile-block';
    $pane->shown = TRUE;
    $pane->access = array(
      'plugins' => array(
        0 => array(
          'name' => 'entity_field_value:user:user:field_first_time_user',
          'settings' => array(
            'field_first_time_user' => array(
              'und' => array(
                0 => array(
                  'value' => 1,
                ),
              ),
            ),
            'field_first_time_user_value' => array(
              0 => 1,
            ),
          ),
          'context' => 'logged-in-user',
          'not' => FALSE,
        ),
      ),
    );
    $pane->configuration = array(
      'override_title' => 1,
      'override_title_text' => '',
      'override_title_heading' => 'h2',
    );
    $pane->cache = array();
    $pane->style = array(
      'settings' => NULL,
    );
    $pane->css = array(
      'css_id' => 'first-time-user-block',
      'css_class' => 'grid-stack-item-content',
    );
    $pane->extras = array();
    $pane->position = 8;
    $pane->locks = array();
    $pane->uuid = '41a62bd8-42e1-47d4-be14-64804ac3e5f0';
    $display->content['new-41a62bd8-42e1-47d4-be14-64804ac3e5f0'] = $pane;
    $display->panels['middle'][8] = 'new-41a62bd8-42e1-47d4-be14-64804ac3e5f0';
    $pane = new stdClass();
    $pane->pid = 'new-28763bd6-bb1a-4643-a6b5-379dbbb70657';
    $pane->panel = 'middle';
    $pane->type = 'block';
    $pane->subtype = 'cdx_facility_management-cdx_facility_widget';
    $pane->shown = TRUE;
    $pane->access = array(
      'plugins' => array(
        0 => array(
          'name' => 'php',
          'settings' => array(
            'description' => 'Public and Public User roles with no other CDX role ',
            'php' => 'global $user;
if((in_array(\'Public User\', $user->roles) && count($user->roles) == 2))
  return false;
else if((in_array(\'Public\', $user->roles) && count($user->roles) == 2))
  return false;
else
  return true;
',
          ),
          'not' => FALSE,
        ),
      ),
    );
    $pane->configuration = array(
      'override_title' => 1,
      'override_title_text' => 'My Facility Manager',
      'override_title_heading' => 'h2',
    );
    $pane->cache = array();
    $pane->style = array(
      'settings' => NULL,
    );
    $pane->css = array(
      'css_id' => '',
      'css_class' => 'grid-stack-item-content',
    );
    $pane->extras = array();
    $pane->position = 9;
    $pane->locks = array();
    $pane->uuid = '28763bd6-bb1a-4643-a6b5-379dbbb70657';
    $display->content['new-28763bd6-bb1a-4643-a6b5-379dbbb70657'] = $pane;
    $display->panels['middle'][9] = 'new-28763bd6-bb1a-4643-a6b5-379dbbb70657';
    $pane = new stdClass();
    $pane->pid = 'new-2931b07f-c301-42f7-81a4-ee68d9aa4cf5';
    $pane->panel = 'middle';
    $pane->type = 'block';
    $pane->subtype = 'views-air_emissions-block_1';
    $pane->shown = FALSE;
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
    $pane->css = array(
      'css_id' => '',
      'css_class' => 'grid-stack-item-content',
    );
    $pane->extras = array();
    $pane->position = 10;
    $pane->locks = array();
    $pane->uuid = '2931b07f-c301-42f7-81a4-ee68d9aa4cf5';
    $display->content['new-2931b07f-c301-42f7-81a4-ee68d9aa4cf5'] = $pane;
    $display->panels['middle'][10] = 'new-2931b07f-c301-42f7-81a4-ee68d9aa4cf5';
    $pane = new stdClass();
    $pane->pid = 'new-dbf1b6bc-21e2-4593-a347-09dfc78d2582';
    $pane->panel = 'middle';
    $pane->type = 'block';
    $pane->subtype = 'views-favorite_sites-block';
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
    $pane->css = array(
      'css_id' => '',
      'css_class' => 'grid-stack-item-content',
    );
    $pane->extras = array();
    $pane->position = 11;
    $pane->locks = array();
    $pane->uuid = 'dbf1b6bc-21e2-4593-a347-09dfc78d2582';
    $display->content['new-dbf1b6bc-21e2-4593-a347-09dfc78d2582'] = $pane;
    $display->panels['middle'][11] = 'new-dbf1b6bc-21e2-4593-a347-09dfc78d2582';
    $pane = new stdClass();
    $pane->pid = 'new-b25d7660-677c-45f5-b075-cd1150af3868';
    $pane->panel = 'middle';
    $pane->type = 'block';
    $pane->subtype = 'views-other_items_of_interest-block';
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
    $pane->css = array(
      'css_id' => '',
      'css_class' => 'grid-stack-item-content',
    );
    $pane->extras = array();
    $pane->position = 12;
    $pane->locks = array();
    $pane->uuid = 'b25d7660-677c-45f5-b075-cd1150af3868';
    $display->content['new-b25d7660-677c-45f5-b075-cd1150af3868'] = $pane;
    $display->panels['middle'][12] = 'new-b25d7660-677c-45f5-b075-cd1150af3868';
  $display->hide_title = PANELS_TITLE_NONE;
  $display->title_pane = '0';
  $handler->conf['display'] = $display;
  $page->default_handlers[$handler->name] = $handler;
  $pages['Workbench'] = $page;

  return $pages;

}
