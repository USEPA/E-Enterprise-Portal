<?php

/**
 * @file
 * Administrative functions for the qTip module.
 */

/**
 * Callback function for admin/config/user-interface/qtip
 */
function qtip_configure_instance_form($form, &$form_state, $qt = NULL) {
  drupal_add_css(drupal_get_path('module', 'qtip') . '/css/qtip.admin.css');
  if (!isset($qt)) {
    $qt = new stdClass;
  }
  else {
    // Get the settings out of the settings array
    $content = $qt->settings['content'];
    $style = $qt->settings['style'];
    $position = $qt->settings['position'];
    $show = $qt->settings['show'];
    $hide = $qt->settings['hide'];
    $miscellaneous = $qt->settings['miscellaneous'];
  }

  // The contents of $qt will either come from the db or from $form_state.
  if (isset($form_state['values']['name'])) {
    $qt = _qtip_convert_form_to_qtips($form_state);
  }

  $form = array('#tree' => TRUE);

  $form['name'] = array(
    '#type'          => 'textfield',
    '#title'         => t('Name'),
    '#description'   => t('The human-friendly name to identify this qTip instance throughout the site.'),
    '#default_value' => isset($qt->name) ? $qt->name : '',
    '#weight'        => -1000,
    '#required'      => TRUE,
  );

  $form['machine_name'] = array(
    '#type'         => 'machine_name',
    '#description'  => t('A unique machine-readable name for this qTip instance. It must only contain lowercase letters, numbers, and underscores. The machine name will be used internally by qTip and will be used in the CSS ID of your qTip instance.'),
    '#machine_name' => array(
      'exists' => 'qtip_machine_name_exists',
      'source' => array('name'),
    ),
    '#maxlength' => 32,
    '#weight'    => -999,
  );

  if (!empty($qt->machine_name)) {
    $form['machine_name']['#default_value'] = $qt->machine_name;
    $form['machine_name']['#disabled'] = TRUE;
    $form['machine_name']['#value'] = $qt->machine_name;
  }

  /* Verical tabs */
  $form['settings'] = array(
    '#type'     => 'vertical_tabs',
    '#attached' => array(
      'js' => array(drupal_get_path('module', 'qtip') . '/js/qtip.admin.js'),
    ),
  );

  /* Fieldsets */
  $form['style'] = array(
    '#type'   => 'fieldset',
    '#title'  => t('Style'),
    '#group'  => 'settings',
    '#weight' => $form['name']['#weight'] + 100,
  );
  $form['style']['tip_settings'] = array(
    '#type'        => 'fieldset',
    '#title'       => t('Tip Settings'),
    '#collapsible' => TRUE,
    '#collapsed'   => TRUE,
    '#weight'      => 100,
    '#parents'     => array('style'),
    '#states'      => array(
      'visible' => array(
        ':input[name="style[tip][corner]"]' => array('checked' => TRUE),
      ),
    ),
  );

  $form['position'] = array(
    '#type'   => 'fieldset',
    '#title'  => t('Position'),
    '#group'  => 'settings',
    '#weight' => $form['style']['#weight'] + 100,
  );

  $form['show'] = array(
    '#type'  => 'fieldset',
    '#title' => t('Show'),
    '#group'  => 'settings',
    '#weight' => $form['position']['#weight'] + 100,
  );

  $form['hide'] = array(
    '#type'  => 'fieldset',
    '#title' => t('Hide'),
    '#group'  => 'settings',
    '#weight' => $form['show']['#weight'] + 100,
  );

  $form['miscellaneous'] = array(
    '#type'  => 'fieldset',
    '#title' => t('Miscellaneous'),
    '#group'  => 'settings',
    '#weight' => $form['hide']['#weight'] + 100,
  );

  /* Styles */
  $form['style']['classes'] = array(
    '#type'    => 'select',
    '#title'   => t('Color scheme'),
    '#options' =>  array(
      'Standard Color Schemes' => array(
        ''           => t('Plain (default)'),
        'qtip-cream' => t('Cream'),
        'qtip-light' => t('Light'),
        'qtip-dark'  => t('Dark'),
        'qtip-red'   => t('Red'),
        'qtip-green' => t('Green'),
        'qtip-blue'  => t('Blue'),
      ),
      'Advanced Color Schemes' => array(
        'qtip-bootstrap' => t('Bootstrap'),
        'qtip-tipsy'     => t('Tipsy'),
        'qtip-youtube'   => t('YouTube'),
        'qtip-jtools'    => t('jTools'),
        'qtip-cluetip'   => t('ClueTip'),
        'qtip-tipped'    => t('Tipped'),
      ),
      'qtip-custom' => 'Custom Color Scheme',
    ),
    // '#description'   => $settings['select']['description'],
    '#default_value' => isset($style['classes']) ? $style['classes'] : '',
    '#weight'        => -100,
  );
  $form['style']['classes_custom'] = array(
    '#type'          => 'textfield',
    '#title'         => t('Custom CSS class'),
    '#description'   => t('The custom CSS class that will be used for all qTips.'),
    '#default_value' => isset($style['classes_custom']) ? $style['classes_custom'] : '',
    '#states'        => array(
      'visible' => array(
        ':input[name="style[classes]"]' => array('value' => 'qtip-custom'),
      ),
    ),
    '#size'   => 40,
    '#weight' => -99,
  );
  $form['style']['shadow'] = array(
    '#type'          => 'checkbox',
    '#title'         => t('Show shadow under tooltips'),
    '#description'   => t('If checked a shadow will display under each tooltip.') . '<br>' .
                          '<strong>' . t('NOTE: This adds a class to each tooltip that uses the box-shadow CSS3 property, which is not supported in older browsers.') . '</strong>',
    '#default_value' => isset($style['shadow']) ? $style['shadow'] : 0,
    '#return_value'  => 'qtip-shadow',
    '#weight'        => -90,
  );
  $form['style']['rounded_corners'] = array(
    '#type'          => 'checkbox',
    '#title'         => t('Show tooltips with rounded corners'),
    '#description'   => t('If checked each tooltip will have rounded corners.') . '<br>' .
                          '<strong>' . t('NOTE: This adds a class to each tooltip that uses the border-radius CSS3 property, which is not supported in older browsers.') . '</strong>',
    '#default_value' => isset($style['rounded_corners']) ? $style['rounded_corners'] : 0,
    '#return_value'  => 'qtip-rounded',
    '#weight'        => -80,
  );

  /* Tip settings */
  $form['style']['tip']['corner'] = array(
    '#type'          => 'checkbox',
    '#title'         => t('Show speech bubble tip'),
    '#description'   => t('If checked each tooltip will have a small speech bubble tip appended to them.'),
    '#default_value' => isset($style['tip']['corner']) ? $style['tip']['corner'] : 0,
    '#weight'        => -70,
    '#states'        => array(
      'invisible' => array(
        ':input[name="style[color_scheme]"]' => array('value' => 'qtip-youtube'),
      ),
    ),
  );
  $form['style']['tip_settings']['tip']['width'] = array(
    '#type'          => 'textfield',
    '#title'         => t('Width'),
    '#description'   => t('Determines the width of the rendered tip in pixels, in relation to the side of the tooltip it lies upon i.e. when the tip position is on the left or right, this quantity actually refers to the tips height in visual terms, and vice versa.') .
                        '<br><strong>' . t('Make sure this is a number only, don\'t include any units e.g. \'px\'!') . '</strong>',
    '#default_value' => isset($style['tip']['width']) ? $style['tip']['width'] : '6',
    '#size'          => 5,
    '#weight'        => -100,
    '#required'      => 1,
  );
  $form['style']['tip_settings']['tip']['height'] = array(
    '#type'          => 'textfield',
    '#title'         => t('Height'),
    '#description'   => t('Determines the height of the rendered tip in pixels, in relation to the side of the tooltip it lies upon i.e. when the tip position is on the left or right, this quantity actually refers to the tips width in visual terms, and vice versa.') .
                        '<br><strong>' . t('Make sure this is a number only, don\'t include any units e.g. \'px\'!') . '</strong>',
    '#default_value' => isset($style['tip']['height']) ? $style['tip']['height'] : '6',
    '#size'          => 5,
    '#weight'        => -90,
    '#required'      => 1,
  );
  $form['style']['tip_settings']['tip']['border'] = array(
    '#type'          => 'textfield',
    '#title'         => t('Border'),
    '#description'   => t('This option determines the width of the border that surrounds the tip element, much like the CSS border-width property of regular elements.') .
                        '<br><strong>' . t('Make sure this is a number only, don\'t include any units e.g. \'px\'! Leave blank for default settings.') . '</strong>',
    '#default_value' => isset($style['tip']['border']) ? $style['tip']['border'] : '',
    '#size'          => 5,
    '#weight'        => -80,
  );
  $form['style']['tip_settings']['tip']['corner_position'] = array(
    '#type'          => 'select',
    '#title'         => t('Position'),
    '#options'       => _qtip_admin_tooltip_position_options(),
    '#default_value' => isset($style['tip']['corner_position']) ? $style['tip']['corner_position'] : '',
    '#weight'        => -70,
  );
  $form['style']['tip_settings']['tip']['mimic'] = array(
    '#type'          => 'select',
    '#title'         => t('Mimic'),
    '#options'       => _qtip_admin_tooltip_position_options(),
    '#default_value' => isset($style['tip']['mimic']) ? $style['tip']['mimic'] : '',
    '#weight'        => -60,
  );
  $form['style']['tip_settings']['tip']['offset'] = array(
    '#type'          => 'textfield',
    '#title'         => t('Offset'),
    '#description'   => t('Determines the offset of the tip in relation to its current corner position. This value is relative i.e. depending on which corner the tooltip is set it will behave differently.') .
                        '<br><strong>' . t('Make sure this is a number only, don\'t include any units e.g. \'px\'!') . '</strong>',
    '#default_value' => isset($style['tip']['offset']) ? $style['tip']['offset'] : '',
    '#size'          => 5,
    '#weight'        => -50,
  );

  /* Position */
  $form['position']['image'] = array(
    '#type'   => 'item',
    '#markup' => '<img src="/' . drupal_get_path('module', 'qtip') .'/images/corners.jpg"><br><div class="credit">' . t('Based on image by Craig Thompson, creator of the !link.', array('!link' => l('qTip library', 'http://qtip2.com/demos', array('#attributes' => array('target' => '_blank'))))) . '</div>',
    '#prefix' => '<div class="corners-images">',
    '#suffix' => '</div>',
    '#weight' => -1000,
  );
  $form['position']['at'] = array(
    '#type'          => 'select',
    '#title'         => t('Position'),
    '#options'       => _qtip_admin_tooltip_position_options(false),
    '#description'   => t('Set where the tooltips should display relative to it\'s target.'),
    '#default_value' => isset($position['at']) ? $position['at'] : 'bottom right',
    '#weight'        => -100,
  );
  $form['position']['my'] = array(
    '#type'          => 'select',
    '#title'         => t('Tooltip placement'),
    '#options'       => _qtip_admin_tooltip_position_options(),
    '#default_value' => isset($position['my']) ? $position['my'] : '',
    '#weight'        => -90,
  );
  $form['position']['viewport'] = array(
    '#type'          => 'checkbox',
    '#title'         => t('Keep tooltip within window'),
    '#default_value' => isset($position['viewport']) ? $position['viewport'] : 0,
    '#weight'        => -80,
  );
  $form['position']['target'] = array(
    '#type'          => 'checkbox',
    '#title'         => t('Follow mouse'),
    '#default_value' => isset($position['target']) ? $position['target'] : 0,
    '#weight'        => -70,
  );
  $form['position']['adjust']['method'] = array(
    '#type'    => 'select',
    '#title'   => t('Method'),
    '#options' => array(
      ''      => t('Flip/Invert'),
      'flip'  => t('Flip'),
      'shift' => t('Shift'),
    ),
    '#default_value' => isset($position['adjust']['method']) ? $position['adjust']['method'] : '',
    '#weight'        => -60,
  );

  /* Show */
  $form['show']['intro'] = array(
    '#markup' => t('The show settings define what events trigger the tooltip to show on which elements, as well as the initial delay and several other properties.'),
    '#weight' => -1000,
  );
  $form['show']['event'] = array(
    '#type'    => 'checkboxes',
    '#title'   => t('Event'),
    '#options' => array(
      'mouseenter' => t('Hover'),
      'focus'      => t('Focus'),
      'click'      => t('Click'),
    ),
    '#description' => t('The action(s) that will display this tooltip.'),
    '#default_value' => isset($show['event']) ? $show['event'] : array('mouseenter'),
    '#weight'        => -100,
  );
  $form['show']['solo'] = array(
    '#type'          => 'checkbox',
    '#title'         => t('Only show one tooltip at a time'),
    '#description'   => t('Determines whether or not the tooltip will hide all others when the show event is triggered.'),
    '#default_value' => isset($show['solo']) ? $show['solo'] : 0,
    '#weight'        => -90,
  );
  $form['show']['ready'] = array(
    '#type'          => 'checkbox',
    '#title'         => t('Show tooltip on page load'),
    '#description'   => t('Determines whether or not the tooltip is shown as soon as the page has finished loading. This is useful for tooltips which are created inside event handlers, as without it they won\'t show up immediately.'),
    '#default_value' => isset($show['ready']) ? $show['ready'] : 0,
    '#weight'        => -80,
  );

  /* Hide */
  $form['hide']['intro'] = array(
    '#markup' => t('The hide settings define what events trigger the tooltip to hide on which elements, as well as the initial delay and several other properties.'),
    '#weight' => -1000,
  );
  $form['hide']['event'] = array(
    '#type'    => 'checkboxes',
    '#title'   => t('Event'),
    '#options' => array(
      'mouseleave' => t('Leave'),
      'unfocus'    => t('Unfocus'),
      'blur'       => t('Blur'),
      'click'      => t('Click'),
    ),
    '#description'   => t('The action(s) that will hide this tooltip.'),
    '#default_value' => isset($hide['event']) ? $hide['event'] : array('mouseleave'),
    '#weight'        => -100,
  );
  $form['hide']['fixed'] = array(
    '#type'          => 'checkbox',
    '#title'         => t('Keep tooltip visible when hovered'),
    '#description'   => t('When enabled, the tooltip will not hide if moused over, allowing the contents to be clicked and interacted with.'),
    '#default_value' => isset($hide['fixed']) ? $hide['fixed'] : '',
    '#weight'        => -90,
  );
  $form['hide']['delay'] = array(
    '#type'          => 'textfield',
    '#title'         => t('Delay'),
    '#description'   => t('Time in milliseconds by which to delay hiding of the tooltip when the hide event is triggered.') .
                        '<br><strong>' . t('Make sure this is a number only!') . '</strong>',
    '#default_value' => isset($hide['delay']) ? $hide['delay'] : '',
    '#size'          => 5,
    '#weight'        => -80,
  );
  $form['hide']['inactive'] = array(
    '#type'          => 'textfield',
    '#title'         => t('Inactive'),
    '#description'   => t('Time in milliseconds in which the tooltip should be hidden if it remains inactive e.g. isn\'t interacted with. If blank, tooltip will not hide when inactive.') .
                        '<br><strong>' . t('Make sure this is a number only!') . '</strong>',
    '#default_value' => isset($hide['inactive']) ? $hide['inactive'] : '',
    '#size'          => 5,
    '#weight'        => -70,
  );

  /* Miscellaneous */
  $form['miscellaneous']['button'] = array(
    '#type'          => 'checkbox',
    '#title'         => t('Show close button on tooltip'),
    '#default_value' => isset($content['button']) ? $content['button'] : 0,
    '#return_value'  => TRUE,
  );
  $form['miscellaneous']['button_title_text'] = array(
    '#type'          => 'textfield',
    '#title'         => t('Title text'),
    '#default_value' => isset($miscellaneous['button_title_text']) ? $miscellaneous['button_title_text'] : '',
    '#states'        => array(
      'visible' => array(
        ':input[name="miscellaneous[button]"]' => array('checked' => TRUE),
      ),
    ),
  );

  /* Action buttons */
  $form['actions'] = array(
    '#type'   => 'actions',
    '#weight' => 1000,
  );
  $form['actions']['submit'] = array(
    '#type'  => 'submit',
    '#value' => t('Save configuration'),
  );

  return $form;
}

