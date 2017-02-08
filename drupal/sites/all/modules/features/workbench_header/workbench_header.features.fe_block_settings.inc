<?php
/**
 * @file
 * workbench_header.features.fe_block_settings.inc
 */

/**
 * Implements hook_default_fe_block_settings().
 */
function workbench_header_default_fe_block_settings() {
  $export = array();

  $export['version'] = '2.0';

  $export['block-anonymous_user_login_buttons'] = array(
    'cache' => -1,
    'css_class' => 'button-menu',
    'custom' => 0,
    'machine_name' => 'anonymous_user_login_buttons',
    'module' => 'block',
    'node_types' => array(),
    'pages' => 'ee_disclaimer
bridge-landing
new-users',
    'roles' => array(
      'anonymous user' => 1,
    ),
    'themes' => array(
      'bartik' => array(
        'region' => '',
        'status' => 0,
        'theme' => 'bartik',
        'weight' => 0,
      ),
      'eenterprise' => array(
        'region' => 'header',
        'status' => 1,
        'theme' => 'eenterprise',
        'weight' => 0,
      ),
      'seven' => array(
        'region' => '',
        'status' => 0,
        'theme' => 'seven',
        'weight' => 0,
      ),
    ),
    'title' => 'Login Buttons for Anonymous Users',
    'visibility' => 0,
  );

  $export['block-ee_header_locations'] = array(
    'cache' => -1,
    'css_class' => 'usa-width-one-half',
    'custom' => 0,
    'machine_name' => 'ee_header_locations',
    'module' => 'block',
    'node_types' => array(),
    'pages' => 'eenterprise-new
eenterprise-alternate',
    'roles' => array(
      'anonymous user' => 1,
      'authenticated user' => 2,
    ),
    'themes' => array(
      'bartik' => array(
        'region' => '',
        'status' => 0,
        'theme' => 'bartik',
        'weight' => 0,
      ),
      'eenterprise' => array(
        'region' => 'navigation',
        'status' => 1,
        'theme' => 'eenterprise',
        'weight' => -24,
      ),
      'seven' => array(
        'region' => '',
        'status' => 0,
        'theme' => 'seven',
        'weight' => 0,
      ),
    ),
    'title' => '',
    'visibility' => 0,
  );

  $export['block-ee_portal_maintenance'] = array(
    'cache' => -1,
    'css_class' => 'usa-alert-heading usa-alert usa-alert-error',
    'custom' => 0,
    'machine_name' => 'ee_portal_maintenance',
    'module' => 'block',
    'node_types' => array(),
    'pages' => '',
    'roles' => array(),
    'themes' => array(
      'bartik' => array(
        'region' => '',
        'status' => 0,
        'theme' => 'bartik',
        'weight' => 0,
      ),
      'eenterprise' => array(
        'region' => '',
        'status' => 0,
        'theme' => 'eenterprise',
        'weight' => 0,
      ),
      'seven' => array(
        'region' => '',
        'status' => 0,
        'theme' => 'seven',
        'weight' => 0,
      ),
    ),
    'title' => '',
    'visibility' => 0,
  );

  $export['block-ee_showcase_disclaimer'] = array(
    'cache' => -1,
    'css_class' => '',
    'custom' => 0,
    'machine_name' => 'ee_showcase_disclaimer',
    'module' => 'block',
    'node_types' => array(),
    'pages' => '<?php
module_load_include(\'inc\', \'feature_toggle\', \'includes/feature_toggle.api\');
return feature_toggle_get_status(\'aws_environment\');
?>',
    'roles' => array(),
    'themes' => array(
      'bartik' => array(
        'region' => '',
        'status' => 0,
        'theme' => 'bartik',
        'weight' => 0,
      ),
      'eenterprise' => array(
        'region' => 'disclaimer',
        'status' => 1,
        'theme' => 'eenterprise',
        'weight' => 0,
      ),
      'seven' => array(
        'region' => '',
        'status' => 0,
        'theme' => 'seven',
        'weight' => 0,
      ),
    ),
    'title' => '',
    'visibility' => 2,
  );

  $export['block-guest_user_login_buttons'] = array(
    'cache' => -1,
    'css_class' => 'button-menu',
    'custom' => 0,
    'machine_name' => 'guest_user_login_buttons',
    'module' => 'block',
    'node_types' => array(),
    'pages' => 'ee_disclaimer
bridge-landing
new-users',
    'roles' => array(
      'Guest User' => 20,
    ),
    'themes' => array(
      'bartik' => array(
        'region' => '',
        'status' => 0,
        'theme' => 'bartik',
        'weight' => 0,
      ),
      'eenterprise' => array(
        'region' => 'header',
        'status' => 1,
        'theme' => 'eenterprise',
        'weight' => 0,
      ),
      'seven' => array(
        'region' => '',
        'status' => 0,
        'theme' => 'seven',
        'weight' => 0,
      ),
    ),
    'title' => 'Login Buttons - Guest Authenticated Users',
    'visibility' => 0,
  );

  $export['menu-menu-footer-disclaimers'] = array(
    'cache' => -1,
    'css_class' => '',
    'custom' => 0,
    'delta' => 'menu-footer-disclaimers',
    'module' => 'menu',
    'node_types' => array(),
    'pages' => '',
    'roles' => array(),
    'themes' => array(
      'bartik' => array(
        'region' => '',
        'status' => 0,
        'theme' => 'bartik',
        'weight' => 0,
      ),
      'eenterprise' => array(
        'region' => 'footer',
        'status' => 1,
        'theme' => 'eenterprise',
        'weight' => -37,
      ),
      'seven' => array(
        'region' => '',
        'status' => 0,
        'theme' => 'seven',
        'weight' => 0,
      ),
    ),
    'title' => '',
    'visibility' => 0,
  );

  $export['system-main'] = array(
    'cache' => -1,
    'css_class' => '',
    'custom' => 0,
    'delta' => 'main',
    'module' => 'system',
    'node_types' => array(),
    'pages' => '',
    'roles' => array(),
    'themes' => array(
      'bartik' => array(
        'region' => 'content',
        'status' => 1,
        'theme' => 'bartik',
        'weight' => 0,
      ),
      'eenterprise' => array(
        'region' => 'content',
        'status' => 1,
        'theme' => 'eenterprise',
        'weight' => -19,
      ),
      'seven' => array(
        'region' => 'content',
        'status' => 1,
        'theme' => 'seven',
        'weight' => 0,
      ),
    ),
    'title' => '',
    'visibility' => 0,
  );

  $export['system-main-menu'] = array(
    'cache' => -1,
    'css_class' => 'usa-width-one-half',
    'custom' => 0,
    'delta' => 'main-menu',
    'module' => 'system',
    'node_types' => array(),
    'pages' => 'eenterprise-new
eenterprise-alternate',
    'roles' => array(
      'admin' => 3,
      'anonymous user' => 1,
      'authenticated user' => 2,
      'Delegated Certifier' => 12,
      'EPA Reviewer' => 11,
      'federal-regulator' => 4,
      'industry-user' => 5,
      'Preparer' => 8,
      'Public User' => 13,
      'regional-regulator' => 6,
      'State Reviewer' => 10,
      'state-regulator' => 7,
    ),
    'themes' => array(
      'bartik' => array(
        'region' => '',
        'status' => 0,
        'theme' => 'bartik',
        'weight' => 0,
      ),
      'eenterprise' => array(
        'region' => 'navigation',
        'status' => 1,
        'theme' => 'eenterprise',
        'weight' => -25,
      ),
      'seven' => array(
        'region' => '',
        'status' => 0,
        'theme' => 'seven',
        'weight' => 0,
      ),
    ),
    'title' => '',
    'visibility' => 0,
  );

  $export['system-user-menu'] = array(
    'cache' => -1,
    'css_class' => ' usa-width-one-half',
    'custom' => 0,
    'delta' => 'user-menu',
    'module' => 'system',
    'node_types' => array(),
    'pages' => '',
    'roles' => array(
      'ABATEMENT NOTIFICATION' => 14,
      'admin' => 3,
      'Administrator' => 132,
      'Air Carrier Primary' => 86,
      'Air Carrier Secondary' => 122,
      'ApexTest' => 125,
      'APPLICANT MANAGEMENT' => 92,
      'AQS USER (Retriever) (Flatfile)' => 57,
      'AQS USER (Submitter) (Flatfile)' => 56,
      'Authorized Agent' => 88,
      'Authorized Official' => 91,
      'Auto Registration' => 28,
      'Basic' => 69,
      'Burial Director' => 124,
      'CDX ESA and FRS Search' => 129,
      'CDX ESA and FRS Search/Add' => 104,
      'CDX ESA Only' => 80,
      'Certifier' => 81,
      'Certifier: CO' => 116,
      'Certifier: LA' => 130,
      'Certifying Official' => 25,
      'CGP' => 118,
      'Company Authorizing Official' => 121,
      'Custom ENNAAS' => 84,
      'Data Provider' => 115,
      'Delegated Certifier' => 12,
      'Discloser/Certifier' => 85,
      'DPC Admin' => 87,
      'DPC Admin Legacy' => 109,
      'DPC Developers' => 106,
      'DPC Staff' => 96,
      'EAB' => 32,
      'eeportal_cgi_admin' => 133,
      'EPA' => 74,
      'EPA Official' => 111,
      'EPA Regional Reviewer' => 103,
      'EPA Reviewer' => 11,
      'EPA Rule Lead' => 102,
      'EPA Viewer' => 135,
      'EV-ACE Submitter' => 136,
      'Federal Agency EIS Filer' => 110,
      'federal-regulator' => 4,
      'FIRM CERTIFICATION APPLICATION' => 17,
      'FONAR Submitter' => 83,
      'Grantee' => 65,
      'Handoff Tester' => 113,
      'Headquarters Requestor' => 131,
      'Help Desk - Staff' => 101,
      'Help Desk - Super User' => 27,
      'INDIVIDUAL APPLICATION' => 16,
      'industry-user' => 5,
      'INVOICE MANAGER' => 94,
      'LAB' => 72,
      'Laboratory' => 123,
      'Lead-Based Paint Firm Applications' => 19,
      'Locational' => 58,
      'Manager' => 26,
      'Monitoring' => 59,
      'Monitoring -- CDXLite DataFlow' => 61,
      'National' => 126,
      'Notification' => 60,
      'Organization POC' => 63,
      'Parent Company Standardization / P2 Categorization' => 112,
      'Permit Administrator' => 117,
      'PGP' => 119,
      'Preparer' => 8,
      'Primacy Agency Job Mgmt' => 70,
      'Primary Authorized Official' => 23,
      'Primary Submitter' => 78,
      'Primary Support' => 114,
      'Program/Flow Manager' => 143,
      'Public' => 82,
      'Public User' => 13,
      'PWS' => 71,
      'Query User' => 24,
      'RA' => 127,
      'RC Management' => 31,
      'RC Staff' => 142,
      'RCRA (Certifying Official) (Webform)' => 67,
      'RCRA (Preparer) (Webform)' => 66,
      'Region 01' => 107,
      'Region 01 Submitter' => 138,
      'Region 02' => 108,
      'Region 03 Submitter' => 68,
      'Regional Viewer' => 134,
      'regional-regulator' => 6,
      'Registration' => 120,
      'Reviewer' => 62,
      'RMP*Info' => 30,
      'RMP*Info OCA' => 29,
      'RMP*Info Public' => 105,
      'RMP: Download Dataset' => 98,
      'RMP: Download Dataset OCA' => 99,
      'Secondary Authorized Official' => 100,
      'Secondary Preparer' => 139,
      'Security' => 137,
      'STATE' => 73,
      'State Reviewer' => 10,
      'state-regulator' => 7,
      'Submitter' => 64,
      'System Administrator' => 55,
      'System User' => 128,
      'Toxic Release Inventory Made Easy' => 144,
      'TRAINING NOTIFICATION' => 15,
      'TRAINING NOTIFICATION (Old Schema)' => 141,
      'TRAINING PROVIDER APPLICATION' => 18,
      'TRAINING PROVIDER DASHBOARD' => 140,
      'UIC Reporting Services' => 97,
      'WBMANAGER' => 75,
      'WQX Web' => 76,
    ),
    'themes' => array(
      'bartik' => array(
        'region' => '',
        'status' => 0,
        'theme' => 'bartik',
        'weight' => 0,
      ),
      'eenterprise' => array(
        'region' => 'header',
        'status' => 1,
        'theme' => 'eenterprise',
        'weight' => -24,
      ),
      'seven' => array(
        'region' => '',
        'status' => 0,
        'theme' => 'seven',
        'weight' => 0,
      ),
    ),
    'title' => '',
    'visibility' => 0,
  );

  return $export;
}
