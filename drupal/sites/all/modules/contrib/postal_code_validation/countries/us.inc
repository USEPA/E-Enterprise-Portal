<?php

/**
 * @file
 * Postal code validation functions for United States.
 */

/**
 * Implements _postal_code_validation_validate_COUNTRYCODE().
 */
function _postal_code_validation_validate_US($postal_code) {
  $return = array('country' => 'US');
  if (preg_match('/^[0-9]{5}(-[0-9]{4}([0-9]{2})?)?$/', $postal_code)) {
    $return['postal_code'] = $postal_code;

    $zip_code_5 = intval(drupal_substr($postal_code, 0, 5));
    $zip_code_prefix = intval(drupal_substr($postal_code, 0, 3));

    if ($zip_code_5 === 96799) {
      $return['province'] = 'AS';
    }

    elseif (in_array($zip_code_5, array(96939, 96940), TRUE)) {
      $return['province'] = 'PW';
    }
    elseif ($zip_code_5 >= 96941 && $zip_code_5 <= 96944) {
      $return['province'] = 'FM';
    }
    elseif ($zip_code_5 >= 96950 && $zip_code_5 <= 96952) {
      $return['province'] = 'MP';
    }
    elseif (in_array($zip_code_5, array(96960, 96970), TRUE)) {
      $return['province'] = 'MH';
    }

    elseif ($zip_code_prefix <= 4) {
      $return['province'] = FALSE;
    }
    elseif ($zip_code_prefix <= 5) {
      $return['province'] = 'NY';
    }
    elseif ($zip_code_prefix <= 7) {
      $return['province'] = 'PR';
      $return['country'] = 'PR';
    }
    elseif ($zip_code_prefix <= 8) {
      $return['province'] = 'VI';
      $return['country'] = 'VI';
    }
    elseif ($zip_code_prefix <= 9) {
      $return['province'] = 'PR';
      $return['country'] = 'PR';
    }
    elseif ($zip_code_prefix <= 27) {
      $return['province'] = 'MA';
    }
    elseif ($zip_code_prefix <= 29) {
      $return['province'] = 'RI';
    }
    elseif ($zip_code_prefix <= 38) {
      $return['province'] = 'NH';
    }
    elseif ($zip_code_prefix <= 49) {
      $return['province'] = 'ME';
    }
    elseif ($zip_code_prefix <= 54) {
      $return['province'] = 'VT';
    }
    elseif ($zip_code_prefix <= 55) {
      $return['province'] = 'MA';
    }
    elseif ($zip_code_prefix <= 59) {
      $return['province'] = 'VT';
    }
    elseif ($zip_code_prefix <= 69) {
      $return['province'] = 'CT';
    }
    elseif ($zip_code_prefix <= 89) {
      $return['province'] = 'NJ';
    }
    elseif ($zip_code_prefix <= 98) {
      $return['province'] = 'AE';
    }
    elseif ($zip_code_prefix <= 99) {
      $return['province'] = FALSE;
    }

    elseif ($zip_code_prefix <= 149) {
      $return['province'] = 'NY';
    }
    elseif ($zip_code_prefix <= 196) {
      $return['province'] = 'PA';
    }
    elseif ($zip_code_prefix <= 199) {
      $return['province'] = 'DE';
    }

    elseif ($zip_code_prefix <= 200) {
      $return['province'] = 'DC';
    }
    elseif ($zip_code_prefix <= 201) {
      $return['province'] = 'VA';
    }
    elseif ($zip_code_prefix <= 205) {
      $return['province'] = 'DC';
    }
    elseif ($zip_code_prefix <= 212) {
      $return['province'] = 'MD';
    }
    elseif ($zip_code_prefix <= 213) {
      $return['province'] = FALSE;
    }
    elseif ($zip_code_prefix <= 219) {
      $return['province'] = 'MD';
    }
    elseif ($zip_code_prefix <= 246) {
      $return['province'] = 'VA';
    }
    elseif ($zip_code_prefix <= 268) {
      $return['province'] = 'WV';
    }
    elseif ($zip_code_prefix <= 269) {
      $return['province'] = FALSE;
    }
    elseif ($zip_code_prefix <= 289) {
      $return['province'] = 'NC';
    }
    elseif ($zip_code_prefix <= 299) {
      $return['province'] = 'SC';
    }

    elseif ($zip_code_prefix <= 319) {
      $return['province'] = 'GA';
    }
    elseif ($zip_code_prefix <= 339) {
      $return['province'] = 'FL';
    }
    elseif ($zip_code_prefix <= 340) {
      $return['province'] = 'AA';
    }
    elseif ($zip_code_prefix <= 342) {
      $return['province'] = 'FL';
    }
    elseif ($zip_code_prefix <= 343) {
      $return['province'] = FALSE;
    }
    elseif ($zip_code_prefix <= 344) {
      $return['province'] = 'FL';
    }
    elseif ($zip_code_prefix <= 345) {
      $return['province'] = FALSE;
    }
    elseif ($zip_code_prefix <= 347) {
      $return['province'] = 'FL';
    }
    elseif ($zip_code_prefix <= 348) {
      $return['province'] = FALSE;
    }
    elseif ($zip_code_prefix <= 349) {
      $return['province'] = 'FL';
    }
    elseif ($zip_code_prefix <= 369) {
      $return['province'] = 'AL';
    }
    elseif ($zip_code_prefix <= 385) {
      $return['province'] = 'TN';
    }
    elseif ($zip_code_prefix <= 397) {
      $return['province'] = 'MS';
    }
    elseif ($zip_code_prefix <= 399) {
      $return['province'] = 'GA';
    }

    elseif ($zip_code_prefix <= 418) {
      $return['province'] = 'KY';
    }
    elseif ($zip_code_prefix <= 419) {
      $return['province'] = FALSE;
    }
    elseif ($zip_code_prefix <= 427) {
      $return['province'] = 'KY';
    }
    elseif ($zip_code_prefix <= 429) {
      $return['province'] = FALSE;
    }
    elseif ($zip_code_prefix <= 459) {
      $return['province'] = 'OH';
    }
    elseif ($zip_code_prefix <= 479) {
      $return['province'] = 'IN';
    }
    elseif ($zip_code_prefix <= 499) {
      $return['province'] = 'MI';
    }

    elseif ($zip_code_prefix <= 516) {
      $return['province'] = 'IA';
    }
    elseif ($zip_code_prefix <= 519) {
      $return['province'] = FALSE;
    }
    elseif ($zip_code_prefix <= 528) {
      $return['province'] = 'IA';
    }
    elseif ($zip_code_prefix <= 529) {
      $return['province'] = FALSE;
    }
    elseif ($zip_code_prefix <= 532) {
      $return['province'] = 'WI';
    }
    elseif ($zip_code_prefix <= 533) {
      $return['province'] = FALSE;
    }
    elseif ($zip_code_prefix <= 535) {
      $return['province'] = 'WI';
    }
    elseif ($zip_code_prefix <= 536) {
      $return['province'] = FALSE;
    }
    elseif ($zip_code_prefix <= 549) {
      $return['province'] = 'WI';
    }
    elseif ($zip_code_prefix <= 551) {
      $return['province'] = 'MN';
    }
    elseif ($zip_code_prefix <= 552) {
      $return['province'] = FALSE;
    }
    elseif ($zip_code_prefix <= 567) {
      $return['province'] = 'MN';
    }
    elseif ($zip_code_prefix <= 568) {
      $return['province'] = FALSE;
    }
    elseif ($zip_code_prefix <= 569) {
      $return['province'] = 'DC';
    }
    elseif ($zip_code_prefix <= 577) {
      $return['province'] = 'SD';
    }
    elseif ($zip_code_prefix <= 579) {
      $return['province'] = FALSE;
    }
    elseif ($zip_code_prefix <= 588) {
      $return['province'] = 'ND';
    }
    elseif ($zip_code_prefix <= 589) {
      $return['province'] = FALSE;
    }
    elseif ($zip_code_prefix <= 599) {
      $return['province'] = 'MT';
    }

    elseif ($zip_code_prefix <= 620) {
      $return['province'] = 'IL';
    }
    elseif ($zip_code_prefix <= 621) {
      $return['province'] = FALSE;
    }
    elseif ($zip_code_prefix <= 629) {
      $return['province'] = 'IL';
    }
    elseif ($zip_code_prefix <= 631) {
      $return['province'] = 'MO';
    }
    elseif ($zip_code_prefix <= 632) {
      $return['province'] = FALSE;
    }
    elseif ($zip_code_prefix <= 641) {
      $return['province'] = 'MO';
    }
    elseif ($zip_code_prefix <= 643) {
      $return['province'] = FALSE;
    }
    elseif ($zip_code_prefix <= 658) {
      $return['province'] = 'MO';
    }
    elseif ($zip_code_prefix <= 659) {
      $return['province'] = FALSE;
    }
    elseif ($zip_code_prefix <= 662) {
      $return['province'] = 'KS';
    }
    elseif ($zip_code_prefix <= 663) {
      $return['province'] = FALSE;
    }
    elseif ($zip_code_prefix <= 679) {
      $return['province'] = 'KS';
    }
    elseif ($zip_code_prefix <= 681) {
      $return['province'] = 'NE';
    }
    elseif ($zip_code_prefix <= 682) {
      $return['province'] = FALSE;
    }
    elseif ($zip_code_prefix <= 693) {
      $return['province'] = 'NE';
    }
    elseif ($zip_code_prefix <= 699) {
      $return['province'] = FALSE;
    }

    elseif ($zip_code_prefix <= 701) {
      $return['province'] = 'LA';
    }
    elseif ($zip_code_prefix <= 702) {
      $return['province'] = FALSE;
    }
    elseif ($zip_code_prefix <= 708) {
      $return['province'] = 'LA';
    }
    elseif ($zip_code_prefix <= 709) {
      $return['province'] = FALSE;
    }
    elseif ($zip_code_prefix <= 714) {
      $return['province'] = 'LA';
    }
    elseif ($zip_code_prefix <= 715) {
      $return['province'] = FALSE;
    }
    elseif ($zip_code_prefix <= 729) {
      $return['province'] = 'AR';
    }
    elseif ($zip_code_prefix <= 731) {
      $return['province'] = 'OK';
    }
    elseif ($zip_code_prefix <= 732) {
      $return['province'] = FALSE;
    }
    elseif ($zip_code_prefix <= 733) {
      $return['province'] = 'TX';
    }
    elseif ($zip_code_prefix <= 741) {
      $return['province'] = 'OK';
    }
    elseif ($zip_code_prefix <= 742) {
      $return['province'] = FALSE;
    }
    elseif ($zip_code_prefix <= 749) {
      $return['province'] = 'OK';
    }
    elseif ($zip_code_prefix <= 770) {
      $return['province'] = 'TX';
    }
    elseif ($zip_code_prefix <= 771) {
      $return['province'] = FALSE;
    }
    elseif ($zip_code_prefix <= 799) {
      $return['province'] = 'TX';
    }

    elseif ($zip_code_prefix <= 816) {
      $return['province'] = 'CO';
    }
    elseif ($zip_code_prefix <= 819) {
      $return['province'] = FALSE;
    }
    elseif ($zip_code_prefix <= 831) {
      $return['province'] = 'WY';
    }
    elseif ($zip_code_prefix <= 838) {
      $return['province'] = 'ID';
    }
    elseif ($zip_code_prefix <= 839) {
      $return['province'] = FALSE;
    }
    elseif ($zip_code_prefix <= 847) {
      $return['province'] = 'UT';
    }
    elseif ($zip_code_prefix <= 849) {
      $return['province'] = FALSE;
    }
    elseif ($zip_code_prefix <= 853) {
      $return['province'] = 'AZ';
    }
    elseif ($zip_code_prefix <= 854) {
      $return['province'] = FALSE;
    }
    elseif ($zip_code_prefix <= 857) {
      $return['province'] = 'AZ';
    }
    elseif ($zip_code_prefix <= 858) {
      $return['province'] = FALSE;
    }
    elseif ($zip_code_prefix <= 860) {
      $return['province'] = 'AZ';
    }
    elseif ($zip_code_prefix <= 862) {
      $return['province'] = FALSE;
    }
    elseif ($zip_code_prefix <= 865) {
      $return['province'] = 'AZ';
    }
    elseif ($zip_code_prefix <= 869) {
      $return['province'] = FALSE;
    }
    elseif ($zip_code_prefix <= 875) {
      $return['province'] = 'NM';
    }
    elseif ($zip_code_prefix <= 876) {
      $return['province'] = FALSE;
    }
    elseif ($zip_code_prefix <= 884) {
      $return['province'] = 'NM';
    }
    elseif ($zip_code_prefix <= 885) {
      $return['province'] = 'TX';
    }
    elseif ($zip_code_prefix <= 888) {
      $return['province'] = FALSE;
    }
    elseif ($zip_code_prefix <= 891) {
      $return['province'] = 'NV';
    }
    elseif ($zip_code_prefix <= 892) {
      $return['province'] = FALSE;
    }
    elseif ($zip_code_prefix <= 895) {
      $return['province'] = 'NV';
    }
    elseif ($zip_code_prefix <= 896) {
      $return['province'] = FALSE;
    }
    elseif ($zip_code_prefix <= 898) {
      $return['province'] = 'NV';
    }
    elseif ($zip_code_prefix <= 899) {
      $return['province'] = FALSE;
    }

    elseif ($zip_code_prefix <= 908) {
      $return['province'] = 'CA';
    }
    elseif ($zip_code_prefix <= 909) {
      $return['province'] = FALSE;
    }
    elseif ($zip_code_prefix <= 928) {
      $return['province'] = 'CA';
    }
    elseif ($zip_code_prefix <= 929) {
      $return['province'] = FALSE;
    }
    elseif ($zip_code_prefix <= 961) {
      $return['province'] = 'CA';
    }
    elseif ($zip_code_prefix <= 966) {
      $return['province'] = 'AP';
    }
    elseif ($zip_code_prefix <= 968) {
      // 967 also AS, handled above.
      $return['province'] = 'HI';
    }
    elseif ($zip_code_prefix <= 969) {
      // Also PW, FM, MP, MH, handled above.
      $return['province'] = 'GU';
    }
    elseif ($zip_code_prefix <= 979) {
      $return['province'] = 'OR';
    }
    elseif ($zip_code_prefix <= 986) {
      $return['province'] = 'WA';
    }
    elseif ($zip_code_prefix <= 987) {
      $return['province'] = FALSE;
    }
    elseif ($zip_code_prefix <= 994) {
      $return['province'] = 'WA';
    }
    else {
      $return['province'] = 'AK';
    }

    // Make country match "state" for non-US countries that use ZIP codes.
    $dependencies = postal_code_validation_get_dependencies();
    if (isset($dependencies[$return['province']]) && $dependencies[$return['province']] === 'US') {
      $return['country'] = $return['province'];
    }
  }
  else {
    $return['error'] = t('Invalid ZIP code. ZIP codes in the United States and its dependencies are like "99999", "99999-9999", or "99999-999999".');
  }
  return $return;
}
