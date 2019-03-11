<?php

namespace Drupal\eep_my_reporting;

use Drupal\eep_my_reporting\CDXNaasService;
use Drupal\eep_my_reporting\SOAPHandler;

class CDXRegisterService extends CDXNaasService {


    private $soap_handler;

    private $config;

    private $system_config;


    function __construct($config) {
        $this->config = $config;
        $this->system_config = \Drupal::config('system.passwords');
        $this->wsdl = $this->config->get('security_token_wsdl');
        $this->soap_handler = new SOAPHandler();
        $this->wsdl = $this->config->get('security_token_wsdl');
        $soap_service_setup = $this->soap_handler->connectToSOAPServerWithWSDL($this->wsdl);
        if ($soap_service_setup->error) {
            $this->client = FALSE;
        }
        else {
            $this->token_access_name = 'securityToken';
            $this->client = $soap_service_setup->client;
            $this->token_generation_method = 'Authenticate';
            $this->generate_token_params();
            $this->generate_token();
        }
    }

    private function return_user_cdx_name() {
        $user = \Drupal\user\Entity\User::load(\Drupal::currentUser()->id());
        $user_name = $user->get('field_cdx_user_id')->getString();
        return strtoupper($user_name);

    }

    private function generate_token_params() {
        $this->params = array(
            "userId" => $this->config->get('admin_id'),
            "credential" => $this->system_config->get('cdx_naas'),
            "domain" => $this->config->get('domain'),
            "authenticationMethod" => $this->config->get('authentication_method'),
        );
    }


}