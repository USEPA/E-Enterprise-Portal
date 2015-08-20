<?php

/**
 * @file
 * Main view template.
 *
 * @ingroup views_templates
 */
?>
<div class="<?php print $classes; ?>">
  <?php print render($title_prefix); ?>
  <?php if ($title): ?>
    <?php print $title; ?>
  <?php endif; ?>
  <?php print render($title_suffix); ?>
  <?php if ($header): ?>
    <div class="view-header">
      <?php print $header; ?>
    </div>
  <?php endif; ?>

  <?php if ($exposed): ?>
    <div class="view-filters">
      <?php print $exposed; ?>
    </div>
  <?php endif; ?>

  <?php if ($attachment_before): ?>
    <div class="attachment attachment-before">
      <?php print $attachment_before; ?>
    </div>
  <?php endif; ?>
  <?php if ($rows): ?>
    <div class="view-content">
			<?php
                global $user;
                if($user->uid == 0):               		
					$block = module_invoke('eenterprise_bridge_auth', 'block_view', 'eenterprise_bridge_auth');
					$loginmsg = "<div id=\"login-group\" class=\"container\">";
					$loginform = str_replace("E-Enterprise Bridge", "Log in now", render($block['content']));
					$loginmsg .= $loginform;
					$loginmsg .= "<div class='guest-login'><a href='/guest_login'>Browse As Guest</a></div></div>";
                else:
                   	$loginmsg = "<div class=\"well well-narrow\">Welcome, <strong>".$user->name."!</strong><br><a href=\"workbench\">View workbench</a></div>";
                endif;
                
                $rows = str_replace("Log in now", $loginmsg, $rows);
                print $rows;
                ?>
    </div>
  <?php elseif ($empty): ?>
    <div class="view-empty">
      <?php print $empty; ?>
    </div>
  <?php endif; ?>

  <?php if ($pager): ?>
    <?php print $pager; ?>
  <?php endif; ?>

  <?php if ($attachment_after): ?>
    <div class="attachment attachment-after">
      <?php print $attachment_after; ?>
    </div>
  <?php endif; ?>

  <?php if ($more): ?>
    <?php print $more; ?>
  <?php endif; ?>

  <?php if ($footer): ?>
    <div class="view-footer">
      <?php print $footer; ?>
    </div>
  <?php endif; ?>

  <?php if ($feed_icon): ?>
    <div class="feed-icon">
      <?php print $feed_icon; ?>
    </div>
  <?php endif; ?>

</div><?php /* class view */ ?>