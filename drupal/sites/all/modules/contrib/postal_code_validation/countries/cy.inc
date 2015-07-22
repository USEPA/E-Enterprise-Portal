<?php

/**
 * @file
 * Postal code validation functions for Cyprus.
 */

/**
 * Implements _postal_code_validation_validate_COUNTRYCODE().
 */
function _postal_code_validation_validate_CY($postal_code) {
  $return = array('country' => 'CY');
  if (preg_match('/^[1-9][0-9]{3}$/', $postal_code)) {
    $return['postal_code'] = $postal_code;

    $postal_code = (int) $postal_code;
    foreach (array(
      2999 => 'Nicosia District',
      4999 => 'Limassol District',
      5999 => 'Famagusta District',
      7999 => 'Larnaca District',
      8999 => 'Paphos District',
      9999 => 'Kyrenia District',
    ) as $this_code => $province) {
      if ($postal_code <= $this_code) {
        $return['province'] = $province;
        break;
      }
    }
  }
  else {
    $return['error'] = t('Invalid postal code. Postal codes in Cyprus are like "9999" and never start with zero.');
  }
  return $return;
}
