<?php

/**
 * @file
 * Webform Remote Post URL targets administration pages.
 */

/**
 * An overview of the URL repost targets associated with a given form.
 */
function webform_remote_post_targets_form($form, &$form_state, $webform_node) {

  $form['#tree'] = TRUE;
  $form['#node'] = $webform_node;

  // Internal to the form and never displayed to the screen.
  $form['nid'] = array(
    '#type' => 'value',
    '#value' => $webform_node->nid,
  );

  $targets = array();

  $targets = db_select('webform_remote_post_targets')
    ->fields('webform_remote_post_targets')
    ->condition('nid', $webform_node->nid)
    ->execute()
    ->fetchAllAssoc('tid', PDO::FETCH_ASSOC);

  foreach ($targets as $tid => $data) {
    $form['targets'][$tid]['status'] = array(
      '#type' => 'checkbox',
      '#default_value' => $data['enabled'],
      '#ajax' => array(
        'callback' => 'webform_remote_post_update_enabled_flag',
        'wrapper' => 'enabled_flag_' . $tid,
      ),
      '#prefix' => '<div id="enabled_flag_' . $tid . '">',
      '#suffix' => '</div>',
    );
    $form['targets'][$tid]['label'] = array(
      '#markup' => check_plain($data['label']),
    );
    $form['targets'][$tid]['url'] = array(
      '#markup' => check_plain($data['url']),
    );
   $form['targets'][$tid]['type'] = array(
      '#markup' => check_plain($data['type']),
    );
  }

  // Form elements for a new remote post target. Actually rendered by
  // the theme_webform_remote_post_targets_form function below.
  $form['add']['label'] = array(
    '#type' => 'textfield',
    '#title' => t('Label'),
    '#description' => t('The name of the remote system as displayed in the table above. E.g. "My CRM system"'),
    '#size' => 20,
    '#maxlength' => 60,
    '#required' => FALSE,
  );

  $form['add']['url'] = array(
    '#type' => 'textfield',
    '#title' => t('Target URL'),
    '#description' => t('The full URL to POST to. E.g. http://www.mycrm.com/form_handler.php'),
    '#size' => 100,
    '#maxlength' => 500,
    '#required' => TRUE,
  );
//  $form['add']['type'] = array(
//    '#type' => 'select',
//    '#title' => t('Post Type'),
//    '#options' => array(
//       'x-www-form-urlencoded' => t('x-www-form-urlencoded'),
//       'json' => t('JSON'),
//    ),
//    '#default_value' => 'x-www-form-urlencoded',
//    '#description' => t('Use x-www-form-urlencoded if unsure, as it is the default format for HTML forms. You also have the option to post data in <a href="http://www.json.org/" target="_blank">JSON</a> format.'),
//    '#required' => TRUE,
//  );
  $form['add_button'] = array(
    '#type' => 'submit',
    '#value' => t('Add'),
    '#weight' => 45,
  );

  $form['#validate'] = array('webform_remote_post_target_validate');

  return $form;
}

/**
 * Theme the node components form. Use a table to organize the components.
 *
 * @param array $variables
 *   An array representing the form, with these keys:
 *   - form: the form array.
 *
 * @return array
 *   Formatted HTML form, ready for display.
 */
