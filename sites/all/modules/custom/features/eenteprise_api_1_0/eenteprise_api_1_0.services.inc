<?php
/**
 * @file
 * eenteprise_api_1_0.services.inc
 */

/**
 * Implements hook_default_services_endpoint().
 */
function eenteprise_api_1_0_default_services_endpoint() {
  $export = array();

  $endpoint = new stdClass();
  $endpoint->disabled = FALSE; /* Edit this to true to make a default endpoint disabled initially */
  $endpoint->api_version = 3;
  $endpoint->name = 'api_1_0';
  $endpoint->server = 'rest_server';
  $endpoint->path = 'api/1.1';
  $endpoint->authentication = array(
    'services_oauth' => array(
      'oauth_context' => 'auth',
      'credentials' => 'consumer',
      'authorization' => '',
    ),
  );
  $endpoint->server_settings = array();
  $endpoint->resources = array(
    'local_resources' => array(
      'operations' => array(
        'index' => array(
          'enabled' => '1',
          'settings' => array(
            'services_oauth' => array(
              'credentials' => 'none',
              'authorization' => '',
            ),
          ),
        ),
      ),
    ),
    'node' => array(
      'operations' => array(
        'index' => array(
          'enabled' => '1',
          'settings' => array(
            'services_oauth' => array(
              'credentials' => 'consumer',
              'authorization' => '',
            ),
          ),
        ),
      ),
    ),
    'state_resources' => array(
      'operations' => array(
        'index' => array(
          'enabled' => '1',
          'settings' => array(
            'services_oauth' => array(
              'credentials' => 'none',
              'authorization' => '',
            ),
          ),
        ),
      ),
    ),
    'user' => array(
      'operations' => array(
        'retrieve' => array(
          'enabled' => '1',
          'settings' => array(
            'services_oauth' => array(
              'credentials' => 'none',
              'authorization' => '',
            ),
          ),
        ),
      ),
    ),
  );
  $endpoint->debug = 0;
  $export['api_1_0'] = $endpoint;

  return $export;
}
