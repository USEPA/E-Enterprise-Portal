<?php
/**
 * Created by PhpStorm.
 * User: smolinsk
 * Date: 11/29/2017
 * Time: 8:56 AM
 */


// Exported menu link: user-menu_partnerships:esmt-services.
$menu_link = array(
  'menu_name' => 'user-menu',
  'link_path' => 'esmt-service',
  'router_path' => 'esmt-service',
  'link_title' => 'Shared Services',
  'options' => array(
    'alter' => TRUE,
    'roles_for_menu' => array(
      'show' => array(
        3 => 3,
        81493501 => 81493501,
      ),
      'hide' => array(),
    ),
    'attributes' => array(),
    'item_attributes' => array(
      'id' => '',
      'class' => '',
      'style' => '',
    ),
    'identifier' => 'user-menu_partnerships:esmt-service',
  ),
  'module' => 'menu',
  'hidden' => 0,
  'external' => 0,
  'has_children' => 0,
  'expanded' => 0,
  'weight' => -50,
  'customized' => 1,
);

// Translatables
// Included for use with string extractors like potx.
t('Shared Services');
