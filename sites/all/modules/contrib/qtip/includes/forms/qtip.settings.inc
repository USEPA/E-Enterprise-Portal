<?php

/**
 * Callback function for admin/config/user-interface/qtip
 */
function qtip_settings_form() {
  $settings = _qtip_fetch_default_settings();
  $form = array();

  $form['intro'] = array(
    '#markup' => t('These settings determine how the qTip library will be setup on the site.'),
  );

  /* Vertical tabs */
  $form['settings'] = array(
    '#type'     => 'vertical_tabs',
    '#attached' => array(
      'js' => array(drupal_get_path('module', 'qtip') . '/js/qtip.settings.js'),
    ),
  );


  /* FIELDSETS */
  $form['cdn'] = array(
    '#type'   => 'fieldset',
    '#title'  => t('CDN'),
    '#group'  => 'settings',
    '#weight' => 0,
  );
  $form['cdn']['cdn_settings'] = array(
    '#type'        => 'fieldset',
    '#title'       => t('Settings'),
    '#collapsible' => FALSE,
    '#weight'      => 10,
    '#states'      => array(
      'invisible' => array(
        ':input[name="qtip_cdn"]' => array('value' => 'none'),
      ),
    ),
  );
  $form['pages'] = array(
    '#type'   => 'fieldset',
    '#title'  => t('Pages'),
    '#group'  => 'settings',
    '#weight' => 10,
  );
  if (!module_exists('jquery_update')) {
    $form['jquery'] = array(
      '#type'   => 'fieldset',
      '#title'  => t('jQuery Library'),
      '#group'  => 'settings',
      '#weight' => 15,
    );
  }
  $form['miscellaneous'] = array(
    '#type'   => 'fieldset',
    '#title'  => t('Miscellaneous'),
    '#group'  => 'settings',
    '#weight' => 20,
  );
  $form['debug'] = array(
    '#type'   => 'fieldset',
    '#title'  => t('Debug'),
    '#group'  => 'settings',
    '#weight' => 30,
  );

  /* LIBRARY SECTION */
  $form['cdn']['qtip_cdn'] = array(
    '#type'    => 'select',
    '#title'   => t('qTip CDN'),
    '#description' => t('Choose the CDN to serve the qTip library from. Choose %none to use a custom build.', array('%none' => 'None')),
    '#options' => array(
      'jsdelivr' => t('jsDelivr (preferred)'),
      'cdnjs'    => t('CDNJS'),
      'none'     => t('None (custom build)'),
    ),
    '#default_value' => $settings['qtip_cdn'],
    '#weight'        => 0,
  );
  $form['cdn']['qtip_library_notice'] = array(
    '#type'   => 'item', // Have to use item since markup type will not work with #states
    '#markup' => '<strong>' . t('Place your custom build of the qTip library in sites/all/libraries/qtip.') . '</strong><br>' .
                  t('This setting depends on the !libraries module.', array('!libraries' => '<a href="http://drupal.org/project/libraries">Libraries</a>')),
    '#weight' => 10,
    '#states' => array(
      'visible' => array(
        ':input[name="qtip_cdn"]' => array('value' => 'none'),
      ),
    ),
  );

  /* CDN SETTINGS SECTION */
  $form['cdn']['cdn_settings']['qtip_cdn_version'] = array(
    '#type'  => 'select',
    '#title' => t('qTip version'),
    '#description' => t('Select the verion of qTip to use.'),
    '#options' => array(
      '2.2.1' => '2.2.1 (recommended)',
      '2.2.0' => '2.2.0',
    ),
    '#default_value' => $settings['qtip_cdn_version'],
    '#weight'        => 0,
  );
  $form['cdn']['cdn_settings']['qtip_cdn_features'] = array(
    '#type'    => 'radios',
    '#title'   => t('qTip features'),
    '#options' => array(
      'all'   => t('All features & styles'),
      'basic' => t('Basic features (no additional features or styles)'),
    ),
    '#default_value' => $settings['qtip_cdn_features'],
    '#weight'        => 10,
  );
  $form['cdn']['cdn_settings']['qtip_cdn_compression'] = array(
    '#type'    => 'radios',
    '#title'   => t('Compression level'),
    '#options' => array(
      'min'  => t('Production (minified)'),
      'full' => t('Development (uncompressed)'),
    ),
    '#default_value' => $settings['qtip_cdn_compression'],
    '#weight'        => 20,
  );
  $form['cdn']['cdn_settings']['qtip_cdn_imagesloaded'] = array(
    '#type'          => 'checkbox',
    '#title'         => t('Load !link for better image handling', array('!link' => l('imagesLoaded library', 'http://desandro.github.io/imagesloaded/DynamicMigration', array('target' => '_blank')))),
    '#description'   => t('If you plan on using qTip with complex content that contains images, enable this option for smooth positioning.'),
    '#default_value' => $settings['qtip_cdn_imagesloaded'],
    '#states'        => array(
      'visible' => array(
        ':input[name="qtip_cdn"]' => array('value' => 'jsdelivr'),
      ),
    ),
    '#weight'        => 30,
  );

  $form['pages']['qtip_pages_visibility'] = array(
    '#type'    => 'radios',
    '#title'   => t('Load qTip library on specific pages'),
    '#options' => array(
      QTIP_PAGES_VISIBILITY_NOTLISTED => t('All pages expect those listed'),
      QTIP_PAGES_VISIBILITY_LISTED    => t('Only the listed pages'),
    ),
    '#default_value' => $settings['qtip_pages_visibility'],
  );

  $form['pages']['qtip_pages_list'] = array(
    '#type'          => 'textarea',
    '#description'   => t('Specify pages by using their paths. Enter one path per line. The \'*\' character is a wildcard. Example paths are blog for the blog page and blog/* for every personal blog. <front> is the front page.'),
    '#default_value' => $settings['qtip_pages_list'],
  );

  // We're going to display options for the admin to choose the version of jQuery that they want to use
  if (!module_exists('jquery_update')) {
    $form['jquery']['notice'] = array(
      '#type'  => 'fieldset',
      '#title' => t('qTip requires at least jQuery 1.6'),
    );

    $form['jquery']['notice']['intro'] = array(
      '#markup' => t('Since the !jquery_update module is not installed on this site this module will automatically update this site\'s jQuery version. You may specify another version of jQuery below.', array('!jquery_update' => l('jQuery Update', 'https://www.drupal.org/project/jquery_update'))),
    );

    $form['jquery']['notice']['warning'] = array(
      '#markup' => t('This module does not provide the full functionality of jQuery Update. It is recommended that you use jQuery Update to update the version of jQuery on this site. This functionality is provided for site\'s that do not want the overhead of jQuery Update or are not concerned with having all of jQuery Update\'s functionality, i.e. CDN failure fallback.'),
      '#prefix' => '<div>',
      '#suffix' => '</div>',
    );

    $form['jquery']['qtip_jquery_cdn'] = array(
      '#type'    => 'select',
      '#title'   => t('CDN'),
      '#options' => array(
        'google'    => t('Google'),
        'microsoft' => t('Microsoft'),
      ),
      '#default_value' => $settings['qtip_jquery_cdn'],
    );

    $form['jquery']['qtip_jquery_version'] = array(
      '#type'    => 'select',
      '#title'   => t('Version'),
      '#options' => array(
        '1.11.1' => '1.11',
        '1.10.2' => '1.10',
        '1.9.1'  => '1.9',
        '1.8.3'  => '1.8',
        '1.7.2'  => '1.7',
        '1.6.4'  => '1.6',
      ),
      '#default_value' => $settings['qtip_jquery_version'],
    );
  }

  /* MISCELLANEOUS SECTION */
  $form['miscellaneous']['qtip_default_instance'] = qtip_fetch_instances_field($settings['qtip_default_instance']);
  $form['miscellaneous']['qtip_default_instance']['#options'][''] = t('- None -');
  $form['miscellaneous']['qtip_default_instance']['#title'] = t('Default instance');
  $form['miscellaneous']['qtip_default_instance']['#description'] = t('Choose the default !link to use throughout the site.', array('!link' => l(t('qTip instance'), 'admin/config/user-interface/qTip')));

  /* DEBUG SECTION */
  $form['debug']['qtip_debug_leave_tooltip_elements'] = array(
    '#type'          => 'checkbox',
    '#title'         => t('Leave tooltip elements in DOM'),
    '#description'   => t('Leave this option unchecked to keep the DOM clean. Checking this option will leave a hidden HTML element for each tooltip on the page containing the tooltip settings.'),
    '#default_value' => $settings['qtip_debug_leave_tooltip_elements'],
  );

  return system_settings_form($form);
}
