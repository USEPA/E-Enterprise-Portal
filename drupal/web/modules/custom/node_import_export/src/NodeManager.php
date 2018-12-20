<?php
/**
 * Created by PhpStorm.
 * User: smolinsk
 * Date: 12/19/2018
 * Time: 2:07 PM
 */

namespace Drupal\node_import_export;

use Drupal\node\Entity\Node;
use Drupal\Core\Entity\EntityRepository;

class NodeManager {

  public static function getNodesFromFile($filePath) {
    $data = file_get_contents($filePath);
    $nodes = json_decode($data, TRUE);
    NodeManager::bulkImport($nodes);
  }

  public static function bulkImport($imported_nodes) {
    foreach ($imported_nodes as $node) {
      NodeManager::import($node);
    }
  }

  public static function import($imported_node) {

    // Set field values
    $field_values = [];
    foreach ($imported_node as $fields => $value) {
      $field_values[$fields] = $value;
    }
    $field_values['type'] = $imported_node['type'][0]['target_id'];

    // Sync content based on node id, uuid or create a new one
    // Hard-coded for UUID mvp
    $method = 'uuid';
    switch ($method) {
      case 'nid':
        $node = Node::load($imported_node['nid'][0]['value']);
        unset($field_values['vid']);
        unset($field_values['uuid']);
        break;
      case 'uuid':
        // @see EntityRepository::loadEntityByUuid();
        $node = \Drupal::service('entity.repository')->loadEntityByUuid('node', $imported_node['uuid'][0]['value']);
        unset($field_values['nid']);
        unset($field_values['vid']);
        break;
      default:
        unset($field_values['nid']);
        unset($field_values['vid']);
        unset($field_values['uuid']);
        break;
    }

    // Update node values
    if($node && $method) {
      foreach ($field_values as $field => $values) {
        $node->set($field, $values);
      }
      $node->setNewRevision(TRUE);
      $node->setRevisionCreationTime(time());
      $node->setRevisionUserId($field_values['uid'][0]['target_id']);
    }

    if(!$node) {
      $node = Node::create($field_values);
    }

    $saved = $node->save();
    echo $imported_node['uuid'][0]['value'] . " was saved (" . $saved . ")";
  }
}