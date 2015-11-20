Drupal.theme.prototype.ee_ctools_popup_theme = function () {
  var html = '';
  html += '  <div id="ctools-modal ui-dialog">'
  html += '    <div class="ctools-modal-content" role="dialog">' // panels-modal-content
  html += '      <div class="modal-header ui-dialog-titlebar ui-widget-header ui-corner-all ui-helper-clearfix">';
  html += '        <span id="modal-title" class="modal-title ui-dialog-title"> </span>';
  html += '          <button type="button" class="ui-button ui-widget ui-state-default ui-corner-all ui-button-icon-only ui-dialog-titlebar-close ctools-close-modal" role="button" aria-disabled="false" title="close">';
  html += '            <span class="ui-button-icon-primary ui-icon ui-icon-closethick"></span>';
  html += '            <span class="ui-button-text">close</span>';
  html += '      </div>';
  html += '      <div id="modal-content" class="modal-content">';
  html += '      </div>';
    html +=   '<span id="modal-release-number" style="float:right; padding:5px;font-size:.75em;">' + Drupal.settings.release_number + '</span>';
    html += '<div style="clear: both;"></div>';

    html += '    </div>  ';
  html += '  </div>';

  return html;
}
