<?php

/**
 * @file
 * Menu callbacks and related functions.
 */

/**
 * Provides AJAX EE Bridge login form.
 */
function eenterprise_bridge_auth_login() {
  $form = drupal_render(drupal_get_form('eenterprise_bridge_auth_login_form'));
  return array(
    '#type' => 'ajax',
    '#commands' => array(
      ajax_command_html('#eenterprise_bridge_auth_container', $form),
    ),
  );
}

/**
 * Implements the EE Bridge login form.
 *
 * @param bool $wrap
 *   If true, wrap the identity provider buttons in a fieldset.
 */
function eenterprise_bridge_auth_login_form($form, $form_state, $wrap = TRUE) {
  $identity_providers = [array('Name' => 'Log in')];
  $form = array();
  $form['wrap'] = array(
    '#type' => 'value',
    '#value' => $wrap,
  );
  if (!$identity_providers) {
    return $form;
  }
  $temp = array();
  $temp['identity_providers'] = array(
    '#type' => 'value',
    '#value' => $identity_providers,
  );
  foreach ($identity_providers as $identity_provider) {
    $temp[$identity_provider['Name']] = array(
      '#type' => 'submit',
      '#default_value' => $identity_provider['Name'],
    );
  }
  if ($wrap) {
    $form['eenterprise_bridge_auth'] = array(
      '#type' => 'fieldset',
      '#title' => variable_get('eenterprise_bridge_auth_link_text', t('Sign in using E-Enterprise Bridge')),
    );
    $form['eenterprise_bridge_auth'] = array_merge($form['eenterprise_bridge_auth'], $temp);
  } else {
    $form = array_merge($form, $temp);
  }
  return $form;
}

/**
 * Submit callback.
 */
function eenterprise_bridge_auth_login_form_submit($form, &$form_state) {
  $fields = $form_state['values']['wrap'] ? $form['eenterprise_bridge_auth'] : $form;

  foreach ($fields['identity_providers']['#value'] as $identity_provider) {
    if ($form_state['clicked_button']['#default_value'] == $identity_provider['Name']) {
      //Creates complex array using handoff settings values
      $idParams = array('wa' => 'wsignin1.0',
        'wtrealm' => variable_get('eenterprise_bridge_auth_realm'),
        'wctx' => 'rm=0',
        'wreply' => variable_get('eenterprise_bridge_auth_reply'));

      //Builds URL for handing off the Open ID Bridge
      $idBridgeUrl = variable_get('eenterprise_bridge_auth_issuer') . "?" . http_build_query($idParams) . "\n";

      //Auto redirects to the Open ID Bridge
      $form_state['redirect'] = $idBridgeUrl;
    }
  }
}

/**
 * Authentication callback function.
 *
 * Handles an authentication token and, if able, will log the user in or allow
 * the user to register.
 */
