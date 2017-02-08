/**
 * Google analytics tracking snippet from EPA
 */
(function(w, d, s, l, i) {
  w[l] = w[l] || [];
  w[l].push({
    "gtm.start": new Date().getTime(), event: "gtm.js"
  });
  var f = d.getElementsByTagName(s)[0],
    j = d.createElement(s), dl = l != "dataLayer" ? "&l=" + l : "";
  j.async = true;
  j.src =
    "//www.googletagmanager.com/gtm.js?id=" + i + dl;
  f.parentNode.insertBefore(j, f);
})(window, document, "script", "dataLayer", "GTM-L8ZB");



    (function($) {
      // Track DOM elements having class .ga-tracking
        var eventData, eventLabel, fieldObject;
          $(document).on('click', '.ga-tracking', function() {
            eventData = $(this).data();
            eventLabel = $(this).data('gaEventLabel');
            fieldObject = {
              hitType: 'event',
              eventCategory: 'eportal',
              eventAction: 'click',
              eventLabel: eventLabel
            };
            ga("EPA.send", fieldObject);
            ga("GSA.send", fieldObject);
          });
    }(jQuery));
