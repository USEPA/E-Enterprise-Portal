<?php
/**
 * Handles the ADFS SignIn/SignOut/PRP handling.
 *  
 * @license http://www.gnu.org/licenses/gpl-2.0.html
 * 
 * Refer:
 *  http://code.google.com/p/simplesamlphp/source/browse/trunk/www/wsfed/sp/prp.php
 *  http://code.google.com/p/simplesamlphp/source/browse/trunk/www/wsfed/sp/initSSO.php
 *  http://code.google.com/p/simplesamlphp/source/browse/trunk/www/wsfed/sp/initSLO.php
 *  https://pamelaproject.com/svn/pw/pwcommon/trunk/vendorsrc/phpInfoCard/0.1.1-beta1/lib/rp.phpicprocessor.php
 */
class AdfsBridge {
    
    function redirectToAdfsSignInUrl($adfsConf, $context) {        
        header('Location: '. $this->getAdfsSignInUrl($adfsConf, $context));
    }
    
    function redirectToAdfsSignOutUrl($adfsConf, $context) {        
        header('Location: '. $this->getAdfsSignOutUrl($adfsConf, $context));
    }
    
    function getAdfsSignInUrl($adfsConf, $context) {
        return
            $adfsConf->adfsUrl.
            '?wa=wsignin1.0'.
            '&wct='.gmdate('Y-m-d\TH:i:s\Z', time()).
            '&wtrealm='. $adfsConf->spIdentifier.
            '&wctx='. $context;
    }
    
    function getAdfsSignOutUrl($adfsConf, $context) {
        return
            $adfsConf->adfsUrl.
            '?wa=wsignout1.0'.
            '&wct='.gmdate('Y-m-d\TH:i:s\Z', time()).
            '&wtrealm='. $adfsConf->spIdentifier.
            '&wctx='. $context;
    }
    
