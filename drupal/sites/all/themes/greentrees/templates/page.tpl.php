<?php
/**
 * @file
 * page.tpl.php - Returns the HTML for a single Drupal page.
 */
?>
<?php
if(drupal_is_front_page()) {
<<<<<<< HEAD
  global $user;
  if($user->uid == 0)
    //drupal_goto("/eenterprise-for-environment");
    drupal_goto("/ee-welcome");
  else
    drupal_goto("/workbench");
  exit;
}
?>
<?php print render($page['alert']); ?>
<header class="masthead clearfix" role="banner">
  <?php
  $hgroup_open = '';
  $hgroup_close = '';
  if ($site_name || $site_slogan) {
    $hgroup_open = '<hgroup class="site-name-and-slogan">';
    $hgroup_close = '';
  }
  ?>
  <?php print $hgroup_open; ?>
  <?php if ($site_name): ?>
    <h1 class="site-name" id="site-name">
      <a href="<?php print $front_page; ?>" title="<?php print t('Home - '.$site_name); ?>" rel="home">
        <?php if ($logo): ?>
          <img src="<?php print $logo; ?>" alt="<?php print t('Home - '.$site_name); ?>" class="site-logo" />
        <?php else: ?>
          <img src="./sites/all/themes/oneepa/images/placeholder-logo.png" alt="<?php print t('Home - '.$site_name); ?>" class="site-logo" />
        <?php endif; ?>
      </a>
    </h1>
  <?php endif; ?>
  <?php if ($site_slogan): ?>
    <div class="site-slogan" id="site-slogan"><?php print $site_slogan; ?></div>
  <?php endif; ?>
  <?php print $hgroup_close; ?>
  <?php print render($page['top_header']); ?>
</header>
=======
    global $user;
    if($user->uid == 0)
        //drupal_goto("/eenterprise-for-environment");
        drupal_goto("/ee-welcome");
    else
        drupal_goto("/workbench");
    exit;
}
?>
<?php print render($page['alert']); ?>
    <header class="masthead clearfix" role="banner">
        <?php
        $hgroup_open = '';
        $hgroup_close = '';
        if ($site_name || $site_slogan) {
            $hgroup_open = '<hgroup class="site-name-and-slogan">';
            $hgroup_close = '';
        }
        ?>
        <?php print $hgroup_open; ?>
        <?php if ($site_name): ?>
            <h1 class="site-name" id="site-name">
                <a href="<?php print $front_page; ?>" title="<?php print t('Home - '.$site_name); ?>" rel="home">
                    <?php if ($logo): ?>
                        <img src="<?php print $logo; ?>" alt="<?php print t('Home - '.$site_name); ?>" class="site-logo" />
                    <?php else: ?>
                        <img src="./sites/all/themes/oneepa/images/placeholder-logo.png" alt="<?php print t('Home - '.$site_name); ?>" class="site-logo" />
                    <?php endif; ?>
                </a>
            </h1>
        <?php endif; ?>
        <?php if ($site_slogan): ?>
            <div class="site-slogan" id="site-slogan"><?php print $site_slogan; ?></div>
        <?php endif; ?>
        <?php print $hgroup_close; ?>
        <?php print render($page['top_header']); ?>
    </header>
>>>>>>> 14b9d3fb726ef903e4eba6048b907692e9999425
<?php print render($page['header']); ?>
<?php print render($page['nav-bar']); ?>
    <!-- @todo - Add content_language back in next line - section -->
    <section id="main-content" class="main-content clearfix" role="main" lang="<?php //print $content_language ?>">
        <h2 class="microsite-name">e-Enterprise</h2>
        <?php print render($page['preface']); ?>
        <?php print render($page['highlighted']); ?>

<<<<<<< HEAD
  <div id="content" class="main-column column clearfix" role="main">
    <?php if($page['navigation']): ?>
      <div id="navigation">
        <?php print render($page['navigation']); ?>
      </div><!-- end div:navigation -->
    <?php endif; ?>
    <?php print $breadcrumb;?>
    <a id="main-content"></a>
    <?php print render($page['help']); ?>
    <?php print render($title_prefix); ?>
    <?php if ($title): ?>
      <?php
      $exploded_path = explode('/', current_path());
      if (count($exploded_path) > 2):
        if ($exploded_path[0] == 'user' && $exploded_path[2] == 'edit'):
          $title = 'Profile';
        endif;
      endif;
      ?>
      <!--googleon: all-->
      <h1 <?php print $title_attributes; ?>><?php print $title;?></h1>
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

    <?php
    // Render the sidebars to see if there's anything in them.
    $sidebar_first  = render($page['sidebar_first']);
    $sidebar_second = render($page['sidebar_second']);
    ?>
=======
        <div id="content" class="main-column column clearfix" role="main">
            <?php if($page['navigation']): ?>
                <div id="navigation">
                    <?php print render($page['navigation']); ?>
                </div><!-- end div:navigation -->
            <?php endif; ?>
            <?php print $breadcrumb;?>
            <a id="main-content"></a>
            <?php print render($page['help']); ?>
            <?php print render($title_prefix); ?>
            <?php if ($title): ?>
                <?php
                $exploded_path = explode('/', current_path());
                if (count($exploded_path) > 2):
                    if ($exploded_path[0] == 'user' && $exploded_path[2] == 'edit'):
                        $title = 'Profile';
                    endif;
                endif;
                ?>
                <!--googleon: all-->
                <h1 <?php print $title_attributes; ?>><?php print $title;?></h1>
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

            <?php
            // Render the sidebars to see if there's anything in them.
            $sidebar_first  = render($page['sidebar_first']);
            $sidebar_second = render($page['sidebar_second']);
            ?>
>>>>>>> 14b9d3fb726ef903e4eba6048b907692e9999425

            <?php if ($sidebar_first || $sidebar_second): ?>
                <aside class="sidebars">
                    <?php print $sidebar_first; ?>
                    <?php print $sidebar_second; ?>
                </aside>
            <?php endif; ?>

        </div>
    </section>
<?php print render($page['footer']); ?>
<?php print render($page['bottom']); ?>