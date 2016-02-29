<?php

/**
 * Credentials storage plugin for Clients.
 */

$plugin = array(
  'label' => t('Configuration storage'),
  'description' => t('Store the credentials in the connection configuration, so they can be exported as part of the connection.'),
  'handler' => array(
    'class' => 'clients_credentials_storage_configuration',
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
class clients_credentials_storage_configuration {

  /**
   * Load credentials, if any exist, into the connection.
   *
   * @param $connection
   *  The connection to load credentials from.
   */
  public function credentialsLoad($connection) {
    // Get the list of properties which are credentials.
    $credentials_properties = $connection->credentialsProperties();
    // Copy them to the credentials array, where connection classes expect to
    // find them.
    foreach ($credentials_properties as $property_name) {
      $connection->credentials[$property_name] = $connection->configuration[$property_name];
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
    $credentials_properties = $connection->credentialsProperties();
    foreach ($credentials_properties as $property_name) {
      $connection->configuration[$property_name] = $connection->credentials[$property_name];
    }

    // No need to save: the connection is about to be saved anyway.
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
    // Get the list of properties which are credentials.
    $credentials_properties = $connection->credentialsProperties();

    foreach ($credentials_properties as $property_name) {
      unset($connection->configuration[$property_name]);
    }

    // No need to save: if deleting, the connection is deleted anyway, and if
    // switching storage methods, it's about to be saved also.
  }

}
