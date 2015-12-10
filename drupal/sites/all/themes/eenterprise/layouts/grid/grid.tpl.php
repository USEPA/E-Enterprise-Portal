<?php
/**
 * @file
 * Template for a 3 column panel layout.
 *
 * This template provides a very simple "one column" panel display layout.
 *
 * Variables:
 * - $id: An optional CSS id to use for the layout.
 * - $content: An array of content, each item in the array is keyed to one
 *   panel of the layout. This layout supports the following sections:
 *   $content['middle']: The only panel in the layout.
 */
$font_awesome_path = libraries_get_path('font-awesome-4.5.0');
drupal_add_css( $font_awesome_path . "/css/font-awesome.min.css", "file");
?>
<div class="panel-display panel-grid clearfix"  <?php if (!empty($css_id)) { print "id=\"$css_id\""; } ?>>
  <div class="panel-panel panel-col grid-stack grid-stack-2">
            <?php print $content['middle']; ?>
  </div>
</div>
