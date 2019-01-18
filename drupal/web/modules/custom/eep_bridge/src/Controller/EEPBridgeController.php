<?php

namespace Drupal\eep_bridge\Controller;

use Drupal\Core\Controller\ControllerBase;
use Drupal\eep_bridge\ADFSConf;
use Drupal\eep_bridge\JWTHandler;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Drupal\Core\Url;
use Drupal\eep_bridge\ADFSUserDetails;
use Drupal\eep_bridge\ADFSBridge;
use Drupal\eep_bridge\AuthenticatedUser;
use Symfony\Component\DependencyInjection\ContainerInterface;


/**
 * Returns responses for eep_bridge module routes.
 */
class EEPBridgeController extends ControllerBase {

    private $auth;
    private $jwt_handler;
    
    function __construct() {
        $this->jwt_handler = new JWTHandler();    
    }


    public function eep_authenticate() {
        $raw_str = file_get_contents('php://input'); //eg. name1=val&name2=val
        if ($raw_str) {
            foreach (explode('&', $raw_str) as $pair) {
                $keyvalue = explode("=", $pair);
                $key = urldecode($keyvalue[0]);
                $value = urldecode($keyvalue[1]);
                $_POST[$key] = $value;
            }
        }
        $config = $this->config('eep_bridge.environment_settings');
        $environment_name = $config->get('eep_bridge_environment_name');

        if (!isset($_POST['wa'])) {
            $message = "Expected context parameter is not set";
            $url = Url::fromUri($environment_name . '?data=' . $message);
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
                    'init' => 'EN:NAAS',                  //TODO: remove hard coded provider and replace with passed variable name.
                    'status' => 1,
                    'access' => (int)$_SERVER['REQUEST_TIME'],
                ],
                $account_data
            );
            $account = $entity_storage->create($account_data);
            $account->enforceIsNew();
            $account->save();
            user_login_finalize($account);
        } else {
            //Account already exists, just login the user
            $account_search = array_values($account_search);
            user_login_finalize($account_search[0]);
        }

        
        $jwt_token =  $this->jwt_handler->generateToken();
        if ($jwt_token === FALSE) {
            $error_msg = "Error. Please set a key in the JWT admin page.";
            watchdog('eep_bridge', $error_msg, array(), WATCHDOG_ERROR);
        }

        $url = Url::fromUri($environment_name . '?token=' . $jwt_token);
        $this->eep_bridge_goto($url);
        return;
    }

    function eep_bridge_goto($url) {
        $response = new RedirectResponse($url->toString());
        $response->send();
        exit;
    }

    /**
     * @param $post
     * @return ADFSUserDetails
     * Parses post variable into ADFS UserDetails object
     */
    function parse_post_for_user_details($post) {
        $adfs = new ADFSBridge();
        $userDetails = $adfs->getAdfsSignInResponse(ADFSConf::getInstance(), $post['wresult']);
        return $userDetails;
    }


}