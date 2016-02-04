<?php

/**
 * @file
 * Postal code validation functions for Switzerland.
 */

/**
 * Implements _postal_code_validation_validate_COUNTRYCODE().
 */
function _postal_code_validation_validate_CH($postal_code) {
  $return = array('country' => 'CH');
  if (preg_match('/^[0-9]{4}$/', $postal_code)) {
    $return['postal_code'] = $postal_code;
  }
  else {
    $return['error'] = t('Invalid postal code. Postal codes in Switzerland are like "9999".');
  }
  return $return;
}
