<?php

/**
 * @file
 * Postal code validation functions for Bangladesh.
 */

/**
 * Implements _postal_code_validation_validate_COUNTRYCODE().
 */
function _postal_code_validation_validate_BD($postal_code) {
  $return = array('country' => 'BD');
  if (preg_match('/^[0-9]{4}$/', $postal_code)) {
    $return['postal_code'] = $postal_code;
  }
  else {
    $return['error'] = t('Invalid postal code. Postal codes in Bangladesh are like "9999".');
  }
  return $return;
}
