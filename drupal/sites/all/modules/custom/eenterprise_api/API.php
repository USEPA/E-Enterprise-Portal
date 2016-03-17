<?php

/**
 * Created by PhpStorm.
 * User: bmatkin
 * Date: 3/9/2016
 * Time: 2:12 PM
 */
abstract class API
{
    /**
     * Property: method
     * The HTTP method this request was made in, either GET, POST, PUT or DELETE
     */
    protected $method = '';
    /**
     * Property: endpoint
     * The Model requested in the URI. eg: /files
     */
    protected $endpoint = '';
    /**
     * Property: verb
     * An optional additional descriptor about the endpoint, used for things that can
     * not be handled by the basic methods. eg: /files/process
     */
    protected $verb = '';
    /**
     * Property: args
     * Any additional URI components after the endpoint and verb have been removed, in our
     * case, an integer ID for the resource. eg: /<endpoint>/<verb>/<arg0>/<arg1>
     * or /<endpoint>/<arg0>
     */
    protected $args = Array();
    /**
     * Property: file
     * Stores the input of the PUT request
     */
    protected $file = Null;


    protected $ext = "json";
    protected $query = "";
    protected $sort_type = "ASC";
    protected $sort_by = "";

    /**
     * Constructor: __construct
     * Allow for CORS, assemble and pre-process the data
     */
    public function __construct($request)
    {

        $this->_setExtension($request);

        // Extract possible query params

        if (strpos($request, "?"))
            $this->query = substr($request, strpos($request, "?") + 1);

            $accepted_base_paths = array('', 'api', API_VERSION);
        $this->_attachHeaders($this->ext);
        $this->args = explode('/', rtrim($request, '/'));
        while (in_array($this->args[0], $accepted_base_paths)) {
            array_shift($this->args);
        }

        $this->endpoint = array_shift($this->args);
        // Clean endpoint
        // remove any extension
        if (strpos($this->endpoint, "."))
            $this->endpoint = substr($this->endpoint, 0, strpos($this->endpoint, "."));
        // remove any query params
        if (strpos($this->endpoint, "?"))
            $this->endpoint = substr($this->endpoint, 0, strpos($this->endpoint, "?"));

        // Clean arguments
        if (array_key_exists(0, $this->args)) {
            // Remove possible extension from argument place
            $temp_arg = $this->args[0];
            if (strpos($temp_arg, ".")) {
                $temp_arg = substr($temp_arg, 0, strpos($temp_arg, "."));
                $this->args[0] = $temp_arg;
            }

            if (!is_numeric($this->args[0]))
                $this->verb = array_shift($this->args);
        }

        $this->method = $_SERVER['REQUEST_METHOD'];
        if ($this->method == 'POST' && array_key_exists('HTTP_X_HTTP_METHOD', $_SERVER)) {
            if ($_SERVER['HTTP_X_HTTP_METHOD'] == 'DELETE')
                $this->method = 'DELETE';
            else if ($_SERVER['HTTP_X_HTTP_METHOD'] == 'PUT')
                $this->method = 'PUT';
            else
                throw new Exception("Unexpected Header");
        }

        switch ($this->method) {
            case 'DELETE':
            case 'POST':
                $this->request = $this->_cleanInputs($_POST);
                break;
            case 'GET':
                $this->request = $this->_cleanInputs($_GET);
                break;
            case 'PUT':
                $this->request = $this->_cleanInputs($_GET);
                $this->file = file_get_contents("php://input");
                break;
            default:
                $this->_response('Invalid Method', 405);
                break;
        }
    }


    public function processAPI()
    {
        if (method_exists($this, $this->endpoint))
            return $this->_response($this->{$this->endpoint}($this->args));
        else
            return $this->_response("No Endpoint: $this->endpoint", 404);
    }


    private function _setExtension($request_str)
    {
        // Read extension and remove query
        if ($ext = pathinfo($request_str, PATHINFO_EXTENSION)) {
            if (strpos($ext, "?"))
                $ext = substr($ext, 0, strpos($ext, "?"));
        }
        $headers = getallheaders();
        if ($headers['Accept'] == 'application/xml')
            $ext = "xml";
        else if ($headers['Accept'] == 'application/json')
            $ext = "json";
        if ($ext == "")
            $ext = "json";
        $this->ext = $ext;
    }

    private function _response($data, $status = 200)
    {
        header("HTTP/1.1 " . $status . " " . $this->_requestStatus($status));
        return $data;
    }

    private function _cleanInputs($data)
    {
        $clean_input = Array();
        if (is_array($data)) {
            foreach ($data as $k => $v) {
                $clean_input[$k] = $this->_cleanInputs($v);
            }
        } else {
            $clean_input = trim(strip_tags($data));
        }
        return $clean_input;
    }

    private function _requestStatus($code)
    {
        $status = array(
            200 => 'OK',
            404 => 'Not Found',
            405 => 'Method Not Allowed',
            500 => 'Internal Server Error',
        );
        return ($status[$code]) ? $status[$code] : $status[500];
    }

    private function _attachHeaders($ext)
    {
        if (!headers_sent()) { // Clear previously set headers
            foreach (headers_list() as $header)
                header_remove($header);
        }
        header("Access-Control-Allow-Orgin: *");
        header("Access-Control-Allow-Methods: *");
        switch ($ext) {
            case "json":
                header('Content-Type: application/json, charset=utf-8');
                break;
            case "xml":
                header('Content-Type: application/xml; charset=utf-8');
                break;
            default:
                exit("Currently $ext is not accepted.");
                break;
        }
    }

    public function printXMLPage($path)
    {
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $path);
        curl_setopt($ch, CURLOPT_FAILONERROR, 1);
        curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($ch, CURLOPT_TIMEOUT, 15);
        $retValue = curl_exec($ch);
        curl_close($ch);
        $oXML = new SimpleXMLElement($retValue);
        try {
            echo $oXML->asXML();
        }
        catch (Exception $e) {
            var_dump($e);
        }
    }

}
