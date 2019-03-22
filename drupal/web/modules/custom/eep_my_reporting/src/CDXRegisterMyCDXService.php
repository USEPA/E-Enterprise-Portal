<?php

namespace Drupal\eep_my_reporting;

use Drupal\eep_my_reporting\CDXNaasService;
use Drupal\eep_my_reporting\SOAPHandler;


class CDXRegisterMyCdxService extends CDXNaasService {

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
    }
    else {
      $this->token_access_name = 'securityToken';
      $this->token_generation_method = 'Authenticate';
      $this->client = $soap_service_setup->client;
      $this->generate_token_params();
      $this->generate_token();
    }
  }

  private function generate_token_params() {
    $this->params = [
      "userId" => $this->config->get('admin_id'),
      "credential" => $this->system_config->get('cdx_naas'),
      "domain" => $this->config->get('domain'),
      "authenticationMethod" => $this->config->get('authentication_method'),
    ];
  }

  private function return_handoff_params($role_id) {
    $params = [
      'securityToken' => $this->token,
      'userRoleId' => $role_id,
      'clientIp' => $_SERVER['SERVER_ADDR'],
    ];
    return $params;
  }

  public function return_link_handoff_data($role_id) {
    $this->params = $this->return_handoff_params($role_id);
    return $this->call_service_method('RetrieveMyCdxLinkHandoff');
  }

  public function retrieve_cdx_links_for_cdx_username($cdx_username) {
    $this->params = [$this->token_access_name => $this->token];
    $this->params['userId'] = $cdx_username;
    return $this->call_service_method('RetrieveMyCdxLinks');

  }
}
