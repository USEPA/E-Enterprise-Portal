<?php

/**
 * @file
 * Postal code validation functions for Egypt.
 */

/**
 * Implements _postal_code_validation_validate_COUNTRYCODE().
 */
function _postal_code_validation_validate_EG($postal_code) {
  $return = array('country' => 'EG');
  if (preg_match('/^[0-9]{5}$/', $postal_code)) {
    $return['postal_code'] = $postal_code;
  }
  else {
    $return['error'] = t('Invalid postal code. Postal codes in Egypt are like "99999".');
  }
  return $return;
}
