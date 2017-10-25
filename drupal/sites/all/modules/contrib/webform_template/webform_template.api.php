<?php

/**
 * @file
 * Hooks provided by the Webform Template module.
 */

/**
 * Allows for additional processing during webform template update.
 *
 * @param Object $node
 *  The node object of the destination.
 * @param Object $template
 *  The node object of the source template.
 */
function hook_webform_template_update($node, $template) {
  // @todo Add sample code.
}

/**
 * Allows for additional processing during webform template insert.
 *
 * @param Object $node
 *  The node object of the destination.
 * @param Object $template
 *  The node object of the source template.
 *
 */
function hook_webform_template_insert($node, $template) {
  // @todo Add sample code.
}

/**
 * Modify the visibility of the template selection.
 *
 * @param bool $show
 *  When set to FALSE, the template selection will be deactivated.
 * @param Array $context
 *  The form.
 */
function hook_webform_template_show_selection_alter(&$show, $context) {
  // @todo Add sample code.
}