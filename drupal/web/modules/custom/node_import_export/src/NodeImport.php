<?php

namespace Drupal\node_import_export;

use Drupal\Core\Entity\EntityStorageException;
use Drupal\node\Entity\Node;
use Drupal\Core\Entity\EntityRepository;

/**
 * Provides a Node Import function.
 */
class NodeImport {

  /**
   * Prepares a field-value array for the node to be imported.
   *
   * @param array $nodeArray
   *   An exported node array.
   *
   * @return array|bool
   *   Returns an array containing field-value pairs of the node or FALSE.
   */
  protected static function unload(array $nodeArray) {
    $fieldValues = [];
    $contentType = $nodeArray['type'][0]['target_id'];
    if (self::contentTypeExists($contentType)) {
      $fieldValues['type'] = $contentType;
      $bundleFields = \Drupal::service('entity_field.manager')->getFieldDefinitions('node', $fieldValues['type']);
      foreach ($nodeArray as $fields => $value) {
        if (!array_key_exists($fields, $bundleFields) && $fields !== '_metadata') {
          return FALSE;
        }
        $fieldValues[$fields] = $value;
      }
    }
    return $fieldValues;
  }

  /**
   * Checks whether a given content type exists or not.
   *
   * @param string $contentType
   *   Content type to be checked.
   *
   * @return bool
   *   Whether a given content type exists or not.
   */
  protected static function contentTypeExists($contentType) {
    $contentTypes = \Drupal::service('entity.manager')
      ->getStorage('node_type')
      ->loadMultiple();
    return array_key_exists($contentType, $contentTypes);
  }

  /**
   * Imports a node with given field-value array.
   *
   * @param array $nodeArray
   *   An exported node array.
   *
   * @return int|bool
   *   Returns the ID of the imported node or FALSE if import is not possible.
   */
  public static function import(array $nodeArray) {

    $fieldValues = self::unload($nodeArray);
    if (!$fieldValues) {
      return FALSE;
    }
    $config = \Drupal::config('node_import_export.settings');
    $operation = $config->get('node_import_export_import');
    $identifier = $config->get('node_import_export_identifier');
    $id = $fieldValues['nid'][0]['value'];
    $uuid = $fieldValues['uuid'][0]['value'];

    if(isset($fieldValues['_metadata'])) {
      $_metadata = $fieldValues['_metadata'];
    }

    // Remove the metadata so we don't break the imports
    unset($fieldValues['_metadata']);

    if($identifier === 'nid') {
      unset($fieldValues['nid']);
      unset($fieldValues['vid']);
      unset($fieldValues['uuid']);

      switch ($operation) {
        case 'new':
          $newNode = Node::create($fieldValues);
          break;

        case 'replace':
          $newNode = Node::load($id);
          if ($newNode) {
            foreach ($fieldValues as $field => $values) {
              $newNode->set($field, $values);
            }
            $newNode->setNewRevision(TRUE);
            $newNode->setRevisionCreationTime(\Drupal::time()->getRequestTime());
            $newNode->setRevisionUserId($fieldValues['uid'][0]['target_id']);
          }
          else {
            $newNode = Node::create($fieldValues);
          }
          break;

        case 'skip':
          if (Node::load($id)) {
            return $id;
          }
          $newNode = Node::create($fieldValues);
          break;
      }
    }
    if($identifier === 'uuid') {

      unset($fieldValues['nid']);
      unset($fieldValues['vid']);

      // Remap the array target_id with the matching content by UUIDs
      if(isset($_metadata)) {
        foreach ($_metadata as $entity_type_id => $entities) {
          foreach ($entities as $old_nid => $uuid) {
            $entity = \Drupal::service('entity.repository')->loadEntityByUuid($entity_type_id, $uuid);
            if($entity) {
              $_metadata["$entity_type_id-remapped"][$old_nid] = $entity->id();
            }
          }
        }
      }


      switch ($operation) {
        case 'new':
          $newNode = Node::create($fieldValues);
          break;

        case 'replace':
          // $newNode = Node::load($id);
          $newNode = \Drupal::service('entity.repository')->loadEntityByUuid('node', $uuid);
          if ($newNode) {
            $current_fields = $newNode->getFields();
            if(isset($_metadata)){
              foreach ($fieldValues as $field => $values) {
                // If the key is a field, check if it is a target_id and map the uuid
                if(stripos($field, 'field_') === 0) {
                  $target_type = $current_fields[$field]->getSetting('target_type');
                  foreach ($values as $idx => $v) {
                    if (isset($v['target_id'])) {
                      if($_metadata["$target_type-remapped"][$v['target_id']]) {
                        $values[$idx]['target_id'] = $_metadata["$target_type-remapped"][$v['target_id']];
                      }
                    }
                  }
                }
                $newNode->set($field, $values);
              }
            }

            $newNode->setNewRevision(TRUE);
            $newNode->setRevisionCreationTime($_SERVER['REQUEST_TIME']);
            $newNode->setRevisionUserId($fieldValues['uid'][0]['target_id']);
          }
          else {
            $newNode = Node::create($fieldValues);
          }
          break;

        case 'skip':
          if (Node::load($id)) {
            return $id;
          }
          $newNode = Node::create($fieldValues);
          break;
      }
    }

    try {
      $newNode->save();
      $id = $newNode->id();
    }
    catch (EntityStorageException $e) {
      \Drupal::logger('node_import_export')->error($e->getMessage());
    }
    return $id;
  }

