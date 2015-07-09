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
  $identity_providers = [array('Name' => 'Login')];
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
  }
  else {
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
      $idParams = array('wa'=>'wsignin1.0',
                        'wtrealm'=>variable_get('eenterprise_bridge_auth_realm'),
                        'wctx'=>'rm=0',
                        'wreply'=>variable_get('eenterprise_bridge_auth_reply'));

      //Builds URL for handing off the Open ID Bridge
      $idBridgeUrl = variable_get('eenterprise_bridge_auth_issuer')."?".http_build_query($idParams)."\n";

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
    if(!isset($_POST['wa']))
        drupal_set_message("Expected context parameter is not set", "error");
    else if($_POST['wa'] == 'wsignin1.0') {
        $adfs = new AdfsBridge();
        try{
            $userDetails = $adfs->getAdfsSignInResponse(AdfsConf::getInstance(), $_POST['wa'], $_POST['wresult'], $_POST['wctx']);
        }
        catch (Exception $e) {
            $msg = 'Message: '.$e->getMessage();
            drupal_set_message($msg, "error");
            watchdog('eenterprise_bridge_auth', $msg, array(), WATCHDOG_ERROR);
        }
        global $user;
        if($user->uid == 0){
            //Get user mapping and attempt to login user.
            $pos = strpos($userDetails->attributes['name'][0], "NAASOpenId");
            $username_raw = explode('/',$userDetails->attributes['name'][0]);
            $username = end($username_raw);
            $uname = "";
            //If user is a public user, Yahoo, google etc, use email as username, otherwise, use username as username
            if($pos === FALSE || $username === FALSE)
                $uname = $userDetails->attributes['email'][0];
            else{
                $uname = $username;
            }
            $ext_user = user_external_load($uname);
            if(!$ext_user){
                //user_external_login_register($userDetails->attributes['email'][0], 'eenterprise_bridge_auth');
                user_external_login_register($uname, 'eenterprise_bridge_auth');
                if($user){
                    user_save($user, array('mail' => $userDetails->attributes['email'][0]));
                    //if user is public user
                    if($pos === FALSE){
                        $user_role = user_role_load_by_name('Public User');
                        user_multiple_role_edit(array($user->uid), 'add_role', $user_role->rid);
                    }
                    else
                        assign_roles_to_user($uname);
                }
            }
            else{
                //If user is already registered, and authenticated through EPA Bridge, skip registration and just log the user in.
                $user = $ext_user;
                $form_state['uid'] = $user->uid;
                user_login_submit(array(), $form_state);
                //To fix a bug where email address is not updated after users update their email address in CDX and login.
                user_save($user, array('mail' => $userDetails->attributes['email'][0]));
            }
        }
        create_progress_tracker($user);
    }
    drupal_goto('workbench');
}


function create_progress_tracker($user){
    try {
        $client = new SoapClient("https://testngn.epacdxnode.net/cdx-register-II/services/RegisterService?wsdl", array('soap_version' => SOAP_1_2));
    } catch(SoapFault $f) {
        drupal_set_message('Cannot connect to Registration Service.', 'error');
        watchdog('eenterprise_bridge_auth',"Error: Cannot connect to CDX RegisterService.", array(), WATCHDOG_ERROR);
        return;
    }
    $params1 = array(
        "userId" => "registration.test@cgifederal.com",
        "credential" => "Testregistration1",
        "domain" => "default",
        "authenticationMethod" => "password",
    );
    $response1 = null;
    try {
        $response1 = $client->__soapCall("Authenticate", array($params1));
    } catch(SoapFault $f) {
        drupal_set_message('Cannot Authenticate to get data flow.', 'error');
        watchdog('eenterprise_bridge_auth',"Error: Cannot Authenticate to get data flow.", array(), WATCHDOG_ERROR);
        return;
    }
    $client2 = new SoapClient("http://devngn.epacdxnode.net/ngn-enws20/services/NetworkNode2ServiceConditionalMTOM?wsdl", array('soap_version'   => SOAP_1_2));
    $params2 = array(
        "securityToken" => $response1->securityToken,
        "dataflow" => "E-ACTIVITY",
        "request" => "GetByUser",
        "rowId" => 0,
        "maxRows" => -1,
        "parameters" => array("_" => strtoupper($user->name), "parameterEncoding"=>"None", "parameterName"=>"user"),
    );
    try{
        $resp = $client2->__soapCall("Query",array($params2));
        $resp = $resp->results->any;
        $resp = simplexml_load_string($resp);
        foreach($resp->children('http://www.exchangenetwork.net/schema/eact/1') as $activity)
        {
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
                "RoleIdSubject " => (string)$activity->RoleIdSubject ,
                "Attributes " => (string)$activity->Attributes ,
                "Documents " => (string)$activity->Documents ,);
            create_progress_tracker_node($res, $user);
        }
    }
    catch(SoapFault $f){
        drupal_set_message('Cannot query.', 'error');
        watchdog('eenterprise_bridge_auth',"Error: Cannot query.", array(), WATCHDOG_ERROR);
        return;
    }
}


