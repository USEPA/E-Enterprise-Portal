<?php
/**
 * Created by PhpStorm.
 * User: smolinsk
 * Date: 10/31/2017
 * Time: 11:17 AM
 */

/**
 * Load Partner code based on role id
 * @param integer $rid
 * @return string
 */
function _load_partner_by_rid($rid) {
  $query = new EntityFieldQuery;
  $query->entityCondition('entity_type', 'node')
    ->entityCondition('bundle', 'esmt_partner')
  ->fieldCondition('field_scs_role_id', 'value', $rid);

  $results = $query->execute();
  if (isset($results['node'])) {
    $nids = array_keys($results['node']);
    $partner_node = entity_load('node', $nids);
    foreach($partner_node as $pk=>$po) {
      // Extracting partner found in first node
      return $po->esmt_service_partner_code[LANGUAGE_NONE][0]['value'];
    }
    return '';
  }
}

function be_well_informed_configurations_form($form, &$form_state) {
  drupal_add_css(drupal_get_path('module', 'be_well_informed') . '/css/be_well_informed_form.css', [
    'preprocess' => TRUE,
    'group' => CSS_THEME
  ]);
  $partner = '';
  if (isset($_GET['rid'])) {
    $partner = _load_partner_by_rid($_GET['rid']);
  }
  if ($partner == ''){
    drupal_set_message('You must select a service flow below to configure.');
    drupal_goto('/esmt-service');
  }
  drupal_set_title('Be Well Informed ' . $partner);


  $form['configuration_form']['partner'] = array(
    '#type' => 'file',
    '#title' => t('Partner Configuration'),
    '#description' => t('Upload your configurations, allowed extensions: xml'),
  );

  $form['configuration_form']['flowchart'] = array(
    '#type' => 'file',
    '#title' => t('Flowchart Configurations'),
    '#description' => t('Upload your configurations, allowed extensions: xml'),
  );

  $form['submit_button'] = array(
    '#type' => 'submit',
    '#value' => t('Submit'),
  );

  drupal_add_js(drupal_get_path('module', 'be_well_informed') . '/js/be_well_informed_file_upload.js', [
    'scope' => 'footer',
    'preprocess' => TRUE,
    'group' => JS_DEFAULT,
    'type' => 'file',
    'cache' => TRUE,
    'requires_jquery' => TRUE
  ]);

  // Add dynamic file size to Drupal.settings
  drupal_add_js(
    ["be_well_informed" =>
      [
        "file_limit" =>  variable_get("bwi_service_upload_file_size_limit", '2')
      ]
    ], 'setting');

  return $form;
}

/**
 * Implements hook_form_form_id_alter ().
 *
 * Using this to modify the form based on permissions and for customization
 */
function be_well_informed_form_be_well_informed_configurations_form_alter(&$form, &$form_state, $form_id) {
  global $user;

  // Drupal Admins need the ability to modify partner configs
  if(in_array('admin', $user->roles)) {
    // @todo modify form to provide a drop down of possible partners
    $form['configuration_form']['partner_code'] = array(
      '#type' => 'textfield',
      '#title' => t('Partner Code'),
      '#description' => t('Enter the partner code'),
      '#required' => TRUE,
    );
  }
}

function _bwi_file_validate($file, $file_limit, $user_limit) {

  global $user;
  $errors = array();

  if ($file_limit && $file->filesize == 0) {
    $errors[] = t('The file is %filesize is empty', array('%filesize' => format_size($file->filesize)));
  }

  if ($file_limit && $file->filesize > $file_limit) {
    $errors[] = t('The file is %filesize exceeding the maximum file size of %maxsize.', array('%filesize' => format_size($file->filesize), '%maxsize' => format_size($file_limit)));
  }

  // Save a query by only calling file_space_used() when a limit is provided.
  if ($user_limit && (file_space_used($user->uid) + $file->filesize) > $user_limit) {
    $errors[] = t('The file is %filesize which would exceed your disk quota of %quota.', array('%filesize' => format_size($file->filesize), '%quota' => format_size($user_limit)));
  }

  return $errors;
}

/**
 * Verify file contents are valid XML
 * @param $file
 * @return mixed
 */
