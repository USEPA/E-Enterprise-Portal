<?php
/**
 * @file
 * block--menu--menu-footer-disclaimers.tpl.php
 */
?>
<div class="nav workbench-menu" role="navigation">
<?php if ($block->subject): ?>
  <h2 class="element-invisible"><?php print $block->subject; ?></h2>
<?php endif;?>
<?php print $content; ?>
</div>
