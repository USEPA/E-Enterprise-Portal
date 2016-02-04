<?php

/**
 * @file
 * Postal code validation functions for Hungary.
 */

/**
 * Implements _postal_code_validation_validate_COUNTRYCODE().
 */
function _postal_code_validation_validate_HU($postal_code) {
  $return = array('country' => 'HU');
  if (preg_match('/^[1-9][0-9]{3}$/', $postal_code)) {
    $return['postal_code'] = $postal_code;
  }
  else {
    $return['error'] = t('Invalid postal code. Postal codes in Hungary are like "9999" and never start with zero.');
  }
  return $return;
}
