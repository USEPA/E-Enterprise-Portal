<?php
/**
 * Created by PhpStorm.
 * User: smolinsk
 * Date: 10/22/2018
 * Time: 3:45 PM
 */

namespace Drupal\eep_proxy_service\Proxy;


class RequestParser {

  /**
   * Request stack.
   *
   * @var RequestStack
   */
  public $request;

  /**
   * Class constructor.
   *
   * @param RequestStack $request
   *   Request stack.
   */
  public function __construct(RequestStack $request = null) {
    if($request) {
      $this->request = $request;
    }
  }

  public function parse() {
    if($this->request) {
      // Get request type

      // Get request payload

      // Get headers

    }
  }
}