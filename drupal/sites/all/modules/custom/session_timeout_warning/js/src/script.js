/**
 * @file
 * A JavaScript file for the theme.
 *
 * In order for this JavaScript to be loaded on pages, see the instructions in
 * the README.txt next to this file.
 */
var promptAt;
var logoutAt;
var isPrompted = false;
var isLoggedOut = false;

(function($) {
// Prompt to keep session alive?
  Drupal.behaviors.sessionTimeoutPrompt = {
    attach: function (context) {
      //@see https://www.lullabot.com/articles/understanding-javascript-behaviors-in-drupal (Using jQuery Once)
      $('body').once('session-timeout-prompt', function () {
        $('body').append('<div id="session-timeout-modal"></div>');
        promptAt = Drupal.settings.promptAt;
        logoutAt = Drupal.settings.logoutAt;

        // periodically check whether to popup modal
        setInterval(
          function() {
            var now = Math.floor(Date.now() / 1000);
            // @see http://stackoverflow.com/questions/7540397/convert-nan-to-0-in-javascript
            var userId = Drupal.settings.currentUser || 0;
            if (!isLoggedOut && userId != 0) { // only applies to logged-in users
              if (now > logoutAt) {
                instantLogout();
              } else if (!isPrompted && now > promptAt) {
                $('#session-timeout-modal')
                  .html('<div>Due to inactivity, your session will expire in 5 minutes. Please click Continue Session to continue.</div><div><button class="logout button">Logout</button><button class="renew button">Continue Session</button></div>')
                  .dialog({
                    dialogClass: 'session-timeout-modal-content',
                    title: 'Session Timeout Warning',
                    resizable: false,
                    closeText: "Close",
                    modal: true
                  });
                isPrompted = true;
              }
            }
          },
          2000
        );

        // logout occurs because the user clicked on 'logout' or they simply waited too long without renewing the session
        var instantLogout = function() {
          $.get(Drupal.settings.basePath + 'instant-logout');
          $('#session-timeout-modal')
            .html('<div>You have been timed out.</div><div><a href="' + Drupal.settings.basePath + 'bridge-landing">Login</a></div>')
            .dialog({
              dialogClass: 'session-timeout-modal-content',
              title: 'Session Timeout',
              resizable: false,
              closeText: "Close",
              modal: true
            });
          isLoggedOut = true;

          return false;
        };

        // click handlers for logging out and renewing the session
        $('#session-timeout-modal').on('click', '.logout', instantLogout);
        $('#session-timeout-modal').on('click', '.renew', function() {
          // reset the clock
          var now = Math.floor(Date.now() / 1000);
          promptAt = now + (60 * 15);
          logoutAt = now + (60 * 20);
          isPrompted = false;

          // renew the token
          $.get(Drupal.settings.basePath + 'renew-session');

          // inform the user
          $('#session-timeout-modal')
            .html('<div>Your session has been renewed.</div>')
            .dialog({
              dialogClass: 'session-timeout-modal-content',
              title: 'Session Renewed',
              resizable: false,
              closeText: "Close",
              modal: true
            });

          // ignore the default click action
          return false;
        });
      });
    }
  };
})(jQuery);
