<?php
/**
 * @file clients.connection.admin.inc
 * Page callbacks relating to client connection admin.
 */

/**
 * (Tentative) Interface for clients connection admin UI.
 */
interface ClientsConnectionAdminUIInterface {

  /**
   * Add configuration form elements specific to a connection's edit form.
   *
   * @param $form
   *  The form built so far. This contains the elements for the name and
   *  endpoint, but not the save button.
   * @param $form_state
   *  The form state from the main form, which you probably don't need anyway.
   *
   * @see clients_connection_form()
   * @see clients_connection_form_submit()
   */
  function connectionSettingsFormAlter(&$form, &$form_state);

}

/**
 * Interface for testing handlers.
 */
interface ClientsConnectionTestingInterface {

  /**
   * The labels for the test.
   *
   * (This is because it would seem you can't define class variables using
   * expressions.)
   *
   * @return
   *  An array of translated strings keyed as follows:
   *    - 'label': The label for the test fieldset.
   *    - 'description': The description for the test fieldset.
   *    - 'button': The text for the test button.
   */
  function testLabels();

  /**
   * Execute the test.
   *
   * Connection test handlers should return the raw data they got back from the
   * connection for display to the user.
   *
   * @param $connection
   *  The connection handler.
   * @param $button_form_values
   *  The form values for the test form element. The values for elements added
   *  to the form are in $button_form_values['params'].
   *
   * @return
   *  Data from the remote connection. This is output to the form as raw data.
   */
  function test($connection, &$button_form_values);

}

/**
 * Form builder for editing a connection.
 *
 * Gets the class of the connection from the data in the form and calls the
 * connectionSettingsFormAlter() method on the class to build the form.
 * This allows different elements for different connection types.
 *
 * @param $connection
 *  A connection object.
 *
 * @see clients_connection_form_submit()
 */
