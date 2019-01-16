<?php
/**
 * Created by PhpStorm.
 * User: rbeach
 * Date: 1/16/2019
 * Time: 3:00 PM
 */

/**
 * @file
 * Contains \Drupal\eep_login\Controller\LoginController.
 */

namespace Drupal\eep_login\Controller;

use Drupal\Component\Serialization\Json;
use Drupal\Core\Controller\ControllerBase;
use Symfony\Component\HttpFoundation\JsonResponse;

class LoginController extends ControllerBase {

    public function handleLoginCreation(){
        return new JsonResponse();
    }

}