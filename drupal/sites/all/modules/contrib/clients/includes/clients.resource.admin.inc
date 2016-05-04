<?php
/**
 * @file clients.resource.admin.inc
 * Page callbacks relating to client resource admin.
 */

/**
 * Resource form.
 */
function clients_resource_form($form, &$form_state, $resource, $op = 'edit') {
  $form['label'] = array(
    '#type' => 'textfield',
    '#title' => t('Resource label'),
    '#default_value' => isset($resource->label) ? $resource->label : '',
    '#size' => 50,
    '#maxlength' => 100,
    '#description' => t('The human-readable name for the resource.'),
    '#required' => TRUE,
  );

  // Machine-readable type name.
  $form['name'] = array(
    '#type' => 'machine_name',
    '#default_value' => isset($resource->name) ? $resource->name : '',
    '#maxlength' => 32,
    '#machine_name' => array(
      'exists' => 'clients_resource_load',
      'source' => array('label'),
    ),
    '#description' => t('A unique machine-readable name for this resource. It must only contain lowercase letters, numbers, and underscores.'),
  );

  /*
  // add this as markup for info?
  $form['type'] = array(
    '#type' => 'textfield',
    '#title' => t('Connection type'),
    '#description' => t('The type of this connection. May not be changed.'),
    '#value' => $resource->type,
    '#size' => 50,
    '#disabled' => TRUE,
  );
  */

  $options = clients_connections_select_options();
  $form['connection'] = array(
    '#type' => 'select',
    '#title' => t('Connection'),
    '#options' => $options,
    '#default_value' => isset($resource->connection) ? $resource->connection : '',
    '#description' => t('The connection to use for this resource.'),
  );

  // Most resource types should alter this form element to be more specific
  // to what they do.
  $form['component'] = array(
    '#title' => t('Component name'),
    '#type' => 'textfield',
    '#default_value' => isset($resource->component) ? $resource->component : '',
    '#maxlength' => 32,
    '#description' => t('The component to provide.'),
    '#required' => TRUE,
  );

  // Container for all form elements whose values should be serialized to the
  // configuration array.
  // Not a fieldset by default, but connection classes may choose to do this.
  $form['configuration'] = array(
    '#tree' => TRUE,
  );

  // Allow the connection class to make additions and alterations to the form.
  $resource->resourceSettingsFormAlter($form, $form_state);

  $form['actions']['submit'] = array(
    '#type' => 'submit',
    '#value' => t('Save resource'),
  );
  $form['actions']['delete'] = array(
    '#name' => 'delete',
    '#type' => 'submit',
    '#value' => t('Delete resource'),
  );

  return $form;
}

function clients_resource_form_submit($form, &$form_state) {
  // If the delete button was clicked, redirect to the delete form and quit.
  if ($form_state['triggering_element']['#name'] == 'delete') {
    // The resource is in the build info.
    $resource_name = $form_state['build_info']['args'][0]->name;
    $form_state['redirect'] = 'admin/structure/clients/resources/manage/' . $resource_name . '/delete';
    return;
  }

  $resource = entity_ui_form_submit_build_entity($form, $form_state);

  // Save and go back.
  $resource->save();

  drupal_set_message(t('Resource saved.'));

  $form_state['redirect'] = 'admin/structure/clients/resources';
}
