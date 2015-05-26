<?php
/**
 * @file
 * epa_ee_263_views_landingpagereleasenotes.panels_default.inc
 */

/**
 * Implements hook_default_panels_mini().
 */
function epa_ee_263_views_landingpagereleasenotes_default_panels_mini() {
  $export = array();

  $mini = new stdClass();
  $mini->disabled = FALSE; /* Edit this to true to make a default mini disabled initially */
  $mini->api_version = 1;
  $mini->name = 'epa_global_footer';
  $mini->category = 'EPAgovTemplate';
  $mini->admin_title = 'EPA Global Footer';
  $mini->admin_description = 'Footer with social media links, accessibility and privacy policy, and news and blog links';
  $mini->requiredcontexts = array();
  $mini->contexts = array();
  $mini->relationships = array();
  $display = new panels_display();
  $display->layout = 'twocol';
  $display->layout_settings = array();
  $display->panel_settings = array(
    'style_settings' => array(
      'default' => NULL,
      'left' => NULL,
      'right' => NULL,
    ),
  );
  $display->cache = array();
  $display->title = '';
  $display->uuid = '899ef25c-462b-4bc3-adb1-a320625b4896';
  $display->content = array();
  $display->panels = array();
    $pane = new stdClass();
    $pane->pid = 'new-d76a0368-5781-4493-80cc-745a1761b698';
    $pane->panel = 'left';
    $pane->type = 'block';
    $pane->subtype = 'menu-menu-footer-disclaimers';
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
    $pane->uuid = 'd76a0368-5781-4493-80cc-745a1761b698';
    $display->content['new-d76a0368-5781-4493-80cc-745a1761b698'] = $pane;
    $display->panels['left'][0] = 'new-d76a0368-5781-4493-80cc-745a1761b698';
    $pane = new stdClass();
    $pane->pid = 'new-27035da1-e978-4173-a406-c39042673155';
    $pane->panel = 'right';
    $pane->type = 'block';
    $pane->subtype = 'menu-menu-epa-menu';
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
    $pane->uuid = '27035da1-e978-4173-a406-c39042673155';
    $display->content['new-27035da1-e978-4173-a406-c39042673155'] = $pane;
    $display->panels['right'][0] = 'new-27035da1-e978-4173-a406-c39042673155';
    $pane = new stdClass();
    $pane->pid = 'new-dd937c26-398d-4b85-88c5-317e8ec744bc';
    $pane->panel = 'right';
    $pane->type = 'block';
    $pane->subtype = 'menu-menu-epa-social-icons';
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
    $pane->uuid = 'dd937c26-398d-4b85-88c5-317e8ec744bc';
    $display->content['new-dd937c26-398d-4b85-88c5-317e8ec744bc'] = $pane;
    $display->panels['right'][1] = 'new-dd937c26-398d-4b85-88c5-317e8ec744bc';
  $display->hide_title = PANELS_TITLE_FIXED;
  $display->title_pane = 'new-d76a0368-5781-4493-80cc-745a1761b698';
  $mini->display = $display;
  $export['epa_global_footer'] = $mini;

  return $export;
}
