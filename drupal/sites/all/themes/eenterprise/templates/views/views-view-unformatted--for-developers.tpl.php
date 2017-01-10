<?php

/**
 * @file
 * Default simple view template to display a list of rows.
 *
 * @ingroup views_templates
 */
// Add jQuery for Accordion
drupal_add_css("sites/all/libraries/jqueryui/themes/base/minified/jquery.ui.accordion.css", ['scope'=>'footer', 'preprocess'=>true, 'group'=>CSS_DEFAULT]);
drupal_add_js("sites/all/libraries/jqueryui/ui/minified/jquery.ui.accordion.min.js", ['scope'=>'footer', 'preprocess'=>true, 'group'=>JS_THEME, 'type'=>'file', 'cache'=>true, 'requires_jquery'=>true]);
drupal_add_js('jQuery(document).ready(function(){jQuery("#app-connect-tabs").tabs();});', ['scope'=>'footer', 'type'=>'inline']);

?>

<?php if (!empty($title)): ?>
  <?php
  $title_machine_name = preg_replace('@[^a-z0-9-]+@', '-', strtolower($title));
  $tid = key(taxonomy_get_term_by_name($title));
  ?>
    <h2 class="developer-category" id="<?php print $tid; ?>"><?php print $title; ?></h2>
<?php endif; ?>
<ul class="bulleted">
  <?php foreach ($rows as $id => $row): ?>
      <li<?php if ($classes_array[$id]) {
        print ' class="' . $classes_array[$id] . '"';
      } ?>>
        <?php print $row; ?>
      </li>
  <?php endforeach; ?>
</ul>