function theme_webform_remote_post_targets_form($variables) {
  $form = $variables['form'];
  $webform_node = $form['#node'];
  $header = array(t('Enabled'), t('Label'), t('Target URL'), t('Post Type'), array('data' => t('Operations'), 'colspan' => 2));
  $rows = array();

  if (!empty($form['targets'])) {
    foreach (element_children($form['targets']) as $tid) {
      // Add each target to a table row.
      $rows[] = array(
        drupal_render($form['targets'][$tid]['status']),
        drupal_render($form['targets'][$tid]['label']),
        drupal_render($form['targets'][$tid]['url']),
        drupal_render($form['targets'][$tid]['type']),
        l(t('Edit'), 'node/' . $webform_node->nid . '/webform/targets/' . $tid),
        l(t('Delete'), 'node/' . $webform_node->nid . '/webform/targets/' . $tid . '/delete'),
      );
    }
  }
  else {
    $rows[] = array(array('data' => t('No remote target URLs specified yet. Add a target URL below.'), 'colspan' => 6));
  }

  // Add a row containing form elements for a new item.
  $row_data = array(
    array('colspan' => 5, 'data' => drupal_render($form['add'])),
    array('colspan' => 1, 'data' => drupal_render($form['add_button'])),
  );
  $rows[] = array('data' => $row_data, 'class' => array('webform-remote-post-add-target-form'));

  $output = '';
  $output .= theme('table', array(
    'header' => $header,
    'rows' => $rows,
    'attributes' => array('id' => 'webform-remote-post-targets')));
  $output .= drupal_render_children($form);
  return $output;
}

/**
 * Validate handler for webform_remote_post_targets_form().
 */
function webform_remote_post_target_validate($form, &$form_state) {
  if (!valid_url($form_state['values']['add']['url'])) {
    $url = trim($form_state['values']['add']['url']);
    form_set_error('url', t('The entered URL "@url" does not appear valid.', array('@url' => $url)));
  }
}

/**
 * Submit handler for webform_remote_post_forwards_form().
 */
function webform_remote_post_targets_form_submit($form, &$form_state) {
  // We are creating a new post target. Lets pass the data to the
  // individual remote post target edit settings form. Only the basic
  // fields are shown here. All advanced settings happen in the individual
  // remote post target settings form.
  $form_state['redirect'] = array('node/' . $form['#node']->nid . '/webform/targets/new', array('query' => array('url' => $form_state['values']['add']['url'], 'label' => $form_state['values']['add']['label'])));
}

/**
 * Submit handler for webform_remote_post_target_delete_form().
 */
function webform_remote_post_target_delete_form_submit($form, &$form_state, $webform_mode, $target_id) {

  // Delete the target entry.
  db_delete('webform_remote_post_targets')
    ->condition('nid', $webform_mode->nid)
    ->condition('tid', $target_id)
    ->execute();

  drupal_set_message(t('Remote post target deleted.'));
  drupal_goto('node/' . $webform_mode->nid . '/webform/targets');
}

/**
 * Callback for target enabled flag.
 *
 * @return array
 *   The textfield element renderable array
 */
function webform_remote_post_update_enabled_flag($form, $form_state) {
  // The form has already been submitted and updated. We can return the replaced
  // item as it is.
  // Looks like we can use $form_state['triggering_element'] to tell which
  // target to change:
  // $form_state['triggering_element']['value'] has the new value to set.
  // $form_state['values']['nid'] has the webform ID to chage.
  // What's the best place to get the target ID from? Best guess right now
  // is $form_state['triggering_element']['array_parents'][1] :-/
  $target_id = $form_state['triggering_element']['#array_parents'][1];

  // Update the remote post target:
  db_update('webform_remote_post_targets')
    ->fields(array(
      'enabled' => $form_state['triggering_element']['#value'],
    ))
    ->condition('nid', $form_state['values']['nid'])
    ->condition('tid', $target_id)
    ->execute();

  return $form['targets'][$target_id]['status'];
}

/**
 * Load a remote target setting from the database or initialize a new remote target.
 */
function webform_remote_post_target_load($tid, $nid) {

  if ($tid == 'new') {
    $target = array();
    if (isset($_GET['label']) && isset($_GET['url'])) {
      $target['label'] = $_GET['label'];
      $target['url']   = $_GET['url'];
    }
  } else {
    $target = db_select('webform_remote_post_targets')
      ->fields('webform_remote_post_targets', array('nid', 'tid', 'url', 'label', 'enabled', 'type'))
      ->condition('nid', $nid)
      ->condition('tid', $tid)
      ->execute()
      ->fetchAssoc('tid', PDO::FETCH_ASSOC);
  }
  #drupal_set_message(print_r($target, true));
  return $target;
}
