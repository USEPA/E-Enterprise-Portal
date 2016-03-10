<?php
/**
 * @file
 * block--system--main.tpl.php
 */
?>
<nav class="nav main-nav usa-width-one-half" role="navigation">
<?php if ($block->subject): ?>
  <h2 class="element-invisible"><?php print $block->subject; ?></h2>
<?php endif;?>
<?php print $content; ?>
</nav>
