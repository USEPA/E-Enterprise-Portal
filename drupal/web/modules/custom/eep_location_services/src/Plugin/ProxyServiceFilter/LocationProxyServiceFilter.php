<?php

namespace Drupal\eep_location_services\Plugin\ProxyServiceFilter;

use Drupal\eep_proxy_service\Plugin\ProxyServiceFilterBase;
use GuzzleHttp\Client;
use GuzzleHttp\Psr7\Stream;
use GuzzleHttp\Psr7\Request;
use GuzzleHttp\Psr7\Response;

/**
 * Class LocationProxyServiceFilter
 *
 * @ProxyServiceFilter(
 *   id = "location",
 *   label = @Translation("FRS Location Filter")
 * )
 *
 * @package Drupal\eep_core\Plugin\ProxyServiceFilter
 */
class LocationProxyServiceFilter extends ProxyServiceFilterBase {

  /**
   * MUST override this function to prevent the default behavior
   *
   * @return mixed
   */
  public function prefetch() {
    return $this->request;
  }


  /**
   * @return \GuzzleHttp\Psr7\Response
   */
  public function fetch() {
    // Get the query values
    $query = $this->getIncomingRequest()->query->all();

    $token = $this->frs_naas_authentication();

    if ($query['zipcode']) {
      // Add the important query information into the payload for processing later
      $this->payload['zipcode'][] = $query['zipcode'];

      // Make request for city and state with given zipcode
      $city_and_state_response = $this->frs_zipcode_to_city_state($token, $query['zipcode']);
      $this->payload['frs_zipcode_to_city_state'] = json_decode($city_and_state_response->getBody(), FALSE);
      $result = ((Object) $this->payload['frs_zipcode_to_city_state'])->Results;
      $this->payload['city'][] = ucwords($result->cityName);
      $this->payload['state'][] = ucwords($result->stateCode);
    }

    if ($query['city'] && $query['state']) {
      // Add the important query information into the payload for processing later
      $this->payload['city'][] = ucwords($query['city']);
      $this->payload['state'][] = ucwords($query['state']);

      $gpo_response = $this->gpo_city_state_to_zip_code($query['city'], $query['state']);
      $this->payload['gpo_city_state_to_zip_code'] = json_decode($gpo_response->getBody(), FALSE);

      foreach ($this->payload['gpo_city_state_to_zip_code']->features as $feature) {
        $zip = $feature->attributes->ZCTA;
        // Check for existing matches, and add if it is a new unique value
        if (!$this->str_in_array($zip, $this->payload['zipcode'])) {
          $this->payload['zipcode'][] = $zip;
        }
      }
    }
  }

  /**
   * @param \GuzzleHttp\Psr7\Response $response
   *
   * @return \GuzzleHttp\Psr7\Response
   */
  public function postfetch() {

    // Build content
    $content = [
      'city' => $this->payload['city'],
      'state' => $this->payload['state'],
      'zipcode' => $this->payload['zipcode'],
    ];

    $final_content = \GuzzleHttp\json_encode($content);

    // Update the response
    $this->response = new Response(
      200,
      [
        'Content-Type' =>
          [
            'application/json',
          ],
      ],
      $final_content
    );

    return $this->response;
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
        $client = new \SoapClient($wsdl, ['soap_version' => SOAP_1_2]);
      } catch (\SoapFault $f) {
        // @TODO: drupal_set_message is deprecated. find work around
        dpm($f);
        drupal_set_message('Cannot connect to Registration Service for FRS.', 'error');
        return;
      }

      if (isset($client)) {
        // @TODO: replace the following hardcoded values with variable_get: domain, authenticationMethod
        $params = [
          "userId" => $email,
          "credential" => $password,
          "domain" => 'default',
          "authenticationMethod" => 'password',
          "clientIp" => '172.20.2.22', // possible bug here
          'resourceURI' => '',
        ];
        $soap_type = 'CentralAuth';

        $token = NULL;

        try {
          $response1 = $client->__soapCall($soap_type, [$params]);
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
      [
        'Content-Type' => 'application/json',
      ]
    );
    $guzzle_client = new Client();
    return $guzzle_client->send($guzzle_request, [
      'timeout' => 600,
      'http_errors' => FALSE,
    ]);
  }

  public function frs_zipcode_to_city_state($token, $zip) {
    $ip = '172.20.2.22';
    // $ip = $_SERVER['SERVER_ADDR'];
    $request_url = $this->getRequest()->getUri() .
      '.get_city_state_by_zip?p_ip_address=' .
      $ip .
      '&p_postal_code=' .
      $zip . '&p_token=' .
      $token;
    return $this->make_request_and_receive_response($request_url);
  }

  public function frs_city_state_to_zipcode($token, $city, $state) {
    $no_ip = '';
    // $ip = $_SERVER['SERVER_ADDR'];
    $request_url = $this->getRequest()
        ->getUri() . '.get_zip_by_city_state?p_ip_address=' . $no_ip . '&p_token=' . $token . '&p_city_name='
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

    $zip_data = [
      'zip_array' => '',
      'state' => '',
      'city' => '',
      'zip_attr' => '',
      'city_attr' => '',
    ];
    $cleaned_city = $this->clean_city($city);
    // Get Zip Code to Census Place/Population Lookup table as json
    $zip_pop_url = 'https://services.arcgis.com/cJ9YHowT8TU7DUyn/arcgis/rest/services/ZipToCensusPlaceLookup_WFL/FeatureServer/1/query?';
    $zip_pop_url = $zip_pop_url . 'where=UPPER%28NAME_LABEL%29%3D%27' . $cleaned_city . '%2C+' . $state . '%27&outFields=*&orderByFields=ZCTA&f=pjson';

    $zip_found = FALSE;
    $response = $this->make_request_and_receive_response($zip_pop_url);
    $decoded_response = json_decode($response->getBody(), FALSE);// might have to remove the decode from above
    if (!empty($decoded_response->features)) {
      $city_attr = [];
      $zip_attr = [];
      $zip_list = [];
      foreach ($decoded_response->features as $feature) {
        if (!empty($feature->attributes->ZCTA)) {
          // If the table has a placename, record that as the preferred name, along with its population
          $zip_list[] = $feature->attributes->ZCTA;
          $city_attr[$feature->attributes->NAME_LABEL] = [
            "pop" => $feature->attributes->Place_Pop_2014_ACS2014,
          ];
          // Also record the zip code's population and urban/rural status
          $zip_attr[$feature->attributes->ZCTA] = [
            "city" => $feature->attributes->NAME_LABEL,
            "pop" => $feature->attributes->Zip_Pop2014_ACS5,
            "urban" => $feature->attributes->Urban,
          ];
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
        $tribalzips = [];
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

    return $response;
  }

  public static function str_in_array($needle, $haystack = [], $flags = 'i') {
    $needle = preg_replace('/\s+/i', '\\\\s', $needle);
    $regex_needle = "/$needle/$flags";
    return (bool) preg_grep($regex_needle, $haystack);
  }
}