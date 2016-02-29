<?php
/**
 * @file
 * Contains classes for Client connection testing.
 */

/**
 * Test basic connection to a Drupal Services connection.
 */
class ClientsConnectionDrupalTestConnect implements ClientsConnectionTestingInterface {

  /**
   * The labels for the test.
   *
   * (This is because it would seem you can't define class variables using
   * expressions.)
   */
  function testLabels() {
    return array(
      'label' => t('Test connection'),
      'description' => t('Test the basic connection to the site by calling system.connect.'),
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
      // Call the connect method.
      $connect = $connection->callMethodArray('system.connect');
    }
    catch (Exception $e) {
      drupal_set_message(t('Could not connect to the remote site, got error message "@message".', array(
        '@message' => $e->getMessage(),
      )), 'warning');
      //dsm($e);

      return;
    }

    if (is_array($connect) && isset($connect['user'])) {
      drupal_set_message(t('Sucessfully connected to the remote site.'));
    }
    else {
      drupal_set_message(t('Could not connect to the remote site.'), 'warning');
    }

    return $connect;
  }

}

/**
 * Test login to a Drupal Services connection.
 */
class ClientsConnectionDrupalTestLogin implements ClientsConnectionTestingInterface {

  /**
   * The labels for the test.
   */
  function testLabels() {
    return array(
      'label' => t('Test login'),
      'description' => t('Test the basic connection to the site by calling user.login.'),
      'button' => t('Log in'),
    );
  }

  /**
   * Connection test button handler: basic connection.
   */
  function test($connection, &$button_form_values) {
    try {
      // Call the login method.
      $login = $connection->callMethodArray('user.login');
      // Eep. we need user details!!!
    }
    catch (Exception $e) {
      drupal_set_message(t('Could not log in to the remote site, got error message "@message".', array(
        '@message' => $e->getMessage(),
      )), 'warning');
      //dsm($e);

      return;
    }

    if (is_array($login) && isset($login['user'])) {
      drupal_set_message(t('Sucessfully logged in to the remote site; got back details for user %user (uid @uid).', array(
        '%user' => $login['user']['name'],
        '@uid'  => $login['user']['uid'],
        )));
    }
    else {
      drupal_set_message(t('Could not log in to the remote site.'), 'warning');
    }

    return $login;
  }

}

/**
 * Abstract base class for testing node load from a Drupal Services connection.
 */
abstract class ClientsConnectionDrupalTestNodeLoadBase implements ClientsConnectionTestingInterface {

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
      // The actual calling is taken care of in subclasses, to account for
      // differences in versions of Services.
      $node = $this->callNodeLoadMethod($connection, $nid);
    }
    catch (Exception $e) {
      drupal_set_message(t('Could not retrieve a node from the remote site, got error message "@message".', array(
        '@message' => $e->getMessage(),
      )), 'warning');
      //dsm($e);

      return;
    }

    if (is_array($node) && isset($node['nid'])) {
      drupal_set_message(t('Sucessfully retrieved node %title (nid @nid).', array(
        '%title' => $node['title'],
        '@nid'  => $node['nid'],
        )));
    }

    return $node;
  }

}

/**
 * Test retrieving a node from a Drupal Services 7.x-3.x connection.
 */
class ClientsConnectionDrupalTestNodeLoad7_3
  extends ClientsConnectionDrupalTestNodeLoadBase {

  /**
   * Call the remote method.
   */
  function callNodeLoadMethod($connection, $nid) {
    $fields = array();
    $node = $connection->callMethodArray('node.retrieve', array($nid));
    return $node;
  }

}

/**
 * Test retrieving a node from a Drupal Services 6.x-2.x connection.
 */
class ClientsConnectionDrupalTestNodeLoad6_2
  extends ClientsConnectionDrupalTestNodeLoadBase {

  /**
   * Call the remote method.
   */
  function callNodeLoadMethod($connection, $nid) {
    $fields = array();
    $node = $connection->callMethodArray('node.get', array($nid, $fields));
    return $node;
  }

}

/**
 * Test retrieving a node from a Drupal Services 5.x-0.92 connection.
 */
class ClientsConnectionDrupalTestNodeLoad5
  extends ClientsConnectionDrupalTestNodeLoadBase {

  /**
   * Call the remote method.
   */
  function callNodeLoadMethod($connection, $nid) {
    $fields = array();
    $node = $connection->callMethodArray('node.load', array($nid));
    return $node;
  }

}
