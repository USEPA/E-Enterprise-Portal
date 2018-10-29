<?php

namespace Drupal\eep_proxy_service\Controller;

use Drupal\Core\Controller\ControllerBase;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Symfony\Component\HttpFoundation\RequestStack;
use Symfony\Component\HttpFoundation\Request;
use GuzzleHttp\Client;
use GuzzleHttp\Exception\RequestException;
use GuzzleHttp\Psr7\Request as GuzzlePsr7Request;
use GuzzleHttp\Psr7\Response as GuzzlePsr7Response;
use GuzzleHttp\Exception\ServerException;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;

/**
 * Class ProxyServiceController.
 */
class ProxyServiceController extends ControllerBase {

  /**
   * Request stack.
   *
   * @var RequestStack
   */
  public $requestStack;

  /**
   * Class constructor.
   *
   * @param RequestStack $request
   *   Request stack.
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
   * Listall.
   *
   * @return string
   *   Return Hello string.
   */
  public function listAll() {
    return [
      '#type' => 'markup',
      '#markup' => $this->t('Implement method: listAll')
    ];
  }
  /**
   * Service.
   *
   * @return string
   *   Return Hello string.
   */
  public function service($service_machine_name) {
    $r = null;
    $request = $this->requestStack->getCurrentRequest();
    // Get EEP proxy service

    // If cache is enabled, check if it is validated
    // Check for cached responses

    // Convert request
    // GET https://cdxnodengn.epa.gov/cdx-srs-rest/reference/substance_lists
    // POST https://dev.e-enterprise.gov/TestRest/bwievaluation
    $uri = "https://cdxnodengn.epa.gov/cdx-srs-rest/reference/substance_lists";
    if($request->getMethod() == 'POST') {
      $uri = "https://dev.e-enterprise.gov/TestRest/bwievaluation";
    }

    // @todo Figure out the headers dilemma and how to filter the right ones to
    // send to the endpoint

    $headers = [];
    $headers_whitelist = [
      'cache-control',
      'connection',
      'content-length',
      'content-type',
      'server',
    ];

    $headers_blacklist = [
      'host',
    ];
    
    foreach ($request->headers->all() as $header => $value_array) {
      if(in_array(strtolower($header), $headers_whitelist)) {
        $headers[$header] = $value_array;
      }
    }

    $guzzle_request = new GuzzlePsr7Request(
      $request->getMethod(),
      $uri,
      $headers,
      $request->getContent(),
      '1.1'
    );

    // Submit request

    // Return result
    $guzzle_client = new Client();

    $guzzle_response = $guzzle_client->send($guzzle_request, [
      'timeout' => 60,
      'http_errors' => false
    ]);

    $response = new Response(
      $guzzle_response->getBody(),
      $guzzle_response->getStatusCode(),
      $guzzle_response->getHeaders()
    );

    $response->setProtocolVersion('1.1');


    $response->send();
    exit;
  }

}
