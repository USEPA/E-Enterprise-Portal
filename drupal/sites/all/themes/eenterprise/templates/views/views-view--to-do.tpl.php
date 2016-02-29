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
    <a href="todo/refresh" class="refresh"><span class="sr-only">Refresh To Do list</span><i class="fa fa-refresh favorites-ignore" aria-hidden="true" title="Refresh To Do List"></i></a>
    <div class="todo-filter-by-week">

        <?php
        $this_week = '';
        $beyond_next_week = '';
        if(isset($view->args['week_filter_val'])){
            if(substr($view->args['week_filter_val'], 0,10) == date('Y-m-d',strtotime('last sunday'))){
                $this_week = 'filter-applied';
            }
            else if((strtotime($view->exposed_raw_input['field_todo_lst_due_value']) - time()) > (7 * 24 * 60 * 60)){
                $beyond_next_week = 'filter-applied';
            }
            else if(date('D', strtotime($view->args['week_filter_val'])) == 'Sun'){
                $next_week = 'filter-applied';
            }
        }
        ?>
        <ul>
            <li id="all-time" tabindex="0" class="todo_filter_button <?php if(!isset($view->args['week_filter_val']) || (isset($view->args['week_filter_val']) && $view->args['week_filter_val'] == '0000-00-00')) { print 'filter-applied'; }?>"><a href="javascript:void(0)" class="favorites-ignore" tabindex="-1">All Items</a></li>
            <li id="this-week" tabindex="-1" class="todo_filter_button <?php print $this_week;?>"><a href="javascript:void(0)" class="favorites-ignore" tabindex="-1">This Week</a></li>
            <li id="next-week" tabindex="-1" class="todo_filter_button <?php print $next_week;?>"><a href="javascript:void(0)" class="favorites-ignore" tabindex="-1">Next Week</a></li>
            <li id="beyond-next-week" tabindex="-1" class="todo_filter_button <?php print $beyond_next_week;?>"><a href="javascript:void(0)" class="favorites-ignore" tabindex="-1">Beyond</a></li>
        </ul>
    </div>
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
      <?php print $rows; ?>
    </div>
  <?php elseif ($empty): ?>
    <div class="view-empty">
      <?php
        if(isset($_GET['field_todo_lst_due_value'])) {
            print "You have no tasks matching the selected criteria.";
        }
        else {
            print $empty;
        }
      ?>
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
