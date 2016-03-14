<?php
/**
 * Created by PhpStorm.
 * User: bmatkin
 * Date: 3/9/2016
 * Time: 2:23 PM
 */
require_once 'API.php';


class MyAPI extends API
{

    public function __construct($request, $origin) {
        parent::__construct($request);
    }


    protected function resources() {
        if ($this->method == 'GET') {
            if (isset($this->args[0]))
             $args = '?args[0]=' . $this->args[0] . "&";
            else
                $args = "?";

            $host = $_SERVER['HTTP_HOST'];
            $htt = $_SERVER['HTTPS'];
            if (isset($htt))
                $htt = 'https://';
            else
                $htt = 'http://';
            $api_v = str_replace(".", "_", API_VERSION);
            $request = $htt . $host . "/api_" . $api_v . "_engine/" . $this->endpoint . "." . $this->ext .  $args . $this->query;
            if ($this->ext == 'xml')
                return $this->printXMLPage($request);
            else
                return drupal_http_request($request)->data;

        } else {
            return "Only accepts GET requests";
        }
    }
}