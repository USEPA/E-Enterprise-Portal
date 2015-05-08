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
    
    // TODO: handle ee bridge response

    // try {
    //   $identity_providers = module_invoke_all('azure_identity_providers');
    //   drupal_alter('azure_identity_providers', $identity_providers);
    //   $token = new AzureAuthenticationSWT(
    //     $_POST['wresult'],
    //     variable_get('eenterprise_bridge_auth_realm'),
    //     variable_get('eenterprise_bridge_auth_namespace'),
    //     variable_get('eenterprise_bridge_auth_key'),
    //     variable_get('eenterprise_bridge_auth_oldkey'),
    //     $identity_providers
    //   );
    //   if ($token->isValid()) {
    //     if ($uid = _eenterprise_bridge_auth_get_authmap($token->getNameIdentifier())) {
    //       $account = user_load($uid);
    //       drupal_set_message(t('Logged in'));
    //       $form_state['uid'] = $account->uid;
    //       user_login_submit(array(), $form_state);
    //     }
    //     else {
    //       $_SESSION['eenterprise_bridge_auth'] = $token;
    //       drupal_goto('user/register');
    //     }
    //   }
    // }
    // catch (Exception $e) {
    //   drupal_set_message($e->getMessage(), 'error');
    // }
  }
  drupal_goto('user');
}
