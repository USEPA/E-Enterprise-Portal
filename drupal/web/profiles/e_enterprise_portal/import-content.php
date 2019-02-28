<?php
/**
 * Created by PhpStorm.
 * User: smolinsk
 * Date: 12/19/2018
 * Time: 6:30 PM
 */

use Drupal\node_import_export\NodeManager;
use Drupal\node_import_export\NodeImport;

require_once DRUPAL_WEB_DIR . '/core/modules/search/search.module';
require_once DRUPAL_WEB_DIR . '/core/modules/node/node.module';

$default_content_paths = [
  'modules/custom/eep_proxy_service/content/be-well-informed-service.json',
  'modules/custom/eep_proxy_service/content/location-service.json',
  'modules/custom/eep_proxy_service/content/geolocation.json',
  'modules/custom/eep_proxy_service/content/village-green.json',
  'profiles/e_enterprise_portal/content/page-faqs.json',
  'profiles/e_enterprise_portal/content/page-about-eep.json',
  'profiles/e_enterprise_portal/content/wapp-be-well-informed.json',
  'profiles/e_enterprise_portal/content/wapp-favorite-links.json',
  'profiles/e_enterprise_portal/content/wapp-my-reporting.json',
  'profiles/e_enterprise_portal/content/wapp-trending-air.json',
  'profiles/e_enterprise_portal/content/app-content-be-well-informed-maincard.json',
  'profiles/e_enterprise_portal/content/app-content-favorite-links-maincard.json',
  'profiles/e_enterprise_portal/content/app-content-my-reporting-maincard.json',
];

foreach ($default_content_paths as $path) {
  NodeImport::importNode($path);
}
