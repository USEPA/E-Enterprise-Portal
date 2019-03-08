<?php

/**
 * @file
 * Contains \Drupal\eep_my_certifications\Controller\EEPMyCertificationsController.
 */

namespace Drupal\eep_my_certifications\Controller;

use Drupal\Core\Controller\ControllerBase;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Drupal\eep_my_reporting\SOAPHandler;
use Drupal\eep_my_reporting\CDXRegisterService;
use Drupal\eep_my_reporting\CDXNetworkNode2Service;
use Drupal\user\Entity\User;


/**
 * Controller routines for test_api routes.
 */
class EEPMyCertificationsController extends ControllerBase {

    private $cdx_register_service;

    private $cdx_username;

    private $client;

    private $config;

    private $location;

    private $token;

    private $soapHandler;

    function __construct() {
        $this->config = $this->config('eep_my_certifications.form');
        $this->cdx_username = $this->getCDXUserName();
        $this->cdx_register_service = new CDXRegisterService($this->config);
        $this->token = $this->cdx_register_service->return_token();
        $this->location = 'eep_my_certifications.module';
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
    function fetch_my_certifications() {
        $networkNodeService = new CDXNetworkNode2Service($this->config);
        $networkNodeService->set_security_token($this->token);
        $flows = $networkNodeService->query_dataflow();
        $parsed_flows = $this->parse_certifications($flows);
        return new JsonResponse($parsed_flows);

    }

    private function parse_certifications($flows) {
        $result = $flows->results->any;
        $resp = simplexml_load_string($result);
        return $this->huge_function($resp);
    }

    private function huge_function($response) {
        $eactivity_data = [];
        // Parse progress tracker & to-do data
        foreach ($response->children('http://www.exchangenetwork.net/schema/eact/1') as $activity) {
            $res = array(
                "EActivityId" => (string)$activity->EActivityId,
                "PartnerSystemId" => (string)$activity->PartnerSystemId,
                "PartnerExternalId" => (string)$activity->PartnerExternalId,
                "PartnerSystemReportType" => (string)$activity->PartnerSystemReportType,
                "ActivityType" => (string)$activity->ActivityType,
                "ActivityDesc" => (string)$activity->ActivityDesc,
                "ActivityCreateDate" => (string)$activity->ActivityCreateDate,
                "ActivitySourceURL" => (string)$activity->ActivitySourceURL,
                "ActivityExpirationDate" => (string)$activity->ActivityExpirationDate,
                "Status" => (string)$activity->Status,
                "StatusNote" => (string)$activity->StatusNote,
                "StatusUpdateDate" => (string)$activity->StatusUpdateDate,
                "UserId" => (string)$activity->UserId,
                "RoleId" => (string)$activity->RoleId,
                "RoleIdSubject" => (string)$activity->RoleIdSubject,
                "Attributes" => (string)$activity->Attributes,
            );

            foreach ($activity->Attributes->Attribute as $child) {
                if ((string)($child->attributes()) == 'facilityName') {
                    $res['FacilityName'] = $child->__toString();
                } else
                    if ((string)($child->attributes()) == 'partCode') {
                        $res['partCode'] = $child->__toString();
                    } else if ((string)($child->attributes()) == 'partName') {
                        $res['partName'] = $child->__toString();
                    } else if ((string)($child->attributes()) == 'subPartCode') {
                        $res['subPartCode'] = $child->__toString();
                    } else if ((string)($child->attributes()) == 'subPartName') {
                        $res['subPartName'] = $child->__toString();
                    } else if ((string)($child->attributes()) == 'facilityRegistryIdentifier') {
                        $res['facilityRegistryIdentifier'] = $child->__toString();
                    }
            }
            $i = 0;

            foreach ($activity->Documents->Document as $child) {
                $res['Documents'][$i]['id'] = $child->Id->__toString();
                $res['Documents'][$i]['name'] = 'sites/default/files/' . $child->Name->__toString();
                $res['Documents'][$i]['typeId'] = $child->TypeId->__toString();
                $res['Documents'][$i]['size'] = $child->Size->__toString();
                $res['Documents'][$i]['createDate'] = $child->CreateDate->__toString();
                $res['Documents'][$i]['transactionId'] = $child->TransactionId->__toString();
                $i++;
            }


            //86,400 is number of seconds in 24 hours, extend expiration date by 24 hours.
            $expiration_date = strtotime($res['ActivityExpirationDate']) + 86400;
            $curr_date = strtotime(date("Y-m-d H:i:s"));
            // Do not create a node if its expiration date is already passed
            if (($expiration_date - $curr_date) > 0) {
                $eactivity_id = $res['EActivityId'];
                $eactivity_item = [];
                $eactivity_item['title'] = $res['ActivityDesc'];
                $eactivity_item['date'] = date("m/d/Y", $expiration_date);
                $activity_type = $res['ActivityType'];
                $eactivity_item['partner_id'] = $res['PartnerExternalId'];
                $res_domain = $res['PartnerSystemId'];
                if (strpos($res['PartnerSystemId'], 'lead') !== FALSE) {
                    $res_domain = "Lead";
                } else if (strpos($res['PartnerSystemId'], 'cedri') !== FALSE) {
                    $res_domain = "CEDRI";
                }

                $eactivity_item["domain"] = $res_domain;
                $eactivity_item['submitted'] = strtoupper(date("j-M-Y", strtotime($res['ActivityCreateDate'])));


                if ($res_domain == 'Lead') {
                    $eactivity_item["updated"] = strtoupper(date("j-M-Y", strtotime($res['StatusUpdateDate'])));
                    $title_parts = explode('/', $eactivity_item['title']);
                    $eactivity_item['report_type'] = trim($title_parts[0]) . ' ' . trim($title_parts[1]);
                    $eactivity_item["status_note"] = $res['StatusNote'];
                    $eactivity_item['date_type'] = 'Status Changed Date';

                } else if ($res_domain == 'CEDRI') {
                    $eactivity_item["date"] = date("m/d/Y", strtotime($res['ActivityExpirationDate']));
                    $eactivity_item['date_type'] = 'Publish Date';
                    $eactivity_item['report_type'] = $res['PartnerSystemReportType'];
                    $eactivity_item["cedri_details"] = array(
                        'facility_name' => $res['FacilityName'],
                        'part_code' => $res['partCode'],
                        'part_name' => $res['partName'],
                        'sub_part_code' => $res['subPartCode'],
                        'sub_part_name' => $res['subPartName'],
                        'facility_registry' => $res['facilityRegistryIdentifier'],
                        'partner_system_report_type' => $res['PartnerSystemReportType'],
                    );
                }

                $res_status = ($res['Status'] == 'IN_PROGRESS') ? 'In Progress' : ucwords(strtolower($res['Status']));
                $eactivity_item["status"] = $res_status;


                if ($activity_type === 'TRACKER') {
                    $res_action = '';
                    // Handle Documents
                    if ($res_domain == 'Lead') {
                        foreach ($res['Documents'] as $ky => $vl) {
                            if (strpos($vl['name'], 'Receipt') !== FALSE) {
                                $res_action .= "<a class='favorites-ignore ga-tracking'  data-ga-event-label='progress tracker view receipt' href='/" . $vl['name'] . "' target='_blank'>View Receipt</a>";
                            }
                            if (strpos($vl['name'], 'Certificate') !== FALSE) {
                                $res_action .= "<a class='favorites-ignore ga-tracking' data-ga-event-label='progress tracker view certificate' href='/" . $vl['name'] . "' target='_blank'>View Certificate</a>";
                            }
                            if (strpos($vl['name'], 'Logo') !== FALSE) {
                                $res_action .= "<a class='favorites-ignore ga-tracking' data-ga-event-label='progress tracker view logo' href='/" . $vl['name'] . "' target='_blank'>View Logo</a>";
                            }
                        }
                    } else if ($res['Status'] == 'Under Review' || $res_domain == 'CEDRI') {
                        $res_action .= "<a class='favorites-ignore ga-tracking'  data-ga-event-label='progress tracker view submission' href='/cdx_sso_handoff?handoff_data=" . $this->parse_cdx_handoff_data($res['ActivitySourceURL']) . "' target='_blank'>View Submission</a>";
                    }
                    if (empty($res_action)) {
                        $res_action = "N/A";
                    }
                    $eactivity_item["actions"] = $res_action;
                    $eactivity_item['eactivity_id'] = $eactivity_id;
                    $eactivity_data[] = $eactivity_item;
                }
            }

        }
        return $eactivity_data;
    }

    private function parse_cdx_handoff_data($data) {
        return 'test';
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
        } else {
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

//    function fetch_my_certifications_configs() {
//        $security_token_handler = new CDXSecurityTokenService($this->config);
//        $response = $this->config;
//        $response = $response->getRawData();
//        unset($response['admin_id']);
//        unset($response['authentication_method']);
//        unset($response['domain']);
//        unset($response['wsdl']);
//
//        // UTF-16LE and base64 encoding are required by the cdx NaasToken silent handoff.
//        $sso_token = "token=" . $security_token_handler->return_token() . "&remoteIpAddress=" . $_SERVER['LOCAL_ADDR'];
//        $sso_token = mb_convert_encoding($sso_token, 'UTF-16LE');
//        $response['ssoToken'] = base64_encode($sso_token);
//        $response['cdx_silent_handoff_url'] = $response['cdx_base_url'] . '/SilentHandoff/NaasTokenSSO';
//        return new JsonResponse($response);
//    }

}
