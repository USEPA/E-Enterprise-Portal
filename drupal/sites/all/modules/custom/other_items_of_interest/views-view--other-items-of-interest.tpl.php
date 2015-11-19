<?php
    $module_name = "other_items_of_interest";
    drupal_add_js(drupal_get_path('module', $module_name) . "/DataTables/js/jquery.dataTables.min.js", "file");
    drupal_add_css(drupal_get_path('module', $module_name) . "/DataTables/css/jquery.dataTables.min.css", "file");
    drupal_add_js(drupal_get_path('module', $module_name) . "/js/other_items_of_interest.js", "file");


    $temp_content_data = array(
        "California" => array(
            "CA.GOV" => array(
                "url" => "http://www.ca.gov",
                "online_services" => array(
                    "Report a Smoking Vehicle" => "http://www.arb.ca.gov/enf/complaints/svc2.htm",
                )
            )
        ),
        "Arkansas" => array(
            "Arkansas Department of Environmental Quality" => array(
                "url" => "https://www.adeq.state.ar.us/",
                "online_services" => array(
                    "Invoice Payments | ADEQ" => "https://www.ark.org/adeq_invoice/app/login.html",
                    "Report a complaint" => "https://www.adeq.state.ar.us/complaints/"
                )
            )
        )
    );

    $state_resources = loadStateResources();
    if (count($state_resources) > 0) {
        generateAreasOfInterestTable($state_resources);
    }
    else {
        echo "Currently there are no available Other Areas of Interest";
    }

?>
<div>


</div>