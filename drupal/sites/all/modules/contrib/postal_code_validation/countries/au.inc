<?php

/**
 * @file
 * Postal code validation functions for Australia.
 */

/**
 * Implements _postal_code_validation_validate_COUNTRYCODE().
 */
function _postal_code_validation_validate_AU($postal_code) {
  $return = array('country' => 'AU');
  if (preg_match('/^(0[289][0-9]{2}|[13-689][0-9]{3}|2[0-8][0-9]{2}|290[0-9]|291[0-4]|7[0-4][0-9]{2}|7[89][0-9]{2})$/', $postal_code)) {
    $return['postal_code'] = $postal_code;
    switch ($postal_code) {
      case '2899':
        $return['country'] = 'NF';
        break;

      case '6798':
        $return['country'] = 'CX';
        break;

      case '6799':
        $return['country'] = 'CC';
        break;
    }
  }
  else {
    $return['error'] = t('Invalid postcode. Postcodes in Australia are like "9999".');
  }
  return $return;
}
