<?php
//@see https://www.drupal.org/node/1080330
/**
 * Function to list all deleted modules that are still being tracked in the database
 */
/**
 * Root directory of Drupal installation.
 */
define('DRUPAL_ROOT', getcwd());

require_once DRUPAL_ROOT . '/includes/bootstrap.inc';
drupal_bootstrap(DRUPAL_BOOTSTRAP_FULL);

function nobueno() {
  $startingtime = microtime(true);
  $o = 'Checking for dead modules ...';
  $result = db_select('system')
    ->fields('system', array('filename'))
    ->condition('status', '1', '=')
    ->range(0, 150)
    ->execute();
  $n = 1;
  $m = 0;
  foreach ($result as $node) {
    $path = DRUPAL_ROOT.'/'.$node->filename;
    If (!file_exists($path)) {
      $o .= "#$n $path <br />";
      $m++;
    }
    $n++;
  }
  $timedif =  round(microtime(true) - $startingtime,3);
  $o .= "Total of $n active modules registered in database. $m dead entries found. <br/>";
  $o .= 'Query Time: '.$timedif.' seconds <br />';
  
  return $o;
}

echo nobueno();
