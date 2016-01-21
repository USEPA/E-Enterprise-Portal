<?php
/**
 * @file
 * recommended_resources_and_other_items.feeds_importer_default.inc
 */

/**
 * Implements hook_feeds_importer_default().
 */
function recommended_resources_and_other_items_feeds_importer_default() {
  $export = array();

  $feeds_importer = new stdClass();
  $feeds_importer->disabled = FALSE; /* Edit this to true to make a default feeds_importer disabled initially */
  $feeds_importer->api_version = 1;
  $feeds_importer->id = 'lgc';
  $feeds_importer->config = array(
    'name' => 'LGC',
    'description' => 'Imports content for LGC taxonomy',
    'fetcher' => array(
      'plugin_key' => 'FeedsFileFetcher',
      'config' => array(
        'allowed_extensions' => 'txt csv tsv xml opml',
        'direct' => 0,
        'directory' => 'public://feeds',
        'allowed_schemes' => array(
          'public' => 'public',
        ),
      ),
    ),
    'parser' => array(
      'plugin_key' => 'FeedsCSVParser',
      'config' => array(
        'delimiter' => ',',
        'no_headers' => 0,
      ),
    ),
    'processor' => array(
      'plugin_key' => 'FeedsNodeProcessor',
      'config' => array(
        'expire' => '-1',
        'author' => 0,
        'authorize' => 1,
        'mappings' => array(
          0 => array(
            'source' => 'Topic',
            'target' => 'field_lgc_topic',
            'term_search' => '0',
            'autocreate' => 1,
          ),
          1 => array(
            'source' => 'Tool Type',
            'target' => 'field_lgc_tool_type',
            'unique' => FALSE,
          ),
          2 => array(
            'source' => 'Name',
            'target' => 'title',
            'unique' => FALSE,
          ),
          3 => array(
            'source' => 'Description',
            'target' => 'field_lgc_description',
            'unique' => FALSE,
          ),
          4 => array(
            'source' => 'Category',
            'target' => 'field_lgc_category',
            'term_search' => '0',
            'autocreate' => 1,
          ),
          5 => array(
            'source' => 'Tool Type',
            'target' => 'field_lgc_tool_type',
            'unique' => FALSE,
          ),
          6 => array(
            'source' => 'Availability',
            'target' => 'field_lgc_availability',
            'unique' => FALSE,
          ),
          7 => array(
            'source' => 'Update Frequently',
            'target' => 'field_lgc_update_frequently',
            'unique' => FALSE,
          ),
          8 => array(
            'source' => 'Relevance',
            'target' => 'field_lgc_relevance',
            'term_search' => '0',
            'autocreate' => 1,
          ),
          9 => array(
            'source' => 'Training Level',
            'target' => 'field_lgc_training_level',
            'unique' => FALSE,
          ),
          10 => array(
            'source' => 'Ease of Use',
            'target' => 'field_lgc_ease_of_use',
            'unique' => FALSE,
          ),
          11 => array(
            'source' => 'Data/Resource Requirements',
            'target' => 'field_lgc_data_requirements',
            'unique' => FALSE,
          ),
          12 => array(
            'source' => 'Recommendation',
            'target' => 'field_lgc_recommendation',
            'unique' => FALSE,
          ),
          13 => array(
            'source' => 'Comments',
            'target' => 'field_lgc_comments',
            'unique' => FALSE,
          ),
          14 => array(
            'source' => 'ID',
            'target' => 'field_lgc_id',
            'unique' => FALSE,
          ),
          15 => array(
            'source' => 'Link',
            'target' => 'field_lgc_link',
            'unique' => FALSE,
          ),
        ),
        'update_existing' => '1',
        'update_non_existent' => 'delete',
        'input_format' => 'plain_text',
        'skip_hash_check' => 0,
        'bundle' => 'lgc_resource',
      ),
    ),
    'content_type' => '',
    'update' => 0,
    'import_period' => '-1',
    'expire_period' => 3600,
    'import_on_create' => 1,
    'process_in_background' => 0,
  );
  $export['lgc'] = $feeds_importer;

  return $export;
}
