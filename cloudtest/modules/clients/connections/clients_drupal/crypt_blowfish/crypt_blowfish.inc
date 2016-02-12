<?php
/**
 * @file 
 * Wrapper for PEAR Crypt Blowfish
 *
 */


/**
 *
 */
class Drupal_Crypt_Blowfish {
    
    /**
     *
     */
    static public function decrypt($encrypted) {
      $bf = self::blowfish();
      return trim($bf->decrypt($encrypted)); // that was fun to debug
    }
    
    /**
     *
     */
    static public function encrypt($plaintext) {
      $bf = self::blowfish();
      return $bf->encrypt($plaintext);
    }
    
    /**
     *
     */
    static protected function blowfish() {
      ini_set('include_path', ini_get('include_path') .':'. variable_get('crypt_blowfish_cryptdir', ''));
      include_once('Crypt/Blowfish.php');
      return new Crypt_Blowfish(self::getkey()); 
    }
    
    /**
     *
     */
    static public function getkey() {
      $filename = drupal_get_path('module', 'crypt_blowfish') .'/crypt_blowfish_key.inc';
      $handle = fopen($filename, "r");
      $key = fread($handle, filesize($filename));
      fclose($handle);    
      return $key;
    }
    
}