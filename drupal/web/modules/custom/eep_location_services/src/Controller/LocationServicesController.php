<?php

namespace Drupal\eep_location_services\Controller;

use Drupal\Core\Controller\ControllerBase;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Symfony\Component\HttpFoundation\RequestStack;
use GuzzleHttp\Psr7\Request;
use GuzzleHttp\Psr7\Response;
use GuzzleHttp\Client;
use Symfony\Component\HttpFoundation\Request as HttpFoundationRequest;
use Symfony\Component\HttpFoundation\Response as HttpFoundationResponse;

/**
 * Class LocationServicesController.
 */
class LocationServicesController extends ControllerBase {

  /**
   * Symfony\Component\HttpFoundation\RequestStack definition.
   *
   * @var \Symfony\Component\HttpFoundation\RequestStack
   */
  protected $requestStack;

  /**
   * Constructs a new LocationServicesController object.
   */
  public function __construct(RequestStack $request_stack) {
    $this->requestStack = $request_stack;
  }

  /**
   * {@inheritdoc}
   */
  public static function create(ContainerInterface $container) {
    return new static(
      $container->get('request_stack')
    );
  }

  /**
   * Locate.
   * @return string
   *   Return Hello string.
   */
  public function locate() {
    // logic here to handle the request etc
    $token = $this->frs_naas_authentication();
    $request_criteria = $this->generate_request_options($token);
    $response = $this->make_request($request_criteria['request_url'], $request_criteria['options']);
    return [
      '#type' => 'markup',
      '#markup' => $this->t($token)
    ];
  }

  private function frs_naas_authentication() {

    $create_new_token = TRUE;
    // First time check to see if the token was already created
    if (isset($_SESSION['frs_naas_token']) && isset($_SESSION['frs_naas_token_creation_time'])) {
      // Check to see if it was created within the pass 5 minutes
      $time_stamp = $_SESSION['frs_naas_token_creation_time'];
      $current_timestamp = time();
      $diff_minutes = abs($current_timestamp - $time_stamp) / (60);
      if ($diff_minutes <= 20) {
        // Return the previously created token
        return $_SESSION['frs_naas_token'];
      }
    }

    // If it was not created then go through and create it;
    if ($create_new_token) {
      /**
       * @TODO: use variable get instead of hardcoded values
       * These values should come from the database, but for right now it is hardcoded
       * because of the new database
       **/
      $wsdl = "https://naasdev.epacdxnode.net/xml/auth_v30.wsdl";
      $email = "enterprise.portal.frs.admin@epa.gov";
      $password = "Devfrsenterprise01";

      try {
        $client = new \SoapClient($wsdl, array('soap_version' => SOAP_1_2));
      } catch (\SoapFault $f) {
        // @TODO: drupal_set_message is deprecated. find work around
        dpm($f);
        drupal_set_message('Cannot connect to Registration Service for FRS.', 'error');
        return;
      }

      if (isset($client)) {
        // @TODO: replace the following hardcoded values with variable_get: domain, authenticationMethod
        $params = array(
          "userId" => $email,
          "credential" => $password,
          "domain" => 'default',
          "authenticationMethod" => 'password',
          "clientIp" => $_SERVER['SERVER_ADDR'], // possible bug here
          'resourceURI' => ''
        );
        $soap_type = 'CentralAuth';

        $token = NULL;

        try {
          $response1 = $client->__soapCall($soap_type, array($params));
          $token = $response1->return;
        } catch (SoapFault $f) {
          dpm($f);
          $token = '';
          drupal_set_message('Cannot Authenticate to get data flow for FRS.', 'error');
        }
      }
      else {
        $token = '';
      }
      // Capture token and time to reduce calls to FRS
      $_SESSION['frs_naas_token'] = $token;
      $_SESSION['frs_naas_token_creation_time'] = time();
    }
    return $token;
  }

  private function generate_request_options($token) {
    // @TODO: replace $frs_domain with variable_get('frs_ api_lookup_url')
    $frs_domain = 'https://frsdev.cgifederal.com:8443/ords/fiitest/FRS_API_LOOKUP_SERVICES';
    $ip = $_SERVER['SERVER_ADDR'];
    $return_val = NULL;
    // here down
    if ($frs_domain == 'test_proxy') {
      $test_domain = variable_get("frs_test_proxy");
      $base_url = variable_get("frs_test_proxy_base_url") . '.get_city_state_by_zip?p_ip_address=' . $ip . '&p_postal_code=' . $zip . '&p_token=' . $token;
      $encoded_base_url = urlencode($base_url);
      $request_url = $test_domain . $encoded_base_url;
    }
    else {
      $request_url = 'https://frsdev.cgifederal.com:8443/ords/fiitest/FRS_API_LOOKUP_SERVICES' .
        '.get_city_state_by_zip?p_ip_address=' .
        $ip .
        '&p_postal_code=' .
        '23146' . '&p_token=' .
        $token;
    }
    $options = array(
      'headers' => array(
        'Content-Type' => 'application/json',
      ),
      'method' => 'GET',
    );
    return array(
      'request_url' => $request_url,
      'options' => $options
    );
  }


  function make_request($request_url, $options) {



  }
}
