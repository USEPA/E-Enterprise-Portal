(function ($) {


  $(document).ready(function () {




    function placeAddAnotherButton(ajax_content, table_id, parent_id) {
      var table = $(table_id);
      var input_button = $(parent_id).find('.field-add-more-submit');
      if (!ajax_content) {
        table.find("tr:last").find('td:nth-child(2)').append(input_button);
      }
    }


    function processPrimaryFields() {
      var table = $('#zipcode_description .field-multiple-table');        // cache the target table DOM element
      var checkboxes = table.find('input[type=checkbox]');
      var selection = table.find('input[type=checkbox]:checked');
      checkboxes.after('<div class="zip-code-primary-holder"><i class="glyphicon glyphicon-star-empty zip-code-primary-select" title="Set to default location"></i></div>');
      var primary_indicator = selection.next('.zip-code-primary-holder').find('.zip-code-primary-select');
      primary_indicator.addClass('selected');
      primary_indicator.removeClass('glyphicon-star-empty');
      primary_indicator.addClass('glyphicon-star');
      primary_indicator.prop('title', 'Default location');
    }

    $('body').on('click', '.zip-code-primary-select', function () {
      $('.zip-code-primary-select.selected').removeClass('selected');
      $('.zip-code-primary-select.glyphicon-star').addClass('glyphicon-star-empty');
      $('.zip-code-primary-select.glyphicon-star').removeClass('glyphicon-star');
      $('.zip-code-primary-select.glyphicon-star').prop('title','Set to default location');
      $('.zip-code-primary-select').closest('td').find('input[type=checkbox]:checked').prop('checked', false);
      var selected_icon = $(this);
      selected_icon.addClass('selected');
      selected_icon.removeClass('glyphicon-star-empty');
      selected_icon.addClass('glyphicon-star');
      selected_icon.prop('title', 'Default location');
      selected_icon.closest('td').find('input[type=checkbox]').prop('checked', true);
    });
    $('body').on('click', '.zip-code-primary-select.selected', function () {
      var selected_icon = $(this);
      selected_icon.removeClass('selected');
      selected_icon.removeClass('glyphicon-star');
      selected_icon.addClass('glyphicon-star-empty');
      selected_icon.prop('title', 'Set to default location');
      selected_icon.closest('td').find('input[type=checkbox]').prop('checked', false);
    });


    // Functionality to allow city,state input into zip codes

    $('body').on('change', '.field_zip_code', function () {
      var input = $(this);
      var field_suffix = input.next('.field-suffix');
      var add_button = input.closest('td').find('.field-add-more-submit');
      var remove_button = input.closest('td').find('.remove-button');
      var primary_indicator = input.closest('td').find('.zip-code-primary-holder');

      field_suffix.html('Loading...');
      field_suffix.removeClass('error');
      if ($.trim(input.val()) == '') {
        field_suffix.html('');
      }
      else {
        //var location_data = Drupal.settings.locationInputEngine.lookUpLocation(input.val());
        Drupal.settings.locationInputEngine.lookUpLocation(input.val()).done(function(location_data) {
          if (location_data.zip_codes) {

              // IF only one zip code, automatically input into input
              var count_zips_returned = location_data.zip_array.length;
              if (count_zips_returned > 1) {

                  // replace input with select list of zip codes.
                  add_button.hide();
                  remove_button.hide();
                  primary_indicator.hide();

                  var select = $(location_data.zip_select);
                  select.addClass('city-state-lookup-zips');
                  var confirm = $('<button type="button" class="btn btn-default btn-sm" id ="user-profile-select-zip">Select</button>');
                  var back = $('<button type="button" class="btn btn-default btn-sm" id="user-profile-back-zip">Back</button>');
                  input.replaceWith(select);

                  field_suffix.html(back);
                  field_suffix.append(confirm);

                  back.click(function () {
                      field_suffix.html('');
                      select.replaceWith(input);
                      add_button.show();
                      remove_button.show();
                      primary_indicator.show();
                  });
                  confirm.click(function () {
                      back.remove();
                      confirm.remove();
                      input.val(select.val());
                      field_suffix.html(location_data.city + ', ' + location_data.state);
                      select.replaceWith(input);
                      add_button.show();
                      remove_button.show();
                      primary_indicator.show();
                  });
              }
              else {
                  input.val(location_data.zip_array[0]);
                  field_suffix.html(location_data.city + ', ' + location_data.state);
              }
          }
          else {
            // add city and state data to field suffix
            field_suffix.html(location_data.city + ', ' + location_data.state);
          }
        }).fail(function(location_data){
          // Print error message
          field_suffix.addClass('error').html(location_data.error_message);
        });
      }
    });


    var path = window.location.pathname;
    var page = path.split('/')[1];
    if (page == 'user') {
      $(document).ajaxSuccess(function (event, xhr, settings) {
        console.log(settings.url);
        var target_url = settings.url;
        // determine which table to place the Add Another buttom
        if (target_url == '/system/ajax' || target_url == '/multifield/field-remove-item/ajax') {
          var table_id = '';
          var parent_id = '';
          $('.field-multiple-table').each(function () {
            var table = $(this);
            var add_button = table.find('tr:last').find('td:nth-child(2)').find('.field-add-more-submit');
            if (add_button.length == 0) {
              table_id = table.attr('id');
            }
          });
          if (inString(table_id, 'zip-code')) {
            processPrimaryFields();
            parent_id = '#zipcode_description';
          }
          else {
            parent_id = '#links_description';
          }

          if (table_id != '') {
            console.log('sorting with', table_id, parent_id);
            // throw new Error('break');
            placeAddAnotherButton(false, '#' + table_id, parent_id);
          }
        }
      });


      Drupal.tableDrag.prototype.row.prototype.onSwap = function (swappedRow) {
        var table = $(swappedRow).closest('table');
        var table_id = '#' + table.attr('id');
        var parent_id = '';
        if (inString(table_id, 'zip-code')) {
          parent_id = '#zipcode_description';
        }
        else {
          parent_id = '#links_description';
          // table_id = '#field-profile-favourites-values';
        }
        placeAddAnotherButton(false, table_id, parent_id);
      };
      $('#profile-tabs').tabs();

    }


    function inString(str, substring) {
      return str.indexOf(substring) >= 0;

    }


      $('#edit-delete').click(function(e) {
          var delete_button = $(this);
          var fancybox =    $.fancybox({
              content:  $('#delete-holder'),
            'width': 400,
                  'height':150,
                  'autoSize' : false,
      });

          // If confirmed delete, unbind prevent default and trigger click to continue action
          $('#confirm-delete-profile').unbind('click').click(function() {
              delete_button.unbind('click');
              delete_button.trigger('click');
          });

          $('#cancel-delete-profile').unbind('click').click(function() {
              $.fancybox.close();
          });

          e.preventDefault();
      })


    processPrimaryFields();
    placeAddAnotherButton(false, '#field-zip-code-values', '#zipcode_description');
    placeAddAnotherButton(false, '#field-profile-favourites-values', '#links_description');
    $('#zipcode_description').show();

  });
})(jQuery);

