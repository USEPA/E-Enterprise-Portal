<?php 

// We assume that this script is being executed from the root of the Drupal
// installation. e.g. ~$ `phpunit TddTests sites/all/modules/tdd/TddTests.php`.
// These constants and variables are needed for the bootstrap process.
define('DRUPAL_ROOT', getcwd());
require_once DRUPAL_ROOT . '/includes/bootstrap.inc';
$_SERVER['REMOTE_ADDR'] = '127.0.0.1';

// Bootstrap Drupal.
drupal_bootstrap(DRUPAL_BOOTSTRAP_FULL);

// Our test class.
class TddTests extends PHPUnit_Framework_TestCase {
	public function test_tdd_help() {
		// Arbritary function to ensure Drupal is bootstrapped properly.
		$this->assertEquals(check_plain("test"), "test");

		// This a core function that queries the database. We run this just as a test
		// to ensure that the database is connected
		//print_r(_dblog_get_message_types());
	}
	public function test_pow(){
		$this->assertEquals(pow(2,3), 7);		
	}
}