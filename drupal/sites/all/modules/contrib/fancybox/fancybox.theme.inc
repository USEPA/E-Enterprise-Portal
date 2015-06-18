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
 * fancyBox theme functions.
 */

/**
 * Formats and displays a fancyBox image field.
 *
 * @param $variables array
 */
function theme_fancybox_image_formatter($variables) {
  $item = $variables['item'];
  $entity = $variables['entity'];
  $entity_type = $variables['entity_type'];
  $field = $variables['field'];
  $settings = $variables['display_settings'];

  $image = array(
    'path' => $item['uri'],
    'alt' => $item['alt'],
    'title' => $item['title'],
    'style_name' => $settings['fancybox_image_style_content'],
  );

  if (isset($item['width']) && isset($item['height'])) {
    $image['width'] = $item['width'];
    $image['height'] = $item['height'];
  }

  $caption = '';

  // Default entity keys
  $entity_key_label = 'title';
  $entity_key_id = $entity_type == 'node' ? 'nid' : 'id';

  // Prepare entity info if Entity API is available
  if (module_exists('entity')) {
    $entity_info = entity_get_info($entity_type);
    $entity_key_label = isset($entity_info['entity keys']['label']) ? $entity_info['entity keys']['label'] : $entity_key_label;
    $entity_key_id = isset($entity_info['entity keys']['id']) ? $entity_info['entity keys']['id'] : $entity_key_id;
  }

  // Finally getting values of the content
  $content_label = isset($entity->$entity_key_label)? $entity->$entity_key_label : '';
  $content_id = isset($entity->$entity_key_id)? $entity->$entity_key_id : 'id';

  switch ($settings['fancybox_caption']) {
    case 'auto':
      if (!empty($image['title'])) {
        $caption = $image['title'];
      }
      elseif (!empty($image['alt'])) {
        $caption = $image['alt'];
      }
      else {
        $caption = $content_label;
      }
      break;
    case 'title':
      $caption = $image['title'];
      break;
    case 'alt':
      $caption = $image['alt'];
      break;
    case 'content_title':
      $caption = $content_label;
      break;
    case 'custom':
      $caption = token_replace($settings['fancybox_caption_custom'], array($entity_type => $entity, 'file' => (object) $item), array('clear' => TRUE));
      $caption = htmlspecialchars_decode($caption, ENT_QUOTES);
      break;
  }

  switch ($settings['fancybox_gallery']) {
    case 'post':
      $gid = 'gallery-post-' . $content_id;
      break;
    case 'page':
      $gid = 'gallery-page';
      break;
    case 'field_post':
      $gid = 'gallery-post-' . $content_id . '-field-' . $field['id'];
      break;
    case 'field_page':
      $gid = 'gallery-page-field-' . $field['id'];
      break;
    case 'custom':
      $gid = $settings['fancybox_gallery_custom'];
      break;
    default:
      $gid = '';
      break;
  }

  $path = $settings['fancybox_image_style_fancybox'] ? image_style_url($settings['fancybox_image_style_fancybox'], $image['path']) : file_create_url($image['path']);

  return theme('fancybox_imagefield', array(
    'image' => $image,
    'path' => $path,
    'caption' => $caption,
    'group' => $gid,
  ));
}

/**
 * Returns HTML for a fancyBox image field.
 *
 * @param $variables array
 */
function theme_fancybox_imagefield($variables) {
  $image = $variables['image'];
  $path = $variables['path'];
  $caption = $variables['caption'];
  $group = $variables['group'];

  return l(theme(empty($image['style_name']) ? 'image' : 'image_style', $image), $path, array(
    'html' => TRUE,
    'attributes' => array(
      'title' => $caption,
      'class' => 'fancybox',
      'data-fancybox-group' => $group,
    ),
  ));
}

/**
 * Preprocess function for fancybox-insert-image.tpl.php.
 */
function template_preprocess_fancybox_insert_image(&$variables) {
  $classes = array();
  $file = file_load($variables['item']['fid']);

  if (!empty($variables['widget']['settings']['insert_class'])) {
    $classes = explode(' ', $variables['widget']['settings']['insert_class']);
  }

  $classes[] = 'image-' . $variables['item']['style_name'];

  foreach ($classes as $i => $value) {
    $classes[$i] = drupal_html_class($value);
  }

  $variables['image_path'] = image_style_url($variables['item']['style_name'], $file->uri);
  $variables['link_path'] = file_create_url($file->uri);
  $variables['class'] = implode(' ', $classes);
  $variables['gid'] = 'gallery-all';
}