/**
 * Validation handler.
 */
function qtip_configure_instance_form_validate(&$form, &$form_state) {
}

/**
 * Submission handler.
 */
function qtip_configure_instance_form_submit(&$form, &$form_state) {
  if ($form_state['clicked_button']['#id'] == 'edit-actions-submit') {
    $qt = _qtip_convert_form_to_qtips($form_state);
    $exists = qtip_load($qt->machine_name);
    if ($exists && empty($exists->in_code_only)) {
      if (qtip_update($qt)) {
        drupal_set_message(t('The qTip instance %name has been updated.', array('%name' => $qt->name)));
      }
    }
    else {
      if (qtip_save($qt)) {
        drupal_set_message(t('The qTip instance %name has been created.', array('%name' => $qt->name)));
      }
    }

    $form_state['redirect'] = 'admin/config/user-interface/qtip';
  }
}

/**
 * Clone qTip instance.
 */
function qtip_clone($qt) {
  unset($qt->machine_name);
  $qt->name = '';

  return drupal_get_form('qtip_configure_instance_form', $qt);
}

/**
 * Delete qTip instance.
 */
function qtip_delete_instance($form, $form_state, $qt) {
  $form['machine_name'] = array('#type' => 'hidden', '#value' => $qt->machine_name);
  $form['name'] = array('#type' => 'hidden', '#value' => $qt->name);
  return confirm_form($form, t('Are you sure you want to delete the qtip instance %name?', array('%name' => $qt->name)), 'admin/config/user-interface/qtip');
}

