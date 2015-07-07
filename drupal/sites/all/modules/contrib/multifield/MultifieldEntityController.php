<?php

class MultifieldEntityController extends DrupalDefaultEntityController {
  public function load($ids = array(), $conditions = array()) {
    if (!empty($conditions)) {
      throw new InvalidArgumentException('MultifieldEntityController does not support entity_load() using conditions.');
    }

    $entities = array();

    // Create a new variable which is either a prepared version of the $ids
    // array for later comparison with the entity cache, or FALSE if no $ids
    // were passed. The $ids array is reduced as items are loaded from cache,
    // and we need to know if it's empty for this reason to avoid querying the
    // database when all requested entities are loaded from cache.
    $passed_ids = !empty($ids) ? array_flip($ids) : FALSE;
    // Try to load entities from the static cache, if the entity type supports
    // static caching.
    if ($this->cache) {
      $entities += $this->cacheGet($ids, $conditions);
      // If any entities were loaded, remove them from the ids still to load.
      if ($passed_ids) {
        $ids = array_keys(array_diff_key($passed_ids, $entities));
      }
    }

    // Load any remaining entities from the database. This is the case if $ids
    // is set to FALSE (so we load all entities), if there are any ids left to
    // load, if loading a revision, or if $conditions was passed without $ids.
    if ($ids === FALSE || $ids) {
      $entities += $this->queryLoad($ids);
    }

    return $entities;
  }

  protected function queryLoad($ids) {
    $multifields = multifield_get_fields();

    foreach (array_keys($multifields) as $field_name) {
      $query = new EntityFieldQuery();
      if ($ids) {
        $query->fieldCondition($field_name, 'id', $ids, 'IN');
      }
      else {
        $query->fieldCondition($field_name, 'id', 0, '>');
      }
      if ($results = $query->execute()) {
        $pseudo_entities = array();
        $field = field_info_field($field_name);

        foreach ($results as $entity_type => $entities) {
          // Simply doing an entity load on the entities with multifield values
          // will cause the cacheSet() from multifield_field_load() to get
          // invoked.
          $entities = entity_load($entity_type, array_keys($entities));
          foreach ($entities as $entity) {
            if ($items = field_get_items($entity_type, $entity, $field_name)) {
              foreach ($items as $item) {
                $pseudo_entities[$item['id']] = _multifield_field_item_to_entity($field['type'], $item);
              }
            }
          }
        }

        $this->cacheSet($pseudo_entities);
      }
    }

    return array_intersect_key($this->entityCache, drupal_map_assoc($ids, $ids));
  }

  public function cacheSet($entities) {
    $this->entityCache += $entities;
  }
}
