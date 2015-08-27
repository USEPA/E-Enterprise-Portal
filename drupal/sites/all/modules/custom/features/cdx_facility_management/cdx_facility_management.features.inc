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

    $items['test_wsdl'] = array(
        'page callback' => 'test_wsdl',
        'access callback' => TRUE,
    );

    return $items;
}

function test_wsdl(){
    print file_get_contents('file:///C:/Apache24/htdocs/e-enterprise/drupal/sites/all/modules/custom/features/cdx_facility_management/test.wsdl');

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

/**
 * Use user id to generate token for CDX Facility Management widget
 * Params: CDX valid user id
 */
function cdx_soap_test($user_id = 'GREENOLIVE')
{
//    $client2 = new SoapClient("https://testngn.epacdxnode.net/cdx-register-II/services/RegisterService?wsdl", array('soap_version' => SOAP_1_2));

    $params2 = array(
        "securityToken" => $response1->securityToken,
        "userId" => $user_id,
    );
    try {
        $user_obj = $client2->__soapCall("RetrieveUser", array($params2));
        dpm($user_obj);
        exit();
        $user_sec_bundle = array(
            "securityToken" => $response1->securityToken,
            "user" => $user_obj->User,
        );

        $org_val = null;
        $user_orgs = $client->__soapCall("RetrieveOrganizations", array($user_sec_bundle));
        dpm($user_orgs);
        if (is_array($user_orgs->Organization))
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
        if (is_array($user_roles->Role)) {
            foreach ($user_roles->Role as $k => $v) {
                $role_val = $v->type->description;
                if (!empty($role_val)) {
                    $user_role = user_role_load_by_name($role_val);
                    if ($user_role === FALSE) {
                        $user_role = new stdClass();
                        $user_role->name = $role_val;
                        user_role_save($user_role);
                    }
                }
            }
        } else {
            $role_val = $user_roles->Role->type->description;
            if (!empty($role_val)) {
                $user_role = user_role_load_by_name($role_val);
                if ($user_role === FALSE) {
                    $user_role = new stdClass();
                    $user_role->name = $role_val;
                    user_role_save($user_role);
                }
            }
        }
    } catch (SoapFault $f) {
        dpm($f);
        watchdog('eenterprise_bridge_auth', "Error: Cannot retrieve role information", array(), WATCHDOG_ERROR);
    }
}


function return_cdx_facility_management_token()
{
    //USER ROLE ID = 84401 from test
    // USER ROLE ID = 86357 from dev
//    $user_type = variable_get('cdx_user_type');
//    if ($user_type != 'CDX') {
//        exit();
//    }
//    global $user;
////    $user_data = user_load($user->uid);
////    $user_id = $user_data->mail;
//    $user_id = 'Franklipman';
//    $password = 'Cville77';
    $user_id = 'GREENOLIVE';
    try {
        // $client = new SoapClient("https://testngn.epacdxnode.net/cdx-register-II/services/RegisterService?wsdl", array('soap_version' => SOAP_1_2)); //variable_get('autenticate_cdx_token');
        $client = new SoapClient("https://devngn.epacdxnode.net/cdx-register-II/services/RegisterService?wsdl", array('soap_version' => SOAP_1_2)); //variable_get('autenticate_cdx_token');
    } catch (SoapFault $f) {
        var_dump($f);
        return;
    }
    $params = array(
        "userId" => $user_id,
        "credential" => $password,
        "domain" => "default",
        "authenticationMethod" => "password",
    );
    try {
        //Authenticate to CDX
        $response = $client->__soapCall("Authenticate", array($params));
        $token = $response->securityToken;
        $server_ip = variable_get('frs_api_lookup_ip');
        $json_return = array(
            'token' => $token,
            'server_ip' => $server_ip,
        );

    } catch (SoapFault $f) {
        var_dump($f);
        watchdog('eenterprise_bridge_auth', "Error: Cannot authenticate user to retrieve role information", array(), WATCHDOG_ERROR);
    }

//    $token = variable_get('cdx_fmw_security_token');
//    $server_ip = variable_get('frs_api_lookup_ip');
//        $json_return = array(
//            'token' => $token,
//            'server_ip' => $server_ip,
//        );

    print json_encode($json_return);
//    retrieve_cdx_user_data($user_id, $client);
}

function retrieve_cdx_user_data()
{
//    $user_id =     variable_get('userId');
//    $user_details =     variable_get('user_details');

    $module_path = drupal_get_path('module', 'cdx_facility_management');
//    new SoapClient($module_path . '/test.wsdl');

    $user_name = 'GREENOLIVE';


    try {
        //$_SERVER['DOCUMENT_ROOT']  . '/' . $module_path . '/test.wsdl'
        $module_path = drupal_get_path('module', 'cdx_facility_management');

        $client = new SoapClient("https://devngn.epacdxnode.net/cdx-register-II/services/RegisterService?wsdl", array('soap_version' => SOAP_1_2));
//        $client = new SoapClient($_SERVER['DOCUMENT_ROOT']  . '/' . $module_path . '/test.wsdl', array('soap_version' => SOAP_1_2));
    } catch(SoapFault $f) {
        dpm($f);
        drupal_set_message('Cannot connect to Registration Service. Role cannot be assigned to this user. please try again later.', 'error');
        watchdog('eenterprise_bridge_auth',"Error: Cannot connect to CDX RegisterService. Role cannot be assigned to this user", array(), WATCHDOG_ERROR);
        return;
    }
    $params1 = array(
        "userId" => "registration.dev@cgifederal.com",
        "credential" => "Devregistration1", //Testregistration1
        "domain" => "default",
        "authenticationMethod" => "password",
    );
    try {
        //Authenticate to CDX
        $response1 = $client->__soapCall("Authenticate", array($params1));
    } catch(SoapFault $f) {
        dpm($f);

        watchdog('eenterprise_bridge_auth',"Error: Cannot authenticate user to retrieve role information", array(), WATCHDOG_ERROR);
    }
    var_dump($response1->securityToken);

    print'<h1>' . dirname(__FILE__)   . '/local_dev_eactivity_dataflow.wsdl.xml</h1>';


//        $client2 = new SoapClient('https://devngn.epacdxnode.net/ngn-enws20/services/NetworkNode2ServiceConditionalMTOM?wsdl', array('soap_version' => SOAP_1_2));

//    exit();

    $local = variable_get('eactivity_dataflow_local');
    if ($local){
    print 'maded it!';
    }
    else {
        print 'nope!';
    }
    print '<h1>Here:' . variable_get('eactivity_dataflow_local') .  variable_get('frs_api_lookup_ip') . '</h1>';

try {
    $client2 = new SoapClient(dirname(__FILE__) . '/local_test_eactivity_dataflow.wsdl.xml', array('soap_version' => SOAP_1_2));
    dpm($client2);
}
catch (SoapFault $f) {
    dpm($f);
}

    $params2 = array(
        "securityToken" => $response1->securityToken,
        "dataflow" => "E-ACTIVITY",
        "request" => "GetByUser",
        "rowId" => 0,
        "maxRows" => -1,
        "parameters" => array("_" => strtoupper('laurend15'), "parameterEncoding"=>"None", "parameterName"=>"user"),
    );
    try{
        $resp = $client2->__soapCall("Query",array($params2));
        $resp = $resp->results->any;
        $resp = simplexml_load_string($resp);

        foreach($resp->children('http://www.exchangenetwork.net/schema/eact/1') as $activity)
        {

            $res = array("EActivityId" => (string)$activity->EActivityId,
                "PartnerSystemId" => (string)$activity->PartnerSystemId,
                "PartnerExternalId" => (string)$activity->PartnerExternalId,
                "PartnerSystemReportType" => (string)$activity->PartnerSystemReportType,
                "ActivityType" => (string)$activity->ActivityType,
                "ActivityDesc" => (string)$activity->ActivityDesc,
                "ActivityCreateDate" => (string)$activity->ActivityCreateDate,
                "ActivitySourceURL" => (string)$activity->ActivitySourceURL,
                "ActivityExpirationDate" => (string)$activity->ActivityExpirationDate,
                "Status" => (string)$activity->Status,
                "StatusNote" => (string)$activity->StatusNote,
                "StatusUpdateDate" => (string)$activity->StatusUpdateDate,
                "UserId" => (string)$activity->UserId,
                "RoleId" => (string)$activity->RoleId,
                "RoleIdSubject" => (string)$activity->RoleIdSubject ,
                "Attributes" => (string)$activity->Attributes ,);
            foreach($activity->Attributes->Attribute as $child){
                if((string)($child->attributes()) == 'facilityName')
                    $res['FacilityName'] = $child->__toString();
                else if((string)($child->attributes()) == 'partCode')
                    $res['partCode'] = $child->__toString();
                else if((string)($child->attributes()) == 'partName')
                    $res['partName'] = $child->__toString();
                else if((string)($child->attributes()) == 'subPartCode')
                    $res['subPartCode'] = $child->__toString();
                else if((string)($child->attributes()) == 'subPartName')
                    $res['subPartName'] = $child->__toString();
                else if((string)($child->attributes()) == 'facilityRegistryIdentifier')
                    $res['facilityRegistryIdentifier'] = $child->__toString();
            }
            $i=0;
            foreach ($activity->Documents->Document as $child) {
                $res['Documents'][$i]['id'] = $child->Id->__toString();
                $res['Documents'][$i]['name'] = 'sites/default/files/'.$child->Name->__toString();
                $res['Documents'][$i]['typeId'] = $child->TypeId->__toString();
                $res['Documents'][$i]['size'] = $child->Size->__toString();
                $res['Documents'][$i]['createDate'] = $child->CreateDate->__toString();
                $res['Documents'][$i]['transactionId'] = $child->TransactionId->__toString();
                $i++;

                $param_attch_type = array("_" => $child->Id->__toString(),
                    "contentType" => array($child->TypeId->__toString()));
                $param_doc_id = $child->Id->__toString();

                $param_doc = array(
                    "documentName" => $child->Name->__toString(),
                    "documentFormat" => array($child->TypeId->__toString()),
                    "documentContent" => $param_attch_type,
                    "documentId" => $param_doc_id,
                );

                $param_dl1 = array(
                    "securityToken" => $response1->securityToken,
                    "dataflow" => "E-ACTIVITY",
                    "transactionId" => $child->TransactionId->__toString(),
                    "documents" => $param_doc,
                );
                $resp_dl = $client2->__soapCall("Download", array($param_dl1));

                $INPUT = $resp_dl->documents->documentContent->_;
                $file = 'sites/default/files/'.$child->Name->__toString();
                file_put_contents($file, $INPUT);
            }
            dpm($res);
          //  create_progress_tracker_node($res, $user);
        }
    }
    catch(SoapFault $f){
        dpm($f);
        drupal_set_message('Cannot query.', 'error');
        watchdog('eenterprise_bridge_auth',"Error: Cannot query.", array(), WATCHDOG_ERROR);
        return;
    }
}