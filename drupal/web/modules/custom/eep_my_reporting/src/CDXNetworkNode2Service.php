<?php

namespace Drupal\eep_my_reporting;

use Drupal\eep_my_reporting\CDXNaasService;
use Drupal\eep_my_reporting\SOAPHandler;

class CDXNetworkNode2Service extends CDXNaasService {


    private $soap_handler;

    private $config;

    private $system_config;


    function __construct($config) {
        $this->config = $config;
        $this->system_config = \Drupal::config('system.passwords');
        $this->soap_handler = new SOAPHandler();
        $this->wsdl = $this->config->get('wsdl');
        $soap_service_setup = $this->soap_handler->connectToSOAPServerWithWSDL($this->wsdl);
        if ($soap_service_setup->error) {
            $this->client = FALSE;
        } else {
            $this->client = $soap_service_setup->client;
        }
    }

    function set_security_token($token) {
        $this->token = $token;
    }

    private function return_user_cdx_name() {
        $user = \Drupal\user\Entity\User::load(\Drupal::currentUser()->id());
        $user_name = $user->get('field_cdx_user_id')->getString();
        return strtoupper($user_name);
    }

    private function generate_dataflow_query_params() {
        $cdx_username = $this->return_user_cdx_name();
        $this->params = [
            "securityToken" => $this->token,
            "dataflow" => "E-ACTIVITY",
            "request" => "GetByUser",
            "rowId" => 0,
            "maxRows" => -1,
            "parameters" => [
                "_" => strtoupper($cdx_username),
                "parameterEncoding" => "None",
                "parameterName" => "user"
            ],
        ];
    }
    
    function query_dataflow() {
        $this->generate_dataflow_query_params();
        return $this->call_service_method('Query');
    }

    function download_documents($document_object) {
        $id = $document_object->id;
        $transaction_id = $document_object->transactionId;
        $document_name = $document_object->name;
        $document_format = $document_object->format;
        $type_id = $document_object->type_id;

        $content = [
            "_" => $id,
            "contentType" => [$type_id]
        ];
        $param_doc = array(
            "documentName" => $document_name,
            "documentFormat" => $document_format,
            "documentContent" => $content,
            "documentId" => $id,
        );

        $this->params = array(
            "securityToken" => $this->token,
            "dataflow" => "E-ACTIVITY",
            "transactionId" => $transaction_id,
            "documents" => $param_doc,
        );
        return $this->call_service_method('Download');
    }

}