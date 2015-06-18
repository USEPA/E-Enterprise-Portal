<?php

/**
 * Provides the fancyBox jQuery plugin, a tool that offers a nice and elegant
 * way to add zooming functionality for images, html content and multi-media
 * on your webpages, and an extensive settings page for configuring fancyBox
 * settings and how fancyBox interacts with your Drupal website.
 *
 * Commercial websites must obtain at least a single domain license in order
 * to use the fancyBox plugin legally. (http://fancyapps.com/fancybox/#license).
 *
 * If you find this module useful and would like to donate towards further
 * development and maintenance, please consider donating to the module
 * maintainer(s):
 *  - Daniel Imhoff (d.o: dwieeb, email: dwieeb@gmail.com)
 *    http://www.danielimhoff.com/donations/
 *
 * == BEGIN LICENSE ==
 *
 * Licensed under:
 *  - Creative Commons Attribution-NonCommercial 3.0
 *    http://creativecommons.org/licenses/by-nc/3.0/
 *
 * == END LICENSE ==
 *
 * @file
 * Template file for an image with fancyBox activated for the Insert module.
 *
 * Available variables:
 * - $item: The complete item being inserted.
 * - $image_path: The URL to the image.
 * - $link_path: The URL to the image that fancyBox should open.
 * - $class: A set of classes assigned to this image (if any).
 * - $gid: The ID of the fancyBox gallery.
 *
 * __alt__ and __title__ are placeholders for the Insert module.
 */

?>
<a href="<?php print $link_path; ?>" title="__title__" class="fancybox fancybox-insert-image" data-fancybox-group="<?php print $gid; ?>">
  <img typeof="foaf:Image" src="<?php print $image_path; ?>" alt="__alt__" title="__title__" class="<?php print $class; ?>" />
</a>
