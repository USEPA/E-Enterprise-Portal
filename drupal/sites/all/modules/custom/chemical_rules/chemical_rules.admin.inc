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

  $form['#submit'][] = 'chemical_rules_admin_form_submit';
  return system_settings_form($form);
}

function chemical_rules_admin_form_submit($form, &$form_state){

  if(isset($form_state['input']['chemical_rules_clear_cache']) && $form_state['input']['chemical_rules_clear_cache'] == 1) {
    // Flip it back off
    $form_state['input']['chemical_rules_clear_cache'] = null;
    $form_state['values']['chemical_rules_clear_cache'] = 0;
    $form['chemical_rules_clear_cache']['#checked'] = false;
    $node_type = 'chemical';

    // Select the nodes that we want to delete.
    $result = db_select('node', 'n')
      ->fields('n', array('nid'))
      ->condition('type', $node_type, '=')
      ->execute();

    $deleted_count = 0;
    foreach ($result as $record) {
      node_delete($record->nid);
      $deleted_count++;
    }
    drupal_set_message("All chemical nodes ($deleted_count) have been deleted.");

    // Lets just clear the tax for good measure
    $vocabulary = taxonomy_vocabulary_machine_name_load('chemicals');
    foreach (taxonomy_get_tree($vocabulary->vid) as $term) {
      taxonomy_term_delete($term->tid);
    }
    drupal_set_message('All terms have been deleted from the '.$vocabulary->name.' vocabulary');
  }
}