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
foreach ($row->field_field_profile_favourites as $key => $array) {
		$url = $array['raw']['field_url'][LANGUAGE_NONE][0]['value'];
  $title = $array['rendered']['field_title'][0]['#markup'];
  if (trim($title) == '') {
    $title = $url;
  }
  $date_updated = date_create($array['raw']['field_date_updated'][LANGUAGE_NONE][0]['value']);
  $date_updated = date_format($date_updated, 'd/m/Y h:i a');
  $id = $array['raw']['id'];
  echo '<tr><td class="favorites-holder"><a href="javascript:void(0)" title="Remove favorite" id="' . $id . '__favorite_link" class="favorites-ignore remove_link in-widget old_link"><span class="sr-only">Remove favorite ' . $title . '</span><span class="fa fa-heart filled" aria-hidden="true"></span></a><a class="favorites-link favorites-ignore" target="_blank" href="' . $url . '">' .
    $title . '</a></td></tr>';
}
