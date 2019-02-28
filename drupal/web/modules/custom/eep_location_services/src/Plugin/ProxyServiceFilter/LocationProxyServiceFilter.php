<?php

namespace Drupal\eep_location_services\Plugin\ProxyServiceFilter;

use Drupal\eep_core\Helpers\ArrayHelper;
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

    /// @TODO Add a case for when the user sends a 'location' string that needs to be parsed

    // Add the important query information into the payload for processing later
    (!isset($query['zipcode'])) ?: $this->payload['zipcode'][] = trim($query['zipcode']);
    (!isset($query['city'])) ?: $this->payload['city'][] = ucwords(trim($query['city']));
    (!isset($query['state'])) ?: $this->payload['state'][] = strtoupper(trim($query['state']));
    (!isset($query['tribe'])) ?: $this->payload['tribe'][] = strtoupper(trim($query['tribe']));

    // If the user hands off a zip code
    if ($query['zipcode']) {

      // Make request for city and state with given zipcode
      $city_and_state_response = $this->gpo_zip_code_to_city_state($query['zipcode']);
      $this->payload['gpo_zip_code_to_city_state'] = json_decode($city_and_state_response->getBody(), FALSE);

      $number_of_states = $this->count_number_of_states($this->payload['gpo_zip_code_to_city_state']);

      // Complete the same here checking for tribal information
      $tribal_information_response = $this->gpo_zipcode_to_tribal_information($query['zipcode']);
      $this->payload['gpo_zipcode_to_tribal_information'] = json_decode($tribal_information_response->getBody(), FALSE);

      // Cycle through features and extract the city and states values
      foreach ($this->payload["gpo_zip_code_to_city_state"]->features as $feature) {
        // Check for existing matches, and add if it is a new unique value

        // Declare variables
        $city_state = explode(', ', $feature->attributes->NAME_LABEL);
        $city = $city_state[0];
        $state = $city_state[1];

        if (!ArrayHelper::in_array($city, $this->payload['city'])) {
          $this->payload['city'][] = ucwords(trim($city));
        }
        if (!ArrayHelper::in_array($state, $this->payload['state'])) {
          $this->payload['state'][] = strtoupper(trim($state));
        }
        if($number_of_states > 1){
          $this->payload['cities_and_states'][] = trim($feature->attributes->NAME_LABEL);
        }
      }

      // Check to see if the provided zipcode has any tribes associated with it
      if(!empty($this->payload['gpo_zipcode_to_tribal_information']->features)){
        foreach ($this->payload['gpo_zipcode_to_tribal_information']->features as $feature) {
            $this->payload['associated_tribes'][] = trim($feature->attributes->TRIBE_NAME_CLEAN);
        }
      }
    }

    // If the user hands off a city & state code
    if ($query['city'] && $query['state']) {
      $zipcode_response = $this->gpo_city_state_to_zip_code($query['city'], $query['state']);
      $this->payload['gpo_city_state_to_zip_code'] = json_decode($zipcode_response->getBody(), FALSE);

      foreach ($this->payload['gpo_city_state_to_zip_code']->features as $feature) {
        $zip = $feature->attributes->ZCTA;
        // Check for existing matches, and add if it is a new unique value
        if (!ArrayHelper::in_array($zip, $this->payload['zipcode'])) {
          $this->payload['zipcode'][] = $zip;
        }
      }
    }

    if($query['tribe']){
        $tribe_response = $this->gpo_retrieve_tribal_information($query['tribe']);
        $this->payload['tribal_information_response'] =  json_decode($tribe_response->getBody(), FALSE);

        // Loop through the first time to find all of the Tribal names.
        foreach ($this->payload['tribal_information_response']->features as $feature){
            $tribe_name = $feature->attributes->TRIBE_NAME_CLEAN;
            if(!ArrayHelper::in_array($tribe_name, $this->payload['tribes'])){
                $current_tribe_zipcodes = [];
                foreach($this->payload['tribal_information_response']->features as $feature_inner){
                    if($tribe_name === $feature_inner->attributes->TRIBE_NAME_CLEAN){
                        $current_tribe_zipcodes[] = $feature_inner->attributes->ZCTA;
                    }
                }
                $this->payload['tribes'][$tribe_name] = $current_tribe_zipcodes;
            }
        }
    }
  }

  // Put on line 261
  function gpo_zipcode_to_tribal_information($zipcode){
    // Get Zip Code to Census Place/Population Lookup table as json
    $zip_tribal_url = $this->request->getUri() . '/ZipToTribalLookups_WFL/FeatureServer/1/query?where=ZCTA%3D%27' . $zipcode . '%27&outFields=*&orderByFields=ZCTA&f=pjson';
    $response = $this->make_request_and_receive_response($zip_tribal_url);
    return $response;
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
        'cities_and_states' => $this->payload['cities_and_states'],
        'associated_tribes' => $this->payload['associated_tribes'],
        'tribal_information' => $this->payload['tribes'],
    ];

    $final_content = \GuzzleHttp\json_encode($content);

    // Update the response
    $this->response = new Response(
      200,
      ['Content-Type' => ['application/json']],
      $final_content
    );

    return $this->response;
  }

  /**
   * @todo replace with Proxy Service call
   *
   * @param $request_url
   *
   * @return mixed|\Psr\Http\Message\ResponseInterface
   * @throws \GuzzleHttp\Exception\GuzzleException
   */
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

  /**
   * Cleans up the city's name for making queries
   *
   * @param $city
   *
   * @return null|string|string[]
   */
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

  /**
   * Call arcgis with the zipcode to find related city and states
   * @todo It has obvious need of refactoring
   *
   * @param String $zip
   *
   * @return mixed|\Psr\Http\Message\ResponseInterface
   * @throws \GuzzleHttp\Exception\GuzzleException
   */
  public function gpo_zip_code_to_city_state($zip) {

    $zip_data = [
      'zip_array' => '',
      'state' => '',
      'city' => '',
      'zip_attr' => '',
      'city_attr' => '',
    ];
    // Get Zip Code to Census Place/Population Lookup table as json
    // https://services.arcgis.com/cJ9YHowT8TU7DUyn/arcgis/rest/services
    $zip_pop_url = $this->request->getUri() . '/ZipToCensusPlaceLookup_WFL/FeatureServer/1/query?where=ZCTA%3D%27' . $zip . '%27&outFields=*&orderByFields=ZCTA&f=pjson';

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

    return $response;
  }



  /**
   * Call arcgis with city and state information to find the related zipcodes
   * @todo It has obvious need of refactoring
   *
   * @param $city
   * @param $state
   *
   * @return mixed|\Psr\Http\Message\ResponseInterface
   * @throws \GuzzleHttp\Exception\GuzzleException
   */
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
    // https://services.arcgis.com/cJ9YHowT8TU7DUyn/arcgis/rest/services
    $zip_pop_url = $this->request->getUri() . '/ZipToCensusPlaceLookup_WFL/FeatureServer/1/query?where=UPPER%28NAME_LABEL%29%3D%27' . $cleaned_city . '%2C+' . $state . '%27&outFields=*&orderByFields=ZCTA&f=pjson';

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
      // https://services.arcgis.com/cJ9YHowT8TU7DUyn/arcgis/rest/services
      $zip_pop_url = $this->request->getUri() . '/ZipToTribalLookups_WFL/FeatureServer/1/query?where=UPPER%28TRIBE_NAME_CLEAN%29+LIKE+%27%25' . $cleaned_city . '%25%27&outFields=*&orderByFields=ZCTA&f=pjson';
      $response = $this->make_request_and_receive_response($zip_pop_url);
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

          // https://services.arcgis.com/cJ9YHowT8TU7DUyn/arcgis/rest/services
          $zip_pop_url = $this->request->getUri() . '/ZipToCensusPlaceLookup_WFL/FeatureServer/1/query?where=ZCTA+IN+%28%27' . implode("%27%2C%27", $tribalzips) . '%27%29&outFields=*&orderByFields=Place_Pop_2014_ACS2014&f=pjson';
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

  public function gpo_retrieve_tribal_information($tribe){
      $tribe_url = $this->request->getUri() . '/ZipToTribalLookups_WFL/FeatureServer/1/query?where=UPPER%28TRIBE_NAME_CLEAN%29+LIKE+%27%25' . $tribe . '%25%27&outFields=*&orderByFields=ZCTA&f=pjson';
      $response = $this->make_request_and_receive_response($tribe_url);
      return $response;
  }

  /**
  * Helper function that returns the number of states in a given array
  */
  private function count_number_of_states($city_and_state_array){
      $state_array = [];
      foreach ($this->payload["gpo_zip_code_to_city_state"]->features as $feature) {
          $city_state = explode(', ', $feature->attributes->NAME_LABEL);
          if(!ArrayHelper::in_array(trim($city_state[1]), $state_array)){
              $state_array[] = trim($city_state[1]);
          }
      }
      return sizeof($state_array);
  }
}