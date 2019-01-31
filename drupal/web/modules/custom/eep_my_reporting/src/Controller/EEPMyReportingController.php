<?php

/**
 * @file
 * Contains \Drupal\eep_my_reporting\Controller\EEPMyReportingController.
 */

namespace Drupal\eep_my_reporting\Controller;

use Drupal\Core\Controller\ControllerBase;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;




/**
 * Controller routines for test_api routes.
 */
$current_user = \Drupal::currentUser();
$user = \Drupal\user\Entity\Usehahar::load($current_user->id());

class EEPMyReportingController extends ControllerBase {

/**
 * @return \Drupal\Core\Session\AccountInterface
 */
  public function getCurrentUser(): \Drupal\Core\Session\AccountInterface {
    return $this->currentUser;
  }

    }

function connectToSOAPServerWithWSDL($wsdl, $location = "") {
  $soap_obj = new stdClass();

  try {
    $client = new SoapClient($wsdl,
      array(
        "trace" => 1,
        'exceptions' => 1,
        "stream_context" => stream_context_create(
          array(
            'ssl' => array(
              'verify_peer' => FALSE,
              'verify_peer_name' => FALSE,
            )
          )
        )
      ));
    $soap_obj->client = $client;
    $soap_obj->error = FALSE;
  } catch (SoapFault $f) {
    dpm($f);
    $message = "Error: " . $f . ' Error Message: ' . $f->detail->faultdetails->message;
    watchdog($location, $message, array(), WATCHDOG_ERROR);
    $soap_obj->error = TRUE;
  }
  return $soap_obj;
}

/**
 * @param $client WSDL file
 * @param $service
 * @param $params
 * @param $location (for debugging)
 * @return bool
 */
function callSOAPWithParams($client, $service, $params, $location = "") {
  $soap_obj = new stdClass();
  try {
    $response = $client->__soapCall($service, array($params));
    $soap_obj->response = $response;
    $soap_obj->error = FALSE;
  } catch (SoapFault $f) {
    $soap_obj->error = TRUE;
    $message = 'Error: ' . $f->getMessage();
    $soap_obj->message = $message;
    watchdog($location, print_r($f, 1), array(), WATCHDOG_ERROR);
  }
  return $soap_obj;
}

/**
 * Fetch My CDX data from SOAP service
 */
function fetch_my_cdx_links() {
  global $user;
  // format it to be some sort of array, match the structure of fetch_sample_my_cdx_links()
  $cdx_link_data = [];
  $account = $user->uid;
  $user_id = $account->field_cdx_username[LANGUAGE_NONE][0]['value'];
  // fetch the data from the soap service
  $location = 'my_cdx.module';
  $my_cdx_client_access = return_my_cdx_token();
  if ($token = $my_cdx_client_access['token']) {
    // retrieve object from "RetrieveMyCdxLinks" service
    $params_for_data = array(
      'securityToken' => $token,
      'userId' => $user_id,
    );
    $result = callSOAPWithParams($my_cdx_client_access['client'], "RetrieveMyCdxLinks", $params_for_data, $location);
    // In case of connection error, return false
    if ($result->error) {
      return FALSE;
    }
    // A user with no progams will have an empty response. If that is the case, return false
    if (!isset($result->response->links)) {
      return FALSE;
    }
    // CDX service sends an object if the return is singular.
    // Convert the object to an array containing the object
    if (!is_array($result->response->links)) {
      $result->response->links = [$result->response->links];
    }

    foreach ($result->response->links as $link) {
      $key = $link->DataflowAcronym . ': ' . $link->DataflowName . '|' . $link->Description;

      // If key has not been stored, initialize
      if (!isset($cdx_link_data[$key])) {
        $cdx_link_data[$key] = array(
          'statuses' => array(),
          'role_ids' => array()
        );
        $cdx_link_data[$key]['data'] = array(
          'program_service_name' => $link->DataflowAcronym . ': ' . $link->DataflowName,
          'role' => $link->Description,
          'data_acronym' => $link->DataflowAcronym,
          'role_description' => $link->Description,
          'sso_enabled' => $link->EEPIntegration
        );
      }
      $status = $link->Status->code;
      if (!in_array($status, $cdx_link_data[$key]['statuses'])) {
        $cdx_link_data[$key]['statuses'][] = $status;
      }
      $cdx_link_data[$key]['role_ids'][] = $link->RoleId;
    }
    return $cdx_link_data;
  }
  else {
    return FALSE;
  }
}