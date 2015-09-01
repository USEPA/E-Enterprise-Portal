<?php
/**
 * @file
 * Template for a flexible 1-4 equal column panels layout.
 */
$cols = array(0, 0, 0);

foreach ($content as $key => $value) {
  $value = trim($value);
  if (!empty($value)) {
    switch ($key) {
      case 'a1':
        $cols[0]++;
        break;

      case 'a2':
        $cols[0]++;
        break;

      case 'a3':
        $cols[0]++;
        break;

      case 'a4':
        $cols[0]++;
        break;

      case 'b1':
        $cols[1]++;
        break;

      case 'b2':
        $cols[1]++;
        break;

      case 'b3':
        $cols[1]++;
        break;

      case 'b4':
        $cols[1]++;
        break;

      case 'c1':
        $cols[2]++;
        break;

      case 'c2':
        $cols[2]++;
        break;

      case 'c3':
        $cols[2]++;
        break;

      case 'c4':
        $cols[2]++;
        break;
    }
  }
}

$wrapper_open = '';
$wrapper_close = '';

if (!empty($css_id)) {
  $wrapper_open = "<div id=\"$css_id\">";
  $wrapper_close = '</div>';
}

$a_row_open = '';
$a_row_close = '';
$a_col_open = '';
$a_col_close = '';

if ($cols[0] > 0) {
  $a_row_open = "<div class=\"row row-a cols-$cols[0]\">";
  $a_row_close = '</div>';
  $a_col_open = '<div class="col">';
  $a_col_close = '</div>';
}

$b_row_open = '';
$b_row_close = '';
$b_col_open = '';
$b_col_close = '';

if ($cols[1] > 0) {
  $b_row_open = "<div class=\"row row-b cols-$cols[1]\">";
  $b_row_close = '</div>';
  $b_col_open = '<div class="col">';
  $b_col_close = '</div>';
}

$c_row_open = '';
$c_row_close = '';
$c_col_open = '';
$c_col_close = '';

if ($cols[2] > 1) {
  $c_row_open = "<div class=\"row row-c cols-$cols[2]\">";
  $c_row_close = '</div>';
  $c_col_open = '<div class="col">';
  $c_col_close = '</div>';
}
?>
<?php print $wrapper_open; ?>
  <?php print $a_row_open; ?>
    <?php if (!empty($content['a1'])): ?>
      <?php print $a_col_open; ?>
      <?php print $content['a1']; ?>
      <?php print $a_col_close; ?>
    <?php endif; ?>
    <?php if (!empty($content['a2'])): ?>
      <?php print $a_col_open; ?>
      <?php print $content['a2']; ?>
      <?php print $a_col_close; ?>
    <?php endif; ?>
    <?php if (!empty($content['a3'])): ?>
      <?php print $a_col_open; ?>
      <?php print $content['a3']; ?>
      <?php print $a_col_close; ?>
    <?php endif; ?>
    <?php if (!empty($content['a4'])): ?>
      <?php print $a_col_open; ?>
      <?php print $content['a4']; ?>
      <?php print $a_col_close; ?>
    <?php endif; ?>
  <?php print $a_row_close; ?>
  <?php print $b_row_open; ?>
    <?php if (!empty($content['b1'])): ?>
      <?php print $b_col_open; ?>
      <?php print $content['b1']; ?>
      <?php print $b_col_close; ?>
    <?php endif; ?>
    <?php if (!empty($content['b2'])): ?>
      <?php print $b_col_open; ?>
      <?php print $content['b2']; ?>
      <?php print $b_col_close; ?>
    <?php endif; ?>
    <?php if (!empty($content['b3'])): ?>
      <?php print $b_col_open; ?>
      <?php print $content['b3']; ?>
      <?php print $b_col_close; ?>
    <?php endif; ?>
    <?php if (!empty($content['b4'])): ?>
      <?php print $b_col_open; ?>
      <?php print $content['b4']; ?>
      <?php print $b_col_close; ?>
    <?php endif; ?>
  <?php print $b_row_close; ?>
  <?php print $c_row_open; ?>
    <?php if (!empty($content['c1'])): ?>
      <?php print $c_col_open; ?>
      <?php print $content['c1']; ?>
      <?php print $c_col_close; ?>
    <?php endif; ?>
    <?php if (!empty($content['c2'])): ?>
      <?php print $c_col_open; ?>
      <?php print $content['c2']; ?>
      <?php print $c_col_close; ?>
    <?php endif; ?>
    <?php if (!empty($content['c3'])): ?>
      <?php print $c_col_open; ?>
      <?php print $content['c3']; ?>
      <?php print $c_col_close; ?>
    <?php endif; ?>
    <?php if (!empty($content['c4'])): ?>
      <?php print $c_col_open; ?>
      <?php print $content['c4']; ?>
      <?php print $c_col_close; ?>
    <?php endif; ?>
  <?php print $c_row_close; ?>
<?php print $wrapper_close; ?>
