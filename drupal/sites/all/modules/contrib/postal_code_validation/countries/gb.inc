<?php

/**
 * @file
 * Postal code validation functions for United Kingdom.
 */

/**
 * Implements _postal_code_validation_validate_COUNTRYCODE().
 */
function _postal_code_validation_validate_GB($postal_code) {
  $return = array('country' => 'GB');

  // Postal codes for dependencies. They actually have a space after the 4th character.
  $special_codes = array(
    // Ascension Island should be AC, but that is not an ISO country code.
    'ASCN1ZZ' => 'SH',
    'BBND1ZZ' => 'IO',
    'FIQQ1ZZ' => 'FK',
    'GX111AA' => 'GI',
    'PCRN1ZZ' => 'PN',
    'SIQQ1ZZ' => 'GS',
    'STHL1ZZ' => 'SH',
    'TDCU1ZZ' => 'SH',
    'TKCA1ZZ' => 'TC',
  );

  if (isset($special_codes[$postal_code]) || preg_match('/^((BFPO ?[0-9]{1,4})|(GIR ?0AA)|(((A[BL]|B[ABDHLNRSTX]?|C[ABFHMORTVW]|D[ADEGHLNTY]|E[HNX]?|F[KY]|G[LUY]?|H[ADGPRSUX]|I[GMPV]|JE|K[ATWY]|L[ADELNSU]?|M[EKL]?|N[EGNPRW]?|O[LX]|P[AEHLOR]|R[GHM]|S[AEGKLMNOPRSTY]?|T[ADFNQRSW]|UB|W[ADFNRSV]|YO|ZE)[1-9]?[0-9]|((E|N|NW|SE|SW|W)1|EC[1-4]|WC[12])[A-HJKMNPR-Y]|(SW|W)([2-9]|[1-9][0-9])|EC[1-9][0-9]) ?[0-9][ABD-HJLNP-UW-Z]{2}))$/', $postal_code)) {
    // BFPO postal codes.
    if (drupal_substr($postal_code, 0, 4) === 'BFPO') {
      $return['postal_code'] = 'BFPO ' . drupal_substr($postal_code, 4);
    }
    // BS 7666 and special postal codes.
    else {
      // Format postal code.
      $return['postal_code'] = drupal_substr($postal_code, 0, -3) . ' ' . drupal_substr($postal_code, -3);

      if (isset($special_codes[$postal_code])) {
        $return['country'] = $special_codes[$postal_code];
      }
      elseif (drupal_substr($postal_code, 0, 2) === 'GY') {
        $return['country'] = 'GG';
      }
      elseif (drupal_substr($postal_code, 0, 2) === 'IM') {
        $return['country'] = 'IM';
      }
      elseif (drupal_substr($postal_code, 0, 2) === 'JE') {
        $return['country'] = 'JE';
      }
    }
  }
  else {
    $return['error'] = t('Invalid postcode. Postcodes in the United Kingdom and its dependencies are like one of these: "A9 9AA", "A99 9AA", "AA9 9AA", "AA99 9AA", "A9A 9AA", "AA9A 9AA", or, for some dependencies, "AAAA 1ZZ".');
  }
  return $return;
}
