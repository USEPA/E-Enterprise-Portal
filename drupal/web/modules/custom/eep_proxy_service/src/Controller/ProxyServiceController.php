<?php

namespace Drupal\eep_proxy_service\Controller;

use Drupal\Component\Plugin\Exception\InvalidPluginDefinitionException;
use Drupal\Component\Plugin\Exception\PluginException;
use Drupal\Component\Plugin\Exception\PluginNotFoundException;
use Drupal\Core\Controller\ControllerBase;
use Drupal\eep_proxy_service\Plugin\ProxyServiceFilterInterface;
use Drupal\eep_proxy_service\Plugin\ProxyServiceFilterManager;
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
   * Proxy Request Filter Manater.
   *
   * @var ProxyServiceFilterManager
   */
  public $proxyServiceFilterManager;

  /**
   * Class constructor.
   *
   * @param RequestStack $request
   *   Request stack.
   * @param ProxyServiceFilterManager $proxyServiceFilterManager
   *   Proxy Filter plugin
   */
  public function __construct(RequestStack $request_stack, ProxyServiceFilterManager $proxyServiceFilterManager) {
    $this->requestStack = $request_stack;
    $this->proxyServiceFilterManager = $proxyServiceFilterManager;
  }

  /**
   * {@inheritdoc}
   */
  public static function create(ContainerInterface $container) {
    return new static(
      $container->get('request_stack'),
      $container->get('plugin.manager.proxy_service_filter')
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

    $config = $this->config('eep_core.settings');
    $environment = $config->get('environment');
    $current_request = $this->requestStack->getCurrentRequest();

    // @todo Check for cached responses
    // If cache is enabled, check if it is validated

    // Get EEP proxy service entities
    try {
      $entities = ProxyService::getEntitiesByMachineName($service_machine_name);
    } catch (InvalidPluginDefinitionException $e) {
      throwException($e);
    } catch (PluginNotFoundException $e) {
      throwException($e);
    }

    $entity = ProxyService::getEntity($entities);
    $uri = ProxyService::getUriFromEntity($environment, $entity);

    $filter_machine_name = $entity->field_proxy_filter->getValue();
    if(is_array($filter_machine_name)) {
      $filter_machine_name = $filter_machine_name[0]['value'];
    }
    try {
      $filter = $this->proxyServiceFilterManager->createInstance($filter_machine_name);
    } catch (PluginException $e) {
      throwException($e);
    }

    $proxy = new ProxyService($service_machine_name, $filter, $uri);

    $proxy->parseHttpFoundationRequest($current_request);

    // Make request
    $proxy->submitRequestToEndpoint();

    // @todo Cache responses

    $proxy->returnResponseFromEndpoint();
  }
}
