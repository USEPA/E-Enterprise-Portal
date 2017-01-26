<?php
/**
 * Created by PhpStorm.
 * User: smolinsk
 * Date: 11/30/2016
 * Time: 3:57 PM
 */


$feature_flags = [

  'sample_rcs_data' => [
    'name' => 'Use sample RCS data for LGC widget'
  ],
  'mycdx_connections' => [
    'name' => 'See MyCDX Connections (experimental)'
  ],
  'sample_mycdx_data' => [
    'name' => 'Use sample data for My CDX block'
  ],
  'sample_eactivity_data' => [
    'name' => 'Use sample data for E-Activity Flow'
  ],
  'use_new_method_for_cdx_js' => [
    'name' => 'Load js and css for FRS Facility Manager via drupal_add_js/drupal_add_css,
                as opposed to hardcoded script and link tags'
  ],
  'cdx_dev_mode' => [
    'name' => 'cdx_dev_mode'
  ],
  'rcs_dev_mode' => [
    'name' => 'Enables RCS test data (Requires that Sample RCS Data feature toggle to be off)'
  ],
  'be_well_informed_sample_data' => [
    'name' => 'be_well_informed_sample_data'
  ],
  'chemical_rules_sample_data' => [
    'name' => 'Enables Sample Chemical Rules data'
  ],
  'chemical_rules_no_cache_data' => [
    'name' => 'Prevents Cached Chemical Rules data'
  ],
  'profile_enable_cdx_naics' => [
    'name' => 'Enable loading profile with CDX NAICS data'
  ],

  'reuse_token_from_bridge' => [
    'name' => 'Renew token from bridge, then use for Facility Widget instead of creating a new token.'
  ],
  'sample_instant_connect' => [
    'name' => 'Restrict App Connect links to only one org/role to simulate Instant Connect.'
  ],
  'remove_token_invalidation_check' => [
    'name' => 'Remove redundant validation check from CDX Facility Management (experimental)'
  ],
  'mo_lgc_data' => [
    'name' => "Turn on Missouri LGC Data and feed into LGC Widget"
  ],
  'aws_environment' => [
    'name' => "Enable for AWS/Showcase environments"
  ],

];


return $feature_flags;