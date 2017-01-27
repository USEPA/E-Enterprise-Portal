  <span id="refresh-to-do" class="refresh ga-tracking" data-ga-event-label="to do refresh">
  <div class="update"><span class="label">Last Updated:</span> <span class="last-updated"></span></div>
  <span class="sr-only">Refresh To Do list</span><i
      class="fa fa-refresh favorites-ignore" aria-hidden="true" title="Refresh To Do List"></i></span>

<div class="todo-filter-by-week ui-tabs">
  <ul role="tablist" class="ui-tabs-nav">
    <li id="all-time" role="tab" class="todo_filter_button filter-applied" data-search="">
      <a href="javascript:void(0)" class="favorites-ignore block-display" tabindex="0"> All Items </a>
    </li>
    <li id="this-week" role="tab" class="todo_filter_button" data-search="this_week" >
      <a href="javascript:void(0)" class="favorites-ignore block-display" tabindex="-1">This Week</a>
    </li>
    <li id="next-week" role="tab" class="todo_filter_button" data-search="next_week" >
      <a href="javascript:void(0)" class="favorites-ignore block-display" tabindex="-1">Next Week</a>
    </li>
    <li id="beyond-next-week" role="tab" class="todo_filter_button" data-search="beyond" >
      <a href="javascript:void(0)" class="favorites-ignore block-display" tabindex="-1">Beyond</a>
    </li>
  </ul>
</div>

<div class="filter-select" id="to-do-yadcf-filter-domain">
  <label for="to-do-edit-field-domain-value">
    Domain
  </label>
  <select required="required" id="to-do-edit-field-domain-value" name="to-do-edit-field-domain-value"
          disabled="disabled" aria-required="true">
    <option value="CEDRI" selected="selected" title="CEDRI">CEDRI</option>
  </select>
</div>
<div class="filter-select" id="to-do-yadcf-filter-part-code">
  <label for="edit-field-to-do-part-code-value">
    Part Code
  </label>
</div>
<div class="filter-select" id="to-do-yadcf-filter-subpart-code">
  <label for="edit-field-to-do-sub-part-code-value">
    Sub Part Code
  </label>
</div>
<div class="filter-select" id="to-do-yadcf-filter-report-type">
  <label for="edit-field-to-do-report-type-value">
    Report Type
  </label>
</div>
<div id="to-do-modal-content"></div>
<div id="to-do" class="eportal-datatable-wrapper view-content">
  <table class="usa-table-borderless">
    <thead>
    <tr>
      <th class="no-sort skinny-col">#</th>
      <th><span>Item</span></th>
      <th><span>Domain</span></th>
      <th><span>Due</span></th>
      <th><span>Part Code</span></th>
      <th><span>Sub Part Code</span></th>
      <th><span>Report Type</span></th>
      <th><span>Timeframe</span></th>
    </tr>
    </thead>
    <tbody>

    </tbody>
  </table>
</div>
