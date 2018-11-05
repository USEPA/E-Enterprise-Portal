<?php
/**
 * Created by PhpStorm.
 * User: smolinsk
 * Date: 11/2/2018
 * Time: 12:10 PM
 */
namespace Drupal\eep_core\Plugin\ProxyServiceFilter;
use Drupal\eep_proxy_service\Plugin\ProxyServiceFilterBase;
use GuzzleHttp\Psr7\Request;
use GuzzleHttp\Psr7\Response;
/**
 * Class TestProxyServiceFilter
 *
 * @ProxyServiceFilter(
 *   id = "test",
 *   label = @Translation("Test Filter")
 * )
 *
 * @package Drupal\eep_core\Plugin\ProxyServiceFilter
 */
class TestProxyServiceFilter extends ProxyServiceFilterBase {
  /**
   * @param \GuzzleHttp\Psr7\Request $request
   *
   * @return mixed
   */
  public function prefetch(Request $request) {
    // TODO: Implement prefetch() method.
    return $request;
  }

  /**
   * @param \GuzzleHttp\Psr7\Response $response
   *
   * @return mixed
   */
  public function postfetch(Response $response) {
    // TODO: Implement postfetch() method.
    return $response;
  }
}