<?php

namespace Drupal\eep_bridge\Controller;

use Drupal\Core\Controller\ControllerBase;
use Drupal\eep_bridge\ADFSConf;
use Symfony\Component\HttpFoundation\Cookie;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Drupal\Core\Url;
use Drupal\eep_bridge\ADFSUserDetails;
use Drupal\eep_bridge\ADFSBridge;
use Drupal\eep_bridge\AuthenticatedUser;
use Drupal\jwt\Authentication\Provider\JwtAuth;
use Symfony\Component\DependencyInjection\ContainerInterface;


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

  public function eep_authenticate(){
    $config = $this->config('eep_bridge.environment_settings');
    $environment_name = $config->get('eep_bridge_environment_name');

    if (!isset($_POST['wa'])) {
      $message = "Expected context parameter is not set";
      $url = Url::fromUri($environment_name.'?data='.$message);
      $this->eep_bridge_goto($url);
      return;
    }

    $post = $_POST;
    // Pull UserDetails from Post
    $userDetails = $this->parse_post_for_user_details($post);

    $authenticated_user = new AuthenticatedUser($userDetails);
    // Check if user is already in the system
    $ext_user = user_load_by_name($authenticated_user->get_name());

    $entity_storage = \Drupal::entityTypeManager()->getStorage('user');
    $account_search = $entity_storage->loadByProperties(['name' => $authenticated_user->get_name()]);
    $account_data = [];
    if (empty($account_search)) {
      //if the account does not already exist, create one.
      $account_data = array_merge(
        [
          'name' => $authenticated_user->get_name(),
          'init' => $authenticated_user->get_authentication_domain(),
          'status' => 1,
          'access' => (int) $_SERVER['REQUEST_TIME'],
        ],
        $account_data
      );
      $account = $entity_storage->create($account_data);
      $account->enforceIsNew();
      $account->save();
      user_login_finalize($account);
    }
    else{
      //Account already exists, just login the user
      $account_search = array_values($account_search);
      user_login_finalize($account_search[0]);
    }
    $uid = \Drupal::currentUser()->id();
    $jwt_token = $this->auth->generateToken();
    if ($jwt_token === FALSE) {
      $error_msg = "Error. Please set a key in the JWT admin page.";
      \Drupal::logger('eep_bridge')->error($error_msg);
    }
    // @TODO: remove $jwt_token and $uid from url params and change all affected features
    $url = Url::fromUri($environment_name);
    $this->eep_bridge_goto($url, $jwt_token, $uid);
    return;
  }

  function eep_bridge_goto($url, $jwt_token, $uid) {
    $response = new RedirectResponse($url->toString());
    $response->headers->setCookie(new Cookie('userLoggedIn',true));
    $response->headers->setCookie(new Cookie('uid', $uid));
    $response->headers->setCookie(new Cookie('token', $jwt_token));
    $response->send();
    exit;
  }

  /**
   * @param $post
   * @return ADFSUserDetails
   * Parses post variable into ADFS UserDetails object
   */
  function parse_post_for_user_details($post){
    $adfs = new ADFSBridge();
    $userDetails = $adfs->getAdfsSignInResponse(ADFSConf::getInstance(), $post['wresult']);
    return $userDetails;
  }

  public static function create(ContainerInterface $container) {
    $auth = $container->get('jwt.authentication.jwt');
    return new static($auth);
  }

}