<?php
/**
 * @file
 * Template for the basic two column panels layout.
 */
$wrapper_open = '';
$wrapper_close = '';
$main_open = '';
$main_close = '';
$sidebar_open = '';
$sidebar_close = '';

if (empty($content['main_col']) || empty($content['sidebar'])) {
  if (!empty($css_id)) {
    $wrapper_open = "<div id=\"$css_id\">";
    $wrapper_close = '</div>';
  }
}
else {
  $wrapper_open = '<div class="row cols-2">';
  $wrapper_close = '</div>';
  $main_open = '<div class="col size-3of4">';
  $main_close = '</div>';
  $sidebar_open = '<aside class="col size-1of4">';
  $sidebar_close = '</aside>';

  if (!empty($css_id)) {
    $wrapper_open = "<div class=\"row cols-2\" id=\"$css_id\">";
  }
}
?>

<?php print $wrapper_open; ?>

<?php print $main_open; ?>
<?php print $content['main_col']; ?>
<?php print $main_close; ?>

<?php print $sidebar_open; ?>
<?php print $content['sidebar']; ?>
<?php print $sidebar_close; ?>

<?php print $wrapper_close; ?>
