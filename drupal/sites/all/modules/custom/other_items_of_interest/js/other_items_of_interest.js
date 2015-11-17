(function($) {



    $(document).ready(function() {
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
    } );


}(jQuery));