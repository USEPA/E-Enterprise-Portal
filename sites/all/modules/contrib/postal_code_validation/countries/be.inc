<?php

/**
 * @file
 * Postal code validation functions for Belgium.
 */

/**
 * Implements _postal_code_validation_validate_COUNTRYCODE().
 */
function _postal_code_validation_validate_BE($postal_code) {
  $return = array('country' => 'BE');
  if (preg_match('/^[1-9][0-9]{3}$/', $postal_code)) {
    $return['postal_code'] = $postal_code;
  }
  else {
    $return['error'] = t('Invalid postal code. Postal codes in Belgium are like "9999" and never start with zero.');
  }
  return $return;
}
