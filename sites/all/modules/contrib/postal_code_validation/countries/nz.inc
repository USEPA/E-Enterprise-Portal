<?php

/**
 * @file
 * Postal code validation functions for New Zealand.
 */

/**
 * Implements _postal_code_validation_validate_COUNTRYCODE().
 */
function _postal_code_validation_validate_NZ($postal_code) {
  $return = array('country' => 'NZ');
  if (preg_match('/^[0-9]{4}$/', $postal_code)) {
    $return['postal_code'] = $postal_code;
  }
  else {
    $return['error'] = t('Invalid postcodes. Postcodes in New Zealand are like "9999".');
  }
  return $return;
}
