<?php

namespace Drupal\eep_my_reporting;

use \SoapClient;


class SOAPHandler {

  function connectToSOAPServerWithWSDL($wsdl, $location = "") {
    $soap_obj = new \stdClass();
    try {
      $client = new SoapClient($wsdl,
        array(
          "trace" => 1,
          'exceptions' => 1,
          "stream_context" => stream_context_create(
            array(
              'ssl' => array(
                'verify_peer' => FALSE,
                'verify_peer_name' => FALSE,
              )
            )
          )
        ));
      $soap_obj->client = $client;
      $soap_obj->error = FALSE;
    } catch (SoapFault $f) {
      $soap_obj->error = TRUE;
    }
    return $soap_obj;
  }

  /**
   * @param $client WSDL file
   * @param $service
   * @param $params
   * @param $location (for debugging)
   * @return bool
   */
  function callSOAPWithParams($client, $service, $params, $location = "") {
    $soap_obj = new \stdClass();
    try {
      $response = $client->__soapCall($service, array($params));
      $soap_obj->response = $response;
      $soap_obj->error = FALSE;
    } catch (SoapFault $f) {
      $soap_obj->error = TRUE;
    }
    return $soap_obj;
  }

}