    function getAdfsSignInResponse($adfsConf, $wresult) {
        // TODO: Validate input
        // Validate configuration. If certificate content is provided, don't try to load from file.
        validate_certificate_config($adfsConf, $encryptionCertData);

        // Accommodate for MS-ADFS escaped quotes
        $wresult = str_replace('\"', '"', $wresult);

        // Load and parse the XML.
        $dom = new DOMDocument();
            $dom->loadXML(str_replace ("\r", "", $wresult));
        $xpath = new DOMXpath($dom);
        $xpath->registerNamespace('wst', 'http://schemas.xmlsoap.org/ws/2005/02/trust');
        $xpath->registerNamespace('saml', 'urn:oasis:names:tc:SAML:1.0:assertion');
            $xpath->registerNamespace('xenc', 'http://www.w3.org/2001/04/xmlenc#');

            // Decrypts the xmlToken if it is encrypted, using the private key specified in the configuration.
            $decryptedToken = '';
            $decryptionFailed = false;
            $rootElement = $xpath->query('/trust:RequestSecurityTokenResponseCollection/trust:RequestSecurityTokenResponse');
            $rootElement = $rootElement->item(0);
            if (preg_match('/EncryptedData/i', $rootElement->nodeName) > 0) {
                $topNode = $rootElement->firstChild;
                if (preg_match('/EncryptionMethod/i', $topNode->nodeName) > 0) {
                    if ($blockAlgorithm=$topNode->getAttribute("Algorithm") ) {
                        switch ($blockAlgorithm) {
                            case "http://www.w3.org/2001/04/xmlenc#aes256-cbc":
                            case "http://www.w3.org/2001/04/xmlenc#aes128-cbc":
                                $mcrypt_cipher = MCRYPT_RIJNDAEL_128;
                                $mcrypt_mode = MCRYPT_MODE_CBC;
                                $iv_length = 16;
                                break;
                            default:
                                throw new unknown_encryption_exception("Unknown encryption blockAlgorithm: ".$blockAlgorithm.".");
                        }

                        # Alg. has been determined, check to make sure an error hasn't been thrown, and proceed.
                        if(!$decryptionFailed) {
                            $topNode = $topNode->nextSibling;
                            if(preg_match('/KeyInfo/i', $topNode->nodeName) > 0) {
                                $encryptionMethods = $topNode->getElementsByTagname("EncryptionMethod");
                                $encryptionMethod = $encryptionMethods->item(0);
                                $keyWrapAlgorithm = $encryptionMethod->getAttribute("Algorithm");
                                switch ($keyWrapAlgorithm) {
                                    case "http://www.w3.org/2001/04/xmlenc#rsa-oaep-mgf1p":
                                        $ssl_padding = OPENSSL_PKCS1_OAEP_PADDING;
                                        break;
                                    case "http://www.w3.org/2001/04/xmlenc#rsa-1_5":
                                        $ssl_padding = OPENSSL_NO_PADDING;
                                        break;
                                    default:
                                        throw new keyWrap_algorithm_exception("Unrecognized keyWrapAlgorithm: ".$keyWrapAlgorithm.".");
                                }
                                if (!$decryptionFailed) {
                                    if ($cipherValueNodes = $topNode->getElementsByTagname("CipherValue") ) {
                                        $cipherValueNode = $cipherValueNodes->item(0);
                                        $keyWrapCipher = $cipherValueNode->nodeValue;
                                        $keyWrapCipher = base64_decode($keyWrapCipher);
                                        $private_key=openssl_pkey_get_private($encryptionCertData, $adfsConf->encryptionCertCred);
                                        if (!$private_key) {
                                            throw new private_key_load_exception("Unable to load private key for decryption.");
                                        } else {
                                            if (openssl_private_decrypt($keyWrapCipher, $blockCipherKey, $private_key, $ssl_padding) ) {
                                                openssl_free_key($private_key);
                                                if($keyWrapAlgorithm == "http://www.w3.org/2001/04/xmlenc#rsa-1_5") {
                                                        $blockCipherKey = substr($blockCipherKey, 2);
                                                        $keystart = strpos($blockCipherKey, 0) + 1;
                                                        $blockCipherKey = substr($blockCipherKey, $keystart);
                                                }
                                                $topNode = $topNode->nextSibling;
                                                if (preg_match('/CipherData/i', $topNode->nodeName) > 0) {
                                                    if (!$cipherValueNodes = $topNode->getElementsByTagname("CipherValue")) {
                                                        throw new block_cipher_exception("No block cipher data found.");
                                                    } else {
                                                        $cipherValueNode = $cipherValueNodes->item(0);
                                                        $blockCipher = $cipherValueNode->nodeValue;
                                                        $blockCipher = base64_decode($blockCipher);
                                                        if ($iv_length > 0) {
                                                            $mcrypt_iv = substr($blockCipher, 0, $iv_length);
                                                            $blockCipher = substr($blockCipher, $iv_length);
                                                        }
                                                        // Decrypt and get the token.
                                                        $decryptedToken = mcrypt_decrypt($mcrypt_cipher, $blockCipherKey, $blockCipher, $mcrypt_mode, $mcrypt_iv);
                                                        if (!$decryptedToken) {
                                                            throw new decryption_failure_exception("Decryption of token failed.");
                                                        }
                                                    }
                                                } else {
                                                    throw new unfound_cipher_exception("Unable to locate cipher data.");
                                                }
                                            } else {
                                                throw new private_key_config_exception("Unable to decrypt token, check private key configuration.");
                                            }
                                        }
                                    } else {
                                        throw new wrapping_cipher_exception("No wrapping cipher found.");
                                    }
                                }
                            } else {
                                throw new keyInfo_exception("Unable to continue, keyInfo is not present.");
                            }
                        }
                    } else {
                        throw new blockAlgorithm_specification_exception("Encryption method BlockAlgorithm not specified.");
                    }
                } else {
                    throw new encryption_determination_exception("Unable to determine Encryption method.");
                }
            } else {
                if(isset($encryptionCertData)) {
                    throw new unfound_data_exception("Unable to find encrypted data.");
                }
            }
            // Get saml:Assertion element
            get_element($decryptedToken, $xpath, $assertion);

        // Check time constraints of contitions (if present).
        foreach($xpath->query('./saml:Conditions', $assertion) as $condition) {
                $notBefore = $condition->getAttribute('NotBefore');
                $notOnOrAfter = $condition->getAttribute('NotOnOrAfter');
                if(!$this->checkCurrentTime($notBefore, $notOnOrAfter)) {
                    throw new expired_response_exception('The WS-Fed response has expired.');
                }
        }
            // Create the user details response object.
            $userDetails = new AdfsUserDetails();

        // Extract the name identifier from the response.
        $nameid = $xpath->query('./saml:AuthenticationStatement/saml:Subject/saml:SubjectConfirmation/saml:ConfirmationMethod', $assertion);
        if ($nameid->length === 0) {
                throw new unfound_identifier_exception('Could not find the name identifier in the response from the WS-Fed.');
        }
            $userDetails->nameIdentifier = $nameid->item(0)->textContent;
            $userDetails->nameIdentifierFormat = $nameid->item(0)->getAttribute('Format');
        //*/ Extract the attributes from the response.
        $userDetails->attributes = array();
        $attributeValues = $xpath->query('./saml:AttributeStatement/saml:Attribute/saml:AttributeValue', $assertion);
        foreach($attributeValues as $attribute) {
            $name = $attribute->parentNode->getAttribute('AttributeName');
            $value = $attribute->textContent;
            if(!array_key_exists($name, $userDetails->attributes)) {
                $userDetails->attributes[$name] = array();
            }
            array_push($userDetails->attributes[$name], $value);
	}
        variable_set('cdx_fmw_security_token', $userDetails->attributes['securityToken'][0]);
        variable_set('user_details', $userDetails);
        variable_set('userId', $userDetails->userId);

        return $userDetails;
    }