  /**
   * Batch operations method to import a given node object.
   *
   * @param array $nodeArray
   *   An exported node array.
   * @param array $context
   *   An array of contextual key/value information for rebuild batch process.
   */
  public static function nodeImport(array $nodeArray, array &$context) {
    $message = 'Importing Nodes...';
    $context['message'] = $message;
    $id = NodeImport::import($nodeArray);
    if ($id) {
      $context['results']['imported'][] = $id;
    }
    else {
      $context['results']['not_imported'][] = $id;
    }
  }

  /**
   * Batch finish callback method. Handles results & display messages to user.
   *
   * @param bool $success
   *   Whether or not any fatal PHP errors were detected.
   * @param array $results
   *   An array containing the results key of context array.
   * @param array $operations
   *   An array containing batch operations.
   */
  public static function nodeImportFinishedCallback($success, array $results, array $operations) {
    // The 'success' parameter means no fatal PHP errors were detected. All
    // other error management should be handled using 'results'.
    if ($success) {
      $message = '';
      if (count($results['imported']) > 0) {
        $message .= \Drupal::translation()->formatPlural(
          count($results['imported']),
          'One node imported.', '@count nodes imported.'
        );
      }
      if (count($results['not_imported']) > 0) {
        $message .= "\n" . \Drupal::translation()->formatPlural(
          count($results['not_imported']),
          'One node could not be imported.', '@count nodes could not be imported.'
        );
      }
    }
    else {
      $message = t('Finished with an error.');
    }
    drupal_set_message($message);
  }

  public static function importNode($file) {
    $data = file_get_contents($file);
    if ($data) {
      $id = '';
      $nodes = json_decode($data, TRUE);
      $countImported = 0;
      $countNotImported = 0;
      foreach ($nodes as $node) {
        $id = NodeImport::import($node);
      }
      if ($countImported > 0) {
        \Drupal::logger('node_import_export')->info(dt('{count} nodes imported successfully.', ['count' => $countImported]));
      }
      if ($countNotImported > 0) {
        \Drupal::logger('node_import_export')->error(dt('{count} nodes could not be imported.', ['count' => $countNotImported]));
      }
    }
    else {
      \Drupal::logger('node_import_export')->error(dt('File could not be imported: {path}', ['path' => $file]));
    }
    return $id;
  }
}
