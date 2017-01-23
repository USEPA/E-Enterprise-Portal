<?php
/**
 * @file
 * page.tpl.php - Returns the HTML for a single Drupal page.
 */
?>
<?php
define("HOME_PAGE","Home");
if(drupal_is_front_page()) {
    global $user;
    if($user->uid == 0) {
        drupal_goto("/eenterprise-new");
    }
    else {
        drupal_goto("/workbench");
    }
    exit;
}
if(arg(0) == 'workbench' && $user->uid == 0){
    drupal_goto("/");
}
/*
elseif (arg(0) == 'workbench' && $user->uid > 0) {
	drupal_add_js(drupal_get_path('theme', 'eenterprise') ."/js/pace.min.js", "file");
}
*/

$user_data = user_load($user->uid);
if ($user->name == 'guest-user') {
    drupal_add_js(array('ee_guest' => true), 'setting'); // Adding check for guest
}
if ($user->uid > 0) {
	drupal_add_js(array('ee_user' => true), 'setting'); // Adding check for guest
}
else {
	drupal_add_js(array('ee_public' => true), 'setting'); // If not guest and not logged in, show public view on Home, FAQs, Release Notes
}

?>
<?php print render($page['alert']); ?>
<?php print render($page['maintenance']); ?>
<?php print render($page['disclaimer']); ?>
<div class="mobile-nav usa-grid">
<a class="usa-button mobile-nav_home" href="<?php print base_path();?>" rel="home"><img src="<?php print base_path() . path_to_theme(); ?>/images/white/home.svg" alt="Home"></a>
<a class="usa-button mobile-nav_toggle" href="#mobile-links">Menu</a>
<div class="mobile-nav_links element-hidden"></div><!-- @end mobile-nav_links -->
</div><!-- @end mobile-nav -->
<?php print render($page['mobile-navigation']); ?>
<header class="masthead usa-grid">
    <?php
        $hgroup_open = '';
        $hgroup_close = '';
        if ($site_name || $site_slogan) {
            $hgroup_open = '<div class="site-name-and-slogan">';
            $hgroup_close = '</div>';
        }
    ?>
    <?php print $hgroup_open; ?>
    <?php if ($site_name): ?>
        <h1 class="site-name" id="site-name">
            <?php $logoless = theme_get_setting('eenterprise_use_logoless');
	            		$path	= drupal_get_path_alias();
	            		if ($path == 'ee_disclaimer' || $path == 'new-users' || $path == 'bridge-landing') {
		            		$logolink = 'eenterprise-new';
	            		}
	            		else {
		            		$logolink = $front_page; 
	            		}
            ?>
            <?php if ($logoless): ?>
                <a class="logoless" href="<?php print $logolink; ?>" title="<?php print t(HOME_PAGE.' - '.$site_name); ?>" rel="home">
                <span class="ee-header-line1">E-Enterprise <span class="logo-sublabel">for the </span></span><span class="ee-header-line2">Environment</span>
            <?php else:
	            	global $base_url;            
          			$logo_path = theme_get_setting('logo_path');
          			$use_default = theme_get_setting('default_logo');
          			//Use SVG version of logo when available and indicated in Appearance > Settings > Themename
          			$use_svg = theme_get_setting('eenterprise_use_svg');					

                if ($use_default) {
		            		$logo = $base_url.'/sites/all/themes/eenterprise/logo.png';
								}
	            	else {
		            	$logo = $base_url.'/'.$logo_path;
	            	}
								if ($use_svg){
            			$logo = str_replace(".png", ".svg", $logo);
								}
            ?>
            <a href="<?php print $logolink; ?>" title="<?php print t(HOME_PAGE.' - '.$site_name); ?>" rel="home">
            <img src="<?php print $logo; ?>" alt="<?php print t(HOME_PAGE.' - '.$site_name); ?>" class="site-logo" />
            <?php endif; ?>
            </a>
        </h1>
    <?php endif; ?>
    <?php if ($site_slogan && $path != 'eenterprise-new' && $path != 'eenterprise-alternate'): ?>
        <div class="site-slogan" id="site-slogan"><?php print $site_slogan; ?></div><!-- @end site-slogan -->
    <?php endif; ?>
    <?php print $hgroup_close; ?>
    <?php print render($page['header']); ?>
</header>
<?php print render($page['navigation']); ?>
<section class="main-content usa-grid" role="main">
  <?php print render($page['preface']); ?>
  <?php print render($page['highlighted']); ?>
  <div id="content" class="usa-width-one-whole">
    <a id="main-content"></a>
    <?php print render($page['help']); ?>
    <?php print render($title_prefix); ?>
    <?php if ($title): ?>
    <?php
        $exploded_path = explode('/', current_path());
        if (count($exploded_path) > 2 && $exploded_path[0] == 'user' && $exploded_path[2] == 'edit') {
          $title = 'Profile';
        }
      ?>
      <!--googleon: all-->
      <?php if (($exploded_path[0] == 'eenterprise-new') || ($exploded_path[0] == 'eenterprise-alternate')) : ?>
	    	<h1 class="element-invisible" <?php print $title_attributes; ?>><?php print $title;?></h1>
			<?php else: ?>
				<h1 <?php print $title_attributes; ?>><?php print $title;?></h1>
				<?php print render($title_suffix); ?>
		    <?php print render($tabs); ?>
		    <?php print $messages; ?>
		    <?php if ($action_links = render($action_links)): ?>
		        <ul class="action-links"><?php print render($action_links); ?></ul>
		    <?php endif; ?>

			<?php endif; ?>
      <!--googleoff: all-->
    <?php endif; ?>
    <!--googleon: all-->
    <?php print render($page['content']); ?>
    <!--googleoff: all-->
    <?php print $feed_icons; ?>
    
    <?php
      //Render the sidebars to see if there's anything in them.
      $sidebar_first  = render($page['sidebar_first']);
      $sidebar_second = render($page['sidebar_second']);
    ?>

    <?php if ($sidebar_first || $sidebar_second): ?>
      <aside class="sidebars">
        <?php print $sidebar_first; ?>
        <?php print $sidebar_second; ?>
      </aside>
    <?php endif; ?>

  </div><!-- @end #content -->
</section>
<?php print render($page['footer']);?> 
<?php print render($page['bottom']); ?>
