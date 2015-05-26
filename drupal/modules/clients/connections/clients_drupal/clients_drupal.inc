<?php
/**
 * @file
 * Contains classes for Client connections handlers.
 */

/**
 * Base class for Drupal client connections.
 */
class clients_connection_drupal_services extends clients_connection_base {

  // ============================================ Base: Constructor.
  /**
   * Constructor method.
   */
  function __construct(array $values = array(), $entityType = NULL) {
    // Call the base class to set the connection properties.
    parent::__construct($values, $entityType);

    // Decrypt the password.
    // TODO: move this to the loading of credentials.
    // Though nothing uses this any more!!!
    //$this->configuration['password'] = clients_drupal_decrypt($this->configuration['password']);
  }

  // ============================================ Base: Admin UI.

  /**
   * Declare an array of properties which should be treated as credentials.
   *
   * This lets the credentials storage plugin know which configuration
   * properties to take care of.
   *
   * @return
   *  A flat array of property names.
   */
  function credentialsProperties() {
    return array('username', 'password');
  }

  /**
   * Submit handler for saving/updating connections of this class.
   *
   * @see clients_connection_form_submit()
   */
  function connectionSettingsForm_submit($form, &$form_state) {
    // This is here to show an example of how this method works.
    parent::connectionSettingsForm_submit($form, $form_state);
  }

  // ============================================ Base: Method calling.
  /**
   * Common helper for reacting to an error from an XMLRPC call.
   *
   * Gets the error from Drupal core's XMLRPC library, logs the error message,
   * and throws an exception, which should be caught by the module making use
   * of the Clients connection API.
   */
  function handleXmlrpcError() {
    // If the remote call resulted in an error, log it and throw an exception.
    $error = xmlrpc_error();
    if (is_object($error)) {
      watchdog('clients', 'Error calling method @method. Error was code @code with message "@message".', array(
        '@method'   => $this->method, // Technically safe but who knows where this may come from, hence '@'.
        '@code'     => $error->code,
        '@message'  => $error->message,
      ));

      throw new Exception($error->message, $error->code);
    }
  }

}

/**
 * Drupal client for services on a Drupal 7 site for Services 7.x-3.x.
 */
class clients_connection_drupal_services_7_3 extends clients_connection_drupal_services {
  // ============================================ D7-3: Connection form methods.
  /**
   * Extra form elements specific to a class's edit form.
   *
   * @param $form_state
   *  The form state from the main form, which you probably don't need anyway.
   *
   * @see clients_connection_form()
   * @see clients_connection_form_submit()
   */
  function connectionSettingsFormAlter(&$form, &$form_state) {
    $form['endpoint']['#description'] = t('Remote service URL e.g. http://mysite.com/path/to/xmlrpc');

    // There is no configuration other than the credentials.
    $form['credentials']['username'] = array(
      '#type' => 'textfield',
      '#title' => t('Service username'),
      '#size' => 30,
      '#maxlength' => 60,
      '#attributes' => array('autocomplete' => 'off'),
      '#description' => t('This should be same as the username on the server you are connecting to.'),
      '#required' => TRUE,
    );

    $password_exists = isset($this->credentials['password']);
    $password_desc = $password_exists
      ? t('This should be same as the password on the server you are connecting to. Leave blank unless you need to change this.')
      : t('This should be same as the password on the server you are connecting to.');
    $form['credentials']['password'] = array(
      '#type' => 'password',
      '#title' => t('Service password'),
      '#size' => 30,
      '#maxlength' => 60,
      '#attributes' => array('autocomplete' => 'off'),
      '#description' => $password_desc,
      '#required' => !$password_exists,
    );
  }

