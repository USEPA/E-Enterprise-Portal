<?php

/**
 * @file
 * Provides a controller for building an entity overview form.
 */

/**
 * Default controller for providing handler UI.
 *
 * Expects:
 *  - 'type' key on the entity to be the handler type.
 *  - various entity info property documented in clients_hook_entity_info().
 */
class ClientsHandlerEntityUIController extends EntityDefaultUIController {

  /**
   * Provides definitions for implementing hook_menu().
   */
  public function hook_menu() {
    // Start with what EntityAPI gives us, then doctor it.
    $items = parent::hook_menu();

    // Change the EntityAPI to deal with multiple handler types.
    $items[$this->path . '/add']['title'] = 'Add TODO';
    $items[$this->path . '/add']['page callback'] = 'clients_handler_add_page';
    $items[$this->path . '/add']['page arguments'] = array($this->entityType);

    // Add links. Follow same pattern as node.
    $handler_types_callback = $this->entityInfo['admin ui']['types callback'];
    $handler_types = $handler_types_callback();
    foreach ($handler_types as $type => $type_info) {
      $items[$this->path . '/add/' . $type] = array(
        'title' => 'Create !name',
        'title arguments' => array('!name' => $type_info['label']),
        'page callback' => 'clients_handler_get_add_form',
        'page arguments' => array($this->entityType, $type),
        'file' =>  $this->entityInfo['admin ui']['file'],
        // Need to specify file path as this gets used in entity_menu().
        'file path' => drupal_get_path('module', $this->entityInfo['module']),
      );
    }

    // All menu items for handlers have the same access.
    // This means we don't need an access callback.
    foreach ($items as $path => $item) {
      $items[$path]['access callback'] = 'user_access';
      $items[$path]['access arguments'] = array($this->entityInfo['admin ui']['access permission']);
    }

    return $items;
  }

  /**
   * Overriden to sort the handlers by machine name.
   *
   * @param $conditions
   *   An array of conditions as needed by entity_load().

   * @return Array
   *   A renderable array.
   */
  public function overviewTable($conditions = array()) {
    $entities = $this->getOverviewEntities($conditions);

    $rows = array();
    foreach ($entities as $entity) {
      $rows[] = $this->overviewTableRow($conditions, entity_id($this->entityType, $entity), $entity);
    }

    $render = array(
      '#theme' => 'table',
      '#header' => $this->overviewTableHeaders($conditions, $rows),
      '#rows' => $rows,
      '#empty' => t('None.'),
    );
    return $render;
  }

  /**
   * Retrieves the entities for the admin overview.
   */
  function getOverviewEntities($conditions) {
    $query = new EntityFieldQuery();
    $query->entityCondition('entity_type', $this->entityType);

    // Add all conditions to query.
    foreach ($conditions as $key => $value) {
      $query->propertyCondition($key, $value);
    }

    // Add the sort order.
    // entity_load() appears to respect the order of the incoming $ids array,
    // so no need to do any sorting here.
    $query->propertyOrderBy('name');

    if ($this->overviewPagerLimit) {
      $query->pager($this->overviewPagerLimit);
    }

    $results = $query->execute();

    $ids = isset($results[$this->entityType]) ? array_keys($results[$this->entityType]) : array();
    $entities = $ids ? entity_load_multiple_by_name($this->entityType, $ids) : array();

    return $entities;
  }

  /**
   * Generates the table headers for the overview table.
   */
  protected function overviewTableHeaders($conditions, $rows, $additional_header = array()) {
    // Our subclasses have almost certainly added additional columns.
    // Put the handler type at the front so it comes just after the name.
    array_unshift($additional_header, t('Type'));

    return parent::overviewTableHeaders($conditions, $rows, $additional_header);
  }

  /**
   * Generates the row for the passed entity and may be overridden in order to
   * customize the rows.
   *
   * @param $additional_cols
   *   Additional columns to be added after the entity label column.
   */
  protected function overviewTableRow($conditions, $id, $entity, $additional_cols = array()) {
    $handler_types_callback = $this->entityInfo['admin ui']['types callback'];
    $handler_types = $handler_types_callback();

    $broken_class = $this->entityInfo['factory']['broken class'];
    if (get_class($entity) == $broken_class) {
      // If the handler is broken, there will be no type data for it.
      $type_label = $entity->type;
      $type_label .= ' <span class="warning">' . t("Broken handler") . '</span>';
    }
    else {
      $handler_type = $handler_types[$entity->type];
      $type_label = $handler_type['label'];
    }

    // Our subclasses have almost certainly added additional columns.
    // Put the handler type at the front so it comes just after the name.
    array_unshift($additional_cols, $type_label);

    $row = parent::overviewTableRow($conditions, $id, $entity, $additional_cols);

    return $row;
  }
}

/**
 * UI controller class for connections.
 */
class ClientsConnectionEntityUIController extends ClientsHandlerEntityUIController {

