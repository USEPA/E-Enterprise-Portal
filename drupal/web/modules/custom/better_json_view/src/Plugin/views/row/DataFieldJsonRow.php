<?php
/**
 * Created by PhpStorm.
 * User: smolinsk
 * Date: 1/24/2019
 * Time: 1:40 PM
 */

namespace Drupal\better_json_view\Plugin\views\row;

use Drupal\views\ResultRow;
use Drupal\rest\Plugin\views\row\DataFieldRow;

/**
 * Plugin which displays fields as raw data.
 *
 * @ingroup views_row_plugins
 *
 * @ViewsRow(
 *   id = "better_json_data_field",
 *   title = @Translation("Better JSON Fields"),
 *   help = @Translation("Export to JSON with deep relationship support."),
 *   display_types = {"data"}
 * )
 */
class DataFieldJsonRow extends DataFieldRow {

  /**
   * {@inheritdoc}
   */
  public function render($row) {
    $output = [];

    $output = $this->getRenderOutput($row, $this->view->field);

    return $output;
  }

  public function getRenderOutput($row, $fields, $recursive = 0) {

    foreach ($fields as $id => $field) {
      // Handle our special cases
      if(stripos($field->options["type"], 'double_field') !== false) {
        $value = $row->_entity->get($id)->getValue();
        if(is_array($value)) {
          $tmpValues = [];
          foreach($value as $k => $v) {
            $tmpValues[$v['first']] = $this->autoCastValue($v['second']);
          }
          $value = $tmpValues;
        }
      }
      else if(stripos($field->options["type"], 'list') !== false) {
        $value = $row->_entity->get($id)->getValue();
        foreach($value as $key => $v) {
          if(count($v) === 1) {
            $value[$key] = $this->autoCastValue($v['value']);
          }
          else {
            $value[$key] = $v;
          }
        }
      }
      else if (stripos($field->options["type"], 'entity_reference') !== false) {
        $raw_items = $field->getItems($row);
        // If there are no items, set the original value to NULL.
        if (empty($raw_items)) {
          $field->original_value = NULL;
        }
        $items = [];
        foreach ($raw_items as $count => $item) {

          $entity = null;
          if($item["rendered"]["#type"] == 'link') {
            $entity = $item["rendered"]["#options"]['entity'];
            $nodeValues = $entity->getFields();
          }
          if($item["rendered"]["#node"]) {
            $entity = $item["rendered"]["#node"];
            $nodeValues = $item["rendered"]["#node"]->getFields();
          }

          $tmpRow = new ResultRow($nodeValues);
          $tmpRow->_entity = $entity;
          if($recursive < 4) {
            $items[] = $this->getRenderOutput($tmpRow, $entity->getFields(), ++$recursive);
          }
          else {
            // @TODO: Make this message and returned data more gracefull.
            $items == 'MAX ALLOWED ENTITY REFERENCE RECURSION';
          }
        }
        $value = $items;
      }
      // Otherwise, pass this through the field
      else {
        $value = $row->_entity->get($id)->getValue();
        if(is_array($value) && count($value) === 1 && isset($value[0]['value'])) {
          $value = $this->autoCastValue($value[0]['value']);
        }
      }

      // Omit excluded fields from the rendered output.
      if (empty($field->options['exclude'])) {
        $output[$id] = $value;
      }
    }

    return $output;
  }

  public static function autoCastValue($oldvalue) {
    $newValue = $oldvalue;

    // Crude proper casting
    $float = (float)$oldvalue;
    $int = (int)$oldvalue;
    if ($float != 0) {
      $newValue = $float;
    } else if($int != 0) {
      $newValue = $int;
    }  else if($oldvalue == '0') {
      $newValue = 0;
    } else if(strtolower($oldvalue) == 'true') {
      $newValue = true;
    } else if(strtolower($oldvalue) == 'false') {
      $newValue = false;
    }

    return $newValue;
  }

}
