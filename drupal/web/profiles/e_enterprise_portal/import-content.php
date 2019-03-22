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
    'profiles/e_enterprise_portal/content/all-content.json',
    'modules/custom/eep_proxy_service/content/my-certifications.json',
];

foreach ($default_content_paths as $path) {
  NodeImport::importNode($path);
}
