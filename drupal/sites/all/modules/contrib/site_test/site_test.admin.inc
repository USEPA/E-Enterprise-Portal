<?php

/**
 * @file
 * Admin callbacks for site test module.
 */

/**
 * Form callback for displaying all site tests with run checkboxes.
 */
function site_test_list_form($form) {
  $form['tests'] = [
    '#type' => 'fieldset',
    '#title' => t('Tests'),
    '#description' => t('Select the test(s) or test group(s) you would like to run, and click <em>Run tests</em>.'),
  ];

  $form['tests']['table'] = [
    '#theme' => 'simpletest_test_table',
  ];

  $groups = site_test_get_all_tests();
  foreach ($groups as $group => $tests) {
    $form['tests']['table'][$group] = [
      '#collapsed' => TRUE,
    ];

    foreach ($tests as $class => $info) {
      $form['tests']['table'][$group][$class] = [
        '#type' => 'checkbox',
        '#title' => $info['name'],
        '#description' => $info['description'],
      ];
    }
  }

  // Operation buttons.
  $form['tests']['op'] = [
    '#type' => 'submit',
    '#value' => t('Run tests'),
  ];

  $form['clean'] = [
    '#type' => 'fieldset',
    '#collapsible' => FALSE,
    '#collapsed' => FALSE,
    '#title' => t('Clean test environment'),
    '#description' => t('Remove tables with the prefix "simpletest" and temporary directories that are left over from tests that crashed. This is intended for developers when creating tests.'),
  ];
  $form['clean']['op'] = [
    '#type' => 'submit',
    '#value' => t('Clean environment'),
    '#submit' => ['simpletest_clean_environment'],
  ];

  module_load_include('inc', 'simpletest', 'simpletest.pages');
  $form['#submit'][] = 'simpletest_test_form_submit';

  return $form;
}

/**
 * Get a list of all of the site tests available.
 */
function site_test_get_all_tests() {
  simpletest_test_get_all();
  $site_test_cache = cache_get(SITE_TEST_LIST_CID);

  return $site_test_cache->data;
}
