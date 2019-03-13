<?php

/**
 * @file
 * Contains \Drupal\eep_my_certifications\Controller\EEPMyCertificationsController.
 */

namespace Drupal\eep_my_certifications\Controller;

use Drupal\Core\Controller\ControllerBase;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
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

    function download_cdx_document_with_id() {
        $response = new Response();
        if (isset($_GET["document_download_params"])) {
            $document_params = json_decode($_GET['document_download_params']);
            $networkNodeService = new CDXNetworkNode2Service($this->config);
            $networkNodeService->set_security_token($this->token);
            $document_service_response = $networkNodeService->download_documents($document_params);
            $document_content = $document_service_response->documents->documentContent;
            $document_content_type = $document_content->contentType;
            $document_content = $document_content->_;
            $response->headers->set('Content-Type', $document_content_type);
            $response->headers->set('Content-Disposition', 'filename=' . $document_params->name);
            $response->setContent($document_content);
        }
        return $response;
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
            $expiration_string = (string)$activity->ActivityExpirationDate;
            $expiration_date = strtotime($expiration_string) + 86400;
            $curr_date = strtotime(date("Y-m-d H:i:s"));
            if (($expiration_date - $curr_date) > 0) {
                foreach ($activity->Attributes->Attribute as $child) {
                    $activity_description = (string)$activity->ActivityDesc;
                    $title_parts = explode('/', $activity_description);
                    $report_type = trim($title_parts[0]) . ' ' . trim($title_parts[1]);
                    $status_string = (string)$activity->Status;
                    $status = ($status_string == 'IN_PROGRESS') ? 'In Progress' : ucwords(strtolower($status_string));
                    $eactivity_item = [
                        'title' => (string)$activity->ActivityDesc,
                        'partner_id' => (string)$activity->PartnerExternalId,
                        'submitted' => $this->parse_and_format_certificate_date($activity->ActivityCreateDate),
                        'updated' => $this->parse_and_format_certificate_date($activity->StatusUpdateDate),
                        'report_type' => $report_type,
                        'status' => $status,
                        'documents' => []
                    ];

                    foreach ($activity->Documents->Document as $document) {
                        $document_object = [
                            "id" => (string)$document->Id,
                            "name" => (string)$document->Name,
                            "transactionId" => (string)$document->TransactionId,
                        ];
                        $eactivity_item["documents"][] = $document_object;
                    }
                    $eactivity_data[] = $eactivity_item;
                }
            }
        }
        return $eactivity_data;
    }

    private function parse_and_format_certificate_date($xml_date_obj) {
        $date_string = (string)$xml_date_obj;
        return strtoupper(date("j-M-Y", strtotime($date_string)));
    }

}
