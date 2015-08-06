<?php
/**
 * @file
 * Implements the module's settings form and related callbacks.
 */

/**
 * Settings form.
 */
function ee_disclaimer_settings($form, &$form_state) {

  $form = array();
  $form['#tree'] = TRUE;

  $form['ee_disclaimer_settings'] = array(
    '#type' => 'fieldset',
    '#title' => t('E-Enterprise Disclaimer Settings'),
    '#description' => t("Configure the E-Enterprise disclaimer here."),
  );
  $form['ee_disclaimer_settings']['ee_disclaimer_date'] = array(
    '#type' => 'date_select',
    '#title' => t('Date Created'),
    '#default_value' => date('Y-m-d H:i:s'),
    '#required' => TRUE,
  );

    // --------------- Add more text box starts  ------------------------------

  $saved_categories = unserialize(variable_get('ee_disclaimer_categories'));

  $form['ee_disclaimer_settings']['categories_fieldset'] = array(
      '#type' => 'fieldset',
      '#title' => t('Suggestion Categories'),
      '#prefix' => '<div id="entry-fieldset-wrapper">',
      '#suffix' => '</div>',
      '#theme' => 'ee_disclaimer_settings_table_drag_components',
  );

  if (empty($form_state['pnum_categories'])) {
      $form_state['pnum_categories'] = count($saved_categories);
  }

  for ($i = 0; $i < $form_state['pnum_categories']; $i++) {

    if ($form_state['remove_categories'][$i] !== 1) {
      $form['ee_disclaimer_settings']['categories_fieldset'][$i]['categories'] = array(
          '#type' => 'textfield',
          '#title' => '',
          '#size' => 22,
          '#default_value' => $saved_categories[$i],
      );


      $form['ee_disclaimer_settings']['categories_fieldset'][$i]['weight'] = array(
        '#type' => 'textfield',
        '#default_value' => $i,
        '#size' => 3,
        '#attributes' => array('class' => array('item-row-weight')),
      ); 


      if ($form_state['pnum_categories'] > 1) {
        $form['ee_disclaimer_settings']['categories_fieldset'][$i]['delete_categories'] = array(
          '#type' => 'submit',
          '#value' => 'x',
          '#submit' => array('delete_category'),
          '#ajax' => array(
            'callback' => 'categories_callback',
            'wrapper' => 'entry-fieldset-wrapper',
          ),
          '#index' => $i,
        );
      }
    }
  }

  $form['ee_disclaimer_settings']['categories_fieldset'][0]['add_category_button'] = array(
      '#type' => 'submit',
      '#value' => '+',
      '#submit' => array('add_category'),
      '#ajax' => array(
          'callback' => 'categories_callback',
          'wrapper' => 'entry-fieldset-wrapper',
      ),
      '#id' => 'suggestion-box-add-category-button',
  );

  if ($no_js_use) {
      if (!empty($form['categories_fieldset']['remove_name']['#ajax'])) {
          unset($form['categories_fieldset']['remove_name']['#ajax']);
      }
      unset($form['categories_fieldset']['add_name']['#ajax']);
  }
  // ---------------  Add more text box ends ---------------------------------

  $form['ee_disclaimer_settings']['submit'] = array(
    '#type' => 'submit',
    '#value' => t('Save Configuration'),
  );

  // $form['#validate'][] = 'ee_disclaimer_settings_validate';
  $form['#submit'][] = 'ee_disclaimer_settings_submit';

  return $form;
}

// ---------------  AJAX CALLBACK  FUNCTIONS FOR TEXT FIELD-----------------

function add_category($form, &$form_state) {

  if (!isset($form_state['pnum_categories'])) {
      $form_state['pnum_categories'] = 1;
  }

  $form_state['pnum_categories']++;
  $form_state['rebuild'] = TRUE;
}

function delete_category($form, &$form_state) {

  $triggering_index = $form_state['triggering_element']['#index'];

  if (!isset($form_state['remove_categories'])) {
    $form_state['remove_categories'] = array();
  }

  $form_state['remove_categories'][$triggering_index] = 1;
  $form_state['rebuild'] = TRUE;
}

function categories_callback($form, $form_state) {
  return $form['ee_disclaimer_settings']['categories_fieldset'];
}

function ee_disclaimer_settings_submit($form, &$form_state) {
  variable_set('ee_disclaimer_email', $form_state['values']['ee_disclaimer_settings']['ee_disclaimer_email']);
  $keys = array();
  $category_map = array();
  foreach($form_state['values']['ee_disclaimer_settings']['categories_fieldset'] as $row) {
    if (!empty($row['categories'])) {
      $category_map[$row['weight']] = $row['categories'];
      $keys[] = $row['weight'];
    }
  }

  asort($keys);

  foreach ($keys as $key) {
    $categories[] = $category_map[$key];
  }

  variable_set('ee_disclaimer_categories', serialize($categories));
}