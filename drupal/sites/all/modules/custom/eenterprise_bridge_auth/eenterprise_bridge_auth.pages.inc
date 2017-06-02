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
 * @param $post
 * @return AdfsUserDetails|stdClass
 * Parses post variable into Adfs UserDetails object
 */
function _parsePostForUserDetails($post) {
  $adfs = new AdfsBridge();
  if (isset($post['wam_test'])) {
    $userDetails = new stdClass();
    $userDetails->attributes['name'][] = $post['name'];
  }
  else if (isset($post['piv_card_test'])) {
    $userDetails = new stdClass();
    $userDetails->attributes['uid'][] = $post['uid'];
    $userDetails->attributes['issuer'][] = $post['issuer'];
    $userDetails->attributes['Organization'][] = $post['Organization'];
    $userDetails->attributes['OrganizationUnit'][] = $post['OrganizationUnit'];
  }
  else {
    $userDetails = $adfs->getAdfsSignInResponse(AdfsConf::getInstance(), $post['wresult']);
  }
  return $userDetails;
}

/**
 * Authentication callback function.
 *
 * Handles an authentication token and, if able, will log the user in or allow
 * the user to register.
 */
function eenterprise_bridge_auth_authenticate($error) {
  global $user;

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

  // Use temp variable to pass post contents
  $post = $_POST;
  // Pull UserDetails from Post
  $userDetails = _parsePostForUserDetails($post);
  $authenticated_user = new AuthenticatedUser($userDetails);
  // Check if user is already in the system
  $ext_user = user_external_load($authenticated_user->get_name());
  if (!$ext_user) {
    user_external_login_register($authenticated_user->get_name(), 'eenterprise_bridge_auth');
    if ($user) {
      $authenticated_user->set_user($user);
      if ($authenticated_user->public_user) {
        $authenticated_user->add_role('Public User');
      }
    }
  }
  else {
    //If user is already registered, and authenticated through EPA Bridge, skip registration and just log the user in.
    $user = $ext_user;
    $form_state['uid'] = $user->uid;
    $authenticated_user->set_user($user);
    user_login_submit(array(), $form_state);
  }

  if (!$authenticated_user->public_user) {
    $_SESSION['cdx_fmw_security_token'] = $authenticated_user->userDetails->attributes['securityToken'][0];
    $_SESSION['userId'] = $authenticated_user->userDetails->attributes['userId'][0];
    $_SESSION['login_timestamp'] = time();
    if (module_exists("linked_accounts")) {
      linked_accounts_save_authenticated_user($authenticated_user->get_source_username(), $authenticated_user->get_authentication_domain());
    }
    $authenticated_user->add_role('eactivity_dataflows');
  }
  $authenticated_user->add_role('logged_in_user');
  drupal_goto('workbench');
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
  }
  else {
    $response['error'] = true;
    $response['error-messages'][] = 'Missing profile value in the post data';
  }
  echo json_encode($response);
}


