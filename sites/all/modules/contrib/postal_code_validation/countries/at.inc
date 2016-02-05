<?php

/**
 * @file
 * Postal code validation functions for Austria.
 */

/**
 * Implements _postal_code_validation_validate_COUNTRYCODE().
 */
function _postal_code_validation_validate_AT($postal_code) {
  $return = array('country' => 'AT');
  if (preg_match('/^[0-9]{4}$/', $postal_code)) {
    $return['postal_code'] = $postal_code;
  }
  else {
    $return['error'] = t('Invalid postal code. Postal codes in Austria are like "9999".');
  }
  return $return;
}
