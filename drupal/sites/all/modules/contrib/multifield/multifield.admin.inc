<?php

/**
 * @file
 * Administation pages and forms for the Multifield module.
 */

function multifield_list_page() {
  $header = array(
    t('Label'),
    t('Machine name'),
    t('Subfields'),
    t('Used as field in'),
    t('Operations'),
  );

  $rows = array();
  foreach (multifield_load_all() as $machine_name => $multifield) {
    $row = array('data' => array());
    $row['data'][] = check_plain($multifield->label);
    $row['data'][] = check_plain($machine_name);

    $subfields = field_info_instances('multifield', $machine_name);
    $row['data'][] = count($subfields);
    switch (count($subfields)) {
      case 0:
        $row['class'][] = 'error';
        $row['title'] = t('You will not be able to use this multifield until it has at least one subfield.');
        break;

      case 1:
        $row['class'][] = 'warning';
        $row['title'] = t('A multifield with only one subfield does not make a lot of sense. You should add more fields or just use a normal field.');
        break;
    }

    $fields = _multifield_get_usage_summary($machine_name, TRUE);
    $row['data'][] = !empty($fields) ? theme('item_list', array('items' => $fields)) : t('None');

    $base = 'admin/structure/multifield/manage/' . $machine_name;
    $operations = array();
    if (multifield_edit_access($multifield)) {
      $operations['edit'] = array(
        'title' => t('Edit'),
        'href' => $base,
      );
    }
    if (module_exists('field_ui')) {
      $operations['manage fields'] = array(
        'title' => t('Manage subfields'),
        'href' => $base . '/fields',
      );
      $operations['manage display'] = array(
        'title' => t('Manage display'),
        'href' => $base . '/display',
      );
    }
    if (multifield_edit_access($multifield)) {
      $operations['delete'] = array(
        'title' => t('Delete'),
        'href' => $base . '/delete',
      );
    }
    if (!empty($operations)) {
      $row['data'][] = theme('links', array('links' => $operations, 'attributes' => array('class' => array('links', 'inline', 'nowrap'))));
    }
    else {
      $row['data'][] = '';
    }

    $rows[] = $row;
  }

  $build['table'] = array(
    '#theme' => 'table',
    '#header' => $header,
    '#rows' => $rows,
    '#empty' => t('No multifield types available.'),
  );

  return $build;
}

function multifield_edit_form($form, &$form_state, $multifield = NULL) {
  if (!isset($multifield)) {
    $multifield = (object) array(
      'mfid' => NULL,
      'machine_name' => NULL,
      'label' => NULL,
      'description' => NULL,
    );
  }

  $form['mfid'] = array(
    '#type' => 'value',
    '#value' => !empty($multifield->mfid) ? $multifield->mfid : NULL,
  );

  $form['label'] = array(
    '#type' => 'textfield',
    '#title' => t('Label'),
    '#description' => t('This will appear in the administrative interface to easily identify it.'),
    '#default_value' => $multifield->label,
    '#required' => TRUE,
    '#maxlength' => 255,
  );

  $form['machine_name'] = array(
    '#type' => 'machine_name',
    '#title' => t('Machine name'),
    '#description' => t('The unique ID for this multifield type.'),
    '#default_value' => $multifield->machine_name,
    '#required' => TRUE,
    '#machine_name' => array(
      'exists' => 'multifield_field_machine_name_exists',
      'label' => t('Field type machine name'),
      'source' => array('label'),
    ),
    // Same maximum length as {field_config}.type
    '#maxlength' => 128,
    // Cannot change the machine name once created.
    '#disabled' => !empty($multifield->machine_name),
  );

  $form['description'] = array(
    '#type' => 'textfield',
    '#title' => t('Description'),
    '#default_value' => $multifield->machine_name,
    '#access' => FALSE,
  );

  $form['actions'] = array(
    '#type' => 'actions',
  );
  $form['actions']['save'] = array(
    '#type' => 'submit',
    '#value' => !empty($multifield->is_new) ? t('Save and add subfields') : t('Save'),
  );
  $form['actions']['cancel'] = array(
    '#type' => 'link',
    '#title' => t('Cancel'),
    '#href' => 'admin/structure/multifield',
  );

  return $form;
}

function multifield_edit_form_submit($form, &$form_state) {
  form_state_values_clean($form_state);
  $multifield = (object) $form_state['values'];
  $multifield->is_new = empty($multifield->mfid);
  multifield_save($multifield);
  watchdog('multifield', 'Saved multifield type %type.', array('%type' => $multifield->label), WATCHDOG_INFO);

  if (!empty($multifield->is_new)) {
    if (module_exists('field_ui')) {
      $form_state['redirect'] = 'admin/structure/multifield/manage/' . $multifield->machine_name . '/fields';
    }
    else {
      drupal_set_message(t('The Field UI module must be enabled to add fields to the multifield.'));
      $form_state['redirect'] = 'admin/structure/multifield';
    }
  }
  else {
    $form_state['redirect'] = 'admin/structure/multifield';
  }
}

function multifield_delete_form($form, &$form_state, $multifield) {
  $form['#multifield'] = $multifield;

  $description = '<div class="messages warning">';
  if ($fields = _multifield_get_usage_summary($multifield->machine_name)) {
    $description .= t('The following fields and their respective data will also be removed:') . theme('item_list', array('items' => $fields));
  }
  $description .= ' ' . t('This action cannot be undone.') . '</div>';

  return confirm_form(
    $form,
    t('Are you sure you want to delete this multifield type?'),
    'admin/structure/multifield',
    $description
  );
}

function multifield_delete_form_submit($form, &$form_state) {
  $multifield = $form['#multifield'];
  multifield_delete($multifield);

  watchdog('multifield', 'Deleted multifield type %type.', array('%type' => $multifield->label));
  $form_state['redirect'] = 'admin/structure/multifield';
}

function _multifield_get_usage_summary($machine_name, $links = FALSE) {
  $fields = array();
  foreach (multifield_type_get_fields($machine_name) as $field_name) {
    $field = field_info_field($field_name);
    foreach ($field['bundles'] as $entity_type => $bundles) {
      foreach ($bundles as $bundle) {
        $text = "$field_name ($entity_type:$bundle)";
        if ($links && module_exists('field_ui')) {
          $path = _field_ui_bundle_admin_path($entity_type, $bundle) . '/fields/' . $field_name;
          $fields[] = l($text, $path);
        }
        else {
          $fields[] = check_plain($text);
        }
      }
    }
  }
  return $fields;
}
