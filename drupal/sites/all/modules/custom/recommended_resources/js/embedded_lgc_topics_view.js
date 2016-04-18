/**
 * Created by bmatkin on 4/18/2016.
 */
(function ($) {


  $('#user-lgc-topics-small-view').ready(function () {
    var orig_height;
    var $embedded_topics;

    $('body').on('click', '#user-lgc-topics-small-view .drop-down-arrow.hidden', function () {
      $embedded_topics = $('#user-lgc-topics-small-view');
      orig_height = $embedded_topics.height();
      $embedded_topics.css({height: 'auto'});
      var auto_height = $embedded_topics.height();
      $embedded_topics.css({height: orig_height});

      $(this)
        .removeClass('hidden')
        .addClass('revealed');
      $embedded_topics.animate({height: auto_height}, 200);
    });

    $('body').on('click', '#user-lgc-topics-small-view .drop-down-arrow.revealed', function () {
      $(this)
        .removeClass('revealed')
        .addClass('hidden');
      $embedded_topics.animate({height: orig_height}, 200);
    });



  });

})(jQuery);