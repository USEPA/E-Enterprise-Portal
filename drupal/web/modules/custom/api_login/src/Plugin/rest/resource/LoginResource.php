<?php

/**
 * Created by PhpStorm.
 * User: rbeach
 * Date: 1/11/2019
 * Time: 12:09 PM
 */

namespace Drupal\api_login\Plugin\rest\resource;

use Drupal\rest\Plugin\ResourceBase;
use Drupal\rest\ResourceResponse;

/**
 * Provides a Favorite Links Resource
 *
 * @RestResource(
 *   id = "api_login_resource",
 *   label = @Translation("Login Resource"),
 *   uri_paths = {
 *     "canonical" = "/api/api_login"
 *   }
 * )
 */
class LoginResource extends ResourceBase {

    /**
     * Responds to entity GET requests.
     * @return \Drupal\rest\LoginResource
     */
    public function get() {
        // modify here

        return new ResourceResponse($response);
    }

}