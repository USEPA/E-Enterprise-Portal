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
  $identity_providers = [array('Name' => 'E-Enterprise Bridge')];
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
            }
        }
    }
    drupal_goto('workbench');
}

function assign_roles_to_user($user_name){
    $client = new SoapClient("https://testngn.epacdxnode.net/cdx-register-II/services/RegisterService?wsdl", array('soap_version'   => SOAP_1_2));
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
        $role_val = $user_roles->Role->type->description;
        if(!empty($role_val)){
            $user_role = user_role_load_by_name($role_val);
            user_multiple_role_edit(array($user->uid), 'add_role', $user_role->rid);
        }
    } catch(SoapFault $f) {
        watchdog('eenterprise_bridge_auth',"Error: Cannot retrieve role information", array(), WATCHDOG_ERROR);
    }
}

