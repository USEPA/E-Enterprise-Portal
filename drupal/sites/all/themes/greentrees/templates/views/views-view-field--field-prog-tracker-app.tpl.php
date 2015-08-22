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
if(!empty($view->result[$view->row_index]->field_field_prog_track_facility_name)){
    print "<br><span class='item-subscript-text'>".$view->result[$view->row_index]->field_field_prog_track_facility_name[0]['rendered']['#markup']."</span>";
}

if(!empty($view->result[$view->row_index]->field_field_prog_track_facility_name)) {
    //print "<div id='modal-page-details-" . $view->row_index . "' class='modal-content-in-page'>".$view->result[$view->row_index]->field_field_prog_track_item_details[0]['rendered']['#markup']."</div>";
    $unique_id = $view->query->pager->current_page.'-'.$view->row_index;
    print "<div id='modal-page-details-prog-track-" . $unique_id . "' class='modal-content-in-page'>
            <p><span class='modal-label'>Reporting Facility</span><br/> ".$view->result[$view->row_index]->field_field_prog_track_facility_name[0]['rendered']['#markup']." (".$view->result[$view->row_index]->field_field_prog_track_facility_reg_id[0]['rendered']['#markup'].")</p>
            <p><span class='modal-label'>Report will be published on</span><br/><strong> " . $view->result[$view->row_index]->field_field_prog_track_updated[0]['rendered']['#markup']."</strong></p>
            <p><span class='modal-label'>Other Information</span><br/> ".$view->result[$view->row_index]->field_field_prog_track_part_code[0]['rendered']['#markup']." - ".$view->result[$view->row_index]->field_field_prog_track_part_name[0]['rendered']['#markup']."<br/>".$view->result[$view->row_index]->field_field_prog_track_sub_part_code[0]['rendered']['#markup']." - ".$view->result[$view->row_index]->field_field_prog_track_sub_part_name[0]['rendered']['#markup']."</div>";
    print "<br><a href='.' class='simple-dialog' id='details-link-" . $unique_id . "' rel='width:900;resizable:false;position:[center,center]' name='modal-page-details-prog-track-" . $unique_id . "' title='Item Details'>Details</a>";
}
else if(!empty($view->result[$view->row_index]->field_field_prog_track_status_note)) {
    $unique_id = $view->query->pager->current_page.'-'.$view->row_index;
    print "<div id='modal-page-details-prog-track-" . $unique_id . "' class='modal-content-in-page'>
            <p><span class='modal-label'>Application Information</span><br/>" . $view->result[$view->row_index]->field_field_prog_tracker_app[0]['rendered']['#markup']."</p>
            <p><span class='modal-label'>Status</span><br/><strong> " . $view->result[$view->row_index]->field_field_prog_track_status[0]['rendered']['#markup']."</strong></p>
            <p><span class='modal-label'>Status Note</span><br/> ".$view->result[$view->row_index]->field_field_prog_track_status_note[0]['rendered']['#markup']."</p><br/><p>Please contact the Lead Hotline at 1-800-424-LEAD [5323] if you have any questions about the status of your application.</p>
          </div>";
    print "<br/><a href='.' class='simple-dialog' id='details-link-" . $unique_id . "' rel='width:900;resizable:false;position:[center,center]' name='modal-page-details-prog-track-" . $unique_id . "' title='Status Note'>Details</a>";
}
?>