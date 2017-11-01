<?php

/**
 * Class SharedPortalService
 * Represents WSDL : https://encromerrdev.epacdxnode.net/scs-portal-ws/services/SharedPortalService?wsdl
 */
class SharedPortalService {
  private $wsdl;
  private $client;
  private $token;
  private $admin_user_name;
  private $admin_pw;
  private $user;
  private $dataflow = 'ESMT';


  function __construct() {
    $this->wsdl = variable_get('scs_shared_portal_service', 'https://encromerrdev.epacdxnode.net/scs-portal-ws/services/SharedPortalService?wsdl');
    // _return_soap_client defined in module
    $this->client = _return_soap_client($this->wsdl);
    $this->admin_user_name = variable_get('scs_auth_reg_username', "");
    $this->admin_pw = variable_get('scs_auth_reg_password', "");
    $this->token = $this->generate_token();
  }

  function retrieve_user_roles($user_name) {
    $this->user = $this->retrieve_user($user_name);
    $params = [
      'securityToken' => $this->token,
      'userId' => $user_name,
      'userOrganizationId' => $this->user->PrimaryUserOrganizationId,
      'dataflow' => $this->dataflow,
    ];
    $service_response = callSOAPWithParams($this->client, "RetrieveRoles", $params, "Linked Accounts Module");
    if (!$service_response->error) {
      return $service_response->response->Role;
    }
  }

  private function generate_token() {
    $params = array(
      "userId" => $this->admin_user_name,
      "credential" => $this->admin_pw,
    );
    $service_response = callSOAPWithParams($this->client, "Authenticate", $params, "Linked Accounts Module");
    if (!$service_response->error) {
      return $service_response->response->securityToken;
    }
  }

  private function retrieve_user($user_name) {
    $params = array(
      "securityToken" => $this->token,
      "userId" => $user_name,
    );
    $service_response = callSOAPWithParams($this->client, "RetrieveUser", $params, "Linked Accounts Module");
    if (!$service_response->error) {
      $user_data = $service_response->response->User;
      return $user_data;
    }
  }
}