function eenterprise_bridge_auth_authenticate($error) {
  if ($error) {
    $message = t('Unable to log in using E-Enterprise Bridge.');
    watchdog('eenterprise_bridge_auth', $message, array(), WATCHDOG_ERROR);
    drupal_set_message($message, 'error');
  }
  if (!isset($_POST['wa'])) {
    drupal_set_message("Expected context parameter is not set", "error");
  } else if ($_POST['wa'] == 'wsignin1.0') {
    $adfs = new AdfsBridge();
    try {
      if (isset($_POST['wam_test'])) {
        $userDetails = new stdClass();
        $userDetails->attributes['name'][] = $_POST['name'];
      } else if (isset($_POST['piv_card_test'])) {
        $userDetails = new stdClass();
        $userDetails->attributes['uid'][] = $_POST['uid'];
        $userDetails->attributes['issuer'][] = $_POST['issuer'];
        $userDetails->attributes['Organization'][] = $_POST['Organization'];
        $userDetails->attributes['OrganizationUnit'][] = $_POST['OrganizationUnit'];
      } else {
        $userDetails = $adfs->getAdfsSignInResponse(AdfsConf::getInstance(), $_POST['wresult']);
      }
    } catch (Exception $e) {
      $msg = 'Message: ' . $e->getMessage();
      drupal_set_message($msg, "error");
      watchdog('eenterprise_bridge_auth', $msg, array(), WATCHDOG_ERROR);
    }
    global $user;
    if ($user->uid == 0) {
      //Get user mapping and attempt to login user.
      $pos = strpos($userDetails->attributes['name'][0], "NAASOpenId");
      $openid_position = strpos($userDetails->attributes['name'][0], "ENOpenId");
      $wam_pos = stripos($userDetails->attributes['name'][0], "WAM");
      $username_raw = explode('/', $userDetails->attributes['name'][0]);
      $piv_card_position = stripos($userDetails->attributes['issuer'][0], "SmartCard");
      $username = end($username_raw);
      $uname = "";
      if ($piv_card_position !== FALSE) {
        $piv_uname = trim(trim($userDetails->attributes['uid'][0]), '"');
        //To avoid username conflicts among users from multiple agencies, use username followed by dnQualifier attribute.
        $dnQualifier = trim($userDetails->attributes['dnQualifier'][0]);
        $uname_pos = strrpos($piv_uname, ":");
        $piv_uname = substr($piv_uname, $uname_pos);
        $uname_arr = explode(' ', $piv_uname);
        $uname = $uname_arr[0] . "_" . $uname_arr[1] . "_" . $dnQualifier . "_Via_PIV_Card";
        $public_or_cdx = 'public';
      } else if ($wam_pos !== FALSE) {
        //Trim space and double quote from WAM name attribute.
        $wam_uname = trim(trim($userDetails->attributes['name'][0]), '"');
        $uname_pos = strrpos($wam_uname, "/");
        $wam_res = substr($wam_uname, $uname_pos + 1);
        $uname = $wam_res . "_Via_WAM";
        $public_or_cdx = 'public';
      } else if ($openid_position !== FALSE) {
        mitigate_username_alteration($username . "_Via_Exchange_Network", $username);
        $uname = $username . "_Via_Exchange_Network";
        $public_or_cdx = 'cdx';
      }//If user is a public user, Yahoo, google etc, use email as username, otherwise, use username as username
      else if (($pos === FALSE && $openid_position === FALSE) || $username === FALSE) {
        if (isset($userDetails->attributes['email'])) {
          $userDetails->attributes['email'][0] = trim($userDetails->attributes['email'][0], '"');
          if (isset($userDetails->attributes['authenticationMethod']) && stripos($userDetails->attributes['authenticationMethod'], 'facebook') !== FALSE) {
            mitigate_username_alteration($userDetails->attributes['email'][0] . "_Via_Facebook", $userDetails->attributes['email'][0]);
            $uname = $userDetails->attributes['email'][0] . "_Via_Facebook";
          }
          if (isset($userDetails->attributes['authenticationMethod']) && stripos($userDetails->attributes['authenticationMethod'], 'NMIdP') !== FALSE) {
            $uname = $userDetails->attributes['email'][0] . "_Via_NMED";
          }
          $public_or_cdx = 'public';
        } else {
          if (isset($userDetails->attributes['followers_count'])) {
            mitigate_username_alteration($userDetails->attributes['id'][0] . "_Via_Twitter", $userDetails->attributes['id'][0]);
            $uname = $userDetails->attributes['id'][0] . "_Via_Twitter";
          } else if (isset($userDetails->attributes['authenticationMethod']) && stripos($userDetails->attributes['authenticationMethod'], 'facebook') !== FALSE) {
            mitigate_username_alteration($userDetails->attributes['id'][0] . "_Via_Facebook", $userDetails->attributes['id'][0]);
            $userDetails->attributes['id'][0] = trim($userDetails->attributes['id'][0], '"');
            $uname = $userDetails->attributes['id'][0] . "_Via_Facebook";
          }
          $public_or_cdx = 'public';
        }
      } else {
        mitigate_username_alteration($username . "_Via_CDX", $username);
        $uname = $username . "_Via_CDX";
        $public_or_cdx = 'cdx';
      }
      if (variable_get('trusted_users_list_used') == 'Yes') {
        trusted_user_check($uname);
      }
      $ext_user = user_external_load($uname);
      if (!$ext_user) {
        user_external_login_register($uname, 'eenterprise_bridge_auth');
        if ($user) {
          if ($piv_card_position !== FALSE) {
            $org_pos = strrpos($userDetails->attributes['Organization'][0], ":");
            $org = substr($userDetails->attributes['Organization'][0], $org_pos + 1);
            $org_unit_pos = strrpos($userDetails->attributes['OrganizationUnit'][0], ":");
            $org_unit = substr($userDetails->attributes['OrganizationUnit'][0], $org_unit_pos + 1);
            $edit = array('field_piv_card_org' => array('und' => array(0 => array('value' => $org . " : " . $org_unit))));
            user_save($user, $edit);
          } else {
            user_save($user, array('mail' => trim($userDetails->attributes['email'][0], '"')));
          }
          //if user is public user
          if ($pos === FALSE && $openid_position === FALSE) {
            $user_role = user_role_load_by_name('Public User');
            user_multiple_role_edit(array($user->uid), 'add_role', $user_role->rid);
          } else {
            assign_roles_to_user($uname);
            $_SESSION['cdx_fmw_security_token'] = $userDetails->attributes['securityToken'][0];
            $_SESSION['userId'] = $userDetails->attributes['userId'][0];
            $_SESSION['login_timestamp'] = time();
          }
          $_SESSION['cdx_user_type'] = $public_or_cdx;
        }
      } else {
        //If user is already registered, and authenticated through EPA Bridge, skip registration and just log the user in.
        $user = $ext_user;
        $form_state['uid'] = $user->uid;

        user_login_submit(array(), $form_state);
        //To fix a bug where email address is not updated after users update their email address in CDX and login.
        user_save($user, array('mail' => trim($userDetails->attributes['email'][0], '"')));
        try {
          if ($public_or_cdx == 'cdx') {
            assign_roles_to_user($uname);
            $_SESSION['cdx_fmw_security_token'] = $userDetails->attributes['securityToken'][0];
            $_SESSION['userId'] = $userDetails->attributes['userId'][0];
            $_SESSION['login_timestamp'] = time();

          }
          $_SESSION['cdx_user_type'] = $public_or_cdx;

        } catch (Exception $e) {
          watchdog('eenterprise_bridge_auth', "Error 0004: General Exception, SESSION.", array(), WATCHDOG_ERROR);
        }
      }
    }
    if (!module_exists('eactivity_dataflow')) {
      create_progress_tracker($user);
    }
  }
  drupal_goto('workbench');
}

/**
 * Username appended with _Via_CDX, _Via_Facebook etc to qualify provider names and ensure username uniqueness.
 * @param $altered_username
 * Original username sent from an identity provider
 * @param $username
 */
