<?php
use Drupal\node\Entity\Node;
use Drupal\node_import_export\NodeExport;
use Drupal\node_import_export\NodeImport;

/**
 * @file
 * Contains definations for Drush commands and callbacks.
 */

/**
 * Implements hook_drush_command().
 */
function node_import_export_drush_command() {

  $commands['node_import_export_export_callback'] = [
    'description' => 'Export nodes using Node Import-Export.',
    'aliases' => ['ne-export'],
    'node_import_export alias for' => "node_import_export_export",
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
  $commands['import_nodes'] = [
    'description' => 'Import nodes exported using Node Import-Export.',
    'aliases' => ['ne-import'],
    'arguments' => array(
      'file' => 'File containing exported node code.',
    ),
    'examples' => array(
      'drush node_import_nodes "/path/to/file"' =>
        'Import nodes from file located at /path/to/file.',
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
function node_import_export_drush_help($section) {
  // This is to prevent duplication of information from hook_drush_command().
  $commands = node_import_export_drush_command();
  foreach ($commands as $command => $command_info) {
    if ($section == 'drush:' . $command) {
      $out = $command_info['description'];
      if (isset($command_info['node_import_export alias for'])) {
        $output .= "\nThis command is an alias for ";
        $output .= $command_info['node_import_export alias for'] . ".";
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
 * Drush command logic for command node_import_export_export.
 */
function drush_node_import_export_export_callback() {
  $ids = array_filter(func_get_args(), 'is_numeric');
  $save = substr(strtolower(drush_get_option('file')), 0, 1) === 'y';
  $export = NodeExport::export($ids, 'json', $save);
  if ($save) {
    if ($export) {
      drush_print(dt('Nodes exported to ' .
        \Drupal::service('file_system')->realpath($export->getFileUri())));
    }
    else {
      drush_set_error('Could not export the nodes.');
    }
  }
  else {
    drush_print_r($export);
  }
}

/**
 * Drush 8 command to import nodes.
 */
function drush_node_import_export_import_nodes() {
  $file = drush_get_arguments()[1];
  $data = file_get_contents($file);
  if ($data) {
    $nodes = json_decode($data, TRUE);
    $countImported = 0;
    $countNotImported = 0;
    foreach ($nodes as $node) {
      $id = NodeImport::import($node);
      $id ? $countImported++ : $countNotImported++;
    }
    if ($countImported > 0) {
      drush_print(dt('@count nodes imported successfully.', ['@count' => $countImported]));
    }
    if ($countNotImported > 0) {
      drush_set_error(dt('@count nodes could not be imported.', ['@count' => $countNotImported]));
    }
  }
  else {
    drush_set_error('Could not read the file.');
  }
}