/**
 * Revert qTip instance.
 */
function qtip_revert_instance($form, $form_state, $qt) {
  $form['machine_name'] = array('#type' => 'hidden', '#value' => $qt->machine_name);
  $form['name'] = array('#type' => 'hidden', '#value' => $qt->name);
  return confirm_form($form, t('Are you sure you want to revert the qtip instance %name?', array('%name' => $qt->name)), 'admin/config/user-interface/qtip');
}

/**
 * Submit handler for qtip_delete_instance.
 */
function qtip_delete_instance_submit($form, &$form_state) {
  qtip_delete($form_state['values']['machine_name']);
  if ($form_state['values']['form_id'] == 'qtip_revert_instance') {
    drupal_set_message(t('The qTip instance %name has been reverted.', array('%name' => $form_state['values']['name'])));
  }
  else {
    drupal_set_message(t('The qTip instance %name has been removed.', array('%name' => $form_state['values']['name'])));
  }
  cache_clear_all();
  $form_state['redirect'] = 'admin/config/user-interface/qtip';
};

/**
 * Submit handler for qtip_revert_instance.
 */
function qtip_revert_instance_submit($form, &$form_state) {
  // We are deleting the overridden values in the database, so we just pass on to the deletion function
  qtip_delete_instance_submit($form, $form_state);
}

