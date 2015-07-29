<?php

/**
 * @file
 * Postal code validation functions for Spain.
 */

/**
 * Implements _postal_code_validation_validate_COUNTRYCODE().
 */
function _postal_code_validation_validate_ES($postal_code) {
  $return = array('country' => 'ES');
  if (preg_match('/^(0[1-9]|[1-4][0-9]|5[0-2])[0-9]{3}$/', $postal_code)) {
    $return['postal_code'] = $postal_code;
    $provinces = array(
      '01' => 'Álava',
      '02' => 'Albacete',
      '03' => 'Alicante',
      '04' => 'Almería',
      '05' => 'Ávila',
      '06' => 'Badajoz',
      '07' => 'Balearic Islands',
      '08' => 'Barcelona',
      '09' => 'Burgos',
      '10' => 'Cáceres',
      '11' => 'Cádiz',
      '12' => 'Castellón',
      '13' => 'Ciudad Real',
      '14' => 'Córdoba',
      '15' => 'A Coruña',
      '16' => 'Cuenca',
      '17' => 'Girona',
      '18' => 'Granada',
      '19' => 'Guadalajara',
      '20' => 'Guipúzcoa',
      '21' => 'Huelva',
      '22' => 'Huesca',
      '23' => 'Jaén',
      '24' => 'León',
      '25' => 'Lleida',
      '26' => 'La Rioja',
      '27' => 'Lugo',
      '28' => 'Madrid',
      '29' => 'Málaga',
      '30' => 'Murcia',
      '31' => 'Navarre',
      '32' => 'Ourense',
      '33' => 'Asturias',
      '34' => 'Palencia',
      '35' => 'Las Palmas',
      '36' => 'Pontevedra',
      '37' => 'Salamanca',
      '38' => 'Santa Cruz de Tenerife',
      '39' => 'Cantabria',
      '40' => 'Segovia',
      '41' => 'Seville',
      '42' => 'Soria',
      '43' => 'Tarragona',
      '44' => 'Teruel',
      '45' => 'Toledo',
      '46' => 'Valencia',
      '47' => 'Valladolid',
      '48' => 'Vizcaya',
      '49' => 'Zamora',
      '50' => 'Zaragoza',
      '51' => 'Ceuta',
      '52' => 'Melilla',
    );
    $return['province'] = $provinces[drupal_substr($postal_code, 0, 2)];
  }
  else {
    $return['error'] = t('Invalid postal code. Postal codes in Spain are like "99999" and start with a number between "01" and "52".');
  }
  return $return;
}
