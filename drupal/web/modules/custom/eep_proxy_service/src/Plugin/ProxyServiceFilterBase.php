<?php

namespace Drupal\eep_proxy_service\Plugin;

use Drupal\Component\Plugin\PluginBase;
use GuzzleHttp\Psr7\Request;
use GuzzleHttp\Psr7\Response;
use GuzzleHttp\Client;

/**
 * Base class for Proxy Service Filter plugins.
 */
abstract class ProxyServiceFilterBase extends PluginBase implements ProxyServiceFilterInterface {

  /**
   * @var \GuzzleHttp\Psr7\Request
   */
  private $request;
  private $response;
  public $timeout = 60;
  public $http_errors = false;

  // Add common methods and abstract methods for your plugin type here.

  /**
   * @return \GuzzleHttp\Psr7\Request
   */
  public function getRequest() {
    return $this->request;
  }

  /**
   * @param \GuzzleHttp\Psr7\Request $request
   */
  public function setRequest(Request $request) {
    $this->request = $request;
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
   * @param \GuzzleHttp\Psr7\Request $request
   *
   * @return \GuzzleHttp\Psr7\Request
   */
  public function prefetch() {
    // Override with any additional logic before fetch
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
