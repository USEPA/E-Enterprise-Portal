<?php
$instructions = "<p><strong>Please note:</strong> Maps should meet the following criteria in order to be published to the \"Interactive Maps\" widget:</p><ul class=\"bulleted\">
	<li>Publicly-visible ArcGIS Online Web Mapping Application (not just a web map or a feature service)</li>
	<li>Meaningful item description</li>
	<li>Relevant item tags for use in filtering</li>
	<li>Use a unique and intuitive thumbnail image (i.e. not the default thumbnail)</li>
</ul>";
module_load_include('inc', 'node', 'node.pages');
$node_form = new stdClass;
// Whatever you named content type
$node_form->type = 'agency_map';
$node_form->language = LANGUAGE_NONE;
// Name of content type + _node_form
$form = drupal_get_form('agency_map_node_form', $node_form);
$commands[] = ajax_command_invoke(NULL, 'alert', array('HELLO'));
drupal_add_js(drupal_get_path('module', 'agency_map_list') . '/js/preview_maps.js');
drupal_add_css(drupal_get_path('module', 'agency_map_list') . "/css/map_preview.css", "file");
print $instructions;
print drupal_render($form);