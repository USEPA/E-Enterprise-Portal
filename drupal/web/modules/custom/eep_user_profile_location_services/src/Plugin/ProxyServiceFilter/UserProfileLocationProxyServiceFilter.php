<?php

namespace Drupal\eep_user_profile_location_services\Plugin\ProxyServiceFilter;


use Drupal\eep_core\Helpers\ArrayHelper;
use Drupal\eep_proxy_service\Plugin\ProxyServiceFilterBase;
use GuzzleHttp\Client;
use GuzzleHttp\Psr7\Stream;
use GuzzleHttp\Psr7\Request;
use GuzzleHttp\Psr7\Response;

/**
 * Created by PhpStorm.
 * User: rbeach
 * Date: 2/13/2019
 * Time: 12:31 PM
 */
class UserProfileLocationProxyServiceFilter extends ProxyServiceFilterBase {

    /**
     * MUST override this function to prevent the default behavior
     *
     * @return mixed
     */
     public function prefetch(){
         return $this->request;
     }

    /**
     * @return \GuzzleHttp\Psr7\Response
     */
    public function fetch() {
        $query = $this->getIncomingRequest()->query->all();

    }



}