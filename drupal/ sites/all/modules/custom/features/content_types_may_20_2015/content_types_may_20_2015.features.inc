<?php
/**
 * @file
 * content_types_may_20_2015.features.inc
 */

/**
 * Implements hook_node_info().
 */
function content_types_may_20_2015_node_info() {
  $items = array(
    'features_feature_list' => array(
      'name' => t('Features / feature list'),
      'base' => 'node_content',
      'description' => t('Mini release notes so users know what\'s available for e-Enterprise
May have public-facing info and then co-regulator focused information'),
      'has_title' => '1',
      'title_label' => t('Title'),
      'help' => '',
    ),
    'features_get_involved_calls_to_a' => array(
      'name' => t('Features / Get Involved (Calls to Action)'),
      'base' => 'node_content',
      'description' => t('Tells users about something that\'s available or happening that may interest them and gives details about how to get involved / attend / use Ex: Village Green, zoo air / sun bench Ex: Challenge.gov - way to pull that info or else just highlight it (from Challenge.gov, expect to have API for developers in April 2015)'),
      'has_title' => '1',
      'title_label' => t('Title'),
      'help' => '',
    ),
    'general_parent_widget' => array(
      'name' => t('General Parent Widget'),
      'base' => 'node_content',
      'description' => t('Node type that serves as the framework that displays information per content type (e.g., to-do list item).This will also support any widget personalization such as changing the widget\'s location within the Workbench.
'),
      'has_title' => '1',
      'title_label' => t('Title'),
      'help' => '',
    ),
    'resources_bookmarks_quick_links' => array(
      'name' => t('Resources / BookMarks / Quick Links'),
      'base' => 'node_content',
      'description' => t('Set of links to EPA, state / local, or other website resources that help with compliance, enforcement, etc. (e.g., EE-145 and EE-146) Example: Links for VA air, water, land environmental quality depts Either manually populate these or pull from repository of “best case” resources that co-regs provide'),
      'has_title' => '1',
      'title_label' => t('Title'),
      'help' => '',
    ),
  );
  drupal_alter('node_info', $items);
  return $items;
}
