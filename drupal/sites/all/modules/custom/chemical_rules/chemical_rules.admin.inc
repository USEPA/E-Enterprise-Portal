<?php
/**
 * Created by PhpStorm.
 * User: smolinsk
 * Date: 11/29/2016
 * Time: 8:15 AM
 */

function chemical_rules_admin($form, $form_state) {
  $form = array();

  $form['chemical_rules_max_cache'] = array(
    '#type' => 'textfield',
    '#title' => t('Chemical cache lifespan'),
    '#default_value' => variable_get('chemical_rules_max_cache', '+1 month'),
    '#description' => t("The maximum lifespan of the individual chemical substance information cache before they are renewed by the system."),
    '#required' => TRUE,
  );

  $form['chemical_rules_clear_cache'] = array(
    '#type' => 'checkbox',
    '#title' => t('Clear Cache'),
    '#default_value' => variable_get('chemical_rules_clear_cache', false),
    '#description' => t("Delete all saved chemical nodes and remove all chemical tags"),
  );

  $form['chemical_rules_settings'] = array(
      '#type' => 'fieldset',
      '#title' => t('Chemical Rules configurations'),
  );

  $form['chemical_rules_settings']['cdx_program_facility_endpoint'] = array(
      '#type' => 'textfield',
      '#title' => t('CDX Program Facility Service Endpoint'),
      '#default_value' => variable_get('cdx_program_facility_endpoint', "https://devngn.epacdxnode.net/cdx-register-II/services/RegisterProgramFacilityService?wsdl"),
      '#required' => TRUE,
  );

  $form['chemical_rules_settings']['naics_dataflows'] = array(
      '#type' => 'textfield',
      '#title' => t('NAICS Dataflows'),
      '#description' => t('Comma delimited list of dataflows where NAICS codes are applicable. Ex. TRIMEweb,FAR'),
      '#default_value' => variable_get('naics_dataflows'),
  );

  $form['chemical_rules_settings']['naics_getbycode_endpoint'] = array(
      '#type' => 'textfield',
      '#title' => t('NAICS Get Code(s) by Code Service Endpoint'),
      '#description' => t('Endpoint to append NAICS code to in order to retrieve detail information (assumes 2012 year set)'),
      '#default_value' => variable_get('naics_getbycode_endpoint', 'https://ends2.epa.gov/RestProxy/Query?Node=.NetNode2&Dataflow=NAICS&Request=GetNAICSCodesByCode_v1.0&Params=CodeSetYear|2012;Code|'),
      '#maxlength' => 256,
  );

  $form['chemical_rules_settings']['elastic_search_endpoint'] = array(
    '#type' => 'textfield',
    '#title' => t('Elastic Search Endpoint'),
    '#description' => t('Endpoint to pull indexed information based on LRS data'),
    '#default_value' => variable_get('elastic_search_endpoint', 'http://ec2-52-54-71-189.compute-1.amazonaws.com:443/lrs_data_index/_search')
  );

  $form['chemical_rules_settings']['elastic_program_info_search_endpoint'] = array(
    '#type' => 'textfield',
    '#title' => t('Elastic Program Info Search Endpoint'),
    '#description' => t('Endpoint to pull indexed program information based on LRS data'),
    '#default_value' => variable_get('elastic_program_info_search_endpoint', 'http://ec2-52-54-71-189.compute-1.amazonaws.com:443/lrs_index/programInfo/_search?pretty')
  );

  $form['chemical_rules_settings']['w3_xml_schema'] = array(
    '#type' => 'textfield',
    '#title' => t('W3 XML Schema reference'),
    '#default_value' => variable_get('w3_xml_schema', 'http://www.w3.org/2001/XMLSchema')
  );

  $form['chemical_rules_settings']['srs_cas_endpoint'] = array(
    '#type' => 'textfield',
    '#title' => t('SRS CAS Number Endpoint'),
    '#description' => t('Endpoint used to pull substance information based on CAS#.  It should end with a pipe "|"'),
    '#default_value' => variable_get('srs_cas_endpoint', 'https://ends2.epa.gov/RestProxy/Query?Node=NGNProd2.0&Dataflow=SRS&Request=GetSubstanceByCAS&Params=CASRegistryNumber|')
  );

  $form['chemical_rules_settings']['srs_substance_name_endpoint'] = array(
    '#type' => 'textfield',
    '#title' => t('SRS Substance Name Endpoint'),
    '#description' => t('Endpoint used to pull substance information based on substance name.  It should end with a pipe "|"'),
    '#default_value' => variable_get('srs_substance_name_endpoint', 'https://ends2.epa.gov/RestProxy/Query?Node=NGNProd2.0&Dataflow=SRS&Request=GetSubstanceByName&Params=SubstanceName|')
  );

  $form['chemical_rules_settings']['lrs_endpoint'] = array(
    '#type' => 'textfield',
    '#title' => t('Substance List Endpoint'),
    '#description' => t('Endpoint used to pull a list of substances lists'),
    '#default_value' => variable_get('lrs_endpoint', 'https://ofmpub.epa.gov/lrswebservices/v1/SubstanceList')
  );

  $form['#validate'][] = 'chemical_rules_form_validate';
  $form['#submit'][] = 'chemical_rules_admin_form_submit';
  return system_settings_form($form);
}

function chemical_rules_admin_form_submit($form, &$form_state){

  if(isset($form_state['input']['chemical_rules_clear_cache']) && $form_state['input']['chemical_rules_clear_cache'] == 1) {
    // Flip it back off
    $form_state['values']['chemical_rules_clear_cache'] = 0;
    $form['chemical_rules_clear_cache']['#checked'] = false;

    // Update the nodes that we want to reset.
    $chemical_nodes_updated = db_update('node')
      ->fields([
        'changed'=> 0
      ])
      ->condition ('node.type', 'chemical')
      ->execute();
    drupal_set_message("All chemical nodes have been reset.");
  }
  variable_set('chemical_rules_settings_valid', TRUE);
}

/**
 * Implements hook_validate().
 */
function chemical_rules_form_validate($form, &$form_state) {

  if($form['#form_id'] == 'chemical_rules_admin') {
    if (strtotime($form_state['input']['chemical_rules_max_cache']) === false) {
      form_set_error('chemical_rules_max_cache', "The string \"".$form_state['input']['chemical_rules_max_cache']."\" is bogus. More information and examples at <a href='http://php.net/manual/en/function.strtotime.php#refsect1-function.strtotime-examples' target='_blank'>http://php.net</a>");
    }
  }
}