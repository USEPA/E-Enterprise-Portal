<?php
use Swagger\Swagger;
    require("/../vendor/autoload.php");
    drupal_add_http_header('Access-Control-Allow-Origin', "*");
    header('Content-Type: application/json');

    $swagger = \Swagger\scan($_SERVER['DOCUMENT_ROOT'] . '/sites/all/modules/custom/eenterprise_api'); ///drupal/sites/all/modules/custom/eenterprise_api/views-view--api-test-harness.tpl.php');
    echo $swagger;

    // Exit to avoid drupal loading its templates/framework
    exit();

