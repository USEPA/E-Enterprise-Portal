<?php

/**
 * @file
 * Postal code validation functions for Croatia.
 */

/**
 * Implements _postal_code_validation_validate_COUNTRYCODE().
 */
function _postal_code_validation_validate_HR($postal_code) {
  $return = array('country' => 'HR');
  if (preg_match('/^[1-5][0-9]{4}$/', $postal_code)) {
    $return['postal_code'] = $postal_code;
  }
  else {
    $return['error'] = t('Invalid postal code. Postal codes in Croatia are like "99999" and start with a number between 1 and 5.');
  }
  return $return;
}
