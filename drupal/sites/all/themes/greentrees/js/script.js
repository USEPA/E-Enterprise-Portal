/**
 * @file
 * A JavaScript file for the Green Trees theme.
 */

// JavaScript should be made compatible with libraries other than jQuery by
// wrapping it with an "anonymous closure". See:
// - https://drupal.org/node/1446420
// - http://www.adequatelygood.com/2010/3/JavaScript-Module-Pattern-In-Depth
//(function ($, Drupal, window, document, undefined) {



// To understand behaviors, see https://drupal.org/node/756722#behaviors
/*
Drupal.behaviors.my_custom_behavior = {
  attach: function(context, settings) {

    // Place your code here.

  }
};
*/

(function ($) {

// Remove no-js class
Drupal.behaviors.greentrees = {
  attach: function (context) {
    $('html.no-js', context).removeClass('no-js');
    $('.views-field a').addClass('favorites-ignore');
    $('.pager a').addClass('favorites-ignore');
  }
};

// Accessible skiplinks
Drupal.behaviors.skiplinks = {
  attach: function (context) {
    var isWebkit = navigator.userAgent.toLowerCase().indexOf('webkit') > -1,
        isOpera = navigator.userAgent.toLowerCase().indexOf('opera') > -1;

    // Set tabindex on the skiplink targets so IE knows they are focusable, and
    // so Webkit browsers will focus() them.
    $('#main-content, #site-navigation', context).attr('tabindex', -1);

    // Set focus to skiplink targets in Webkit and Opera.
    if (isWebkit || isOpera) {
      $('.skip-links a[href^="#"]', context).click(function() {
        var clickAnchor = '#' + this.href.split('#')[1];
        $(clickAnchor).focus();
      });
    }
  }
};

// Add 'new' class if content is less than 30 days old.
Drupal.behaviors.greentreesNew = {
  attach: function (context) {
    var now = new Date();
    now = now.getTime();

    $('ins[data-date]', context).each(function () {
      var data = $(this).data(),
        offset = 30 * 24 * 60 * 60 * 1000,
        date = data.date.replace(/\,/g, '/'), // Replace , with / for IE9.
        expired = Date.parse(date) + offset;

      if (now < expired) {
        $(this).addClass('new');
      }
    });
  }
};

// Add simple accordion behavior.
Drupal.behaviors.accordion = {
  attach: function (context) {
    $('.accordion', context).each(function () {
      var $titles = $(this).find('.accordion-title'),
          $panes = $titles.next('.accordion-pane');
      $panes.hide();
      $titles.each(function () {
        var $target = $(this).next('.accordion-pane');
        $(this).click(function (e) {
          if(!$(this).hasClass('active')) {
            $titles.removeClass('active');
            $panes.slideUp().removeClass('active');
            $(this).addClass('active');
            $target.slideDown().addClass('active');
          }
          else {
            $(this).removeClass('active');
            $target.slideUp().removeClass('active');
          }
          e.preventDefault();
        });
      });
    });
  }
};

// Move header images before .pane-content.
Drupal.behaviors.headerImages = {
  attach: function (context) {
    $('.box', context).each(function() {
      var $image = $('.image.view-mode-block_header:not(.caption, .block_header-processed)', this).first(),
          $box = $(this);

      $image.addClass('block_header-processed');
      $image.detach();
      $box.prepend($image);
    });
  }
};

// Share Links
Drupal.behaviors.shareLinks = {
  attach: function (context) {
    // Add dropdown effect.
    $('#share').find('.share-button').click(function () {
      $(this).toggleClass('on');
    });
  }
};

Drupal.behaviors.filterItems = {
    attach: function (context) {
        $("a").click(function(event) {
            clicked_link_id = event.target.id;
        });

        if ($("#simple-dialog-container").is(':visible')) {
            if ($("#simple-dialog-container").text() == '') {
                var invisibleItem = $("#" + clicked_link_id).attr('name');
                invisibleItem = $("#" + invisibleItem).html();
                $("#simple-dialog-container").prepend('<div class="modal-content-in-page">'+ invisibleItem +'</div>');
            }
            else {
                //This condition is added because when sorting is applied the id's get mixed up and what's seen on the modal is not related to
                //the actual clicked row. So by adding id to each link, this problem is solved.
                $("#simple-dialog-container").empty();
                var invisibleItem = $("#" + clicked_link_id).attr('name');
                invisibleItem = $("#" + invisibleItem).html();
                $("#simple-dialog-container").prepend('<div class="modal-content-in-page">'+ invisibleItem +'</div>');
            }
        }

        if($("#edit-field-prog-track-domain-value").val() == 'CEDRI') {
            $('#edit-field-prog-track-rep-type-filter-value-wrapper').show();
            $('#edit-field-prog-track-part-code-value-wrapper').show();
            var cedri_list = ["Notification Report", "Notification of Compliance Status", "Air Emissions Report", "- Any -"];
            $('#edit-field-prog-track-rep-type-filter-value option').filter(function () {
                return $.inArray(this.innerHTML, cedri_list) == -1
            }).remove();
        }
        if($("#edit-field-prog-track-domain-value").val() == 'Lead') {
            $('#edit-field-prog-track-rep-type-filter-value-wrapper').show();
            $('#edit-field-prog-track-part-code-value-wrapper').show();
            $('#edit-field-prog-track-part-code-value-wrapper').hide();

            var lead_list = ["Firm Abatement", "Firm RRP", "Firm Combination", "- Any -"];
            $('#edit-field-prog-track-rep-type-filter-value option').filter(function () {
                return $.inArray(this.innerHTML, lead_list) == -1
            }).remove();
        }

        if($("#edit-field-prog-track-part-code-value").val().trim() == 'Part 60') {
            $('#edit-field-prog-track-sub-part-code-value-wrapper').show();
            var part_60_list = ["Subpart Da", "Subpart Db", "Subpart Dc","Subpart III", "Subpart JJJJ", "Subpart A" , "- Any -"];
            $('#edit-field-prog-track-sub-part-code-value option').filter(function () {
                return $.inArray(this.innerHTML, part_60_list) == -1
            }).remove();
        }
        if($("#edit-field-prog-track-part-code-value").val().trim() == 'Part 63') {
            $('#edit-field-prog-track-sub-part-code-value-wrapper').show();
            var part_63_list = ["Subpart DDDDD", "Subpart JJJJJJ", "Subpart LLL", "Subpart ZZZZ", "- Any -"];
            $('#edit-field-prog-track-sub-part-code-value option').filter(function () {
                return $.inArray(this.innerHTML, part_63_list) == -1
            }).remove();
        }
        if($("#edit-field-prog-track-domain-value").val() == 'All') {
            $('#edit-field-prog-track-rep-type-filter-value-wrapper').hide();
            $('#edit-field-prog-track-part-code-value-wrapper').hide();
            $('#edit-field-prog-track-sub-part-code-value-wrapper').hide();
        }
        if($("#edit-field-prog-track-part-code-value").val() == 'All') {
            $('#edit-field-prog-track-sub-part-code-value-wrapper').hide();
        }
        $('#edit-field-prog-track-domain-value').change(function(){
            $('#edit-field-prog-track-rep-type-filter-value').val('All');
            $('#edit-field-prog-track-sub-part-code-value').val('All');
            $('#edit-field-prog-track-part-code-value').val('All');
        });
        $('#edit-field-prog-track-part-code-value').change(function(){
            $('#edit-field-prog-track-sub-part-code-value').val('All');
        });
    }
};

/*Drupal.behaviors.guestLogin = {
    attach: function (context) {
        $(document).ready(function () {
            var lastInd = (document.referrer).lastIndexOf('/');
            var rfr = (document.referrer).substring(lastInd + 1);
            if ($(".page-ee-welcome #edit-log-in").length == 1 && rfr == 'workbench?dest=guest_login')
                $("#edit-log-in").click();
        });
    }
};*/

})(jQuery);

