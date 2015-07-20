<?php
/**
 * @file
 * air_emissions_view.features.inc
 */

function air_emissions_view_init() {

  global $user;

  $account = user_load($user->uid);
  $zip = $account->field_zip_code['und'][0]['value'];
  $my_variables = array('field_zip_code' => $zip);

  drupal_add_js(array('air_emissions_view' => $my_variables), 'setting');
}

/**
 * Implements hook_views_api().
 */
function air_emissions_view_views_api($module = NULL, $api = NULL) {
  return array("api" => "3.0");
}

/**
 * Implements hook_menu().
 */
function air_emissions_view_menu() {
  $items = array();

  $items['air_emissions_view/top3ghg'] = array(
    'title' => 'Top 3 GHG Emitters Around Zip Code',
    'page callback' => 'air_emissions_view_top3_zipcode',
    'access callback' => 'user_is_logged_in',
    'type' => MENU_CALLBACK,
  );

  return $items;
}

/**
 * Menu callback: View Forecast Zipcode
 */
function air_emissions_view_top3_zipcode() {

  //zipcode taken from URL that is sent from client side
  $zipCode = $_GET['zipCode'];

  //TODO: Use internal service to fetch lat/long using zip code to get zip centroid lat/long (and validate lat/long given)
  $zipCentroidLat83 = 32.8;
  $zipCentroidLong83 = -96.8;
  $bufferRadiusMi = 10;

  $zipCentroidGeoloc = GeoLocation::fromDegrees($zipCentroidLat83, $zipCentroidLong83);

  // get bounding coordinates with buffer radius in miles from zip centroid;
  $boundCoords = $zipCentroidGeoloc->boundingCoordinates($bufferRadiusMi, 3958.762079);


  $minBBLat = $boundCoords[0]->degLat;
  $minBBLong = $boundCoords[0]->degLon;
  $maxBBLat = $boundCoords[1]->degLat;
  $maxBBLong = $boundCoords[1]->degLon;

  //http://iaspub.epa.gov/enviro/efservice/PUB_DIM_FACILITY/longitude/>/-97.922211/latitude/>/32.322255/longitude/</-96.802048/latitude/</33.383148/year/2013/PUB_FACTS_SUBP_GHG_EMISSION/PUB_DIM_GHG/XML/rows/1:1
  $url = 'http://iaspub.epa.gov/enviro/efservice/PUB_DIM_FACILITY/longitude/%3E/'.$minBBLong.'/latitude/%3E/'.$minBBLat.'/longitude/%3C/'.$maxBBLong.'/latitude/%3C/'.$maxBBLat.'/year/2013/PUB_FACTS_SUBP_GHG_EMISSION/PUB_DIM_GHG/JSON';
  //print $url;

  //send request to EF API
  $ch = curl_init();
  curl_setopt($ch, CURLOPT_HEADER, false);
  curl_setopt($ch, CURLINFO_HEADER_OUT, false);
  curl_setopt($ch, CURLOPT_VERBOSE, false);
  curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
  curl_setopt($ch, CURLOPT_URL, $url);
  $rawEFAPIResponse = curl_exec($ch);
  curl_close($ch);

  $rawResponseArr = json_decode($rawEFAPIResponse, true);
  $totEmissPerFacArr = array();


  //START TOP 3 TOTAL EMISSIONS CHECK
  //each facility in the raw JSON response from EnviroFacts API
  foreach($rawResponseArr as $rawFac) {
      $facID = $rawFac['FACILITY_ID'];
      $rawEmissionsArr = $rawFac['PUB_FACTS_SUBP_GHG_EMISSION'];
      $facTotEmissCO2E = 0;
      foreach($rawEmissionsArr as $rawEmissItem) {
        $facEmissPerGas = $rawEmissItem['CO2E_EMISSION']; //Amount per gas
        $facTotEmissCO2E += $facEmissPerGas;
      }
      //Add each facility ID (all of them) with Total Emissions as key-value pairs
      $totEmissPerFacArr[$facID] = $facTotEmissCO2E;
  }

  //Sort Descending by Total emissions (in CO2E) and only keep top 3 Fac IDs
  arsort($totEmissPerFacArr);

  //Top 3 Emitting Fac IDs stored in this array
  $top3EmitterFacsIDsArr = array(array_keys($totEmissPerFacArr)[0], array_keys($totEmissPerFacArr)[1], array_keys($totEmissPerFacArr)[2]);
  //print_r($top3EmitterFacsIDsArr);
  //END TOP 3 CHECK



  //Array to hold full JSON response to send to client
  $jsonReturn = array();
  $jsonReturn['ZipCentLat83'] = $zipCentroidLat83;
  $jsonReturn['ZipCentLong83'] = $zipCentroidLong83;
  $jsonReturn['BuffRadiusMi'] = $bufferRadiusMi;

  //holds all of the top 3 facility arrays
  $allFacsArray = array();

  //each facility in the JSON response from EnviroFacts API //triple nested table join requiring 3 foreachs
  foreach($rawResponseArr as $rawFac) {
      //array per facility
      $outputFacArr = array();

      //check and make sure facility ID is in the Top 3 Fac IDs array
      if (in_array($rawFac['FACILITY_ID'], $top3EmitterFacsIDsArr)) {
        //print "Found a Top 3 Fac in raw response";
        $outputFacArr['FacID'] = $rawFac['FACILITY_ID'];
        $outputFacArr['FacName'] = $rawFac['FACILITY_NAME'];

        //TODO: Lat/Long sanitation, check for valid response values from EF API
        $outputFacArr['FacLat83'] = $rawFac['LATITUDE'];
        $outputFacArr['FacLong83'] = $rawFac['LONGITUDE'];

        //convert lat/long from API response into a GeoLoc object
        $facGeoLoc = GeoLocation::fromDegrees($rawFac['LATITUDE'], $rawFac['LONGITUDE']);
        //calc distance (in miles) from zip centroid to facility location
        $distZipCentToFacMi = $zipCentroidGeoloc->distanceTo($facGeoLoc, 3958.762079);
        $outputFacArr['FacDistMi'] = round($distZipCentToFacMi, 2);

        $rawEmissionsArr = $rawFac['PUB_FACTS_SUBP_GHG_EMISSION'];

        //new array to hold emissions per gas for each facility
        $pollutantsPerFac = array();
        $facTotEmissCO2E = 0;
        foreach($rawEmissionsArr as $rawEmissItem) {
          //array per pollutant (within each facility)
          $outputPollArr = array();
          $gasNameArr = $rawEmissItem['PUB_DIM_GHG'];

          //joined table provides the gas abbreviation (code)
          $facEmissGasName = $rawEmissItem['PUB_DIM_GHG']['PUB_DIM_GHG_ROW']['GAS_CODE'];
          $facEmissPerGas = $rawEmissItem['CO2E_EMISSION'];

          $outputPollArr['PollutantName'] = $facEmissGasName;
          $outputPollArr['AmtCO2E'] = $facEmissPerGas;

          array_push($pollutantsPerFac, $outputPollArr);

          //summing up each gas for total emissions
          $facTotEmissCO2E += $facEmissPerGas;
        }

        //have an array of key:value for pollutant:emission, but there can be edge cases
        //where the exact same pollutant is listed twice due to differing SUB_PART_IDs
        //so we sum the array by key value to sum total emissions by pollutant with no duplicate pollutants
        $pollutantsPerFacUniquePollutant = array();
        foreach ($pollutantsPerFac as $value) {
          if( ! isset($pollutantsPerFacUniquePollutant[$value['PollutantName']]) ) {
             $pollutantsPerFacUniquePollutant[$value['PollutantName']] = 0;
          }
          $pollutantsPerFacUniquePollutant[$value['PollutantName']] += $value['AmtCO2E'];
        }

        foreach($pollutantsPerFacUniquePollutant as $key => $value) {
          $pollutantsPerFacUniquePollutantWithKeyNames[] = array('PollutantName' => $key, 'AmtCO2E' => $value);
        }

        //var_dump($pollutantsPerFacUniquePollutantWithKeyNames);


        $outputFacArr['TotEmissCO2E'] = $facTotEmissCO2E;
        $outputFacArr['Pollutants'] = $pollutantsPerFacUniquePollutantWithKeyNames;
        array_push( $allFacsArray, $outputFacArr);
      }

  }

  $jsonReturn['Facilities'] = $allFacsArray;
  print (json_encode($jsonReturn, JSON_PRETTY_PRINT));

  /*Template JSON Response to send to client
  {
  "ZipCentLat83": #,
  "ZipCentLong83": #,
  "BuffRadiusMi": #,
  "Facilities": [{
    "FacID": #,
    "FacName": string,
    "FacDistMi": #,
    "FacLat83": #,
    "FacLong83": #,
    "TotEmissCO2E": #,
    "Pollutants": [{
      "PollutantName": string,
      "AmtCO2E": #
      }, {}, ...]
    }, {},  ...]
  }
  */

  exit;
}






