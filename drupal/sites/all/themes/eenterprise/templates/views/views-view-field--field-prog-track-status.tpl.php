<?php
$unique_id = $view->query->pager->current_page.'-'.$view->row_index;
print "<div id='modal-page-details-prog-track-" . $unique_id . "' class='modal-content-in-page'>
    <p><span class='modal-label'>Application Information</span>" . $view->result[$view->row_index]->field_field_prog_tracker_app[0]['rendered']['#markup']."</p>
    <p><span class='modal-label'>Status</span><strong> " . $view->result[$view->row_index]->field_field_prog_track_status[0]['rendered']['#markup']."</strong></p>";

if(!empty($view->result[$view->row_index]->field_field_prog_track_status_note))
    print "<p><span class='modal-label'>Status Note</span> ".$view->result[$view->row_index]->field_field_prog_track_status_note[0]['rendered']['#markup']."</p>";
if($view->result[$view->row_index]->field_field_prog_track_domain[0]['rendered']['#markup'] == 'Lead')
    print "<p class='helpdesk-message'>Please contact the Lead Hotline at 1-800-424-LEAD [5323] if you have any questions about the status of your application.</p>";
else if ($view->result[$view->row_index]->field_field_prog_track_domain[0]['rendered']['#markup'] == 'CEDRI')
    print "<p><span class='modal-label'>Other Information</span> ".$view->result[$view->row_index]->field_field_prog_track_part_code[0]['rendered']['#markup']." - ".$view->result[$view->row_index]->field_field_prog_track_part_name[0]['rendered']['#markup']."<br/> ".$view->result[$view->row_index]->field_field_prog_track_sub_part_code[0]['rendered']['#markup']." - ".$view->result[$view->row_index]->field_field_prog_track_sub_part_name[0]['rendered']['#markup']."</p>";
print "</div>";
$title_value = $view->result[$view->row_index]->field_field_prog_tracker_app[0]['rendered']['#markup'];
print "<a href='.' class='simple-dialog' id='details-link-" . $unique_id . "' rel='width:900;resizable:false;position:[center,center]' name='modal-page-details-prog-track-" . $unique_id . "' title='Details for ".$title_value."'>".$output."</a>";
?>