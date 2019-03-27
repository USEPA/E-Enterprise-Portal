<?php
/**
 * Created by PhpStorm.
 * User: rbeach
 * Date: 2/6/2019
 * Time: 12:34 PM
 */

namespace Drupal\eep_core\Controller;


use Drupal\Core\Controller\ControllerBase;
use Drupal\eep_core\Form\BannerConfigForm;
use Symfony\Component\HttpFoundation\JsonResponse;

class EEPConfigurationsController extends ControllerBase {

    /**
     *
     * @return JsonResponse
     */
    function eep_retrieve_configurations(){
        static $cookie_config_machine_name = 'eep_core.eepcookieconfig';
        static $banner_config_machine_name = 'eep_core.bannerconfig';

        $cookie_config = \Drupal::config($cookie_config_machine_name);
        $banner_config = \Drupal::config($banner_config_machine_name);

        $configurations = array(
           'eepcookieconfig' => array(
              'cookie_expiration_time' => $cookie_config->get('cookie_duration'),
              'cookie_time_units' => $cookie_config->get('cookie_time_units')
           ),
           'bannerconfig' => array(
              'enabled' => $banner_config->get('enabled'),
              'banner_text' => $banner_config->get('banner_text')
           )
        );

        return new JsonResponse($configurations);
    }

}