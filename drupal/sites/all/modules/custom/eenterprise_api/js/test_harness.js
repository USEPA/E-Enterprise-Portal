/**
 * Created by bmatkin on 1/29/2016.
 */


(function($) {


    var TestAPIHarness = function(input_id, json_div_id, table_div_id, url_used_id, button_id, url, api_type){

        this.$button = $('#' + button_id);



        this.$button.click(function () {
            var input = encodeURIComponent($('#' + input_id).val());
            if (input != '') {
                url = url + "?args[0]=" + input;
            }
            loadResults(url);
        });


         function loadResults(url) {
            var $json_holder = $('#' + json_div_id);
            var $url_used_holder = $('#' + url_used_id);
             var table;
             var $table_holder = $('#'+ table_div_id);
            $.ajax({
                url: url,
                method: "GET",
                success: function(data) {
                    var str = '';
                    if (data.length  == 0 ) {
                        str = "No results found";
                    }
                    else {
                        $.each(data, function (key, value) {
                            str = JSON.stringify(value, undefined, 4);
                            $json_holder.append(str + '<br />');
                            $url_used_holder.text(url);

                        });
                        if (api_type == 'local') {
                            table = createLocalTable(data);
                        }
                        else {
                            table = createStateTable(data);
                        }
                        $table_holder.html(table);
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
        var local_resources_test_harness = new TestAPIHarness('local_request', 'local_json', 'local_table', 'url_used_local', 'search_locals', 'https://eportaldev.epa.gov/api/1.1/local_resources.json', 'local');
        var state_resources_test_harness = new TestAPIHarness('state_request', 'state_json', 'state_table', 'url_used_state', 'search_states', 'https://eportaldev.epa.gov/api/1.1/state_resources.json', 'state');
    });





}(jQuery));