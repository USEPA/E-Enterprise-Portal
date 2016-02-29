<?php
/**
 * @file
 * Contains classes for Client connection testing.
 */

/**
 * Test basic connection to a Drupal Services connection.
 */
class ClientsConnectionDrupalRESTTestLogin implements ClientsConnectionTestingInterface {

  /**
   * The labels for the test.
   *
   * (This is because it would seem you can't define class variables using
   * expressions.)
   */
  function testLabels() {
    return array(
      'label' => t('Test login'),
      'description' => t('Test the basic connection to the site by logging in the user.'),
      'button' => t('Connect'),
    );
  }

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
  function test($connection, &$button_form_values) {
    try {
      // Call the login method.
      $login = $connection->userLogin();
    }
    catch (Exception $e) {
      drupal_set_message(t('Could not log in to the remote site, got error message "@message".', array(
        '@message' => $e->getMessage(),
      )), 'warning');
      //dsm($e);

      return;
    }

    if (is_object($login) && isset($login->user)) {
      drupal_set_message(t('Sucessfully logged in to the remote site; got back details for user %user (uid @uid).', array(
        '%user' => $login->user->name,
        '@uid'  => $login->user->uid,
        )));
    }
    else {
      drupal_set_message(t('Could not log in to the remote site.'), 'warning');
    }

    return $login;
  }

}

/**
 * Test node load from a Drupal Services REST connection.
 */
class ClientsConnectionDrupalRESTTestNodeRetrieve implements ClientsConnectionTestingInterface {

  /**
   * The labels for the test.
   */
  function testLabels() {
    return array(
      'label' => t('Test node retrieval'),
      'description' => t('Load a node from the connection.'),
      'button' => t('Load node'),
    );
  }

  /**
   * Creates the form element for the test.
   *
   * This gets a form element with the basics in place. If your test needs input
   * parameters, add form elements here.
   *
   * @param $element
   *  A form element for the test's settings and button.
   *
   * @return
   *  The form element with the test's additions.
   */
  function testForm($element) {
    $element['params']['nid'] = array(
      '#type' => 'textfield',
      '#title' => t('Node ID'),
      '#size' => 6,
      '#required' => TRUE,
    );

    return $element;
  }

  /**
   * Validate test form input.
   */
  function formValidate(&$button_form_values) {
    if (!is_numeric($button_form_values['params']['nid'])) {
      form_set_error('buttons][node_load][nid', t('Node id must be numeric.'));
    }
  }

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
  function test($connection, &$button_form_values) {
    // Must be cast to integer for faffiness of XMLRPC and Services.
    $nid = (int) $button_form_values['params']['nid'];

    try {
      $node = $connection->makeRequest('node/' . $nid, 'GET');
    }
    catch (Exception $e) {
      drupal_set_message(t('Could not retrieve a node from the remote site, got error message "@message".', array(
        '@message' => $e->getMessage(),
      )), 'warning');
      //dsm($e);

      return;
    }

    if (is_object($node) && isset($node->nid)) {
      drupal_set_message(t('Sucessfully retrieved node %title (nid @nid).', array(
        '%title' => $node->title,
        '@nid'  => $node->nid,
        )));
    }

    return $node;
  }

}

/**
 * Test entity creation on a Drupal Services connection.
 */
class ClientsConnectionDrupalRESTTestEntityCreate implements ClientsConnectionTestingInterface {

  /**
   * The labels for the test.
   *
   * (This is because it would seem you can't define class variables using
   * expressions.)
   */
  function testLabels() {
    return array(
      'label' => t('Create an entity'),
      'description' => t('Create an entity on the remote site from an array of data.'),
      'button' => t('Create'),
    );
  }

  /**
   * Creates the form element for the test.
   *
   * This gets a form element with the basics in place. If your test needs input
   * parameters, add form elements here.
   *
   * @param $element
   *  A form element for the test's settings and button.
   *
   * @return
   *  The form element with the test's additions.
   */
  function testForm($element) {
    $element['params']['entity_type'] = array(
      '#type' => 'textfield',
      '#title' => t('Entity type'),
      '#description' => t("The entity type to create. (Note if using Services Entity this needs a prefix of 'entity')."),
      '#required' => TRUE,
    );

    $sample_data = '{
  "type":"article",
  "title":"TITLE HERE",
  "field_myfield":{"und":{"0":{"value":"VALUE"}}}
}
';
    $element['params']['data'] = array(
      '#type' => 'textarea',
      '#rows' => 10,
      '#title' => t('Data'),
      '#description' => t('The POST data to pass for the entity, as either a JSON or PHP array.') . '<br>'
        . t('Sample data:') . '<br>'
        . "<pre>$sample_data</pre>",
    );
    $element['params']['data_type'] = array(
      '#type' => 'radios',
      '#title' => t('Data type'),
      '#description' => t('The type of the POST data.'),
      '#options' => array(
        'json'  => 'JSON',
        'php'   => 'PHP array',
      ),
    );