    function handleXmlError($errno, $errstr) {
        if ($errno==E_WARNING && (substr_count($errstr,"DOMDocument::loadXML()")>0)) {
            throw new DOMException($errstr);
        } else {
            return false;
        }
    }
    
    /**
     * checkCurrentTime is from simpleSAMLphp Utilities
     *
     * Check to verify that the current time is between
     * the specified start and end boundary
     *
     * @param string $start time in SAML2 format
     * @param string $end time in SAML2 format
     * @return boolean
     */
    function checkCurrentTime($start=NULL, $end=NULL) {
        $currentTime = time();
        if (!empty($start)) {
            $startTime = $this->parseSAML2Time($start);
            /* Allow for a 10 minute difference in Time */
            if (($startTime < 0) || (($startTime - 600) > $currentTime)) {
              return FALSE;
            }
        }
        if (!empty($end)) {
            $endTime = $this->parseSAML2Time($end);
            if (($endTime < 0) || ($endTime <= $currentTime)) {
              return FALSE;
            }
        }
        return TRUE;
    }
    
    /**
     * parseSAML2Time is from simpleSAMLphp Utilities
     *
     * This function converts a SAML2 timestamp on the form
     * yyyy-mm-ddThh:mm:ss(\.s+)?Z to a UNIX timestamp. The sub-second
     * part is ignored.
     *
     * Andreas comments:
     *  I got this timestamp from Shibboleth 1.3 IdP: 2008-01-17T11:28:03.577Z
     *  Therefore I added to possibliity to have microseconds to the format.
     * Added: (\.\\d{1,3})? to the regex.
     *
     *
     * @param string $time  The time to convert in SAML2 format
     * @return string  $time converted to a unix timestamp.
     */
    function parseSAML2Time($time) {
        $matches = array();
        /* We use a very strict regex to parse the timestamp. */
        if (preg_match('/^(\\d\\d\\d\\d)-(\\d\\d)-(\\d\\d)' .
                      'T(\\d\\d):(\\d\\d):(\\d\\d)(?:\\.\\d+)?Z$/D',
                      $time, $matches) == 0) {
        throw new invalid_timestamp_exception(
                'Invalid SAML2 timestamp passed to' .
                ' parseSAML2Time: ' . $time);
        }
        /* Extract the different components of the time from the
         * matches in the regex. intval will ignore leading zeroes
         * in the string.
         */
        $year = intval($matches[1]);
        $month = intval($matches[2]);
        $day = intval($matches[3]);
        $hour = intval($matches[4]);
        $minute = intval($matches[5]);
        $second = intval($matches[6]);
        /* We use gmmktime because the timestamp will always be given
         * in UTC.
         */
        return gmmktime($hour, $minute, $second, $month, $day, $year);
    }


}

