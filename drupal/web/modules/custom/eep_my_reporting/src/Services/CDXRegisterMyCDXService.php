<?php

class CDXRegisterMyCdxService extends CDXNaasService {

  function __construct() {
    $this->wsdl = 'cdx_service_endpoint';
    $soap_service_setup = connectToSOAPServerWithWSDL($this->wsdl, "My CDX");
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
    $this->params = array(
      "userId" => 'eactivity_auth_reg_username',
      "credential" => 'eactivity_auth_reg_password',
      "domain" => 'eactivity_auth_reg_domain',
      "authenticationMethod" => 'eactivity_auth_reg_auth_method',
    );
  }


  private function return_handoff_params($role_id) {
    $params = array(
      'securityToken' => $this->token,
      'userRoleId' => $role_id,
      'clientIp' => $_SERVER['SERVER_ADDR']
    );
    return $params;
  }


  public function return_link_handoff_data($role_id) {
    $this->params = $this->return_handoff_params($role_id);
    return $this->call_service_method('RetrieveMyCdxLinkHandoff');
  }
}