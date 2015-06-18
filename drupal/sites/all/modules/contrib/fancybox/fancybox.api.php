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
 * Outlines available API hooks for you to extend the functionality of Drupal
 * fancyBox in your own module.
 */

/**
 * Modify fancyBox settings just before being rendered to Javascript.
 *
 * Implement this hook for settings that do not appear on the module's
 * interface, settings that are dependent on taxonomy, etc.
 *
 * @param &$options array
 *   An associative array of fancyBox options.
 * @param &$helpers array
 *   An associative array of fancyBox helpers and their options.
 *
 * @see http://fancyapps.com/fancybox/#docs
 */
function hook_fancybox_settings_alter(&$options, &$helpers) {
  $options['tpl'] = array(
    'closeBtn' => '<a title="Close this window" class="fancybox-item fancybox-close" href="javascript:;"></a>',
  );
}
