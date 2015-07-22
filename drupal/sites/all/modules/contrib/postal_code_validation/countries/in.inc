<?php

/**
 * @file
 * Postal code validation functions for India.
 */

/**
 * Implements _postal_code_validation_validate_COUNTRYCODE().
 */
function _postal_code_validation_validate_IN($postal_code) {
  $return = array('country' => 'IN');
  if (preg_match('/^([1-9][0-9]{2})-?([0-9]{3})$/', $postal_code, $matches)) {
    $return['postal_code'] = $matches[1] . '-' . $matches[2];
  }
  else {
    $return['error'] = t('Invalid PIN. Postal Index Numbers in India are like "999-999" and never start with zero.');
  }
  return $return;
}
