/**
 * Stalls function until ID is scrolled into view. Globally
 * accessbile.
 * Currently used by:
 *  LGC, My Interactive Maps
 * @param string id
 * @param Function func
 */
function createWayPoint(id, func) {
  var $ = jQuery;
  var $obj = $('#' + id);
  // Only initialize Waypoint for item when grid
  $('body').on('grid_stack_initialized', function () {
    // If object is initially visible, simply call the function (uses jquery-visible library
    if ($obj.visible(true)) {
      console.log(id + ' was visible');
      func();
    } else {
      var cachedHtml = $obj.html();
      $obj.html('<div class="text-align-center"><i class="fa fa-spinner font-5-rem" aria-hidden="true"></i></div>');
      // Otherwise, create a new Waypoint
      var waypoint = new Waypoint({
        element: document.getElementById(id),
        // Set threshold for top of object
        offset: 'bottom-in-view',
        handler: function (direction) {
          console.log('Waypoint for ' + id + ' was called');
          // Reset parent div with cached HTML now we are ready to view
          $obj.html(cachedHtml);
          // Call widget's passed in function to handle content
          func();
          // Only load the item once when triggered by the waypoint
          this.destroy();
        }
      });
    }
  });
}
