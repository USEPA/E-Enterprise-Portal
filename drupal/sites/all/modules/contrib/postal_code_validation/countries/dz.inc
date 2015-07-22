<?php

/**
 * @file
 * Postal code validation functions for Algeria.
 */

/**
 * Implements _postal_code_validation_validate_COUNTRYCODE().
 */
function _postal_code_validation_validate_DZ($postal_code) {
  $return = array('country' => 'DZ');
  if (preg_match('/^(0[1-9]|[1-3][0-9]|4[0-8])[0-9]{3}$/', $postal_code)) {
    $return['postal_code'] = $postal_code;
  }
  else {
    $return['error'] = t('Invalid postal code. Postal codes in Algeria are like "99999" and start with a number between "01" and "48".');
  }
  return $return;
}
