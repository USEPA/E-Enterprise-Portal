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
 *     "canonical" = "/api/login_page"
 *   }
 * )
 */
class LoginResource extends ResourceBase
{

    /**
     * Responds to entity GET requests.
     * @return \Drupal\rest\LoginResource
     */
    public function get(){
        //Declare variables
        $formatted_node_array = [];

        // Query drupal to grab all of the content type node ids
        $node_ids = \Drupal::entityQuery('node')
            ->condition('status', 1)
            ->condition('type', 'authentication_option')
            ->execute();

        // Fetch all of the nodes by the node ids
        $nodes = \Drupal\node\Entity\Node::loadMultiple($node_ids);

        // Query Drupal to get all terms for given vocabulary
        $terms = \Drupal::entityTypeManager()->getStorage('taxonomy_term')->loadTree('authentication_category');


        // Loop through the nodes to format the json out properly
        foreach ($nodes as $node) {
            $target_id = $node->field_authentication_category[0]->get('target_id')->getValue();
            $formatted_node_array[] = [
                'title' => $node->title,
                'image_path' => $node->field_image_path,
                'urn' => $node->field_urn,
                'tax_category' => $this->get_taxonomy_for_given_id($terms, $target_id),
            ];
        }
        return new ResourceResponse(['message' => $formatted_node_array]);
    }

    private function get_taxonomy_for_given_id($terms, $node_tax_id){
        // Declare variables
        $associated_term = "";

        // Loop through all terms to find the right name for the given id
        foreach ($terms as $term) {
            if ($term->tid == $node_tax_id) {
                $associated_term = $term->name;
            }
        }
        return $associated_term;
    }

}