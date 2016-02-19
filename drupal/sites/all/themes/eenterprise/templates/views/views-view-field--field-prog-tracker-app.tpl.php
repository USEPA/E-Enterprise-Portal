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
<?php
//TODO: move this to template.php
$trunc_pos = strpos($output, ')');
if($trunc_pos !== false){
    $output = substr($output, 0, $trunc_pos+1)."<span class='report-name'>".substr($output, $trunc_pos+1)."</span>";
}

print $output;
if(!empty($view->result[$view->row_index]->field_field_prog_track_facility_name)){
    print "<br><span class='item-subscript-text'>".$view->result[$view->row_index]->field_field_prog_track_facility_name[0]['rendered']['#markup']."</span>";
}

?>