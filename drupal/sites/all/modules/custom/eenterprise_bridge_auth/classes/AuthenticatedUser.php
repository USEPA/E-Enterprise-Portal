<?php

/**
 * Class AuthenticatedUser
 *  Uses UserDetails object or blank array to initialize.
 *
 */
class AuthenticatedUser {
  private $name;
  private $user;
  private $authentication_domain = null;
  private $source_username;

  var $issuer;
  var $userDetails;
  var $authentication_method;
  var $piv_card = FALSE;
  var $public_user = TRUE;

  function __construct($userDetails) {
    if ($userDetails != []) {
      $this->userDetails = $userDetails;
      $piv_card_position = stripos($this->userDetails->attributes['issuer'][0], "SmartCard");
      if ($piv_card_position !== FALSE) {
        $this->piv_card = TRUE;
        $this->returnPivCardUserName($this->userDetails);
      }
      else {
        $this->prepareUserDetailsAndName($this->userDetails);
      }
    }
  }

  /**
   * @param $role_name
   * Add role name to AuthenticatedUser
   */
  function add_role($role_name) {
    if ($user_role = user_role_load_by_name($role_name)) {
      user_multiple_role_edit(array($this->user->uid), 'add_role', $user_role->rid);
    }
  }

  /**
   * @param $user
   * @throws Exception
   * When User is updated, always save new email for the user account
   */
  function set_user($user) {
    $this->user = $user;
    if ($this->piv_card) {
      $this->update_user_piv_card();
    }
    else {
      user_save($user, array('mail' => trim($this->userDetails->attributes['email'][0], '"')));
    }
  }

  function set_name($uname) {
    $this->name = $uname;
  }

  function set_authentication_domain($issuer) {
    $this->authentication_domain = $issuer;
  }

  function get_name() {
    return $this->name;
  }

  function get_source_username() {
    return $this->source_username;
  }

  function get_authentication_domain() {
    return $this->authentication_domain;
  }


  /**
   * @param $username
   * Prevent lost user data with updating user name conventions.
   * If Username exists with no _Via_, assign with new user Issuer.
   * Update Exchange users with new issuer, when users enter from Exchange
   */
  function resolve_username_collisions($username) {
    $issuer = $this->authentication_domain;
    if (feature_toggle_get_status('aws_environment')) {
      // If username exists _Via_Exchange_Network, load that user and rename to _Via_$issuer
      $old_username = db_query("SELECT authname FROM {authmap} WHERE authname = :authname", array(':authname' => $username . '_Via_Exchange_Network'))->fetchField();
      if ($old_username) {
        $this->edit_user_name($old_username, $username . '_Via_' . $issuer);
      }
    }
    // If username exists with no Via, load that user and rename to _Via_$issuer
    $old_username = db_query("SELECT authname FROM {authmap} WHERE authname = :authname", array(':authname' => $username))->fetchField();
    if ($old_username) {
      $this->edit_user_name($old_username, $username . '_Via_' . $issuer);
    }
  }

  /**
   * @param $userDetails
   * Called if Piv Card login. Parses User etails and sets name
   */
  private function returnPivCardUserName($userDetails) {
    $piv_uname = trim(trim($userDetails->attributes['uid'][0]), '"');
    //To avoid username conflicts among users from multiple agencies, use username followed by dnQualifier attribute.
    $dnQualifier = trim($userDetails->attributes['dnQualifier'][0]);
    $uname_pos = strrpos($piv_uname, ":");
    $piv_uname = substr($piv_uname, $uname_pos);
    $uname_arr = explode(' ', $piv_uname);
    $uname = $uname_arr[0] . "_" . $uname_arr[1] . "_" . $dnQualifier . "_Via_PIV_Card";
    $this->name = $uname;
  }


