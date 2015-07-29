<?php

/**
 * @file
 * Postal code validation functions for Sweden.
 */

/**
 * Implements _postal_code_validation_validate_COUNTRYCODE().
 */
function _postal_code_validation_validate_SE($postal_code) {
  $return = array('country' => 'SE');
  if (preg_match('/^([1-9][0-9]{2}) ?([0-9]{2})$/', $postal_code, $matches)) {
    $return['postal_code'] = $matches[1] . ' ' . $matches[2];
  }
  else {
    $return['error'] = t('Invalid postcode. Postcodes in Sweden are like "999 99" and never start with zero.');
  }
  return $return;
}
