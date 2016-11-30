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