  private function prepareUserDetailsAndName($userDetails) {
    module_load_include('inc', 'feature_toggle', 'includes/feature_toggle.api');
    // Name that user will be logged in with
    $eportal_uname = '';
    $authentication_method_array = explode(':', $userDetails->attributes['authenticationMethod']);
    // String denoting where user was logged in from (SCS/CDX/Twitter/etc)
    $this->authentication_method = strtoupper(trim($authentication_method_array[count($authentication_method_array) - 1]));
    $username_raw = explode('/', $userDetails->attributes['name'][0]);
    // Default username if source username is not found in other UserDetails attribute
    $username = end($username_raw);
    // Source username with out Via, unaltered from identity provider
    $source_username = $username;

    if ($this->authentication_method === "WAMNAAS") {
      //Trim space and double quote from WAM name attribute.
      $wam_uname = trim(trim($userDetails->attributes['name'][0]), '"');
      $uname_pos = strrpos($wam_uname, "/");
      $wam_res = substr($wam_uname, $uname_pos + 1);
      $source_username = $wam_res;
      $eportal_uname = $source_username . "_Via_WAM";
    }
    else if ($this->authentication_method === "ENNAAS") {
      if (feature_toggle_get_status('aws_environment')) {
        $this->authentication_domain = strtoupper(trim($userDetails->attributes['authenticationdomain'][0]));
      }
      else {
        $this->authentication_domain = "Exchange_Network";
      }
      $this->resolve_username_collisions($username);
      $eportal_uname = $username . "_Via_" . $this->authentication_domain;
      $this->public_user = FALSE;
    }
    else if ($this->authentication_method === 'ENVITE') {
      $userDetails->attributes['email'][0] = trim($userDetails->attributes['emailaddress'][0], '"');
      $source_username = trim($userDetails->attributes['name'][0], '"');
      $eportal_uname = $source_username . "_Via_ENVITE";
    }
    else if ($this->authentication_method === 'TWITTER') {
      $source_username = $userDetails->attributes['id'][0];
      $eportal_uname = $source_username . "_Via_Twitter";
    }
    else if ($this->authentication_method === 'FACEBOOK') {
      // Use email if available, otherwise use id
      if (isset($userDetails->attributes['email'])) {
        $userDetails->attributes['email'][0] = trim($userDetails->attributes['email'][0], '"');
        $source_username = $userDetails->attributes['email'][0];
        $eportal_uname = $source_username . "_Via_Facebook";
      }
      else {
        $userDetails->attributes['id'][0] = trim($userDetails->attributes['id'][0], '"');
        $source_username = $userDetails->attributes['id'][0];
        $eportal_uname = $source_username . "_Via_Facebook";
      }
    }
    else if ($this->authentication_method === 'NMIDP') {
      if (isset($userDetails->attributes['email'])) {
        $userDetails->attributes['email'][0] = trim($userDetails->attributes['email'][0], '"');
        $source_username = $userDetails->attributes['email'][0];
        $eportal_uname = $source_username . "_Via_NMED";
      }
    }
    else {
      // default
      $eportal_uname = $username . "_Via_CDX";
      $this->public_user = FALSE;
    }
    $this->source_username = $source_username;
    $this->userDetails = $userDetails;
    $this->name = $eportal_uname;
  }

  private function update_user_piv_card() {
    $org_pos = strrpos($this->userDetails->attributes['Organization'][0], ":");
    $org = substr($this->userDetails->attributes['Organization'][0], $org_pos + 1);
    $org_unit_pos = strrpos($this->userDetails->attributes['OrganizationUnit'][0], ":");
    $org_unit = substr($this->userDetails->attributes['OrganizationUnit'][0], $org_unit_pos + 1);
    $edit = array('field_piv_card_org' => array('und' => array(0 => array('value' => $org . " : " . $org_unit))));
    user_save($this->user, $edit);
  }

  private function edit_user_name($old_username, $new_username) {
    db_query("UPDATE {users} SET name = :uname1 WHERE name = :uname2", array(':uname1' => $new_username, ':uname2' => $old_username));
    db_query("UPDATE {authmap} SET authname = :uname1 WHERE authname = :uname2", array(':uname1' => $new_username, ':uname2' => $old_username));
  }
}