// Validate configuration. If certificate content is provided, don't try to load from file.
function validate_certificate_config($adfsConf, &$encryptionCertData) {

  if ($adfsConf->encryptionCertData == '') {
    if ($adfsConf->encryptionCertPath != '') {
      $encryptionCertData = file_get_contents($adfsConf->encryptionCertPath);
      if($encryptionCertData === FALSE) {
        throw new certificate_handler_exception('Unable to load certificate file \'' . $adfsConf->encryptionCertPath . '\'.');
      }
    }
  } else {
    $encryptionCertData = $adfsConf->encryptionCertData;
  }
}

// Get saml:Assertion element
function get_element($decryptedToken, $xpath, &$assertion){

  if ($decryptedToken != '') {
    $decryptedToken_dom = new DOMDocument();
    $decryptedToken = str_replace('\"', '"', $decryptedToken);
    $decryptedToken = str_replace ("\r", "", $decryptedToken);
    $xml_end_index = strrpos($decryptedToken, ">");
    $decryptedToken = substr($decryptedToken, 0, $xml_end_index + 1);
    $decryptedToken_dom->loadXML($decryptedToken);

    // Change the Xpath.
    $xpath = new DOMXpath($decryptedToken_dom);
    $xpath->registerNamespace('wst', 'http://schemas.xmlsoap.org/ws/2005/02/trust');
    $xpath->registerNamespace('saml', 'urn:oasis:names:tc:SAML:1.0:assertion');
    $xpath->registerNamespace('xenc', 'http://www.w3.org/2001/04/xmlenc#');
    $assertion = $decryptedToken_dom->documentElement;
  } else {
    // Find the saml:Assertion element in the response.
    $assertions = $xpath->query('/trust:RequestSecurityTokenResponseCollection/trust:RequestSecurityTokenResponse/trust:RequestedSecurityToken/saml:Assertion');
    if ($assertions->length === 0) {
      throw new adfs_assertion_exception('Received an ADFS response without an assertion.');
    }
    if ($assertions->length > 1) {
      throw new adfs_response_exception('The WS-Fed PRP handler currently only supports a single assertion in a response.');
    }
    $assertion = $assertions->item(0);
  }
}

class certificate_handler_exception extends Exception {

  public function Error($error){
    return $error;
  }
}

class unknown_encryption_exception extends Exception {

  public function Error($error){
    return $error;
  }
}

class keyWrap_algorithm_exception extends Exception {

  public function Error($error){
    return $error;
  }
}

class private_key_load_exception extends Exception {

  public function Error($error){
    return $error;
  }
}

class block_cipher_exception extends Exception {

  public function Error($error){
    return $error;
  }
}

class decryption_failure_exception extends Exception {

  public function Error($error){
    return $error;
  }
}

class unfound_cipher_exception extends Exception {

  public function Error($error){
    return $error;
  }
}

class private_key_config_exception extends Exception {

  public function Error($error){
    return $error;
  }
}

class wrapping_cipher_exception extends Exception {

  public function Error($error){
    return $error;
  }
}

class keyInfo_exception extends Exception {

  public function Error($error){
    return $error;
  }
}

class blockAlgorithm_specification_exception extends Exception {

  public function Error($error){
    return $error;
  }
}

class encryption_determination_exception extends Exception {

  public function Error($error){
    return $error;
  }
}

class unfound_data_exception extends Exception {

  public function Error($error){
    return $error;
  }
}

class adfs_assertion_exception extends Exception {

  public function Error($error){
    return $error;
  }
}

class adfs_response_exception extends Exception {

  public function Error($error){
    return $error;
  }
}

class expired_response_exception extends Exception {

  public function Error($error){
    return $error;
  }
}

class unfound_identifier_exception extends Exception {

  public function Error($error){
    return $error;
  }
}

class invalid_timestamp_exception extends Exception {

  public function Error($error){
    return $error;
  }
}

?>