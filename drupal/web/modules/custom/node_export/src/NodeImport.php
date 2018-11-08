<?php

namespace Drupal\node_export;

use Drupal\node\Entity\Node;

/**
 * Provides a Node Import function.
 */
class NodeImport {

  /**
   *
   */
  public static function nodeImport($node, &$context) {
    $message = 'Importing Nodes...';
    $results = [];
    $config = \Drupal::config('node_export.settings');
    $operation = $config->get('node_export_import');
    $field_values = [];
    foreach ($node as $fields => $value) {
      $field_values[$fields] = $value;
    }
    $field_values['type'] = $node['type'][0]['target_id'];
    unset($field_values['nid']);
    unset($field_values['vid']);
    unset($field_values['uuid']);
    if($operation == 'new'){
      // Creates an instance of node.
      $nodenew = Node::create($field_values);
      // Save the node into the database.
      $nodenew->save();
      $context['message'] = $message;
      $context['results'][] = $results;
    }
    else if($operation == 'replace'){
      if(Node::load($node['nid'][0]['value'])) {
        $node_to_replace = Node::load($node['nid'][0]['value']);
        foreach ($field_values as $field => $values) {
          $node_to_replace->set($field, $values);
        }
        $node_to_replace->setNewRevision(TRUE);
        $node_to_replace->setRevisionCreationTime(REQUEST_TIME);
        $node_to_replace->setRevisionUserId($field_values['uid'][0]['target_id']);
        $node_to_replace->save();
        $context['message'] = $message;
        $context['results'][] = $results;
      }
      else {
        $nodenew = Node::create($field_values);
        $nodenew->save();
        $context['message'] = $message;
        $context['results'][] = $results;
      }
    }
  }
  /**
   *
   */
  public static function nodeImportFinishedCallback($success, $results, $operations) {
    // The 'success' parameter means no fatal PHP errors were detected. All
    // other error management should be handled using 'results'.
    if ($success) {
      $message = \Drupal::translation()->formatPlural(
        count($results),
        'One node processed.', '@count posts processed.'
      );
    }
    else {
      $message = t('Finished with an error.');
    }
    drupal_set_message($message);
  }

}
