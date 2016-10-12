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
        var $sessionTimeoutModal = $('<div id="session-timeout-modal"></div>');

        $('body').append($sessionTimeoutModal);
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
                isLoggedOut = true;
              } else if (!isPrompted && now > promptAt) {
                $sessionTimeoutModal
                  .html('<div>Due to inactivity, your session will expire in <span class="min-remaining">5 minutes</span>. Please click Continue Session to continue.</div><div class="actions"><button class="logout button">Logout</button><button class="renew button">Continue Session</button></div>')
                  .dialog({
                    dialogClass: 'session-timeout-modal-content',
                    title: 'Session Timeout Warning',
                    resizable: false,
                    closeText: "Close",
                    modal: true
                  });
                isPrompted = true;
              } else if (isPrompted) {
                // update how many minutes remaining
                var minutesRemaining = Math.ceil((logoutAt - now) / 60) + ' minute';
                if (minutesRemaining != '1 minute') {
                  minutesRemaining += 's'; // 'minute' or 'minutes'
                }
                $sessionTimeoutModal.find('span.min-remaining').html(minutesRemaining);
              }
            }
          },
          2000
        );

        // logout occurs because the user clicked on 'logout' or they simply waited too long without renewing the session
        var instantLogout = function() {
          $sessionTimeoutModal.find('.actions').html('Logging Out...');
          window.location.href = Drupal.settings.basePath + 'instant-logout';
        };

        // click handlers for logging out and renewing the session
        $sessionTimeoutModal.on('click', '.logout', instantLogout);
        $sessionTimeoutModal.on('click', '.renew', function() {
          // reset the clock
          var now = Math.floor(Date.now() / 1000);
          promptAt = now + (60 * 15);
          logoutAt = now + (60 * 20);
          isPrompted = false;

          // renew the token and close the modal
          $.get(Drupal.settings.basePath + 'renew-session');
          $sessionTimeoutModal.dialog('close');

          // ignore the default click action
          return false;
        });
      });
    }
  };
})(jQuery);
