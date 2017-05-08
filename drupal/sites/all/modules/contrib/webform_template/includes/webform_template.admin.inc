<?php

/**
 * @file
 * Contains page callbacks for webform_template
 */

/**
 * Settings form for webform_template.
 * @param $form
 * @param $form_state
 * @return mixed
 */
function webform_template_config_form($form, &$form_state) {
  $webform_types = webform_variable_get('webform_node_types', array());

  if (!empty($webform_types)) {
    foreach ($webform_types as $type) {
      $types[$type] =  node_type_get_name($type);
    }

    $form['src_dest'] = array(
      '#type' => 'fieldset',
      '#title' => t('Source and destination'),
    );

    $form['src_dest']['webform_template_src'] = array(
      '#type' => 'checkboxes',
      '#title' => t('Template source(s)'),
      '#default_value' => variable_get('webform_template_src', array()),
      '#options' => $types,
      '#description' => t("Select any node types which will function as a template. Typically you will want to use a specific node type that isn't used for anything else."),
    );

    $form['src_dest']['webform_template_dest'] = array(
      '#type' => 'checkboxes',
      '#title' => t('Template destination(s)'),
      '#default_value' => variable_get('webform_template_dest', array()),
      '#options' => $types,
      '#description' => t('Select any node types that should have the option to apply webform templates to them.'),
    );

    $form['other'] = array(
      '#type' => 'fieldset',
      '#title' => t('Other'),
    );

    $form['other']['webform_template_lang'] = array(
      '#type' => 'checkbox',
      '#title' => t('Display language'),
      '#default_value' => variable_get('webform_template_lang', FALSE),
      '#description' => t("Check this box to show the template's language in the attach form."),
    );

    $form['other']['webform_template_defeat_nodeaccess'] = array(
      '#type' => 'checkbox',
      '#title' => t('Defeat node access'),
      '#default_value' => variable_get('webform_template_defeat_nodeaccess', FALSE),
      '#description' => t("Check this box to disable node access checks when building the list of available templates. <strong>Security risk, evaluate with care.</strong>"),
    );

    $form['other']['webform_template_collapsible'] = array(
      '#type' => 'checkbox',
      '#title' => t('Collapsible fieldset'),
      '#default_value' => variable_get('webform_template_collapsible', FALSE),
      '#description' => t("Check this box to make the webform template fieldset on nodes collapsible."),
    );

  }
  else {
    drupal_set_message(t('Please go to the webform settings first and enable webform for at least one content type.'));
  }

  return system_settings_form($form);
}

