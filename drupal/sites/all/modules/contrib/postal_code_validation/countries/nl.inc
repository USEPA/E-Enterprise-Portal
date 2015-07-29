<?php

/**
 * @file
 * Postal code validation functions for Netherlands.
 */

/**
 * Implements _postal_code_validation_validate_COUNTRYCODE().
 */
function _postal_code_validation_validate_NL($postal_code) {
  $return = array('country' => 'NL');
  if (preg_match('/^([1-9][0-9]{3}) ?([A-Z]{2})$/', $postal_code, $matches) &&
    !in_array($matches[2], array('SS', 'SD', 'SA'), TRUE)) {
    $return['postal_code'] = $matches[1] . ' ' . $matches[2];
  }
  else {
    $return['error'] = t('Invalid postcode. Postcodes in the Netherlands are like "9999 AA". They never start with zero and the letters are never "SS", "SD", or "SA".');
  }
  return $return;
}
