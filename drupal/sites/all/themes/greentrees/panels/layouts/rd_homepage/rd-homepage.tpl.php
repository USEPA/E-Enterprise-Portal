<?php
/**
 * @file
 * Template for the RD Home page panels layout.
 */
$wrapper_open = '';
$wrapper_close = '';
$main_open = '';
$main_close = '';
$sidebar_open = '';
$sidebar_close = '';

if (!empty($content['sidebar'])) {
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
else if (!empty($css_id)) {
  $wrapper_open = "<div id=\"$css_id\">";
  $wrapper_close = '</div>';
}

$row_a_wrapper = '<div class="row cols-2">';
$row_a_inner = '<div class="col">';
$row_a_close = '</div>';

if (empty($content['rda1']) || empty($content['rda2'])) {
  $row_a_wrapper = '';
  $row_a_inner = '';
  $row_a_close = '';
}

$row_b_wrapper = '<div class="row cols-2">';
$row_b_inner = '<div class="col">';
$row_b_close = '</div>';

if (empty($content['rdb1']) || empty($content['rdb2'])) {
  $row_b_wrapper = '';
  $row_b_inner = '';
  $row_b_close = '';
}

$row_c_wrapper = '<div class="row cols-2">';
$row_c_inner = '<div class="col">';
$row_c_close = '</div>';

if (empty($content['rdc1']) || empty($content['rdc2'])) {
  $row_c_wrapper = '';
  $row_c_inner = '';
  $row_c_close = '';
}
?>
<?php print $wrapper_open; ?>
  <?php print $main_open; ?>
    <?php print $content['main_col']; ?>

    <?php print $row_a_wrapper; ?>
      <?php print $row_a_inner; ?>
      <?php print $content['rda1']; ?>
      <?php print $row_a_close; ?>

      <?php print $row_a_inner; ?>
      <?php print $content['rda2']; ?>
      <?php print $row_a_close; ?>
    <?php print $row_a_close; ?>

    <?php print $row_b_wrapper; ?>
      <?php print $row_b_inner; ?>
      <?php print $content['rdb1']; ?>
      <?php print $row_b_close; ?>

      <?php print $row_b_inner; ?>
      <?php print $content['rdb2']; ?>
      <?php print $row_b_close; ?>
    <?php print $row_b_close; ?>

    <?php print $row_c_wrapper; ?>
      <?php print $row_c_inner; ?>
      <?php print $content['rdc1']; ?>
      <?php print $row_c_close; ?>

      <?php print $row_c_inner; ?>
      <?php print $content['rdc2']; ?>
      <?php print $row_c_close; ?>
    <?php print $row_c_close; ?>

    <?php print $content['bottom']; ?>
  <?php print $main_close; ?>

  <?php print $sidebar_open; ?>
  <?php print $content['sidebar']; ?>
  <?php print $sidebar_close; ?>
<?php print $wrapper_close; ?>
