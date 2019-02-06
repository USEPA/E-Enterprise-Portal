<?php

/**
 * @file
 * Contains \Drupal\eep_my_reporting\Controller\EEPMyReportingController.
 */

namespace Drupal\eep_my_reporting\Controller;

use Drupal\Core\Controller\ControllerBase;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Drupal\eep_my_reporting\SOAPHandler;
use Drupal\eep_my_reporting\CDXRegisterMyCdxService;
use Drupal\user\Entity\User;


/**
 * Controller routines for test_api routes.
 */
class EEPMyReportingController extends ControllerBase {

  /**
   * @return \Drupal\Core\Session\AccountInterface
   */
  public function getCurrentUser() {
    return $this->currentUser;
  }

  function getCDXUserName() {
    $user = \Drupal\user\Entity\User::load(\Drupal::currentUser()->id());
    return $user->get('field_cdx_user_id')->getString();
  }

  /**
   * Fetch My CDX data from SOAP service
   */
  function fetch_my_cdx_links() {
    $config = $this->config('eep_my_reporting.form');
    $cdx_username = $this->getCDXUserName();
    $cdx_register_service = new CDXRegisterMyCdxService($config);
    $token = $cdx_register_service->return_token();
    // format it to be some sort of array, match the structure of fetch_sample_my_cdx_links()
    $cdx_link_data = [];
    if (isset($token)) {
      $result = $cdx_register_service->retrieve_cdx_links_for_cdx_username($cdx_username);
      // In case of connection error, return false
      if (!$result->error && isset($result->links)) {
        $links = $result->links;
        // CDX service sends an object if the return is singular.
        // Convert the object to an array containing the object
        if (!is_array($links)) {
          $links = [$links];
        }
        foreach ($links as $link) {

          // If key has not been stored, initialize

          $program_data = [
            'program_service_name' => $link->DataflowAcronym . ': ' . $link->DataflowName,
            'role' => $link->Description,
            'status' => $link->Status->code,

          ];


          $cdx_link_data[] = $program_data;
        }
      }
    }

    return new JsonResponse($cdx_link_data);

  }

}
