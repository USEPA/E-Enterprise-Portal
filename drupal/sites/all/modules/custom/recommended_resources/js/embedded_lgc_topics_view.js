/**
 * Created by bmatkin on 4/18/2016.
 */


// Save orig height as global
var orig_height, auto_height;

/**
 * Dynamically adjust size of wrapper based content
 * Hides drop down trigger if small enough to show all content
 * @param $wrapper
 */
function updateDropdown($wrapper) {
  orig_height = $wrapper.height();
  $wrapper.css({height: 'auto'});
  auto_height = $wrapper.height();

  // If auto height is shorter, set orig to auto
  if (auto_height <= orig_height) {
    orig_height = auto_height;
    $wrapper.find('.drop-down-arrow.hidden').hide();
  }
  $wrapper.css({height: orig_height});
}


(function ($) {


  $('#user-lgc-topics-small-view').ready(function () {


    $('body').on('click', '#user-lgc-topics-small-view .drop-down-arrow.hidden', function () {

      $(this)
        .removeClass('hidden')
        .addClass('revealed');
      $('#user-lgc-topics-small-view').animate({height: auto_height}, 200);
    });

    $('body').on('click', '#user-lgc-topics-small-view .drop-down-arrow.revealed', function () {
      $(this)
        .removeClass('revealed')
        .addClass('hidden');
      $('#user-lgc-topics-small-view').animate({height: orig_height}, 200);
    });

    $('body').on('click', '.unfollow-lgc-topic', function () {
      var tid_array = $(this).attr('id').split('-');
      var tid = tid_array[tid_array.length - 1];
      // In manage_my_topics_compent.js
      removeTopic(tid, true);
    });

  });


})(jQuery);