<?php

namespace Drupal\eep_location_services\Controller;

use Drupal\Core\Controller\ControllerBase;
use Drupal\eep_core\Plugin\ProxyServiceFilter\LocationProxyServiceFilter;
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
  public function locate() {
//    // check query here
//    if($input){
//
//    }
    //$token = $this->frs_naas_authentication();
    // Make request for city and state with given zipcode
    //$city_and_state_response = $this->frs_zipcode_to_city_state($token, $zipcode);
    // Make request for zipcode with given city and state
    //$zipcode_response = $this->frs_city_state_to_zipcode($token, $city, $state);

    // Geo location below
    $response = $this->gpo_city_state_to_zip_code($city, $state);

    return new JsonResponse($response);
  }


}
