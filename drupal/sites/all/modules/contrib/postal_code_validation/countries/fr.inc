<?php

/**
 * @file
 * Postal code validation functions for France.
 */

/**
 * Implements _postal_code_validation_validate_COUNTRYCODE().
 */
function _postal_code_validation_validate_FR($postal_code) {
  $return = array('country' => 'FR');
  if (preg_match('/^[0-9]{5}$/', $postal_code)) {
    $return['postal_code'] = $postal_code;

    $prefix = (int) drupal_substr($postal_code, 0, 3);
    $overseas = array(
      971 => 'GP',
      972 => 'MQ',
      973 => 'GF',
      974 => 'RE',
      975 => 'PM',
      976 => 'YT',
      977 => 'BL',
      978 => 'MF',
      980 => 'MC',
      984 => 'TF',
      986 => 'WF',
      987 => 'PF',
      988 => 'NC',
    );
    if (isset($overseas[$prefix])) {
      $return['country'] = $overseas[$prefix];
    }
  }
  else {
    $return['error'] = t('Invalid postal code. Postal codes in France and its dependencies are like "99999".');
  }
  return $return;
}