    return $element;
  }

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
  function test($connection, &$button_form_values) {
    $entity_type = $button_form_values['params']['entity_type'];

    $path = $entity_type;

    if ($button_form_values['params']['data_type'] == 'json') {
      $data = drupal_json_decode($button_form_values['params']['data']);
    }
    else {
      eval('$data = ' . $button_form_values['params']['data'] . ';');
    }

    if (module_exists('devel')) {
      dpm($data, 'POST data');
      $json_error = json_last_error();
      if ($json_error != JSON_ERROR_NONE) {
        dpm($json_error, 'JSON error');
      }
    }

    try {
      $result = $connection->makeRequest($path, 'POST', $data);
    }
    catch (Exception $e) {
      drupal_set_message($e->getMessage(), 'warning');
      //dsm($e);

      return;
    }

    return $result;
  }

}

/**
 * Test a generic REST request.
 */
class ClientsConnectionDrupalRESTTestGeneric implements ClientsConnectionTestingInterface {

  /**
   * The labels for the test.
   */
  function testLabels() {
    return array(
      'label' => t('Test a generic request'),
      'description' => t('Test a generic request by specifying the method, service, and resource.'),
      'button' => t('Execute'),
    );
  }

  /**
   * Creates the form element for the test.
   *
   * This gets a form element with the basics in place. If your test needs input
   * parameters, add form elements here.
   *
   * @param $element
   *  A form element for the test's settings and button.
   *
   * @return
   *  The form element with the test's additions.
   */
  function testForm($element) {
    $element['params']['method'] = array(
      '#type' => 'select',
      '#title' => t('Method'),
      '#options' => drupal_map_assoc(array(
        'GET',
        'POST',
        'PUT',
      )),
      '#required' => TRUE,
    );

    $entity_types = array_keys(entity_get_info());
    sort($entity_types);
    $entity_type_options = drupal_map_assoc($entity_types);
    $entity_type_options['_text'] = t('- Other -');

    $element['params']['entity'] = array(
      '#type' => 'select',
      '#title' => t('Entity type'),
      '#description' => t('The entity type to act on; i.e., the resource.'),
      '#options' => $entity_type_options,
      '#required' => FALSE,
    );

    $element['params']['entity_text'] = array(
      '#type' => 'textfield',
      '#title' => t('Entity type'),
      '#description' => t('The entity type to act on, if not in the list above.'),
      '#required' => FALSE,
    );

    $element['params']['entity_prefix'] = array(
      '#type' => 'checkbox',
      '#title' => t('Prefix entity type for Services Entity resource'),
      '#description' => t("Add the 'entity_' prefix to the entity type, for use with entity resources defined by Services Entity module."),
      '#required' => FALSE,
    );

    $element['params']['path'] = array(
      '#type' => 'textfield',
      '#title' => t('Path suffix'),
      '#description' => t('The remainder of the path, e.g., the entity ID, the entity ID and the action, etc.'),
    );

    $element['params']['data'] = array(
      '#type' => 'textarea',
      '#title' => t('Data'),
      '#description' => t('The POST or PUT data to pass, as a JSON array.'),
    );
    $element['params']['data_type'] = array(
      '#type' => 'radios',
      '#title' => t('Data type'),
      '#description' => t('The type of the data.'),
      '#options' => array(
        'json'  => 'JSON',
        'php'   => 'PHP array',
      ),
    );

    return $element;
  }

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
  function test($connection, &$button_form_values) {
    if (!empty($button_form_values['params']['entity_text'])) {
      $entity_type = $button_form_values['params']['entity_text'];
    }
    else {
      $entity_type = $button_form_values['params']['entity'];
    }

    if ($button_form_values['params']['entity_prefix']) {
      $resource = 'entity_' . $entity_type;
    }
    else {
      $resource = $entity_type;
    }

    if (!empty($button_form_values['params']['path'])) {
      $path = $resource . '/' . $button_form_values['params']['path'];
    }
    else {
      $path = $resource;
    }
    $method = $button_form_values['params']['method'];

    if (!empty($button_form_values['params']['data'])) {
      if ($button_form_values['params']['data_type'] == 'json') {
        $data = drupal_json_decode($button_form_values['params']['data']);
      }
      else {
        eval('$data = ' . $button_form_values['params']['data'] . ';');
      }
    }
    else {
      $data = array();
    }

    drupal_set_message(t("Making @method request to @path.", array(
      '@method' => $method,
      '@path' => $path,
    )));

    if (module_exists('devel')) {
      dpm($data, 'Data');
      $json_error = json_last_error();
      if ($json_error != JSON_ERROR_NONE) {
        dpm($json_error, 'JSON error');
      }
    }

    try {
      $result = $connection->makeRequest($path, $method, $data);
    }
    catch (Exception $e) {
      drupal_set_message(t('Could not access the remote site, got error message "@message".', array(
        '@message' => $e->getMessage(),
      )), 'warning');

      return;
    }

    return $result;
  }

}
