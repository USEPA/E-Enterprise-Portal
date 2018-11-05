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
  private $no_ip = "";



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
  public function locate($input) {
    // check query here
    if($input){

    }
    //$token = $this->frs_naas_authentication();
    // Make request for city and state with given zipcode
    //$city_and_state_response = $this->frs_zipcode_to_city_state($token, $zipcode);
    // Make request for zipcode with given city and state
    //$zipcode_response = $this->frs_city_state_to_zipcode($token, $city, $state);

    // Geo location below
    $response = $this->gpo_city_state_to_zip_code($city, $state);

    return new JsonResponse($response);
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

  public function frs_zipcode_to_city_state($token, $zip) {
    $request_url = $this->frs_domain .
      '.get_city_state_by_zip?p_ip_address=' .
      $this->ip .
      '&p_postal_code=' .
      $zip . '&p_token=' .
      $token;
    return $this->make_request_and_receive_response($request_url);
  }

  public function frs_city_state_to_zipcode($token, $city, $state) {
    $request_url = $this->frs_domain . '.get_zip_by_city_state?p_ip_address=' . $this->no_ip . '&p_token=' . $token . '&p_city_name='
      . strtoupper(urlencode($city)) . '&p_state_abbr=' . strtoupper($state);
    echo $request_url;
    return $this->make_request_and_receive_response($request_url);
  }

  private function clean_city($city) {
    $cleaned_city = "";
    $cleaned_city = preg_replace("/\b(SAINT)\b/", "ST.", $city);
    $cleaned_city = preg_replace("/\b(SAINTE)\b/", "STE.", $cleaned_city);
    $cleaned_city = preg_replace("/\b(MT\.?)(\s)/", "MOUNT$2", $cleaned_city);
    $cleaned_city = preg_replace("/\b(FT\.?)(\s)/", "FORT$2", $cleaned_city);
    $cleaned_city = preg_replace("/\b(NEW YORK CITY)\b/", "NEW YORK", $cleaned_city);
    $cleaned_city = preg_replace("/\s/", "+", $cleaned_city);  // Replace spaces with + for AGOL query
    return $cleaned_city;
  }

  public function gpo_city_state_to_zip_code($city, $state) {

    $zip_data = array(
      'zip_array' => '',
      'state' => '',
      'city' => '',
      'zip_attr' => '',
      'city_attr' => '',
    );
    $cleaned_city = $this->clean_city($city);
    // Get Zip Code to Census Place/Population Lookup table as json
    $zip_pop_url = 'https://services.arcgis.com/cJ9YHowT8TU7DUyn/arcgis/rest/services/ZipToCensusPlaceLookup_WFL/FeatureServer/1/query?';
    $zip_pop_url = $zip_pop_url . 'where=UPPER%28NAME_LABEL%29%3D%27' . $cleaned_city . '%2C+' . $state . '%27&outFields=*&orderByFields=ZCTA&f=pjson';

    $zip_found = FALSE;
    $response = $this->make_request_and_receive_response($zip_pop_url);
    $decoded_response = json_decode($response->getBody(), false);// might have to remove the decode from above
    if(!empty($decoded_response->features)){
      $city_attr = array();
      $zip_attr = array();
      $zip_list = array();
      foreach ($decoded_response->features as $feature) {
        if (!empty($feature->attributes->ZCTA)) {
          // If the table has a placename, record that as the preferred name, along with its population
          $zip_list[] = $feature->attributes->ZCTA;
          $city_attr[$feature->attributes->NAME_LABEL] = array(
            "pop" => $feature->attributes->Place_Pop_2014_ACS2014
          );
          // Also record the zip code's population and urban/rural status
          $zip_attr[$feature->attributes->ZCTA] = array(
            "city" => $feature->attributes->NAME_LABEL,
            "pop" => $feature->attributes->Zip_Pop2014_ACS5,
            "urban" => $feature->attributes->Urban,
          );
          $zip_found = TRUE;
        }
      }
      $location_array = explode(',', $feature->attributes->NAME_LABEL);
      $zip_data['city'] = trim($location_array[0]);
      $zip_data['state'] = trim($location_array[1]);
      $zip_data['zip_array'] = $zip_list;
      $zip_data['city_attr'] = $city_attr;
      $zip_data['zip_attr'] = $zip_attr;
    }

    if (!$zip_found) {
      // Get Zip Code to Tribal Area Lookup table as json
      $zip_tribe_url = 'https://services.arcgis.com/cJ9YHowT8TU7DUyn/arcgis/rest/services/ZipToTribalLookups_WFL/FeatureServer/1/query?';
      $zip_tribe_url = $zip_tribe_url . 'where=UPPER%28TRIBE_NAME_CLEAN%29+LIKE+%27%25' . $cleaned_city . '%25%27&outFields=*&orderByFields=ZCTA&f=pjson';
      $response = $this->make_request_and_receive_response($zip_tribe_url);
      $decoded_response = json_decode($response->getBody(), FALSE);

      if (!empty($decoded_response->features)) {
        $tribalzips = array();
        foreach ($decoded_response->features as $feature) {
          $zip_found = TRUE;
          // If the table has a placename, record that as the preferred name
          $zip_data['zip_array'][] = $feature->attributes->ZCTA;
          $zip_data['zip_attr'][$feature->attributes->ZCTA]["city"] = $feature->attributes->TRIBE_NAME_CLEAN;
          $zip_data['city'] = $feature->attributes->TRIBE_NAME_CLEAN;
          // For each found zip, lookup Census data
          $tribalzips[] = $feature->attributes->ZCTA;
        }
        $tribalzips = array_unique($tribalzips);

        if (!empty($tribalzips)) {
          // Get Zip Code to Census Place/Population Lookup table as json
          $zip_pop_url = 'https://services.arcgis.com/cJ9YHowT8TU7DUyn/arcgis/rest/services/ZipToCensusPlaceLookup_WFL/FeatureServer/1/query?';
          $zip_pop_url = $zip_pop_url . 'where=ZCTA+IN+%28%27' . implode("%27%2C%27", $tribalzips) . '%27%29&outFields=*&orderByFields=Place_Pop_2014_ACS2014&f=pjson';
          $response = $this->make_request_and_receive_response($zip_pop_url);
          $decoded_response = json_decode($response->getBody(), FALSE);
          if (!empty($decoded_response->features)) {
            // Loop through all Census Places for the specified zip
            foreach ($decoded_response->features as $feature) {
              // Also record the zip code's population and urban/rural status
              $zip_data['zip_attr'][$feature->attributes->ZCTA]["pop"] = $feature->attributes->Zip_Pop2014_ACS5;
              $zip_data['zip_attr'][$feature->attributes->ZCTA]["urban"] = $feature->attributes->Urban;
            }
          }
        }
      }
    }
    // here.... use FRS city state to zip for look up.... line 547

    return $zip_data;
  }
}