//class to calculate the distance between zip centroid and facility location
//also allows method to calculate the bounding box to send to the EnviroFacts API
//based on zip centroid and buffer distance
//must be used because the EnviroFacts API isn't spatially enabled
//Adopted from https://github.com/anthonymartin/GeoLocation.php
//Creative Commons License 3.0
class GeoLocation {

  public $radLat;  // latitude in radians
  public $radLon;  // longitude in radians

  public $degLat;  // latitude in degrees
  public $degLon;  // longitude in degrees

  public function __construct() {
    define('MIN_LAT', deg2rad(-90));  // -PI/2
    define('MAX_LAT', deg2rad(90));   //  PI/2
    define('MIN_LON', deg2rad(-180)); // -PI
    define('MAX_LON', deg2rad(180));  //  PI
  }

  /**
   * @param latitude the latitude, in degrees.
   * @param longitude the longitude, in degrees.
   * @return GeoLocation
   */
  public static function fromDegrees($latitude, $longitude) {
    $location = new GeoLocation();
    $location->radLat = deg2rad($latitude);
    $location->radLon = deg2rad($longitude);
    $location->degLat = $latitude;
    $location->degLon = $longitude;
    $location->checkBounds();
    return $location;
  }

  /**
   * @param latitude the latitude, in radians.
   * @param longitude the longitude, in radians.
   * @return GeoLocation
   */
  public static function fromRadians($latitude, $longitude) {
    $location = new GeoLocation();
    $location->radLat = $latitude;
    $location->radLon = $longitude;
    $location->degLat = rad2deg($latitude);
    $location->degLon = rad2deg($longitude);
    $location->checkBounds();
    return $location;
  }

