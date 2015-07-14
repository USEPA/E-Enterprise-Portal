<?php

/**
 * Theme function for a qtip.
 */
function theme_qtip($vars) {
  $output  = '<span class="qtip-link">';
  $output .=    filter_xss_admin($vars['content']);
  $output .= '</span>';
  $output .= '<span class="qtip-tooltip"' . (isset($vars['title']) ? ' data-qtip-title="' . filter_xss_admin($vars['title']) . '"' : '') . (isset($vars['instance']) ? ' data-qtip-instance="'. $vars['instance'] . '"' : '') . '>' .
                filter_xss_admin($vars['tooltip']) .
             '</span>';
  return $output;
}

function theme_qtip_form($vars) {
  $output = '<span class="qtip-tooltip"' . (isset($vars['title']) ? ' data-qtip-title="' . filter_xss_admin($vars['title']) . '"' : '') . (isset($vars['instance']) ? ' data-qtip-instance="'. $vars['instance'] . '"' : '') . '>' .
               filter_xss_admin($vars['tooltip']) .
            '</span>';
  return $output;
}
