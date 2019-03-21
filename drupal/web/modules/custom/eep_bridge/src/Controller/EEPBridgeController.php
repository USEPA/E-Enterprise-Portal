<?php

namespace Drupal\eep_bridge\Controller;

use Drupal\Core\Controller\ControllerBase;
use Drupal\eep_bridge\ADFSConf;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Drupal\Core\Url;
use Drupal\eep_bridge\ADFSUserDetails;
use Drupal\eep_bridge\ADFSBridge;
use Drupal\eep_bridge\AuthenticatedUser;
use Drupal\jwt\Authentication\Provider\JwtAuth;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Drupal\user\Entity\User;
use Drupal\eep_my_reporting\CDXSecurityTokenService;


/**
 * Returns responses for eep_bridge module routes.
 */
class EEPBridgeController extends ControllerBase {

  private $auth;

  /**
   * {@inheritdoc}
   *
   * EEPBridgeController constructor.
   * @param \Drupal\jwt\Authentication\Provider\JwtAuth $auth
   *   The JWT auth service.
   */
  public function __construct(JwtAuth $auth) {
    $this->auth = $auth;
  }

  public function eep_authenticate() {
    $config = $this->config('eep_bridge.environment_settings');
    $environment_name = $config->get('eep_bridge_environment_name');
    if (!isset($_POST['wa'])) {
      $message = "Expected context parameter is not set";
      $url = Url::fromUri($environment_name . '?data=' . $message);
      $this->eep_bridge_goto($url);
      return;
    }
    // Pull UserDetails from Post
    $userDetails = $this->parse_post_for_user_details($_POST);
    if ($this->verify_token_with_request($userDetails)) {
      $authenticated_user = new AuthenticatedUser($userDetails);
      $this->create_or_login_user_if_exists($authenticated_user);
      $this->process_required_fields_for_user($authenticated_user);
      $this->create_jwt_and_send_user();
    }
    return;
  }

  private function verify_token_with_request($request_details) {
    $valid_token = FALSE;
    if (isset($request_details->attributes)) {
      $attributes = $request_details->attributes;
      if ($attributes['authenticationMethod']) {
        $auth_method = str_replace('urn:', '', $attributes['authenticationMethod']);
        if ($auth_method === 'ENNAAS') {
          $security_token = $attributes['securityToken'][0];
          try {
            $user_data = $this->pull_user_data_from_token($security_token, $_SERVER['LOCAL_ADDR']);
            if ($user_data['EMAIL'] == $attributes['email'][0] && $user_data['USERID'] == $attributes['userId'][0]) {
              $valid_token = TRUE;
            }
          } catch (\Exception $e) {
            $this->bridge_auth_logout();
          }
        }
      }
    }
    return $valid_token;
  }

  /**
   * Creates a method of logging into the front-end with a user. The passed $uid
   * is used to select an existing Drupal user to return.  The default user is
   * the current user if none is given
   *
   * @param $uid
   */
  public function eep_authenticate_dev_user($uid = NULL) {
    $config = $this->config('eep_bridge.environment_settings');
    $environment_name = $config->get('eep_bridge_environment_name');

    if (!$uid) {
      $uid = \Drupal::currentUser()->id();
    }
    $this->create_jwt_and_send_user($uid);
    return;
  }

  /**
   * @return JsonResponse
   */
  public function bridge_auth_logout() {
    // Declare variables
    $config = \Drupal::config('eep_bridge.environment_settings');
    // Build logout url
    $logout = $config->get('eep_bridge_issuer') . '?wa=wsignout1.0&wreply=' . urlencode($config->get('eep_bridge_wreply'));
    // Log current user out
    user_logout();
    // Redirect to the bridge
    header("Location:$logout");
    exit();
  }

  /**
   * @param ContainerInterface $container
   * @return static
   */
  public static function create(ContainerInterface $container) {
    $auth = $container->get('jwt.authentication.jwt');
    return new static($auth);
  }

