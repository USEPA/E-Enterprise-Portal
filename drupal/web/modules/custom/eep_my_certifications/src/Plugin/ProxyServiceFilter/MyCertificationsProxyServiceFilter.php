<?php

namespace Drupal\eep_my_certifications\Plugin\ProxyServiceFilter;

use Drupal\eep_proxy_service\Plugin\ProxyServiceFilterBase;
use Drupal\eep_my_reporting\SOAPHandler;


/**
 * Class MyCertificationsProxyServiceFilter
 *
 * @ProxyServiceFilter(
 *   id = "my-certifications",
 *   label = @Translation("My Certifications Filter")
 * )
 *
 * @package Drupal\eep_core\Plugin\ProxyServiceFilter
 */
class MyCertificationsProxyServiceFilter extends ProxyServiceFilterBase {

}
/*// Create new SOAPHandler
$soapHandler = new SOAPHandler();
// Connect to EACTIVITY
$wsdl = variable_get('eactivity_auth_reg_wsdl');
// Create Connection to SOAP Server
$client1 = $soapHandler->connectToSOAPServerWithWSDL($wsdl, "Eenterprise Bridge Auth");
$params1 = array(
    "userId" => variable_get('eactivity_auth_reg_username'),
    "credential" => variable_get('eactivity_auth_reg_password'),
    "domain" => variable_get('eactivity_auth_reg_domain'),
    "authenticationMethod" => variable_get('eactivity_auth_reg_auth_method'),
);
$response1 = $soapHandler->callSOAPWithParams($client1, "Authenticate", $params1, "Eenterprise Bridge Auth");
$client2 = $soapHandler->connectToSOAPServerWithWSDL($wsdl, "Eenterprise Bridge Auth");

if ($client2->error) {
    return array("error" => TRUE, "msg" => $client2->msg);
}

$client2 = $client2->client;

$params2 = array(
    "securityToken" => $response1->securityToken,
    "dataflow" => "E-ACTIVITY",
    "request" => "GetByUser",
    "rowId" => 0,
    "maxRows" => -1,
    "parameters" => array(
      "_" => strtoupper($cdx_username),
      "parameterEncoding" => "None",
      "parameterName" => "user"
    ),
);
$response2 = $soapHandler->callSOAPWithParams($client2, "Query", $params2, "Eenterprise Bridge Auth");

$response = simplexml_load_string($response2);*/

