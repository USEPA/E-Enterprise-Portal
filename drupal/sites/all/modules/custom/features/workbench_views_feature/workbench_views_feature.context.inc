<?php
/**
 * @file
 * workbench_views_feature.context.inc
 */

/**
 * Implements hook_context_default_contexts().
 */
function workbench_views_feature_context_default_contexts() {
  $export = array();

  $context = new stdClass();
  $context->disabled = FALSE; /* Edit this to true to make a default context disabled initially */
  $context->api_version = 3;
  $context->name = 'workbench';
  $context->description = '';
  $context->tag = 'workbench';
  $context->conditions = array(
    'path' => array(
      'values' => array(
        'workbench' => 'workbench',
      ),
    ),
  );
  $context->reactions = array(
    'block' => array(
      'blocks' => array(
        'views-dashboard_widget-block_1' => array(
          'module' => 'views',
          'delta' => 'dashboard_widget-block_1',
          'region' => 'content',
          'weight' => '-10',
        ),
        'views-news-block_1' => array(
          'module' => 'views',
          'delta' => 'news-block_1',
          'region' => 'content',
          'weight' => '-9',
        ),
        'views-to_do_list-block_1' => array(
          'module' => 'views',
          'delta' => 'to_do_list-block_1',
          'region' => 'content',
          'weight' => '-8',
        ),
        'views-your_interests-block_1' => array(
          'module' => 'views',
          'delta' => 'your_interests-block_1',
          'region' => 'content',
          'weight' => '-7',
        ),
        'views-facilities-block_1' => array(
          'module' => 'views',
          'delta' => 'facilities-block_1',
          'region' => 'content',
          'weight' => '-6',
        ),
      ),
    ),
  );
  $context->condition_mode = 0;

  // Translatables
  // Included for use with string extractors like potx.
  t('workbench');
  $export['workbench'] = $context;

  return $export;
}
