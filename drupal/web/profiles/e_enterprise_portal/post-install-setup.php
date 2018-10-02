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

define('DRUPAL_DIR', __DIR__ .'/../drupal');
/*
use Drupal\Core\DrupalKernel;
use Symfony\Component\HttpFoundation\Request;

$autoloader = require_once DRUPAL_DIR . '/autoload.php';
$request = Request::createFromGlobals();
$kernel = DrupalKernel::createFromRequest($request, $autoloader, 'prod');
$kernel->boot();

require_once DRUPAL_DIR . '/core/includes/database.inc';
require_once DRUPAL_DIR . '/core/includes/schema.inc';*/

// Other Actions

$cwd = getcwd();
// echo exec("$cwd/web/themes/custom/eep/npm install bootstrap@^4.0");
// echo "\r\n";

// Update the CSS in the theme
echo "post-install-setup.php: " . $cwd . "\n\r";
echo exec("rmdir .\web\modules\contrib\sqlsrv /s /q");
echo "\r\n";