<?php
/**
 * @file panels-pane.tpl.php
 * Main panel pane template
 *
 * Variables available:
 * - $pane->type: the content type inside this pane
 * - $pane->subtype: The subtype, if applicable. If a view it will be the
 *   view name; if a node it will be the nid, etc.
 * - $title: The title of the content
 * - $content: The actual content
 * - $links: Any links associated with the content
 * - $more: An optional 'more' link (destination only)
 * - $admin_links: Administrative links associated with the content
 * - $feeds: Any feed icons or associated with the content
 * - $display: The complete panels display object containing all kinds of
 *   data including the contexts and all of the other panes being displayed.
 */
drupal_add_js(drupal_get_path('theme', 'eenterprise') ."/js/ElementQueries.js", "file");
drupal_add_js(drupal_get_path('theme', 'eenterprise') ."/js/ResizeSensor.js", "file");
drupal_add_js(drupal_get_path('module', 'eenterprise_utility') . '/location_input_engine.js');
?>
<?php if ($pane_prefix): ?>
  <?php print $pane_prefix; ?>
<?php endif; ?>
<div class="grid-stack-item" data-gs-width="6" data-gs-height="30" data-gs-no-resize="true" data-gs-no-move="true" style="opacity:1.0">
    <div class="<?php print $classes; ?>" <?php print $id; ?> <?php print $attributes; ?>>
      <?php if ($admin_links): ?>
        <?php print $admin_links; ?>
      <?php endif; ?>

      <?php print render($title_prefix); ?>
      <?php if ($title): ?>
        <<?php print $title_heading; ?><?php print $title_attributes; ?> tabindex="0">
        <?php print $title; ?>
        </<?php print $title_heading; ?>>
      <?php endif; ?>

      <?php print render($title_suffix); ?>

      <a class="skip-widget element-invisible element-focusable" href="javascript:void(0)">Skip to next widget</a>

      <?php if ($feeds): ?>
        <div class="feed">
          <?php print $feeds; ?>
        </div>
      <?php endif; ?>

      <div class="pane-content">
        <?php print render($content); ?>
      </div>

      <?php if ($links): ?>
        <div class="links">
          <?php print $links; ?>
        </div>
      <?php endif; ?>

      <?php if ($more): ?>
        <div class="more-link">
          <?php print $more; ?>
        </div>
      <?php endif; ?>
    </div>
</div>
<?php if ($pane_suffix): ?>
  <?php print $pane_suffix; ?>
<?php endif; ?>
