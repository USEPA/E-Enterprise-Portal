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

    /**
     * MUST override this function to prevent the default behavior
     *
     * @return mixed
     */
    public function prefetch() {
        return $this->request;
    }

    /**
     * @return \GuzzleHttp\Psr7\Response
     */
    public function fetch() {
        // Set cdx_username
        $cdx_username = "EEPTest1";
        // Create new SOAPHandler
        $soapHandler = new SOAPHandler();
        // Connect to EACTIVITY
        $wsdl = 'http://devngn.epacdxnode.net/ngn-enws20/services/NetworkNode2ServiceConditionalMTOM?wsdl';
        // Create Connection to SOAP Server
        $client1 = $soapHandler->connectToSOAPServerWithWSDL($wsdl, "Eenterprise Bridge Auth");
        $params1 = array(
            "userId" => $cdx_username,
            "credential" => 'EepTest6789',
            "domain" => 'default',
            "authenticationMethod" => 'password',
        );
        $response1 = $soapHandler->callSOAPWithParams($client1, "Authenticate", $params1, "Eenterprise Bridge Auth");
        $client2 = $soapHandler->connectToSOAPServerWithWSDL($wsdl, "Eenterprise Bridge Auth");

        if ($client2->error) {
            $this->response = $client2->msg;
            return $this->response;
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

        $this->response = simplexml_load_string($response2);
        return $this->response;
    }

    /**
     * @param \GuzzleHttp\Psr7\Response $response
     *
     * @return \GuzzleHttp\Psr7\Response
     */
    public function postfetch() {
        return $this->response;
    }
}

