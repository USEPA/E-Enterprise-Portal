<?php
/**
 * Created by PhpStorm.
 * User: mculpepp
 * Date: 1/7/2019
 * Time: 8:17 AM
 */

namespace Drupal\api_favorite_links\Plugin\rest\resource;

use Drupal\rest\Plugin\ResourceBase;
use Drupal\rest\ResourceResponse;
use Drupal\user\Entity\User;

/**
 * Provides a Favorite Links Resource
 *
 * @RestResource(
 *   id = "favorite_links_resource",
 *   label = @Translation("Favorite Links Resource"),
 *   uri_paths = {
 *     "canonical" = "/api/favorite_links"
 *   }
 * )
 */
class FavoriteLinksResource extends ResourceBase {

  /**
   * Responds to entity GET requests.
   * @return \Drupal\rest\ResourceResponse
   */
  public function get() {

    $user = User::load(1);
    $response = $user->get('field_favorite_links')->getValue();
    return new ResourceResponse($response);
  }

}