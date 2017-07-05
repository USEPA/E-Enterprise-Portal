<?php

/**
 * Created by PhpStorm.
 * User: bmatkin
 * Date: 7/5/2017
 * Time: 11:30 AM
 */
class AdditionalResources {
  // Array of additonal resources
  private $additional_resources;
  // Array of user locations;
  private $user_locations;

  public function __construct() {
    $this->additional_resources = node_load_multiple(array(), array('type' => 'state_resource'));
  }

  public function loadAdditionalResources() {
    drupal_json_output($this->additional_resources);
  }

  public function additionalResourcesDatatableJSON() {
    $json = [];
    foreach ($this->additional_resources as $nid => $node) {
      $datatable_row = [];
      $datatable_row[] = $node['title'];
      $resource_text = $node['field_source'][LANGUAGE_NONE]['value'] .
        $node['field_source_url'][LANGUAGE_NONE]['value'] .

          $datatable_row[] = $node['field_source'][LANGUAGE_NONE]['value'];

      $datatable_row[] = $node['title'];
      $datatable_row[] = $node['title'];

    }
    return $json;
  }

}