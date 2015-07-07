<?php

class qtip_views_plugin_display_extender extends views_plugin_display_extender {
  function options_definition_alter(&$options) {
    $options['qtip_tooltips'] = array('default' => array(), 'unpack_translatable' => 'unpack_tooltips');
    $options['qtip_instance'] = array('default' => array());
  }

  function unpack_tooltips(&$translatable, $storage, $option, $definition, $parents, $keys = array()) {
    $tooltips = $storage[$option];
    if (!empty($tooltips)) foreach ($tooltips as $field => $tooltip) {
      $translation_keys = array_merge($keys, array($field));
      $translatable[] = array(
        'value'  => $tooltip,
        'keys'   => $translation_keys,
        'format' => NULL,
      );
    }
  }

  function options_form(&$form, &$form_state) {
    if (strpos($form['#section'], '-style_options') !== FALSE) {
      $form['qtip_instance'] = qtip_fetch_instances_field($this->display->get_option('qtip_instance'));
    }
  }

  function options_submit(&$form, &$form_state) {
    if ($form_state['section'] == 'style_options') {
      $this->display->set_option('qtip_instance', $form_state['values']['qtip_instance']);
    }
  }

  // Not sure what this does exactly ??
  function options_summary(&$categories, &$options) {
    $options['qtip_instance'] = array(
      'category' => 'other',
      'title'    => t('qTip settings'),
      'value'    => t('Settings'),
      'desc'     => t('Change the qTip settings for this display.'),
    );
  }
}
