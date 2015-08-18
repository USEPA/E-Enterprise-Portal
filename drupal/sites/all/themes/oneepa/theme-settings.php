<?php
/**
 * Implements hook_form_system_theme_settings_alter().
 *
 * @param $form
 *   Nested array of form elements that comprise the form.
 * @param $form_state
 *   A keyed array containing the current state of the form.
 */
function oneepa_form_system_theme_settings_alter(&$form, &$form_state, $form_id = NULL) {
  // Work-around for a core bug affecting admin themes. See issue #943212.
  if (isset($form_id)) {
    return;
  }

  create_form($form);
}

function create_form($form) {
  // Create the form using Forms API: http://api.drupal.org/api/7
  $form['theme_settings']['toggle_logo']['#description'] = t('This logo will only be displayed when a user prints the page.');
  $form['javascript'] = array(
    '#type' => 'fieldset',
    '#title' => t('JavaScript settings'),
    '#collapsible' => TRUE,
    '#collapsed' => TRUE,
  );
  $form['javascript']['optimize_scripts'] = array(
    '#type' => 'checkbox',
    '#title' => t('Move scripts to the bottom.'),
    '#default_value' => theme_get_setting('optimize_scripts'),
    '#description' => t(
      'Set the scope of all scripts, except Modernizr and Respond.js, to the footer<br />For more information: !link',
      array('!link' => l(t('Move Scripts to the Bottom'), 'http://developer.yahoo.com/blogs/ydn/posts/2007/07/high_performanc_5/'))
    ),
    '#prefix' => '<strong>' . t('Script Performance') . ':</strong>',
  );
  $form['javascript']['use_selectivizr'] = array(
    '#type' => 'checkbox',
    '#title' => t('Use Selectivizr'),
    '#default_value' => theme_get_setting('use_selectivizr'),
    '#description' => t(
      'Include a reference to the !link JavaScript library hosted at cdnjs.com.',
      array('!link' => l(t('Selectivizr'), 'http://selectivizr.com/'))
    ),
    '#prefix' => '<strong>' . t('Selectivizr') . ':</strong>',
  );
  $form['breadcrumb'] = array(
    '#type' => 'fieldset',
    '#title' => t('Breadcrumb settings'),
    '#collapsible' => TRUE,
    '#collapsed' => TRUE,
  );
  $form['breadcrumb']['breadcrumb_display'] = array(
    '#type' => 'select',
    '#title' => t('Display breadcrumb'),
    '#default_value' => theme_get_setting('breadcrumb_display'),
    '#options' => array(
      'yes' => t('Yes'),
      'admin' => t('Only in admin section'),
      'no' => t('No'),
    ),
  );
  $form['breadcrumb']['breadcrumb_separator'] = array(
    '#type' => 'textfield',
    '#title' => t('Breadcrumb separator'),
    '#description' => t('Text only. Don?t forget to include spaces.'),
    '#default_value' => theme_get_setting('breadcrumb_separator'),
    '#size' => 5,
    '#maxlength' => 10,
  );
  $form['breadcrumb']['breadcrumb_home'] = array(
    '#type' => 'checkbox',
    '#title' => t('Show home page link in breadcrumb'),
    '#default_value' => theme_get_setting('breadcrumb_home'),
  );
  $form['breadcrumb']['breadcrumb_title'] = array(
    '#type' => 'checkbox',
    '#title' => t('Append the content title to the end of the breadcrumb'),
    '#default_value' => theme_get_setting('breadcrumb_title'),
  );
  $form['breadcrumb']['breadcrumb_trailing'] = array(
    '#type' => 'checkbox',
    '#title' => t('Append a separator to the end of the breadcrumb'),
    '#default_value' => theme_get_setting('breadcrumb_trailing'),
    '#description' => t('Useful when the breadcrumb is positioned just before the title.'),
  );
  $form['mobile_metatags'] = array(
    '#type' => 'fieldset',
    '#title' => t('Meta tags for mobile devices'),
    '#collapsible' => TRUE,
    '#collapsed' => TRUE,
  );
  $form['mobile_metatags']['use_handheld_friendly'] = array(
    '#type' => 'checkbox',
    '#title' => t('Use handheld friendly meta tag'),
    '#description' => t(
      '!code Better rendering on older Palm and Blackberry devices.',
      array('!code' => '<code>&lt;meta name="HandheldFriendly" content="true"&gt;</code>')
    ),
    '#default_value' => theme_get_setting('use_handheld_friendly'),
  );
  $form['mobile_metatags']['use_mobile_optimized'] = array(
    '#type' => 'checkbox',
    '#title' => t('Use mobile optimized meta tag'),
    '#description' => '',
    '#description' => t(
      '!code Optimizes Windows Mobile 6.5 layout rendering.',
      array('!code' => '<code>&lt;meta name="MobileOptimized" content="width"&gt;</code>')
    ),
    '#default_value' => theme_get_setting('use_mobile_optimized'),
  );
  $form['mobile_metatags']['use_ios_meta'] = array(
    '#type' => 'checkbox',
    '#title' => t('Use iOS mobile meta tags'),
    '#description' => t(
      '!code1 Runs in full screen when added to the iOS home screen. !code2 Sets the style of the iOS status bar.',
      array(
        '!code1' => '<code>&lt;meta name="apple-mobile-web-app-capable" content="yes"&gt;</code>',
        '!code2' => '<br /><code>&lt;meta name="apple-mobile-web-app-status-bar-style" content="black-translucent"&gt;</code>',
      )
    ),
  );
  $form['mobile_metatags']['use_mobile_viewport'] = array(
    '#type' => 'checkbox',
    '#title' => t('Use mobile viewport meta tag'),
    '#default_value' => theme_get_setting('use_mobile_viewport'),
  );
  $form['mobile_metatags']['mobile_viewport_value'] = array(
    '#type' => 'textfield',
    '#title' => t('Mobile viewport meta tag value'),
    '#default_value' => theme_get_setting('mobile_viewport_value'),
    '#description' => t(
      'Suggested default: <code>width=device-width</code><br />For more information: !link',
      array('!link' => l(t('Viewport and Media Queries'), 'https://docs.google.com/present/view?id=dkx3qtm_22dxsrgcf4'))
    ),
  );
  $form['misc'] = array(
    '#type' => 'fieldset',
    '#title' => t('Miscellaneous settings'),
    '#collapsible' => TRUE,
    '#collapsed' => TRUE,
  );
  $form['misc']['use_holmes'] = array(
    '#type' => 'checkbox',
    '#title' => t('Highlight invalid and inaccessible markup.'),
    '#default_value' => theme_get_setting('use_holmes'),
    '#description' => t(
      'The !link will highlight invalid and inaccessible markup for users with the Administer Content permission.',
      array('!link' => l(t('Holmes stylesheet'), 'http://www.red-root.com/sandbox/holmes/'))
    ),
    '#prefix' => '<strong>' . t('Enable Holmes stylesheet') . ':</strong>',
  );
  $form['misc']['warn_ie6'] = array(
    '#type' => 'checkbox',
    '#title' => t('Urge IE6 users to upgrade their browser.'),
    '#default_value' => theme_get_setting('warn_ie6'),
    '#description' => t('Your browser is <em>ancient!</em> Upgrade to a different browser or install Google Chrome Frame to experience this site.'),
    '#prefix' => '<strong>' . t('Warn IE6 Users') . ':</strong>',
  );
  $form['misc']['use_dropdowns'] = array(
    '#type' => 'checkbox',
    '#title' => t('Display the main menu as a drop-down menu.'),
    '#default_value' => theme_get_setting('use_dropdowns'),
    '#description' => t(
      'Go to !link and select <em>Show as expanded</em> for each top-level menu item you want to show drop-downs for.',
      array('!link' => l(t('admin/structure/menu/manage/main-menu'), 'admin/structure/menu/manage/main-menu'))
    ),
    '#prefix' => '<strong>' . t('Main Menu Drop-downs') . ':</strong>',
  );

  // Remove some of the base theme's settings.
  /* -- Delete this line if you want to turn off this setting.
  unset($form['themedev']['zen_wireframes']); // We don't need to toggle wireframes on this site.
  // */

  // We are editing the $form in place, so we don't need to return anything.
}