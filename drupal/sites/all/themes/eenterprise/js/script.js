/**
 * @file
 * A JavaScript file for the theme.
 *
 * In order for this JavaScript to be loaded on pages, see the instructions in
 * the README.txt next to this file.
 */
(function ($) {

    Drupal.behaviors.initalizeTooltips = {
      attach: function (context) {
        console.log("initializeTooltips: entering", $('[data-toggle="tooltip"]'));


        $('body').once(function() {
          $('body').tooltip({
            selector: '.ee-bootstrap-tooltip',
            delay: 200,
            trigger: 'click hover focus'
          });
        });

      }
    };

    Drupal.behaviors.zipCodeChangeEvent = {
        attach: function(context) {

            function clearErrorMessage() {
                $('div.workbench-zipcode-error').remove();
            }

            function showError($locationInputFormGroup, $locationInputErrorIcon) {
                $locationInputFormGroup.addClass('has-error');
                $locationInputErrorIcon.show();
                clearErrorMessage();
                $('div#content').before($('<div>', {'class': 'messages--error messages error workbench-zipcode-error', 'text': 'Please enter a valid zip code.'}));
            }

            function hideError($locationInputFormGroup, $locationInputErrorIcon) {
                $locationInputFormGroup.removeClass('has-error');
                $locationInputErrorIcon.hide();
                clearErrorMessage();
            }

            var $locationSelect = $('select#location-select', context);
            var $locationInput = $('input#location-input-guests', context);

            var defaultZip = 27705; // Durham

            $locationSelect.add($locationInput).once(function() {

                var $locationInputFormGroup = $locationInput.closest('.form-group');
                var $locationInputErrorIcon = $locationInput.next('.form-control-feedback');

                // for logged in users
                $locationSelect.change(function() {
                    var currentZip = $(this).val();
                    console.log("change:", currentZip);
                    if (currentZip != 'view_more') {
                        $(document).trigger("ee:zipCodeChanged", {zip: currentZip});
                    }
                });

                // for guests
                $locationInput.change(function() {
                    var currentZip = $(this).val();
                    console.log("change:", currentZip);
                    if (currentZip.match(/^\d{5}$/)) {
                        $(document).trigger("ee:zipCodeChanged", {zip: currentZip});
                    } else { // invalid zip code
                        //$locationInputFormGroup.addClass('has-error has-feedback');
                        showError($locationInputFormGroup, $locationInputErrorIcon);
                    }
                });

                // get latlng info for new zip
                $(document).on("ee:zipCodeChanged", function(evt, data) {
                    $.getJSON('/zip_code_lookup?zip=' + data.zip, function(queryResponse) {
                        if (queryResponse.string === '') { // invalid zip code
                            //alert("invalid zip!");
                            //$locationInputFormGroup.addClass('has-error has-feedback');
                            showError($locationInputFormGroup, $locationInputErrorIcon);

                        } else {
                            //$locationInputFormGroup.removeClass('has-error has-feedback');
                            hideError($locationInputFormGroup, $locationInputErrorIcon);
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
                        $(document).trigger("ee:zipCodeChanged", {zip: defaultZip });
                    }

                    if (navigator.geolocation) {
                        navigator.geolocation.getCurrentPosition(function(position) {
                            accepted = true;
                            $.ajax({
                                url: '/return_location_data_lat_long',
                                type: 'GET',
                                data: {latitude: position.coords.latitude, longitude: position.coords.longitude},
                                success: function (location_data) {
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
                                failure: function () {
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
            });
        }
    };

// Remove no-js class
    Drupal.behaviors.eenterprise = {
        attach: function (context) {
            $('html.no-js', context).removeClass('no-js');
            $('.views-field a').addClass('favorites-ignore');
            $('.pager a').addClass('favorites-ignore');
            $('#benefits', context).tabs();
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

    Drupal.behaviors.filterItems = {
        attach: function (context) {
            $("a").click(function(event) {
                clicked_link_id = event.target.id;
            });

            if ($("#simple-dialog-container").is(':visible')) {
                if ($("#simple-dialog-container").text() == '') {
                    //var invisibleItem = $(".simpleDialogProcessed").attr('name');
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
                //$('#edit-field-prog-track-rep-type-filter-value-wrapper').show();
                $('#edit-field-prog-track-part-code-value-wrapper').show();
                var cedri_list = ["Notification Report", "Notification of Compliance Status", "Air Emissions Report", "ERT Performance Report", "- Any -"];
                $('#edit-field-prog-track-rep-type-filter-value option').filter(function () {
                    return $.inArray(this.innerHTML, cedri_list) == -1
                }).remove();
            }
            if($("#edit-field-prog-track-domain-value").val() == 'Lead') {
                $('#edit-field-prog-track-rep-type-filter-value-wrapper').show();
                $('#edit-field-prog-track-sub-part-code-value-wrapper').hide();
                $('#edit-field-prog-track-part-code-value-wrapper').hide();

                var lead_list = ["Firm Abatement", "Firm RRP", "Firm Combination", "- Any -"];
                $('#edit-field-prog-track-rep-type-filter-value option').filter(function () {
                    return $.inArray(this.innerHTML, lead_list) == -1
                }).remove();
            }
            var part_60_list = ["Subpart Da", "Subpart Db", "Subpart Dc","Subpart IIII", "Subpart JJJJ", "- Any -"];
            if($("#edit-field-prog-track-part-code-value").length && $("#edit-field-prog-track-part-code-value").val().trim() == 'Part 60') {
                $('#edit-field-prog-track-sub-part-code-value-wrapper').show();
                $('#edit-field-prog-track-sub-part-code-value option').filter(function () {
                    return $.inArray(this.innerHTML, part_60_list) == -1
                }).remove();
            }
            var part_63_list = ["Subpart DDDDD", "Subpart JJJJJJ", "Subpart LLL", "Subpart ZZZZ", "- Any -"];
            if($("#edit-field-prog-track-part-code-value").length && $("#edit-field-prog-track-part-code-value").val().trim() == 'Part 63') {
                $('#edit-field-prog-track-sub-part-code-value-wrapper').show();
                $('#edit-field-prog-track-sub-part-code-value option').filter(function () {
                    return $.inArray(this.innerHTML, part_63_list) == -1
                }).remove();
            }


            if($("#edit-field-prog-track-sub-part-code-value").length && jQuery.inArray( $("#edit-field-prog-track-sub-part-code-value").val().trim(), part_60_list ) != -1) {
                $('#edit-field-prog-track-rep-type-filter-value-wrapper').show();
                var report_type_60 = ["Air Emissions Report", "ERT Performance Report", "- Any -"];
                $('#edit-field-prog-track-rep-type-filter-value option').filter(function () {
                    return $.inArray(this.innerHTML, report_type_60) == -1
                }).remove();
            }

            if($("#edit-field-prog-track-sub-part-code-value").length && $("#edit-field-prog-track-sub-part-code-value").val().trim() == "Subpart JJJJJJ"){
                $('#edit-field-prog-track-rep-type-filter-value-wrapper').show();
                var report_type_63_jjjjjj = ["ERT Performance Report", "Notification of Compliance Status", "- Any -"];
                $('#edit-field-prog-track-rep-type-filter-value option').filter(function () {
                    return $.inArray(this.innerHTML, report_type_63_jjjjjj) == -1
                }).remove();
            }
            else if($("#edit-field-prog-track-sub-part-code-value").length && jQuery.inArray( $("#edit-field-prog-track-sub-part-code-value").val().trim(), part_63_list ) != -1) {
                $('#edit-field-prog-track-rep-type-filter-value-wrapper').show();
                var report_type_63 = ["Air Emissions Report", "Notification Report", "ERT Performance Report", "- Any -"];
                $('#edit-field-prog-track-rep-type-filter-value option').filter(function () {
                    return $.inArray(this.innerHTML, report_type_63) == -1
                }).remove();
            }



            if($("#edit-field-prog-track-domain-value").val() == 'All') {
                $('#edit-field-prog-track-rep-type-filter-value-wrapper').hide();
                $('#edit-field-prog-track-part-code-value-wrapper').hide();
                $('#edit-field-prog-track-sub-part-code-value-wrapper').hide();
            }
            if($("#edit-field-prog-track-part-code-value").val() == 'All' && $("#edit-field-prog-track-domain-value").val() == 'CEDRI') {
                $('#edit-field-prog-track-sub-part-code-value-wrapper').hide();
                $('#edit-field-prog-track-rep-type-filter-value-wrapper').hide();
            }
            if($("#edit-field-prog-track-sub-part-code-value").val() == 'All' && $("#edit-field-prog-track-domain-value").val() == 'CEDRI') {
                $('#edit-field-prog-track-rep-type-filter-value-wrapper').hide();
            }
            $('#edit-field-prog-track-domain-value').change(function(){
                $('#edit-field-prog-track-rep-type-filter-value').val('All');
                $('#edit-field-prog-track-sub-part-code-value').val('All');
                $('#edit-field-prog-track-part-code-value').val('All');
            });
            $('#edit-field-prog-track-part-code-value').change(function(){
                $('#edit-field-prog-track-sub-part-code-value').val('All');
                $('#edit-field-prog-track-rep-type-filter-value').val('All');
            });
            $('#edit-field-prog-track-sub-part-code-value').change(function(){
                $('#edit-field-prog-track-rep-type-filter-value').val('All');
            });
        }
    };

    Drupal.behaviors.filterToDoList = {
        attach: function (context) {
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

            function get_server_date(evt){
                var time_url = window.location.origin + "/server_time.php?tz=America/New_York";
                var httpreq = new XMLHttpRequest(); // a new request

                httpreq.onreadystatechange=function()
                {
                    if (httpreq.readyState==4 && httpreq.status==200)
                    {
                        if(evt.target.innerHTML == 'This Week'){
                            var date_today =  httpreq.responseText;
                            date_today = JSON.parse(date_today);
                            var vmonth = date_today.fmonth;
                            vmonth = vmonth < 10 ? '0' + vmonth : vmonth;
                            var vdate = date_today.fdate;
                            vdate = vdate < 10 ? '0' + vdate : vdate;
                            var vyear = date_today.fyear;
                            var vhour = date_today.fhour;
                            var vmin = date_today.fminute;
                            var vsec = date_today.fsecond

                            var date_var = vyear + '-'+ vmonth + '-' + vdate + ' ' + '00:00:00';
                            $("#edit-field-todo-lst-due-value").val(date_var);
                            $("#edit-submit-to-do").trigger("click");
                        }
                        else if(evt.target.innerHTML == 'Next Week'){
                            var currDate =  httpreq.responseText;
                            currDate = JSON.parse(currDate);
                            var fday = currDate.fday == 7 ? 0 : currDate.fday;
                            var nextSunday= new Date(currDate.fyear,currDate.fmonth-1,currDate.fdate+(7 - fday));

                            var vmonth = nextSunday.getMonth() + 1;
                            vmonth = vmonth < 10 ? '0' + vmonth : vmonth;

                            var vdate = nextSunday.getDate();
                            vdate = vdate < 10 ? '0' + vdate : vdate;

                            var date_var = nextSunday.getFullYear() + '-'+ vmonth + '-' + vdate + ' ' + '00:00:01';
                            $("#edit-field-todo-lst-due-value").val(date_var);
                            $("#edit-submit-to-do").trigger("click");
                        }
                        else if(evt.target.innerHTML == 'Beyond'){
                            var currDate =  httpreq.responseText;
                            currDate = JSON.parse(currDate);
                            var fday = currDate.fday == 7 ? 0 : currDate.fday;
                            var nextSunday= new Date(currDate.fyear,currDate.fmonth-1,currDate.fdate+(7 - fday));
                            var sunAfterNextSun = new Date(nextSunday.getFullYear(),nextSunday.getMonth(),nextSunday.getDate()+(7 - nextSunday.getDay()));

                            var vmonth = sunAfterNextSun.getMonth() + 1;
                            vmonth = vmonth < 10 ? '0' + vmonth : vmonth;

                            var vdate = sunAfterNextSun.getDate();
                            vdate = vdate < 10 ? '0' + vdate : vdate;

                            var date_var = nextSunday.getFullYear() + '-'+ vmonth + '-' + vdate + ' ' + '00:00:01';
                            $("#edit-field-todo-lst-due-value").val(date_var);
                            $("#edit-submit-to-do").trigger("click");
                        }

                    }
                }
                httpreq.open("GET",time_url,true);
                httpreq.send();
            }


            $("#edit-field-todo-lst-domain-value").prop('disabled','true');
            if($("#edit-field-todo-lst-domain-value").val() == 'CEDRI') {
                $('#edit-field-todo-lst-part-code-value-wrapper').show();
            }

            var todo_part_60_list = ["Subpart Da", "Subpart Db", "Subpart Dc","Subpart IIII", "Subpart JJJJ", "- Any -"];
            if($("#edit-field-todo-lst-part-code-value").length && $("#edit-field-todo-lst-part-code-value").val().trim() == 'Part 60') {
                $('#edit-field-todo-lst-sub-part-code-value-wrapper').show();
                $('#edit-field-todo-lst-sub-part-code-value option').filter(function () {
                    return $.inArray(this.innerHTML, todo_part_60_list) == -1
                }).remove();
            }

            var todo_part_63_list = ["Subpart DDDDD", "Subpart JJJJJJ", "Subpart LLL", "Subpart ZZZZ", "- Any -"];
            if($("#edit-field-todo-lst-part-code-value").length && $("#edit-field-todo-lst-part-code-value").val().trim() == 'Part 63') {
                $('#edit-field-todo-lst-sub-part-code-value-wrapper').show();
                $('#edit-field-todo-lst-sub-part-code-value option').filter(function () {
                    return $.inArray(this.innerHTML, todo_part_63_list) == -1
                }).remove();
            }

            if($("#edit-field-todo-lst-sub-part-code-value").length && jQuery.inArray( $("#edit-field-todo-lst-sub-part-code-value").val().trim(), todo_part_60_list ) != -1) {
                $('#edit-field-todo-lst-rprt-type-filter-value-wrapper').show();
                var report_type_60 = ["Air Emissions Report", "ERT Performance Report", "- Any -"];
                $('#edit-field-todo-lst-rprt-type-filter-value option').filter(function () {
                    return $.inArray(this.innerHTML, report_type_60) == -1
                }).remove();
            }

            if($("#edit-field-todo-lst-sub-part-code-value").length && $("#edit-field-todo-lst-sub-part-code-value").val().trim() == "Subpart JJJJJJ"){
                $('#edit-field-todo-lst-rprt-type-filter-value-wrapper').show();
                var report_type_63_jjjjjj = ["ERT Performance Report", "Notification of Compliance Status", "- Any -"];
                $('#edit-field-todo-lst-rprt-type-filter-value option').filter(function (){
                    return $.inArray(this.innerHTML, report_type_63_jjjjjj) == -1
                }).remove();
            }
            else if($("#edit-field-todo-lst-sub-part-code-value").length && jQuery.inArray( $("#edit-field-todo-lst-sub-part-code-value").val().trim(), todo_part_63_list ) != -1) {
                $('#edit-field-todo-lst-rprt-type-filter-value-wrapper').show();
                var report_type_63 = ["Air Emissions Report", "Notification Report", "ERT Performance Report", "- Any -"];
                $('#edit-field-todo-lst-rprt-type-filter-value option').filter(function () {
                    return $.inArray(this.innerHTML, report_type_63) == -1
                }).remove();
            }



            if($("#edit-field-todo-lst-sub-part-code-value").val() == 'All') {
                $('#edit-field-todo-lst-rprt-type-filter-value-wrapper').hide();
            }
            if($("#edit-field-todo-lst-part-code-value").val() == 'All') {
                $('#edit-field-todo-lst-sub-part-code-value-wrapper').hide();
                $('#edit-field-todo-lst-rprt-type-filter-value-wrapper').hide();
            }
            $('#edit-field-todo-lst-part-code-value').change(function(){
                $('#edit-field-todo-lst-sub-part-code-value').val('All');
                $('#edit-field-todo-lst-rprt-type-filter-value').val('All');
            });
            $('#edit-field-todo-lst-sub-part-code-value').change(function(){
                $('#edit-field-todo-lst-rprt-type-filter-value').val('All');
            });
        }
    };

})(jQuery);