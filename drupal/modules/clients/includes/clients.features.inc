<?php

/**
 * @file
 * Provides Features integration for entity types using the CRUD API.
 */

/**
 * Clients controller handling features integration.
 *
 * This takes care of adding the module that defines the handler (connection or
 * resource) type as a dependency of the Feature.
 *
 * Like ClientsHandlerEntity this is not specific and could be abstracted
 * along with that.
 */
class ClientsHandlerEntityFeaturesController extends EntityDefaultFeaturesController {

  /**
   * Generates the result for hook_features_export().
   */
  public function export($data, &$export, $module_name = '') {
    $pipe = parent::export($data, $export, $module_name);

    // Set up some variables that differentiate between entity type (i.e.,
    // connection or resource) and handler type (the type of connection or
    // resource, e.g., clients_connection_drupal_services).
    $entity_type = $this->type;
    if ($entity_type == 'clients_connection') {
      $hook = 'clients_connection_type_info';
    }
    else {
      $hook = 'clients_resource_type_info';
    }

    // Build an array of handler type => providing module.
    $module_types = array();
    foreach (module_implements($hook) as $module) {
      $module_types += array_fill_keys(array_keys(module_invoke($module, $hook)), $module);
    }

    foreach (entity_load_multiple_by_name($this->type, $data) as $name => $entity) {
      // Get the handler type of the current entity.
      $handler_type = $entity->type;
      $handler_type_module = $module_types[$handler_type];

      // Add the module to the dependencies.
      $export['dependencies'][$module] = $module;
    }

    return $pipe;
  }

}
