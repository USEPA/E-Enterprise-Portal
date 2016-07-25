<?php
/**
 * @file
 * workbench_header.features.menu_links.inc
 */

/**
 * Implements hook_menu_default_menu_links().
 */
function workbench_header_menu_default_menu_links() {
  $menu_links = array();

  // Exported menu link: main-menu_app-connect:app-connect.
  $menu_links['main-menu_app-connect:app-connect'] = array(
    'menu_name' => 'main-menu',
    'link_path' => 'app-connect',
    'router_path' => 'app-connect',
    'link_title' => 'App Connect',
    'options' => array(
      'identifier' => 'main-menu_app-connect:app-connect',
    ),
    'module' => 'system',
    'hidden' => 0,
    'external' => 0,
    'has_children' => 0,
    'expanded' => 0,
    'weight' => -49,
    'customized' => 1,
  );
  // Exported menu link: main-menu_app-connect:app-connect-new.
  $menu_links['main-menu_app-connect:app-connect-new'] = array(
    'menu_name' => 'main-menu',
    'link_path' => 'app-connect-new',
    'router_path' => 'app-connect-new',
    'link_title' => 'App Connect',
    'options' => array(
      'attributes' => array(
        'title' => '',
      ),
      'identifier' => 'main-menu_app-connect:app-connect-new',
    ),
    'module' => 'system',
    'hidden' => 1,
    'external' => 0,
    'has_children' => 0,
    'expanded' => 0,
    'weight' => 1,
    'customized' => 1,
  );
  // Exported menu link: main-menu_home:<front>.
  $menu_links['main-menu_home:<front>'] = array(
    'menu_name' => 'main-menu',
    'link_path' => '<front>',
    'router_path' => '',
    'link_title' => 'Home',
    'options' => array(
      'attributes' => array(
        'title' => '',
      ),
      'identifier' => 'main-menu_home:<front>',
    ),
    'module' => 'menu',
    'hidden' => 0,
    'external' => 1,
    'has_children' => 0,
    'expanded' => 0,
    'weight' => -50,
    'customized' => 1,
  );
  // Exported menu link: menu-footer-disclaimers_accessibility:http://www2.epa.gov/accessibility.
  $menu_links['menu-footer-disclaimers_accessibility:http://www2.epa.gov/accessibility'] = array(
    'menu_name' => 'menu-footer-disclaimers',
    'link_path' => 'http://www2.epa.gov/accessibility',
    'router_path' => '',
    'link_title' => 'Accessibility',
    'options' => array(
      'attributes' => array(
        'title' => '',
      ),
      'identifier' => 'menu-footer-disclaimers_accessibility:http://www2.epa.gov/accessibility',
    ),
    'module' => 'menu',
    'hidden' => 0,
    'external' => 1,
    'has_children' => 0,
    'expanded' => 0,
    'weight' => -47,
    'customized' => 1,
  );
  // Exported menu link: menu-footer-disclaimers_conditions-of-use:ee_disclaimer.
  $menu_links['menu-footer-disclaimers_conditions-of-use:ee_disclaimer'] = array(
    'menu_name' => 'menu-footer-disclaimers',
    'link_path' => 'ee_disclaimer',
    'router_path' => 'ee_disclaimer',
    'link_title' => 'Conditions of Use',
    'options' => array(
      'attributes' => array(
        'title' => '',
      ),
      'identifier' => 'menu-footer-disclaimers_conditions-of-use:ee_disclaimer',
    ),
    'module' => 'menu',
    'hidden' => 0,
    'external' => 0,
    'has_children' => 0,
    'expanded' => 0,
    'weight' => -46,
    'customized' => 1,
  );
  // Exported menu link: menu-footer-disclaimers_e-enterprise-home:http://www2.epa.gov/e-enterprise/about-e-enterprise-environment.
  $menu_links['menu-footer-disclaimers_e-enterprise-home:http://www2.epa.gov/e-enterprise/about-e-enterprise-environment'] = array(
    'menu_name' => 'menu-footer-disclaimers',
    'link_path' => 'http://www2.epa.gov/e-enterprise/about-e-enterprise-environment',
    'router_path' => '',
    'link_title' => 'E-Enterprise Home',
    'options' => array(
      'attributes' => array(
        'title' => '',
      ),
      'identifier' => 'menu-footer-disclaimers_e-enterprise-home:http://www2.epa.gov/e-enterprise/about-e-enterprise-environment',
    ),
    'module' => 'menu',
    'hidden' => 0,
    'external' => 1,
    'has_children' => 0,
    'expanded' => 0,
    'weight' => -50,
    'customized' => 1,
  );
  // Exported menu link: menu-footer-disclaimers_faqs:faqs.
  $menu_links['menu-footer-disclaimers_faqs:faqs'] = array(
    'menu_name' => 'menu-footer-disclaimers',
    'link_path' => 'faqs',
    'router_path' => 'faqs',
    'link_title' => 'FAQs',
    'options' => array(
      'attributes' => array(
        'title' => 'Frequently asked questions',
      ),
      'identifier' => 'menu-footer-disclaimers_faqs:faqs',
    ),
    'module' => 'menu',
    'hidden' => 0,
    'external' => 0,
    'has_children' => 0,
    'expanded' => 0,
    'weight' => -49,
    'customized' => 1,
  );
  // Exported menu link: menu-footer-disclaimers_privacy-and-security-notice:http://www2.epa.gov/home/privacy-and-security-notice.
  $menu_links['menu-footer-disclaimers_privacy-and-security-notice:http://www2.epa.gov/home/privacy-and-security-notice'] = array(
    'menu_name' => 'menu-footer-disclaimers',
    'link_path' => 'http://www2.epa.gov/home/privacy-and-security-notice',
    'router_path' => '',
    'link_title' => 'Privacy and Security Notice',
    'options' => array(
      'attributes' => array(
        'title' => '',
      ),
      'identifier' => 'menu-footer-disclaimers_privacy-and-security-notice:http://www2.epa.gov/home/privacy-and-security-notice',
    ),
    'module' => 'menu',
    'hidden' => 0,
    'external' => 1,
    'has_children' => 0,
    'expanded' => 0,
    'weight' => -48,
    'customized' => 1,
  );
  // Exported menu link: menu-footer-disclaimers_release-notes:release-notes.
  $menu_links['menu-footer-disclaimers_release-notes:release-notes'] = array(
    'menu_name' => 'menu-footer-disclaimers',
    'link_path' => 'release-notes',
    'router_path' => 'release-notes',
    'link_title' => 'Release Notes',
    'options' => array(
      'attributes' => array(
        'title' => '',
      ),
      'identifier' => 'menu-footer-disclaimers_release-notes:release-notes',
    ),
    'module' => 'menu',
    'hidden' => 0,
    'external' => 0,
    'has_children' => 0,
    'expanded' => 0,
    'weight' => -45,
    'customized' => 1,
  );

  // Translatables
  // Included for use with string extractors like potx.
  t('Accessibility');
  t('App Connect');
  t('Conditions of Use');
  t('E-Enterprise Home');
  t('FAQs');
  t('Home');
  t('Privacy and Security Notice');
  t('Release Notes');

  return $menu_links;
}
