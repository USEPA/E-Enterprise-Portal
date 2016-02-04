<?php

/**
 * @file
 * Postal code validation functions for Brazil.
 */

/**
 * Implements _postal_code_validation_validate_COUNTRYCODE().
 */
function _postal_code_validation_validate_BR($postal_code) {
  $return = array('country' => 'BR');
  if (preg_match('/^([0-9]{5})-?([0-9]{3})$/', $postal_code, $matches)) {
    $return['postal_code'] = $matches[1] . '-' . $matches[2];
  }
  else {
    $return['error'] = t('Invalid postal code. Postal codes in Brazil are like "99999-999".');
  }
  return $return;
}
