(function($, window) {
  var intervals = {};
  var removeListener = function(selector) {
    if (intervals[selector]) {
      window.clearInterval(intervals[selector]);
      intervals[selector] = null
    }
  };
  var found = "waitUntilExists.found";
  $.fn.waitUntilExists = function(handler, shouldRunHandlerOnce, isChild) {
    var selector = this.selector;
    var $this = $(selector);
    var $elements = $this.not(function() {
      return $(this).data(found)
    });
    if (handler === "remove") {
      removeListener(selector)
    } else {
      $elements.each(handler).data(found, true);
      if (shouldRunHandlerOnce && $this.length) {
        removeListener(selector)
      } else if (!isChild) {
        intervals[selector] = window.setInterval(function() {
          $this.waitUntilExists(handler, shouldRunHandlerOnce, true)
        }, 500)
      }
    }
    return $this
  }
})(jQuery, window);
//# sourceMappingURL=src/waitUntilExists.js.map