<?php

namespace Drupal\eep_proxy_service\Controller;

use Drupal\Core\Controller\ControllerBase;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Symfony\Component\HttpFoundation\RequestStack;
use Symfony\Component\HttpFoundation\Request;
use GuzzleHttp\Client;
use GuzzleHttp\Message\Request as GuzzleRequest;
use GuzzleHttp\Exception\RequestException;
use GuzzleHttp\Exception\ServerException;
use Symfony\Component\HttpFoundation\JsonResponse;

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

    // Submit request

    // Return result

    return new JsonResponse(
      [
        $service_machine_name,
        $request,
      ], 200, ['Content-Type'=> 'application/json']);
  }

}
