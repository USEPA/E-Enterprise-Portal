<?php

/**
 * @file
 * Postal code validation functions for Portugal.
 */

/**
 * Implements _postal_code_validation_validate_COUNTRYCODE().
 */
function _postal_code_validation_validate_PT($postal_code) {
  $return = array('country' => 'PT');
  if (preg_match('/^([1-9][0-9]{3})-?([0-9]{3})$/', $postal_code, $matches)) {
    $return['postal_code'] = $matches[1] . '-' . $matches[2];
  }
  else {
    $return['error'] = t('Invalid postal code. Postal codes in Portugal are like "9999-999" and never start with zero.');
  }
  return $return;
}
