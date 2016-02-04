<?php

/**
 * @file
 * Postal code validation functions for Argentina.
 */

/**
 * Implements _postal_code_validation_validate_COUNTRYCODE().
 */
function _postal_code_validation_validate_AR($postal_code) {
  $return = array('country' => 'AR');
  if (preg_match('/^[A-HJ-NP-Z][0-9]{4}[A-Z]{3}$/', $postal_code)) {
    $return['postal_code'] = $postal_code;
    $return['province'] = drupal_substr($postal_code, 0, 1);
  }
  else {
    $return['error'] = t('Invalid postal code. Postal codes in Argentina are like "A9999AAA".');
  }
  return $return;
}
