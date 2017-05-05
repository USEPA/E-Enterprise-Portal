<?php

/**
 * @file
 * Menu callbacks and related functions.
 */

/**
 * Provides AJAX EE Bridge login form.
 */
function eenterprise_bridge_auth_login()
{
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
function eenterprise_bridge_auth_login_form($form, $form_state, $wrap = TRUE)
{
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
function eenterprise_bridge_auth_login_form_submit($form, &$form_state)
{
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
function eenterprise_bridge_auth_authenticate($error)
{
    global $user;
    $uname = "";
    $public_or_cdx = "public";

    // Check that user is not logged in (user uid == 0 if not authenticated)
    if ($user->uid != 0) {
        drupal_goto('workbench');
    }

    if ($error) {
        $message = t('Unable to log in using E-Enterprise Bridge.');
        watchdog('eenterprise_bridge_auth', $message, array(), WATCHDOG_ERROR);
        drupal_set_message($message, 'error');
    }
    if (!isset($_POST['wa'])) {
        drupal_set_message("Expected context parameter is not set", "error");
        drupal_goto('workbench');
    }

    if ($_POST['wa'] != 'wsignin1.0') {
        drupal_goto('workbench');
    }


    $adfs = new AdfsBridge();
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

    //Get user mapping and attempt to login user.
    $piv_card_position = stripos($userDetails->attributes['issuer'][0], "SmartCard");

    $authentication_method_array = explode(':', $userDetails->attributes['authenticationMethod']);
    $authentication_method = strtoupper(trim($authentication_method_array[count($authentication_method_array) - 1]));

    $username_raw = explode('/', $userDetails->attributes['name'][0]);
    $username = end($username_raw);

    if ($piv_card_position !== FALSE) {
        $piv_uname = trim(trim($userDetails->attributes['uid'][0]), '"');
        //To avoid username conflicts among users from multiple agencies, use username followed by dnQualifier attribute.
        $dnQualifier = trim($userDetails->attributes['dnQualifier'][0]);
        $uname_pos = strrpos($piv_uname, ":");
        $piv_uname = substr($piv_uname, $uname_pos);
        $uname_arr = explode(' ', $piv_uname);
        $uname = $uname_arr[0] . "_" . $uname_arr[1] . "_" . $dnQualifier . "_Via_PIV_Card";
    } else if ($authentication_method === "WAMNAAS") {
        //Trim space and double quote from WAM name attribute.
        $wam_uname = trim(trim($userDetails->attributes['name'][0]), '"');
        $uname_pos = strrpos($wam_uname, "/");
        $wam_res = substr($wam_uname, $uname_pos + 1);
        $uname = $wam_res . "_Via_WAM";
    } else if ($authentication_method === "ENNAAS") {
        $authentication_domain = strtoupper(trim($userDetails->attributes['authenticationdomain'][0]));
        mitigate_username_alteration($username . "_Via_" . $authentication_domain, $username);
        $uname = $username . "_Via_" . $authentication_domain;
        $public_or_cdx = 'cdx';
    } else if ($authentication_method === 'ENVITE') {
        $uname = trim($userDetails->attributes['name'][0], '"') . "_Via_ENVITE";
        $userDetails->attributes['email'][0] = trim($userDetails->attributes['emailaddress'][0], '"');
    } else if ($authentication_method === 'TWITTER') {
        mitigate_username_alteration($userDetails->attributes['id'][0] . "_Via_Twitter", $userDetails->attributes['id'][0]);
        $uname = $userDetails->attributes['id'][0] . "_Via_Twitter";
    } else if ($authentication_method === 'FACEBOOK') {
        // Use email if available, otherwise use id
        if (isset($userDetails->attributes['email'])) {
            $userDetails->attributes['email'][0] = trim($userDetails->attributes['email'][0], '"');
            $uname = $userDetails->attributes['email'][0] . "_Via_Facebook";
            mitigate_username_alteration($userDetails->attributes['id'][0] . "_Via_Facebook", $userDetails->attributes['id'][0]);
        } else {
            $userDetails->attributes['id'][0] = trim($userDetails->attributes['id'][0], '"');
            $uname = $userDetails->attributes['id'][0] . "_Via_Facebook";
            mitigate_username_alteration($userDetails->attributes['email'][0] . "_Via_Facebook", $userDetails->attributes['email'][0]);
        }
    } else if ($authentication_method === 'NMIDP') {
        if (isset($userDetails->attributes['email'])) {
            $userDetails->attributes['email'][0] = trim($userDetails->attributes['email'][0], '"');
            $uname = $userDetails->attributes['email'][0] . "_Via_NMED";
        }
    } else {
        // default
        mitigate_username_alteration($username . "_Via_CDX", $username);
        $uname = $username . "_Via_CDX";
        $public_or_cdx = 'cdx';
    }

    if (variable_get('trusted_users_list_used') == 'Yes') {
        trusted_user_check($uname);
    }

    $_SESSION['cdx_user_type'] = $public_or_cdx;
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
            if ($public_or_cdx == 'public') {
                $user_role = user_role_load_by_name('Public User');
                user_multiple_role_edit(array($user->uid), 'add_role', $user_role->rid);
            } else {
                assign_roles_to_user($uname);
                $_SESSION['cdx_fmw_security_token'] = $userDetails->attributes['securityToken'][0];
                $_SESSION['login_timestamp'] = time();
            }
        }
    } else {
        //If user is already registered, and authenticated through EPA Bridge, skip registration and just log the user in.
        $user = $ext_user;
        $form_state['uid'] = $user->uid;

        user_login_submit(array(), $form_state);
        //To fix a bug where email address is not updated after users update their email address in CDX and login.
        user_save($user, array('mail' => trim($userDetails->attributes['email'][0], '"')));
        if ($public_or_cdx == 'cdx') {
            assign_roles_to_user($uname);
            $_SESSION['cdx_fmw_security_token'] = $userDetails->attributes['securityToken'][0];
            $_SESSION['login_timestamp'] = time();
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
function mitigate_username_alteration($altered_username, $username)
{
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
function trusted_user_check($uname)
{
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

function assign_roles_to_user($user_name)
{
    global $user;
    $wsdl = variable_get('eactivity_auth_reg_wsdl');
    $client = connectToSOAPServerWithWSDL($wsdl, "Eenterprise Bridge Auth");
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


function makeUserPublicUser($user)
{
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

function allow_user_menu_access($role_id)
{
    $query = db_merge('block_role')->key(array('rid' => $role_id, 'module' => 'system', 'delta' => 'user-menu'));
    $query->execute();
    cache_clear_all();
}

function eenterprise_bridge_auth_logout()
{
    if (isset($_SESSION['cdx_fmw_security_token'])) {
        $_SESSION['cdx_fmw_security_token'] = '';
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


function eenterprise_bridge_auth_redirect()
{
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
function view_allow_access_role($view_name, $role_id)
{
    $result_view = views_get_view($view_name);
    if ($result_view && $result_view->access($view_name)) {
        $result_view->set_display('default');
        $result_view->display_handler->display->display_options['access']['role'][$role_id] = $role_id;
        $result_view->save();
    }
}

function update_cdx_naics_profile($profile)
{
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