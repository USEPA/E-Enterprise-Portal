<?php
/**
 * Created by PhpStorm.
 * User: bmatkin
 * Date: 1/16/2019
 * Time: 9:42 PM
 */

namespace Drupal\jwt_auth_provider;
use \Firebase\JWT\JWT;


class JWTHandler {

  private $jwtSecret;
  private  $uid = -1;

  public function __construct() {
    $this->jwtSecret = 'testSecret';
  }

  function generateToken() {
    if ($this->uid < 0) {
      $account = \Drupal::currentUser();
      $this->uid = $account->id();
    }
    // Create token payload as a JSON string
    $token = array(
      "iss" => "http://example.org",
      "aud" => "http://example.com",
      "iat" => time(),
      "nbf" => time(),
      "exp" => time() + 20 * 1000,
      'user_id' => $this->uid,
    );


    /**
     * IMPORTANT:
     * You must specify supported algorithms for your application. See
     * https://tools.ietf.org/html/draft-ietf-jose-json-web-algorithms-40
     * for a list of spec-compliant algorithms.
     */
    $jwt = JWT::encode($token, $this->jwtSecret);
    return $jwt;
  }

  function setUIDForJWT($uid) {
    $this->uid = $uid;
  }

  function decodeToken($inputJWT) {
    $decoded = JWT::decode($inputJWT, $this->jwtSecret, array('HS256'));
    return $decoded;
  }


}