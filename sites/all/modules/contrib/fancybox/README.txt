CONTENTS OF THIS FILE
=====================

 * Introduction
 * Information
 * Dependencies
 * Installation
 * Configuration
    - Image module
    - Insert module
    - Views integration
 * Support

INTRODUCTION
============

Current Maintainer for 7.x-2.x: Daniel Imhoff <dwieeb@gmail.com>

The fancyBox module is the best way to incorporate the fancyBox jQuery plugin
into Drupal. Display images, HTML, YouTube videos, Google maps in an elegant
and aesthetic lightbox alternative.

INFORMATION
===========

This module only supports fancyBox version 2.1.0 and higher. As version 2 of the
plugin requires jQuery 1.7+, the jQuery Update module is also required. You may
need to download an unstable version of this module to take advantage of newer
versions of jQuery.

DEPENDENCIES
============

- Image (in core)
- Libraries API 7.x-2.0 or higher (http://drupal.org/project/libraries)
- jQuery Update 7.x-2.3 (http://drupal.org/project/jquery_update)
  with jQuery 1.7 or higher.
- fancyBox jQuery Plugin 2.1.0+ (http://fancyapps.com/fancybox/#license)

INSTALLATION
============

1. Install and enable the Libraries API and the jQuery Update module. 

2. Make sure to update your jQuery to version 1.7 or above. You may do this by
   going to admin/config/development/jquery_update and selecting the jQuery
   version.

3. Download the fancyBox plugin and extract the entire directory into
   sites/all/libraries. (You may need to create this directory). The path to
   fancyBox should be sites/all/libraries/fancybox/source/jquery.fancybox.js.
   (the module uses the minified version, so actually jquery.fancybox.pack.js).

4. Copy the entire fancyBox module's directory into sites/all/modules.

5. Login as an administrator. Enable the module in admin/modules.

CONFIGURATION
=============

This module allows you to specify selectors to apply fancyBox to automatically,
but it also integrates with several modules to make it even easier.

Image module
------------

fancyBox can be applied to image fields. To configure your image fields to use
fancyBox, go to admin/structure/types and click "manage display" next to the
content type of your choice. Under the "format" column, select "fancyBox" next
to the image field(s). You may also configure the options for this field.

Insert module
-------------

This module has support for Insert (http://drupal.org/project/insert), which is
a utility for inserting images into WYSIWYG editors. To configure Insert module
with fancyBox, go to admin/structure/types and click "manage fields" next to the
content type of your choice. Edit the image field of your choice and expand the
Insert fieldset. Enable the insert button and select the image styles that you
wish to be enabled. The image styles with fancyBox functionality are suffixed
with "(fancyBox)".

Views integration
-----------------

This module has support for Views. You can create a gallery as you would
normally, and then use the "fancyBox" formatter instead of the "image"
formatter. When the fancyBox formatter is selected, the formatter settings will
become available to you just as if you were managing the display of an image
field.

Plugin configuration
--------------------

Nearly every option listed in the fancyBox documentation (which can be found
here: http://fancyapps.com/fancybox/#docs) is changeable through this module's
configuration page. Navigate to admin/config/user-interface/fancybox and open
the "Plugin Options" fieldset to configure to your needs.

SUPPORT
=======

Please use the issue queue for filing bugs with this module at
http://drupal.org/project/issues/fancybox
