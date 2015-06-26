/**
 * @file
 * 
 * Provides an alternate autocomplete mechanism for term reference fields.  Managed by term_ref_autocomplete.module.
 * Borrows _heavily_ from core misc/autocomplete.js, overriding only those methods specific to our presentation.
 * 
 * HTRAC == Hierarchical Term Reference Autocomplete
 */
(function ($) {
  
Drupal.behaviors.jsHTRAC = {
  attach: function (context, settings) {
    var acdb = [];
    $('input.htrac-autocomplete', context).once('htrac-autocomplete', function () {
      var uri = this.value;
      if (!acdb[uri]) {
        acdb[uri] = new Drupal.ACDB(uri);
      }
      var $input = $('#' + this.id.substr(0, this.id.length - 13))
        .attr('autocomplete', 'OFF')
        .attr('aria-autocomplete', 'list');
      $($input[0].form).submit(Drupal.autocompleteSubmit);
      $input.parent()
        .attr('role', 'application')
        .append($('<span class="element-invisible" aria-live="assertive"></span>')
          .attr('id', $input.attr('id') + '-autocomplete-aria-live')
        );
      new Drupal.jsHTRAC($input, acdb[uri]);
    });
  }
  
  // We don't need a detach method as the field's select callback keeps the input value updated at all times
}

/**
 * Custom autoComplete object.
 */
Drupal.jsHTRAC = function ($input, db) {
  var ac = this;
  this.input = $input[0];
  this.ariaLive = $('#' + this.input.id + '-autocomplete-aria-live');
  this.db = db;
  
  // Stock event handlers from autocomplete.js
  $input
    .keydown(function (event) { return ac.onkeydown(this, event); })
    .keyup(function (event) { ac.onkeyup(this, event); })
    .blur(function () { ac.hidePopup(); ac.db.cancel(); });

};

/**
 * Handlers we're going to inherit from D7 core autocomplete.js
 */
Drupal.jsHTRAC.prototype.onkeydown = Drupal.jsAC.prototype.onkeydown;
Drupal.jsHTRAC.prototype.onkeyup = Drupal.jsAC.prototype.onkeyup;
Drupal.jsHTRAC.prototype.highlight = Drupal.jsAC.prototype.highlight;
Drupal.jsHTRAC.prototype.unhighlight = Drupal.jsAC.prototype.unhighlight;
Drupal.jsHTRAC.prototype.setStatus = Drupal.jsAC.prototype.setStatus;
Drupal.jsHTRAC.prototype.populatePopup = Drupal.jsAC.prototype.populatePopup;
Drupal.jsHTRAC.prototype.selectDown = Drupal.jsAC.prototype.selectDown;
Drupal.jsHTRAC.prototype.selectUp = Drupal.jsAC.prototype.selectUp;

/**
 * Puts the currently highlighted suggestion into the autocomplete field.
 * Override of the core autocomplete.js function
 */
Drupal.jsHTRAC.prototype.select = function (node) {
  // Update display in textfield
  this.input.value = $(node).data('autocompleteDisplay');
};

/**
 * Fills the suggestion popup with any matches received.
 * Override of the core autocomplete.js function
 */
Drupal.jsHTRAC.prototype.found = function (matches) {
  // If no value in the textfield, do not show the popup.
  if (!this.input.value.length) {
    return false;
  }

  // Prepare matches building our hierachical display
  var ul = $('<ul></ul>');
  this.buildPopupList(ul, matches, 0);

  // Show popup with matches, if any.
  if (this.popup) {
    if (ul.children().size()) {
      $(this.popup).empty().append(ul).show();
      $(this.ariaLive).html(Drupal.t('Autocomplete popup'));
    }
    else {
      $(this.popup).css({ visibility: 'hidden' });
      this.hidePopup();
    }
  }
};

/** 
 * Recursive method to handle building the nested hierarchy
 */
Drupal.jsHTRAC.prototype.buildPopupList = function (ul, matches, depth) {
  // Prepare matches.
  var ac = this;
  for (key in matches) {
    // Clean up name and wrap problem values in quotes
    var name = matches[key]['name'];
    if (name.indexOf(',') >= 0) {
      name = '"' + name + '"';
    }
    $('<li></li>')
      .css('padding-left', depth + 'em')  // slight cheat; we're using left padding calculated from EMs to indicate nesting
      .html($('<div></div>').html(name))
      .mousedown(function () { ac.select(this); })
      .mouseover(function () { ac.highlight(this); })
      .mouseout(function () { ac.unhighlight(this); })
      .data('autocompleteTid', key) // TID from the AJAX call
      .data('autocompletePosition', matches[key]['position']) // position in the tag list (first tag, second, etc) as calculated by the AJAX callback
      .data('autocompleteDisplay', matches[key]['display']) // Display value fod the input field; includes all previous terms + this one
      .appendTo(ul);
      
    // Recurse on any child elements
    this.buildPopupList(ul, matches[key]['children'], depth + 1);
  }
}

/**
 * Hides the autocomplete suggestions.
 * Override of the core autocomplete.js function
 */
Drupal.jsHTRAC.prototype.hidePopup = function (keycode) {
  // Select item if the right key or mousebutton was pressed.
  if (this.selected && ((keycode && keycode != 46 && keycode != 8 && keycode != 27) || !keycode)) {
    this.select($(this.selected));
  }
  // Hide popup.
  var popup = this.popup;
  if (popup) {
    this.popup = null;
    $(popup).fadeOut('fast', function () { $(popup).remove(); });
  }
  this.selected = false;
  $(this.ariaLive).empty();
};

})(jQuery);

