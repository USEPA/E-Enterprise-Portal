<?php
module_load_include('php', 'linked_accounts', 'services/scs/SharedPortalService');

function scs_get_links() {
  $links = [
    'links' =>
      [
        [
          'name' => 'SCS Home',
          'url' => '#',
          'id' => 'scs_handoff',
        ],
      ],
  ];
  drupal_json_output($links);
}


function _save_scs_username($username) {
  global $user;
  $account = user_load($user->uid);
  $account->field_scs_username[LANGUAGE_NONE][0]['value'] = $username;
  user_save($account);
}


/**
 * @param $username
 * @param $password
 * @return bool
 * Checks username and password are valid for SCS
 */
function _validate_scs_user($username, $password) {
  return _authenticate_user(_authenticate_scs_admin()['token'], $username, $password);
}


/**
 * @return array
 * Authenticates token for use with SCS SOAP functions
 */
function _authenticate_scs_admin() {
  $r = ['token' => '', 'error' => FALSE];
  $wsdl = variable_get('scs_auth_endpoint',
    "https://encromerrdev.epacdxnode.net/shared-cromerr-ws/services/UserManagementService?wsdl");

  $client = _return_soap_client($wsdl);
  $params = array(
    "userId" => variable_get('scs_auth_reg_username', ""),
    "credential" => variable_get('scs_auth_reg_password', ""),
  );
  $service_response = callSOAPWithParams($client, "Authenticate", $params, "Linked Accounts Module");

  if ($service_response->error) {
    return array("error" => true, "msg" => $service_response->msg);
  }

  $r['token'] = $service_response->response->securityToken;

  return $r;
}

/**
 * @param $token
 * @param $username
 * @param $password
 * @return bool
 * Checks whether user is valid
 */
function _authenticate_user($token, $username, $password) {
  $wsdl = variable_get('scs_auth_endpoint',
    "https://encromerrdev.epacdxnode.net/shared-cromerr-ws/services/UserManagementService?wsdl");
  $client = _return_soap_client($wsdl);
  $params1 = array(
    "securityToken" => $token,
    "userId" => $username,
    "credential" => $password,
  );

  $service_response = callSOAPWithParams($client, "AuthenticateUser", $params1, "Linked Accounts Module");
  return !$service_response->error;
}

function scs_handoff() {
  $wsdl = variable_get('scs_handoff_auth_endpoint',
    "https://encromerrdev.epacdxnode.net/scs-portal-ws/services/SharedPortalSecurityService?wsdl");
  $client = _return_soap_client($wsdl);
  $handoff_url = variable_get("scs_handoff_url", "https://encromerrdev.epacdxnode.net/Handoff");
  $service_request = _create_scs_security_token($client);
  drupal_json_output(['handoff_url' => $handoff_url, 'token' => $service_request['token'], 'ip' => $_SERVER['SERVER_ADDR']]);
}

function _create_scs_security_token($client) {
  global $user;
  $account = user_load($user->uid);
  $username = strtoupper($account->field_scs_username[LANGUAGE_NONE][0]['value']);
  $params = [
    "userId" => variable_get('scs_auth_reg_username', "enterprise.portal.scs.admin@epa.gov"),
    "credential" => variable_get('scs_auth_reg_password'),
    "subjectUserId" => $username,
    "ip" => $_SERVER['SERVER_ADDR'],
  ];
  $service_response = callSOAPWithParams($client, "CreateBasicSecurityToken", $params, "Linked Accounts Module");

  if ($service_response->error) {
    return array("error" => true, "msg" => $service_response->msg);
  }

  $r['token'] = $service_response->response->token;
  return $r;
}


/**
 * @param $username
 * Updates user account with permissions dependent on SCS Dataflows
 * Currently only using BWI. Insert future SCS dataflows here.
 */
function _update_scs_service_roles($user_name) {
  //TODO: allowed role ids will be extracted from new Dataflow Content Type, mapping
  //TODO: allowed datatypes to Eportal specific functions.
  $allowed_role_ids = [9732];
  $shared_service = new SharedPortalService();
  $user_roles_collection = $shared_service->retrieve_roles_for_dataflow_and_partner($user_name);
  foreach ($user_roles_collection as $user_roles) {
    foreach($user_roles as $role_object) {
      if (in_array($role_object->RoleId, $allowed_role_ids)) {
        if (module_exists('be_well_informed')) {
          //@see be_well_informed module
          grant_user_bwi_configurations_permissions($role_object->PartnerId);
          return;
        }
      }
    }
  }
  // If no role found, clear users bwi permissions
  if (module_exists('be_well_informed')) {
    //@see be_well_informed module
    remove_user_bwi_configurations_permissions();
  }
}