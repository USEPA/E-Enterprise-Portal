<?php

/**
 * @file
 * Main view template.
 *
 * Variables available:
 * - $classes_array: An array of classes determined in
 *   template_preprocess_views_view(). Default classes are:
 *     .view
 *     .view-[css_name]
 *     .view-id-[view_name]
 *     .view-display-id-[display_name]
 *     .view-dom-id-[dom_id]
 * - $classes: A string version of $classes_array for use in the class attribute
 * - $css_name: A css-safe version of the view name.
 * - $css_class: The user-specified classes names, if any
 * - $header: The view header
 * - $footer: The view footer
 * - $rows: The results of the view query, if any
 * - $empty: The empty text to display if the view is empty
 * - $pager: The pager next/prev links to display, if any
 * - $exposed: Exposed widget form/info to display
 * - $feed_icon: Feed icon to display, if any
 * - $more: A link to view more, if any
 *
 * @ingroup views_templates
 */

?>

<p>The following resources are recommended for town, city, and county
  governments based on your chosen topics.</p>

<!--- List of user topics--->
<div id="user-lgc-topics-small-view" class="topics-collapsed">
  <div id="high-level-interests">
    <div class="usa-grid">
      <div class="usa-width-one-half">
        <span class="drop-down-arrow hidden" title="Show more topics"></span>
      </div>
      <div class="usa-width-one-half">
        <i class="grid-selector fa fa-th" aria-hidden="true" title="Manage my topics"></i>
      </div>
    </div>
    <?php if (isset($_SESSION['user_lgc_topics'])): ?>
      <?php foreach ($_SESSION['user_lgc_topics'] as $tid => $topic): ?>
        <div class="embedded-lgc-topic-elem">
          <label class="ck-button lgc-topics-of-interest"
                 id="embed-manage-lgc-<?php print $tid ?>">
            <?php print $topic ?>
          </label>
        </div>
      <?php endforeach; ?>

    <?php else: ?>
      <p> No session set</p>
    <?php endif; ?>
  </div>
</div>
<!--- End list of user topics ---!>

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
            <div class='usa-grid-full'>
            <?php print $rows; ?>
            </div>
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
