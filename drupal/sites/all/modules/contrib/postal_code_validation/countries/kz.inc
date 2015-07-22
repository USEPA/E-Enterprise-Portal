<?php

/**
 * @file
 * Postal code validation functions for Kazakhstan.
 */

/**
 * Implements _postal_code_validation_validate_COUNTRYCODE().
 */
function _postal_code_validation_validate_KZ($postal_code) {
  $return = array('country' => 'KZ');
  if (preg_match('/^[01][0-9]{5}$/', $postal_code)) {
    $return['postal_code'] = $postal_code;
  }
  else {
    $return['error'] = t('Invalid postal code. Postal codes in Kazakhstan are like "999999" and must start with 0 or 1.');
  }
  return $return;
}
