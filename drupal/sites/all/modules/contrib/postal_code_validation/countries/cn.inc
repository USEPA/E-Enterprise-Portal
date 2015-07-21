<?php

/**
 * @file
 * Postal code validation functions for China.
 */

/**
 * Implements _postal_code_validation_validate_COUNTRYCODE().
 */
function _postal_code_validation_validate_CN($postal_code) {
  $return = array('country' => 'CN');
  if (preg_match('/^[0-9]{6}$/', $postal_code)) {
    $return['postal_code'] = $postal_code;

    $postal_code = (int) $postal_code;
    $special = array(
      102800 => 'Hebei',
      202400 => 'Zhejiang',
      617300 => 'Yunnan',
      624700 => 'Qinghai',
      999077 => 'Hong Kong',
      999078 => 'Macau',
    );
    if (isset($special[$postal_code])) {
      $return['province'] = $special[$postal_code];
    }
    elseif (in_array($postal_code, array(137400, 137500, 137600, 162600,
      162700, 162800, 735400, 737300, 750300), TRUE)) {
      $return['province'] = 'Inner Mongolia';
    }
    else {
      foreach (array(
        9999 => FALSE,
        29999 => 'Inner Mongolia',
        49999 => 'Shanxi',
        79999 => 'Hebei',
        99999 => FALSE,
        109999 => 'Beijing',
        129999 => 'Liaoning',
        139999 => 'Jilin',
        149999 => FALSE,
        169999 => 'Heilongjiang',
        199999 => FALSE,
        209999 => 'Shanghai',
        229999 => 'Jiangsu',
        249999 => 'Anhui',
        279999 => 'Shandong',
        299999 => FALSE,
        309999 => 'Tianjin',
        329999 => 'Zhejiang',
        349999 => 'Jiangxi',
        369999 => 'Fujian',
        399999 => FALSE,
        409999 => 'Chongqing',
        429999 => 'Hunan',
        449999 => 'Hubei',
        479999 => 'Henan',
        509999 => FALSE,
        529999 => 'Guangdong',
        549999 => 'Guangxi',
        569999 => 'Guizhou',
        579999 => 'Hainan',
        609999 => FALSE,
        649999 => 'Sichuan',
        679999 => 'Yunnan',
        709999 => FALSE,
        729999 => 'Shaanxi',
        749999 => 'Gansu',
        759999 => 'Ningxia',
        809999 => FALSE,
        819999 => 'Qinghai',
        829999 => FALSE,
        849999 => 'Xinjiang',
        859999 => 'Tibet',
      ) as $this_code => $province) {
        if ($postal_code <= $this_code) {
          $return['province'] = $province;
          break;
        }
      }
    }
    if (empty($return['province'])) {
      $return['postal_code'] = FALSE;
      $return['error'] = t('Invalid postal code. Out-of-range for a postal code from China.');
    }
  }
  else {
    $return['error'] = t('Invalid postal code. Postal codes in China are like "999999".');
  }
  return $return;
}
