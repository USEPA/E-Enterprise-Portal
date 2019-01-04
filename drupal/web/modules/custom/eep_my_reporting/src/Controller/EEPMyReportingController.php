<?php

/**
 * @file
 * Contains \Drupal\eep_my_reporting\Controller\EEPMyREportingController.
 */

namespace Drupal\eep_my_reporting\Controller;

use Drupal\Core\Controller\ControllerBase;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;

/**
 * Controller routines for test_api routes.
 */
class EEPMyReportingController extends ControllerBase {

  /**
   * Callback for `my-api/get.json` API method.
   */
  public function get_example( Request $request ) {

    $response['data'] = '';
    $response['method'] = 'GET';

    return new JsonResponse( $response );
  }

}