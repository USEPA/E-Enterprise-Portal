<?php
/**
 * @file
 * Base field handler for views_json_query.
 */

class views_json_query_handler_field extends views_handler_field {
  /**
   * Render.
   */
  function render($values) {
    $key = $this->field_alias;

    if (!isset($values->$key)) {
      return '';
    }

    $values = $values->$key;

    return $this->render_field($values);
  }

  /**
   * Renders field.
   */
  function render_field($value) {
    return check_plain($value);
  }

  /**
   * Option definition.
   */
  function option_definition() {
    $options = parent::option_definition();
    $options['key'] = array('default' => '');
    return $options;
  }

  /**
   * Options form.
   */
  function options_form(&$form, &$form_state) {
    parent::options_form($form, $form_state);
    $form['key'] = array(
      '#title' => t('Key Chooser'),
      '#description' => t('choose a key'),
      '#type' => 'textfield',
      '#default_value' => $this->options['key'],
      '#required' => TRUE,
    );
  }

  /**
   * Called to add the field to a query.
   */
  function query() {
    // Add the field.
    $this->table_alias = 'json';

    $this->field_alias = $this->query->add_field(
      $this->table_alias,
      $this->options['key'],
      '',
      $this->options
    );
  }

  /**
   * UI name.
   */
  function ui_name($short = FALSE) {
    if (!empty($this->options['ui_name'])) {
      $title = check_plain($this->options['ui_name']);
      return $title;
    }
    $title = $this->definition['title'];

    if ($short && isset($this->definition['title short'])) {
      $title = $this->definition['title short'];
    }

    return t('!key: !title', array(
      '!key' => $this->options['key'],
      '!title' => $title,
    ));
  }

  /**
   * Called to determine what to tell the clicksorter.
   */
  function click_sort($order) {
    if (isset($this->field_alias)) {
      $this->query->add_orderby(NULL, $this->field_alias, $order);
    }
  }
}
