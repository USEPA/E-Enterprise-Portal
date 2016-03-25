<?php
/**
 * @file
 * Returns the HTML for a block.
 *
 * Complete documentation for this file is available online.
 * @see https://drupal.org/node/1728246
 */
?>
<div id="<?php print $block_html_id; ?>" class="<?php print $classes; ?> <?php print $block_classes; ?>"<?php print $attributes; ?>>
  <?php print render($title_prefix); ?>

  <?php if ($block->subject): ?>
    <h2<?php print $title_attributes; ?>><?php print $block->subject; ?></h2>
  <?php endif;?>

  <?php print render($title_suffix); ?>

  <?php
    $block_open = '';
    $block_close = '';

    if (!empty($content_attributes)) {
      $block_open = '<div' . $content_attributes . '>';
      $block_close = '</div>';
    }
  ?>

  <?php print $block_open; ?>
  <?php print $content; ?>
  <?php print $block_close; ?>

</div>
