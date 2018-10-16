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
define('DRUPAL_DIR', getcwd());
define('EEP_PROFILE_DIR', DRUPAL_DIR . 'profiles/e_enterprise_portal');

use Drupal\Core\DrupalKernel;
use Symfony\Component\HttpFoundation\Request;
require_once DRUPAL_DIR . '/core/includes/database.inc';
require_once DRUPAL_DIR . '/core/includes/module.inc';
require_once DRUPAL_DIR . '/core/includes/theme.inc';
require_once DRUPAL_DIR . '/core/includes/schema.inc';
require_once DRUPAL_DIR . '/core/modules/system/system.module';

// Specify relative path to the drupal root.
$autoloader = require_once DRUPAL_DIR . '/autoload.php';

$request = Request::createFromGlobals();

// Bootstrap drupal to different levels
$kernel = DrupalKernel::createFromRequest($request, $autoloader, 'prod');
$kernel->boot();

// Other Variables
$cwd = getcwd();
$newline = "\n\r";

// Other Actions

// The sqlsrv module is actually a database driver for Drupal 8. We need to
// remove it from the contrib folder. It is not a true module and breaks
// Drupal 8.
echo "post-drupal-install-setup.php: " . $cwd . $newline;
echo "== Removing sqlsrv module ==$newline";
try {
  echo exec("rmdir .\modules\contrib\sqlsrv /s /q");
  echo "== Successfully removing sqlsrv module ==" . $newline;
}
catch (Exception $e) {
  echo $e->getMessage() . $newline;
  echo "== Failed to removed sqlsrv module ==" . $newline;
}
echo $newline;


// Get the list of installed modules and enable the Supercache and Wincache
// if they are not already enabled
try {
  $moduleHandler = Drupal::service('module_handler');
  if (!$moduleHandler->moduleExists('supercache')){
    Drupal::service('module_installer')->install(['supercache']);
    // Code Here
  }
  if (!$moduleHandler->moduleExists('wincachedrupal')){
    Drupal::service('module_installer')->install(['wincachedrupal']);
    // Code Here
  }
  echo "== Successfully enabled Supercache and Wincache modules ==" . $newline;
}
catch (Exception $e) {
  echo $e->getMessage() . $newline;
  echo "== Failed to enable Supercache and Wincache modules ==" . $newline;
}
echo $newline;

