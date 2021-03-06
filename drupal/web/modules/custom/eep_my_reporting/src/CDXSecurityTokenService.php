<?php

namespace Drupal\eep_my_reporting;

use Drupal\eep_my_reporting\CDXNaasService;
use Drupal\eep_my_reporting\SOAPHandler;

class CDXSecurityTokenService extends CDXNaasService {


  private $soap_handler;

  private $config;

  private $system_config;


  function __construct($config) {
    $this->config = $config;
    $this->system_config = \Drupal::config('system.passwords');
    $this->wsdl = 'cdx_facility_naas_wsdl';
    $this->soap_handler = new SOAPHandler();
    $this->wsdl = $this->config->get('security_token_wsdl');
    $soap_service_setup = $this->soap_handler->connectToSOAPServerWithWSDL($this->wsdl);
    if ($soap_service_setup->error) {
      $this->client = FALSE;
    } else {
      $this->token_access_name = 'return';
      $this->client = $soap_service_setup->client;
      $this->token_generation_method = 'CreateSecurityToken';
    }
  }
  
  public function generate_token() {
    $this->generate_token_params();
    parent::generate_token(); 
  }

  private function return_user_cdx_name() {
    $user = \Drupal\user\Entity\User::load(\Drupal::currentUser()->id());
    $user_name = $user->get('field_cdx_user_id')->getString();
    return strtoupper($user_name);
  }

  public function decode_token($token, $ip) {
    $this->params = [
      "userId" => $this->config->get('admin_id'),
      "credential" => $this->system_config->get('cdx_naas'),
      "domain" => $this->config->get('domain'),
      "securityToken" => $token,
      "clientIp" => $ip,
      "resourceURI" => ""
    ];
    return $this->call_service_method('Validate');
  }

  private function generate_token_params() {
    $user_id = $this->return_user_cdx_name();
    $this->params = array(
      "userId" => $user_id,
      "credential" => $this->system_config->get('cdx_naas'),
      "domain" => $this->config->get('domain'),
      "authMethod" => $this->config->get('authentication_method'),
      "trustee" => $this->config->get('admin_id'),
      "ip" => $_SERVER['LOCAL_ADDR'],
      "subjectData" => "userId=$user_id",
      "subject" => $user_id,
      "issuer" => "EEP",
      "tokenType" => 'csm',
    );
  }


}