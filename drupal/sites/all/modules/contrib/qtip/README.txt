-- REQUIREMENTS --
* Version 2 of the qTip jQuery plugin, which is available via jsDelivr or CDNJS CDNs or via a custom build.

-- INSTALLATION --
* Install as usual, see http://drupal.org/documentation/install/modules-themes/modules-7 for further information.

-- CONFIGURATION --
* Once installed, go to admin/config/user-interface/qtip
    * Select the settings that would you like to use for the qTip library. Save.
* If you want to use simple tooltips via a text filter:
    * Install qTip: Filter module (submodule of qTip)
    * Go to admin/config/content/formats
        * Click 'configure' on the input filter that you would like to add qTip to
          NOTE: For input filters that have 'HTML filter' enabled (like Filtered HTML), qTip MUST come AFTER HTML filter
            This should be default, but it would be a good idea to check.
    * Save and repeat for as many input filters as you would like.
    * On a node page enter the filter with the following format:
      [qtip: Text to display on page|Text to appear in tooltip]
        The filter MUST start with '[qtip:' (no quotes)
        The visible text that will always show on the node page and will be used as a link to
        the tooltip comes next, followed by | (pipe)
        Finally, the text you would like to appear in the tooltip is last, followed by ']' (no quotes)


-- MAINTAINERS --
Current maintainers:
* bocaj - http://drupal.org/user/582042


-- SPECIAL THANKS --
To Craig Thompson, creator of the qTip jQuery plugin!
http://craigsworks.com
