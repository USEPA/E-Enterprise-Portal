<?php
/**
 * Created by PhpStorm.
 * User: bmatkin
 * Date: 3/11/2016
 * Time: 10:00 AM
 */

/*TODO
 * Get api version from drupal configs
 *
 */
define("API_VERSION", '1.0');
define("API_HOST", current_server());
define ("BASE_PATH", "/api/" . API_VERSION);
define("HTTP_SETTING", isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] != 'off' ? 'https' : 'http');