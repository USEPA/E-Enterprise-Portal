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

//Temp
use Drupal\user\Entity\User;


/**
 * Controller routines for test_api routes.
 */
class EEPMyReportingController extends ControllerBase {

  function __construct() {
    //    $current_user = \Drupal::currentUser();
    //    $user = \Drupal\user\Entity\User::load($current_user->id());
  }

  /**
   * @return \Drupal\Core\Session\AccountInterface
   */
  public function getCurrentUser(): \Drupal\Core\Session\AccountInterface {
    return $this->currentUser;
  }

  private function tempLoginUser() {
    $user = User::load(1);
    user_login_finalize($user);
    $uid = \Drupal::currentUser()->id();

  }

  function getCDXUserName() {
    // Force Login User - Drupal Code
    // Call JWT Token Creation
    //
    return 'greenolive';
  }

  /**
   * Fetch My CDX data from SOAP service
   */
  function fetch_my_cdx_links() {
    $this->tempLoginUser();
    $cdx_username = $this->getCDXUserName();
    $cdx_register_service = new CDXRegisterMyCdxService();
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
          $key = $link->DataflowAcronym . ': ' . $link->DataflowName . '|' . $link->Description;
          // If key has not been stored, initialize
          if (!isset($cdx_link_data[$key])) {
            $cdx_link_data[$key] = [
              'statuses' => [],
              'role_ids' => [],
            ];
            $cdx_link_data[$key]['data'] = [
              'program_service_name' => $link->DataflowAcronym . ': ' . $link->DataflowName,
              'role' => $link->Description,
              'data_acronym' => $link->DataflowAcronym,
              'role_description' => $link->Description,
              'sso_enabled' => $link->EEPIntegration,
            ];
          }
          $status = $link->Status->code;
          if (!in_array($status, $cdx_link_data[$key]['statuses'])) {
            $cdx_link_data[$key]['statuses'][] = $status;
          }
          $cdx_link_data[$key]['role_ids'][] = $link->RoleId;
        }
      }
    }

    return new JsonResponse($cdx_link_data);

  }

}
