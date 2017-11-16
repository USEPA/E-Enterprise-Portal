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
  //TODO: allowed partners will be extracted from new Dataflow Content Type, mapping
  //TODO: allowed datatypes to Eportal specific functions.
  private $partners = ['SCS-NHDES'=> 'NH'];


  function __construct() {
    $this->wsdl = variable_get('scs_shared_portal_service', 'https://encromerrdev.epacdxnode.net/scs-portal-ws/services/SharedPortalService?wsdl');
    // _return_soap_client defined in module
    $this->client = _return_soap_client($this->wsdl);
    $this->admin_user_name = variable_get('scs_auth_reg_username', "");
    $this->admin_pw = variable_get('scs_auth_reg_password', "");
    $this->token = $this->generate_token();
  }

  public function retrieve_roles_for_dataflow_and_partner($user_name) {
    $roles_for_dataflow_and_partner = [];
    foreach($this->partners as $partner_id=>$partner_code) {
      $params = [
        'securityToken' => $this->token,
        'userId' => $user_name,
        'dataflow' => $this->dataflow,
        'partnerId' => $partner_id,
      ];
      $service_response = callSOAPWithParams($this->client, "RetrieveRolesWithOrganizationsForDataflowAndPartner", $params, "Linked Accounts Module");
      if (!$service_response->error && isset($service_response->response->RoleWithOrganization)) {
        foreach($service_response->response->RoleWithOrganization as $ro) {
          $roles_for_dataflow_and_partner[$ro->RoleId] = $ro;
        }
      }
    }
    return $roles_for_dataflow_and_partner;
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

}