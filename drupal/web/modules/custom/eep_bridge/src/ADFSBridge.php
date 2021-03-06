<?php

namespace Drupal\eep_bridge;

/**
 * Handles the ADFS SignIn/SignOut/PRP handling.
 *
 * @license http://www.gnu.org/licenses/gpl-2.0.html
 *
 * Refer:
 *  http://code.google.com/p/simplesamlphp/source/browse/trunk/www/wsfed/sp/prp.php
 *   http://code.google.com/p/simplesamlphp/source/browse/trunk/www/wsfed/sp/initSSO.php
 *   http://code.google.com/p/simplesamlphp/source/browse/trunk/www/wsfed/sp/initSLO.php
 *   https://pamelaproject.com/svn/pw/pwcommon/trunk/vendorsrc/phpInfoCard/0.1.1-beta1/lib/rp.phpicprocessor.php
 */
class ADFSBridge {

  function getAdfsSignInResponse($adfsConf, $wresult) {
    // Validate configuration
    // If certificate content is provided, don't try to load from file.
    if ($adfsConf->encryptionCertData == '') {
      if ($adfsConf->encryptionCertPath != '') {
        $encryptionCertData = file_get_contents($adfsConf->encryptionCertPath);
        if ($encryptionCertData === FALSE) {
          $exception_msg = 'Unable to load certificate file \'' . $adfsConf->encryptionCertPath . '\'.';
          \Drupal::logger('eep_bridge')->error($exception_msg);
          throw new \Exception($exception_msg);
        }
      }
    }
    else {
      $encryptionCertData = $adfsConf->encryptionCertData;
    }
    // Accommodate for MS-ADFS escaped quotes
    $wresult = str_replace('\"', '"', $wresult);

    // Load and parse the XML.
    $dom = new \DOMDocument();
    $dom->loadXML(str_replace("\r", "", $wresult));
    $xpath = new \DOMXpath($dom);
    $xpath->registerNamespace('wst', 'http://schemas.xmlsoap.org/ws/2005/02/trust');
    $xpath->registerNamespace('saml', 'urn:oasis:names:tc:SAML:1.0:assertion');
    $xpath->registerNamespace('saml2', 'urn:oasis:names:tc:SAML:2.0:assertion');
    $xpath->registerNamespace('xenc', 'http://www.w3.org/2001/04/xmlenc#');
    $xpath->registerNamespace('xdsig', 'http://www.w3.org/2000/09/xmldsig#');


    // Check for valid SAML peer
    if (\Drupal::state()->get('verify_saml_peer', 0)) {
      $saml_signature = $dom->getElementsByTagName('Signature')->item(0);
      if (!self::samlPeerVerified($saml_signature)) {
        $exception_msg = "Unable to verify peer sending request.";
        \Drupal::logger('eep_bridge')->error($exception_msg);
        throw new \Exception("Unable to verify peer sending request.");
      }
    }

    // Decrypts the xmlToken if it is encrypted, using the private key specified in the configuration.
    $decryptedToken = '';
    $decryptionFailed = FALSE;
    $rootElement = $xpath->query('/trust:RequestSecurityTokenResponseCollection/trust:RequestSecurityTokenResponse');
    $rootElement = $rootElement->item(0);
    if (preg_match('/EncryptedData/i', $rootElement->nodeName) > 0) {
      $topNode = $rootElement->firstChild;
      if (preg_match('/EncryptionMethod/i', $topNode->nodeName) > 0) {
        if ($blockAlgorithm = $topNode->getAttribute("Algorithm")) {
          switch ($blockAlgorithm) {
            case "http://www.w3.org/2001/04/xmlenc#aes256-cbc":
              $mcrypt_cipher = MCRYPT_RIJNDAEL_128;
              $mcrypt_mode = MCRYPT_MODE_CBC;
              $iv_length = 16;
              break;
            case "http://www.w3.org/2001/04/xmlenc#aes128-cbc":
              $mcrypt_cipher = MCRYPT_RIJNDAEL_128;
              $mcrypt_mode = MCRYPT_MODE_CBC;
              $iv_length = 16;
              break;
            default:
              $exception_msg = "Unknown encryption blockAlgorithm: " . $blockAlgorithm . ".";
              \Drupal::logger('eep_bridge')->error($exception_msg);
              throw new \Exception($exception_msg);
          }

          # Alg. has been determined, check to make sure an error hasn't been thrown, and proceed.
          if ($decryptionFailed == FALSE) {
            $topNode = $topNode->nextSibling;
            if (preg_match('/KeyInfo/i', $topNode->nodeName) > 0) {
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
                  $exception_msg = "Unrecognized keyWrapAlgorithm: " . $keyWrapAlgorithm . ".";
                  \Drupal::logger('eep_bridge')->error($exception_msg);
                  throw new \Exception($exception_msg);
              }
              if ($decryptionFailed == FALSE) {
                if ($cipherValueNodes = $topNode->getElementsByTagname("CipherValue")) {
                  $cipherValueNode = $cipherValueNodes->item(0);
                  $keyWrapCipher = $cipherValueNode->nodeValue;
                  $keyWrapCipher = base64_decode($keyWrapCipher);
                  $private_key = openssl_pkey_get_private($encryptionCertData, $adfsConf->encryptionCertCred);
                  if (!$private_key) {
                    $exception_msg = "Unable to load private key for decryption.";
                    \Drupal::logger('eep_bridge')->error($exception_msg);
                    throw new Exception($exception_msg);
                  }
                  else {
                    if (openssl_private_decrypt($keyWrapCipher, $blockCipherKey, $private_key, $ssl_padding)) {
                      openssl_free_key($private_key);
                      switch ($keyWrapAlgorithm) {
                        case "http://www.w3.org/2001/04/xmlenc#rsa-1_5":
                          $blockCipherKey = substr($blockCipherKey, 2);
                          $keystart = strpos($blockCipherKey, 0) + 1;
                          $blockCipherKey = substr($blockCipherKey, $keystart);
                          break;
                        default:
                          break;
                      }
                      $topNode = $topNode->nextSibling;
                      if (preg_match('/CipherData/i', $topNode->nodeName) > 0) {
                        if (!$cipherValueNodes = $topNode->getElementsByTagname("CipherValue")) {
                          $exception_msg = "No block cipher data found.";
                          \Drupal::logger('eep_bridge')->error($exception_msg);
                          throw new \Exception("No block cipher data found.");
                        }
                        else {
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
                            $exception_msg = "Decryption of token failed.";
                            \Drupal::logger('eep_bridge')
                              ->error($exception_msg);
                            throw new \Exception($exception_msg);
                          }
                        }
                      }
                      else {
                        $exception_msg = "Unable to locate cipher data.";
                        \Drupal::logger('eep_bridge')->error($exception_msg);
                        throw new \Exception($exception_msg);
                      }
                    }
                    else {
                      $exception_msg = "Unable to decrypt token, check private key configuration.";
                      \Drupal::logger('eep_bridge')->error($exception_msg);
                      throw new \Exception($exception_msg);
                    }
                  }
                }
                else {
                  $exception_msg = "No wrapping cipher found.";
                  \Drupal::logger('eep_bridge')->error($exception_msg);
                  throw new \Exception($exception_msg);
                }
              }
            }
            else {
              $exception_msg = "Unable to continue, keyInfo is not present.";
              \Drupal::logger('eep_bridge')->error($exception_msg);
              throw new \Exception($exception_msg);
            }
          }
        }
        else {
          $exception_msg = "Encryption method BlockAlgorithm not specified.";
          \Drupal::logger('eep_bridge')->error($exception_msg);
          throw new \Exception($exception_msg);
        }
      }
      else {
        $exception_msg = "Unable to determine Encryption method.";
        \Drupal::logger('eep_bridge')->error($exception_msg);
        throw new \Exception($exception_msg);
      }
    }
    else {
      if (isset($encryptionCertData)) {
        $exception_msg = "Unable to find encrypted data.";
        \Drupal::logger('eep_bridge')->error($exception_msg);
        throw new\Exception($exception_msg);
      }
    }
    // Get saml:Assertion element
    if ($decryptedToken != '') {
      $decryptedToken_dom = new DOMDocument();
      $decryptedToken = str_replace('\"', '"', $decryptedToken);
      $decryptedToken = str_replace("\r", "", $decryptedToken);
      $xml_end_index = strrpos($decryptedToken, ">");
      $decryptedToken = substr($decryptedToken, 0, $xml_end_index + 1);
      $decryptedToken_dom->loadXML($decryptedToken);

      // Change the Xpath.
      $xpath = new DOMXpath($decryptedToken_dom);
      $xpath->registerNamespace('wst', 'http://schemas.xmlsoap.org/ws/2005/02/trust');
      $xpath->registerNamespace('saml', 'urn:oasis:names:tc:SAML:1.0:assertion');
      $xpath->registerNamespace('xenc', 'http://www.w3.org/2001/04/xmlenc#');
      $assertion = $decryptedToken_dom->documentElement;
    }
    else {
      // Find the saml:Assertion element in the response.
      $assertions = $xpath->query('/trust:RequestSecurityTokenResponseCollection/trust:RequestSecurityTokenResponse/trust:RequestedSecurityToken/saml:Assertion');
      $saml = 'saml';
      if ($assertions->length === 0) {
        $exception_msg = 'Received an ADFS response without an assertion.';
        \Drupal::logger('eep_bridge')->error($exception_msg);
        throw new \Exception($exception_msg);
      }
      if ($assertions->length > 1) {
        $exception_msg = 'The WS-Fed PRP handler currently only supports a single assertion in a response.';
        \Drupal::logger('eep_bridge')->error($exception_msg);
        throw new \Exception($exception_msg);
      }
      $assertion = $assertions->item(0);
    }

    // Check time constraints of contitions (if present).
    foreach ($xpath->query('./' . $saml . ':Conditions', $assertion) as $condition) {
      $notBefore = $condition->getAttribute('NotBefore');
      $notOnOrAfter = $condition->getAttribute('NotOnOrAfter');
      if (!$this->checkCurrentTime($notBefore, $notOnOrAfter)) {
        // @todo we need better error responses to the API calls. It should still bubble up a JSON response.
        $exception_msg = 'The WS-Fed response has expired.';
        \Drupal::logger('eep_bridge')->error($exception_msg);
        throw new \Exception($exception_msg);
      }
    }
    // Create the user details response object.
    $userDetails = new AdfsUserDetails();
    if ($saml === 'saml') {
      // Extract the name identifier from the response.
      $nameid = $xpath->query('./' . $saml . ':AuthenticationStatement/' . $saml . ':Subject/' . $saml . ':SubjectConfirmation/' . $saml . ':ConfirmationMethod', $assertion);
      if ($nameid->length === 0) {
        $exception_msg = 'Could not find the name identifier in the response from the WS-Fed.';
        \Drupal::logger('eep_bridge')->error($exception_msg);
        throw new \Exception($exception_msg);
      }
      $userDetails->nameIdentifier = $nameid->item(0)->textContent;
      $userDetails->nameIdentifierFormat = $nameid->item(0)
        ->getAttribute('Format');
    }
    //*/ Extract the attributes from the response.
    $userDetails->attributes = [];
    $attributeValues = $xpath->query('./' . $saml . ':AttributeStatement/' . $saml . ':Attribute/' . $saml . ':AttributeValue', $assertion);

    //Extract a node from the result XML that contains the Authentication Method attribute and pass it to userDetails.
    $authMethodValues = $xpath->query('./' . $saml . ':AuthenticationStatement', $assertion);
    foreach ($authMethodValues as $authMethodValue) {
      $authMethod = $authMethodValue->getAttribute('AuthenticationMethod');
    }
    $userDetails->attributes['authenticationMethod'] = $authMethod;

    foreach ($attributeValues as $attribute) {
      if ($saml === 'saml') {
        $name = $attribute->parentNode->getAttribute('AttributeName');
      }
      else {
        $name = $attribute->parentNode->getAttribute('Name');
      }
      $value = $attribute->textContent;
      if (!array_key_exists($name, $userDetails->attributes)) {
        $userDetails->attributes[$name] = [];
      }
      array_push($userDetails->attributes[$name], $value);
    }
    return $userDetails;
  }

  /**
   * checkCurrentTime is from simpleSAMLphp Utilities
   *
   * Check to verify that the current time is between
   * the specified start and end boundary
   *
   * @param string $start time in SAML2 format
   * @param string $end time in SAML2 format
   *
   * @return boolean
   */
  function checkCurrentTime($start = NULL, $end = NULL) {
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
   * @param string $time The time to convert in SAML2 format
   *
   * @return string  $time converted to a unix timestamp.
   */
  function parseSAML2Time($time) {
    $matches = [];
    /* We use a very strict regex to parse the timestamp. */
    if (preg_match('/^(\\d\\d\\d\\d)-(\\d\\d)-(\\d\\d)' .
        'T(\\d\\d):(\\d\\d):(\\d\\d)(?:\\.\\d+)?Z$/D',
        $time, $matches) == 0
    ) {
      $exception_msg = 'Invalid SAML2 timestamp passed to' . ' parseSAML2Time: ' . $time;
      \Drupal::logger('eep_bridge')->error($exception_msg);
      throw new Exception($exception_msg);
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
    $ts = gmmktime($hour, $minute, $second, $month, $day, $year);
    return $ts;
  }

}
