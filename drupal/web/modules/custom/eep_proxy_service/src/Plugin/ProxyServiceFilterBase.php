<?php

namespace Drupal\eep_proxy_service\Plugin;

use Drupal\Component\Plugin\PluginBase;
use Symfony\Component\HttpFoundation\Request as HttpFoundationRequest;
use GuzzleHttp\Psr7\Request;
use GuzzleHttp\Psr7\Response;
use GuzzleHttp\Client;

/**
 * Base class for Proxy Service Filter plugins.
 */
abstract class ProxyServiceFilterBase extends PluginBase implements ProxyServiceFilterInterface {

  /**
   * @var HttpFoundationRequest
   */
  protected $incoming_request;

  /**
   * @var Request
   */
  protected $request;

  /**
   * @var Response
   */
  protected $response;
  protected $payload = [];
  public $timeout = 60;
  public $http_errors = false;
  protected $service_machine_name;

  // Add common methods and abstract methods for your plugin type here.


  /**
   * @return HttpFoundationRequest
   */
  public function getIncomingRequest(): HttpFoundationRequest {
    return $this->incoming_request;
  }

  /**
   * @param HttpFoundationRequest $incoming_request
   */
  public function setIncomingRequest(HttpFoundationRequest $incoming_request) {
    $this->incoming_request = $incoming_request;
  }

  /**
   * @return \GuzzleHttp\Psr7\Request
   */
  public function getRequest(): Request {
    return $this->request;
  }

  /**
   * @param \GuzzleHttp\Psr7\Request $request
   */
  public function setRequest(Request $request) {
    $this->request = $request;
  }

  /**
   * @return Mixed
   */
  public function getPayload() {
    return $this->payload;
  }

  /**
   * @param Mixed
   */
  public function setPayload($payload) {
    $this->payload = $payload;
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
  public function setResponse(Response $response) {
    $this->response = $response;
  }

  /**
   * @param HttpFoundationRequest $incoming_request
   */
  public function setServiceMachineName($service_machine_name) {
    $this->service_machine_name = $service_machine_name;
  }

  /**
   * @param \GuzzleHttp\Psr7\Request $request
   *
   * @return \GuzzleHttp\Psr7\Request
   */
  public function prefetch() {
    // Override with any additional logic before fetch

    // make sure the query params are passed on to the url
    $this->incoming_request->query->remove('XDEBUG_SESSION_START');
    $parts = explode($this->service_machine_name, $this->incoming_request->getUri());

    $extended_path = (count($parts) > 1) ? array_pop($parts) : '';

    $queries = http_build_query($this->incoming_request->query->all());
    $queries = ($queries) ? '?' . $queries : '';

    if(strlen($queries) > 0 || strlen($extended_path) > 0) {
      $request = new Request(
        $this->request->getMethod(),
        $this->request->getUri() . $extended_path . $queries,
        $this->request->getHeaders(),
        $this->request->getBody(),
        $this->request->getProtocolVersion()
      );

      $this->setRequest($request);
    }

    return $this->request;
  }

  /**
   * @return \GuzzleHttp\Psr7\Response
   */
  public function fetch() {
    // Override when a simple fetch is not enough
    $guzzle_client = new Client();
    $guzzle_response = $guzzle_client->send($this->request, [
      'timeout' => $this->timeout,
      'http_errors' => $this->http_errors
    ]);
    $this->response = $guzzle_response;
  }

  /**
   * @param \GuzzleHttp\Psr7\Response $response
   *
   * @return \GuzzleHttp\Psr7\Response
   */
  public function postfetch() {
    // Override with any additional logic after fetch

    return $this->response;
  }

}
