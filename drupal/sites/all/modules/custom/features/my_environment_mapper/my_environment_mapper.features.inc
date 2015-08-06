<?php
/**
 * @file
 * my_environment_mapper.features.inc
 */

/**
 * Implements hook_views_api().
 */
function my_environment_mapper_views_api($module = NULL, $api = NULL) {
  return array("api" => "3.0");
}



/**
 * Implements hook_theme_registry_alter().
 */
function my_environment_mapper_theme_registry_alter(&$theme_registry) {
    // Defined path to the current module.
    $module_path = drupal_get_path('module', 'my_environment_mapper');
    // Find all .tpl.php files in this module's folder recursively.
    $template_file_objects = drupal_find_theme_templates($theme_registry, '.tpl.php', $module_path);
    // Iterate through all found template file objects.
    foreach ($template_file_objects as $key => $template_file_object) {
        // If the template has not already been overridden by a theme.
        if (!isset($theme_registry[$key]['theme path']) || !preg_match('#/themes/#', $theme_registry[$key]['theme path'])) {
            // Alter the theme path and template elements.
            $theme_registry[$key]['theme path'] = $module_path;
            $theme_registry[$key] = array_merge($theme_registry[$key], $template_file_object);
            $theme_registry[$key]['type'] = 'module';
        }
    }
}