  /**
   * Provides definitions for implementing hook_menu().
   */
  public function hook_menu() {
    // Tweak what our base class does..
    $items = parent::hook_menu();

    $id_count = count(explode('/', $this->path));
    $wildcard = isset($this->entityInfo['admin ui']['menu wildcard']) ? $this->entityInfo['admin ui']['menu wildcard'] : '%entity_object';

    // Create the base item for the Clients admin tabs...
    $base_item = $items[$this->path];
    $base_item['title'] = t('Clients');
    $base_item['type'] = MENU_NORMAL_ITEM;
    $items['admin/structure/clients'] = $base_item;

    // ... and turn the connections base item into the first tab.
    $items[$this->path]['title'] = t('Connections');
    $items[$this->path]['type'] = MENU_DEFAULT_LOCAL_TASK;

    // Testing system.
    $items[$this->path . '/manage/' . $wildcard . '/test'] = array(
      'title' => 'Test',
      'page callback' => 'drupal_get_form',
      'page arguments' => array('clients_connection_test_form', $id_count + 1),
      'load arguments' => array($this->entityType),
      'access arguments' => array('administer clients connections'),
      'file' =>  $this->entityInfo['admin ui']['file'],
      // Need to specify file path as this gets used in entity_menu().
      'file path' => drupal_get_path('module', $this->entityInfo['module']),
      'type' => MENU_LOCAL_TASK,
    );

    if (module_exists('devel')) {
      // Devel tab.
      $items[$this->path . '/manage/' . $wildcard . '/devel'] = array(
        'title' => 'Devel',
        'page callback' => 'clients_connection_page_devel',
        'page arguments' => array($id_count + 1),
        'load arguments' => array($this->entityType),
        'access arguments' => array('administer clients connections'),
        'file' =>  $this->entityInfo['admin ui']['file'],
        // Need to specify file path as this gets used in entity_menu().
        'file path' => drupal_get_path('module', $this->entityInfo['module']),
        'type' => MENU_LOCAL_TASK,
        'weight' => 10,
      );
    }

    return $items;
  }

  /**
   * Retrieves the entities for the admin overview.
   *
   * Overridden to add environment substitution information to the connections.
   */
  function getOverviewEntities($conditions) {
    $connections = parent::getOverviewEntities($conditions);

    // Determine whether any connections will substitute for others.
    $environment_name = variable_get('environment_name', NULL);
    if (isset($environment_name)) {
      foreach ($connections as $name => $connection) {
        // We only need to check substitution in one direction, since we are
        // working over all connections. So we choose the easy one: appending
        // the environment rather than removing it.
        $substitute_name = $name . '_' . $environment_name;
        if (isset($connections[$substitute_name])) {
          $connection->environment_substituted_by = $substitute_name;
          $connections[$substitute_name]->environment_substitute_for = $name;
        }
      }
    }

    return $connections;
  }

  /**
   * Generates the table headers for the overview table.
   */
  protected function overviewTableHeaders($conditions, $rows, $additional_header = array()) {
    $additional_header['substitution'] = t('Substitution');
    $additional_header['endpoint'] = t('Endpoint');

    return parent::overviewTableHeaders($conditions, $rows, $additional_header);
  }

  /**
   * Generates the row for the passed entity and may be overridden in order to
   * customize the rows.
   *
   * @param $additional_cols
   *   Additional columns to be added after the entity label column.
   */
  protected function overviewTableRow($conditions, $id, $entity, $additional_cols = array()) {
    if (isset($entity->environment_substituted_by)) {
      // Machine names don't need sanitizing.
      $substitution = t('Substituted by !connection.', array(
        '!connection' => $entity->environment_substituted_by,
      ));
    }
    elseif (isset($entity->environment_substitute_for)) {
      $substitution = t('Substitute for !connection.', array(
        '!connection' => $entity->environment_substitute_for,
      ));
    }
    else {
      $substitution = '';
    }

    // Add the endpoint to the columns. Our parent class does the handler type.
    $additional_cols['substitution'] = $substitution;
    $additional_cols['endpoint'] = $entity->formatEndpoint($entity->endpoint);

    $row = parent::overviewTableRow($conditions, $id, $entity, $additional_cols);

    // We have to hack these in.
    $additional_ops = array(
      l(t('test'), $this->path . '/manage/' . $id . '/test'),
    );
    array_splice($row, 5, 0, $additional_ops);

    return $row;
  }

}

/**
 * UI controller class for resources.
 */
class ClientsResourceEntityUIController extends ClientsHandlerEntityUIController {

  /**
   * Provides definitions for implementing hook_menu().
   */
  public function hook_menu() {
    // Tweak what our base class does..
    $items = parent::hook_menu();

    $items[$this->path]['title'] = t('Resources');
    $items[$this->path]['type'] = MENU_LOCAL_TASK;

    return $items;
  }

  /**
   * Generates the table headers for the overview table.
   */
  protected function overviewTableHeaders($conditions, $rows, $additional_header = array()) {
    $additional_header['connection'] = t('Connection');

    return parent::overviewTableHeaders($conditions, $rows, $additional_header);
  }

  /**
   * Generates the row for the passed entity and may be overridden in order to
   * customize the rows.
   *
   * @param $additional_cols
   *   Additional columns to be added after the entity label column.
   */
  protected function overviewTableRow($conditions, $id, $entity, $additional_cols = array()) {
    // Add the connection to the columns. Our parent class does the handler type.
    $additional_cols['connection'] = l($entity->connection, 'admin/structure/clients/connections/manage/' . $entity->connection);

    return parent::overviewTableRow($conditions, $id, $entity, $additional_cols);
  }

}
