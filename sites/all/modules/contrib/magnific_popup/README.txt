CONTENTS OF THIS FILE
---------------------

  * Introduction
  * Integration with Other Modules
  * Installation
  * Maintainers


INTRODUCTION
------------
Integrate Dmitry Semenov's Magnific Popup (http://dimsemenov.com/plugins/magnific-popup/)
jQuery lightbox plugin with Drupal as a field formatter.

This module provides a "Magnific Popup" field formatter for File Entity and
Image fields. Fields with multiple items (cardinality > 1) can be grouped into a
Magnific Popup gallery, or shown individually as a stand-alone popup (no
"previous"/"next" navigation options). 

From the author of the jQuery plugin:
  Magnific Popup is a responsive jQuery lightbox plugin that is focused on
  performance and providing best experience for user with any device (Zepto.js
  compatible).


The jQuery plugin supports:
 - Single-image lightbox
 - Zoom-gallery
 - Lightbox gallery
 - Popup with video or map
 - Popup with form
 - Modal popups
 - Ajax popups
 - CSS animations


INTEGRATION WITH OTHER MODULES
------------------------------
Combining the optional sub-module Magnific Popup YouTube with the Media: YouTube
module (http://drupal.org/project/media_youtube) allows easy embedding of
YouTube pop-ups.


INSTALLATION
------------
This module requires Libraries and jQuery Update (jQuery 1.7.2 or above is
required).

Install the third-party Magnific Popup library from https://github.com/dimsemenov/Magnific-Popup
under sites/SITE/libraries (where SITE is "all," "default," etc.)  To be
correctly detected and used, the JS and CSS must be located at these paths:
 - libraries/magnific-popup/dist/jquery.magnific-popup.js
 - libraries/magnific-popup/dist/magnific-popup.css

Activate the Magnific Popup module, then manage the display of any File or Image
fields, for example under admin/structure/types/manage/TYPE/display.  Choose
"Magnific Popup" as the formatter.

By default, item thumbnails will use the "magnific_popup_thumbnail" Image Style.
You can configure this image style under Image Styles at
admin/config/media/image-styles/edit/magnific_popup_thumbnail.


MAINTAINERS
-----------
- jay.dansand (Jay Dansand)