function mitigate_username_alteration($altered_username, $username) {
  if (variable_get('cdx_usernames_mitigation') == 'Run Mitigation Code') {
    db_query("UPDATE {users} SET name = :uname1 WHERE name = :uname2", array(':uname1' => $altered_username, ':uname2' => $username));
    db_query("UPDATE {authmap} SET authname = :uname1 WHERE authname = :uname2", array(':uname1' => $altered_username, ':uname2' => $username));
    db_query("UPDATE {users} SET name = :uname1 WHERE name = :uname2", array(':uname1' => $altered_username, ':uname2' => $username . '@cdx'));
    db_query("UPDATE {authmap} SET authname = :uname1 WHERE authname = :uname2", array(':uname1' => $altered_username, ':uname2' => $username . '@cdx'));
    db_query("UPDATE {users} SET name = :uname1 WHERE name = :uname2", array(':uname1' => $altered_username, ':uname2' => $username . '@twitter.com'));
    db_query("UPDATE {authmap} SET authname = :uname1 WHERE authname = :uname2", array(':uname1' => $altered_username, ':uname2' => $username . '@twitter.com'));
    db_query("UPDATE {users} SET name = :uname1 WHERE name = :uname2", array(':uname1' => $altered_username, ':uname2' => $username . '@facebook.com'));
    db_query("UPDATE {authmap} SET authname = :uname1 WHERE authname = :uname2", array(':uname1' => $altered_username, ':uname2' => $username . '@facebook.com'));
  }
}

/*
 * Implement a function to filter users to deny authentication from a predefined list. The list maintained in
 * trusted_user content type.
 */
function trusted_user_check($uname) {
  $trusted_users = db_query("select nid, title from {node} where type = :node_type", array(":node_type" => "trusted_user"))->fetchAllKeyed();
  $uname = trim($uname, '"');     //gmail usernames are sent with quotes before and after the username.
  if (in_array(strtolower($uname), $trusted_users) || in_array(strtoupper($uname), $trusted_users))
    ;  //if user is trusted Do Nothing, authentication will resume.
  else {
    $_SESSION['trusted_login'] = 'NO';
    drupal_goto("/");
    return;
  }
}

function create_progress_tracker($user) {
  $wsdl = variable_get('eactivity_auth_reg_wsdl');
  $client = connectToSOAPServerWithWSDL($wsdl, "Eenterprise Bridge Auth");

  if ($client->error) {
    return;
  }

  $client = $client->client;
  $params1 = array(
    "userId" => variable_get('eactivity_auth_reg_username'),
    "credential" => variable_get('eactivity_auth_reg_password'),
    "domain" => variable_get('eactivity_auth_reg_domain'),
    "authenticationMethod" => variable_get('eactivity_auth_reg_auth_method'),
  );
  $response1 = callSOAPWithParams($client, "Authenticate", $params1, "Eenterprise Bridge Auth");

  if ($response1->error) {
    return;
  }

  $response1 = $response1->response;
  // Adding local wsdl configurations
  $local = variable_get('eactivity_dataflow_local');
  $wsdl = variable_get('eactivity_dataflow_wsdl');
  if ($local) {
    $client2 = connectToSOAPServerWithWSDL(dirname(__FILE__) . '/' . $wsdl, "Eenterprise Bridge Auth");
  } else {
    $client2 = connectToSOAPServerWithWSDL($wsdl, "Eenterprise Bridge Auth");
  }

  if ($client2->error) {
    return;
  }

  $client2 = $client2->client;

  //Extract out "_Via_CDX" string from $user->name to pull to-do and progress tracker from the Activity Data flow
  $cdx_username = $user->name;
  $cdx_pos = strrpos($cdx_username, "_Via_");
  if ($cdx_pos !== FALSE) {
    $cdx_username = substr($cdx_username, 0, $cdx_pos);
  }

  //For the following parameter, use $cdx_username, which does not have _Via_CDX at the end, instead of $user_name
  $params2 = array(
    "securityToken" => $response1->securityToken,
    "dataflow" => "E-ACTIVITY",
    "request" => "GetByUser",
    "rowId" => 0,
    "maxRows" => -1,
    "parameters" => array("_" => strtoupper($cdx_username), "parameterEncoding" => "None", "parameterName" => "user"),
  );
  $resp = callSOAPWithParams($client2, "Query", $params2, "Eenterprise Bridge Auth");

  if ($resp->error) {
    return;
  }

  $resp = $resp->response;
  $resp = $resp->results->any;
  $resp = simplexml_load_string($resp);
  foreach ($resp->children('http://www.exchangenetwork.net/schema/eact/1') as $activity) {

    $res = array("EActivityId" => (string)$activity->EActivityId,
      "PartnerSystemId" => (string)$activity->PartnerSystemId,
      "PartnerExternalId" => (string)$activity->PartnerExternalId,
      "PartnerSystemReportType" => (string)$activity->PartnerSystemReportType,
      "ActivityType" => (string)$activity->ActivityType,
      "ActivityDesc" => (string)$activity->ActivityDesc,
      "ActivityCreateDate" => (string)$activity->ActivityCreateDate,
      "ActivitySourceURL" => (string)$activity->ActivitySourceURL,
      "ActivityExpirationDate" => (string)$activity->ActivityExpirationDate,
      "Status" => (string)$activity->Status,
      "StatusNote" => (string)$activity->StatusNote,
      "StatusUpdateDate" => (string)$activity->StatusUpdateDate,
      "UserId" => (string)$activity->UserId,
      "RoleId" => (string)$activity->RoleId,
      "RoleIdSubject" => (string)$activity->RoleIdSubject,
      "Attributes" => (string)$activity->Attributes,);
    foreach ($activity->Attributes->Attribute as $child) {
      if ((string)($child->attributes()) == 'facilityName') {
        $res['FacilityName'] = $child->__toString();
      } else if ((string)($child->attributes()) == 'partCode') {
        $res['partCode'] = $child->__toString();
      } else if ((string)($child->attributes()) == 'partName') {
        $res['partName'] = $child->__toString();
      } else if ((string)($child->attributes()) == 'subPartCode') {
        $res['subPartCode'] = $child->__toString();
      } else if ((string)($child->attributes()) == 'subPartName') {
        $res['subPartName'] = $child->__toString();
      } else if ((string)($child->attributes()) == 'facilityRegistryIdentifier') {
        $res['facilityRegistryIdentifier'] = $child->__toString();
      }
    }
    $i = 0;
    foreach ($activity->Documents->Document as $child) {
      $res['Documents'][$i]['id'] = $child->Id->__toString();
      $res['Documents'][$i]['name'] = 'sites/default/files/' . $child->Name->__toString();
      $res['Documents'][$i]['typeId'] = $child->TypeId->__toString();
      $res['Documents'][$i]['size'] = $child->Size->__toString();
      $res['Documents'][$i]['createDate'] = $child->CreateDate->__toString();
      $res['Documents'][$i]['transactionId'] = $child->TransactionId->__toString();
      $i++;

      $param_attch_type = array("_" => $child->Id->__toString(),
        "contentType" => array($child->TypeId->__toString()));
      $param_doc_id = $child->Id->__toString();

      $param_doc = array(
        "documentName" => $child->Name->__toString(),
        "documentFormat" => array($child->TypeId->__toString()),
        "documentContent" => $param_attch_type,
        "documentId" => $param_doc_id,
      );

      $param_dl1 = array(
        "securityToken" => $response1->securityToken,
        "dataflow" => "E-ACTIVITY",
        "transactionId" => $child->TransactionId->__toString(),
        "documents" => $param_doc,
      );
      $resp_dl = callSOAPWithParams($client2, "Download", $param_dl1, "Eenterprise Bridge Auth");
      if (!$resp_dl->error) {
        $resp_dl = $resp_dl->response;
        $INPUT = $resp_dl->documents->documentContent->_;
        $file = 'sites/default/files/' . $child->Name->__toString();
        file_put_contents($file, $INPUT);
      }
    }
    create_progress_tracker_node($res, $user);
  }
}


