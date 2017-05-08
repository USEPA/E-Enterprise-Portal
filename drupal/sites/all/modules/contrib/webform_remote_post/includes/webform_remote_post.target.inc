<?php

/**
 * @file
 * Webform Remote Post URL single target edit page.
 */

/**
 * Form for configuring an individual remote post target settings.
 * @param array $form
 * @param array $form_state
 * @param array $webform_node An array representing a webform node.
 * @param integer $target A webform remote post target.
 */
function webform_remote_post_target_edit_form($form, &$form_state, $webform_node, $target = array()){

  #drupal_set_message('In ' . __FILE__ . ' line ' . __LINE__ . ', form is: ' . print_r($form, true));
  $form['#tree'] = TRUE;
  $form['#node'] = $webform_node;

  #drupal_set_message(print_r($target, true));
  // Internal to the form and never displayed to the screen.
  $form['nid'] = array(
    '#type' => 'value',
    '#value' => $webform_node->nid,
  );

  if (isset($target['tid'])) {
    $form['tid'] = array(
      '#type' => 'value',
      '#value' => $target['tid'],
    );
  }

  // Form elements for a remote post target settings. Actually rendered by
  // the theme_webform_remote_post_target_edit_form function below.
  $form['edit']['label'] = array(
    '#type' => 'textfield',
    '#title' => t('Label'),
    '#description' => t('The name of the remote system as displayed in the table above. E.g. "My CRM system"'),
    '#size' => 20,
    '#maxlength' => 60,
    '#required' => FALSE,
    '#value' => $target['label'],
  );

  $form['edit']['url'] = array(
    '#type' => 'textfield',
    '#title' => t('Target URL'),
    '#description' => t('The full URL to POST to. E.g. http://www.mycrm.com/form_handler.php'),
    '#size' => 100,
    '#maxlength' => 500,
    '#required' => TRUE,
    '#value' => $target['url'],
  );

  $form['edit']['type'] = array(
    '#type' => 'select',
    '#title' => t('Post Type'),
    '#options' => array(
      'x-www-form-urlencoded' => t('x-www-form-urlencoded'),
      'json' => t('JSON'),
    ),
    '#default_value' => 'x-www-form-urlencoded',
    #'#value' => $target['type'],
    #'#value' => 'json',
    '#description' => t('Use x-www-form-urlencoded if unsure, as it is the default format for HTML forms. You also have the option to post data in <a href="http://www.json.org/" target="_blank">JSON</a> format.'),
    '#required' => TRUE,
  );
  if (isset($target['type'])) {
    $form['edit']['type']['#value'] = $target['type'];
  }

  // Add the submit button.
  $form['submit'] = array(
    '#type' => 'submit',
    '#value' => t('Save remote post settings'),
    '#weight' => 20,
  );
  #drupal_set_message('In ' . __FILE__ . ' line ' . __LINE__ . ', form is: ' . print_r($form, true));
  return $form;
}

/**
 * Theme the remote post settings section of the node form.
 * @param array $variables
 *   An array representing the form, with these keys:
 *   - form: the form array.
 *
 * @return array
 *   Formatted HTML form, ready for display.
 */
function theme_webform_remote_post_target_edit_form($variables) {
  $form = $variables['form'];
  $children = element_children($form, TRUE);
  return drupal_render_children($form, $children);
}

/**
 * Submit handler for webform_remote_post_target_edit_form().
*/
function webform_remote_post_target_edit_form_submit($form, &$form_state) {
  $target = array();

  #drupal_set_message('In ' . __FILE__ . ' line ' . __LINE__ . ', $form_state is: ' . print_r($form_state, true));

  // Optional fields:
  if (!empty($form_state['input']['edit']['label'])) {
    $target['label'] = trim($form_state['input']['edit']['label']);
  }

  // Required fields:
  $target['url']  = trim($form_state['input']['edit']['url']);
  $target['type'] = trim($form_state['input']['edit']['type']);
  $target['nid']  = trim($form_state['values']['nid']);

  if (!isset($form_state['values']['tid'])) {
    // TODO: Like in webform, this is not race-condition safe.
    // Switch to using transactions as well?
    $next_id_query = db_select('webform_remote_post_targets')->condition('nid', $target['nid']);
    $next_id_query->addExpression('MAX(tid) + 1', 'tid');
    $next_id = $next_id_query->execute()->fetchField();
    if ($next_id == NULL) {
      $target['tid'] = 1;
    } else {
      $target['tid'] = $next_id;
    }
    $success = drupal_write_record('webform_remote_post_targets', $target);
  } else {
    $target['tid'] = trim($form_state['values']['tid']);
    #drupal_set_message('In ' . __FILE__ . ' line ' . __LINE__ . ', $target is: ' . print_r($target, true));
    $success = drupal_write_record('webform_remote_post_targets', $target, array('nid', 'tid'));
  }

  #drupal_set_message('In ' . __FILE__ . ' line ' . __LINE__ . ', $success is: ' . print_r($success, true));

  // Write a log if we weren't able to save the target successfully.
  if ($success === FALSE) {
    watchdog('webform_remote_post', 'There was an error writing a new remote post target to the database.', array(), WATCHDOG_ERROR);
  }

  $form_state['redirect'] = 'node/' . $form['#node']->nid . '/webform/targets/';
}
