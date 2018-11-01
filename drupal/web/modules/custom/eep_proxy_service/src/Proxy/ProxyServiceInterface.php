<?php
/**
 * Created by PhpStorm.
 * User: smolinsk
 * Date: 10/22/2018
 * Time: 3:43 PM
 */

namespace Drupal\eep_proxy_service\Proxy;
use GuzzleHttp\Psr7\Request;
use GuzzleHttp\Psr7\Response;
use Symfony\Component\HttpFoundation\Request as HttpFoundationRequest;

interface ProxyServiceInterface {
  public function getAllowedHeaders(HttpFoundationRequest $request);
  public function submitRequestToEndpoint(Request $guzzle_request);
  public function returnResponseFromEndpoint(Response $guzzle_response);
}