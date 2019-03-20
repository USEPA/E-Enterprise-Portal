<?php

namespace Drupal\eep_proxy_service\Plugin;

use Drupal\Core\Plugin\DefaultPluginManager;
use Drupal\Core\Cache\CacheBackendInterface;
use Drupal\Core\Extension\ModuleHandlerInterface;

/**
 * Provides the Proxy Service Filter plugin manager.
 */
class ProxyServiceFilterManager extends DefaultPluginManager {


  /**
   * Constructs a new ProxyServiceFilterManager object.
   *
   * @param \Traversable $namespaces
   *   An object that implements \Traversable which contains the root paths
   *   keyed by the corresponding namespace to look for plugin implementations.
   * @param \Drupal\Core\Cache\CacheBackendInterface $cache_backend
   *   Cache backend instance to use.
   * @param \Drupal\Core\Extension\ModuleHandlerInterface $module_handler
   *   The module handler to invoke the alter hook with.
   */
  public function __construct(\Traversable $namespaces, CacheBackendInterface $cache_backend, ModuleHandlerInterface $module_handler) {
    parent::__construct('Plugin/ProxyServiceFilter', $namespaces, $module_handler, 'Drupal\eep_proxy_service\Plugin\ProxyServiceFilterInterface', 'Drupal\eep_proxy_service\Annotation\ProxyServiceFilter');

    $this->alterInfo('eep_proxy_service_proxy_service_filter_info');
    $this->setCacheBackend($cache_backend, 'eep_proxy_service_proxy_service_filter_plugins');
  }

}
