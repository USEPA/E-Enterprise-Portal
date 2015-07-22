<?php

/**
 * @file
 * Postal code validation functions for Japan.
 */

/**
 * Implements _postal_code_validation_validate_COUNTRYCODE().
 */
function _postal_code_validation_validate_JP($postal_code) {
  $return = array('country' => 'JP');
  if (preg_match('/^([0-9]{3})-?([0-9]{4})$/', $postal_code, $matches)) {
    $return['postal_code'] = $matches[1] . '-' . $matches[2];
  }
  else {
    $return['error'] = t('Invalid postal code. Postal codes in Japan are like "999-9999".');
  }
  return $return;
}