function _update_progress_tracker_to_do_item($query_res, $res) {

  //For CEDRI to-do, if source url or expiration date is updated, update progress tracker item.
  if ($res['ActivityType'] == 'TASK' && $res['PartnerSystemId'] == 'cdx-cedri') {
    $db_exp_date = db_query("select field_todo_lst_due_value from {field_data_field_todo_lst_due} where entity_id = :nid", array(':nid' => $query_res['entity_id']))->fetchField();
    $res_exp_date = date("Y-m-d H:i:s", strtotime($res['ActivityExpirationDate']));

    $db_src_url = db_query("select field_todo_lst_activ_source_url_value from {field_data_field_todo_lst_activ_source_url} where entity_id = :nid", array(':nid' => $query_res['entity_id']))->fetchField();

    if ($db_exp_date != $res_exp_date || $db_src_url != $res['ActivitySourceURL']) {
      node_delete($query_res['entity_id']);
      return true;
    }
  }

  //For CEDRI progress tracker, if source url or expiration date is updated, update progress tracker item.
  if ($res['ActivityType'] == 'TRACKER' && $res['PartnerSystemId'] == 'cdx-cedri') {
    $db_exp_date = db_query("select field_prog_track_updated_value from {field_data_field_prog_track_updated} where entity_id = :nid", array(':nid' => $query_res['entity_id']))->fetchField();
    $res_exp_date = date("Y-m-d H:i:s", strtotime($res['ActivityExpirationDate']));

    $db_src_url = db_query("select field_prog_track_actions_link_value from {field_data_field_prog_track_actions_link} where entity_id = :nid", array(':nid' => $query_res['entity_id']))->fetchField();

    if ($db_exp_date != $res_exp_date || $db_src_url != $res['ActivitySourceURL']) {
      node_delete($query_res['entity_id']);
      return true;
    }
  }

  //For Lead progress tracker, if status note is updated, update progress tracker item.
  if ($res['ActivityType'] == 'TRACKER' && $res['PartnerSystemId'] == 'cdx-lead') {
    $db_status_note = db_query("select field_prog_track_status_note_value from {field_data_field_prog_track_status_note} where entity_id = :nid", array(':nid' => $query_res['entity_id']))->fetchField();

    if ($db_status_note != $res['StatusNote']) {
      node_delete($query_res['entity_id']);
      return true;
    }
  }

  $res_title = db_query("select title from {node} where nid = :nid", array(':nid' => $query_res['entity_id']))->fetchField();
  $res_status = db_query("select field_prog_track_status_value from {field_data_field_prog_track_status} where entity_id = :nid", array(':nid' => $query_res['entity_id']))->fetchField();

  $cdx_status = ($res['Status'] == 'IN_PROGRESS') ? 'In Progress' : ucwords(strtolower($res['Status']));

  //If description field is updated...
  if ($res_title != $res['ActivityDesc']) {
    node_delete($query_res['entity_id']);
    return true;
  } //if status field is updated...
  else if (!empty($res_status) && ($res_status != $cdx_status)) {
    node_delete($query_res['entity_id']);
    return true;
  }
  return false;
}


