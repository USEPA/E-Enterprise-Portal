<?php

/**
 * @file
 * Contains \Drupal\eep_my_certifications\Controller\EEPMyCertificationsController.
 */

namespace Drupal\eep_my_certifications\Controller;

use Drupal\Core\Controller\ControllerBase;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
//@todo Refactor CDX SOAP services into their own custom module or proxy filter
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
        $results = $flows->results->any;
        $parsed_response = simplexml_load_string($results);
        return $this->extract_certifications_from_xml_response($parsed_response);
    }

    private function extract_certifications_from_xml_response($response) {
        $eactivity_data = [];
        // Parse progress tracker & to-do data
        foreach ($response->children('http://www.exchangenetwork.net/schema/eact/1') as $activity) {
            $res = array(
                "PartnerExternalId" => (string)$activity->PartnerExternalId,
                "PartnerSystemReportType" => (string)$activity->PartnerSystemReportType,
                "ActivityDesc" => (string)$activity->ActivityDesc,
                "ActivityCreateDate" => (string)$activity->ActivityCreateDate,
                "ActivityExpirationDate" => (string)$activity->ActivityExpirationDate,
                "Status" => (string)$activity->Status,
                "StatusUpdateDate" => (string)$activity->StatusUpdateDate,
            );

            foreach ($activity->Attributes->Attribute as $child) {
                //86,400 is number of seconds in 24 hours, extend expiration date by 24 hours.
                $expiration_date = strtotime($res['ActivityExpirationDate']) + 86400;
                $curr_date = strtotime(date("Y-m-d H:i:s"));
                // Do not create a node if its expiration date is already passed
                if (($expiration_date - $curr_date) > 0) {
                    $eactivity_item = [];
                    $eactivity_item['title'] = $res['ActivityDesc'];
                    $eactivity_item['partner_id'] = $res['PartnerExternalId'];
                    $res_domain = $res['PartnerSystemId'];
                    $eactivity_item['submitted'] = strtoupper(date("j-M-Y", strtotime($res['ActivityCreateDate'])));
                    if ($res_domain == 'Lead') {
                        $eactivity_item["updated"] = strtoupper(date("j-M-Y", strtotime($res['StatusUpdateDate'])));
                        $title_parts = explode('/', $eactivity_item['title']);
                        $eactivity_item['report_type'] = trim($title_parts[0]) . ' ' . trim($title_parts[1]);
                    } else if ($res_domain == 'CEDRI') {
                        $eactivity_item["updated"] = date("m/d/Y", strtotime($res['ActivityExpirationDate']));
                        $eactivity_item['report_type'] = $res['PartnerSystemReportType'];
                    }

                    $res_status = ($res['Status'] == 'IN_PROGRESS') ? 'In Progress' : ucwords(strtolower($res['Status']));
                    $eactivity_item["status"] = $res_status;

                    $eactivity_data[] = $eactivity_item;
                }
            }
        }
        return $eactivity_data;
    }

}
