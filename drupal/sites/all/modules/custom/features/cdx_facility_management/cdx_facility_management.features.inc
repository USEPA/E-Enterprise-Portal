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
    $items['return_cdx_facility_management_token'] = array(
        'page callback' => 'return_cdx_facility_management_token',
        'access callback' => TRUE,
    );
    $items['retrieve_cdx_user_data'] = array(
        'page callback' => 'retrieve_cdx_user_data',
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


function return_cdx_facility_management_token()
{
    //USER ROLE ID = 84401 from test
    // USER ROLE ID = 86357 from dev
//    $user_type = variable_get('cdx_user_type');
//    if ($user_type != 'CDX') {
//        exit();
////    }
//    global $user;
////    $user_data = user_load($user->uid);
////    $user_id = $user_data->mail;
//    try {
//        // $client = new SoapClient("https://testngn.epacdxnode.net/cdx-register-II/services/RegisterService?wsdl", array('soap_version' => SOAP_1_2)); //variable_get('autenticate_cdx_token');
//        $client = new SoapClient("https://devngn.epacdxnode.net/cdx-register-II/services/RegisterService?wsdl", array('soap_version' => SOAP_1_2)); //variable_get('autenticate_cdx_token');
//        https://devngn.epacdxnode.net/cdx-register-II/services/RegisterService?wsdl
//    } catch (SoapFault $f) {
//        var_dump($f);
//        return;
//    }
//    $params = array(
//        "userId" => $user_id,
//        "credential" => $password,
//        "domain" => "default",
//        "authenticationMethod" => "password",
//    );
//    try {
//        //Authenticate to CDX
//        $response = $client->__soapCall("Authenticate", array($params));
//        $token = $response->securityToken;
//        $server_ip = variable_get('frs_api_lookup_ip');
//        $json_return = array(
//            'token' => $token,
//            'server_ip' => $server_ip,
//        );
//
//    } catch (SoapFault $f) {
//        var_dump($f);
//        watchdog('eenterprise_bridge_auth', "Error: Cannot authenticate user to retrieve role information", array(), WATCHDOG_ERROR);
//    }

    $token = variable_get('cdx_fmw_security_token'); // retrieved from bridge
    $server_ip = variable_get('frs_api_lookup_ip');
    $json_return = array(
        'token' => $token,
        'server_ip' => $server_ip,
    );
    print json_encode($json_return);
}

function retrieve_cdx_user_data()
{
    
    $user_id = variable_get('userId');

    $allowed_program_roles = ['CEDRI', 'CSPP'];
// Generate token as administrator to get user data
    $json_return = array();
    try {
        $wsdl = variable_get('eactivity_auth_reg_wsdl');
        //$client = new SoapClient("https://testngn.epacdxnode.net/cdx-register-II/services/RegisterService?wsdl", array('soap_version' => SOAP_1_2)); //variable_get('autenticate_cdx_token');
        $client = new SoapClient($wsdl, array('soap_version' => SOAP_1_2)); //variable_get('autenticate_cdx_token');
    } catch (SoapFault $f) {
        dpm($f);
        return;
    }
    $params = array(
        "userId" => variable_get('eactivity_auth_reg_username'),
        "credential" => variable_get('eactivity_auth_reg_password'),
        "domain" => variable_get('eactivity_auth_reg_domain'),
        "authenticationMethod" => variable_get('eactivity_auth_reg_auth_method'),
    );

    try {
        //Authenticate to CDX
        $response = $client->__soapCall("Authenticate", array($params));
        $token = $response->securityToken;
    } catch (SoapFault $f) {
        dpm($f);
        watchdog('eenterprise_bridge_auth', "Error: Cannot authenticate user to retrieve role information", array(), WATCHDOG_ERROR);
    }

    $user_params = array(
        "securityToken" => $token,
        "userId" => $user_id,
    );
    try {
        $user_obj = $client->__soapCall("RetrieveUser", array($user_params));
        $json_return['user_data'] = $user_obj->User;
        $user_sec_bundle = array(
            "securityToken" => $token,
            "user" => $user_obj->User,
        );
        $org_val = null;
        $user_orgs = $client->__soapCall("RetrieveOrganizations", array($user_sec_bundle));
        // CDX returns object if single return and array if multiple
        $json_return['organizations'] = array();
        $org_contains_role = false; // does organization have any roles assigned to it?
        if (is_array($user_orgs->Organization)) {
            foreach ($user_orgs->Organization as $index => $obj) {
                $org_val = $obj;
                $org_id = $org_val->userOrganizationId;
                $json_return['organizations_to_roles'][$org_id] = array();
                $user_sec_org_bundle = array(
                    "securityToken" => $token,
                    "user" => $user_obj->User,
                    "org" => $org_val,
                );
                $user_roles = $client->__soapCall("RetrieveRoles", array($user_sec_org_bundle));
                // Check if roles are assigned to organization
                if (isset($user_roles->Role)) {
                    // Check if multiple roles or single role
                    if (is_array($user_roles->Role)) {
                        foreach ($user_roles->Role as $index => $role) {
                            if (in_array($role->dataflow, $allowed_program_roles)) {
                                $org_contains_role = true;
                                $json_return['organizations_to_roles'][$org_id][] = $role;
                            }
                        }
                    } else {
                        $role = $user_roles->Role;
                        if (in_array($role->dataflow, $allowed_program_roles)) {
                            $org_contains_role = true;
                            $json_return['organizations_to_roles'][$org_id][] = $role;
                        }
                    }
                }
                if ($org_contains_role) {
                    $json_return['organizations'][] = $org_val;
                } else {
                    unset($json_return['organizations_to_roles'][$org_id]);
                }

            }
        } else {
            $org_val = $user_orgs->Organization;
            $org_id = $org_val->userOrganizationId;
            $json_return['organizations_to_roles'][$org_val->userOrganizationId]['roles'] = array();
            $user_sec_org_bundle = array(
                "securityToken" => $token,
                "user" => $user_obj->User,
                "org" => $org_val,
            );
            $user_roles = $client->__soapCall("RetrieveRoles", array($user_sec_org_bundle));
            if (isset($user_roles->Role)) {
                if (is_array($user_roles->Role)) {
                    foreach ($user_roles->Role as $index => $role) {
                        if (in_array($role->dataflow, $allowed_program_roles)) {
                            $org_contains_role = true;
                            $json_return['organizations_to_roles'][$org_id][] = $role;
                        }
                    }
                } else {
                    $role = $user_roles->Role;
                    if (in_array($role->dataflow, $allowed_program_roles)) {
                        $org_contains_role = true;
                        $json_return['organizations_to_roles'][$org_id][] = $role;
                    }
                }
            }
            if ($org_contains_role) {
                $json_return['organizations'][] = $org_val;
            } else {
                unset($json_return['organizations_to_roles'][$org_id]);
            }

        }

        $json_return['error'] = false;
        print json_encode($json_return);
    } catch (SoapFault $f) {
        dpm($f);
        print json_encode((array('error' => 'true', 'fault' => $f, 'user' => $user_id)));
        watchdog('eenterprise_bridge_auth', "Error: Cannot retrieve role information", array(), WATCHDOG_ERROR);
    }
}