function _update_progress_tracker_to_do_item($query_res, $res){
    $res_title = db_query("select title from {node} where nid = :nid", array(':nid' => $query_res['entity_id']))->fetchField();
    $res_status = db_query("select field_prog_track_status_value from {field_data_field_prog_track_status} where entity_id = :nid",  array(':nid' => $query_res['entity_id']))->fetchField();
    //If description field is updated...
    if($res_title != $res['ActivityDesc']){
        node_delete($query_res['entity_id']);
        return true;
    }
    //if status field is updated...
    else if($res_status != $res['Status']){
        node_delete($query_res['entity_id']);
        return true;
    }
    return false;
}

function create_progress_tracker_node($res, $user){
    $query_res = db_query("select entity_id, revision_id from {field_data_field_eactivity_id} where bundle in (:node_type) and field_eactivity_id_value = :eactivityid", array(':node_type' => array('progress_tracker', 'to_do_list'), ':eactivityid' =>  $res['EActivityId']))->fetchAssoc();
    //_update_progress_tracker_to_do_item will check if to-do or progress tracker item is updated and updates them accordingly.
    $node_deleted = _update_progress_tracker_to_do_item($query_res, $res);
    if($query_res['entity_id'] < 1 || $node_deleted) {
        //TODO: do not create a node if its expiration date is already passed
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

            $node->field_prog_track_status['und'][0]['value'] = $res['Status'];
            $node->field_prog_track_status['und'][0]['format'] = null;
            $node->field_prog_track_status['und'][0]['safe_value'] = $res['Status'];

            $st_update = date("Y-m-d H:i:s", strtotime($res['StatusUpdateDate']));
            $node->field_prog_track_updated['und'][0]['value'] = $st_update;
            $node->field_prog_track_updated['und'][0]['format'] = null;
            $node->field_prog_track_updated['und'][0]['safe_value'] = $st_update;

            $res_domain = $res['PartnerSystemId'];
            if (strpos($res['PartnerSystemId'], 'lead') !== false)
                $res_domain = "Lead";
            else if (strpos($res['PartnerSystemId'], 'cedri') !== false)
                $res_domain = "Cedri";
            $node->field_prog_track_domain['und'][0]['value'] = $res_domain;
            $node->field_prog_track_domain['und'][0]['format'] = null;
            $node->field_prog_track_domain['und'][0]['safe_value'] = $res_domain;


            $res_action = '';
            if ($res_domain == 'Lead')
                if ($res['Status'] == 'APPROVED')
                    $res_action = "Print Receipt Print Certification";
                else
                    $res_action = 'Print Receipt';
            else if ($res['Status'] == 'Under Review' || $res_domain == 'Cedri')
                $res_action = 'View Submission';

            $node->field_prog_track_actions['und'][0]['value'] = $res_action;
            $node->field_prog_track_actions['und'][0]['format'] = null;
            $node->field_prog_track_actions['und'][0]['safe_value'] = $res_action;

            $node->field_prog_track_actions_link['und'][0]['value'] = 'http://ec2-52-4-39-127.compute-1.amazonaws.com/workbench';
            $node->field_prog_track_actions_link['und'][0]['title'] = $res_action;


            $node->field_prog_track_created_by['und'][0]['value'] = $user->uid;
            $node->field_prog_track_created_by['und'][0]['format'] = null;
            $node->field_prog_track_created_by['und'][0]['safe_value'] = $user->uid;

            if($res_domain = "Lead") {
                $node->field_prog_track_date_type['und'][0]['value'] = 'Status Changed Date';
                $node->field_prog_track_date_type['und'][0]['format'] = null;
                $node->field_prog_track_date_type['und'][0]['safe_value'] = 'Status Changed Date';
            }
            else if($res_domain = "Cedri"){
                $node->field_prog_track_date_type['und'][0]['value'] = 'Publish Date';
                $node->field_prog_track_date_type['und'][0]['format'] = null;
                $node->field_prog_track_date_type['und'][0]['safe_value'] = 'Publish Date';
            }
        }
        else if($res['ActivityType'] == 'TASK') {
            $node->type = "to_do_list";

            $node->field_eactivity_id['und'][0]['value'] = $res['EActivityId'];
            $node->field_eactivity_id['und'][0]['format'] = null;
            $node->field_eactivity_id['und'][0]['safe_value'] = $res['EActivityId'];

            $node->field_todo_lst_item['und'][0]['value'] = $res['ActivityDesc'];
            $node->field_todo_lst_item['und'][0]['format'] = null;
            $node->field_todo_lst_item['und'][0]['safe_value'] = $res['ActivityDesc'];

            $res_domain = $res['PartnerSystemId'];
            if (strpos($res['PartnerSystemId'], 'lead') !== false)
                $res_domain = "Lead";
            if (strpos($res['PartnerSystemId'], 'cedri') !== false)
                $res_domain = "Cedri";
            $node->field_todo_lst_domain['und'][0]['value'] = $res_domain;
            $node->field_todo_lst_domain['und'][0]['format'] = null;
            $node->field_todo_lst_domain['und'][0]['safe_value'] = $res_domain;

            $st_due = date("Y-m-d H:i:s", strtotime($res['ActivityExpirationDate']));
            $node->field_todo_lst_due['und'][0]['value'] = $st_due;
            $node->field_todo_lst_due['und'][0]['format'] = null;
            $node->field_todo_lst_due['und'][0]['safe_value'] = $st_due;

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
    }
    //If the item is already existing, implement logic to drop this item 6 months after the last status update date.
    else if(true){
        $expiration_date = strtotime($res['ActivityExpirationDate']);
        $curr_date =  strtotime(date("Y-m-d H:i:s"));
        if(($expiration_date - $curr_date) <= 0){
            db_query("UPDATE {node} SET status = '0' WHERE nid =:nid ;", array(':nid' => $query_res['entity_id']));
            db_query("UPDATE {node_revision} SET status = '0' WHERE nid =:nid AND  vid =:vid;", array(':nid' => $query_res['nid'],':vid' => $query_res['revision_id']));
        }
    }
}


