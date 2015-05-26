<?php

/**
 * Credentials storage plugin for Clients.
 */

$plugin = array(
  'label' => t('Variable storage'),
  'description' => t('Store the credentials in a system variable. This keeps them unique to this site.'),
  'handler' => array(
    'class' => 'clients_credentials_storage_variable',
  ),
);

/**
 * Plugin handler class.
 *
 * Store credentials in the Connection's configuration array (i.e., the same as
 * the old way!). This means that the credentials are contained within the
 * exported connection, which may or may not be desirable depending on your
 * situation.
 */
class clients_credentials_storage_variable {

  /**
   * Helper to get the variable name.
   *
   * @param $connection
   *  The connection to use.
   */
  function variableName($connection) {
    // TODO: This can cause problems if the connection name is too long:
    // character limit for a system variable name is 128, but so is that for
    // a connection name!
    return 'clients_connection_credentials_' . $connection->name;
  }

  /**
   * Load credentials, if any exist, into the connection.
   *
   * @param $connection
   *  The connection to load credentials from.
   */
  public function credentialsLoad($connection) {
    $credentials = variable_get($this->variableName($connection), array());

    foreach ($credentials as $property_name => $value) {
      $connection->credentials[$property_name] = $value;
    }
  }

  /**
   * Save credentials.
   *
   * @param $connection
   *  The connection to save credentials for. These should be present in the
   *  $connection->credentials array, where the form submit process will have
   *  placed them.
   */
  public function credentialsSave($connection) {
    // Get the list of properties which are credentials.
    $credentials = array();
    $credentials_properties = $connection->credentialsProperties();

    // Build an array of credentials to save.
    foreach ($credentials_properties as $property_name) {
      $credentials[$property_name] = $connection->credentials[$property_name];
    }

    variable_set($this->variableName($connection), $credentials);
  }

  /**
   * Erase credentials.
   *
   * This should be called when a connection is deleted, or when a connection
   * changes its credentials storage mechanism.
   *
   * @param $connection
   *  The connection to delete credentials for.
   */
  public function credentialsDelete($connection) {
    variable_del($this->variableName($connection));
  }

}
