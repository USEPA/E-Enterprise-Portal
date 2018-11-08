<?php
use Drupal\node\Entity\Node;

/**
 * @file
 * Contains definations for Drush commands and callbacks.
 */

/**
 * Implements hook_drush_command().
 */
function node_export_drush_command() {

  $commands['node_export_export_callback'] = [
    'description' => 'Export nodes using Node export.',
    'aliases' => ['ne-export'],
    'node_export alias for' => "node_export_export",
    'arguments' => array(
      'nids' => "A list of space-separated node IDs to export.",
    ),
    'options' => array(
      'file' => "The filename of the output file.  If supplied, the node code will be exported to that file, otherwise it will export to stdout.",
    ),
   'examples' => array(
      'drush node-export-export 45 46 47' =>
        "export nodes with node IDs 45, 46, and 47.",
    ),
  ];
  return $commands;
}
/**
 * Implements hook_drush_help().
 *
 * This function is called whenever a drush user calls
 * 'drush help <name-of-your-command>'
 *
 * @param
 *   A string with the help section (prepend with 'drush:')
 *
 * @return
 *   A string with the help text for your command.
 */
function node_export_drush_help($section) {
  // This is to prevent duplication of information from hook_drush_command().
  $commands = node_export_drush_command();
  foreach ($commands as $command => $command_info) {
    if ($section == 'drush:' . $command) {
      $out = $command_info['description'];
      if (isset($command_info['node_export alias for'])) {
        $output .= "\nThis command is an alias for ";
        $output .= $command_info['node_export alias for'] . ".";
      }
      $out .= "\n\nArguments:";
      if (isset($command_info['arguments'])) {
        foreach ($command_info['arguments'] as $k => $v) {
          $out .= "\n  " . $k . " : " . $v;
        }
      }
      $out .= "\n\nExamples:";
      if (isset($command_info['examples'])) {
        foreach ($command_info['examples'] as $k => $v) {
          $out .= "\n" . $k ."          ". $v;
        }
      }
      return dt($out);
    }
  }
}
/**
 * Drush command logic for command node_export_export.
 */
function drush_node_export_export_callback() {
  // Set up an array of nid_filters.
  $nid_filters = array();

  // The base nids.
  $args = array_filter(func_get_args(), 'is_numeric');
  if ($args) {
    $nid_filters['base'] = $args;
  }
  foreach ($nid_filters['base'] as $key => $value) {
    $node = \Drupal\node\Entity\Node::load($value);
    $nodes[] = $node;
  }
  $result=array();
  $count=0;
  foreach ($nodes as $node) {
    foreach ($node as $key=>$value) {
      $result[$count][$key]=$node->get($key)->getValue();
    }
    $count++;
  }
  $json=json_encode($result);
  if ($json) {
    $filename = drush_get_option('file');
    if ($filename) {
      // Output data to file. Note this only takes a flat filename for the current directory.
      // If file exists, ask for whether to overwrite.
      if (file_exists($filename)) {
        if (!drush_confirm(dt("File $filename exists. Do you really want to overwrite?"))) {
          return;
        }
      }
      // Write the file.
      file_put_contents($filename, $json);
    }
    else {
      // stdout.
      drush_print_r($json);
    }
  }
  else {
    // We have received an error message.
    drush_set_error('DRUSH_NOT_COMPLETED',$json);
  }
}

