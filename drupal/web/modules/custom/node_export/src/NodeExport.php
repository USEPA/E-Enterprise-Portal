<?php

namespace Drupal\node_export;

use Drupal\node\Entity\Node;


/**
 * Provides a Node Export function.
 */
class NodeExport {

  /**
   *
   */
  public static function nodeExport($nid, &$context) {
    $message = 'Exporting Nodes...';
    $results = [];
    // Loads a node of given id.
    $node = Node::load($nid);
    $context['results'][] = $node;
    $context['message'] = $message;
  }

  /**
   *
   */
  public static function nodeExportFinishedCallback($success, $results, $operations) {
    // The 'success' parameter means no fatal PHP errors were detected. All
    // other error management should be handled using 'results'.
    if ($success) {
      $message = \Drupal::translation()->formatPlural(
        count($results),
        'One node exported.', '@count nodes exported.'
      );
    }
    else {
      $message = t('Finished with an error.');
    }
    $json = json_encode($results);
    $result = [];
    $count = 0;
    foreach ($results as $node) {
      foreach ($node as $key => $value) {
        $result[$count][$key] = $node->get($key)->getValue();
      }
      $count++;
    }
    $json = json_encode($result);
    $_SESSION['json'] = $json;
    // Download the node string as json file.
    // Saving export code as json file in your public directory.
    $file = file_save_data($json, "public://node.json", FILE_EXISTS_REPLACE);
  }

}
