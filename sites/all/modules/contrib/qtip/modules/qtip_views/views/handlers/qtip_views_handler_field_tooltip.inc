<?php

class qtip_views_handler_field_tooltip extends views_handler_field_custom {
  function option_definition() {
    $options = parent::option_definition();

    $options['qtip_views']['title']         = array('default' => '', 'translatable' => TRUE);
    $options['qtip_views']['text']          = array('default' => '', 'translatable' => TRUE);
    $options['qtip_views']['hide_if_equal'] = array('default' => TRUE, 'translatable' => TRUE);
    $options['qtip_views']['instance']      = array('default' => '', 'translatable' => FALSE);

    return $options;
  }

  function options_form(&$form, &$form_state) {
    // First get the basic form fields (label, textfield, exclude display)...
    parent::options_form($form, $form_state);

    // ... then build our custom fields
    $form['qtip_views'] = array(
      '#type'        => 'fieldset',
      '#title'       => t('qTip settings'),
      '#collapsible' => FALSE,
    );
    $form['qtip_views']['title'] = array(
      '#type'          => 'textfield',
      '#title'         => t('Title'),
      '#description'   => t('The title to give the tooltip.'),
      '#default_value' => $this->options['qtip_views']['title'],
    );
    $form['qtip_views']['text'] = array(
      '#type'          => 'textarea',
      '#title'         => t('Text'),
      '#description'   => t('The text to display for the tooltip of this field. You may include HTML. You may enter data from this view as per the "Replacement patterns".'),
      '#default_value' => $this->options['qtip_views']['text'],
    );
    $form['qtip_views']['hide_if_equal'] = array(
      '#type'          => 'checkbox',
      '#title'         => t('Hide the tooltip if equal to the text'),
      '#default_value' => $this->options['qtip_views']['hide_if_equal'],
    );
    $form['qtip_views']['instance'] = qtip_fetch_instances_field($this->options['qtip_views']['instance']);
  }

  function render_text($alter) {
    // If available, render the content, passing it to upstream renderer...
    if ($content = parent::render_text($alter)) {
      // ... then render the tooltip.
      $tokens = $this->get_render_tokens($alter);

      $title = str_replace(array_keys($tokens), array_values($tokens), $this->options['qtip_views']['title']);
      $tooltip = str_replace(array_keys($tokens), array_values($tokens), $this->options['qtip_views']['text']);

      if ($tooltip === '' || ($this->options['qtip_views']['hide_if_equal'] && ($content == $tooltip))) {
        return $content;
      }
      else {
        $theme_variables = array(
          'content'  => $content,
          'title'    => $title,
          'tooltip'  => $tooltip,
          'instance' => $this->options['qtip_views']['instance'],
        );

        return theme('qtip', $theme_variables);
      }
    }
  }
}
