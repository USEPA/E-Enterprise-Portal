<?php
/**
 * Created by PhpStorm.
 * User: rbeach
 * Date: 2/6/2019
 * Time: 12:34 PM
 */

namespace Drupal\eep_configurations\Controller;


use Drupal\Core\Controller\ControllerBase;
use Symfony\Component\HttpFoundation\JsonResponse;

class EEPConfigurationsController extends ControllerBase {
    function eep_retrieve_all_configurations(){
        $my_config = \Drupal::config('eep_core.admin_settings');


        return new JsonResponse($my_config);
    }

}