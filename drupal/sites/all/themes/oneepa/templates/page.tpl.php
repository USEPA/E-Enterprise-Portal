<?php
/**
 * @file
 * page.tpl.php - Returns the HTML for a single Drupal page.
 */
?>
<?php if ($main_menu): ?>
<div id="mobile-nav" class="mobile-nav">
<div class="mobile-bar clearfix"><a class="mobile-home" href="http://www2.epa.gov" rel="home"><span class="mobile-home-icon">Home</span></a> <a class="menu-button" href="#mobile-links">Menu</a></div><div id="mobile-links" class="mobile-links element-hidden" style="height: 1552px;">
	<?php print theme('links__system_main_menu', array(
	  'links' => $main_menu,
	  'attributes' => array(
		'class' => array('menu', 'main-menu'),
		'id' => array('main-menu'),
	  ),
	  'heading' => array(
		'text' => t('Main menu'),
		'level' => 'h2',
		'class' => array('element-invisible'),
	  ),
	)); ?>	
</div></div>
<?php endif; ?>
<?php print render($page['alert']); ?>
<nav class="nav secondary-nav" role="navigation">
    <h2 class="element-invisible">Secondary menu</h2><ul class="menu secondary-menu pipeline"><li class="menu-1569 menu-item"><a href="http://www.epa.gov/espanol/" title="Spanish" class="menu-link">Español</a></li>
<li class="menu-item"><a href="http://www2.epa.gov/languages/traditional-chinese" title="Traditional Chinese" class="menu-link">中文: 繁體版</a></li>
<li class="menu-item"><a href="http://www2.epa.gov/languages/simplified-chinese" title="Simplified Chinese" class="menu-link">中文: 简体版</a></li>
<li class="menu-item"><a href="http://www2.epa.gov/languages/vietnamese" title="Vietnamese" class="menu-link">Tiếng Việt</a></li>
<li class="menu-item"><a href="http://www2.epa.gov/languages/korean" title="Korean" class="menu-link">한국어</a></li>
</ul>  </nav>
<header class="masthead clearfix" role="banner">
  <?php if ($logo): ?>
    <a href="http://www2.epa.gov" title="<?php print t('EPA Home Page'); ?>" rel="home" class="header__logo" id="logo"><img class="site-logo" src="<?php print $logo; ?>" alt="EPA" /></a>
  <?php endif; ?>
  <?php 
  	$hgroup_open = '';
    $hgroup_close = '';

  	if ($site_name || $site_slogan) {
      $hgroup_open = '<hgroup class="site-name-and-slogan">';
      $hgroup_close = '</hgroup>';
    }  
  ?>
  
  <?php print $hgroup_open; ?>
  <?php if ($site_name): ?>
    <h1 class="site-name">

      <?php
        $link_open = '';
        $link_close = '';

        // if (!$is_front) {
//           $link_open = '<a href="' . $front_page . '" title="' . t('Go to the home page') . '" rel="home">';
//           $link_close = '</a>';
//         }
		$link_open = '<a href="http://www2.epa.gov" title="Go to the home page" rel="home">';
		$link_close = '</a>';
      ?>

      <?php print $link_open; ?>
      <span><?php print $site_name; ?></span>
      <?php print $link_close; ?>

    </h1>
  <?php endif; ?>

  <?php if ($site_slogan): ?>
    <div class="site-slogan"><?php print $site_slogan; ?></div>
  <?php endif; ?>

  <?php print $hgroup_close; ?>
  <?php // INCLUDE UPPER RIGHT MENU HERE? ?>
  <?php print render($page['header']); ?>
</header>
<?php if ($main_menu): ?>
	<nav class="nav simple-nav simple-main-nav" role="navigation">
	<?php print theme('links__system_main_menu', array(
	  'links' => $main_menu,
	  'attributes' => array(
		'class' => array('menu', 'main-menu'),
		'id' => array('main-menu'),
	  ),
	  'heading' => array(
		'text' => t('Main menu'),
		'level' => 'h2',
		'class' => array('element-invisible'),
	  ),
	)); ?>
	</nav>
	  <?php if ($secondary_menu): ?>
      <nav class="header__secondary-menu" id="secondary-menu" role="navigation">
        <?php print theme('links__system_secondary_menu', array(
          'links' => $secondary_menu,
          'attributes' => array(
            'class' => array('links', 'inline', 'clearfix'),
          ),
          'heading' => array(
            'text' => $secondary_menu_heading,
            'level' => 'h2',
            'class' => array('element-invisible'),
          ),
        )); ?>
      </nav>
    <?php endif; ?>
<?php endif; ?>
<!-- @todo - Add content_language back in next line - section -->
<section id="main-content" class="main-content clearfix" role="main" lang="<?php //print $content_language ?>">
  <h2 class="microsite-name">e-Enterprise</h2>
  <?php print render($page['preface']); ?>
  <?php print render($page['highlighted']); ?>

  <div id="content" class="main-column column clearfix" role="main">
  	<?php if($page['navigation']): ?>
		<div id="navigation">
	      <?php print render($page['navigation']); ?>
	    </div><!-- end div:navigation -->
	<?php endif; ?>
	<?php print $breadcrumb; ?>	
	<a id="main-content"></a>
	<?php print render($page['help']); ?>
    <?php print render($title_prefix); ?>
    <?php if ($title): ?>
      <!--googleon: all-->
      <h1 <?php print $title_attributes; ?>><?php print $title; ?></h1>
      <!--googleoff: all-->
    <?php endif; ?>
	<?php print render($title_suffix); ?>
	<?php print render($tabs); ?>
	<?php print $messages; ?>
	<?php if ($action_links = render($action_links)): ?>
		<ul class="action-links"><?php print render($action_links); ?></ul>
	<?php endif; ?>
	
    <!--googleon: all-->
    <?php print render($page['content']); ?>
    <!--googleoff: all-->
    <?php print $feed_icons; ?>

	</div>
    
    <?php
      // Render the sidebars to see if there's anything in them.
      $sidebar_first  = render($page['sidebar_first']);
      $sidebar_second = render($page['sidebar_second']);
    ?>

    <?php if ($sidebar_first || $sidebar_second): ?>
      <aside class="sidebars">
        <?php print $sidebar_first; ?>
        <?php print $sidebar_second; ?>
      </aside>
    <?php endif; ?>

  </div>
</section>
<footer class="main-footer clearfix" role="contentinfo">
  <?php print render($page['footer']); ?>
</footer>
<?php print render($page['bottom']); ?>
