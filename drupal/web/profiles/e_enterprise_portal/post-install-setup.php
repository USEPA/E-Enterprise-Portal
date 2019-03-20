<?php
/**
 * Created by PhpStorm.
 * User: smolinsk
 * Date: 10/16/2018
 * Time: 4:28 PM
 */

/**
 * Bootstrapping Drupal
 */

define('STARTING_DIR', __DIR__);
chdir(__DIR__ .'../../..');
define('DRUPAL_DIR', getcwd());
define('EEP_PROFILE_DIR', DRUPAL_DIR . 'profiles/e_enterprise_portal');

// Other Variables
$cwd = getcwd();
$newline = "\n\r";


// Need npmto apply a git patch to drupal core
echo "== Vue build == " . $cwd . $newline;
try {
  echo exec("npm run build --prefix ../../app/ --loglevel verbose");
}
catch (Exception $e) {
  echo $e->getMessage() . $newline;
  echo "== Errors while apply patches to Drupal Core ==" . $newline;
}
echo $newline;

