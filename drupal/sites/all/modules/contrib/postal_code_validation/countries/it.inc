<?php

/**
 * @file
 * Postal code validation functions for Italy.
 */

/**
 * Implements _postal_code_validation_validate_COUNTRYCODE().
 */
function _postal_code_validation_validate_IT($postal_code) {
  $return = array('country' => 'IT');
  if (preg_match('/^[0-9]{5}$/', $postal_code)) {
    $return['postal_code'] = $postal_code;
    if ($postal_code === '00120') {
      $return['country'] = 'VA';
    }
    elseif (drupal_substr($postal_code, 0, 4) === '4789') {
      $return['country'] = 'SM';
    }
  }
  else {
    $return['error'] = t('Invalid postal code. Postal codes in Italy, San Marino, and the Vatican are like "99999".');
  }
  return $return;
}
