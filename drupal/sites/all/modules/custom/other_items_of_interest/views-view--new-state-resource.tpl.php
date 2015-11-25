<?php
module_load_include('inc', 'node', 'node.pages');
$node_form = new stdClass;
$node_form->type = 'state_resource';
$node_form->language = LANGUAGE_NONE;
$form = drupal_get_form('state_resource_node_form', $node_form);
print drupal_render($form);