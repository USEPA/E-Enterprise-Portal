<?php

/**
 * @file
 * Postal code validation functions for Estonia.
 */

/**
 * Implements _postal_code_validation_validate_COUNTRYCODE().
 */
function _postal_code_validation_validate_EE($postal_code) {
  $return = array('country' => 'EE');
  if (preg_match('/^[0-9]{5}$/', $postal_code)) {
    $return['postal_code'] = $postal_code;
  }
  else {
    $return['error'] = t('Invalid postal code. Postal codes in Estonia are like "99999".');
  }
  return $return;
}
