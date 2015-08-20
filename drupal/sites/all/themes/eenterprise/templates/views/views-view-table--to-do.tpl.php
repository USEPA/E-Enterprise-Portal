<?php

/**
 * @file
 * Template to display a view as a table.
 *
 * - $title : The title of this group of rows.  May be empty.
 * - $header: An array of header labels keyed by field id.
 * - $caption: The caption for this table. May be empty.
 * - $header_classes: An array of header classes keyed by field id.
 * - $fields: An array of CSS IDs to use for each field id.
 * - $classes: A class or classes to apply to the table, based on settings.
 * - $row_classes: An array of classes to apply to each row, indexed by row
 *   number. This matches the index in $rows.
 * - $rows: An array of row items. Each row is an array of content.
 *   $rows are keyed by row number, fields within rows are keyed by field ID.
 * - $field_classes: An array of classes to apply to each field, indexed by
 *   field id, then row number. This matches the index in $rows.
 * @ingroup views_templates
 */

$dataTitle = array();
?>
<table <?php if ($classes) { print 'class="'. $classes . ' ' . 'responsive-table" '; } ?><?php print $attributes; ?>>
   <?php if (!empty($title) || !empty($caption)) : ?>
     <caption><?php print $caption . $title; ?></caption>
  <?php endif; ?>
    <div class="todo-filter-by-week">
        <?php
        $this_week = '';
        $beyond_next_week = '';
        if(isset($view->args['week_filter_val'])){
            if(substr($view->args['week_filter_val'], 0,10) == date("Y-m-d")){
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
            <li id="all-time" class="todo_filter_button <?php if(!isset($view->args['week_filter_val']) || (isset($view->args['week_filter_val']) && $view->args['week_filter_val'] == '0000-00-00')) print 'filter-applied';?>">All Items</li>
            <li id="this-week" class="todo_filter_button <?php print $this_week;?>">This Week</li>
            <li id="next-week" class="todo_filter_button <?php print $next_week;?>">Next Week</li>
            <li id="beyond-next-week" class="todo_filter_button <?php print $beyond_next_week;?>">Beyond</li>
        </ul>
    </div>
  <?php if (!empty($header)) : ?>
    <thead>
      <tr>
        <?php foreach ($header as $field => $label): ?>
          <th scope="col" <?php if ($header_classes[$field]) { print 'class="'. $header_classes[$field] . '" '; } ?>>
            <?php print $label; $dataTitle[] = $label; ?>
          </th>
        <?php endforeach; ?>
      </tr>
    </thead>
  <?php endif; ?>
  <tbody>
    <?php foreach ($rows as $row_count => $row): ?>
      <tr <?php if ($row_classes[$row_count]) { print 'class="' . implode(' ', $row_classes[$row_count]) .'"';  } ?>>
          <?php $i=0; ?>
          <?php foreach ($row as $field => $content): ?>
              <?php if ($i !== 1) {?>
              <?php $attribute = strip_tags($dataTitle[$i]); ?>
          <td data-title="<?php print $attribute; ?>" <?php if ($field_classes[$field][$row_count]) { print 'class="'. $field_classes[$field][$row_count] . ' ' . 'responsive-to-do-link" '; } ?><?php print drupal_attributes($field_attributes[$field][$row_count]); ?>>
            <?php print $content; ?>
          </td>
            <?php } else {?>
                  <?php $attribute = strip_tags($dataTitle[$i]); ?>
                  <th scope="row" <?php if ($field_classes[$field][$row_count]) { print 'class="'. $field_classes[$field][$row_count] . ' ' . 'responsive-to-do-link" '; } ?><?php print drupal_attributes($field_attributes[$field][$row_count]); ?>>
                      <?php print $content; ?>
                  </th>
                <?php }?>
              <?php $i++; ?>

        <?php endforeach; ?>
      </tr>

    <?php endforeach; ?>
  </tbody>
</table>