  // ============================================ D7-3: Connection API.
  /**
   * Call a remote method.
   *
   * @param $method
   *  The name of the remote method to call.
   * @param $method_params
   *  An array of parameters to passed to the remote method.
   *  Note that the D5 version of Services does not seem to respect optional parameters; you
   *  should pass in defaults (eg an empty string or 0) instead of omitting a parameter.
   *
   * @return
   *  Whatever is returned from the remote site.
   */
  function callMethodArray($method, $method_params = array()) {
    $this->method = $method;

    // Connect to the remote system service to get an initial session id to log in with.
    $connect = xmlrpc($this->endpoint, array(
      'system.connect' => array(),
    ));
    $session_id = $connect['sessid'];

    $this->handleXmlrpcError();

    // We may want to call only system.connect for testing purposes.
    if ($method == 'system.connect') {
      return $connect;
    }

    // Log in and get the user's session ID.
    $this->credentialsLoad();
    $username = $this->credentials['username'];
    $password = $this->credentials['password'];

    $login = xmlrpc($this->endpoint, array(
      'user.login' => array(
        $username,
        $password,
      ),
    ));
    $login_session_id = $login['sessid'];
    $login_session_name = $login['session_name'];

    // Set our cookie for subsequent requests.
    $this->cookie = $login_session_name . '=' . $login_session_id;

    $this->handleXmlrpcError();

    // If the requested method is user.login, we're done.
    if ($method == 'user.login') {
      return $login;
    }

    $headers = array(
      // Pass in the login cookie we received previously.
      'Cookie' => $this->cookie,
      // It would appear that with XMLRPC we always need the XCSRF token, no
      // matter what the method.
      'X-CSRF-Token' => $this->getXCSRFToken(),
    );
    $xmlrpc_options = array(
      'headers' => $headers,
    );

    $result = xmlrpc($this->endpoint, array(
        $method => $method_params,
      ),
      $xmlrpc_options
    );

    // Throw an exception for errors from the remote call.
    $this->handleXmlrpcError();

    return $result;
  }

  /**
   * Get the X-CSRF token.
   *
   * This calls the remote site to get the token, and caches it, so that
   * multiple requests made with the same connection don't need to retrieve it
   * again.
   *
   * This expects the 'user.token' method to be enabled on the
   * endpoint. This only exists in Services 3.5 and later. We do not support
   * earlier versions.
   *
   * @return
   *  The X-CSRF token.
   *
   * @throws
   *  An exception if the remote site does not return a token.
   */
  function getXCSRFToken() {
    if (isset($this->CSRFToken)) {
      return $this->CSRFToken;
    }

    $headers = array(
      // Pass in the login cookie we received previously.
      'Cookie' => $this->cookie,
    );

    $options = array(
      'headers' => $headers,
    );

    $response = xmlrpc($this->endpoint, array(
      'user.token' => array(),
    ), $options);

    $this->handleXmlrpcError();

    if (isset($response['token'])) {
      $this->CSRFToken = $response['token'];
      return $this->CSRFToken;
    }
    else {
      throw new Exception(t("Unable to get a CSRF token from the remote site."));
    }
  }

}

/**
 * Drupal client for services on a Drupal 6 site for Services 6.x-2.x.
 *
 * Developed against Services 6.x-2.4.
 *
 * Note that the Services 5.x-0.92 class is a subclass of this and uses several
 * of its methods.
 */
class clients_connection_drupal_services_6_2 extends clients_connection_drupal_services {
  // ============================================ D6-2: Connection form methods.
  /**
   * Extra form elements specific to a class's edit form.
   *
   * This is the same pattern as node_form() -- just ignore the object behind
   * the curtain ;)
   *
   * This is common to versions 6-2 and 5 of Drupal Services.
   *
   * @see clients_connection_form()
   * @see clients_connection_form_submit()
   */
  function connectionSettingsFormAlter(&$form, &$form_state) {
    $form['endpoint']['#description'] = t('Remote service URL e.g. http://mysite.com/path/to/xmlrpc');

    $form['configuration'] += array(
      '#type' => 'fieldset',
      '#title' => t('Configuration'),
      '#collapsible' => FALSE,
      '#tree' => TRUE,
    );

    $form['configuration']['domain'] = array(
      '#type' => 'textfield',
      '#title' => t('Domain'),
      '#size' => 50,
      '#maxlength' => 100,
      '#description' => t('This should be same as the \'Domain\' field used by the Services authentication key on the server you are connecting to.'),
      '#required' => TRUE,
    );
    $form['configuration']['servicekey'] = array(
      '#type' => 'textfield',
      '#title' => t('Service key'),
      '#size' => 50,
      '#maxlength' => 40,
      '#attributes' => array('autocomplete' => 'off'),
      '#description' => t('This should be same as the \'Key\' field used by the Services authentication key on the server you are connecting to.'),
      '#required' => TRUE,
    );

    $form['credentials']['username'] = array(
      '#type' => 'textfield',
      '#title' => t('Service username'),
      '#size' => 30,
      '#maxlength' => 60,
      '#attributes' => array('autocomplete' => 'off'),
      '#description' => t('This should be same as the username on the server you are connecting to.'),
      '#required' => TRUE,
    );

    $password_exists = isset($this->credentials['password']);
    $password_desc = $password_exists
      ? t('This should be same as the password on the server you are connecting to. Leave blank unless you need to change this.')
      : t('This should be same as the password on the server you are connecting to.');
    $form['credentials']['password'] = array(
      '#type' => 'password',
      '#title' => t('Service password'),
      '#size' => 30,
      '#maxlength' => 60,
      '#attributes' => array('autocomplete' => 'off'),
      '#description' => $password_desc,
      '#required' => !$password_exists,
    );

    return $form;
  }

