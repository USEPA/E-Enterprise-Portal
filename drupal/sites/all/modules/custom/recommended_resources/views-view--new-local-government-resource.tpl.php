<?php
module_load_include('inc', 'node', 'node.pages');
$node_form = new stdClass;
// Whatever you named content type
$node_form->type = 'lgc_resource';
$node_form->language = LANGUAGE_NONE;
// Name of content type + _node_form
$form = drupal_get_form('lgc_resource_node_form', $node_form);
print drupal_render($form);
