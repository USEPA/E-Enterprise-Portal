<?php


/**
 * @return bool
 * If a user has CDX username, then allow SSO link
 */
function cdxUserNameExists() {
  global $user;
  $account = user_load($user->uid);
  if (isset($account->field_cdx_username[LANGUAGE_NONE][0]['value'])
    && trim($account->field_cdx_username[LANGUAGE_NONE][0]['value']) != ''
  ) {
    return TRUE;
  }
  else {
    return FALSE;
  }
}

function cdx_get_links() {
  $allow_cdx = cdxUserNameExists();
  $links = [
    'links' => [],
  ];
  if ($allow_cdx) {
    $links['links'][] = ['name' => 'CDX Home', 'url' => '/cdx_sso_handoff'];
  }
  else {
    $links['links'][] = ['name' => 'CDX Home', 'url' => variable_get('cdx_facility_resource_url')];
  }
  drupal_json_output($links);
}



function _save_cdx_username($username) {
  global $user;
  $account = user_load($user->uid);
  $account->field_cdx_username[LANGUAGE_NONE][0]['value'] = $username;
  user_save($account);
}



/**
 * @param $username
 * @param $password
 * @return bool
 * Checks username and password are valid for SCS
 */
function _validate_cdx_user($username, $password) {
  $wsdl = variable_get('cdx_auth_endpoint',
    "https://devngn.epacdxnode.net/cdx-register-II/services/RegisterAuthService?wsdl");
  $client = _return_soap_client($wsdl);
  $params = array(
    "userId" => $username,
    "password" => $password,
  );
  $service_response = callSOAPWithParams($client, "Authenticate", $params, "Linked Accounts Module");
  return !$service_response->error;
}