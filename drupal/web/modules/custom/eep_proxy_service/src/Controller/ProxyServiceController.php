<?php

namespace Drupal\eep_proxy_service\Controller;

use Drupal\Core\Controller\ControllerBase;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Symfony\Component\HttpFoundation\RequestStack;
use Drupal\eep_proxy_service\Proxy\ProxyService;
use GuzzleHttp\Psr7\Request as GuzzlePsr7Request;

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
    $proxy = new ProxyService();
    $request = $this->requestStack->getCurrentRequest();

    // @todo Check for cached responses
    // If cache is enabled, check if it is validated

    // Get EEP proxy service entities
    $entities = $proxy->getEntitiesByMachineName($service_machine_name);

    try {
      $uri = $proxy->getUriFromEntities($entities);
    }
    catch(\Exception $exception) {
      // @todo handle errors
      throwException($exception);
    }

    $proxy->getAllowedHeaders($request);

    $guzzle_request = new GuzzlePsr7Request(
      $request->getMethod(),
      $uri,
      $proxy->headers,
      $request->getContent(),
      '1.1'
    );

    $guzzle_response = $proxy->submitRequestToEndpoint($guzzle_request);

    // @todo Cache responses

    $proxy->returnResponseFromEndpoint($guzzle_response);
  }

}