  /**
   * Format the connection's endpoint as a link.
   *
   * @param $url
   *  The connection's endpoint.
   *
   * @return
   *  The string to display in the admin UI. Subclasses may format this as a
   *  link to the remote site.
   */
  function formatEndpoint($url) {
    $base_url = str_replace('services/xmlrpc', '', $url);
    $link = l($base_url, $base_url);
    return $link . 'services/xmlrpc';
  }

  // ============================================ D6-2: Connection methods.
  /**
   * Log in as the configured user.
   *
   * Helper for callMethodArray(), because logging in doesn't change between
   * versions of Services.
   *
   * @param $session_id
   *  A session ID obtained from calling system.connect.
   *
   * @return
   *  The full data returned from the remote call.
   */
  function call_user_login($session_id) {
    // Get the API key-related arguments.
    $key_args = $this->xmlrpc_key_args('user.login');
    //dsm($key_args);

    // Build the array of connection arguments we need to log in.
    $this->credentialsLoad();
    $username = $this->credentials['username'];
    $password = $this->credentials['password'];

    // Call the xmlrpc method with our array of arguments. This accounts for
    // whether we use a key or not, and the extra parameters to pass to the method.
    $login_args = $key_args;
    $login_args[] = $session_id;
    $login_args[] = $username;
    $login_args[] = $password;
    $login = xmlrpc($this->endpoint, array(
      'user.login' => $login_args,
    ));

    return $login;
  }

  /**
   * Call a remote method with an array of parameters.
   *
   * This is technically internal; use the more DX-friendly callMethod() or
   * the all-in-one clients_connection_call().
   *
   * @param $method
   *  The name of the remote method to call.
   * @param
   *  All other parameters are passed to the remote method.
   *
   * @return
   *  Whatever is returned from the remote site.
   */
  function callMethodArray($method, $method_params = array()) {
    // If HTTP requests are enabled, report the error and do nothing.
    // (Cribbed from Content distribution module.)
    if (variable_get('drupal_http_request_fails', FALSE) == TRUE) {
      drupal_set_message(t('Drupal is unable to make HTTP requests. Please reset the HTTP request status.'), 'error', FALSE);
      watchdog('clients', 'Drupal is unable to make HTTP requests. Please reset the HTTP request status.', array(), WATCHDOG_CRITICAL);
      return;
    }

    $config = $this->configuration;
    $this->method = $method;

    // Connect to the remote system service to get an initial session id to log in with.
    $connect = xmlrpc($this->endpoint, array(
      'system.connect' => array(),
    ));
    $session_id = $connect['sessid'];

    $this->handleXmlrpcError();

    // We may want to call only system.connect for testing purposes.
    if ($method == 'system.connect') {
      return $connect;
    }

    // Log in and get the user's session ID.
    $login = $this->call_user_login($session_id);
    $login_session_id = $login['sessid'];

    $this->handleXmlrpcError();

    // If the requested method is user.login, we're done.
    if ($method == 'user.login') {
      return $login;
    }

    // Get the API key-related arguments.
    $key_args = $this->xmlrpc_key_args($method);

    $method_args = array_merge(
      $key_args,
      array($login_session_id),
      $method_params
    );
    $result = xmlrpc($this->endpoint, array(
      $method => $method_args,
    ));

    // Throw an exception for errors from the remote call.
    $this->handleXmlrpcError();

    return $result;
  }

