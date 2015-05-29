<?php
/**
 * @file
 * page.tpl.php - Returns the HTML for a single Drupal page.
 */
?>
<?php
if(drupal_is_front_page()) {
    global $user;
    if($user->uid == 0)
        drupal_goto("/eenterprise-for-environment");
    else
        drupal_goto("/workbench");
    exit;
}
?>
<?php print render($page['alert']); ?>
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
		$link_open = '<a href="http://www2.epa.gov" title="EPA home page" rel="home">';
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
<?php if ($secondary_menu): ?>
  <nav class="nav secondary-nav" id="secondary-nav" role="navigation">
    <?php print theme('links__system_secondary_menu', array(
      'links' => $secondary_menu,
      'attributes' => array(
        'class' => array('secondary-menu', 'menu', 'pipeline'),
      ),
      'heading' => array(
        'text' => $secondary_menu_heading,
        'level' => 'h2',
        'class' => array('element-invisible'),
      ),
    )); ?>
  </nav> 
<?php endif; ?>
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
	<?php 
	$block = module_invoke('search', 'block_view', 'search');
	print render($block); 
 ?>
	</nav>
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
  <div class="region-footer">  <div id="block-pane-epa-global-footer" class="block block-pane">
    <div class="row cols-2">
  <div class="col size-2of5">
    <ul class="pipeline">
      <li><a href="/">EPA Home</a></li>
      <li><a href="/home/privacy-and-security-notice">Privacy and Security Notice</a></li>
      <li><a href="/accessibility">Accessibility</a></li>
    </ul>
    <p class="last-updated">Last updated on April 20, 2015</p>
  </div>
  <div class="col size-3of5">
    <ul class="menu epa-menu">
      <li class="menu-item"><a class="menu-link epa-hotline" href="/home/epa-hotlines">Hotline</a></li>
      <li class="menu-item"><a class="menu-link epa-news" href="/newsroom">News</a></li>
      <li class="menu-item"><a class="menu-link epa-blog" href="https://blog.epa.gov/blog/">Blog</a></li>
      <li class="menu-item"><a class="menu-link epa-apps" href="http://developer.epa.gov/category/apps/">Apps</a></li>
      <li class="menu-item"><a class="menu-link epa-widgets" href="http://developer.epa.gov/category/widgets/">Widgets</a></li>
    </ul>
    <div class="social-menu-wrapper">
      <div class="social-menu-title">Social sites:</div>
      <ul class="menu social-menu">
        <li class="menu-item"><a class="menu-link social-twitter" href="https://twitter.com/epa">Twitter</a></li>
        <li class="menu-item"><a class="menu-link social-facebook" href="https://www.facebook.com/EPA">Facebook</a></li>
        <li class="menu-item"><a class="menu-link social-youtube" href="https://www.youtube.com/user/USEPAgov">YouTube</a></li>
        <li class="menu-item"><a class="menu-link social-flickr" href="http://www.flickr.com/photos/usepagov">Flickr</a></li>
        <li class="menu-item"><a class="menu-link social-instagram" href="http://instagram.com/epagov">Instagram</a></li>
      </ul>
      <p class="social-menu-more"><a href="/home/social-media">More social media at&nbsp;EPA&nbsp;�</a></p>
    </div>
  </div>
</div>  
</div>
  </div>
</footer>
<?php print render($page['bottom']); ?>
