<?php

/**
 * @file
 * Postal code validation functions for Chile.
 */

/**
 * Implements _postal_code_validation_validate_COUNTRYCODE().
 */
function _postal_code_validation_validate_CL($postal_code) {
  $return = array('country' => 'CL');
  if (preg_match('/^([1-9][0-9]{2})-?([0-9]{4})$/', $postal_code, $matches)) {
    $return['postal_code'] = $matches[1] . '-' . $matches[2];
  }
  else {
    $return['error'] = t('Invalid postal code. Postal codes in Chile are like "999-9999" and never start with zero.');
  }
  return $return;
}
