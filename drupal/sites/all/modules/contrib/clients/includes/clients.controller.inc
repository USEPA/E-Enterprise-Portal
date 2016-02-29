<?php

/**
 * @file
 * Provides a controller building upon the Entity exportable controller but
 * providing features for handler objects.
 */

/**
 * A controller for entities that function as handlers.
 *
 * Not specific to Clients module -- could be abstracted.
 *
 * The main job of this controller class is to implement a factory-by-row
 * pattern, that is, where the class of each object returned by a load is
 * determined by the value of a database column, in this case, its type.
 */
class ClientsHandlerEntityController extends EntityAPIControllerExportable {

  /**
   * Overridden to not use 'entity class': our class is variable.
   *
   * @return The results in a Traversable object.
   */
  public function query($ids, $conditions, $revision_id = FALSE) {
    // Build the query.
    $query = $this->buildQuery($ids, $conditions, $revision_id);
    $result = $query->execute();
    return $result;
  }

  // buildQuery() takes care of loading by name as well as id.

  /**
   * Overridden to implement factory-by-row pattern.
   *
   * @see DrupalDefaultEntityController#load($ids, $conditions)
   */
  public function load($ids = array(), $conditions = array()) {
    // Disable the static cache until we are finished loading entities. This is
    // because the parent load() will want to cache the entities it loads as
    // plain entities rather than handler entities; after that's been done, we
    // can't write out handler entities to cache again without unsetting them
    // from the cache or emptying it, both of which are inefficient.
    // (We can't use $cache here, as that would disable loading from cache too.)
    $this->cache_set = FALSE;

    // Call the parent to load the entities.
    // This gets us StdClass objects if the entities were not previously cached.
    $entities = parent::load($ids, $conditions);

    // Copy the loaded entity object to the right class for its type.
    $return = array();
    foreach ($entities as $name => $plain_entity) {
      // Get the class to use.
      $class = $this->getClass($plain_entity);

      if ($plain_entity instanceof $class) {
        // If the object is already of the correct class, then it was loaded
        // from the internal controller cache, and we're done.
        $return[$name] = $plain_entity;
      }
      else {
        // Otherwise, we need to remake the object to be of the handler class.
        // The connection's __construct() takes over from here.
        $entity = new $class((array) $plain_entity, $this->entityType);
        $return[$name] = $entity;
      }
    }

    // Turn static caching back on.
    $this->cache_set = TRUE;

    $this->cacheSet($return);

    return $return;
  }

  /**
   * Overridden.
   * @see DrupalDefaultEntityController::cacheSet()
   */
  protected function cacheSet($entities) {
    // Only set the static cache if our own flag is set.
    // @see load().
    if ($this->cache_set) {
      parent::cacheSet($entities);
    }
  }

  /**
   * Implements EntityAPIControllerInterface.
   *
   * Overridden to implement factory-by-row pattern.
   */
  public function create(array $values = array()) {
    // Add is_new property if it is not set.
    $values += array('is_new' => TRUE);

    // Get the class to use.
    $class = $this->getClass($values);

    return new $class($values, $this->entityType);
  }

  /**
   * Helper to get the class to create for an entity.
   *
   * Uses data in $entity_info['factory'].
   *
   * @param $entity_data
   *  Either an array or an object of entity data.
   *
   * @return
   *  The name of a class.
   */
  function getClass($entity_data) {
    if (is_object($entity_data)) {
      $type = $entity_data->type;
    }
    else {
      $type = $entity_data['type'];
    }

    $prefix = $this->entityInfo['factory']['class prefix'];
    $connection_type = clients_get_connection_types($type);
    if (empty($connection_type['class'])) {
      $class = $prefix . $type;
    }
    else {
      $class = $connection_type['class'];
    }

    if (class_exists($class)) {
      return $class;
    }
    else {
      return $this->entityInfo['factory']['broken class'];
    }
  }

}

/**
 * Controller class for Connections.
 */
class ClientsConnectionHandlerEntityController extends ClientsHandlerEntityController {

  /**
   * Implements EntityAPIControllerInterface.
   *
   * Takes care of deleting stored credentials when connections are deleted.
   *
   * @param $transaction
   *   Optionally a DatabaseTransaction object to use. Allows overrides to pass
   *   in their transaction object.
   */
  public function delete($ids, DatabaseTransaction $transaction = NULL) {
    $connections = entity_load('clients_connection', $ids);

    foreach ($connections as $connection) {
      $credentials_storage_plugin = $connection->get_credentials_storage_plugin();
      $credentials_storage_plugin->credentialsDelete($connection);
    }

    parent::delete($ids, $transaction);
  }

}
