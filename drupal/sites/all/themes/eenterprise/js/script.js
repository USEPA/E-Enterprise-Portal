/**
 * @file
 * A JavaScript file for the theme.
 *
 * In order for this JavaScript to be loaded on pages, see the instructions in
 * the README.txt next to this file.
 */
(function($) {
  // Change the default label of all Search fields
  if (jQuery.fn.dataTable != null) {
    $.extend(true, jQuery.fn.dataTable.defaults, {
      "oLanguage": {
        sSearch: "Filter:"
      }
    });
  }

  Drupal.behaviors.modal508Compliance = {
    attach: function(context) {
      $('body').on('change', 'select#location-select', function() {
        var currentZip = $(this).val();
        if (currentZip == 'view_more') {
          add_aria_hidden_true_attrib_to_workbench();
          add_aria_hidden_true_attrib_facility_inputs_to_workbench();
          $('#dialog-all-locations input').removeAttr('aria-hidden');
        }
      });
      $('#dialog-all-locations').on("dialogclose", function() {
        add_aria_hidden_false_attrib_to_workbench();
        add_aria_hidden_false_attrib_facility_inputs_to_workbench();
      });
      $('#simple-dialog-container').on("dialogclose", function() {
        add_aria_hidden_false_attrib_to_workbench();
        add_aria_hidden_false_attrib_facility_inputs_to_workbench();
      });
      if ($('#simple-dialog-container').is(':visible')) {
        add_aria_hidden_true_attrib_to_workbench();
        add_aria_hidden_true_attrib_facility_inputs_to_workbench();
      }
      $('#facility-widget').on("dialogclose", function() {
        add_aria_hidden_false_attrib_to_workbench();
      });
      $("#launch-facility-management").click(function() {
        add_aria_hidden_true_attrib_to_workbench();
      });

      if ($('#modal-content').is(':visible')) {
        $('#edit-field-profile-first-name-und-0-value').attr('aria-hidden', 'true');
        $('#edit-mail').attr('aria-hidden', 'true');
        $('#edit-field-zip-code input').attr('aria-hidden', 'true');
        $('#edit-field-organization-und').attr('aria-hidden', 'true');
        $('#edit-field-role-und').attr('aria-hidden', 'true');
        $('#edit-field-lgc-topics-of-interest-und input').attr('aria-hidden', 'true');
        $('#edit-field-profile-favourites input').attr('aria-hidden', 'true');
        $('#edit-submit').attr('aria-hidden', 'true');
        $('#edit-submit--2').attr('aria-hidden', 'true');
        $('#edit-delete').attr('aria-hidden', 'true');
        $('#profile-tabs ul li').attr('aria-hidden', 'true');
        $('#field-zip-code-values .field_zip_code-delta-order').attr('aria-hidden', 'true');
        $('#links_description select').attr('aria-hidden', 'true');
        $('#delete-holder button').attr('aria-hidden', 'true');
        $('#location-input-guests').attr('aria-hidden', 'true');
        add_aria_hidden_true_attrib_to_workbench();
        add_aria_hidden_true_attrib_facility_inputs_to_workbench();
        //$('#').attr('aria-hidden', 'true');
      }
      $('#modal-content').on("remove", function() {
        $('#edit-field-profile-first-name-und-0-value').attr('aria-hidden', 'false');
        $('#edit-mail').attr('aria-hidden', 'false');
        $('#edit-field-zip-code input').attr('aria-hidden', 'false');
        $('#edit-field-organization-und').attr('aria-hidden', 'false');
        $('#edit-field-role-und').attr('aria-hidden', 'false');
        $('#edit-field-lgc-topics-of-interest-und input').attr('aria-hidden', 'false');
        $('#edit-field-profile-favourites input').attr('aria-hidden', 'false');
        $('#edit-submit').attr('aria-hidden', 'false');
        $('#edit-submit--2').attr('aria-hidden', 'false');
        $('#edit-delete').attr('aria-hidden', 'false');
        $('#profile-tabs ul li').attr('aria-hidden', 'false');
        $('#field-zip-code-values .field_zip_code-delta-order').attr('aria-hidden', 'false');
        $('#links_description select').attr('aria-hidden', 'false');
        $('#delete-holder button').attr('aria-hidden', 'false');
        $('#location-input-guests').attr('aria-hidden', 'false');
        add_aria_hidden_false_attrib_to_workbench();
        add_aria_hidden_false_attrib_facility_inputs_to_workbench();
        //$('#').attr('aria-hidden', 'false');
      });

      function add_aria_hidden_true_attrib_facility_inputs_to_workbench() {
        $('select#edit-facility-state').attr('aria-hidden', 'true');
        $('select#facility-bia-code').attr('aria-hidden', 'true');
        $('#facility-type').attr('aria-hidden', 'true');
        $('#edit-facility-active-status').attr('aria-hidden', 'true');
        $('#edit-my-facility .facility-county-fips').attr('aria-hidden', 'true');
        $('#existing-facilities-table').attr('aria-hidden', 'true');
      }

      function add_aria_hidden_false_attrib_facility_inputs_to_workbench() {
        $('select#edit-facility-state').attr('aria-hidden', 'false');
        $('select#facility-bia-code').attr('aria-hidden', 'false');
        $('#facility-type').attr('aria-hidden', 'false');
        $('#edit-facility-active-status').attr('aria-hidden', 'false');
        $('#edit-my-facility .facility-county-fips').attr('aria-hidden', 'false');
        $('#existing-facilities-table').attr('aria-hidden', 'false');
      }

      function add_aria_hidden_true_attrib_to_workbench() {
        $('.view-filters input').attr('aria-hidden', 'true');
        $('.views-exposed-form select').attr('aria-hidden', 'true');
        $('#village-green select').attr('aria-hidden', 'true');
        $('#location-select').attr('aria-hidden', 'true');
        $('#dialog-all-locations input').attr('aria-hidden', 'true');
        $('#other-areas-tabs input').attr('aria-hidden', 'true');
        $('#save-grid-changes').attr('aria-hidden', 'true');
        $('#cdx-logged-out-log-out').attr('aria-hidden', 'true');
        $('#revert-grid-changes').attr('aria-hidden', 'true');
        $('#launch-facility-management').attr('aria-hidden', 'true');
        $('#fmw-organization-select').attr('aria-hidden', 'true');
        $('#fmw-program-select').attr('aria-hidden', 'true');
        $('#fmw-type-select').attr('aria-hidden', 'true');
        $('.view-to-do ul.ui-tabs-nav li').attr('aria-hidden', 'true');
        $('#my-air-quality-chart-tabs ul li').attr('aria-hidden', 'true');
        $('#myMapsFilterList li').attr('aria-hidden', 'true');
        $('#other-areas-tabs ul li').attr('aria-hidden', 'true');
        $('#local-resources-tabs ul li').attr('aria-hidden', 'true');
        $('#my-facilities-tab .MapLegend-header').attr('aria-hidden', 'true');
        $('.region-navigation .menu').attr('aria-hidden', 'true');
        $('table.usa-table-borderless').attr('aria-hidden', 'true');
        $('#datatable-1_filter input').attr('aria-hidden', 'true');
        //$('').attr('aria-hidden', 'true');
      }

      function add_aria_hidden_false_attrib_to_workbench() {
        $('.view-filters input').attr('aria-hidden', 'false');
        $('.views-exposed-form select').attr('aria-hidden', 'false');
        $('#village-green select').attr('aria-hidden', 'false');
        $('#location-select').attr('aria-hidden', 'false');
        $('#dialog-all-locations input').attr('aria-hidden', 'false');
        $('#other-areas-tabs input').attr('aria-hidden', 'false');
        $('#save-grid-changes').attr('aria-hidden', 'false');
        $('#cdx-logged-out-log-out').attr('aria-hidden', 'false');
        $('#revert-grid-changes').attr('aria-hidden', 'false');
        $('#launch-facility-management').attr('aria-hidden', 'false');
        $('#fmw-organization-select').attr('aria-hidden', 'false');
        $('#fmw-program-select').attr('aria-hidden', 'false');
        $('#fmw-type-select').attr('aria-hidden', 'false');
        $('.view-to-do ul.ui-tabs-nav li').attr('aria-hidden', 'false');
        $('#my-air-quality-chart-tabs ul li').attr('aria-hidden', 'false');
        $('#myMapsFilterList li').attr('aria-hidden', 'false');
        $('#other-areas-tabs ul li').attr('aria-hidden', 'false');
        $('#local-resources-tabs ul li').attr('aria-hidden', 'false');
        $('#my-facilities-tab .MapLegend-header').attr('aria-hidden', 'false');
        $('.region-navigation .menu').attr('aria-hidden', 'false');
        $('table.usa-table-borderless').attr('aria-hidden', 'false');
        $('#datatable-1_filter input').attr('aria-hidden', 'false');
        //$('').attr('aria-hidden', 'false');
      }
    }
  };

  Drupal.behaviors.initializeSkipLinks = {
    attach: function(context) {
      $(".view-app-connect-new .views-field-title a").click(function() {
        $('#app-connect-sso-form').submit();
      });

      $('.grid-stack-item').on('click', 'a.skip-widget', function(ev) {
        ev.preventDefault();
        $('#' + $(this).attr('next-widget') + ' h2').focus();
      });
    }
  };


  Drupal.behaviors.initializeGridstack = {
    attach: function(context) {
      var page_name = window.location.pathname.split('/')[1];
      if (page_name == "workbench") {


        $('body').once(function() {
          var previous_grid_settings;
          var cellHeight = 10;
          var verticalMargin = 10;
          var is_saving = false;
          var allowed_drag = false;

          function createGrid() {
            var $grid_container = $('.grid-stack');
            var options = {
              vertical_margin: verticalMargin,
              cell_height: cellHeight,
              'data-gs-width': 2
            };
            $grid_container.gridstack(options);
            var grid = $grid_container.data('gridstack');

            var save_grid_changes = '<button id="save-grid-changes">Save Layout</button>';
            var revert_grid_changes = '<button class="usa-button-outline" id="revert-grid-changes">Cancel</button>';
            var $grid_change_options = $('<div class="grid-changes">' + save_grid_changes + revert_grid_changes + '</div>');

            $('body').prepend($grid_change_options);
            var $revert_button = $('#revert-grid-changes');
            var $save_button = $('#save-grid-changes');

            addDragListeners($grid_container, $grid_change_options);
            addSaveListeners(grid, $save_button, $revert_button);
            loadUserIndices(grid);
            addResizeSensors(grid, verticalMargin, cellHeight);
            grid.resizable('.grid-stack-item', false);
            if (Drupal.settings.is_guest) {
              grid.movable('.grid-stack-item', false);
            }

          }

          function addDragListeners($grid_container, $grid_change_options) {
            $('body').on('swapped_grid', function() {
              $grid_change_options.show();
            });
          }

          function rebuildSkipLinks(serializedWidgets) {
            // rebuild the skip links
            for (var i = 0; i < (serializedWidgets.length - 1); i++) {
              // all widgets except for the last one point to 'next'
              setSkipLink($('#' + serializedWidgets[i].id), $('#' + serializedWidgets[i + 1].id));
            }
            // the last widget points to 'first'
            var lastWidget = serializedWidgets[serializedWidgets.length - 1];
            setSkipLink($('#' + lastWidget.id), $('#' + serializedWidgets[0].id));
          }

          // override what gets tabbed as the first widget
          $('.grid-stack').parents('.main-content').prevAll().find('a').last().keydown(function(e) {
            e.stopImmediatePropagation();
            if (e.which === 9) { // tab key
              $('#' + sortedWidgets()[0].id + ' h2').focus();
            }
          });

          // @see https://github.com/troolee/gridstack.js/blob/master/README.md#save-grid-to-array
          function sortedWidgets() {
            var widgets = _.map($('.grid-stack .grid-stack-item:visible'), function(el, key) {
              el = $(el);
              // if no id has been set, set the id, e.g.: grid-item-my-facility-manager-2
              if (!el.attr('id')) {
                el.attr('id', 'grid-item-' + key);
              }
              var node = el.data('_gridstack_node');
              return {
                id: el.attr('id'),
                x: node.x,
                y: node.y,
                width: node.width,
                height: node.height
              };
            });

            return GridStackUI.Utils.sort(widgets);
          }

          function setSkipLink(sourceWidget, destinationWidget) {
            var skipTitle = $.trim($(destinationWidget).find('h2').text());
            $(sourceWidget).find('a.skip-widget').remove();
            $(sourceWidget).find('h2').after($('<a>', {
              'class': 'skip-widget element-invisible element-focusable',
              'text': 'Skip to ' + skipTitle + ' widget',
              'href': '#',
              'next-widget': $(destinationWidget).attr('id'),
              // @see http://stackoverflow.com/questions/11144653/a-script-links-without-href (A dud href)
              'role': 'button'
            }));
          }

          function addSaveListeners(grid, $save_button, $revert_button) {
            $save_button.click(function(e) {
              if (is_saving) {
                e.preventDefault();
              }
              else {
                // Save changes
                var data = serialized_data(grid);
                updateUserIndices(data, $save_button, $revert_button);
              }
            });
            $revert_button.click(function() {
              // Revert changes
              initializeIndices(grid, previous_grid_settings);
              $(".grid-changes").fadeOut();
            });
          }


          function addResizeSensors(grid) {
            if (typeof ResizeSensor !== 'undefined') {
              new ResizeSensor(jQuery('.grid-stack-item'), _.debounce(function() {
                resizeCallback(grid);
              }, 150));
              new ResizeSensor(jQuery('.view-content'), _.debounce(function() {
                resizeCallback(grid);
              }, 150));
              $('#cdx-logged-in-options').on('change', 'select', function() {
                resizeCallback(grid);
              });
              $(document).ajaxComplete(_.debounce(function() {
                resizeCallback(grid);
              }, 150));
            }
          }

          function resizeCallback(grid) {
            recalculateWidgetHeights(grid);
            rebuildSkipLinks(sortedWidgets());
          }

          function recalculateWidgetHeights(grid) {
            $('.grid-stack-item.ui-draggable').each(function() {
              var contentHeight = $(this).find('.pane-title').outerHeight(true)
                + Math.ceil($(this).find('.pane-content').outerHeight(true))
                + 30
                + verticalMargin;

              var $pager = $(this).find('.pager');
              if ($pager.size() > 0) {
                contentHeight += parseInt($pager.css('marginBottom'));
              }

              var gsHeight = Math.ceil(contentHeight / (cellHeight + verticalMargin));
              grid.resize(this, null, gsHeight);
            });
          }

          function initializeIndices(grid, serialization) {
            // assign x and y values to widgets
            if (serialization.length > 0 && !Drupal.settings.is_guest) {
              $.each(serialization, function(key, pane_data) {
                var $grid_item = $("#" + pane_data.id).parent();
                var x = pane_data.x;
                var y = pane_data.y;
                var width = 1; //pane_data.width;
                var height = 1; //pane_data.height;
                grid.update($grid_item, x, y, width, height);
                $grid_item.find('.grid-stack-item-content').css('overflow-y', 'hidden');
              });
            }
            else {
              var count = 0;
              $(".grid-stack-item").each(function() {
                var x = count % 2;
                var y = Math.floor(count / 2) * 30;
                grid.update($(this), x, y);
                count++;
                $(this).find('.grid-stack-item-content').css('overflow-y', 'hidden');
              });
            }
            previous_grid_settings = serialized_data(grid);
          }


          function loadUserIndices(grid) {
            var serialization;
            $.ajax({
              url: 'load_user_gridstack_data',
              data: {json: true},
              method: 'GET',
              success: function(data) {
                var data = $.parseJSON(data);
                serialization = GridStackUI.Utils.sort(data);
                initializeIndices(grid, serialization);
              }
            });
          }

          function updateUserIndices(grid_data, $save_button, $revert_button) {
            $.ajax({
              url: 'update_user_gridstack_data',
              data: {grid_data: grid_data},
              method: "POST",
              beforeSend: function() {
                $save_button.html('Saving Changes <i class="fa fa-spinner fa-pulse"></i>').addClass("btn btn-default").prop('disabled', true);
                $revert_button.hide();
                is_saving = true;
              },
              success: function(data) {
                $save_button.html("Changes to Layout Saved");
                setTimeout(function() {
                  $(".grid-changes").fadeOut();
                }, 1000);
                setTimeout(function() {
                  $save_button.html("Save Changes to Layout").removeClass('btn btn-default').prop('disabled', false);
                  $revert_button.show();
                }, 2000);
                previous_grid_settings = grid_data;
                is_saving = false;
              }
            });
          }

          function serialized_data(grid) {
            return _.map($('.grid-stack > .grid-stack-item:visible'), function(el) {
              el = $(el);
              var node = el.data('_gridstack_node');
              return {
                x: node.x,
                y: node.y,
                width: node.width,
                height: node.height,
                id: el.find(".grid-stack-item-content").attr("id")
              };
            }, grid);
          }


          createGrid();


        });
      }

    }
  }

  Drupal.behaviors.initalizeTooltips = {
    attach: function(context) {
      $('body').once(function() {

        // initialize all tooltips in page
        $('body').tooltip({
          selector: '.ee-bootstrap-tooltip',
          delay: 400,
          trigger: 'click hover focus',
          container: 'body',
          placement: 'auto left'
        });

        // destroy all tooltips when clicking anywhere
        $('body').click(function(e) {
          // but don't destroy the tooltip that was just created
          $('.ee-bootstrap-tooltip').not(e.target).tooltip('hide');
        })
      });
    }
  };

  Drupal.behaviors.zipCodeChangeEvent = {
    attach: function(context) {

      var $locationSelect = $('select#location-select', context);
      var $locationInput = $('input#location-input-guests', context);

      var defaultZip = 27705; // Durham

      $locationSelect.add($locationInput).once(function() {

        var $locationInputFormGroup = $locationInput.closest('.form-group');
        var $locationInputIcon = $locationInput.next('.form-control-feedback');

        // for logged in users ----------------------------------------------
        $('body').on('change', 'select#location-select', function() {
          var currentZip = $(this).val();
          if (currentZip != 'view_more') {
            $(document).trigger("ee:zipCodeChanged", {zip: currentZip});
          }
        });

        // for guests ------------------------------------------------------
        if (Drupal.settings.locationInputEngine) {
          function clearErrorMessage() {
            $('div.workbench-zipcode-error').remove();
          }

          function showError(msg) {
            $locationInputFormGroup.addClass('has-error');
            $locationInputIcon.attr('class', 'fa fa-close form-control-feedback');
            $locationInputIcon.show();
            clearErrorMessage();
            $('div#content').before($('<div>', {
              'class': 'messages--error messages error workbench-zipcode-error',
              'text': msg
            }));
          }

          function hideError() {
            $locationInputFormGroup.removeClass('has-error');
            $locationInputIcon.hide();
            $locationInputIcon.removeClass('fa-spinner');
            clearErrorMessage();
          }

          function showLoading() {
            $locationInputIcon.attr('class', 'fa fa-refresh form-control-feedback fa-spinner');
            $locationInputIcon.show();

          }

          function doneLoading() {
            $locationInputIcon.hide();
          }

          var autocompleteEnabled = false;

          function inputChangeHandler(e) {
            autocompleteEnabled = true;
            $locationInput.autocomplete("option", "searchEnabled", true);
            setTimeout(function() {
              $locationInput.autocomplete("search");
            }, 0);
          }

          $locationInput.autocomplete({
            source: function(request, respond) {
              if ($locationInput.autocomplete("option", "searchEnabled") === true) {
                $locationInput.autocomplete("option", "searchEnabled", false);
                hideError();
                showLoading();
                Drupal.settings.locationInputEngine.lookUpLocation(request.term).done(function(location_data) {
                  doneLoading();
                  console.log(location_data, location_data.zip_codes, location_data.zip_codes === true);
                  if (location_data.zip_codes === true) { // user entered city/state; show zip code drop down
                    respond(location_data.zip_array);
                  } else { // user entered zip
                    $(document).trigger("ee:zipCodeChanged", {zip: request.term});
                  }
                }).fail(function(location_data) {
                  showError(location_data.error_message);
                });
              } else {
                respond([]);
              }
            },
            select: function(event, ui) {
              console.log("autocomplete selected: " + ui.item.value);
              event.preventDefault();
              $locationInput.val(ui.item.value);
              $(document).trigger("ee:zipCodeChanged", {zip: ui.item.value});
            },
            searchEnabled: false
          }).autocomplete('widget').addClass('guest-zip-options fixed-height');

          $locationInput.change(inputChangeHandler);

          // IE hack: since pressing enter doesn't trigger change in IE only, handle enter with keydown event
          $locationInput.keydown(function(e) {
            if (e.which == 13) {
              e.preventDefault();
              inputChangeHandler(e);
            }
          });

          // get latlng info for new zip
          $(document).on("ee:zipCodeChanged", function(evt, data) {
            hideError();
            showLoading();
            $.getJSON('/zip_code_lookup?zip=' + data.zip, function(queryResponse) {
              doneLoading();
              if (queryResponse.string === '') { // invalid zip code
                showError();
              } else {
                hideError();
                $(document).trigger('ee:zipCodeQueried', queryResponse);
              }
            });
          });

          $locationSelect.trigger('change');

          // for guests users, request location
          if ($locationInput.size() > 0) {

            var waitTime = 10000;
            var accepted = false;

            function setDefaultZip() {
              $locationInput.val(defaultZip);
              $(document).trigger("ee:zipCodeChanged", {zip: defaultZip});
            }

            if (navigator.geolocation) {
              navigator.geolocation.getCurrentPosition(function(position) {
                accepted = true;
                $.ajax({
                  url: '/return_location_data_lat_long',
                  type: 'GET',
                  data: {latitude: position.coords.latitude, longitude: position.coords.longitude},
                  success: function(location_data) {
                    console.log(location_data);
                    location_data = $.parseJSON(location_data);
                    console.log(location_data);

                    if (!location_data.error) {

                      $locationInput.val(location_data.zip);

                      var zipData = {
                        state: location_data.state,
                        city: location_data.city,
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                        zip: location_data.zip,
                        string: location_data.city + ', ' + location_data.state
                      };

                      $(document).trigger("ee:zipCodeQueried", zipData);
                    }
                    return location_data;
                  },
                  failure: function() {
                    alert('Unable to connect to service');
                  }
                });
              }, function() {
                setDefaultZip();
              });
            }

            var t = setTimeout(function() {
              if (!accepted) {
                setDefaultZip();
              }
            }, waitTime);
          }
        }
      });
    }
  };

// Remove no-js class
  Drupal.behaviors.eenterprise = {
    attach: function(context) {
      $('html.no-js', context).removeClass('no-js');
      $('.views-field a').addClass('favorites-ignore');
      $('.pager a').addClass('favorites-ignore');
      $('#benefits', context).tabs();
    }
  };

// Accessible skiplinks
  Drupal.behaviors.skiplinks = {
    attach: function(context) {
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

// Add simple accordion behavior.
  Drupal.behaviors.accordion = {
    attach: function(context) {
      $('.accordion', context).each(function() {
        var $titles = $(this).find('.accordion-title'),
          $panes = $titles.next('.accordion-pane');
        $panes.hide();
        $titles.each(function() {
          var $target = $(this).next('.accordion-pane');
          $(this).click(function(e) {
            if (!$(this).hasClass('active')) {
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

  Drupal.behaviors.filterItems = {
    attach: function(context) {
      $("a").click(function(event) {
        clicked_link_id = event.target.id;
      });

      if ($("#simple-dialog-container").is(':visible')) {
        if ($("#simple-dialog-container").text() == '') {
          //var invisibleItem = $(".simpleDialogProcessed").attr('name');
          var invisibleItem = $("#" + clicked_link_id).attr('name');
          invisibleItem = $("#" + invisibleItem).html();
          $("#simple-dialog-container").prepend('<div class="modal-content-in-page">' + invisibleItem + '</div>');
        }
        else {
          //This condition is added because when sorting is applied the id's get mixed up and what's seen on the modal is not related to
          //the actual clicked row. So by adding id to each link, this problem is solved.
          $("#simple-dialog-container").empty();
          var invisibleItem = $("#" + clicked_link_id).attr('name');
          invisibleItem = $("#" + invisibleItem).html();
          $("#simple-dialog-container").prepend('<div class="modal-content-in-page">' + invisibleItem + '</div>');
        }
      }


      if ($("#edit-field-prog-track-domain-value").val() == 'CEDRI') {
        //$('#edit-field-prog-track-rep-type-filter-value-wrapper').show();
        $('#edit-field-prog-track-part-code-value-wrapper').show();
        var cedri_list = ["Notification Report", "Notification of Compliance Status", "Air Emissions Report", "ERT Performance Report", "- Any -"];
        $('#edit-field-prog-track-rep-type-filter-value option').filter(function() {
          return $.inArray(this.innerHTML, cedri_list) == -1
        }).remove();
      }
      if ($("#edit-field-prog-track-domain-value").val() == 'Lead') {
        $('#edit-field-prog-track-rep-type-filter-value-wrapper').show();
        $('#edit-field-prog-track-sub-part-code-value-wrapper').hide();
        $('#edit-field-prog-track-part-code-value-wrapper').hide();

        var lead_list = ["Firm Abatement", "Firm RRP", "Firm Combination", "- Any -"];
        $('#edit-field-prog-track-rep-type-filter-value option').filter(function() {
          return $.inArray(this.innerHTML, lead_list) == -1
        }).remove();
      }
      var part_60_list = ["Subpart Da", "Subpart Db", "Subpart Dc", "Subpart IIII", "Subpart JJJJ", "- Any -"];
      if ($("#edit-field-prog-track-part-code-value").length && $("#edit-field-prog-track-part-code-value").val().trim() == 'Part 60') {
        $('#edit-field-prog-track-sub-part-code-value-wrapper').show();
        $('#edit-field-prog-track-sub-part-code-value option').filter(function() {
          return $.inArray(this.innerHTML, part_60_list) == -1
        }).remove();
      }
      var part_63_list = ["Subpart DDDDD", "Subpart JJJJJJ", "Subpart LLL", "Subpart ZZZZ", "- Any -"];
      if ($("#edit-field-prog-track-part-code-value").length && $("#edit-field-prog-track-part-code-value").val().trim() == 'Part 63') {
        $('#edit-field-prog-track-sub-part-code-value-wrapper').show();
        $('#edit-field-prog-track-sub-part-code-value option').filter(function() {
          return $.inArray(this.innerHTML, part_63_list) == -1
        }).remove();
      }


      if ($("#edit-field-prog-track-sub-part-code-value").length && jQuery.inArray($("#edit-field-prog-track-sub-part-code-value").val().trim(), part_60_list) != -1) {
        $('#edit-field-prog-track-rep-type-filter-value-wrapper').show();
        var report_type_60 = ["Air Emissions Report", "ERT Performance Report", "- Any -"];
        $('#edit-field-prog-track-rep-type-filter-value option').filter(function() {
          return $.inArray(this.innerHTML, report_type_60) == -1
        }).remove();
      }

      if ($("#edit-field-prog-track-sub-part-code-value").length && $("#edit-field-prog-track-sub-part-code-value").val().trim() == "Subpart JJJJJJ") {
        $('#edit-field-prog-track-rep-type-filter-value-wrapper').show();
        var report_type_63_jjjjjj = ["ERT Performance Report", "Notification of Compliance Status", "- Any -"];
        $('#edit-field-prog-track-rep-type-filter-value option').filter(function() {
          return $.inArray(this.innerHTML, report_type_63_jjjjjj) == -1
        }).remove();
      }
      else if ($("#edit-field-prog-track-sub-part-code-value").length && jQuery.inArray($("#edit-field-prog-track-sub-part-code-value").val().trim(), part_63_list) != -1) {
        $('#edit-field-prog-track-rep-type-filter-value-wrapper').show();
        var report_type_63 = ["Air Emissions Report", "Notification Report", "ERT Performance Report", "- Any -"];
        $('#edit-field-prog-track-rep-type-filter-value option').filter(function() {
          return $.inArray(this.innerHTML, report_type_63) == -1
        }).remove();
      }


      if ($("#edit-field-prog-track-domain-value").val() == 'All') {
        $('#edit-field-prog-track-rep-type-filter-value-wrapper').hide();
        $('#edit-field-prog-track-part-code-value-wrapper').hide();
        $('#edit-field-prog-track-sub-part-code-value-wrapper').hide();
      }
      if ($("#edit-field-prog-track-part-code-value").val() == 'All' && $("#edit-field-prog-track-domain-value").val() == 'CEDRI') {
        $('#edit-field-prog-track-sub-part-code-value-wrapper').hide();
        $('#edit-field-prog-track-rep-type-filter-value-wrapper').hide();
      }
      if ($("#edit-field-prog-track-sub-part-code-value").val() == 'All' && $("#edit-field-prog-track-domain-value").val() == 'CEDRI') {
        $('#edit-field-prog-track-rep-type-filter-value-wrapper').hide();
      }
      $('#edit-field-prog-track-domain-value').change(function() {
        $('#edit-field-prog-track-rep-type-filter-value').val('All');
        $('#edit-field-prog-track-sub-part-code-value').val('All');
        $('#edit-field-prog-track-part-code-value').val('All');
        $("#edit-field-prog-tracker-app-value").val("");
      });
      $('#edit-field-prog-track-part-code-value').change(function() {
        $('#edit-field-prog-track-sub-part-code-value').val('All');
        $('#edit-field-prog-track-rep-type-filter-value').val('All');
      });
      $('#edit-field-prog-track-sub-part-code-value').change(function() {
        $('#edit-field-prog-track-rep-type-filter-value').val('All');
      });
    }
  };

  Drupal.behaviors.filterToDoList = {
    attach: function(context) {
      $(document).one('ready', function() {
        if ($(".view-to-do div").hasClass("view-content")) {
          $(".view-to-do .todo-filter-by-week").show();
        }
        else {
          $(".view-to-do .todo-filter-by-week").hide();
        }
      });
      $("#this-week").click(function(event) {
        get_server_date(event);
      });
      $("#next-week").click(function(event) {
        get_server_date(event);
      });
      $("#beyond-next-week").click(function(event) {
        get_server_date(event);
      });
      $("#all-time").click(function(event) {
        $("#edit-field-todo-lst-due-value").val('0000-00-00');
        $("#edit-submit-to-do").trigger("click");
      });

      function get_server_date(evt) {
        var time_url = window.location.origin + "/server_time.php?tz=America/New_York";
        var httpreq = new XMLHttpRequest(); // a new request

        httpreq.onreadystatechange = function() {
          if (httpreq.readyState == 4 && httpreq.status == 200) {
            if (evt.target.innerHTML == 'This Week') {
              var date_today = httpreq.responseText;
              date_today = JSON.parse(date_today);

              $("#edit-field-todo-lst-due-value").val(date_today.flastsunday);
              $("#edit-submit-to-do").trigger("click");
            }
            else if (evt.target.innerHTML == 'Next Week') {
              var currDate = httpreq.responseText;
              currDate = JSON.parse(currDate);
              var fday = currDate.fday == 7 ? 0 : currDate.fday;
              var nextSunday = new Date(currDate.fyear, currDate.fmonth - 1, currDate.fdate + (7 - fday));

              var vmonth = nextSunday.getMonth() + 1;
              vmonth = vmonth < 10 ? '0' + vmonth : vmonth;

              var vdate = nextSunday.getDate();
              vdate = vdate < 10 ? '0' + vdate : vdate;

              var date_var = nextSunday.getFullYear() + '-' + vmonth + '-' + vdate + ' ' + '00:00:01';
              $("#edit-field-todo-lst-due-value").val(date_var);
              $("#edit-submit-to-do").trigger("click");
            }
            else if (evt.target.innerHTML == 'Beyond') {
              var currDate = httpreq.responseText;
              currDate = JSON.parse(currDate);
              var fday = currDate.fday == 7 ? 0 : currDate.fday;
              var nextSunday = new Date(currDate.fyear, currDate.fmonth - 1, currDate.fdate + (7 - fday));
              var sunAfterNextSun = new Date(nextSunday.getFullYear(), nextSunday.getMonth(), nextSunday.getDate() + (7 - nextSunday.getDay()));

              var vmonth = sunAfterNextSun.getMonth() + 1;
              vmonth = vmonth < 10 ? '0' + vmonth : vmonth;

              var vdate = sunAfterNextSun.getDate();
              vdate = vdate < 10 ? '0' + vdate : vdate;

              var date_var = nextSunday.getFullYear() + '-' + vmonth + '-' + vdate + ' ' + '00:00:01';
              $("#edit-field-todo-lst-due-value").val(date_var);
              $("#edit-submit-to-do").trigger("click");
            }

          }
        }
        httpreq.open("GET", time_url, true);
        httpreq.send();
      }


      $("#edit-field-todo-lst-domain-value").prop('disabled', 'true');
      if ($("#edit-field-todo-lst-domain-value").val() == 'CEDRI') {
        $('#edit-field-todo-lst-part-code-value-wrapper').show();
      }

      var todo_part_60_list = ["Subpart Da", "Subpart Db", "Subpart Dc", "Subpart IIII", "Subpart JJJJ", "- Any -"];
      if ($("#edit-field-todo-lst-part-code-value").length && $("#edit-field-todo-lst-part-code-value").val().trim() == 'Part 60') {
        $('#edit-field-todo-lst-sub-part-code-value-wrapper').show();
        $('#edit-field-todo-lst-sub-part-code-value option').filter(function() {
          return $.inArray(this.innerHTML, todo_part_60_list) == -1
        }).remove();
      }

      var todo_part_63_list = ["Subpart DDDDD", "Subpart JJJJJJ", "Subpart LLL", "Subpart ZZZZ", "- Any -"];
      if ($("#edit-field-todo-lst-part-code-value").length && $("#edit-field-todo-lst-part-code-value").val().trim() == 'Part 63') {
        $('#edit-field-todo-lst-sub-part-code-value-wrapper').show();
        $('#edit-field-todo-lst-sub-part-code-value option').filter(function() {
          return $.inArray(this.innerHTML, todo_part_63_list) == -1
        }).remove();
      }

      if ($("#edit-field-todo-lst-sub-part-code-value").length && jQuery.inArray($("#edit-field-todo-lst-sub-part-code-value").val().trim(), todo_part_60_list) != -1) {
        $('#edit-field-todo-lst-rprt-type-filter-value-wrapper').show();
        var report_type_60 = ["Air Emissions Report", "ERT Performance Report", "- Any -"];
        $('#edit-field-todo-lst-rprt-type-filter-value option').filter(function() {
          return $.inArray(this.innerHTML, report_type_60) == -1
        }).remove();
      }

      if ($("#edit-field-todo-lst-sub-part-code-value").length && $("#edit-field-todo-lst-sub-part-code-value").val().trim() == "Subpart JJJJJJ") {
        $('#edit-field-todo-lst-rprt-type-filter-value-wrapper').show();
        var report_type_63_jjjjjj = ["ERT Performance Report", "Notification of Compliance Status", "- Any -"];
        $('#edit-field-todo-lst-rprt-type-filter-value option').filter(function() {
          return $.inArray(this.innerHTML, report_type_63_jjjjjj) == -1
        }).remove();
      }
      else if ($("#edit-field-todo-lst-sub-part-code-value").length && jQuery.inArray($("#edit-field-todo-lst-sub-part-code-value").val().trim(), todo_part_63_list) != -1) {
        $('#edit-field-todo-lst-rprt-type-filter-value-wrapper').show();
        var report_type_63 = ["Air Emissions Report", "Notification Report", "ERT Performance Report", "- Any -"];
        $('#edit-field-todo-lst-rprt-type-filter-value option').filter(function() {
          return $.inArray(this.innerHTML, report_type_63) == -1
        }).remove();
      }


      if ($("#edit-field-todo-lst-sub-part-code-value").val() == 'All') {
        $('#edit-field-todo-lst-rprt-type-filter-value-wrapper').hide();
      }
      if ($("#edit-field-todo-lst-part-code-value").val() == 'All') {
        $('#edit-field-todo-lst-sub-part-code-value-wrapper').hide();
        $('#edit-field-todo-lst-rprt-type-filter-value-wrapper').hide();
      }
      $('#edit-field-todo-lst-part-code-value').change(function() {
        $('#edit-field-todo-lst-sub-part-code-value').val('All');
        $('#edit-field-todo-lst-rprt-type-filter-value').val('All');
      });
      $('#edit-field-todo-lst-sub-part-code-value').change(function() {
        $('#edit-field-todo-lst-rprt-type-filter-value').val('All');
      });


      $("#all-time").focus(function() {
        $("#all-time").keydown(function(e) {
          e.stopImmediatePropagation();
          if (e.which === 40) {
            $("#all-time a").click();
          } else if (e.which === 39) {
            $('input#focused-element').remove();
            $('#this-week a').click();
          }
        });
      });
      $("#this-week a").focus(function() {
        $("#this-week a").keydown(function(e) {
          e.stopImmediatePropagation();
          if (e.which === 40) {
            $("#this-week a").click();
          } else if (e.which === 39) {
            $('#next-week a').click();
          }
          else if (e.which === 37) {
            $('input#focused-element').remove();
            $('body').append('<input type="hidden" id="focused-element" name="focused_element" value="#all-time" />');
            $('#all-time a').click();
          }
        });
      });
      $("#next-week a").focus(function() {
        $("#next-week a").keydown(function(e) {
          e.stopImmediatePropagation();
          if (e.which === 40) {
            $("#next-week a").click();
          } else if (e.which === 39) {
            $('#beyond-next-week a').click();
          }
          else if (e.which === 37) {
            $('#this-week a').click();
          }
        });
      });
      $("#beyond-next-week a").focus(function() {
        $("#beyond-next-week a").keydown(function(e) {
          e.stopImmediatePropagation();
          if (e.which === 40) {
            $("#beyond-next-week a").click();
          }
          else if (e.which === 37) {
            $('#next-week a').click();
          }
        });
      });

      // Keep track of the last pull-down we focused on (view filters only, for now)
      $('.views-exposed-form select').focus(function() {
        var thisId = $(this).attr('id');
        trackFocusedElement('#' + thisId);
      });
      $('.view').on('focus', '.pager .pager-previous a', function() {
        var thisTarget = getParentViewSelectorByClass($(this));
        thisTarget += ' .pager .pager-previous a';
        trackFocusedElement(thisTarget);
      });
      $('.view').on('focus', '.pager .pager-next a', function() {
        var thisTarget = getParentViewSelectorByClass($(this));
        thisTarget += ' .pager .pager-next a';
        trackFocusedElement(thisTarget);
      });


      function trackFocusedElement(target) {
        $('input#focused-element').remove();
        $('input#focused-view').remove();
        $('body').append('<input type="hidden" id="focused-element" name="focused_element" value="' + target + '" />');
        $('body').append('<input type="hidden" id="focused-view" name="focused_view" value="' + getParentViewSelectorByClass($(target)) + '" />');
      }

      function getParentViewSelectorByClass(element) {
        var thisTarget = '';
        // find the class that uniquely identifies this view container
        var classList = $(element).parents('.view').attr('class').split(/\s+/);
        $.each(classList, function(index, item) {
          thisTarget += '.' + item;
        });
        return thisTarget;
      }

      // Lose track if we blur
      $('.views-exposed-form select, .view .pager a').blur(function() {
        $('input#focused-element').remove();
        $('input#focused-view').remove();
      });

      var xmlhttp = new XMLHttpRequest();
      xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
          if ($('input#focused-element').length == 1) {
            if ($($('input#focused-element').val()).length > 0) {
              // attempt to focus this element
              $($('input#focused-element').val()).focus();
            } else {
              // if it disappeared...
              if ($('input#focused-element').val().indexOf(".pager-next") != -1) {
                // ...focus on the 'previous page' item if you were on the last page.
                // therefore, pressing <tab> takes the user to the next widget.
                trackFocusedElement($('input#focused-view').val() + ' .pager-previous > a');
                $($('input#focused-view').val()).find('.pager-previous > a').focus();
              } else if ($('input#focused-element').val().indexOf(".pager-previous") != -1) {
                // ...focus on the 'next page' item if you were on the first page.
                trackFocusedElement($('input#focused-view').val() + ' .pager-next > a');
                $($('input#focused-view').val()).find('.pager-next > a').focus();
              } else {
                // ...focus on its view container.
                $($('input#focused-view').val()).focus();
                // we used it, now lose it!
                $('input#focused-element').remove();
              }
            }
          } else if ($("#this-week").hasClass("filter-applied")) {
            $('#this-week a').focus();
          } else if ($("#next-week").hasClass("filter-applied")) {
            $('#next-week a').focus();
          } else if ($("#beyond-next-week").hasClass("filter-applied")) {
            $('#beyond-next-week a').focus();
          }
        }
      }
      xmlhttp.open("GET", "README.txt", true);
      xmlhttp.send();

      /* Start logic:-  For positioning scroll to top of to-do widget after to-do refresh*/
      $(".view-to-do .refresh").click(function(e) {
        if (typeof(Storage) !== "undefined") {
          localStorage.setItem("to_do_refreshed", "Yes");
        }
      });

      if (typeof(Storage) !== "undefined" && localStorage.getItem("to_do_refreshed") == "Yes") {
        jQuery(window).load(function() {
          setTimeout(function() { //Delay 1 sec to wait for complete page load
            localStorage.setItem("to_do_refreshed", "No");
            $(".view-to-do .refresh").focus();
            $(window).scrollTop($("#gridstack-pane-views-to_do-block_1").offset().top);
          }, 1000);
        });
      }
      /* End logic:-  For positioning scroll to top of to-do widget after to-do refresh*/
      /* Start logic:-  For positioning scroll to top of progress tracker widget after progress tracker refresh*/
      $(".view-progress-tracker .refresh").click(function(e) {
        if (typeof(Storage) !== "undefined") {
          localStorage.setItem("progress_tracker_refreshed", "Yes");
        }
      });

      if (typeof(Storage) !== "undefined" && localStorage.getItem("progress_tracker_refreshed") == "Yes") {
        jQuery(window).load(function() {
          setTimeout(function() {  //Delay 1 sec to wait for complete page load
            localStorage.setItem("progress_tracker_refreshed", "No");
            $(".view-progress-tracker .refresh").focus();
            $(window).scrollTop($("#gridstack-pane-views-progress_tracker-block_1").offset().top);
          }, 1000);
        });
      }
      /* End logic:-  For positioning scroll to top of progress tracker widget after progress tracker refresh*/

    }
  };

})(jQuery);