function create_progress_tracker_node($res, $user) {
  $query_res = db_query("select entity_id, revision_id from {field_data_field_eactivity_id} where bundle in (:node_type) and field_eactivity_id_value = :eactivityid", array(':node_type' => array('progress_tracker', 'to_do_list'), ':eactivityid' => $res['EActivityId']))->fetchAssoc();
  //_update_progress_tracker_to_do_item will check if to-do or progress tracker item is updated and updates them accordingly.
  $node_deleted = _update_progress_tracker_to_do_item($query_res, $res);

  //86,400 is number of seconds in 24 hours, extend expiration date by 24 hours.
  $expiration_date = strtotime($res['ActivityExpirationDate']) + 86400;
  $curr_date = strtotime(date("Y-m-d H:i:s"));
  //do not create a node if its expiration date is already passed
  if (($query_res['entity_id'] < 1 || $node_deleted) && ($expiration_date - $curr_date) > 0) {
    $node = new stdClass();
    $node->title = $res['ActivityDesc'];
    if ($res['ActivityType'] == 'TRACKER') {
      $node->type = "progress_tracker";

      $node->field_eactivity_id['und'][0]['value'] = $res['EActivityId'];
      $node->field_eactivity_id['und'][0]['format'] = null;
      $node->field_eactivity_id['und'][0]['safe_value'] = $res['EActivityId'];

      $node->field_prog_tracker_app['und'][0]['value'] = $res['ActivityDesc'];
      $node->field_prog_tracker_app['und'][0]['format'] = null;
      $node->field_prog_tracker_app['und'][0]['safe_value'] = $res['ActivityDesc'];

      $res_status = ($res['Status'] == 'IN_PROGRESS') ? 'In Progress' : ucwords(strtolower($res['Status']));

      $node->field_prog_track_status['und'][0]['value'] = $res_status;
      $node->field_prog_track_status['und'][0]['format'] = null;
      $node->field_prog_track_status['und'][0]['safe_value'] = $res_status;

      $res_domain = $res['PartnerSystemId'];
      if (strpos($res['PartnerSystemId'], 'lead') !== false) {
        $res_domain = "Lead";
      } else if (strpos($res['PartnerSystemId'], 'cedri') !== false) {
        $res_domain = "CEDRI";
      }
      $node->field_prog_track_domain['und'][0]['value'] = $res_domain;
      $node->field_prog_track_domain['und'][0]['format'] = null;
      $node->field_prog_track_domain['und'][0]['safe_value'] = $res_domain;

      if ($res_domain == 'Lead') {
        $st_update = date("Y-m-d H:i:s", strtotime($res['StatusUpdateDate']));
        $node->field_prog_track_updated['und'][0]['value'] = $st_update;
        $node->field_prog_track_updated['und'][0]['format'] = null;
        $node->field_prog_track_updated['und'][0]['safe_value'] = $st_update;
        //if ($res['Status'] != 'INCOMPLETE') {
        $node->field_prog_track_status_note['und'][0]['value'] = $res['StatusNote'];
        $node->field_prog_track_status_note['und'][0]['format'] = null;
        $node->field_prog_track_status_note['und'][0]['safe_value'] = $res['StatusNote'];
        //}
      } else if ($res_domain == 'CEDRI') {
        $exp_date = date("Y-m-d H:i:s", strtotime($res['ActivityExpirationDate']));
        $node->field_prog_track_updated['und'][0]['value'] = $exp_date;
        $node->field_prog_track_updated['und'][0]['format'] = null;
        $node->field_prog_track_updated['und'][0]['safe_value'] = $exp_date;
      }
      $res_action = '';
      if ($res_domain == 'Lead') {
        foreach ($res['Documents'] as $ky => $vl) {
          if (strpos($vl['name'], 'Receipt') !== false) {
            $res_action .= "<a href='/" . $vl['name'] . "' target='_blank'>View Receipt</a>";
          }
          if (strpos($vl['name'], 'Certificate') !== false) {
            $res_action .= "<a href='/" . $vl['name'] . "' target='_blank'>View Certificate</a>";
          }
          if (strpos($vl['name'], 'Logo') !== false) {
            $res_action .= "<a href='/" . $vl['name'] . "' target='_blank'>View Logo</a>";
          }
        }
        if (empty($res_action)) {
          $res_action = "N/A";
        }
      } else if ($res['Status'] == 'Under Review' || $res_domain == 'CEDRI') {
        $res_action .= "<a href='/cdx_sso_handoff?handoff_data=" . parse_cdx_handoff_data($res['ActivitySourceURL']) . "' target='_blank'>View Submission</a>";
      }

      $node->field_prog_track_actions_dnload['und'][0]['value'] = $res_action;
      $node->field_prog_track_actions_dnload['und'][0]['format'] = 'full_html';
      $node->field_prog_track_actions_dnload['und'][0]['safe_value'] = $res_action;

      $node->field_prog_track_created_by['und'][0]['value'] = $user->uid;
      $node->field_prog_track_created_by['und'][0]['format'] = null;
      $node->field_prog_track_created_by['und'][0]['safe_value'] = $user->uid;

      if ($res_domain == "Lead") {
        $node->field_prog_track_date_type['und'][0]['value'] = 'Status Changed Date';
        $node->field_prog_track_date_type['und'][0]['format'] = null;
        $node->field_prog_track_date_type['und'][0]['safe_value'] = 'Status Changed Date';
      } else if ($res_domain == "CEDRI") {
        $node->field_prog_track_date_type['und'][0]['value'] = 'Publish Date';
        $node->field_prog_track_date_type['und'][0]['format'] = null;
        $node->field_prog_track_date_type['und'][0]['safe_value'] = 'Publish Date';

        $node->field_prog_track_facility_name['und'][0]['value'] = $res['FacilityName'];
        $node->field_prog_track_facility_name['und'][0]['format'] = null;
        $node->field_prog_track_facility_name['und'][0]['safe_value'] = $res['FacilityName'];

        $node->field_prog_track_part_code['und'][0]['value'] = $res['partCode'];
        $node->field_prog_track_part_code['und'][0]['format'] = null;
        $node->field_prog_track_part_code['und'][0]['safe_value'] = $res['partCode'];

        $node->field_prog_track_part_name['und'][0]['value'] = $res['partName'];
        $node->field_prog_track_part_name['und'][0]['format'] = null;
        $node->field_prog_track_part_name['und'][0]['safe_value'] = $res['partName'];

        $node->field_prog_track_sub_part_code['und'][0]['value'] = $res['subPartCode'];
        $node->field_prog_track_sub_part_code['und'][0]['format'] = null;
        $node->field_prog_track_sub_part_code['und'][0]['safe_value'] = $res['subPartCode'];

        $node->field_prog_track_sub_part_name['und'][0]['value'] = $res['subPartName'];
        $node->field_prog_track_sub_part_name['und'][0]['format'] = null;
        $node->field_prog_track_sub_part_name['und'][0]['safe_value'] = $res['subPartName'];

        $node->field_prog_track_facility_reg_id['und'][0]['value'] = $res['facilityRegistryIdentifier'];
        $node->field_prog_track_facility_reg_id['und'][0]['format'] = null;
        $node->field_prog_track_facility_reg_id['und'][0]['safe_value'] = $res['facilityRegistryIdentifier'];
      }
    } else if ($res['ActivityType'] == 'TASK') {
      $node->type = "to_do_list";

      $node->field_eactivity_id['und'][0]['value'] = $res['EActivityId'];
      $node->field_eactivity_id['und'][0]['format'] = null;
      $node->field_eactivity_id['und'][0]['safe_value'] = $res['EActivityId'];

      $node->field_todo_lst_item['und'][0]['value'] = $res['ActivityDesc'];
      $node->field_todo_lst_item['und'][0]['format'] = null;
      $node->field_todo_lst_item['und'][0]['safe_value'] = $res['ActivityDesc'];

      $res_domain = $res['PartnerSystemId'];
      if (strpos($res['PartnerSystemId'], 'lead') !== false) {
        $res_domain = "Lead";
      }
      if (strpos($res['PartnerSystemId'], 'cedri') !== false) {
        $res_domain = "CEDRI";
      }
      $node->field_todo_lst_domain['und'][0]['value'] = $res_domain;
      $node->field_todo_lst_domain['und'][0]['format'] = null;
      $node->field_todo_lst_domain['und'][0]['safe_value'] = $res_domain;

      $st_due = date("Y-m-d H:i:s", strtotime($res['ActivityExpirationDate']));
      $node->field_todo_lst_due['und'][0]['value'] = $st_due;
      $node->field_todo_lst_due['und'][0]['format'] = null;
      $node->field_todo_lst_due['und'][0]['safe_value'] = $st_due;

      $node->field_todo_lst_facility_name['und'][0]['value'] = $res['FacilityName'];
      $node->field_todo_lst_facility_name['und'][0]['format'] = null;
      $node->field_todo_lst_facility_name['und'][0]['safe_value'] = $res['FacilityName'];

      $node->field_todo_lst_part_code['und'][0]['value'] = $res['partCode'];
      $node->field_todo_lst_part_code['und'][0]['format'] = null;
      $node->field_todo_lst_part_code['und'][0]['safe_value'] = $res['partCode'];

      $node->field_todo_lst_part_name['und'][0]['value'] = $res['partName'];
      $node->field_todo_lst_part_name['und'][0]['format'] = null;
      $node->field_todo_lst_part_name['und'][0]['safe_value'] = $res['partName'];

      $node->field_todo_lst_sub_part_code['und'][0]['value'] = $res['subPartCode'];
      $node->field_todo_lst_sub_part_code['und'][0]['format'] = null;
      $node->field_todo_lst_sub_part_code['und'][0]['safe_value'] = $res['subPartCode'];

      $node->field_todo_lst_sub_part_name['und'][0]['value'] = $res['subPartName'];
      $node->field_todo_lst_sub_part_name['und'][0]['format'] = null;
      $node->field_todo_lst_sub_part_name['und'][0]['safe_value'] = $res['subPartName'];

      $node->field_todo_lst_facility_reg_id['und'][0]['value'] = $res['facilityRegistryIdentifier'];
      $node->field_todo_lst_facility_reg_id['und'][0]['format'] = null;
      $node->field_todo_lst_facility_reg_id['und'][0]['safe_value'] = $res['facilityRegistryIdentifier'];

      $node->field_todo_lst_activ_source_url['und'][0]['value'] = "/cdx_sso_handoff?handoff_data=" . parse_cdx_handoff_data($res['ActivitySourceURL']);
      $node->field_todo_lst_activ_source_url['und'][0]['format'] = null;
      $node->field_todo_lst_activ_source_url['und'][0]['safe_value'] = "/cdx_sso_handoff?url=" . parse_cdx_handoff_data($res['ActivitySourceURL']);

      $node->field_todo_lst_created_by['und'][0]['value'] = $user->uid;
      $node->field_todo_lst_created_by['und'][0]['format'] = null;
      $node->field_todo_lst_created_by['und'][0]['safe_value'] = $user->uid;
    }

    node_object_prepare($node);
    $node->language = LANGUAGE_NONE;
    $node->uid = $user->uid;
    $node->status = 1;


    $node = node_submit($node); // Prepare node for saving

    node_save($node);

  } //If the item is already existing, implement logic to drop this item 6 months after the last status update date.

  //86,400 is number of seconds in 24 hours, extend expiration date by 24 hours.
  $expiration_date = strtotime($res['ActivityExpirationDate']) + 86400;
  $curr_date = strtotime(date("Y-m-d H:i:s"));
  if (($expiration_date - $curr_date) <= 0) {
    db_query("UPDATE {node} SET status = 0 WHERE nid =:nid", array(':nid' => $query_res['entity_id']));
    db_query("UPDATE {node_revision} SET status = 0 WHERE nid =:nid AND  vid =:vid", array(':nid' => $query_res['entity_id'], ':vid' => $query_res['revision_id']));
  }

}

