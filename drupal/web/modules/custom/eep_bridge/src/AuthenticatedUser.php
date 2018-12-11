<?php

namespace Drupal\eep_bridge;

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



  function __construct($userDetails) {
    if ($userDetails != []) {
      $this->userDetails = $userDetails;
      $this->prepareUserDetailsAndName($this->userDetails);
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

  private function prepareUserDetailsAndName($userDetails) {
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
      $this->authentication_domain = "Exchange_Network";
      $eportal_uname = $username . "_Via_" . $this->authentication_domain;
      $this->public_user = FALSE;
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


}