<?php

/**
 * In order to define qTip instances in code, follow the below
 * example for proper implementation.
 */

// Step 1: Declare hook_ctools_plugin_api() in [module_name].module:
// -----------------------------------------------------------------

/**
 * Implements hook_ctools_plugin_api().
 */
function [module_name]_ctools_plugin_api($module, $api) {
  if ($module == 'qtip' && $api == 'qtip_default') {
    return array('version' => '1');

    // If you would like to use a subdirectory for hook_qtip_default_qtips() (see below)
    // use the following instead
    return array(
      'version' => '1',
      'path'    => drupal_get_path('module', '[module_name]') . '/[subdirectory]',
    );
  }
}

// Step 2: Declare hook_qtip_default_qtips() in [module_name].qtip_default.inc:
// REMEMBER: If you declared a path in hook_ctools_plugin_api() above, [module_name].qtip_default.inc
//           needs to be placed in that directory, not your module's root directory.
// --------------------------------------------------------------------------------------------------

/**
 * Implements hook_qtip_default_qtips().
 */
function [module_name]_qtip_default_qtips() {
  $qtips = array();

  // Export code from admin/config/user-interface/qtip/actions/[qtip instance machine name]/export goes here...
  // Example:
  $qtip = new stdClass();
  $qtip->disabled = FALSE; /* Edit this to true to make a default qtip disabled initially */
  $qtip->api_version = 1;
  $qtip->machine_name = 'default';
  $qtip->name = 'Default';
  $qtip->settings = array(
    'style' => array(
      'classes'         => 'qtip-red',
      'classes_custom'  => '',
      'shadow'          => 0,
      'rounded_corners' => 0,
      'tip'             => 1,
    ),
    'position' => array(
      'at' => 'bottom center',
      'my' => '',
    ),
    'show' => array(
      'event' => array(
        'mouseenter' => 0,
        'focus'      => 0,
        'click'      => 'click',
      ),
      'solo'  => 0,
      'ready' => 0,
    ),
    'hide' => array(
      'event' => array(
        'mouseleave' => 'mouseleave',
        'unfocus'    => 0,
        'click'      => 0,
      ),
      'fixed' => 0,
    ),
  );
  $qtips['default'] = $qtip;

  // If you are declaring multiple qtip instances you need to set $qtips['...'] to
  // something unique for each instance.
  // The key that you give the array doesn't matter as it is not used anywhere else.

  // An example of adding another qtip instance with the one above
  $qtip = new stdClass();
  $qtip->disabled = FALSE; /* Edit this to true to make a default qtip disabled initially */
  $qtip->api_version = 1;
  $qtip->machine_name = 'simple_tip';
  $qtip->name = 'Simple Tip';
  $qtip->settings = array(
    'style' => array(
      'classes'         => 'qtip-bootstrap',
      'classes_custom'  => '',
      'shadow'          => 0,
      'rounded_corners' => 0,
      'tip'             => 0,
    ),
    'position' => array(
      'at' => 'top right',
      'my' => '',
    ),
    'show' => array(
      'event' => array(
        'mouseenter' => 'mouseenter',
        'focus'      => 0,
        'click'      => 0,
      ),
      'solo'  => 0,
      'ready' => 0,
    ),
    'hide' => array(
      'event' => array(
        'mouseleave' => 'mouseleave',
        'unfocus'    => 0,
        'click'      => 0,
      ),
      'fixed' => 0,
    ),
  );
  $qtips['simple_tip'] = $qtip;

  return $qtips;
}
