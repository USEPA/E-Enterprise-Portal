<?php
/**
 * @file
 * cdx_facility_management.features.inc
 */

/**
 * Implements hook_views_api().
 */
function cdx_facility_management_views_api($module = NULL, $api = NULL)
{
    return array("api" => "3.0");
}


/**
 * Implements hook_theme_registry_alter().
 */
function cdx_facility_management_theme_registry_alter(&$theme_registry)
{
    // Defined path to the current module.
    $module_path = drupal_get_path('module', 'cdx_facility_management');
    // Find all .tpl.php files in this module's folder recursively.
    $template_file_objects = drupal_find_theme_templates($theme_registry, '.tpl.php', $module_path);
    // Iterate through all found template file objects.
    foreach ($template_file_objects as $key => $template_file_object) {
        // If the template has not already been overridden by a theme.
        if (!isset($theme_registry[$key]['theme path']) || !preg_match('#/themes/#', $theme_registry[$key]['theme path'])) {
            // Alter the theme path and template elements.
            $theme_registry[$key]['theme path'] = $module_path;
            $theme_registry[$key] = array_merge($theme_registry[$key], $template_file_object);
            $theme_registry[$key]['type'] = 'module';
        }
    }
}

/**
 * Implements hook_menu().
 **/


function  cdx_facility_management_menu()
{
    $items = array();

    $items['cdx_facility_management_iframe'] = array(
        'page callback' => 'cdx_facility_management_iframe',
        'access callback' => TRUE,
    );
    $items['cdx_soap_test'] = array(
        'page callback' => 'cdx_soap_test',
        'access callback' => TRUE,
    );
    $items['return_cdx_security_token'] = array(
        'page callback' => 'return_cdx_security_token',
        'access callback' => TRUE,
    );
    return $items;
}


/*
* Page callback sets up and returns the content for cdx-facility-management-iframe page
*/
function cdx_facility_management_iframe()
{
    try {
        $build = views_embed_view('cdx_facility_management', $display_id = 'default');
    } catch (Exception $e) {
        $build = '';
        echo $e;
    }
    print render($build);
}

