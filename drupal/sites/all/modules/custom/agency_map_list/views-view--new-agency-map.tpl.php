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
print $instructions;
print drupal_render($form);