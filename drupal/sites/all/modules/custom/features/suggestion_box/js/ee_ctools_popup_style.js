Drupal.theme.prototype.ee_ctools_popup_theme = function () {
  var html = ''
  html += '  <div id="ctools-modal">'
  html += '    <div class="ctools-modal-content">' // panels-modal-content
  html += '      <div class="modal-header">';
  html += '        <a class="close" href="#">';
  html +=            Drupal.CTools.Modal.currentSettings.closeText + Drupal.CTools.Modal.currentSettings.closeImage;
  html += '        </a>';
  html += '        <span id="modal-title" class="modal-title"> </span>';
  html += '      </div>';
  html += '      <div id="modal-content" class="modal-content">';
  html += '      </div>';
  html += '    </div>';
  html += '  </div>';

  console.log('ctools',Drupal.CTools.Modal.currentSettings.closeImage);

  // html += '<div class="ui-dialog ui-widget ui-widget-content ui-corner-all ui-front ui-draggable" tabindex="-1" role="dialog">';
  // html += '  <div class="ui-dialog-titlebar ui-widget-header ui-corner-all ui-helper-clearfix">';
  // html += '    <span id="ui-id-4" class="ui-dialog-title">Nevada State Events Web Map</span>';
  // html += '    <button class="ui-dialog-titlebar-close"></button></div><div id="mapiFrame" class="mapiFrame ui-dialog-content ui-widget-content" style="width: auto; min-height: 0px; max-height: none; height: 55px;">';
  // html += '  </div>';
  // html += '</div>';

  return html;
}