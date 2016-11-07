<span id="refresh-to-do" class="refresh"><span class="sr-only">Refresh To Do list</span><i
    class="fa fa-refresh favorites-ignore" aria-hidden="true" title="Refresh To Do List"></i></span>

<div class="todo-filter-by-week ui-tabs">
  <ul role="tablist" class="ui-tabs-nav">
    <li id="all-time" role="tab" data-search="" class="todo_filter_button filter-applied">
      <a href="javascript:void(0)" class="favorites-ignore block-display" tabindex="0">
        All Items
      </a>
    </li>
    <li id="this-week" role="tab" class="todo_filter_button" data-search="this_week">
      <a href="javascript:void(0)" class="favorites-ignore block-display" tabindex="-1">This Week</a>
    </li>
    <li id="next-week" role="tab" class="todo_filter_button" data-search="next_week">
      <a href="javascript:void(0)" class="favorites-ignore block-display" tabindex="-1">Next Week</a>
    </li>
    <li id="beyond-next-week" role="tab" class="todo_filter_button" data-search="beyond">
      <a href="javascript:void(0)" class="favorites-ignore block-display" tabindex="-1">Beyond</a>
    </li>
  </ul>
</div>

<div class="filter-select" id="to-do-yadcf-filter-domain">
  <label for="to-do-edit-field-domain-value">
    Domain
  </label>
  <select required="required" id="to-doedit-field-domain-value" name="field_todo_lst_domain_value"
          disabled="disabled" aria-required="true">
    <option value="CEDRI" selected="selected" title="CEDRI">CEDRI</option>
  </select>
</div>
<div class="filter-select" id="to-do-yadcf-filter-part-code">
  <label for="to-do-edit-field-domain-value">
    Part Code
  </label>

</div>
<div id="to-do-modal-content"></div>
<div id="to-do" class="eportal-datatable-wrapper">
  <table class="usa-table-borderless">
    <thead>
    <tr>
      <th class="no-sort skinny-col">#</th>
      <th><span>Item</span></th>
      <th><span>Domain</span></th>
      <th><span>Due</span></th>
      <th><span>Part Code</span></th>
      <th><span>Timeframe</span></th>
    </tr>
    </thead>
    <tbody>

    </tbody>
  </table>
</div>
