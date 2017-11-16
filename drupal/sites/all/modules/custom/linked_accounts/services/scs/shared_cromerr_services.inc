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
 * Load nodes of content type 'esmt_scs_permission_mapping
 * @return array $scs_role_permissions
 */
function _load_scs_role_permissions() {
  $scs_role_permissions = [];
  $query = new EntityFieldQuery;
  $query->entityCondition('entity_type', 'node')
    ->entityCondition('bundle', 'esmt_scs_permission_mapping');
  $results = $query->execute();
  if (isset($results['node'])) {
    $nids = array_keys($results['node']);
    $scs_role_permissions = entity_load('node', $nids);
  }
  return $scs_role_permissions;
}

/**
 * Updates user account with scs role ids dependent on SCS Dataflows
 * @param $username
 */
function _update_scs_service_roles($user_name) {
  // Load roles being passed from SCS for this user
  $shared_service = new SharedPortalService();
  $scs_role_ids = array_keys($shared_service->retrieve_roles_for_dataflow_and_partner($user_name));
  _update_users_scs_role_ids($scs_role_ids);
}

/**
 * Loads provisioned role IDs allowed in Eportal
 * @return array $role_ids
 */
function _load_scs_role_ids() {
  $permission_objects = _load_scs_role_permissions();
  $role_ids = [];
  foreach($permission_objects as $po) {
    $role_ids[] = $po->esmt_mapping_scs_role_id[LANGUAGE_NONE][0]['value'];
  }
  return $role_ids;
}


/**
 * Store SCS Role Ids in user profile if the role id has been provisioned for Eportal.
 * @param Int[] $scs_role_ids
 * @throws Exception (in user_save)
 */
function _update_users_scs_role_ids($scs_role_ids) {
  global $user;
  $account = user_load($user->uid);
  $account->field_scs_role_ids = [];
  
  // Create array intersection of provisioned role ids and scs role ids passed over
  $eportal_scs_role_ids = _load_scs_role_ids();
  $intersect = array_intersect($scs_role_ids, $eportal_scs_role_ids);
  if (empty($intersect)) {
    // Save user with no scs role ids
    user_save($account);
    return;
  }
  $account->field_scs_role_ids = [LANGUAGE_NONE => []];
  foreach($intersect as $rid) {
    $account->field_scs_role_ids[LANGUAGE_NONE][] = [ 'value' => $rid, 'format' => null, 'safe_value' => $rid];
  }
  // Save account with new RIDs
  user_save($account);
}