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
$src_link='';
if(!empty($view->result[$view->row_index]->field_field_todo_lst_activ_source_url)) {
  $src_link = $view->result[$view->row_index]->field_field_todo_lst_activ_source_url[0]['raw']['safe_value'];
}
else {
  $src_link = "/workbench";
}
print "<a href='".$src_link."' class='favorites-ignore' target='_blank'>".$output."</a>";
if(!empty($view->result[$view->row_index]->field_field_todo_lst_facility_name)) {
  print "<br><span class='date-subscript-text'>" . $view->result[$view->row_index]->field_field_todo_lst_facility_name[0]['rendered']['#markup'] . "</span>";
}
if(!empty($view->result[$view->row_index]->field_field_todo_lst_part_code)) {
    $unique_id = $view->query->pager->current_page.'-'.$view->row_index;
    print "<div id='modal-page-details-todo-" . $unique_id . "' class='modal-content-in-page'>
             <p><span class='modal-label'>Facility Information</span><br/> ".$view->result[$view->row_index]->field_field_todo_lst_facility_name[0]['rendered']['#markup']." (".$view->result[$view->row_index]->field_field_todo_lst_facility_reg_id[0]['rendered']['#markup'].")</p>
             <p><span class='modal-label'>Due Date</span><br/><strong> ".$view->result[$view->row_index]->field_field_todo_lst_due[0]['rendered']['#markup']."</strong></p>
             <p><span class='modal-label'>Other Information</span><br/> ".$view->result[$view->row_index]->field_field_todo_lst_part_code[0]['rendered']['#markup']." - ".$view->result[$view->row_index]->field_field_todo_lst_part_name[0]['rendered']['#markup']."<br/> ".$view->result[$view->row_index]->field_field_todo_lst_sub_part_code[0]['rendered']['#markup']." - ".$view->result[$view->row_index]->field_field_todo_lst_sub_part_name[0]['rendered']['#markup']."</p>
             </div>";
    print "<br><a href='.' class='simple-dialog' id='to-do-details-link-" . $unique_id . "' rel='width:900;resizable:false;position:[center,center]' name='modal-page-details-todo-" . $unique_id . "' title='Item Details'>Details</a>";
}
?>
