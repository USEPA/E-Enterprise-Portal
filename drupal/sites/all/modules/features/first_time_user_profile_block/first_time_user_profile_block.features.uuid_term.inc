<?php
/**
 * @file
 * first_time_user_profile_block.features.uuid_term.inc
 */

/**
 * Implements hook_uuid_features_default_terms().
 */
function first_time_user_profile_block_uuid_features_default_terms() {
  $terms = array();

  $terms[] = array(
    'name' => 'Business',
    'description' => '',
    'format' => 'full_html',
    'weight' => 6,
    'uuid' => '5db8aa0e-f769-41b5-9a60-3d1c4fc082ca',
    'vocabulary_machine_name' => 'organizations',
  );
  $terms[] = array(
    'name' => 'Research',
    'description' => '',
    'format' => 'full_html',
    'weight' => 5,
    'uuid' => '7b30c29b-2eff-425d-aaba-7b305beb33fd',
    'vocabulary_machine_name' => 'organizations',
  );
  $terms[] = array(
    'name' => '10,000 - 25,000',
    'description' => '',
    'format' => 'full_html',
    'weight' => 2,
    'uuid' => '8f8eeb91-6bf4-4457-89fb-c2077c97d6b6',
    'vocabulary_machine_name' => 'community_sizes',
  );
  $terms[] = array(
    'name' => '100,000 - 1,000,000',
    'description' => '',
    'format' => 'full_html',
    'weight' => 3,
    'uuid' => '90bd9a4c-34c4-4e61-ab3b-2437c111e4c9',
    'vocabulary_machine_name' => 'community_sizes',
  );
  $terms[] = array(
    'name' => '0 - 5,000',
    'description' => '',
    'format' => 'full_html',
    'weight' => 5,
    'uuid' => '94f292e5-c610-40b5-97b4-39f62827835a',
    'vocabulary_machine_name' => 'community_sizes',
  );
  $terms[] = array(
    'name' => '5,000 - 10,000',
    'description' => '',
    'format' => 'full_html',
    'weight' => 0,
    'uuid' => 'a9251587-a29d-47c0-954b-2c352aa3d31e',
    'vocabulary_machine_name' => 'community_sizes',
  );
  $terms[] = array(
    'name' => 'Federal government',
    'description' => '',
    'format' => 'full_html',
    'weight' => 1,
    'uuid' => 'ddaa9a2e-ebc4-4102-b9e3-1c96ff383d24',
    'vocabulary_machine_name' => 'organizations',
  );
  $terms[] = array(
    'name' => '25,000 - 100,000',
    'description' => '',
    'format' => 'full_html',
    'weight' => 4,
    'uuid' => 'e47df3bf-3947-499f-8aa4-af3d97694dfd',
    'vocabulary_machine_name' => 'community_sizes',
  );
  return $terms;
}
