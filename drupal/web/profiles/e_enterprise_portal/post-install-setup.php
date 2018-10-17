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

// Actions

// Need to apply a git patch to drupal core
echo "== Apply Patches to Drupal Core == " . $cwd . $newline;
try {
  echo exec("git apply ../patches/sqlserver-remove-idkey-from-update.patch --directory=core/lib --recount --verbose");
}
catch (Exception $e) {
  echo $e->getMessage() . $newline;
  echo "== Errors while apply patches to Drupal Core ==" . $newline;
}
echo $newline;

// Need npmto apply a git patch to drupal core
echo "== Vue build == " . $cwd . $newline;
try {
  echo exec("npm run build --prefix ../../app/");
}
catch (Exception $e) {
  echo $e->getMessage() . $newline;
  echo "== Errors while apply patches to Drupal Core ==" . $newline;
}
echo $newline;