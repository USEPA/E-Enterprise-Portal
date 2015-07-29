<?php

/**
 * @file
 * Postal code validation functions for Brunei.
 */

/**
 * Implements _postal_code_validation_validate_COUNTRYCODE().
 */
function _postal_code_validation_validate_BN($postal_code) {
  $return = array('country' => 'BN');
  if (preg_match('/^[BKTP][A-Z][0-9]{4}$/', $postal_code)) {
    $return['postal_code'] = $postal_code;
    $return['province'] = drupal_substr($postal_code, 0, 1);
  }
  else {
    $return['error'] = t('Invalid postal code. Postal codes in Brunei are like "AA9999" with the first letter being one of BKTP.');
  }
  return $return;
}
