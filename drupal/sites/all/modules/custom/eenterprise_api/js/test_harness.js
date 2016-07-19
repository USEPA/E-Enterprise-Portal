/**
 * Created by bmatkin on 1/29/2016.
 */


(function($) {


    var TestAPIHarness = function(input_id, json_div_id, table_div_id, url_used_id, button_id, url, api_type){

        this.$button = $('#' + button_id);


        var initial_url = url;
        var url_to_load;

        this.$button.click(function () {
            var input;
            if (api_type != 'any') {
                input = encodeURIComponent($('#' + input_id).val());
               // if (input != '') {
                //    url_to_load = initial_url + "?args[0]=" + input;
                //}
                loadResults(input);
            }
            else {
                input = $('#' + input_id).val();
                loadResults(input);
            }
        });


         function loadResults(url) {
            var $json_holder = $('#' + json_div_id);
            var $url_used_holder = $('#' + url_used_id);
             var table;
             var $table_holder = $('#'+ table_div_id);
             var parsed_data;
            $.ajax({
                url: '/rest_request',
                method: "GET",
                data: {url: url},
                dataType: "JSON",
                success: function(data) {
                    parsed_data = $.parseJSON(data);
                    $json_holder.html('');
                    var str = '';
                    if (parsed_data.length  == 0 ) {
                        str = "No results found";
                    }
                    else {
                        if (api_type != 'any') {
                        $.each(parsed_data, function (key, value) {
                            str = JSON.stringify(value, undefined, 4);
                            $json_holder.append(str + '<br />');
                            $url_used_holder.text(url);
                        });
                        if (api_type == 'local') {
                            table = createLocalTable(parsed_data);
                        }
                        else  {
                            table = createStateTable(parsed_data);
                        }
                            $table_holder.html(table);

                        }
                        else {
                            $json_holder.append(parsed_data);
                        }
                    }
                },
                failure: function(msg) {
                    console.log(msg);
                }
            });
        }

    }

    function createLocalTable(data) {
        var tool;
        var description;
        var link;
        var table = '<table><thead><tr><th>Title</th><th>Description</th><th>Link</th></tr></thead><tbody>';
        $.each(data, function(key, value) {
            table = table + '<tr><td>' + value.Tool + '</td><td>' + value.Description + '</td><td>' + value.Link + '</td></tr>';
        });
        table = table + "</tbody></table>";
        return table;
    }

    function createStateTable(data) {
        var table = '<table><thead><tr><th>Resource</th><th>Topic</th><th>URL</th></tr></thead><tbody>';
        $.each(data, function(key, value) {
            table = table + '<tr><td>' + value.Resource + '</td><td>' + value.Topic + '</td><td>' + value.URL + '</td></tr>';
        });
        table = table + "</tbody></table>";
        return table;
    }


    $(document).ready(function() {
        var local_resources_test_harness = new TestAPIHarness('local_request', 'local_json', 'local_table', 'url_used_local', 'search_locals', 'https://eenterprise-dev-portal.apps.cloud.gov/api/1.1/local_resources.json', 'local');
        var state_resources_test_harness = new TestAPIHarness('state_request', 'state_json', 'state_table', 'url_used_state', 'search_states', 'https://eenterprise-dev-portal.apps.cloud.gov/api/1.1/state_resources.json', 'state');

    //    var test_harness = new TestAPIHarness('any_request', 'raw_output', 'no_table', 'url_custom', 'search_custom', '', 'any');
    });





}(jQuery));