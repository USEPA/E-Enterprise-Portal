<?php
/**
 * @file
 * services-documentation-method-bundle.tpl.php
 *
 * Template file for theming a given Services method bundle.
 *
 * Method bundles groups a specific type of method, as defined by Services
 * terminology. E.g., operations, actions, targeted actions.
 *
 * Available variables:
 *
 * - $name
 * - $methods
 * - $rest_language
 */
?>
<!-- services-documentation-method-bundle -->
<div class="resource-method-bundle">
  <?php if (!empty($name)): ?>
    <h3 class="bundle-title"><?php print $name; ?></h3>
  <?php endif; ?>

  <?php print render($methods); ?>

</div>
<!-- /services-documentation-method-bundle -->
