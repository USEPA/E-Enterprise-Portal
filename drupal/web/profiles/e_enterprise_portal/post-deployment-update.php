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

/*
use Drupal\Core\DrupalKernel;
use Symfony\Component\HttpFoundation\Request;

$autoloader = require_once DRUPAL_DIR . '/autoload.php';
$request = Request::createFromGlobals();
$kernel = DrupalKernel::createFromRequest($request, $autoloader, 'prod');
$kernel->boot();

require_once DRUPAL_DIR . '/core/includes/database.inc';
require_once DRUPAL_DIR . '/core/includes/schema.inc';*/

// Other Variables
$cwd = getcwd();
$newline = "\n\r";

// Other Actions

// The sqlsrv module is actually a database driver for Drupal 8. We need to
// remove it from the contrib folder. It is not a true module and breaks
// Drupal 8.
echo "post-deployment-update.php: " . $cwd . $newline;
echo "== Apply Patches to Drupal Core ==" . $newline;
try {
  echo exec("git apply ../patches/sqlserver-remove-idkey-from-update.patch --directory=core/lib --recount --verbose");
}
catch (Exception $e) {
  echo $e->getMessage() . $newline;
  echo "== Errors while apply patches to Drupal Core ==" . $newline;
}
echo $newline;