/**
 * Export form for qtip.
 */
function qtip_export_form($form, &$form_state, $qt) {
  ctools_include('export');
  // Generate export code
  $code = ctools_export_object('qtip', $qt, '');

  // Create form
  $form = array();
  $form['export'] = array(
    '#type'          => 'textarea',
    '#default_value' => $code,
    '#rows'          => substr_count($code, "\n") + 1,
    '#resizable'     => FALSE,
    '#description'   => t('Place this code in your module\'s implementation of <code>hook_qtip_default_qtips()</code> to provide it as a default qtip.'),
  );

  return $form;
}

/**
 * Helper function to convert the data on admin form into qtip presentation.
 */
function _qtip_convert_form_to_qtips($form_state) {
  $qt = new stdClass();
  $qt->name = $form_state['values']['name'];

  if (isset($form_state['values']['machine_name'])) {
    $qt->machine_name = $form_state['values']['machine_name'];
  }

  $qt->settings = array(
    'content'  => array(
      'button' => $form_state['values']['miscellaneous']['button'],
    ),
    'style'         => $form_state['values']['style'],
    'position'      => $form_state['values']['position'],
    'show'          => $form_state['values']['show'],
    'hide'          => $form_state['values']['hide'],
    'miscellaneous' => array(
      'button_title_text' => $form_state['values']['miscellaneous']['button_title_text'],
    ),
  );

  return $qt;
}

/**
 * Helper function to get options for tooltip positioning.
 */
function _qtip_admin_tooltip_position_options($normal = TRUE) {
  $options = array(
    'top left'      => 'Top Left Corner',
    'top center'    => 'Top Center',
    'top right'     => 'Top Right Corner',
    'right top'     => 'Right Top Corner',
    'right center'  => 'Right Center',
    'right bottom'  => 'Right Bottom Corner',
    'bottom right'  => 'Bottom Right Corner', // Default value from qTip library
    'bottom center' => 'Bottom Center',
    'bottom left'   => 'Bottom Left Corner',
    'left bottom'   => 'Left Bottom Corner',
    'left center'   => 'Left Center',
    'left top'      => 'Left Top',
    'center'        => 'Center',
  );

  if ($normal) {
    // Prepend a 'Normal' option onto the beginning of the array, if set
    $normal = array('' => 'Normal');
    $options = $normal + $options;
  }

  return $options;
}
