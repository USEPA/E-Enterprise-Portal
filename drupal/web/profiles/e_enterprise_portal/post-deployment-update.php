<?php
/**
 * Created by PhpStorm.
 * User: smolinsk
 * Date: 8/14/2018
 * Time: 1:28 PM
 */

/**
 * Bootstrapping Drupal
 */

define('STARTING_DIR', __DIR__);
chdir(__DIR__ .'../../..');
define('DRUPAL_WEB_DIR', getcwd());
define('EEP_PROFILE_DIR', DRUPAL_WEB_DIR . '/profiles/e_enterprise_portal');

use Drupal\Core\DrupalKernel;
use Symfony\Component\HttpFoundation\Request;
require_once DRUPAL_WEB_DIR . '/core/includes/database.inc';
require_once DRUPAL_WEB_DIR . '/core/includes/module.inc';
require_once DRUPAL_WEB_DIR . '/core/includes/theme.inc';
require_once DRUPAL_WEB_DIR . '/core/includes/schema.inc';
require_once DRUPAL_WEB_DIR . '/core/modules/system/system.module';

// Specify relative path to the drupal root.
$autoloader = require_once DRUPAL_WEB_DIR . '/autoload.php';

$request = Request::createFromGlobals();

// Bootstrap drupal to different levels
$kernel = DrupalKernel::createFromRequest($request, $autoloader, 'prod');
$kernel->boot();

// Other Variables
$cwd = getcwd();
$newline = "\n\r";

// Other Actions
echo "Stared";

require_once EEP_PROFILE_DIR . '/import-content.php';

echo "Finished";