<?php

namespace Drupal\eep_proxy_service\Plugin;

use Drupal\Component\Plugin\PluginInspectionInterface;
use GuzzleHttp\Psr7\Request;
use GuzzleHttp\Psr7\Response;

/**
 * Defines an interface for Proxy Service Filter plugins.
 */
interface ProxyServiceFilterInterface extends PluginInspectionInterface {


  // Add get/set methods for your plugin type here.

  /**
   * @param \GuzzleHttp\Psr7\Request $request
   *
   * @return mixed
   */
  public function prefetch();

  /**
   * @return mixed
   */
  public function fetch();

  /**
   * @param \GuzzleHttp\Psr7\Response $response
   *
   * @return GuzzleHttp\Psr7\Response
   */
  public function postfetch();

}
