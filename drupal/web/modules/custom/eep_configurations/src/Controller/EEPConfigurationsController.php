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
    // Declare global variables
    private static $cookie_config_machine_name = 'eep_core.eepcookieconfig';

    /**
     *
     * @return JsonResponse
     */
    function eep_retrieve_configurations(){

        $config = \Drupal::config('eep_core.eepcookieconfig');
        $cookie_information = array(
            'cookie_expiration_time' => $config->get('cookie_duration'),
            'cookie_time_units' => $config->get('cookie_time_units')
        );
        return new JsonResponse($cookie_information);
    }

}