function assign_roles_to_user($user_name) {
  $wsdl = variable_get('eactivity_auth_reg_wsdl');
  $client = connectToSOAPServerWithWSDL($wsdl, "Eenterprise Bridge Auth");
  $user_role_error = TRUE;
  global $user;
  if ($client->error) {
    makeUserPublicUser($user);
    return;
  }

  $client = $client->client;
  $params1 = array(
    "userId" => variable_get('eactivity_auth_reg_username'),
    "credential" => variable_get('eactivity_auth_reg_password'),
    "domain" => variable_get('eactivity_auth_reg_domain'),
    "authenticationMethod" => variable_get('eactivity_auth_reg_auth_method'),
  );
  $response1 = callSOAPWithParams($client, "Authenticate", $params1, "Eenterprise Bridge Auth");
  if ($response1->error) {
    makeUserPublicUser($user);
    return;
  }
  $response1 = $response1->response;

  //Extract out "_Via_CDX" string from user_name to pull roles from the Activity Data flow
  $cdx_username = $user_name;
  $cdx_pos = strrpos($cdx_username, "_Via_");
  if ($cdx_pos !== FALSE) {
    $cdx_username = substr($cdx_username, 0, $cdx_pos);
  }
  //For the following parameter, use $cdx_username, which does not have _Via_CDX at the end, instead of $user_name
  $params2 = array(
    "securityToken" => $response1->securityToken,
    "userId" => $cdx_username,
  );

  $user_obj = callSOAPWithParams($client, "RetrieveUser", $params2, "Eenterprise Bridge Auth");
  if ($user_obj->error) {
    makeUserPublicUser($user);
    return;
  }

  $user_obj = $user_obj->response;
  $user_sec_bundle = array(
    "securityToken" => $response1->securityToken,
    "user" => $user_obj->User,
  );

  $org_val = null;
  $user_orgs = callSOAPWithParams($client, "RetrieveOrganizations", $user_sec_bundle, "Eenterprise Bridge Auth");
  if ($user_orgs->error) {
    makeUserPublicUser($user);
    return;
  }
  $user_orgs = $user_orgs->response;
  if (is_array($user_orgs->Organization)) {
    $org_val = $user_orgs->Organization[0];
  } else {
    $org_val = $user_orgs->Organization;
  }
  $user_sec_org_bundle = array(
    "securityToken" => $response1->securityToken,
    "user" => $user_obj->User,
    "org" => $org_val,
  );
  $user_roles = callSOAPWithParams($client, "RetrieveRoles", $user_sec_org_bundle, "Eenterprise Bridge Auth");
  if ($user_roles->error) {
    makeUserPublicUser($user);
    return;
  }
  $user_roles = $user_roles->response;
  $eactivity_role = FALSE;
  if (!is_array($user_roles->Role)) {
    $user_roles->Role = array($user_roles->Role);
  }
  $user_naics = array();
  foreach ($user_roles->Role as $k => $v) {
    $role_val = $v->type->description;
    if ($role_val !== "Public") {
      $eactivity_role = TRUE;
    }
    //Make sure a role that is assigned to a CDX role is not a Drupal admin role, the second case.
    if (!empty($role_val) && $role_val != variable_get('current_admin_role')) {
      $user_role = user_role_load_by_name($role_val);
      if ($user_role === FALSE) {
        $user_role = new stdClass();
        $user_role->name = $role_val;
        user_role_save($user_role);
      }
      user_multiple_role_edit(array($user->uid), 'add_role', $user_role->rid);
      allow_user_menu_access($user_role->rid);
      //Allow favorites view and app connect view access to all CDX users.
      view_allow_access_role('favorite_sites', $user_role->rid);
      view_allow_access_role('app_connect_new', $user_role->rid);

      //Get any NAIC codes based on the user_role_id
      module_load_include('inc', 'feature_toggle', 'includes/feature_toggle.api');
      if (feature_toggle_get_status('profile_enable_cdx_naics')) {
        $naics_dataflows = strtolower(variable_get('naics_dataflows'));
        $naics_dataflows_array = explode(',', $naics_dataflows);
        if (in_array(strtolower($v->dataflow), $naics_dataflows_array)) {
          if (!isset($facclient)) {
            $facwsdl = variable_get('cdx_program_facility_endpoint');//'http://testngn.epacdxnode.net/cdx-register-II/services/RegisterProgramFacilityService?wsdl';
            $facclient = connectToSOAPServerWithWSDL($facwsdl, "Eenterprise Bridge Auth");
            if ($facclient->error) {
              return;
            }
            $facclient = $facclient->client;
          }
          $paramsfac = array(
            "securityToken" => $response1->securityToken,
            "userRoleId" => $v->userRoleId,
          );
          $user_facs = callSOAPWithParams($facclient, "RetrieveFacilitiesByUserRoleId", $paramsfac, "Eenterprise Bridge Auth");
          if ($user_facs->error) {
            return;
          }
          $user_facs = $user_facs->response;
          if (!is_array($user_facs->ProgramFacility)) {
            $user_facs->ProgramFacility = array($user_roles->ProgramFacility);
          }
          foreach ($user_facs->ProgramFacility as $k2 => $v2) {
            foreach ($v2->NaicsCodes->NaicsCode as $k3 => $v3) {
              $endpoint = variable_get('naics_getbycode_endpoint');
              $endpoint = $endpoint . urlencode($v3->CdxNaicsCodeValue);
              $response = drupal_http_request($endpoint, [
                //"headers" => $headers,
                "method" => "GET",
                'timeout' => "10"
              ]);
              if ($response->code !== "200") {
                $return['error'] = TRUE;
                $return['error-messages'][] = ['code' => $response->code, 'error' => 'NAICS endpoint response: ' . $response->error];
                $naics_description = 'Unable to retrieve NAICS description.';
              } else {
                $response_array = xmlstr_to_array($response->data);
                $base = $response_array['Results']['NAICS']['Code'];
                $naics_description = $base['NAICSNameText'];
              }
              $user_naics[$v3->CdxNaicsCodeValue] = $naics_description;
            }
          }
          $user_naics = array_unique($user_naics);
        }
      }
    }
  }
  update_cdx_naics_profile($user_naics);
  if ($eactivity_role) {
    // Allow access to cdx facility manager, progress tracker, and to do
    if ($user_eactivity_role = user_role_load_by_name("eactivity-dataflows")) {
      // Give user eactivity role
      user_multiple_role_edit(array($user->uid), "add_role", $user_eactivity_role->rid);
    }
  }
}