function clients_connection_form($form, &$form_state, $connection, $op = 'edit') {
  // Fix breadcrumb which is broken here for who knows what reason.
  $breadcrumb = drupal_get_breadcrumb();
  $breadcrumb[] = l(t('Clients'), 'admin/structure/clients');
  drupal_set_breadcrumb($breadcrumb);

  // Notify the user if this connection is either going to be substituted with
  // an environment-specific one, or is one that substitutes for another.
  $environment_name = variable_get('environment_name', NULL);
  if (isset($environment_name)) {
    // Create a replacement name by appending the environment name.
    $replacement_connection_name = $connection->name . '_' . $environment_name;
    // Use entity_load_single() so we bypass connection replacement.
    if ($replacement_connection = entity_load_single('clients_connection', $replacement_connection_name)) {
      // Is this going to get overlooked for another connection?
      // ie. is NAME + ENV = another connection?
      $message = t("This connection is inactive due to the site's environment setting. The <a href=\"!url\">%connection connection</a> will be substituted for it.", array(
        '!url' => url('admin/structure/clients/connections/manage/' . $replacement_connection_name),
        '%connection' => $replacement_connection->label,
      ));
    }
    elseif (substr($connection->name, -1 * strlen($environment_name)) == $environment_name) {
      $original_connection_name = substr($connection->name, 0, -1 * (strlen($environment_name) + 1));
      if ($original_connection = entity_load_single('clients_connection', $original_connection_name)) {
        $message = t("Due to the site's environment setting, this connection will substitute for the <a href=\"!url\">%connection connection</a>.", array(
          '!url' => url('admin/structure/clients/connections/manage/' . $original_connection_name),
          '%connection' => $original_connection->label,
        ));
      }
    }

    if (isset($message)) {
      drupal_set_message($message);
    }
  }

  $form = array();

  $type = $connection->type;
  $class = 'clients_connection_' . $type;

  if ($op == 'clone') {
    $connection->label .= ' (cloned)';
    $connection->name = '';
  }

  $form['#connection'] = clone($connection);

  $form['fake_type'] = array(
    '#type' => 'textfield',
    '#title' => t('Connection type'),
    '#description' => t('The type of this connection. May not be changed.'),
    '#value' => $connection->type,
    '#size' => 50,
    '#disabled' => TRUE,
  );

  $form['label'] = array(
    '#type' => 'textfield',
    '#title' => t('Connection label'),
    '#default_value' => isset($connection->label) ? $connection->label : '',
    '#size' => 50,
    '#maxlength' => 100,
    '#description' => t('The human-readable name for the connection.'),
    '#required' => TRUE,
  );

  // Machine-readable type name.
  $form['name'] = array(
    '#type' => 'machine_name',
    '#default_value' => isset($connection->name) ? $connection->name : '',
    '#maxlength' => 32,
    '#machine_name' => array(
      'exists' => 'clients_connection_load',
      'source' => array('label'),
    ),
    '#description' => t('A unique machine-readable name for this connection. It must only contain lowercase letters, numbers, and underscores.'),
  );
  /*
  if ($connection->name) {
    $form['name']['#description'] .= '<br /><strong>' . t('Warning: Changing the name of an existing connection may affect any data you have stored based on that connection.') . '</strong>';
  }
  */

  $form['endpoint'] = array(
    '#type' => 'textfield',
    '#title' => t('Connection endpoint'),
    '#default_value' => isset($connection->endpoint) ? $connection->endpoint : '',
    '#size' => 100,
    '#maxlength' => 100,
    '#description' => t('Remote service URL e.g. http://mysite.com/services/endpoint'),
    '#required' => TRUE,
  );

  // Container for all form elements whose values should be serialized to the
  // configuration array.
  // Not a fieldset by default, but connection classes may choose to do this.
  $form['configuration'] = array(
    '#tree' => TRUE,
  );

  $form['configuration']['debug'] = array(
    '#type' => 'checkbox',
    '#title' => t('Debugging mode'),
    '#description' => t('Outputs debug data for this connection. (Not all connection types support this.)'),
    '#weight' => 100,
  );

  // Container for credentials form elements.
  $form['credentials'] = array(
    '#type' => 'fieldset',
    '#title' => t('Credentials'),
    '#tree' => TRUE,
  );

  $form['#connection_credentials_storage'] = isset($connection->configuration['credentials_storage'])
    ? $connection->configuration['credentials_storage']
    : NULL;

  $form['credentials']['credentials_storage'] = array(
    '#type' => 'radios',
    '#title' => t('Credentials storage'),
    '#required' => TRUE,
    '#default_value' => $form['#connection_credentials_storage'],
  );

  // Get an array of the available label plugins.
  ctools_include('plugins');
  $credentials_plugins = ctools_get_plugins('clients', 'clients_credentials_storage');
  $options = array();
  foreach ($credentials_plugins as $credentials_plugin => $credentials_plugin_info) {
    $options[$credentials_plugin] = $credentials_plugin_info['label'];
    $form['credentials']['credentials_storage'][$credentials_plugin]['#description'] = $credentials_plugin_info['description'];
  }
  $form['credentials']['credentials_storage']['#options'] = $options;

  // Get the current (or default) storage plugin, and get the credentials from
  // it.
  $credentials_storage_plugin = $connection->get_credentials_storage_plugin();
  $credentials_storage_plugin->credentialsLoad($connection);

  $form['#connection_type'] = $type;
  $form['#connection_class'] = $class;

  // Allow the connection class to make additions to the form.
  $connection->connectionSettingsFormAlter($form, $form_state);

  // Fill in the default values from the connection configuration; save the
  // handler class all the legwork.
  foreach (element_children($form['configuration']) as $configuration_key) {
    if (isset($connection->configuration[$configuration_key])) {
      $form['configuration'][$configuration_key]['#default_value'] = $connection->configuration[$configuration_key];
    }
  }
  // Fill in the default values for the credentials.
  $credentials_properties = $connection->credentialsProperties();
  foreach ($credentials_properties as $property_name) {
    if (isset($connection->credentials[$property_name])) {
      $form['credentials'][$property_name]['#default_value'] = $connection->credentials[$property_name];
    }
  }

  $form['actions']['submit'] = array(
    '#type' => 'submit',
    '#value' => t('Save connection'),
  );
  $form['actions']['delete'] = array(
    '#name' => 'delete',
    '#type' => 'submit',
    '#value' => t('Delete connection'),
  );

  return $form;
}

