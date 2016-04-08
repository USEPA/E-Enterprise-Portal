<?php 

// We assume that this script is being executed from the root of the Drupal
// installation. e.g. ~$ `phpunit EEnterpriseUtilityTests sites/all/modules/custom/eenterprise_utility/eenterprise_utility_test.php`.
// These constants and variables are needed for the bootstrap process.
define('DRUPAL_ROOT', getcwd());
require_once DRUPAL_ROOT . '/includes/bootstrap.inc';
$_SERVER['REMOTE_ADDR'] = '127.0.0.1';

// Bootstrap Drupal.

//From Root drupal installation, run as: phpunit EEnterpriseUtilityTests sites\all\modules\custom\eenterprise_utility\eenterprise_utility_test.php
drupal_bootstrap(DRUPAL_BOOTSTRAP_FULL);

// Our test class.
class EEnterpriseUtilityTests extends PHPUnit_Framework_TestCase {	
	/*public function test_node_access(){
		$result = db_query("select nid from {node} where type = :type limit 1", array(":type" => "progress_tracker"))->fetchAll();
		$node = node_load($result[0]->nid);
		$account = new stdClass();
		$account->name = $node->name;
		
		$this->assertEquals(eenterprise_utility_node_access($node, 'view', $account), NODE_ACCESS_ALLOW);
	}*/

    /**
     * Unit Test the function _eenterprise_bridge_auth_get_authmap in
     * sites\all\modules\custom\eenterprise_bridge_auth\eenterprise_bridge_auth.module
     */
    public function test_auth_get_authmap(){
        $result = db_query("select authname, uid from {authmap} limit 1")->fetchAll();
        $this->assertEquals(_eenterprise_bridge_auth_get_authmap($result[0]->authname), $result[0]->uid);
    }

    /**
     * Unit Test the function _eenterprise_bridge_auth_get_authmap in
     * sites\all\modules\custom\eenterprise_bridge_auth\eenterprise_bridge_auth.module
     * Test the FALSE Scenario.
     */
    public function test_auth_get_authmap_false(){
        $this->assertFalse(_eenterprise_bridge_auth_get_authmap('_A username that does not exist_'), FALSE);
    }

    /**
     * Unit Test the function handleXmlError in
     * sites\all\modules\custom\eenterprise_bridge_auth\classes\adfsbridge.php
     */
    public function test_handleXmlError(){
        $adfs = new AdfsBridge();
        $this->assertFalse($adfs->handleXmlError(E_ERROR, "Error") , FALSE);
    }

    /**
     * Unit Test the function _suggestion_box_get_category_inbox in
     * sites\all\modules\custom\features\suggestion_box\suggestion_box.module
     */
    public function test_suggestion_box_get_category_inbox(){
        $this->assertContains("@", _suggestion_box_get_category_inbox("Data Integrity"));
    }

    /**
     * Unit Test the function _suggestion_box_get_category_inbox in
     * sites\all\modules\custom\features\suggestion_box\suggestion_box.module
     * for false case
     */
    public function test_suggestion_box_get_category_inbox_false(){
        $this->assertFalse(_suggestion_box_get_category_inbox("False Case"), FALSE);
    }
}