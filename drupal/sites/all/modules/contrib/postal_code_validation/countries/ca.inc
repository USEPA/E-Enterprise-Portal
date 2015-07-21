<?php

/**
 * @file
 * Postal code validation functions for Canada.
 */

/**
 * Implements _postal_code_validation_validate_COUNTRYCODE().
 */
function _postal_code_validation_validate_CA($postal_code) {
  $return = array('country' => 'CA');
  if (preg_match('/^([ABCEGHJKLMNPRSTVXY]\d[ABCEGHJKLMNPRSTVWXYZ]) ?(\d[ABCEGHJKLMNPRSTVWXYZ]\d)$/', $postal_code, $matches)) {
    $return['postal_code'] = $matches[1] . ' ' . $matches[2];

    // NU postal code.
    if (preg_match('/^X0[ABC]/', $return['postal_code']) || $return['postal_code'] === 'H0H 0H0') {
      $return['province'] = 'NU';
    }
    // Map first letter of postal code to province.
    else {
      $postal_district_to_province_mapping = array(
        'A' => 'NL',
        'B' => 'NS',
        'C' => 'PE',
        'E' => 'NB',
        'G' => 'QC',
        'H' => 'QC',
        'J' => 'QC',
        'K' => 'ON',
        'L' => 'ON',
        'M' => 'ON',
        'N' => 'ON',
        'P' => 'ON',
        'R' => 'MB',
        'S' => 'SK',
        'T' => 'AB',
        'V' => 'BC',
        // X is also NU, handled above.
        'X' => 'NT',
        'Y' => 'YT',
      );
      $return['province'] = $postal_district_to_province_mapping[drupal_substr($return['postal_code'], 0, 1)];
    }
  }
  else {
    $return['error'] = t('Invalid postal code. Postal codes in Canada are like "A9A 9A9".');
  }
  return $return;
}