/**
 * Form submit handler for the connection form.
 *
 * Gets the class of the connection from the data in the form and calls the
 * connectionSettingsForm_submit() method on the class.
 * This allows different behaviour for different connection types, while
 * saving is handled here.
 *
 * @see clients_connection_form()
 * @see clients_connection_base::connectionSettingsForm_submit()
 */
function clients_connection_form_submit($form, &$form_state) {
  // If the delete button was clicked, redirect to the delete form and quit.
  if ($form_state['triggering_element']['#name'] == 'delete') {
    $form_state['redirect'] = 'admin/structure/clients/connections/manage/' . $form['#connection']->name . '/delete';
    return;
  }

  // Build the entity from the form values.
  // Note that this will place a 'credentials' propery on it, from the form
  // fieldset, which will not be saved because there is no schema for it.
  $connection = entity_ui_form_submit_build_entity($form, $form_state);

  ctools_include('plugins');

  // Set the credentials storage plugin id on the connection.
  $connection->configuration['credentials_storage'] = $form_state['values']['credentials']['credentials_storage'];

  // Call connectionSettingsForm_submit() on the connection handler.
  // This allows treatment of form values particular to the connection type.
  // The base class also handles restoring the password from credentials storage
  // to the connection if the form element was left blank.
  $connection->connectionSettingsForm_submit($form, $form_state);

  // Call the credentials storage plugin to handle saving the credentials.
  $credentials_storage_plugin = $connection->get_credentials_storage_plugin();
  $credentials_storage_plugin->credentialsSave($connection);

  // If the credentials storage method has changed, delete the old storage.
  // We do this last, as the copying of the password relies on the old
  // credentials still existing.
  if (isset($form['#connection_credentials_storage'])
      && $form['#connection_credentials_storage'] != $form_state['values']['credentials']['credentials_storage']) {
    // Delete the credentials from the old storage.
    // Get the old plugin for $form['#connection_credentials_storage'].
    $old_credentials_storage_plugin = $connection->get_credentials_storage_plugin($form['#connection_credentials_storage']);
    // Let the old plugin delete its storage.
    $old_credentials_storage_plugin->credentialsDelete($connection);
  }

  // Save and go back.
  $connection->save();

  drupal_set_message(t('Connection saved.'));

  $form_state['redirect'] = 'admin/structure/clients/connections';
}

/**
 * Page callback to view a single connection.
 *
 * TODO: reimplement??
 *
 * @param $connection
 *  A loaded connection.
 */
function clients_connection_view($connection) {
  // Build summary table.
  $rows = array();
  $rows[] = array(t('Name'), check_plain($connection->name));
  $rows[] = array(t('Type'), $connection->type);
  $rows[] = array(t('Endpoint'), $connection->formatEndpoint($connection->endpoint));
  $rows[] = array(t('Storage'), $connection->export_type_label);
  foreach ($connection->configuration as $label => $val) {
    if (is_array($val)) {
      $val = implode(', ', $val); // needs to be recursive?
    }
    $rows[] = array(ucfirst(t($label)), nl2br(check_plain($val)));

  }

  return theme('table', array(
    'rows' => $rows,
  ));
}

/**
 * Form to test a connection.
 *
 * @param $connection
 *  A loaded connection.
 */
