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

    /**
     * Example of an Endpoint
     */
    protected function example() {
        if ($this->method == 'GET') {
            return "Your name is " . $this->User->name;
        } else {
            return "Only accepts GET requests";
        }
    }

    protected function resources() {
        if ($this->method == 'GET') {
            $args = '?args[0]=' . $this->args[0];
            $host = $_SERVER['HTTP_HOST'];
            $htt = $_SERVER['HTTPS'];
            if (isset($htt))
                $htt = 'https://';
            else
                $htt = 'http://';
            $request = $htt . $host . "/api/1.0/" . $this->endpoint . '.json' . $args;
            return json_decode(drupal_http_request($request)->data);
        } else {
            return "Only accepts GET requests";
        }
    }
}