function cdx_soap_test()
{
    $json_return = array();
    $user_id = "MATKIN.BENJAMIN";
    try {
        $client = new SoapClient("https://testngn.epacdxnode.net/cdx-register-II/services/RegisterService?wsdl", array('soap_version' => SOAP_1_2));
    } catch(SoapFault $f) {
        var_dump($f);
        drupal_set_message('Cannot connect to Registration Service. Role cannot be assigned to this user. please try again later.', 'error');
        watchdog('eenterprise_bridge_auth',"Error: Cannot connect to CDX RegisterService. Role cannot be assigned to this user", array(), WATCHDOG_ERROR);
        return;
    }
    $params1 = array(
        "userId" => "registration.test@cgifederal.com",
        "credential" => "Testregistration1",
        "domain" => "default",
        "authenticationMethod" => "password",
    );
    try {
        //Authenticate to CDX
        $response1 = $client->__soapCall("Authenticate", array($params1));
    } catch(SoapFault $f) {
        var_dump($f);
        watchdog('eenterprise_bridge_auth',"Error: Cannot authenticate user to retrieve role information", array(), WATCHDOG_ERROR);
    }
    $_SESSION['cdx_security_token'] = $response1->securityToken;
    var_dump($_SESSION['cdx_security_token']);
    $params2 = array(
        "securityToken" => $response1->securityToken,   
        "userId" => $user_id,
    );
    try {
        $user_obj = $client->__soapCall("RetrieveUser", array($params2));
        dpm($user_obj);
        $user_sec_bundle = array(
            "securityToken" => $response1->securityToken,
            "user" => $user_obj->User,
        );

        $org_val = null;
        $user_orgs = $client->__soapCall("RetrieveOrganizations", array($user_sec_bundle));
        dpm($user_orgs);
        if(is_array($user_orgs->Organization))
            $org_val = $user_orgs->Organization[0];
        else
            $org_val = $user_orgs->Organization;

        $user_sec_org_bundle = array(
            "securityToken" => $response1->securityToken,
            "user" => $user_obj->User,
            "org" => $org_val,
        );
        global $user;
        $user_roles = $client->__soapCall("RetrieveRoles", array($user_sec_org_bundle));
        dpm($user_roles);
        if(is_array($user_roles->Role)){
            foreach($user_roles->Role as $k => $v){
                $role_val = $v->type->description;
                if(!empty($role_val)){
                    $user_role = user_role_load_by_name($role_val);
                    if($user_role === FALSE){
                        $user_role = new stdClass();
                        $user_role->name = $role_val;
                        user_role_save($user_role);
                    }
                }
            }
        }
        else{
            $role_val = $user_roles->Role->type->description;
            if(!empty($role_val)){
                $user_role = user_role_load_by_name($role_val);
                if($user_role === FALSE){
                    $user_role = new stdClass();
                    $user_role->name = $role_val;
                    user_role_save($user_role);
                }
            }
        }
    } catch(SoapFault $f) {
        var_dump($f);
        watchdog('eenterprise_bridge_auth',"Error: Cannot retrieve role information", array(), WATCHDOG_ERROR);
    }
}

  function assign_roles_to_user($user_name){
    try {
        $client = new SoapClient("https://testngn.epacdxnode.net/cdx-register-II/services/RegisterService?wsdl", array('soap_version' => SOAP_1_2));
    } catch(SoapFault $f) {
        var_dump($f);
        drupal_set_message('Cannot connect to Registration Service. Role cannot be assigned to this user. please try again later.', 'error');
        watchdog('eenterprise_bridge_auth',"Error: Cannot connect to CDX RegisterService. Role cannot be assigned to this user", array(), WATCHDOG_ERROR);
        return;
    }
    $params1 = array(
        "userId" => "registration.test@cgifederal.com",
        "credential" => "Testregistration1",
        "domain" => "default",
        "authenticationMethod" => "password",
    );
    try {
        //Authenticate to CDX
        $response1 = $client->__soapCall("Authenticate", array($params1));
    } catch(SoapFault $f) {
        var_dump($f);
        watchdog('eenterprise_bridge_auth',"Error: Cannot authenticate user to retrieve role information", array(), WATCHDOG_ERROR);
    }
      var_dump($_SESSION['cdx_security_token']);
    $params2 = array(
        "securityToken" => $response1->securityToken,
        "userId" => $user_name
    );
      var_dump(params2);
              exit();
    try {
        $user_obj = $client->__soapCall("RetrieveUser", array($params2));
        $user_sec_bundle = array(
            "securityToken" => $response1->securityToken,
            "user" => $user_obj->User,
        );

        $org_val = null;
        $user_orgs = $client->__soapCall("RetrieveOrganizations", array($user_sec_bundle));

        if(is_array($user_orgs->Organization))
            $org_val = $user_orgs->Organization[0];
        else
            $org_val = $user_orgs->Organization;

        $user_sec_org_bundle = array(
            "securityToken" => $response1->securityToken,
            "user" => $user_obj->User,
            "org" => $org_val,
        );
        global $user;
        $user_roles = $client->__soapCall("RetrieveRoles", array($user_sec_org_bundle));
        if(is_array($user_roles->Role)){
            foreach($user_roles->Role as $k => $v){
                $role_val = $v->type->description;
                if(!empty($role_val)){
                    $user_role = user_role_load_by_name($role_val);
                    if($user_role === FALSE){
                        $user_role = new stdClass();
                        $user_role->name = $role_val;
                        user_role_save($user_role);
                    }
                    user_multiple_role_edit(array($user->uid), 'add_role', $user_role->rid);
                }
            }
        }
        else{
            $role_val = $user_roles->Role->type->description;
            if(!empty($role_val)){
                $user_role = user_role_load_by_name($role_val);
                if($user_role === FALSE){
                    $user_role = new stdClass();
                    $user_role->name = $role_val;
                    user_role_save($user_role);
                }
                user_multiple_role_edit(array($user->uid), 'add_role', $user_role->rid);
            }
        }
    } catch(SoapFault $f) {
        watchdog('eenterprise_bridge_auth',"Error: Cannot retrieve role information", array(), WATCHDOG_ERROR);
    }
}


function return_cdx_security_token(){
    if (isset($_SESSION['cdx_security_token'])) {
        $security_token = $_SESSION['cdx_security_token'];
    }
    else {
        $security_token = generate_cdx_security_token();
    }
    print json_encode($security_token);
}