function _validate_valid_xml($file) {
  $errors = [];

  $content = file_get_contents($file->uri);
  $version = '1.0';
  $encoding = 'utf-8';

  libxml_use_internal_errors(true);

  $doc = new DOMDocument($version, $encoding);
  $doc->loadXML($content);

  $xml_errors = libxml_get_errors();
  libxml_clear_errors();

  while($e = array_pop($xml_errors)) {
    $errors[] = $e->message;
  }
  return $errors;
}

function _bwi_xml_partner_validation($file) {
  $errors = array();
  try {

  } catch (Exception $e) {

  }
  return $errors;
}

function _bwi_xml_flowchart_validation($file) {
  $errors = array();
  try {

  } catch (Exception $e) {

  }
  return $errors;
}

function be_well_informed_configurations_form_validate($form, &$form_state) {
  // File_save_upload temporarily stores the file for evaluation
  $file_size = variable_get("bwi_service_upload_file_size_limit", '2'); // default

  // Validate account setting
  $partner_file = file_save_upload('partner', [
    'file_validate_extensions' => ['xml'],
    '_validate_valid_xml' => [],
    '_bwi_file_validate'=>[1024*1024*$file_size],
    '_bwi_xml_partner_validation'=>[]
  ]);

  // Validate Flowchart settings
  $flowchart_file = file_save_upload('flowchart', [
    'file_validate_extensions' => ['xml'],
    '_validate_valid_xml' => [],
    '_bwi_file_validate'=>[1024*1024*$file_size],
    '_bwi_xml_flowchart_validation'=>[]
  ]);
}

function _user_managed_partner() {
  global $user;
  $user_data = user_load($user->uid);
  $user_location = '';
  if (isset($user_data->field_admin_state[LANGUAGE_NONE])) {
    $user_location = $user_data->field_admin_state[LANGUAGE_NONE][0]['safe_value'];
  }
  return $user_location;
}

function be_well_informed_configurations_form_submit($form, &$form_state) {
  // An Drupal admin can override the locations
  if($form_state['values']['partner_code']) {
    $user_location = $form_state['values']['partner_code'];
  }
  else {
    if (isset($_GET['rid'])) {
      $user_location = _load_partner_by_rid($_GET['rid']);
    }
  }
  // Clean up whitespace and make is all uppercase
  $user_location = strtoupper(trim($user_location));

  if (empty($user_location)) {
    drupal_set_message('Your account has not been assigned a location for administering Be Well Informed 
    configurations.', 'error');
  }
  else {
    //_update_partner_service_status();
    // Pass the file to the CDX hosted service.
    $cdx_upload_url = variable_get("bwi_service_url", 'https://nodeweb.epacdxnode.net/BWIService/bwievaluation');
    $params = ['statecode' => $user_location];
    // file_save_upload temporarily stores the file for evaluation
    $partner_file = file_save_upload('partner');
    $flowchart_file = file_save_upload('flowchart');

    if ($partner_file) {
      $partner_file_content = file_get_contents($partner_file->uri);
      // Cache the partner configuration xml locally
      variable_set('partner-' . $user_location, $partner_file_content);
      // Prep the base64 encoded content for sending to the service
      $partner_file_encoded = base64_encode($partner_file_content);
      $params['PartnerContent'] = $partner_file_encoded;
    }
    if ($flowchart_file) {
      $flowchart_file_content = file_get_contents($flowchart_file->uri);
      // Cache the partner configuration xml locally
      variable_set('flowchart-' . $user_location, $flowchart_file_content);
      // Prep the base64 encoded content for sending to the service
      $flowchart_file_encoded = base64_encode($flowchart_file_content);
      $params['FlowchartContent'] = $flowchart_file_encoded;
    }

    $response = drupal_http_request($cdx_upload_url,
      [
        'method' => 'POST',
        'data' => json_encode($params),
        'headers' => ['Content-Type' => 'application/json', 'Accept' => 'application/json']
      ]
    );

    if ($response->code != 200) {
      drupal_set_message('Unable to upload file to BWI service.', 'error');
      drupal_set_message('Response code: '. $response->code, 'error');
      drupal_set_message('Response message: '. $response->status_message, 'error');
      drupal_set_message('Response error: '. $response->error, 'error');
    }
    else {
      if ($partner_file) {
        drupal_set_message('Successfully uploaded partner configurations to BWI service.', 'success');
      }
      if ($flowchart_file) {
        // Validate Flowchart settings
        drupal_set_message('Successfully uploaded flowchart configurations to BWI service.', 'success');
      }
    }
  }
}