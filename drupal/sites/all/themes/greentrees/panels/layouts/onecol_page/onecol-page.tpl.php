<?php
/**
 * @file
 * Template for the basic one column panels layout.
 */
$wrapper_open = '';
$wrapper_close = '';

if (!empty($css_id)) {
  $wrapper_open = "<div id=\"$css_id\">";
  $wrapper_close = '</div>';
}
?>

<?php print $wrapper_open; ?>
<?php print $content['main_col']; ?>
<?php print $wrapper_close; ?>
