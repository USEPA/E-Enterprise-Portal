<?php
/**
 * @file magnific_popup/magnific_popup.api.php
 *
 * API/hook documentation for Magnific Popup.
 */

/**
 * Define supported URI schemes that get a special thumbnail.
 */
function hook_magnific_popup_thumbnail_schemes() {
  // Specify that "youtube://" URIs should get the special thumbnail image style
  // "magnific_popup_yt_preview_wplay".
  $thumbnail_schemes = array(
    'youtube' => 'magnific_popup_yt_preview_wplay',
  );
  return $thumbnail_schemes;
}

/**
 * Define supported File Entity URI schemes that get special iframe parameters.
 */
function hook_magnific_popup_iframe_patterns() {
  $iframe_patterns = array(
    'youtube' => array(
      'index' => 'youtube.com/',
      'id' => 'v=',
      'src' => '//www.youtube.com/embed/%id%?rel=0&modestbranding=1&playerapiid=mfp-iframe&controls=2&autoplay=1',
    ),
  );
  return $iframe_patterns;
}
