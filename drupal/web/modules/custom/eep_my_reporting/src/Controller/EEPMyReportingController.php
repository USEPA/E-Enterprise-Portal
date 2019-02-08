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
            'roleId' => $link->RoleId,
            'status' => $link->Status->code,
          ];

          $cdx_link_data[] = $program_data;
        }
      }


      return new JsonResponse($cdx_link_data);

    }
  }
  // <==================================>

  /**
   * Callback for 'my-cdx/link-details/%' menu item
   *
   * @param $role_ids string (pipe-delimited)
   *
   * @see https://www.webwash.net/drupal/articles/getting-started-json-drupal-7
   *   (JSON Endpoints)
   */
  function my_cdx_json_link_details($roleId) {
    $response = [];
    if ($input = $this->load_my_cdx_link_details($roleId)) {
      $response = $input;
    }
    else {
      // Send empty json so Datatables does not break
      $response = [];
    }
    return new JsonResponse($response);
  }

  /**
   * Callback for 'my-cdx/link-json-handoff/%' menu item
   */
  function my_cdx_json_link_handoff($roleId) {
    $response = [];
    if ($input = $this->fetch_my_cdx_link_handoff($roleId)) {
      $response = $input;
    }
    else {
      // Send empty json so Datatables does not break
      $response = [];
    }
    return new JsonResponse($response);
  }


  /**
   * Load My CDX data from cache, web service, or static source (for testing)
   * Restructure XML return into an array we can JSONify, or return FALSE if we
   * have an error
   *
   * @return mixed
   */
  function load_my_cdx_data() {
    global $user;
    $data = &drupal_static(__FUNCTION__);

    if (!isset($data)) {
      module_load_include('inc', 'feature_toggle', 'includes/feature_toggle.api');
      if (feature_toggle_get_status('sample_mycdx_data')) {
        $data = fetch_sample_my_cdx_links();
      }
      else {
        // each user gets their own cached data
        $cache_key = 'my_cdx_data|' . $user->uid;

        $cache = cache_get($cache_key);
        // Check if cache was set and if the cache is stale, since cache_get() does not.
        // @see https://civicactions.com/blog/drupal-gotchya-cache_get-returns-expired-items/
        if ($cache && time() < $cache->expire) {
          // try cache first
          // @see https://www.lullabot.com/articles/a-beginners-guide-to-caching-data-in-drupal-7
          $data = $cache->data;
        }
        else {
          // Only store data in cache if values stored (meaning $data != false)
          if ($data = fetch_my_cdx_links()) {
            // expire the cache every ___ minutes
            $expire_ts = time() + (intval(variable_get('my_cdx_cache_reset_time', 5)) * 60);
            module_load_include('inc', 'feature_toggle', 'includes/feature_toggle.api');
            if (!feature_toggle_get_status('cdx_dev_mode')) {
              cache_set($cache_key, $data, 'cache', $expire_ts);
            }
          }
        }
      }
    }
    return $data;
  }

  /**
   * Load My CDX data from cache, web service, or static source (for testing)
   * Restructure XML return into an array we can JSONify, or return FALSE if we
   * have an error
   *
   * @param $role_id string (pipe-delimited)
   *
   * @return mixed
   */
  function load_my_cdx_link_details($role_id) {
    // @todo Add caching of CDX roles
    $data = $this->fetch_my_cdx_link_details($role_id);

    return $data;
  }

  /**
   * Load My CDX data from cache, web service, or static source (for testing)
   */
  function load_my_cdx_link_handoff($role_id) {
    global $user;
    $data = &drupal_static(__FUNCTION__);

    if (!isset($data)) {
      module_load_include('inc', 'feature_toggle', 'includes/feature_toggle.api');
      if (feature_toggle_get_status('sample_mycdx_data')) {
        $data = fetch_sample_my_cdx_link_handoff();
      }
      else {
        // setup distinct caches for each role that a given user has
        $cache_key = implode('|', [
          'my_cdx_link_handoff',
          $user->uid,
          $role_id,
        ]);

        if ($cache = cache_get($cache_key)) {
          // try cache first
          $data = $cache->data;
        }
        // The cache was set but with invalid data
        if (!isset($data)) {
          $data = fetch_my_cdx_link_handoff($role_id);

          // expire the cache every ___ minutes
          $expire_ts = time() + (intval(variable_get('my_cdx_cache_reset_time', 5)) * 60);
          cache_set($cache_key, $data, 'cache', $expire_ts);
        }
      }
    }
    return $data;
  }

  /**
   * Easy way to fake the status data in the Sample Links.
   *
   * @return mixed
   */
  function fetchRandomStatus() {
    $possible_statuses = [
      "Inactive",
      "Active",
      "AwaitingApproval",
      "AwaitingDigitalCertificate",
      "AwaitingElectronicSignatureAgreement",
      "AwaitingSponsorship",
    ];
    $random_status_index = mt_rand(0, count($possible_statuses) - 1);
    return $possible_statuses[$random_status_index];
  }

  /**
   * Fetch Sample My CDX data
   */
  function fetch_sample_my_cdx_links() {
    $data = [];

    $data[] = [
      'program_service_name' => 'CEDRI: Compliance and Emissions Data Reporting Interface',
      'role' => 'Certifier',
      'role_id' => "00001",
      'data_acronym' => "CED0",
      'status' => fetchRandomStatus(),
      'statuses' => [fetchRandomStatus()],
    ];
    $data[] = [
      'program_service_name' => 'CSPP: Submissions for Chemical Safety and Pesticide Program',
      'role' => 'Primary Authorized Official',
      'role_id' => "00002",
      'data_acronym' => "CED1",
      'status' => fetchRandomStatus(),
      'statuses' => [fetchRandomStatus()],
    ];
    $data[] = [
      'program_service_name' => 'eDisclosure: Voluntary Disclosure System',
      'role' => 'Disclose / Certify',
      'role_id' => "00003",
      'data_acronym' => "CED2",
      'status' => fetchRandomStatus(),
      'statuses' => [fetchRandomStatus()],
    ];
    $data[] = [
      'program_service_name' => 'EEP: General E-Enterprise Use',
      'role' => 'E-Enterprise Portal',
      'role_id' => "00004",
      'data_acronym' => "CED3",
      'status' => fetchRandomStatus(),
      'statuses' => [fetchRandomStatus()],
    ];
    $data[] = [
      'program_service_name' => 'SSTS: Section Seven Tracking System',
      'role' => 'Primary Authorized Official',
      'role_id' => "00005",
      'data_acronym' => "CED4",
      'status' => fetchRandomStatus(),
      'statuses' => [fetchRandomStatus()],
    ];

    $data[] = [
      'program_service_name' => 'SSTS: Section Seven Tracking System',
      'role' => 'Primary Authorized Official',
      'role_id' => "00005",
      'data_acronym' => "CED4",
      'status' => "Inactive",
      'statuses' => ["Inactive"],
    ];

    module_load_include('inc', 'feature_toggle', 'includes/feature_toggle.api');
    foreach ($data as $key => $value) {
      if (feature_toggle_get_status('mycdx_connections')) {
        unset($data[$key]['status']);
      }
      else {
        unset($data[$key]['statuses']);
      }
    }

    return $data;
  }

  /**
   * Connects to MY CDX NAAS authentication wsdl and returns token
   *
   * @return array
   */
  function return_my_cdx_token() {
    $config = $this->config('eep_my_reporting.form');
    $cdx_username = $this->getCDXUserName();
    $cdx_register_service = new CDXRegisterMyCdxService($config);


    $config = $this->config('eep_my_reporting.form');
    $location = 'my_cdx.module';
    $soap = new SOAPHandler();
    $client = $soap->connectToSOAPServerWithWSDL($config->get('wsdl'), $location);
    if ($client->error) {
      return ["client" => FALSE, "token" => FALSE];
    }
    // Use wsdl to create token to retrieve user info
    $params_for_authenticate = $cdx_register_service->generate_token_params();

    $response = $soap->callSOAPWithParams($client->client, "Authenticate", $params_for_authenticate, $location);
    if ($response->error) {
      return ["client" => $client, "token" => FALSE];
    }

    return [
      "client" => $client->client,
      "token" => $response->response->securityToken,
    ];
  }

  /**
   * Fetch My CDX link details from SOAP service
   *
   * @param $role_ids string (pipe-delimited)
   */
  function fetch_my_cdx_link_details($role_ids) {
    $config = $this->config('eep_my_reporting.form');
    $cdx_username = $this->getCDXUserName();

    $my_cdx_client_access = $this->return_my_cdx_token();
    if ($token = $my_cdx_client_access['token']) {
      // retrieve objects from "RetrieveMyCdxLinkDetails" service
      $data = ["orgCount" => 0, "organizations" => []];
      $role_ids = explode('|', $role_ids);
      foreach ($role_ids as $role_id) {
        // make the SOAP call
        $params_for_data = [
          'securityToken' => $token,
          'userId' => $cdx_username,
          'roleId' => $role_id,
        ];
        $soap = new SOAPHandler();
        $result = $soap->callSOAPWithParams($my_cdx_client_access['client'], "RetrieveMyCdxLinkDetails", $params_for_data, get_class($this));
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
    $config = $this->config('eep_my_reporting.form');
    $link_handoff = [];
    $cdx_service = new CDXRegisterMyCdxService($config);
    $link_handoff_response_data = $cdx_service->return_link_handoff_data($role_id);
    if ($link_handoff_response_data) {
      $link_handoff['destination_url'] = $this->parse_relative_cdx_paths($link_handoff_response_data->linkHandOff->HandOffUrl);
      $link_handoff['post_params'] = [];
      foreach ($link_handoff_response_data->linkHandOff->parameters->parameter as $key => $handoff_data) {
        $link_handoff['post_params'][$handoff_data->Name] = $handoff_data->Value;
      }
    }
    return $link_handoff;
  }

  function parse_relative_cdx_paths($input_url) {
    if (!$this->valid_url($input_url, TRUE)) {
      $config = $this->config('eep_my_reporting.form');
      $input_url = $config->get('cdx_environment_url') . $input_url;
    }
    return $input_url;
  }

  /**
   * Verifies the syntax of the given URL.
   *
   * This function should only be used on actual URLs. It should not be used for
   * Drupal menu paths, which can contain arbitrary characters.
   * Valid values per RFC 3986.
   *
   * @param $url
   *   The URL to verify.
   * @param $absolute
   *   Whether the URL is absolute (beginning with a scheme such as "http:").
   *
   * @return
   *   TRUE if the URL is in a valid format.
   */
  function valid_url($url, $absolute = FALSE) {
    if ($absolute) {
      return (bool) preg_match("
      /^                                                      # Start at the beginning of the text
      (?:ftp|https?|feed):\/\/                                # Look for ftp, http, https or feed schemes
      (?:                                                     # Userinfo (optional) which is typically
        (?:(?:[\w\.\-\+!$&'\(\)*\+,;=]|%[0-9a-f]{2})+:)*      # a username or a username and password
        (?:[\w\.\-\+%!$&'\(\)*\+,;=]|%[0-9a-f]{2})+@          # combination
      )?
      (?:
        (?:[a-z0-9\-\.]|%[0-9a-f]{2})+                        # A domain name or a IPv4 address
        |(?:\[(?:[0-9a-f]{0,4}:)*(?:[0-9a-f]{0,4})\])         # or a well formed IPv6 address
      )
      (?::[0-9]+)?                                            # Server port number (optional)
      (?:[\/|\?]
        (?:[\w#!:\.\?\+=&@$'~*,;\/\(\)\[\]\-]|%[0-9a-f]{2})   # The path and query (optional)
      *)?
    $/xi", $url);
    }
    else {
      return (bool) preg_match("/^(?:[\w#!:\.\?\+=&@$'~*,;\/\(\)\[\]\-]|%[0-9a-f]{2})+$/i", $url);
    }
  }
}




