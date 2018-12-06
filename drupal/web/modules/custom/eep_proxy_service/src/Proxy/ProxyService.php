<?php
/**
 * Created by PhpStorm.
 * User: smolinsk
 * Date: 10/22/2018
 * Time: 3:41 PM
 */

namespace Drupal\eep_proxy_service\Proxy;

use Drupal\eep_core\Helpers\ArrayHelper;
use GuzzleHttp\Psr7\Request;
use GuzzleHttp\Psr7\Response;
use GuzzleHttp\Client;
use Symfony\Component\HttpFoundation\Request as HttpFoundationRequest;
use Symfony\Component\HttpFoundation\Response as HttpFoundationResponse;

class ProxyService implements ProxyServiceInterface {

  /**
   * @var String
   */
  private $service_machine_name;
  /**
   * @var \GuzzleHttp\Psr7\Request
   */
  private $headers;

  /**
   * @var String
   */
  private $uri;

  /**
   * @var \GuzzleHttp\Psr7\Request
   */
  private $request;

  /**
   * @var \GuzzleHttp\Psr7\Response
   */
  private $response;

  /**
   * @var Drupal\eep_proxy_service\Plugin\ProxyServiceFilterBase
   */
  private $filter;

  /**
   * @var \Drupal\Core\Entity\EntityInterface
   */
  private $proxy_service_entity;

  /**
   * @return mixed
   */
  public function getHeaders() {
    return $this->headers;
  }

  /**
   * ProxyService constructor.
   *
   * @param String $service_machine_name
   * @param \Drupal\eep_proxy_service\Plugin\ProxyServiceFilterInterface $filter
   * @param \Drupal\Core\Entity\EntityInterface $proxy_service_entity
   * @param String $uri
   * @param array $headers
   */
  public function __construct($service_machine_name, $filter, $proxy_service_entity, $uri = '', $headers = []) {
    $this->service_machine_name = $service_machine_name;
    $this->filter = $filter;
    $this->uri = $uri;
    $this->headers = $headers;
    $this->proxy_service_entity = $proxy_service_entity;
  }

  /**
   * @param mixed $headers
   */
  public function setHeaders($headers) {
    $this->headers = $headers;
  }

  /**
   * @return \GuzzleHttp\Psr7\Response
   */
  public function getResponse() {
    return $this->response;
  }

  /**
   * @param \GuzzleHttp\Psr7\Response $response
   */
  public function setResponse($response) {
    $this->response = $response;
  }

  /**
   * @return \Drupal\eep_proxy_service\Plugin\ProxyServiceFilterInterface
   */
  public function getFilter() {
    return $this->filter;
  }

  /**
   * @param \Drupal\eep_proxy_service\Plugin\ProxyServiceFilterInterface $filter
   */
  public function setFilter($filter) {
    $this->filter = $filter;
  }

  /**
   * @return mixed
   */
  public function getRequest() {
    return $this->request;
  }

  /**
   * @param mixed $request
   */
  public function setRequest($request) {
    $this->request = $request;
    $this->filter->setRequest($request);
  }

  /**
   * @param string $method
   * @param string $uri
   * @param array $headers
   * @param null $body
   * @param string $version
   */
  public function buildRequest(
    $method = 'GET',
    $uri = '',
    array $headers = [],
    $body = null,
    $version = '1.1') {

    $this->setRequest(new Request(
      $method,
      $uri,
      $headers,
      $body,
      $version
    ));
  }

  /**
   * @param \Symfony\Component\HttpFoundation\Request|NULL $HFRequest
   */
  public function parseHttpFoundationRequest(HttpFoundationRequest $HFRequest = null) {
    if(empty($HFRequest)) {
      $HFRequest = $this->request;
    }
    $this->filter->setIncomingRequest($HFRequest);

    // @todo move allowed headers to filter plugin base
    $this->getAllowedHeaders($HFRequest);


    $this->buildRequest(
      $HFRequest->getMethod(),
      $this->uri,
      $this->headers,
      $HFRequest->getContent()
    );
  }

