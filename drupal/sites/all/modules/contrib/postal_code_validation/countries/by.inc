<?php

/**
 * @file
 * Postal code validation functions for Belarus.
 */

/**
 * Implements _postal_code_validation_validate_COUNTRYCODE().
 */
function _postal_code_validation_validate_BY($postal_code) {
  $return = array('country' => 'BY');
  if (preg_match('/^[0-9]{6}$/', $postal_code)) {
    $return['postal_code'] = $postal_code;
  }
  else {
    $return['error'] = t('Invalid postal code. Postal codes in Belarus are like "999999".');
  }
  return $return;
}