function clients_connection_test_form($form, &$form_state, $connection) {
  // Fix breadcrumb which is broken here for who knows what reason.
  $breadcrumb = drupal_get_breadcrumb();
  array_pop($breadcrumb);
  $breadcrumb[] = l(t('Clients'), 'admin/structure/clients');
  drupal_set_breadcrumb($breadcrumb);

  $type_definition = clients_get_connection_types($connection->type);

  $form['#connection'] = $connection;

  $form['connection'] = array(
    '#type' => 'fieldset',
    '#title' => t('Connection details'),
  );
  $items[] = t('Type') . ': ' . $type_definition['label'];
  $items[] = t('Name') . ': ' . check_plain($connection->name);
  $items[] = t('Endpoint') . ': ' . $connection->endpoint;
  $resources = clients_resource_load_for_connection($connection->name);
  $resource_labels = array();
  foreach ($resources as $resource) {
    $uri = $resource->uri();
    $resource_labels[] = l($resource->label, $uri['path']);
  }
  $items[] = t('Resources') . ': ' . implode(', ', $resource_labels);
  $form['connection']['details'] = array(
    '#markup' => theme('item_list', array('items' => $items)),
  );

  // Buttons.
  // ??? These are themed into a vertical list with the description text alongside each one.
  $form['buttons'] = array(
    '#tree' => TRUE,
  );

  // Allow applications that use this connection to add their own test buttons.
  if (empty($type_definition['tests'])) {
    $type_definition['tests'] = array();
  }
  drupal_alter('client_connection_tests', $type_definition['tests'], $connection);

  // Store the type definition with the altered tests in the form for the
  // validate and submit handlers.
  $form['#connection_type'] = $type_definition;

  if (!empty($type_definition['tests'])) {
    foreach ($type_definition['tests'] as $test_name => $test_class) {
      $test_handler = new $test_class();
      // Get the labels from the test handler.
      $labels = $test_handler->testLabels();

      // Build a template form element to pass in to the test handler.
      $element = array(
        '#type' => 'fieldset',
        '#title' => $labels['label'],
      );
      $element['description'] = array(
        '#prefix' => '<div>',
        '#markup' => $labels['description'],
        '#suffix' => '</div>',
      );
      $element['params'] = array(
      );
      $element['submit'] = array(
        '#type' => 'button',
        '#value' => $labels['button'],
        '#name' => $test_name,
        '#ajax' => array(
          'event' => 'click',
          'callback' => 'clients_connection_test_js',
          'wrapper' => $test_name . '-results',
          'name' => $test_name,
        ),
        '#limit_validation_errors' => array(
          array('buttons', $test_name),
        ),
      );
      // AJAX wrapper for test results.
      $element['results'] = array(
        '#prefix' => '<div id="' . $test_name . '-results">',
        '#suffix' => '</div>',
      );

      if (method_exists($test_handler, 'testForm')) {
        $form['buttons'][$test_name] = $test_handler->testForm($element);
      }
      else {
        $form['buttons'][$test_name] = $element;
      }

    }
  }
  else {
    // TODO: show a message if no buttons at all!?
  }

  return $form;
}

/**
 * Validate handler for the connection test page.
 *
 * Call the validate handler on the test class, if it has one.
 */
function clients_connection_test_form_validate($form, &$form_state) {
  $connection = $form['#connection'];
  $type_definition = $form['#connection_type'];
  $test_name = $form_state['clicked_button']['#name'];
  if (isset($form_state['clicked_button']['#name'])) {
    $test_class = $type_definition['tests'][$test_name];
    $test_handler = new $test_class();

    // Call formValidate() on the test handler. This allows handlers to validate
    // their test form element.
    if (method_exists($test_handler, 'formValidate')) {
      $test_handler->formValidate($form_state['values']['buttons'][$test_name]);
    }
  }
}

/**
 * AJAX callback for test buttons.
 */
function clients_connection_test_js($form, &$form_state) {
  //dsm($form_state);
  $connection = $form['#connection'];
  $type_definition = $form['#connection_type'];
  $test_name = $form_state['clicked_button']['#name'];

  $test_class = $type_definition['tests'][$test_name];

  $test_handler = new $test_class();

  // Only perform the test if the form has no errors.
  $errors = form_get_errors();
  if (!$errors) {
    // Only pass the method the values that are related to it; everything else is just cruft.
    $results = $test_handler->test($connection, $form_state['values']['buttons'][$test_name]);

    $form['buttons'][$test_name]['results']['output'] = array(
      '#markup' => '<pre>' . check_plain(print_r($results, TRUE)) . '</pre>',
    );
  }

  // Place the data returned from the connection in the form for display.
  return $form['buttons'][$test_name]['results'];
}

/**
 * Devel tab for Clients connections.
 */
function clients_connection_page_devel($connection) {
  $output = kprint_r($connection, TRUE);

  return $output;
}
