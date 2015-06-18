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
 * Administration page callbacks for the fancyBox module.
 */

function fancybox_admin_settings_form($form, &$form_state) {
  $library = libraries_info('fancybox');
  $settings = _fancybox_array_replace_recursive(_fancybox_defaults(), variable_get('fancybox_settings'));

  if (!$library['installed']) {
    if ($library['error'] == 'not found' || $library['error'] == 'not detected') {
      drupal_set_message(t('!error Please make sure the library is !installedcorrectly.', array('!error' => $library['error message'], '!installedcorrectly' => l(t('installed correctly'), 'admin/help/fancybox'))), 'error');
    }
    else {
      drupal_set_message(t('A conflict has been detected between Libraries API and the fancyBox module. Please make sure both modules are !updated to their latest versions. Also, make sure your fancyBox plugin is !uptodate and is !installedcorrectly. If this error persists, please submit a support request to the !issuequeue.', array('!error' => $library['error message'], '!uptodate' => l(t('up-to-date'), 'http://fancyapps.com/fancybox/#license'), '!installedcorrectly' => l(t('installed correctly'), 'admin/help/fancybox'), '!updated' => l(t('updated'), 'admin/reports/updates'), '!issuequeue' => l(t('issue queue'), 'http://drupal.org/project/issues/fancybox'))), 'error');
    }

    return;
  }

  $jquery = drupal_get_library('system', 'jquery');

  if (version_compare($jquery['version'], '1.7', '<')) {
    drupal_set_message(t('fancyBox requires jQuery 1.7 or higher. Please !configure to use a higher jQuery version.', array('!configure' => l(t('configure jQuery Update'), 'admin/config/development/jquery_update'))), 'error');

    return;
  }

  $form['settings'] = array(
    '#type' => 'fieldset',
    '#title' => t('Settings'),
    '#description' => t('These settings affect how fancyBox is used in your Drupal installation.'),
    '#collapsible' => TRUE,
    '#collapsed' => FALSE,
    '#tree' => TRUE,
  );

  $form['settings']['selectors'] = array(
    '#type' => 'textarea',
    '#title' => t('fancyBox Selectors'),
    '#description' => t('fancyBox will automatically be applied to the HTML elements represented by these jQuery selectors. List one selector per line.<br /><strong>Examples</strong>: <em>a:has(img)</em>, <em>.my_gallery a</em>, etc.'),
    '#default_value' => $settings['settings']['selectors'],
  );

  $form['settings']['deactivated_pages'] = array(
    '#type' => 'textarea',
    '#title' => t('Deactivate fancyBox on specific pages'),
    '#description' => t('Enter one page per line as Drupal paths. The \'*\' character is a wildcard. Example paths are %blog for the blog page and %blog-wildcard for every personal blog. %front is the front page.', array('%blog' => 'blog', '%blog-wildcard' => 'blog/*', '%front' => '<front>')),
    '#default_value' => $settings['settings']['deactivated_pages'],
  );

  $form['options'] = array(
    '#type' => 'fieldset',
    '#title' => t('Plugin options'),
    '#description' => t('These options control the look and feel of fancyBox.'),
    '#collapsible' => TRUE,
    '#collapsed' => TRUE,
    '#tree' => TRUE,
  );

  $form['options']['padding'] = array(
    '#type' => 'textfield',
    '#title' => t('Padding'),
    '#description' => t('The space inside fancyBox around content.'),
    '#default_value' => $settings['options']['padding'],
  );

  $form['options']['margin'] = array(
    '#type' => 'textfield',
    '#title' => t('Margin'),
    '#description' => t('Minimum space between viewport and fancyBox.'),
    '#default_value' => $settings['options']['margin'],
  );

  $form['options']['width'] = array(
    '#type' => 'textfield',
    '#title' => t('Width'),
    '#description' => t('Default width for \'iframe\' and \'swf\' content. Also for \'inline\', \'ajax\' and \'html\' if \'autoSize\' is set to \'false\'. Can be numeric or \'auto\'.'),
    '#default_value' => $settings['options']['width'],
  );

  $form['options']['height'] = array(
    '#type' => 'textfield',
    '#title' => t('Height'),
    '#description' => t('Default height for \'iframe\' and \'swf\' content. Also for \'inline\', \'ajax\' and \'html\' if \'autoSize\' is set to \'false\'. Can be numeric or \'auto\'.'),
    '#default_value' => $settings['options']['height'],
  );

  $form['options']['minWidth'] = array(
    '#type' => 'textfield',
    '#title' => t('Minimum Width'),
    '#description' => t('Minimum width fancyBox should be allowed to resize to.'),
    '#default_value' => $settings['options']['minWidth'],
  );

  $form['options']['minHeight'] = array(
    '#type' => 'textfield',
    '#title' => t('Minimum Height'),
    '#description' => t('Minimum height fancyBox should be allowed to resize to.'),
    '#default_value' => $settings['options']['minHeight'],
  );

  $form['options']['maxWidth'] = array(
    '#type' => 'textfield',
    '#title' => t('Maximum Width'),
    '#description' => t('Maximum width fancyBox should be allowed to resize to.'),
    '#default_value' => $settings['options']['maxWidth'],
  );

  $form['options']['maxHeight'] = array(
    '#type' => 'textfield',
    '#title' => t('Maximum Height'),
    '#description' => t('Maximum height fancyBox should be allowed to resize to.'),
    '#default_value' => $settings['options']['maxHeight'],
  );

  $form['options']['advanced'] = array(
    '#type' => 'fieldset',
    '#title' => t('Advanced Options'),
    '#collapsible' => TRUE,
    '#collapsed' => TRUE,
    '#parents' => array('options'),
  );

  $form['options']['advanced']['autoSize'] = array(
    '#type' => 'checkbox',
    '#title' => t('autoSize'),
    '#description' => t('If checked, sets both autoHeight and autoWidth to true.'),
    '#default_value' => $settings['options']['autoSize'],
  );

  $form['options']['advanced']['autoHeight'] = array(
    '#type' => 'checkbox',
    '#title' => t('autoHeight'),
    '#description' => t('If checked, for \'inline\', \'ajax\' and \'html\' type content width is auto determined.'),
    '#default_value' => $settings['options']['autoHeight'],
    '#states' => array(
      'checked' => array(
        ':input[name$="[autoSize]"]' => array('checked' => TRUE),
      ),
      'disabled' => array(
        ':input[name$="[autoSize]"]' => array('checked' => TRUE),
      ),
    ),
  );

  $form['options']['advanced']['autoWidth'] = array(
    '#type' => 'checkbox',
    '#title' => t('autoWidth'),
    '#description' => t('If checked, for \'inline\', \'ajax\' and \'html\' type content height is auto determined.'),
    '#default_value' => $settings['options']['autoWidth'],
    '#states' => array(
      'checked' => array(
        ':input[name$="[autoSize]"]' => array('checked' => TRUE),
      ),
      'disabled' => array(
        ':input[name$="[autoSize]"]' => array('checked' => TRUE),
      ),
    ),
  );

  $form['options']['advanced']['autoResize'] = array(
    '#type' => 'checkbox',
    '#title' => t('autoResize'),
    '#description' => t('If checked, the content will be resized after window resize event.'),
    '#default_value' => $settings['options']['autoResize'],
  );

  $form['options']['advanced']['autoCenter'] = array(
    '#type' => 'checkbox',
    '#title' => t('autoCenter'),
    '#description' => t('If checked, the content will always be centered.'),
    '#default_value' => $settings['options']['autoCenter'],
  );

  $form['options']['advanced']['fitToView'] = array(
    '#type' => 'checkbox',
    '#title' => t('fitToView'),
    '#description' => t('If checked, fancyBox is resized to fit inside viewport before opening.'),
    '#default_value' => $settings['options']['fitToView'],
  );

  $form['options']['advanced']['aspectRatio'] = array(
    '#type' => 'checkbox',
    '#title' => t('aspectRatio'),
    '#description' => t('If checked, resizing is constrained by the original aspect ratio (images always keep ratio).'),
    '#default_value' => $settings['options']['aspectRatio'],
  );

  $form['options']['advanced']['topRatio'] = array(
    '#type' => 'textfield',
    '#title' => t('topRatio'),
    '#description' => t('Top space ratio for vertical centering.<br>If set to 0.5 than vertical and bottom space will be equal.<br>If 0 - fancyBox will be at the viewport top.'),
    '#default_value' => $settings['options']['topRatio'],
  );

  $form['options']['advanced']['leftRatio'] = array(
    '#type' => 'textfield',
    '#title' => t('leftRatio'),
    '#description' => t('Left space ratio for horizontal centering.<br>If set to 0.5 than vertical and bottom space will be equal.<br>If 0 - fancyBox will be at the viewport left.'),
    '#default_value' => $settings['options']['leftRatio'],
  );

  $form['options']['advanced']['scrolling'] = array(
    '#type' => 'select',
    '#title' => t('scrolling'),
    '#description' => t('Set the overflow CSS property to create or hide scrollbars.'),
    '#options' => array(
      'auto' => t('auto'),
      'yes' => t('yes'),
      'no' => t('no'),
      'visible' => t('visible'),
    ),
    '#default_value' => $settings['options']['scrolling'],
  );

  $form['options']['advanced']['wrapCSS'] = array(
    '#type' => 'textfield',
    '#title' => t('wrapCSS'),
    '#description' => t('Customizable CSS class for wrapping element (useful for custom styling).'),
    '#default_value' => $settings['options']['wrapCSS'],
  );

  $form['options']['advanced']['arrows'] = array(
    '#type' => 'checkbox',
    '#title' => t('arrows'),
    '#description' => t('If checked, navigation arrows will be displayed.'),
    '#default_value' => $settings['options']['arrows'],
  );

  $form['options']['advanced']['closeBtn'] = array(
    '#type' => 'checkbox',
    '#title' => t('closeBtn'),
    '#description' => t('If checked, close button will be displayed.'),
    '#default_value' => $settings['options']['closeBtn'],
  );

  $form['options']['advanced']['closeClick'] = array(
    '#type' => 'checkbox',
    '#title' => t('closeClick'),
    '#description' => t('If checked, fancyBox will be closed when user clicks the content.'),
    '#default_value' => $settings['options']['closeClick'],
  );

  $form['options']['advanced']['nextClick'] = array(
    '#type' => 'checkbox',
    '#title' => t('nextClick'),
    '#description' => t('If checked, will navigate to next gallery item when user clicks the content.'),
    '#default_value' => $settings['options']['nextClick'],
  );

  $form['options']['advanced']['mouseWheel'] = array(
    '#type' => 'checkbox',
    '#title' => t('mouseWheel'),
    '#description' => t('If checked, you will be able to navigate gallery using the mouse wheel.'),
    '#default_value' => $settings['options']['mouseWheel'],
  );

  $form['options']['advanced']['autoPlay'] = array(
    '#type' => 'checkbox',
    '#title' => t('autoPlay'),
    '#description' => t('If checked, slideshow will start after opening the first gallery item.'),
    '#default_value' => $settings['options']['autoPlay'],
  );

  $form['options']['advanced']['playSpeed'] = array(
    '#type' => 'textfield',
    '#title' => t('playSpeed'),
    '#description' => t('Slideshow speed in milliseconds.'),
    '#default_value' => $settings['options']['playSpeed'],
  );

  $form['options']['advanced']['preload'] = array(
    '#type' => 'textfield',
    '#title' => t('preload'),
    '#description' => t('Number of gallery images to preload.'),
    '#default_value' => $settings['options']['preload'],
  );

  $form['options']['advanced']['modal'] = array(
    '#type' => 'checkbox',
    '#title' => t('modal'),
    '#description' => t('If checked, will disable navigation and closing.'),
    '#default_value' => $settings['options']['modal'],
  );

  $form['options']['advanced']['loop'] = array(
    '#type' => 'checkbox',
    '#title' => t('loop'),
    '#description' => t('If checked, enables cyclic navigation. This means, if you click "next" after you reach the last element, first element will be displayed (and vice versa).'),
    '#default_value' => $settings['options']['loop'],
  );

  $form['options']['advanced']['effects'] = array(
    '#type' => 'fieldset',
    '#title' => t('Effects'),
    '#description' => t('Animation effect (\'elastic\', \'fade\' or \'none\') for each transition type.'),
    '#collapsible' => TRUE,
    '#collapsed' => TRUE,
    '#parents' => array('options'),
  );

  $form['options']['advanced']['effects']['openEffect'] = array(
    '#type' => 'select',
    '#title' => t('openEffect'),
    '#options' => array(
      'elastic' => t('elastic'),
      'fade' => t('fade'),
      'none' => t('none'),
    ),
    '#default_value' => $settings['options']['openEffect'],
  );

  $form['options']['advanced']['effects']['closeEffect'] = array(
    '#type' => 'select',
    '#title' => t('closeEffect'),
    '#options' => array(
      'elastic' => t('elastic'),
      'fade' => t('fade'),
      'none' => t('none'),
    ),
    '#default_value' => $settings['options']['closeEffect'],
  );

  $form['options']['advanced']['effects']['nextEffect'] = array(
    '#type' => 'select',
    '#title' => t('nextEffect'),
    '#options' => array(
      'elastic' => t('elastic'),
      'fade' => t('fade'),
      'none' => t('none'),
    ),
    '#default_value' => $settings['options']['nextEffect'],
  );

  $form['options']['advanced']['effects']['prevEffect'] = array(
    '#type' => 'select',
    '#title' => t('prevEffect'),
    '#options' => array(
      'elastic' => t('elastic'),
      'fade' => t('fade'),
      'none' => t('none'),
    ),
    '#default_value' => $settings['options']['prevEffect'],
  );

  $form['options']['advanced']['speed'] = array(
    '#type' => 'fieldset',
    '#title' => t('Speed'),
    '#description' => t('The time it takes (in ms, or \'slow\', \'normal\', \'fast\') to complete transition.'),
    '#collapsible' => TRUE,
    '#collapsed' => TRUE,
    '#parents' => array('options'),
  );

  $form['options']['advanced']['speed']['openSpeed'] = array(
    '#type' => 'textfield',
    '#title' => t('openSpeed'),
    '#default_value' => $settings['options']['openSpeed'],
  );

  $form['options']['advanced']['speed']['closeSpeed'] = array(
    '#type' => 'textfield',
    '#title' => t('closeSpeed'),
    '#default_value' => $settings['options']['closeSpeed'],
  );

  $form['options']['advanced']['speed']['nextSpeed'] = array(
    '#type' => 'textfield',
    '#title' => t('nextSpeed'),
    '#default_value' => $settings['options']['nextSpeed'],
  );

  $form['options']['advanced']['speed']['prevSpeed'] = array(
    '#type' => 'textfield',
    '#title' => t('prevSpeed'),
    '#default_value' => $settings['options']['prevSpeed'],
  );

  $form['options']['advanced']['easing'] = array(
    '#type' => 'fieldset',
    '#title' => t('Easing'),
    '#description' => t('Easing method for each transition type.'),
    '#collapsible' => TRUE,
    '#collapsed' => TRUE,
    '#parents' => array('options'),
  );

  $form['options']['advanced']['easing']['openEasing'] = array(
    '#type' => 'textfield',
    '#title' => t('openEasing'),
    '#default_value' => $settings['options']['openEasing'],
  );

  $form['options']['advanced']['easing']['closeEasing'] = array(
    '#type' => 'textfield',
    '#title' => t('closeEasing'),
    '#default_value' => $settings['options']['closeEasing'],
  );

  $form['options']['advanced']['easing']['nextEasing'] = array(
    '#type' => 'textfield',
    '#title' => t('nextEasing'),
    '#default_value' => $settings['options']['nextEasing'],
  );

  $form['options']['advanced']['easing']['prevEasing'] = array(
    '#type' => 'textfield',
    '#title' => t('prevEasing'),
    '#default_value' => $settings['options']['prevEasing'],
  );

  $form['options']['advanced']['opacity'] = array(
    '#type' => 'fieldset',
    '#title' => t('Opacity'),
    '#description' => t('If checked, transparency is changed for elastic transitions.'),
    '#collapsible' => TRUE,
    '#collapsed' => TRUE,
    '#parents' => array('options'),
  );

  $form['options']['advanced']['opacity']['openOpacity'] = array(
    '#type' => 'checkbox',
    '#title' => t('openOpacity'),
    '#default_value' => $settings['options']['openOpacity'],
  );

  $form['options']['advanced']['opacity']['closeOpacity'] = array(
    '#type' => 'checkbox',
    '#title' => t('closeOpacity'),
    '#default_value' => $settings['options']['closeOpacity'],
  );

  $form['options']['advanced']['method'] = array(
    '#type' => 'fieldset',
    '#title' => t('Method'),
    '#description' => t('Method from $.fancybox.transitions() that handles transition (you can add custom effects there).'),
    '#collapsible' => TRUE,
    '#collapsed' => TRUE,
    '#parents' => array('options'),
  );

  $form['options']['advanced']['method']['openMethod'] = array(
    '#type' => 'textfield',
    '#title' => t('openMethod'),
    '#default_value' => $settings['options']['openMethod'],
  );

  $form['options']['advanced']['method']['closeMethod'] = array(
    '#type' => 'textfield',
    '#title' => t('closeMethod'),
    '#default_value' => $settings['options']['closeMethod'],
  );

  $form['options']['advanced']['method']['nextMethod'] = array(
    '#type' => 'textfield',
    '#title' => t('nextMethod'),
    '#default_value' => $settings['options']['nextMethod'],
  );

  $form['options']['advanced']['method']['prevMethod'] = array(
    '#type' => 'textfield',
    '#title' => t('prevMethod'),
    '#default_value' => $settings['options']['prevMethod'],
  );

  $form['helpers'] = array(
    '#type' => 'fieldset',
    '#title' => t('Helpers'),
    '#description' => t('Helpers provide a simple mechanism to extend the capabilities of fancyBox. You can enable the following included helpers if you wish.'),
    '#collapsible' => TRUE,
    '#collapsed' => FALSE,
    '#tree' => TRUE,
  );

  $form['helpers']['title_enabled'] = array(
    '#type' => 'checkbox',
    '#title' => t('Enable the <strong>title helper</strong>'),
    '#default_value' => $settings['helpers']['title_enabled'],
  );

  $form['helpers']['title'] = array(
    '#type' => 'fieldset',
    '#title' => t('Title helper settings'),
    '#collapsible' => FALSE,
    '#collapsed' => FALSE,
    '#tree' => TRUE,
    '#states' => array(
      'visible' => array(
        ':input[name$="[title_enabled]"]' => array('checked' => TRUE),
      ),
    ),
  );

  $form['helpers']['title']['type'] = array(
    '#type' => 'select',
    '#title' => t('type'),
    '#options' => array(
      'float' => t('float'),
      'inside' => t('inside'),
      'outside' => t('outside'),
      'over' => t('over'),
    ),
    '#default_value' => $settings['helpers']['title']['type'],
  );

  $form['helpers']['title']['position'] = array(
    '#type' => 'select',
    '#title' => t('position'),
    '#options' => array(
      'top' => t('top'),
      'bottom' => t('bottom'),
    ),
    '#default_value' => $settings['helpers']['title']['position'],
  );

  $form['helpers']['overlay_enabled'] = array(
    '#type' => 'checkbox',
    '#title' => t('Enable the <strong>overlay helper</strong>'),
    '#default_value' => $settings['helpers']['overlay_enabled'],
  );

  $form['helpers']['overlay'] = array(
    '#type' => 'fieldset',
    '#title' => t('Overlay helper settings'),
    '#collapsible' => FALSE,
    '#collapsed' => FALSE,
    '#tree' => TRUE,
    '#states' => array(
      'visible' => array(
        ':input[name$="[overlay_enabled]"]' => array('checked' => TRUE),
      ),
    ),
  );

  $form['helpers']['overlay']['closeClick'] = array(
    '#type' => 'checkbox',
    '#title' => t('closeClick'),
    '#description' => t('If checked, fancyBox will be closed when user clicks on the overlay.'),
    '#default_value' => $settings['helpers']['overlay']['closeClick'],
  );

  $form['helpers']['overlay']['speedOut'] = array(
    '#type' => 'textfield',
    '#title' => t('speedOut'),
    '#description' => t('Duration of fadeOut animation in milliseconds.'),
    '#default_value' => $settings['helpers']['overlay']['speedOut'],
  );

  $form['helpers']['overlay']['showEarly'] = array(
    '#type' => 'checkbox',
    '#title' => t('showEarly'),
    '#description' => t('If checked, the overlay will be opened immediately. If not, the overlay will wait until the content is ready to open.'),
    '#default_value' => $settings['helpers']['overlay']['showEarly'],
  );

  $form['helpers']['overlay']['locked'] = array(
    '#type' => 'checkbox',
    '#title' => t('locked'),
    '#description' => t('If checked, the content will be locked into the overlay.'),
    '#default_value' => $settings['helpers']['overlay']['locked'],
  );

  $form['helpers']['overlay']['fixed'] = array(
    '#type' => 'checkbox',
    '#title' => t('fixed'),
    '#description' => t('If checked, the overlay CSS position will be "fixed".'),
    '#default_value' => $settings['helpers']['overlay']['fixed'],
  );

  $form['helpers']['thumbs_enabled'] = array(
    '#type' => 'checkbox',
    '#title' => t('Enable the <strong>thumbnail helper</strong>'),
    '#default_value' => $settings['helpers']['thumbs_enabled'],
  );

  $form['helpers']['thumbs'] = array(
    '#type' => 'fieldset',
    '#title' => t('Thumbnail helper settings'),
    '#collapsible' => FALSE,
    '#collapsed' => FALSE,
    '#tree' => TRUE,
    '#states' => array(
      'visible' => array(
        ':input[name$="[thumbs_enabled]"]' => array('checked' => TRUE),
      ),
    ),
  );

  $form['helpers']['thumbs']['width'] = array(
    '#type' => 'textfield',
    '#title' => t('Thumbnail width'),
    '#default_value' => $settings['helpers']['thumbs']['width'],
  );

  $form['helpers']['thumbs']['height'] = array(
    '#type' => 'textfield',
    '#title' => t('Thumbnail height'),
    '#default_value' => $settings['helpers']['thumbs']['height'],
  );

  $form['helpers']['thumbs']['position'] = array(
    '#type' => 'select',
    '#title' => t('Position'),
    '#options' => array(
      'top' => t('top'),
      'bottom' => t('bottom'),
    ),
    '#default_value' => $settings['helpers']['thumbs']['position'],
  );

  $form['helpers']['media_enabled'] = array(
    '#type' => 'checkbox',
    '#title' => t('Enable the <strong>media helper</strong>'),
    '#default_value' => $settings['helpers']['media_enabled'],
  );

  $form['helpers']['buttons_enabled'] = array(
    '#type' => 'checkbox',
    '#title' => t('Enable the <strong>buttons helper</strong>'),
    '#default_value' => $settings['helpers']['buttons_enabled'],
  );

  $form['helpers']['buttons'] = array(
    '#type' => 'fieldset',
    '#title' => t('Buttons helper settings'),
    '#collapsible' => FALSE,
    '#collapsed' => FALSE,
    '#tree' => TRUE,
    '#states' => array(
      'visible' => array(
        ':input[name$="[buttons_enabled]"]' => array('checked' => TRUE),
      ),
    ),
  );

  $form['helpers']['buttons']['position'] = array(
    '#type' => 'select',
    '#title' => t('Position'),
    '#options' => array(
      'top' => t('top'),
      'bottom' => t('bottom'),
    ),
    '#default_value' => $settings['helpers']['buttons']['position'],
  );

  $form['callbacks'] = array(
    '#type' => 'fieldset',
    '#title' => t('Callbacks'),
    '#description' => t('Enter the javascript function name to add a callback function to these events. Callback functions must be defined in the global scope. fancyBox will pass the fancyBox object into your callback as <em>this</em>.'),
    '#collapsible' => TRUE,
    '#collapsed' => TRUE,
    '#tree' => TRUE,
  );

  $form['callbacks']['onCancel'] = array(
    '#type' => 'textfield',
    '#title' => t('onCancel'),
    '#description' => t('Called after user triggers canceling.<br><strong>Note</strong>: If false is returned by the callback, the canceling will be halted.'),
    '#default_value' => $settings['callbacks']['onCancel'],
  );

  $form['callbacks']['beforeLoad'] = array(
    '#type' => 'textfield',
    '#title' => t('beforeLoad'),
    '#description' => t('Called before starting to load content.<br><strong>Note</strong>: If false is returned by the callback, the loading will be halted.'),
    '#default_value' => $settings['callbacks']['beforeLoad'],
  );

  $form['callbacks']['afterLoad'] = array(
    '#type' => 'textfield',
    '#title' => t('afterLoad'),
    '#description' => t('Called after content is loaded.<br><strong>Note</strong>: If false is returned by the callback, the content will not be shown.'),
    '#default_value' => $settings['callbacks']['afterLoad'],
  );

  $form['callbacks']['beforeShow'] = array(
    '#type' => 'textfield',
    '#title' => t('beforeShow'),
    '#description' => t('Called right before open animations has started.'),
    '#default_value' => $settings['callbacks']['beforeShow'],
  );

  $form['callbacks']['afterShow'] = array(
    '#type' => 'textfield',
    '#title' => t('afterShow'),
    '#description' => t('Called after open animations has ended.'),
    '#default_value' => $settings['callbacks']['afterShow'],
  );

  $form['callbacks']['beforeClose'] = array(
    '#type' => 'textfield',
    '#title' => t('beforeClose'),
    '#description' => t('Called right after closing has been triggered but not yet started.<br><strong>Note</strong>: If false is returned by the callback, the closing will be halted.'),
    '#default_value' => $settings['callbacks']['beforeClose'],
  );

  $form['callbacks']['afterClose'] = array(
    '#type' => 'textfield',
    '#title' => t('afterClose'),
    '#description' => t('Called after closing animation has ended.'),
    '#default_value' => $settings['callbacks']['afterClose'],
  );

  $form['callbacks']['onUpdate'] = array(
    '#type' => 'textfield',
    '#title' => t('onUpdate'),
    '#description' => t('Called after window resize, scroll or orientation change events are triggered.'),
    '#default_value' => $settings['callbacks']['onUpdate'],
  );

  $form['callbacks']['onPlayStart'] = array(
    '#type' => 'textfield',
    '#title' => t('onPlayStart'),
    '#description' => t('Called after slideshow has started.'),
    '#default_value' => $settings['callbacks']['onPlayStart'],
  );

  $form['callbacks']['onPlayEnd'] = array(
    '#type' => 'textfield',
    '#title' => t('onPlayEnd'),
    '#description' => t('Called after slideshow has stopped.'),
    '#default_value' => $settings['callbacks']['onPlayEnd'],
  );

  $form['submit'] = array(
    '#type' => 'submit',
    '#value' => t('Save configuration'),
  );

  return $form;
}

/**
 * Submit handler for the fancyBox Admin Settings Form.
 *
 * @see fancybox_admin_settings_form().
 */
function fancybox_admin_settings_form_submit(&$form, &$form_state) {
  $settings = array();

  foreach ($form_state['values'] as $key => &$value) {
    if (!in_array($key, array('submit', 'form_build_id', 'form_token', 'form_id', 'op'))) {
      $settings[$key] = $value;
    }
  }

  array_walk_recursive($settings, '_fancybox_array_walk_convert_string');

  if (!$settings['options']['autoCenter']) {
    $settings['helpers']['overlay']['fixed'] = $settings['options']['autoCenter'];
  }

  if ($settings['settings']['selectors']) {
    $selectors = explode("\r\n", trim($settings['settings']['selectors']));

    foreach ($selectors as &$selector) {
      $selector = trim($selector, ',');
    }

    $settings['settings']['selectors'] = implode("\r\n", $selectors);
  }

  drupal_set_message(t('The configuration options have been saved.'));
  variable_set('fancybox_settings', $settings);
}
