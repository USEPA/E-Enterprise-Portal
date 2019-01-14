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
class LoginResource extends ResourceBase
{

    /**
     * Responds to entity GET requests.
     * @return \Drupal\rest\LoginResource
     */
    public function get()
    {
        //Declare variables
        $formatted_node_array = [];

        // Query drupal to grab all of the content type node ids
        $node_ids = \Drupal::entityQuery('node')
            ->condition('status', 1)
            ->condition('type', 'authentication_option')
            ->execute();

        // Fetch all of the nodes by the node ids
        $nodes = \Drupal\node\Entity\Node::loadMultiple($node_ids);

        // Loop through the nodes to format the json out properly
        foreach ($nodes as $node) {
            $formatted_node_array[] = [
                'title' => $node->get('title')->getValue(),
                'image_path' => $node->get('field_image_path')->getValue(),
                'urn' => $node->get('field_urn')->getValue,
                'tax_category' => 'EPA'
            ];
        }

        //print_r($nodes);

        return new ResourceResponse(['message' => $formatted_node_array]);
    }

}