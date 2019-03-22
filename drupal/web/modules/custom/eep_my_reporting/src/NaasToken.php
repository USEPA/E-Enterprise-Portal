<?php

class NaasToken {

  /**
   * Returns base 64 string encoding of IP and token
   * Specifically works with CDX SSO handoffs
   * @param $token
   * @return string
   */
  public function encode_token_for_sso_handoff($token) {
    $sso_token = "token=" . $token . "&remoteIpAddress=" . $_SERVER['LOCAL_ADDR'];
    $sso_token = mb_convert_encoding($sso_token, 'UTF-16LE');
    $sso_token = base64_encode($sso_token);
    return $sso_token;
  }

}