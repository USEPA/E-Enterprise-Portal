<?php

namespace Drupal\eep_bridge\Controller;

use Drupal\Core\Controller\ControllerBase;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Drupal\Core\Url;


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

    return [
      '#markup' => $this->t("wa_result " . $_POST['wa_result'] . " <br> wa_version " . $_POST['wa_version'])
    ];
  }

  function eep_bridge_goto($url) {
    $response = new RedirectResponse($url->toString());
    $response->send();
    exit;
  }

}