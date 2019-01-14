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
        // query to grab all of the content type node ids from drupal
        $node_ids = \Drupal::entityQuery('node')
        ->condition('status', 1)
        ->condition('type', 'authentication_option')
        ->execute();

        $nodes = \Drupal\node\Entity\Node::loadMultiple($node_ids);

        $response = ['message' => $nodes];

        return new ResourceResponse($response);
    }

}