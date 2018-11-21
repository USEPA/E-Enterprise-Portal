<?php

namespace Drupal\eep_bridge\Controller;

use Drupal\Core\Controller\ControllerBase;
use Drupal\eep_bridge\ADFSConf;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Drupal\Core\Url;
use Drupal\eep_bridge\ADFSUserDetails;
use Drupal\eep_bridge\ADFSBridge;


/**
 * Returns responses for eep_bridge module routes.
 */
class EEPBridgeController extends ControllerBase {

  /**
   * EEPBridgeController constructor.
   */
  /*public function __construct() {
  }*/

  public function eep_authenticate(){
    $account = \Drupal::currentUser();

    // Check that user is not logged in
    if ($account->id() != 0){
      $url = Url::fromUri('internal:/workbench');
      $this->eep_bridge_goto($url);
      return;
    }

    if (!isset($_POST['wa'])) {
      $message = "Expected context parameter is not set";
      \Drupal::messenger()->addError($message);
      $url = Url::fromUri('internal:/workbench');
      $this->eep_bridge_goto($url);
      return;
    }

    if ($_POST['wa'] != 'wsignin1.0') {
      $url = Url::fromUri('internal:/workbench');
      $this->eep_bridge_goto($url);
      return;
    }

    $post = $_POST;
    // Pull UserDetails from Post
    $userDetails = $this->parse_post_for_user_details($post);

    return [
      '#markup' => $this->t("wa_result " . $_POST['wa_result'] . " <br> wa_version " . $_POST['wa_version'])
    ];
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
  function parse_post_for_user_details($post){
    $adfs = new ADFSBridge();
    $userDetails = $adfs->getAdfsSignInResponse(ADFSConf::getInstance(), $post['wresult']);
    return $userDetails;
  }

}