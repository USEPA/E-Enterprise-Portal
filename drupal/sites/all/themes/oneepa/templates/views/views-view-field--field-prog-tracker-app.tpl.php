<?php

/**
 * @file
 * This template is used to print a single field in a view.
 *
 * It is not actually used in default Views, as this is registered as a theme
 * function which has better performance. For single overrides, the template is
 * perfectly okay.
 *
 * Variables available:
 * - $view: The view object
 * - $field: The field handler object that can process the input
 * - $row: The raw SQL result that can be used
 * - $output: The processed output that will normally be used.
 *
 * When fetching output from the $row, this construct should be used:
 * $data = $row->{$field->field_alias}
 *
 * The above will guarantee that you'll always get the correct data,
 * regardless of any changes in the aliasing that might happen if
 * the view is modified.
 */
?>
<?php print $output;
if(!empty($view->result[$view->row_index]->field_field_prog_track_item_desc))
    print "<br><span class='item-subscript-text'>".$view->result[$view->row_index]->field_field_prog_track_item_desc[0]['rendered']['#markup']."</span>";
if(!empty($view->result[$view->row_index]->field_field_prog_track_item_details)) {
    print "<div id='modal-page-details-" . $view->row_index . "' class='modal-content-in-page'>".$view->result[$view->row_index]->field_field_prog_track_item_details[0]['rendered']['#markup']."</div>";
    print "<br><a href='.' class='simple-dialog' rel='width:900;resizable:false;position:[center,center]' name='modal-page-details-" . $view->row_index . "' title='Item Details'>Details</a>";
}
?>