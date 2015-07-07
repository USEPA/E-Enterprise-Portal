<?php
/**
 * @file
 * Provides a qtip content type.
 */

$plugin = array(
  'single'       => TRUE,
  'title'        => t('qTip'),
  'description'  => t('Create a qtip tooltip'),
  'category'     => t('Miscellaneous'),
  'all contexts' => TRUE,
  'defaults'     => array(
    'text'          => '',
    'tooltip_title' => '',
    'tooltip_text'  => '',
    'instance'      => NULL,
    'substitute'    => FALSE,
  ),
  'i18n_settings' => array(
    'text',
    'tooltip_title',
    'tooltip_text',
  ),
  'render callback' => 'ctools_qtip_content_type_render',
  'admin title'     => 'ctools_qtip_content_type_admin_title',
  'admin info'      => 'ctools_qtip_content_type_admin_info',
  'edit form'       => 'ctools_qtip_content_type_edit_form',
);

/**
 * Check if there are errors and if any display message.
 */
function ctools_qtip_content_type_render($subtype, $conf, $panel_args, &$contexts) {
  $block = new stdClass();
  $block->module = t('qtip');
  $block->title = '';
  $block->delta = 'qtip';

  if (!empty($contexts) && !empty($conf['substitute'])) {
    $conf['text'] = ctools_context_keyword_substitute($conf['text'], array(), $contexts);
    $conf['tooltip_title'] = ctools_context_keyword_substitute($conf['tooltip_title'], array(), $contexts);
    $conf['tooltip_text'] = ctools_context_keyword_substitute($conf['tooltip_text'], array(), $contexts);
  }

  $theme_variables = array(
    'content'  => $conf['text'],
    'title'    => $conf['tooltip_title'],
    'tooltip'  => $conf['tooltip_text'],
    'instance' => $conf['instance'],
  );
  $block->content = theme('qtip', $theme_variables);
  return $block;
}

/**
 * Returns the administrative title for a type.
 */
function ctools_qtip_content_type_admin_title($subtype, $conf, $context) {
  return t('qTip') . ': ' . $conf['text'];
}

/**
 * Returns the administrative title for a type.
 */
function ctools_qtip_content_type_admin_info($subtype, $conf, $context) {
  return (object) array(
    'title' => t('Title: %title', array('%title' => $conf['tooltip_title'])),
    'content' => t('Text: %text', array('%text' => $conf['tooltip_text'])),
  );
}

/**
 * Returns an edit form for custom type settings.
 */
function ctools_qtip_content_type_edit_form($form, &$form_state) {
  $conf = $form_state['conf'] + $form_state['plugin']['defaults'];

  $form['text'] = array(
    '#type'          => 'textarea',
    '#title'         => t('Text'),
    '#description'   => t('The text to display as the hover target to show the tooltip of this field. You may use %keywords from contexts.'),
    '#default_value' => $conf['text'],
  );
  $form['tooltip_title'] = array(
    '#type'          => 'textfield',
    '#title'         => t('Tooltip title'),
    '#description'   => t('The text to display as the title of the tooltip of this field. You may use %keywords from contexts.'),
    '#default_value' => $conf['tooltip_title'],
  );
  $form['tooltip_text'] = array(
    '#type'          => 'textarea',
    '#title'         => t('Tooltip text'),
    '#description'   => t('The text to display for the tooltip of this field. You may use %keywords from contexts.'),
    '#default_value' => $conf['tooltip_text'],
  );
  $form['instance'] = array(
    '#type'          => 'select',
    '#title'         => t('Instance'),
    '#description'   => t('Choose the !link that you would like to use for this field.', array('!link' => l(t('qTip instance'), 'admin/config/user-interface/qtip'))),
    '#options'       => qtip_fetch_instances(),
    '#default_value' => $conf['instance'],
  );
  $form['substitute'] = array(
    '#type'          => 'checkbox',
    '#title'         => t('Use context keywords'),
    '#description'   => t('If checked, context keywords will be substituted in this content.'),
    '#default_value' => !empty($conf['substitute']),
  );

  $form['contexts'] = array(
    '#title'       => t('Substitutions'),
    '#type'        => 'fieldset',
    '#collapsible' => TRUE,
    '#collapsed'   => TRUE,
    '#states'      => array(
      'visible' => array(
        ':input[name="substitute"]' => array('checked' => TRUE),
      ),
    ),
  );
  $rows = array();
  foreach ($form_state['contexts'] as $context) {
    foreach (ctools_context_get_converters('%' . check_plain($context->keyword) . ':', $context) as $keyword => $title) {
      $rows[] = array(
        check_plain($keyword),
        t('@identifier: @title', array('@title' => $title, '@identifier' => $context->identifier)),
      );
    }
  }
  $header = array(t('Keyword'), t('Value'));
  $form['contexts']['context'] = array(
    '#markup' => theme('table', array('header' => $header, 'rows' => $rows)),
  );

  return $form;
}

/**
 * Save the config settings.
 */
function ctools_qtip_content_type_edit_form_submit($form, &$form_state) {
  $conf = $form_state['conf'] + $form_state['plugin']['defaults'];
  foreach ($form_state['plugin']['defaults'] as $key => $value) {
    if (is_array($value)) {
      // Ensure it's a complete array.
      $form_state['values'][$key] += $conf[$key];
    }
    if (isset($form_state['values'][$key])) {
      $form_state['conf'][$key] = $form_state['values'][$key];
    }
  }
}
