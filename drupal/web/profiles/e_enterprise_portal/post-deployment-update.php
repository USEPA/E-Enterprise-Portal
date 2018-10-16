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
define('EEP_THEME_DIR', DRUPAL_DIR . 'profiles/e_enterprise_portal');
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

// Update the CSS in the theme
chdir(EEP_THEME_DIR);
echo exec("gulp sass");