function makeUserPublicUser($user) {
  $role_val = 'Public';
  $user_role = user_role_load_by_name($role_val);
  if ($user_role === FALSE) {
    $user_role = new stdClass();
    $user_role->name = $role_val;
    user_role_save($user_role);
  }
  user_multiple_role_edit(array($user->uid), 'add_role', $user_role->rid);
  allow_user_menu_access($user_role->rid);
  //Allow favorites view access to all CDX users.
  view_allow_access_role('favorite_sites', $user_role->rid);
  watchdog('eenterprise_bridge_auth', "Error 0003: Cannot retrieve role information", array(), WATCHDOG_ERROR);
}

/*
 * function that allow roles access to the user-menu block. That is the block containing My Account and Log out links.
 */

function allow_user_menu_access($role_id) {
  $query = db_merge('block_role')->key(array('rid' => $role_id, 'module' => 'system', 'delta' => 'user-menu'));
  $query->execute();
  cache_clear_all();
}

function eenterprise_bridge_auth_logout() {
  if (isset($_SESSION['cdx_fmw_security_token'])) {
    $_SESSION['cdx_fmw_security_token'] = '';
  }
  if (isset($_SESSION['userId'])) {
    $_SESSION['userId'] = '';
  }
  $wreply = variable_get('eenterprise_bridge_auth_realm') . '/user/logout?bridge=1';
  if ($_SESSION['is_timeout']) {
    $wreply = variable_get('eenterprise_bridge_auth_realm') . '/user/logout?timeout=1';
  }
  global $user;
  if (isset($_SESSION['form_origin_btn']) && $_SESSION['form_origin_btn'] == 'Delete profile') {
    unset($_SESSION['form_origin_btn']);
    user_delete($user->uid);
    session_destroy();
    $wreply = variable_get('eenterprise_bridge_auth_realm') . '/eenterprise-new?bridge=1';
  }

  $logout = variable_get('eenterprise_bridge_auth_issuer') . '?wa=wsignout1.0&wreply=' . urlencode($wreply);
  header("Location:$logout");
}

