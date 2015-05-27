<?php
/**
 * @file
 * Returns the HTML for the basic html structure of a single Drupal page.
 *
 * Complete documentation for this file is available online.
 * @see https://drupal.org/node/1728208
 */
?><!DOCTYPE html>
<!--[if IEMobile 7]><html class="iem7" <?php print $html_attributes; ?>><![endif]-->
<!--[if lte IE 6]><html class="lt-ie9 lt-ie8 lt-ie7" <?php print $html_attributes; ?>><![endif]-->
<!--[if (IE 7)&(!IEMobile)]><html class="lt-ie9 lt-ie8" <?php print $html_attributes; ?>><![endif]-->
<!--[if IE 8]><html class="lt-ie9" <?php print $html_attributes; ?>><![endif]-->
<!--[if (gte IE 9)|(gt IEMobile 7)]><!--><html <?php print $html_attributes . $rdf_namespaces; ?>><!--<![endif]-->

<head>
  <?php print $head; ?>
  <!--googleoff: all-->
  <?php print $styles; ?>
  <link type="text/css" rel="stylesheet" href="http://www2.epa.gov/sites/all/libraries/template/s.css" media="all" />
<link rel="alternate" type="application/atom+xml" title="EPA.gov News" href="http://yosemite.epa.gov/opa/admpress.nsf/RSSRecentNews" />
  <link rel="alternate" type="application/atom+xml" title="EPA.gov Headquarters Press Releases" href="http://yosemite.epa.gov/opa/admpress.nsf/RSSByLocation?open&location=Headquarters" />
  <link rel="alternate" type="application/atom+xml" title="Greenversations, EPA's Blog" href="http://blog.epa.gov/blog/feed/" />
  <?php //print $web_area_feed; ?>
  <?php if ($add_html5_shim and !$add_respond_js): ?>
    <!--[if lt IE 9]>
    <script src="<?php print $base_path . $path_to_zen; ?>/js/html5.js"></script>
    <![endif]-->
  <?php elseif ($add_html5_shim and $add_respond_js): ?>
    <!--[if lt IE 9]>
    <script src="<?php print $base_path . $path_to_zen; ?>/js/html5-respond.js"></script>
    <![endif]-->
  <?php elseif ($add_respond_js): ?>
    <!--[if lt IE 9]>
    <script src="<?php print $base_path . $path_to_zen; ?>/js/respond.js"></script>
    <![endif]-->
  <?php endif; ?>
  <?php print $scripts; ?>
</head>
<body class="<?php print $classes; ?> <?php
if(!drupal_is_front_page()) {
    print "wide-template";
}
?>" <?php print $attributes;?>>
  <div class="skip-links"><a href="#main-content" class="skip-link element-invisible element-focusable"><?php print t('Jump to main content'); ?></a></div>
  <?php print $page_top; ?>
  <?php print $page; ?>
  <?php print $page_bottom; ?>
  <?php //print $selectivizr; ?>
  <?php //print $ie_scripts; ?>
</body>
</html>
