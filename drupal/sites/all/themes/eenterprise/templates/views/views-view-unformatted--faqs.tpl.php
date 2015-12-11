<?php

/**
 * @file
 * Default simple view template to display a list of rows.
 *
 * @ingroup views_templates
 */
?>

<?php if (!empty($title)): ?>
	<?php 
			$title_machine_name = preg_replace('@[^a-z0-9-]+@','-', strtolower($title));
			$tid = key(taxonomy_get_term_by_name($title));
	?>
  <h3 class="faq-category" id="<?php print $tid; ?>"><?php print $title; ?></h3>
<?php endif; ?>
<ul class="bulleted">
<?php foreach ($rows as $id => $row): ?>
  <li<?php if ($classes_array[$id]) { print ' class="' . $classes_array[$id] .'"';  } ?>>
    <?php print $row; ?>
  </li>
<?php endforeach; ?>
</ul>
