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
use Symfony\Component\HttpFoundation\JsonResponse;
use Drupal\Component\Serialization\Json;

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

  // for temporary use until the DB is set up
  private $frs_domain = 'https://frsdev.cgifederal.com:8443/ords/fiitest/FRS_API_LOOKUP_SERVICES';
  private $ip = '172.20.2.22';



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
  public function locate($zipcode = "70506", $city = "Rockville", $state = "VA") {
    $token = $this->frs_naas_authentication();

    // Make request for city and state with given zipcode
    $city_and_state_response = $this->zipcode_to_city_state($token, $zipcode);

    // Make request for zipcode with given city and state
    $zipcode_response = $this->city_state_to_zipcode($token, $city, $state);

    // all request here

    return new JsonResponse(Json::decode($city_and_state_response->getBody()));
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
          "clientIp" => '172.20.2.22', // possible bug here
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

  private function make_request_and_receive_response($request_url) {
    $guzzle_request = new Request(
      'GET',
      $request_url,
      array(
        'Content-Type' => 'application/json'
      )
    );
    $guzzle_client = new Client();
    return $guzzle_client->send($guzzle_request, [
      'timeout' => 60,
      'http_errors' => FALSE
    ]);
  }

  private function zipcode_to_city_state($token, $zip) {
    $request_url = $this->frs_domain .
      '.get_city_state_by_zip?p_ip_address=' .
      $this->ip .
      '&p_postal_code=' .
      $zip . '&p_token=' .
      $token;
    return $this->make_request_and_receive_response($request_url);
  }

  private function city_state_to_zipcode($token, $city, $state) {
    $encoded_city = urlencode($city);
    $request_url = $this->frs_domain . '.get_zip_by_city_state?p_ip_address=' . $this->ip . '&p_token=' . $token . '&p_city_name='
      . $encoded_city . '&p_state_abbr=' . $state;
    return $this->make_request_and_receive_response($request_url);
  }

}
