<?php

namespace Drupal\eep_bridge;

/**
 * Class AuthenticatedUser
 *  Uses UserDetails object or blank array to initialize.
 *
 */
class AuthenticatedUser {
  private $name;
  private $authentication_domain = null;
  private $source_username;

  public $issuer;
  public $userDetails;
  public $authentication_method;



  function __construct($userDetails) {
    if ($userDetails != []) {
      $this->userDetails = $userDetails;
      $this->prepareUserDetailsAndName($this->userDetails);
    }
  }

  function set_name($username) {
    $this->name = strtoupper($username);
  }

  function set_authentication_domain($issuer) {
    $this->authentication_domain = $issuer;
  }

  function set_source_username($username) {
    $this->source_username = strtoupper($username);
  }

  function get_name() {
    return $this->name;
  }

  function get_email() {
    return $this->userDetails->attributes['email'][0];
  }

  function get_source_username() {
    return $this->source_username;
  }

  function get_authentication_domain() {
    return $this->authentication_domain;
  }

  private function prepareUserDetailsAndName($userDetails) {
    $authentication_method_array = explode(':', $userDetails->attributes['authenticationMethod']);
    // String denoting where user was logged in from (SCS/CDX/Twitter/etc)
    $this->authentication_method = strtoupper(trim($authentication_method_array[count($authentication_method_array) - 1]));
    if (isset($userDetails->attributes['authenticationdomain']) && count($userDetails->attributes['authenticationdomain']) > 0) {
      $this->authentication_domain = $userDetails->attributes['authenticationdomain'][0];
    }
    if ($this->authentication_method === "SMARTCARDAUTH") {
      $username_raw = explode('/', $userDetails->attributes['uid'][0]);
    } else {
      $username_raw = explode('/', $userDetails->attributes['name'][0]);
    }
    // Default username if source username is not found in other UserDetails attribute, and also remove spaces and quotation marks from end and beginning of usernames.
    $source_username = trim(trim(end($username_raw), '"'));
    $source_username = str_replace(" ", "_", $source_username);

    // @TODO: redo this to reflect SCS and Exchange network
    if ($this->authentication_method === "WAMNAAS") {
      //Trim space and double quote from WAM name attribute.
      $wam_uname = trim(trim($userDetails->attributes['name'][0]), '"');
      $uname_pos = strrpos($wam_uname, "/");
      $wam_res = substr($wam_uname, $uname_pos + 1);
      $source_username = $wam_res;
      $this->authentication_domain = 'WAM';
    } else if ($this->authentication_method === "ENNAAS") {
        if (!isset($this->authentication_domain)) {
          $this->authentication_domain = "Exchange_Network";
        }
      $this->public_user = FALSE;
    } else {
      // default
      $this->authentication_domain = $this->authentication_method;
      $this->public_user = TRUE;
    }
    $this->source_username = $source_username;
    $this->userDetails = $userDetails;
    $this->name = $source_username . "_Via_" . $this->authentication_domain;
  }
}