function refresh_todo_list() {
  global $user;
  $query_res = db_query("select nid from {node} where type in (:node_type) and uid = :uid", array(':node_type' => array('progress_tracker', 'to_do_list'), ':uid' => $user->uid))->fetchAll(PDO::FETCH_ASSOC);
  foreach ($query_res as $key => $value) {
    node_delete($value['nid']);
  }
  create_progress_tracker($user);
  if (module_exists('eactivity_dataflow')) {
    if (!isset($_SESSION['todo_refresh_count'])) {
      $_SESSION['todo_refresh_count'] = 0;
    }
    $_SESSION['todo_refresh_count']++;
    drupal_json_output(array(
      'status' => TRUE,
    ));
  } else {
    drupal_goto('/workbench');
  }
}


function eenterprise_bridge_auth_redirect() {
  $idParams = array('wa' => 'wsignin1.0',
    'wtrealm' => variable_get('eenterprise_bridge_auth_realm'),
    'wctx' => 'rm=0',
    'wreply' => variable_get('eenterprise_bridge_auth_reply'),
    'whr' => $_GET['whr'],
  );

  //Builds URL for handing off the Open ID Bridge
  $idBridgeUrl = variable_get('eenterprise_bridge_auth_issuer') . "?" . http_build_query($idParams);

  header("Location:$idBridgeUrl");
}

/*
 * Function to allow a new user with CDX role get access to progress tracker and to-do views
 * automatically.
 */
function view_allow_access_role($view_name, $role_id) {
  $result_view = views_get_view($view_name);
  if ($result_view && $result_view->access($view_name)) {
    $result_view->set_display('default');
    $result_view->display_handler->display->display_options['access']['role'][$role_id] = $role_id;
    $result_view->save();
  }
}

function update_cdx_naics_profile($profile) {
  $response = [
    'error' => false,
    'error-messages' => [],
    'data' => null,
  ];

  if (isset($profile)) {

    global $user;
    //$existing = user_load($user->uid);
    $existing = user_load($user->uid);
    $response['data'] = ['profile' => $profile];

    $edit = [];
    if (!is_string($profile)) {
      $profile = json_encode($profile);
    }
    $edit['field_cdx_naics_settings']['und'][0]['value'] = $profile;

    // save existing user

    if (!user_save($existing, $edit)) {
      $response['error'] = true;
      $response['error-messages'][] = 'There was a problem while trying to save';
    }
  } else {
    $response['error'] = true;
    $response['error-messages'][] = 'Missing profile value in the post data';
  }
  echo json_encode($response);
}