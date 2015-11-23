(function($) {

    $(document).ready(function() {

        function generateAllAreas() {
            $.ajax({
                url: 'generateAllAreasOfInterestTable',
                success: function (table) {
                    console.log(table);
                    $('#other-items-table-wrapper').html(table);
                    $('#other-areas-of-interest-table').DataTable({
                        "fnDrawCallback":function(){
                            if ( !$('#other-areas-of-interest-table span span.paginate_button').size()) {
                                //$('#example_paginate')[0].style.display = "block";
                                //} else {
                                $('#other-areas-of-interest-table_wrapper .dataTables_paginate')[0].style.display = "none";
                                $('#other-areas-of-interest-table_length')[0].style.display = "none";
                            }
                        }
                    });

                }
            });
        }

        function generateFavoriteAreas() {
            $.ajax({
                url: 'generateFavoriteAreasOfInterestTable',
                success: function (table) {
                    $('#other-items-table-wrapper').html(table);
                    $('#other-areas-of-interest-table').DataTable({
                        "fnDrawCallback":function(){
                            if ( !$('#other-areas-of-interest-table span span.paginate_button').size()) {
                                //$('#example_paginate')[0].style.display = "block";
                                //} else {
                                $('#other-areas-of-interest-table_wrapper .dataTables_paginate')[0].style.display = "none";
                                $('#other-areas-of-interest-table_length')[0].style.display = "none";
                            }
                        }
                    });

                }
            });
        }

        $('#restrict-to-states-button').click(function() {
           generateFavoriteAreas();
        });
        $("#all-states-button").click(function() {
            generateAllAreas();
        });
        generateFavoriteAreas();

    } );


}(jQuery));