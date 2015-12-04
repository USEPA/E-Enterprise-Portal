(function($) {

     var ItemsOfInterestTable = function($wrapper, ajax_url, location) {

         $wrapper.hide();

         var datatable_options =  {
             "sPaginationType": "full_numbers",
             "oLanguage": {
                 "oPaginate": {
                     sLast: ">>",
                     sNext: ">",
                     sFirst: "<<",
                     sPrevious: "<"
                 }
             },
             "bLengthChange": false,
             "sPageButton": "favorites-ignore",
             "iDisplayLength": 3,
             "fnDrawCallback": function () {
                 if ($wrapper.find('.paginate_button').length < 6) {
                     $wrapper.find('.dataTables_paginate')[0].style.display = "none";
                 }
             }
         };

         var cached = false;
         this.wrapper = $wrapper;
         this.ajax_url = ajax_url;

         if (location) {
             // Grab current state code
             this.state_code = $.trim(location.split(',')[1]);
         }
         else {
             this.state_code  = false;
         }


         this.hideTable = function() {
             $wrapper.hide();
         }

         this.update_current_location = function(location) {
             this.state_code = $.trim(location.split(',')[1]);
             this.ajax_request();
         }

         this.ajax_request = function() {
             $.ajax({
                 beforeSend:  function() {
                     $wrapper.html('Loading...');
                 },
                 url: ajax_url,
                 method: "POST",
                 data: {state: this.state_code},
                 success: function (table) {
                     $wrapper.html(table);
                     var $table = $wrapper.find('table');
                     $table.DataTable(datatable_options);
                     $table.removeClass("dataTable no-footer").addClass('views-table cols-3 responsive-table');
                     cached = true;
                 }
             });
         }

         this.showTable = function() {
             if (cached) {
                 $wrapper.show();
             }
             else {
                 this.ajax_request();
                 $wrapper.show();
             }
         }

     }

    $(document).ready(function() {
    
	    var $tabs = $("#other-areas-tabs");
	    $tabs.tabs();
    
        var $location_select  = $('#location-select');
        var location = $('#location-select option:selected').text();

        var current_state_table = new ItemsOfInterestTable($("#current-state-resources"),'generateCurrentAreaOfInterestTable', location);
        var favorite_states_table = new ItemsOfInterestTable($("#favorite-state-resources"),'generateFavoriteAreasOfInterestTable')
        var all_states_resource_table = new ItemsOfInterestTable($("#all-state-resources"), 'generateAllAreasOfInterestTable');


        $('#restrict-to-states-button').click(function() {
            if ($(this).hasClass('inactive')){
                $(this).removeClass('inactive');
                $("#all-states-button").addClass('inactive');
                $('#restrict-to-current-button').addClass('inactive');
                all_states_resource_table.hideTable();
                current_state_table.hideTable();
                favorite_states_table.showTable();
            }
        });

        $("#all-states-button").click(function() {
            if ($(this).hasClass('inactive')){
                $(this).removeClass('inactive');
                $('#restrict-to-states-button').addClass('inactive');
                $('#restrict-to-current-button').addClass('inactive');
                all_states_resource_table.showTable();
                current_state_table.hideTable();
                favorite_states_table.hideTable();
            }
        });

        $('#restrict-to-current-button').click(function() {
            if ($(this).hasClass('inactive')){
                $(this).removeClass('inactive');
                $('#restrict-to-states-button').addClass('inactive');
                $("#all-states-button").addClass('inactive');
                current_state_table.showTable();
                favorite_states_table.hideTable();
                all_states_resource_table.hideTable();
            }
        });

        // Dynamically set button text for currently selected location
        $('#restrict-to-current-button a').text(location);

        $location_select.change(function() {
            var location = $('#location-select option:selected').text();
            $('#restrict-to-current-button').text(location);
            current_state_table.update_current_location(location);
            current_state_table.ajax_request();
        });


        current_state_table.showTable();
        favorite_states_table.ajax_request();
        all_states_resource_table.ajax_request();

    } );


}(jQuery));