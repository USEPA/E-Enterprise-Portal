<?php

namespace Drupal\node_export\Commands;

use Drush\Commands\DrushCommands;
use Drupal\Core\Entity\EntityTypeManagerInterface;

/**
 * A Drush commandfile.
 *
 * In addition to this file, you need a drush.services.yml
 * in root of your module, and a composer.json file that provides the name
 * of the services file to use.
 *
 * See these files for an example of injecting Drupal services:
 *   - http://cgit.drupalcode.org/devel/tree/src/Commands/DevelCommands.php
 *   - http://cgit.drupalcode.org/devel/tree/drush.services.yml
 */
class NodeExportCommands extends DrushCommands {

  /**
   * @var \Drupal\Core\Entity\EntityTypeManagerInterface
   */
  protected $entityTypeManager;

  /**
   * NodeExportCommands constructor.
   *
   * @param \Drupal\Core\Entity\EntityTypeManagerInterface $entity_manager
   *   Entity Type Manager dependency injection.
   */
  public function __construct(EntityTypeManagerInterface $entity_manager) {
    parent::__construct();
    $this->entityTypeManager = $entity_manager->getStorage('node');
  }

  /**
   * Export nodes.
   *
   * @param $nodes
   *   ID of node
   *
   * @option option-name
   *   Description
   * @usage node_export:nodes 1,2,3,4,5 OR all
   *   Usage description
   *
   * @command node_export:nodes
   */
  public function exportNode($nodes) {
    if ($nodes == 'all') {
      $node_list = $this->entityTypeManager->loadMultiple();
    }
    else {
      $nodeIds = explode(',', ltrim($nodes));
      $node_list = $this->entityTypeManager->loadMultiple($nodeIds);
    }
    if (count($node_list) == 0) {
      $this->logger()->warning(dt('No nodes for export'));
      return;
    }
    $this->logger()->notice(dt('Found nodes for export, starting...'));
    $result = [];
    $count = 0;
    foreach ($node_list as $node) {
      foreach ($node as $key => $value) {
        $result[$count][$key] = $node->get($key)->getValue()[0];
      }
      $count++;
    }

    $json = json_encode($result);

    $path = 'public://exports/';
    $file_name = 'export_' . time() . '.json';

    // Create directory if does not exists.
    if (file_prepare_directory($path, FILE_CREATE_DIRECTORY)) {
      $file = file_save_data($json, $path . $file_name, 1);
    }
    else {
      $file = file_save_data($json, $path . $file_name, 1);
    }

    $this->logger()->notice(dt('Exported ' . $count . ' nodes'));
    $this->logger()->success(dt('Export complete!'));
  }

}
