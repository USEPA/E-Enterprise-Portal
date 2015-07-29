<?php

/**
 * @file
 * Postal code validation functions for Germany.
 */

/**
 * Implements _postal_code_validation_validate_COUNTRYCODE().
 */
function _postal_code_validation_validate_DE($postal_code) {
  $return = array('country' => 'DE');
  if (preg_match('/^((?:0[1-46-9]\d{3})|(?:[1-357-9]\d{4})|(?:4[0-24-9]\d{3})|(?:6[013-9]\d{3}))$/', $postal_code)) {
    $return['postal_code'] = $postal_code;
  }
  else {
    $return['error'] = t('Invalid postal code. Postal codes in Germany are like "99999".');
  }
  return $return;
}
