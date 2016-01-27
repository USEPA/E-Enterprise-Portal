<?php
/**
 * @file
 * Hook implementations provided by registry_autoload.module.
 */

/**
 * Alter hook to update the registry_autoload registry.
 *
 * This is useful to change the registry_autoload registry, before it is written
 * to the registry table.
 *
 * @param array $registry
 *   An associative array keyed by filename with object values.
 *   The objects have the following properties:
 *   - classes: An associative array keyed by namespace+name with properties:
 *     - type: Type of the class, can be 'interface' or 'class'.
 *     - name: Name of the class or interface.
 *     This can be empty if needs_update below is FALSE.
 *   - filename: The filename of the file.
 *   - module: The module this file belongs to.
 *   - weight: The weight of the module this file belongs to.
 *   - hash: The file_hash() of the filename.
 *   - needs_update: Whether the registry needs to be updated or not.
 */
function hook_registry_autoload_registry_alter(array &$registry) {
  // Remove all classes within RegistryAutoloadTestTest.php as defined by
  // registry_autoload_test module within the includes/ directory.
  $module_path = drupal_get_path('module', 'registry_autoload_test');
  $filename = 'includes/RegistryAutoloadTestTest.class.php';
  $path = $module_path . '/' . $filename;
  unset($registry[$path]);
}