function assign_roles_to_user($user_name){
    try {
        $client = new SoapClient("https://testngn.epacdxnode.net/cdx-register-II/services/RegisterService?wsdl", array('soap_version' => SOAP_1_2));
    } catch(SoapFault $f) {
        drupal_set_message('Cannot connect to Registration Service. Role cannot be assigned to this user. please try again later.', 'error');
        watchdog('eenterprise_bridge_auth',"Error: Cannot connect to CDX RegisterService. Role cannot be assigned to this user", array(), WATCHDOG_ERROR);
        return;
    }
    $params1 = array(
        "userId" => "registration.test@cgifederal.com",
        "credential" => "Testregistration1",
        "domain" => "default",
        "authenticationMethod" => "password",
    );
    try {
        //Authenticate to CDX
        $response1 = $client->__soapCall("Authenticate", array($params1));
    } catch(SoapFault $f) {
        watchdog('eenterprise_bridge_auth',"Error: Cannot authenticate user to retrieve role information", array(), WATCHDOG_ERROR);
    }
    $params2 = array(
        "securityToken" => $response1->securityToken,
        "userId" => $user_name
    );
    try {
        $user_obj = $client->__soapCall("RetrieveUser", array($params2));
        $user_sec_bundle = array(
            "securityToken" => $response1->securityToken,
            "user" => $user_obj->User,
        );

        $user_orgs = $client->__soapCall("RetrieveOrganizations", array($user_sec_bundle));
        $user_sec_org_bundle = array(
            "securityToken" => $response1->securityToken,
            "user" => $user_obj->User,
            "org" => $user_orgs->Organization,
        );
        global $user;
        $user_roles = $client->__soapCall("RetrieveRoles", array($user_sec_org_bundle));
        if(is_array($user_roles->Role)){
            foreach($user_roles->Role as $k => $v){
                $role_val = $v->type->description;
                if(!empty($role_val)){
                    $user_role = user_role_load_by_name($role_val);
                    user_multiple_role_edit(array($user->uid), 'add_role', $user_role->rid);
                }
            }
        }
        else{
            $role_val = $user_roles->Role->type->description;
            if(!empty($role_val)){
                $user_role = user_role_load_by_name($role_val);
                user_multiple_role_edit(array($user->uid), 'add_role', $user_role->rid);
            }
        }
    } catch(SoapFault $f) {
        watchdog('eenterprise_bridge_auth',"Error: Cannot retrieve role information", array(), WATCHDOG_ERROR);
    }
}

