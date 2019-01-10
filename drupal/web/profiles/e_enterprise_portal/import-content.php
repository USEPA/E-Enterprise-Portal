<?php
/**
 * Created by PhpStorm.
 * User: smolinsk
 * Date: 12/19/2018
 * Time: 6:30 PM
 */

use Drupal\node_import_export\NodeManager;

require_once DRUPAL_WEB_DIR . '/core/modules/search/search.module';
require_once DRUPAL_WEB_DIR . '/core/modules/node/node.module';

$default_content_paths = [
  'modules/custom/eep_proxy_service/content/be-well-informed-service.json',
  'modules/custom/eep_proxy_service/content/location-service.json',
  'modules/custom/eep_proxy_service/content/geolocation.json',
  'modules/custom/eep_proxy_service/content/village-green.json',
];

foreach ($default_content_paths as $path) {
  NodeManager::getNodesFromFile($path);
}