  /**
   * Helper function to get key-related method arguments for the XMLRPC call.
   */
  function xmlrpc_key_args($method) {
    $api_key = $this->configuration['servicekey'];

    // Build the API key arguments - if no key supplied supplied, presume not required
    if ($api_key != '') {
      // Use API key to get a hash code for the service.
      $timestamp = (string) strtotime("now");
      // Note that the domain -- at least for Services 5 and 6.x-2.x -- is a
      // purely arbitrary string more akin to a username.
      // See http://drupal.org/node/821700 for background.
      $domain = $this->configuration['domain'];
      /*
      if (!strlen($domain)) {
        $domain = $_SERVER['SERVER_NAME'];
        if ($_SERVER['SERVER_PORT'] != 80) {
          $domain .= ':' . $_SERVER['SERVER_PORT'];
        }
      }
      */
      $nonce = uniqid();
      $hash_parameters = array(
        $timestamp,
        $domain,
        $nonce,
        $method,
      );
      $hash = hash_hmac("sha256", implode(';', $hash_parameters), $api_key);

      $key_args = array($hash, $domain, $timestamp, $nonce);
    }
    else {
      $key_args = array();
    }

    return $key_args;
  }

}

/**
 * Drupal client for services on a Drupal 5 site.
 *
 * Works with Services 5.x-0.92.
 *
 * We extend from the Services 6.x-2.x class as not much actually changes
 * between these versions when it comes to making calls.
 */
class clients_connection_drupal_services_5 extends clients_connection_drupal_services_6_2 {
  // ============================================ D5: Connection methods.
  /**
   * Call a remote method with an array of parameters.
   *
   * TODO: REFACTOR this to look more like the static methods above --
   * separate methods for getuser, connect, etc etc.
   *
   * @param $method
   *  The name of the remote method to call.
   * @param
   *  All other parameters are passed to the remote method.
   *  Note that the D5 version of Services does not seem to respect optional parameters; you
   *  should pass in defaults (eg an empty string or 0) instead of omitting a parameter.
   *
   * @return
   *  Whatever is returned from the remote site.
   */
  function callMethodArray($method, $method_params = array()) {
    //dsm($this);
    //dsm($method);

    $config = $this->configuration;
    $this->method = $method;

    $connect = xmlrpc($this->endpoint, array(
      'system.connect' => array(),
    ));
    $session_id = $connect['sessid'];

    $this->handleXmlrpcError();

    // We may want to call only system.connect for testing purposes.
    if ($method == 'system.connect') {
      return $connect;
    }

    // Log in and get the user's session ID.
    $login = $this->call_user_login($session_id);
    $login_session_id = $login['sessid'];

    $this->handleXmlrpcError();

    // If the requested method is user.login, we're done.
    if ($method == 'user.login') {
      return $login;
    }

    //dsm($login);

    // The node.load method on D5 is an evil special case because it's defined
    // to not use an API key.
    if ($method == 'node.load') {
      // Be nice. Let the caller specify just the nid, and provide the
      // empty default for the optional fields parameter.
      if (count($method_params) == 1) {
        $method_params[] = array();
      }

      // Be nice part 2: the number one (in my experience) cause of lost
      // hours on Services is the way XMLRPC and/or services get their
      // knickers in a twist when they want an integer but think they've got
      // a string because they're too damn stupid to try casting.
      // So cast the nid here, since we're already in a special case for this
      // method anyway.
      $method_params[0] = (int) $method_params[0];

      // Build the array of connection arguments for the method we want to call.
      $xmlrpc_args = array_merge(
        array($this->endpoint, $method),
        array($login_session_id),
        $method_params
      );

      //dsm($xmlrpc_args);

      // Call the xmlrpc method with our array of arguments.
      $result = call_user_func_array('xmlrpc', $xmlrpc_args);

      // Throw an exception for errors from the remote call.
      $this->handleXmlrpcError();

      return $result;
    }

    // Get the API key-related arguments.
    $key_args = $this->xmlrpc_key_args($method);

    // Build the array of connection arguments for the method we want to call.
    $xmlrpc_args = array_merge(
      array($this->endpoint, $method),
      $key_args,
      array($login_session_id),
      $method_params
    );

    // Call the xmlrpc method with our array of arguments.
    $result = call_user_func_array('xmlrpc', $xmlrpc_args);

    // Throw an exception for errors from the remote call.
    $this->handleXmlrpcError();

    return $result;

  }

}