  protected function checkBounds() {
    if ($this->radLat < MIN_LAT || $this->radLat > MAX_LAT ||
        $this->radLon < MIN_LON || $this->radLon > MAX_LON)
      throw new Exception("Invalid Argument");
  }

  /**
   * Computes the great circle distance between this GeoLocation instance
   * and the location argument.
   * @param radius the radius of the sphere, e.g. the average radius for a
   * spherical approximation of the figure of the Earth is approximately
   * 6371.01 kilometers.
   * @return the distance, measured in the same unit as the radius
   * argument.
   */
  public function distanceTo(GeoLocation $location, $radius) {
    return acos(sin($this->radLat) * sin($location->radLat) +
          cos($this->radLat) * cos($location->radLat) *
          cos($this->radLon - $location->radLon)) * $radius;
  }

  /**
   * @return the latitude, in degrees.
   */
  public function getLatitudeInDegrees() {
    return $this->degLat;
  }

  /**
   * @return the longitude, in degrees.
   */
  public function getLongitudeInDegrees() {
    return $this->degLon;
  }

  /**
   * @return the latitude, in radians.
   */
  public function getLatitudeInRadians() {
    return $this->radLat;
  }

  /**
   * @return the longitude, in radians.
   */
  public function getLongitudeInRadians() {
    return $this->radLon;
  }

  public function __toString() {
    return "(" . $this->degLat . ", " . $this->degLong . ") = (" .
        $this->radLat . " rad, " . $this->radLon . " rad";
  }


  /**
   * <p>Computes the bounding coordinates of all points on the surface
   * of a sphere that have a great circle distance to the point represented
   * by this GeoLocation instance that is less or equal to the distance
   * argument.</p>
   * <p>For more information about the formulae used in this method visit
   * <a href="http://JanMatuschek.de/LatitudeLongitudeBoundingCoordinates">
   * http://JanMatuschek.de/LatitudeLongitudeBoundingCoordinates</a>.</p>
   * @param distance the distance from the point represented by this
   * GeoLocation instance. Must me measured in the same unit as the radius
   * argument.
   * @param radius the radius of the sphere, e.g. the average radius for a
   * spherical approximation of the figure of the Earth is approximately
   * 6371.01 kilometers.
   * @return an array of two GeoLocation objects such that:<ul>
   * <li>The latitude of any point within the specified distance is greater
   * or equal to the latitude of the first array element and smaller or
   * equal to the latitude of the second array element.</li>
   * <li>If the longitude of the first array element is smaller or equal to
   * the longitude of the second element, then
   * the longitude of any point within the specified distance is greater
   * or equal to the longitude of the first array element and smaller or
   * equal to the longitude of the second array element.</li>
   * <li>If the longitude of the first array element is greater than the
   * longitude of the second element (this is the case if the 180th
   * meridian is within the distance), then
   * the longitude of any point within the specified distance is greater
   * or equal to the longitude of the first array element
   * <strong>or</strong> smaller or equal to the longitude of the second
   * array element.</li>
   * </ul>
   */
  public function boundingCoordinates($distance, $radius) {
    if ($radius < 0 || $distance < 0) throw new Exception('Arguments must be greater than 0.');

    // angular distance in radians on a great circle
    $radDist = $distance / $radius;

    $minLat = $this->radLat - $radDist;
    $maxLat = $this->radLat + $radDist;

    $minLon = 0;
    $maxLon = 0;
    if ($minLat > MIN_LAT && $maxLat < MAX_LAT) {
      $deltaLon = asin(sin($radDist) /
        cos($this->radLat));
      $minLon = $this->radLon - $deltaLon;
      if ($minLon < MIN_LON) $minLon += 2 * pi();
      $maxLon = $this->radLon + $deltaLon;
      if ($maxLon > MAX_LON) $maxLon -= 2 * pi();
    } else {
      // a pole is within the distance
      $minLat = max($minLat, MIN_LAT);
      $maxLat = min($maxLat, MAX_LAT);
      $minLon = MIN_LON;
      $maxLon = MAX_LON;
    }

    return array(
      GeoLocation::fromRadians($minLat, $minLon),
      GeoLocation::fromRadians($maxLat, $maxLon)
    );
  }
}

