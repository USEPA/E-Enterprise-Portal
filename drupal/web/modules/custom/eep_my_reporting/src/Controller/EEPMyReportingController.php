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

  private $cdx_register_service;

  private $cdx_username;

  private $client;

  private $config;

  private $location;

  private $token;

  private $soapHandler;

  function __construct() {
    $this->config = $this->config('eep_my_reporting.form');
    $this->cdx_username = $this->getCDXUserName();
    $this->cdx_register_service = new CDXRegisterMyCdxService($this->config);
    $this->token = $this->cdx_register_service->return_token();
    $this->location = 'eep_my_reporting.module';
    $this->soapHandler = new SOAPHandler();

    // Get the root item
    $client = $this->soapHandler->connectToSOAPServerWithWSDL($this->config->get('wsdl'), $this->location);
    if (!$client->error) {
      $this->client = $client->client;
    }

  }

  /*
   * Gets the User's cdx user name from the user profile
   */
  function getCDXUserName() {
    $user = \Drupal\user\Entity\User::load(\Drupal::currentUser()->id());
    return $user->get('field_cdx_user_id')->getString();
  }

  /**
   * Fetch My CDX data from SOAP service
   */
  function fetch_my_cdx_links() {
    $cdx_link_data = [];
    if (isset($this->token)) {
      $result = $this->cdx_register_service->retrieve_cdx_links_for_cdx_username($this->cdx_username);
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
            'data_acronym' => $link->DataflowAcronym,
            'roleId' => $link->RoleId,
            'status' => $link->Status->code,
          ];

          $cdx_link_data[] = $program_data;
        }
      }
    }

    return new JsonResponse($cdx_link_data);

  }

  /**
   * Callback for 'api/cdx/link-details-json/%' menu item
   */
  function my_cdx_json_link_details($roleId) {
    $response = [];

    // @todo Add caching of CDX roles
    if ($input = $this->fetch_my_cdx_link_details($roleId)) {
      $response = $input;
    }
    return new JsonResponse($response);
  }

  /**
   * Callback for 'api/cdx/link-json-handoff/%' menu item
   */
  function my_cdx_json_link_handoff($roleId) {
    $response = [];
    if ($input = $this->fetch_my_cdx_link_handoff($roleId)) {
      $response = $input;
    }
    return new JsonResponse($response);
  }

  /**
   * Fetch My CDX link details from SOAP service
   *
   * @param $role_ids string (pipe-delimited)
   */
  function fetch_my_cdx_link_details($role_ids) {

    if ($this->token) {
      // retrieve objects from "RetrieveMyCdxLinkDetails" service
      $data = ["orgCount" => 0, "organizations" => []];
      $role_ids = explode('|', $role_ids);
      foreach ($role_ids as $role_id) {
        // make the SOAP call
        $params_for_data = [
          'securityToken' => $this->token,
          'userId' => $this->cdx_username,
          'roleId' => $role_id,
        ];
        $result = $this->soapHandler->callSOAPWithParams($this->client, "RetrieveMyCdxLinkDetails", $params_for_data, get_class($this));
        if ($result->error) {
          continue;
        }

        // format it to be some sort of array, match the structure of fetch_sample_my_cdx_links()
        // CDX service sends an object if the return is singular.
        // Convert the object to an array containing the object
        if (!is_array($result->response->linkDetails)) {
          $result->response->linkDetails = [$result->response->linkDetails];
        }

        foreach ($result->response->linkDetails as $linkDetail) {
          // Only accept links that are Active
          if ($linkDetail->RoleStatus->code === "Active") {
            $userOrgId = $linkDetail->UserOrganizationId;
            if (!isset($data['organizations'][$userOrgId])) {
              $data['orgCount']++;
              $data['organizations'][$userOrgId] = [
                'clientCount' => 0,
                'orgName' => $linkDetail->OrganizationName,
                'programClients' => [],
              ];
            }
            $data['organizations'][$userOrgId]["clientCount"]++;
            $data['organizations'][$userOrgId]["programClients"][] = [
              'clientName' => $linkDetail->Subject,
              'roleName' => $linkDetail->RoleName,
              'userRoleId' => $linkDetail->UserRoleId,
            ];
          }
        }

      }

      // Organizations have a 1 to many relationship with Program Clients. We alphabetize
      // program clients for each organization by clientName,
      // then alphabetize the organizations by orgName
      $organizations = [];
      foreach ($data['organizations'] as $org_obj) {
        $client_ids = [];
        foreach ($org_obj['programClients'] as $program_client) {
          $client_ids[] = $program_client;
        }
        // Sort clients for this organization
        usort($client_ids, function ($a, $b) {
          return strcmp($a["clientName"], $b["clientName"]);
        });
        // Reassign the programClients for this organization to the sorted client_ids
        $org_obj['programClients'] = $client_ids;
        $organizations[] = $org_obj;
      }
      usort($organizations, function ($a, $b) {
        return strcmp($a["orgName"], $b["orgName"]);
      });

      // Reassign the organizations to the sorted version
      $data['organizations'] = $organizations;

      return $data;
    }
    else {
      return [];
    }
  }

  /**
   * Fetch My CDX link handoff from SOAP service
   */
  function fetch_my_cdx_link_handoff($role_id) {
    $link_handoff = [];
    $link_handoff_response_data = $this->cdx_register_service->return_link_handoff_data($role_id);
    if ($link_handoff_response_data) {
      $link_handoff['destination_url'] = $link_handoff_response_data->linkHandOff->HandOffUrl;
      $link_handoff['post_params'] = [];
      foreach ($link_handoff_response_data->linkHandOff->parameters->parameter as $key => $handoff_data) {
        $link_handoff['post_params'][$handoff_data->Name] = $handoff_data->Value;
      }
    }
    return $link_handoff;
  }

}
