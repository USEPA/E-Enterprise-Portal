<?php
/**
 * @file
 * block--menu--menu-footer-disclaimers.tpl.php
 */
?>
<div id="release-number-footer">
    <?php echo release_number(); ?>
</div>
<div class="nav block menu-footer-disclaimers" role="navigation">

<?php if ($block->subject): ?>
  <h2 class="element-invisible"><?php print $block->subject; ?></h2>
<?php endif;?>
<?php print $content; ?>
</div>
