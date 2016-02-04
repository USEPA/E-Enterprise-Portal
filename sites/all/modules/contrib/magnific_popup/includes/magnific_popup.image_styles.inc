<?php
/**
 * @file magnific_popup/includes/magnific_popup.image_styles.inc
 *
 * Image styles for Magnific Popup.
 */

/**
 * Implements hook_image_default_styles().
 */
function magnific_popup_image_default_styles() {
  $styles = array();
  $module_path = drupal_get_path('module', 'magnific_popup');
  // Exported image style: thumbnail.
  $styles['magnific_popup_thumbnail'] = array(
    'name' => 'magnific_popup_thumbnail',
    'label' => t('Magnific Popup: Default Thumbnail'),
    'effects' => array(
      4 => array(
        'label' => 'Scale and crop',
        'help' => 'Scale and crop will maintain the aspect-ratio of the original image, then crop the larger dimension. This is most useful for creating perfectly square thumbnails without stretching the image.',
        'effect callback' => 'image_scale_and_crop_effect',
        'dimensions callback' => 'image_resize_dimensions',
        'form callback' => 'image_resize_form',
        'summary theme' => 'image_resize_summary',
        'module' => 'image',
        'name' => 'image_scale_and_crop',
        'data' => array(
          'width' => 480,
          'height' => 360,
        ),
        'weight' => -10,
      ),
    ),
  );

  return $styles;
}
