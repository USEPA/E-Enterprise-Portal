/**
 * @file
 * Custom js and jQuery.
 */

jQuery(document).ready(
    function ($) {
      'use strict';
      $("#edit-account > div.form-item.form-type-checkboxes.form-item-roles > label"
        ).replaceWith("<h2>My groups, memberships  and roles</h2>");
      $("#edit-simple-access > div > div > table.sticky-enabled.tableheader-processed.sticky-table > tbody > tr:nth-child(1)"
        ).css("display", "none");
      $("#edit-roles").before('<h3>Drill-down Filter</h3><p><em>Start typing the entity you seek. The list will automatically filter.</em><div id="user_role_edit"></div></p>');
      $("#user-admin-roles").prepend("<p>hello</p>");
    }
);

(function ($) {
  'use strict';
    // Custom css expression for a case-insensitive contains()
  jQuery.expr[':'].Contains = function (a, i, m) {
        return (a.textContent || a.innerText || "").toUpperCase().
              indexOf(
                  m[3].toUpperCase()
              ) >= 0;
      };

  function listFilter(header, list) {
    var form = $("<form>").attr({class: "filterform", action: "#"});
    var input = $("<input>").attr({class: "form-text", type: "text"});
    $(form).append(input).appendTo("#user_role_edit");

    $(input)
        .change(
            function () {
                var filter = $(this).val();
                if (filter) {
                  $(list).find("label:not(:Contains(" + filter + "))").
                        parent().slideUp();
                  $(list).find("label:Contains(" + filter + ")").
                            parent().slideDown();
                }
                else {
                  $(list).find("li").slideDown();
                }
                return false;
              }
        )
            .keyup(
                function () {
                    // Fire the above change event after every letter.
                    $(this).change();
                  }
            );
  }
  $(
        function () {
            listFilter($("#header"), $("#edit-roles"));
          }
    );
}(jQuery));
