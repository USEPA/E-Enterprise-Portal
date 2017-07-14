<?php
  define('DRUPAL_ROOT', getcwd());
  require_once DRUPAL_ROOT . '/includes/bootstrap.inc';
  require_once DRUPAL_ROOT . '/includes/common.inc';
  drupal_bootstrap(DRUPAL_BOOTSTRAP_FULL);

  // URL, method, payload
  $endpoints = [
    build_endpoint(variable_get('srs_by_cas_number_endpoint', 'https://ends2.epacdxnode.net/RestProxy/query?Node=NGNTest2.0&Dataflow=SRS&Request=GetSubstanceByCAS&Params=CASRegistryNumber|').'108-88-3'),
    build_endpoint(variable_get('srs_by_substance_name_endpoint', 'https://ends2.epa.gov/RestProxy/Query?Node=NGNProd2.0&Dataflow=SRS&Request=GetSubstanceByName&Params=SubstanceName|').'toluene'),
    build_endpoint(variable_get('lrs_substance_list_endpoint', 'https://ofmpub.epa.gov/lrswebservices/v1/SubstanceList')),
    build_endpoint(variable_get('elastic_search_endpoint', 'http://ec2-52-54-71-189.compute-1.amazonaws.com:443/lrs_data_index/_search'), ['header'=>['Content-Type' => 'application/json']]),
    build_endpoint(variable_get('lod_substance_service_endpoint', 'https://opendata.epa.gov/data/substance/').'49021'),
    //build_endpoint(variable_get('elastic_search_program_info_endpoint', 'http://ec2-52-54-71-189.compute-1.amazonaws.com:443/lrs_index/programInfo/_search?pretty'))

  ];

  drupal_set_time_limit(count($endpoints) * 60);

  foreach ($endpoints as $key => $endpoint) {
    test_endpoint($endpoint);
  }

  function build_endpoint($url, $opt = []) {
    return ['url'=>$url, 'options' =>$opt];
  }

  function test_endpoint($endpoint) {
    $response = drupal_http_request($endpoint['url'], $endpoint['options']);

    if ($response->code !== "200") {
      echo "<pre style='color:#e0452a'>";
      print_r([$endpoint, $response]);
      echo "</pre>";
    }
    else {
      echo "<pre style='color:#12a81a'>";
      //print_r([$endpoint, $response]);
      print_r($endpoint);
      echo "</pre>";
    }
  }