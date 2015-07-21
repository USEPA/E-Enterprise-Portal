<?php

/**
 * @file
 * Postal code validation functions for Andorra.
 */

/**
 * Implements _postal_code_validation_validate_COUNTRYCODE().
 */
function _postal_code_validation_validate_AD($postal_code) {
  $return = array('country' => 'AD');
  if (preg_match('/^AD[1-7][0-9]{2}$/', $postal_code)) {
    $return['postal_code'] = $postal_code;

    $parishes = array(
      1 => 'Canillo',
      2 => 'Encamp',
      3 => 'Ordino',
      4 => 'La Massana',
      5 => 'Andorra la Vella',
      6 => 'Sant Julià de Lòria',
      7 => 'Escaldes-Engordany',
    );
    $return['province'] = $parishes[(int) drupal_substr($postal_code, 2, 1)];
  }
  else {
    $return['error'] = t('Invalid postal code. Postal codes in Andorra are like "AD999".');
  }
  return $return;
}
