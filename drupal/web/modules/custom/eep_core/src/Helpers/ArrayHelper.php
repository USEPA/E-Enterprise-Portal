<?php
/**
 * Created by PhpStorm.
 * User: smolinsk
 * Date: 12/5/2018
 * Time: 11:21 PM
 */

namespace Drupal\eep_core\Helpers;


class ArrayHelper {

  /**
   * Returns a reduced array of all elements that match the needle. Preserves keys
   *
   * @param $needle
   * @param array $haystack
   * @param string $flags
   *
   * @return array
   */
  public static function find($needle, $haystack = [], $flags = 'i') {
    $needle = preg_replace('/\s+/i', '\\\\s', $needle);
    $regex_needle = "/^$needle$/$flags";
    return preg_grep($regex_needle, $haystack);
  }

  public static function find_in_keys($needle, $haystack = [], $flags = 'i') {
    return ArrayHelper::find($needle, array_keys($haystack), $flags);
  }

  /**
   * replacement for in_array() when the search comparison doesnt not need to be
   * case sensitive.
   *
   * @param $needle
   * @param array $haystack
   * @param string $flags
   *
   * @return bool
   */
  public static function in_array($needle, $haystack = [], $flags = 'i') {
    return (bool) ArrayHelper::find($needle, $haystack, $flags);
  }

  /**
   * Checks if the given case insensitive key or index exists in the array.
   * @param mixed $key <p>
   * Value to check.
   * </p>
   * @param array $search <p>
   * An array with keys to check.
   * </p>
   * @return bool true on success or false on failure.
   */
  public static function key_exists($key, $search) {
    return ArrayHelper::in_array($key, array_keys($search));
  }
}