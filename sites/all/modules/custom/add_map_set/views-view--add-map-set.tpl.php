<?php
module_load_include('inc', 'node', 'node.pages');
$node_form = new stdClass;
// Whatever you named content type
$node_form->type = 'add_map_set';
$node_form->language = LANGUAGE_NONE;
// Name of content type + _node_form
$form = drupal_get_form('add_map_set_node_form', $node_form);
print drupal_render($form);