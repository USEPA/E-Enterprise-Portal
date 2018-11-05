<?php
/**
 * Created by PhpStorm.
 * User: smolinsk
 * Date: 11/2/2018
 * Time: 12:10 PM
 */

namespace Drupal\eep_proxy_service\Plugin\ProxyServiceFilter;

use Drupal\eep_proxy_service\Plugin\ProxyServiceFilterBase;
use GuzzleHttp\Psr7\Request;
use GuzzleHttp\Psr7\Response;

/**
 * Class GenericProxyServiceFilter
 *
 * @ProxyServiceFilter(
 *   id = "generic",
 *   label = @Translation("Generic Filter")
 * )
 *
 * @package Drupal\eep_proxy_service\Plugin\ProxyServiceFilter
 */
class GenericProxyServiceFilter extends ProxyServiceFilterBase {
}