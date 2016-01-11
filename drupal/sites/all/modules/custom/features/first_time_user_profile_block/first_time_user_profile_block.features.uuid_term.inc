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
    'name' => 'General public',
    'description' => '',
    'format' => 'full_html',
    'weight' => 0,
    'uuid' => '0f2490cb-ce06-4920-ba9e-de842edb5270',
    'vocabulary_machine_name' => 'organizations',
  );
  $terms[] = array(
    'name' => '1,000,000+',
    'description' => '',
    'format' => 'full_html',
    'weight' => 0,
    'uuid' => '1f2e0923-7b92-4a1d-8dea-4b1c70a03d06',
    'vocabulary_machine_name' => 'community_sizes',
  );
  $terms[] = array(
    'name' => 'Local government',
    'description' => '',
    'format' => 'full_html',
    'weight' => 0,
    'uuid' => '409fc255-15ae-4677-a1a2-b4468867283e',
    'vocabulary_machine_name' => 'organizations',
  );
  $terms[] = array(
    'name' => 'Program manager',
    'description' => '',
    'format' => 'full_html',
    'weight' => 0,
    'uuid' => '5181b292-00af-45c0-bb19-3f90de2f55c1',
    'vocabulary_machine_name' => 'roles',
  );
  $terms[] = array(
    'name' => 'Business',
    'description' => '',
    'format' => 'full_html',
    'weight' => 0,
    'uuid' => '5db8aa0e-f769-41b5-9a60-3d1c4fc082ca',
    'vocabulary_machine_name' => 'organizations',
  );
  $terms[] = array(
    'name' => 'Research',
    'description' => '',
    'format' => 'full_html',
    'weight' => 0,
    'uuid' => '7b30c29b-2eff-425d-aaba-7b305beb33fd',
    'vocabulary_machine_name' => 'organizations',
  );
  $terms[] = array(
    'name' => 'Education',
    'description' => '',
    'format' => 'full_html',
    'weight' => 0,
    'uuid' => '8bfcca41-5df7-4521-9aae-4d47478bb090',
    'vocabulary_machine_name' => 'organizations',
  );
  $terms[] = array(
    'name' => '10,000 - 25,000',
    'description' => '',
    'format' => 'full_html',
    'weight' => 0,
    'uuid' => '8f8eeb91-6bf4-4457-89fb-c2077c97d6b6',
    'vocabulary_machine_name' => 'community_sizes',
  );
  $terms[] = array(
    'name' => '100,000 - 1,000,000',
    'description' => '',
    'format' => 'full_html',
    'weight' => 0,
    'uuid' => '90bd9a4c-34c4-4e61-ab3b-2437c111e4c9',
    'vocabulary_machine_name' => 'community_sizes',
  );
  $terms[] = array(
    'name' => '0 - 5,000',
    'description' => '',
    'format' => 'full_html',
    'weight' => 0,
    'uuid' => '94f292e5-c610-40b5-97b4-39f62827835a',
    'vocabulary_machine_name' => 'community_sizes',
  );
  $terms[] = array(
    'name' => 'Community outreach',
    'description' => '',
    'format' => 'full_html',
    'weight' => 0,
    'uuid' => '994e5c57-1f3a-4f92-930d-33d674bf9270',
    'vocabulary_machine_name' => 'roles',
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
    'name' => 'State government',
    'description' => '',
    'format' => 'full_html',
    'weight' => 0,
    'uuid' => 'b03f5b9b-af38-4379-b930-0471c3cc89ec',
    'vocabulary_machine_name' => 'organizations',
  );
  $terms[] = array(
    'name' => 'Data steward',
    'description' => NULL,
    'format' => NULL,
    'weight' => 0,
    'uuid' => 'b90ad2b1-8105-433e-a112-f782690a3e21',
    'vocabulary_machine_name' => 'roles',
  );
  $terms[] = array(
    'name' => 'Budget and operations',
    'description' => '',
    'format' => 'full_html',
    'weight' => 0,
    'uuid' => 'd4130d97-6180-415c-81ff-91ac73e97e36',
    'vocabulary_machine_name' => 'roles',
  );
  $terms[] = array(
    'name' => 'Federal government',
    'description' => '',
    'format' => 'full_html',
    'weight' => 0,
    'uuid' => 'ddaa9a2e-ebc4-4102-b9e3-1c96ff383d24',
    'vocabulary_machine_name' => 'organizations',
  );
  $terms[] = array(
    'name' => '25,000 - 100,000',
    'description' => '',
    'format' => 'full_html',
    'weight' => 0,
    'uuid' => 'e47df3bf-3947-499f-8aa4-af3d97694dfd',
    'vocabulary_machine_name' => 'community_sizes',
  );
  $terms[] = array(
    'name' => 'Utilities manager',
    'description' => NULL,
    'format' => NULL,
    'weight' => 0,
    'uuid' => 'eb996981-a02e-4691-bbc8-6cf76692b8c6',
    'vocabulary_machine_name' => 'roles',
  );
  return $terms;
}
