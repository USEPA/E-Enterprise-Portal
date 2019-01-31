<?php

class CDXSecurityTokenService extends CDXNaasService {

  function __construct() {
    $this->wsdl = 'cdx_facility_naas_wsdl';
    // Initialize connection with client
    $soap_service_setup = connectToSOAPServerWithWSDL($this->wsdl, "CDX Security Token Service");
    if ($soap_service_setup->error) {
      $this->client = false;
    }
    else {
      $this->token_access_name = 'return';
      $this->client = $soap_service_setup->client;
      $this->token_generation_method = 'CreateSecurityToken';
      $this->generate_token_params();
      $this->generate_token();
    }
  }

  private function return_user_cdx_name() {
    global $user;
    $account = $user->uid;
    $user_id = strtoupper($account->field_cdx_username[LANGUAGE_NONE][0]['value']);
    return $user_id;
  }

  private function generate_token_params() {
    $user_id = $this->return_user_cdx_name();
    $this->params = array(
      "userId" => $user_id,
      "credential" => 'cdx_facility_password',
      "domain" => 'cdx_node_token_domain',
      "authMethod" => 'eactivity_auth_reg_auth_method',
      "trustee" => 'cdx_node_token_email',
      "ip" => $_SERVER['SERVER_ADDR'],
      "subjectData" => "userId=$user_id",
      "subject" => $user_id,
      "issuer" => "EEP",
      "tokenType" => 'csm',
    );
  }


}