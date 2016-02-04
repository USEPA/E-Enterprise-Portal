<?php
/**
 * @file magnific_popup/modules/includes/magnific_popup_youtube.image_styles.inc
 *
 * Image styles for Magnific Popup.
 */

/**
 * Implements hook_image_default_styles().
 */
function magnific_popup_youtube_image_default_styles() {
  $styles = array();
  $module_path = drupal_get_path('module', 'magnific_popup_youtube');
  // Exported image style: youtube_play_preview.
  $styles['magnific_popup_yt_preview_wplay'] = array(
    'name' => 'magnific_popup_yt_preview_wplay',
    'label' => t('Magnific Popup: YouTube Preview w/Play button overlay'),
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
          'height' => 270,
        ),
        'weight' => -10,
      ),
      2 => array(
        'label' => 'Overlay (watermark)',
        'help' => 'Choose the file image you wish to use as an overlay, and position it in a layer on top of the canvas.',
        'effect callback' => 'canvasactions_file2canvas_effect',
        'dimensions passthrough' => TRUE,
        'form callback' => 'canvasactions_file2canvas_form',
        'summary theme' => 'canvasactions_file2canvas_summary',
        'module' => 'imagecache_canvasactions',
        'name' => 'canvasactions_file2canvas',
        'data' => array(
          'xpos' => 'center',
          'ypos' => 'bottom',
          'alpha' => 100,
          'path' => "{$module_path}/images/youtube-chrome_bottom.png",
        ),
        'weight' => -9,
      ),
      3 => array(
        'label' => 'Overlay (watermark)',
        'help' => 'Choose the file image you wish to use as an overlay, and position it in a layer on top of the canvas.',
        'effect callback' => 'canvasactions_file2canvas_effect',
        'dimensions passthrough' => TRUE,
        'form callback' => 'canvasactions_file2canvas_form',
        'summary theme' => 'canvasactions_file2canvas_summary',
        'module' => 'imagecache_canvasactions',
        'name' => 'canvasactions_file2canvas',
        'data' => array(
          'xpos' => 'center',
          'ypos' => 'center',
          'alpha' => 100,
          'path' => "{$module_path}/images/youtube-play_button.png",
        ),
        'weight' => -8,
      ),
    ),
  );

  return $styles;
}
