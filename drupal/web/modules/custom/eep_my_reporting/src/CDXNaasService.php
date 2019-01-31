<?php

namespace Drupal\eep_my_reporting;

use Drupal\eep_my_reporting\SOAPHandler;


class CDXNaasService {
  protected $params;
  protected $client;
  protected $token;
  protected $wsdl;
  /**
   * $token_generation_method: String method to pass to SOAP service.
   */
  protected $token_generation_method;
  /** $token_access_name: Services return tokens with different keys.
  This allows children classes to set their own access parameter. **/
  protected $token_access_name;

  /**
   * Generates SOAP request with passed in method name.
   * @param $method_name
   * @return bool
   */
  protected function call_service_method($method_name) {
    $soap_handler = new SOAPHandler();
    $soap_service_object = $soap_handler->callSOAPWithParams($this->client,
      $method_name,
      $this->params,
      get_class($this));
    if (!$soap_service_object->error) {
      $return = $soap_service_object->response;
    }
    else {
      $return = FALSE;
    }
    return $return;
  }

  protected function generate_token() {
    $service_response = $this->call_service_method($this->token_generation_method);
    if ($service_response) {
      $this->token = $service_response->{$this->token_access_name};
    }
    else {
      $this->token = FALSE;
    }
  }


  public function return_token() {
    return $this->token;
  }

}