<?php
/**
 * @file
 * block--system--main.tpl.php
 */
?>
<nav class="nav simple-nav simple-main-nav" role="navigation">
<?php if ($block->subject): ?>
  <h2 class="element-invisible"><?php print $block->subject; ?></h2>
<?php endif;?>
<?php print $content; ?>
</nav>