  public function single_sign_on() {
    $_POST = array_change_key_case($_POST, CASE_UPPER);

    if (isset($_POST['CDX_DATA']) || isset($_POST['SCS_DATA'])) {
      if (isset($_POST['CDX_DATA'])) {
        $ip = $_POST['CDX_DATA'];
      } else {
        $ip = $_POST['SCS_DATA'];
      }
      $token = $_POST['TOKEN'];
      $user_data = $this->pull_user_data_from_token($token, $ip);
      $authenticated_user = new AuthenticatedUser([]);
      $username = $user_data['UID'] . '_Via_' . $user_data['ISSUER'];
      $authenticated_user->set_name($username);
      $authenticated_user->set_source_username($user_data['UID']);
      $authenticated_user->set_authentication_domain($user_data['ISSUER']);
      $this->create_or_login_user_if_exists($authenticated_user);
      $this->process_required_fields_for_user($authenticated_user);
      $this->create_jwt_and_send_user();
    }
  }


  /**
   * @return JsonResponse
   */
  public function generate_new_token() {
    $new_jwt_token = $this->auth->generateToken();
    return new JsonResponse([
      'current_user_id' => \Drupal::currentUser()->id(),
      'token' => $new_jwt_token
    ]);
  }

  private function eep_bridge_goto($url, $jwt_token = NULL) {
    $response = new RedirectResponse($url->toString());
    $response->headers->set('token', $jwt_token);
    $response->send();
    exit;
  }

  /**
   * @param $post
   * @return ADFSUserDetails
   * Parses post variable into ADFS UserDetails object
   */
  private function parse_post_for_user_details($post) {
    $adfs = new ADFSBridge();
    $userDetails = $adfs->getAdfsSignInResponse(ADFSConf::getInstance(), $post['wresult']);
    return $userDetails;
  }

  private function add_field_if_needed($uid, $field_name, $field_value) {
    $user = \Drupal\user\Entity\User::load($uid);
    $stored_value = $user->get($field_name)->getString();
    if (empty($stored_value) || $stored_value !== $field_value) {
      $user->set($field_name, trim($field_value));
      $user->save();
    }
  }


  private function create_or_login_user_if_exists($authenticated_user) {
    $entity_storage = \Drupal::entityTypeManager()->getStorage('user');
    $account_search = $entity_storage->loadByProperties(['name' => $authenticated_user->get_name()]);
    $account_data = [];
    if (empty($account_search)) {
      //if the account does not already exist, create one.
      $account_data = array_merge(
        [
          'name' => $authenticated_user->get_name(),
          'init' => $authenticated_user->get_authentication_domain(),
          'mail' => $authenticated_user->get_email(),
          'status' => 1,
          'access' => (int)$_SERVER['REQUEST_TIME'],
        ], $account_data);
      $account = $entity_storage->create($account_data);
      $account->enforceIsNew();
      $account->save();
      user_login_finalize($account);
    } else {
      //Account already exists, just login the user
      $account_search = array_values($account_search);
      user_login_finalize($account_search[0]);
    }
  }

  /**
   * @param $authenticated_user
   * @return int
   */
  private function process_required_fields_for_user($authenticated_user) {
    $uid = \Drupal::currentUser()->id();
    if ($uid) {
      if ($authenticated_user->get_authentication_domain() === 'CDX') {
        $this->add_field_if_needed($uid, 'field_cdx_user_id', $authenticated_user->get_source_username());
      }
      $this->add_field_if_needed($uid, 'mail', $authenticated_user->get_email());
    }
  }

  /**
   * @param $environment_name
   * @param $uid
   */
  private function create_jwt_and_send_user($uid = NULL) {
    $environment_name = $this->config('eep_bridge.environment_settings')->get('eep_bridge_environment_name');
    if (!$uid) {
      $uid = \Drupal::currentUser()->id();
    }
    $jwt_token = $this->auth->generateToken();
    if ($jwt_token === FALSE) {
      $error_msg = "Error. Please set a key in the JWT admin page.";
      \Drupal::logger('eep_bridge')->error($error_msg);
    }
    $url = Url::fromUri($environment_name . '?token=' . $jwt_token . '&uid=' . $uid);
    $this->eep_bridge_goto($url, $jwt_token);
  }

  /**
   * @param $token
   * @param $ip
   * @param $decoded_parts
   * @return array
   */
  private function pull_user_data_from_token($token, $ip) {
    $config = $this->config('eep_my_reporting.form');
    $cdx_service = new CDXSecurityTokenService($config);
    $decoded_token = $cdx_service->decode_token($token, $ip);
    parse_str($decoded_token->return, $decoded_parts);
    $user_data = array_change_key_case($decoded_parts, CASE_UPPER);
    return $user_data;
  }
}
