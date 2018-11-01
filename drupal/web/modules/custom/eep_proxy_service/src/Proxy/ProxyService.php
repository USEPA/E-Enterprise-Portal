<?php
/**
 * Created by PhpStorm.
 * User: smolinsk
 * Date: 10/22/2018
 * Time: 3:41 PM
 */

namespace Drupal\eep_proxy_service\Proxy;

use GuzzleHttp\Psr7\Request;
use GuzzleHttp\Psr7\Response;
use GuzzleHttp\Client;
use Symfony\Component\HttpFoundation\Request as HttpFoundationRequest;
use Symfony\Component\HttpFoundation\Response as HttpFoundationResponse;

class ProxyService implements ProxyServiceInterface {

  public $headers;

  public $request;

  public $response;
  /**
   * @param $request
   *
   * @return array
   */
  public function getAllowedHeaders(HttpFoundationRequest $request) {
    // Grab the black listed headers and filter them from the current request
    $headers = [];
    $config = \Drupal::config('eep_proxy_service.settings');
    $config_blacklisted_headers = $config->get('blacklisted_headers');
    $headers_blacklist = explode(' ', $config_blacklisted_headers);

    foreach ($request->headers->all() as $header => $value_array) {
      if (!in_array(strtolower($header), $headers_blacklist)) {
        $headers[$header] = $value_array;
      }
    }
    $this->headers = $headers;
    return $this->headers;
  }

  /**
   * @param $guzzle_request
   *
   * @return mixed|\Psr\Http\Message\ResponseInterface
   * @throws \GuzzleHttp\Exception\GuzzleException
   */
  public function submitRequestToEndpoint(Request $guzzle_request) {
    $guzzle_client = new Client();
    $guzzle_response = $guzzle_client->send($guzzle_request, [
      'timeout' => 60,
      'http_errors' => FALSE
    ]);
    return $guzzle_response;
  }

  /**
   * @param $guzzle_response
   */
  public function returnResponseFromEndpoint(Response $guzzle_response) {
    // Return result
    $response = new HttpFoundationResponse(
      $guzzle_response->getBody(),
      $guzzle_response->getStatusCode(),
      $guzzle_response->getHeaders()
    );

    // @todo Post repsonse processing

    $response->setProtocolVersion('1.1');
    $response->send();
    exit;
  }

  /**
   * @param $service_machine_name
   *
   * @return mixed
   * @throws \Drupal\Component\Plugin\Exception\InvalidPluginDefinitionException
   * @throws \Drupal\Component\Plugin\Exception\PluginNotFoundException
   */
  public function getEntitiesByMachineName($service_machine_name) {
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

  /**
   * @param $entities
   *
   * @return mixed
   */
  public function getUriFromEntities($entities) {
    // Get the right endpoint value for the current environment
    if (count($entities) > 0) {
      $ENV = 'LOCAL';
      $entity = array_pop($entities);
      $uris = array_filter($entity->field_service_endpoints->getValue(), function ($endpoint) {
        return ($ENV == $endpoint->first);
      });
      if (count($uris) > 0) {
        $uri_obj = array_pop($uris);
        $uri = $uri_obj['second'];
      }
    }
    return $uri;
}
}