  /**
   * @param \Symfony\Component\HttpFoundation\Request $HFRequest
   *
   * @return array
   */
  public function getAllowedHeaders(HttpFoundationRequest $HFRequest) {
    // Grab the black listed headers and filter them from the current request
    $headers = [];
    $config = \Drupal::config('eep_proxy_service.settings');
    $config_blacklisted_headers = $config->get('blacklisted_headers');
    $headers_blacklist = explode(' ', $config_blacklisted_headers);

    foreach ($HFRequest->headers->all() as $header => $value_array) {
      if (!in_array(strtolower($header), $headers_blacklist)) {
        $headers[$header] = $value_array;
      }
    }
    $this->headers = $headers;
    return $this->headers;
  }


  public function responseHeaderOverrides(Response $guzzle_response = NULL) {
    $response = $guzzle_response;
    if(empty($guzzle_response)) {
      $response = $this->response;
    }
    $existingHeaders = $response->getHeaders();
    $headerOverrides = $this->proxy_service_entity->field_response_headers->getValue();

    // For each header in the entity
    foreach ($headerOverrides as $headerOverride) {
      $ho = (object) $headerOverride;
      $existingHeader = ArrayHelper::find_in_keys($ho->first, $existingHeaders);
      // If we find any matching strings in the existing headers, remove them
      if(count($existingHeader)) {
        foreach ($existingHeader as $headerName) {
          unset($existingHeaders[$headerName]);
        }
      }
      // Set the new value only if the "second" contains a value
      if(trim($ho->second)) {
        $existingHeaders[$ho->first][] = $ho->second;
      }
    }

    // Rebuild a new response with the modified headers
    $response = new Response(
      $response->getStatusCode(),
      $existingHeaders,
      $response->getBody(),
      $response->getProtocolVersion(),
      $response->getReasonPhrase()
    );

    if(empty($guzzle_response)) {
      $this->response = $response;
    }
    return $response;
  }

  /**
   * @return mixed|\Psr\Http\Message\ResponseInterface
   * @throws \GuzzleHttp\Exception\GuzzleException
   */
  private function submitRequest() {
    // Do prefetch process
    $this->filter->prefetch();

    // Do fetch
    $this->filter->fetch();

    // Post request processing
    $this->response = $this->filter->postfetch();
  }

  /**
   * @param $guzzle_response
   */
  public function returnResponseFromEndpoint(Response $guzzle_response = NULL) {
    if(empty($guzzle_response)) {
      $guzzle_response = $this->response;
    }

    $guzzle_response = $this->responseHeaderOverrides($guzzle_response);

    // Return result
    $HRResponse = new HttpFoundationResponse(
      (String) $guzzle_response->getBody(),
      $guzzle_response->getStatusCode(),
      $guzzle_response->getHeaders()
    );

    // @todo Post response processing

    $HRResponse->setProtocolVersion('1.1');
    $HRResponse->send();
    exit;
  }

  /**
   * @param $service_machine_name
   *
   * @return mixed
   * @throws \Drupal\Component\Plugin\Exception\InvalidPluginDefinitionException
   * @throws \Drupal\Component\Plugin\Exception\PluginNotFoundException
   */
  public static function getEntitiesByMachineName($service_machine_name) {
    try {
      $query = \Drupal::entityQuery('node')
        ->condition('type', 'eep_proxy_service')
        ->condition('field_proxy_service_machine_name', [$service_machine_name], 'IN');

      $nids = $query->execute();

      // Load multiple entities, also exists as entity_load_multiple().
      $entities = \Drupal::entityTypeManager()
        ->getStorage('node')
        ->loadMultiple($nids);

      return $entities;
    }
    catch(Exception $e) {
      \Drupal::logger('eep_proxy_service')->error($e->getMessage());
      throw new Exception($e->getMessage());
    }
  }

  /**
   * @param $entities
   *
   * @return mixed
   */
  public static function getUriFromEntity($ENV, $entity) {
    $uri = '';
    // Get the right endpoint value for the current environment
    if ($entity) {
      $uris = array_filter($entity->field_service_endpoints->getValue(), function ($endpoint) use ($ENV) {
        return ($endpoint->first == $ENV);
      });
      if (count($uris) > 0) {
        $uri_obj = array_pop($uris);
        $uri = $uri_obj['second'];
      }
    }
    return $uri;
  }

  public static function getEntity($entities = []) {
    $entity = NULL;
    if (count($entities) > 0) {
      $entity = array_pop($entities);
    }
    return $entity;
  }

  public function submitRequestToEndpoint(Request $guzzle_request = NULL) {

    if(empty($guzzle_request)) {
      $this->request = $guzzle_request;
    }

    $this->submitRequest();
  }
}