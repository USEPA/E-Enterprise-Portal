<?php

namespace Drupal\eep_permit_search\Plugin\ProxyServiceFilter;

use Drupal\eep_proxy_service\Plugin\ProxyServiceFilterBase;
use GuzzleHttp\Client;
use GuzzleHttp\Psr7\Stream;
use GuzzleHttp\Psr7\Request;
use GuzzleHttp\Psr7\Response;

/**
 * Class PermitSearchProxyServiceFilter
 *
 * @ProxyServiceFilter(
 *   id = "permitsearch",
 *   label = @Translation("Permit Search Filter")
 * )
 *
 * @package Drupal\eep_core\Plugin\ProxyServiceFilter
 */
class PermitSearchProxyServiceFilter extends ProxyServiceFilterBase
{

    /**
     * MUST override this function to prevent the default behavior
     *
     * @return mixed
     */
    public function prefetch()
    {
        return $this->request;
    }

    /**
     * @return \GuzzleHttp\Psr7\Response
     */
    public function fetch()
    {
        // Get the query values
        $query = $this->getIncomingRequest()->query->all();

        // Register utility queries
        $this->payload = $this->register_utility_queries($this->payload, $query);

        // Get utility queries
        $this->payload = $this->get_utility_queries($this->payload);

        // Register query params
        $this->payload = $this->register_form_query_params($this->payload, $query);

        // Get form query response
        $this->payload = $this->get_form_query_response($this->payload);
    }

    /**
     * @param \GuzzleHttp\Psr7\Response $response
     *
     * @return \GuzzleHttp\Psr7\Response
     */
    public function postfetch()
    {
        // Load query responses into content if not null
        $content = $this->load_queries_into_content($this->payload);

        $final_content = \GuzzleHttp\json_encode($content);

        // Update the response
        $this->response = new Response(
            200,
            ['Content-Type' => ['application/json']],
            $final_content
        );
        return $this->response;
    }

    /**
     *
     * @param $request_url
     *
     * @return mixed|\Psr\Http\Message\ResponseInterface
     * @throws \GuzzleHttp\Exception\GuzzleException
     */
    private function make_request_and_receive_response($request_url)
    {
        $guzzle_request = new Request(
            'GET',
            $request_url,
            [
                'Accept' => 'application/json',
            ]
        );
        $guzzle_client = new Client();
        return $guzzle_client->send($guzzle_request, [
            'timeout' => 600,
            'http_errors' => FALSE,
        ]);
    }

    /**
     *
     * @param $payload
     *
     * @return mixed|\Psr\Http\Message\ResponseInterface
     */
    private function load_queries_into_content($payload)
    {
        $content = [];
        foreach ($payload as $query_name => $query_value) {
            if ($payload[$query_name] != null) {
                $content[$query_name] = $payload[$query_name];
            }
        }
        return $content;
    }

    /**
     * Add form param(s) from query(s) to form query results
     * @param $payload
     * @param $query
     *
     * @return mixed|\Psr\Http\Message\ResponseInterface
     */
    private function register_form_query_params($payload, $query)
    {
        // Used with MSGP
        if (isset($query['issuer'])) {
            $payload['formQueryParams']['issuer'] = trim($query['issuer']);
        }
        if (isset($query['submissionType'])) {
            $payload['formQueryParams']['submissionType'] = trim($query['submissionType']);
        }
        if (isset($query['coverageType'])) {
            $payload['formQueryParams']['coverageType'] = trim($query['coverageType']);
        }
        if (isset($query['coverageStatus'])) {
            $payload['formQueryParams']['coverageStatus'] = trim($query['coverageStatus']);
        }
        if (isset($query['npdesId'])) {
            $payload['formQueryParams']['npdesId'] = trim($query['npdesId']);
        }
        if (isset($query['sector'])) {
            $payload['formQueryParams']['sector'] = trim($query['sector']);
        }
        if (isset($query['subSector'])) {
            $payload['formQueryParams']['subSector'] = trim($query['subSector']);
        }
        if (isset($query['sicCode'])) {
            $payload['formQueryParams']['sicCode'] = trim($query['sicCode']);
        }
        if (isset($query['facilityName'])) {
            $payload['formQueryParams']['facilityName'] = trim($query['facilityName']);
        }
        if (isset($query['facilityAddressLine1'])) {
            $payload['formQueryParams']['facilityAddressLine1'] = trim($query['facilityAddressLine1']);
        }
        if (isset($query['facilityCity'])) {
            $payload['formQueryParams']['facilityCity'] = trim($query['facilityCity']);
        }
        if (isset($query['facilityState'])) {
            $payload['formQueryParams']['facilityState'] = trim($query['facilityState']);
        }
        if (isset($query['facilityZip'])) {
            $payload['formQueryParams']['facilityZip'] = trim($query['facilityZip']);
        }
        if (isset($query['facilityCounty'])) {
            $payload['formQueryParams']['facilityCounty'] = trim($query['facilityCounty']);
        }
        if (isset($query['masterPermitNumber'])) {
            $payload['formQueryParams']['masterPermitNumber'] = trim($query['masterPermitNumber']);
        }
        // Used with CGP
        if (isset($query['projectSiteName'])) {
            $payload['formQueryParams']['projectSiteName'] = trim($query['projectSiteName']);
        }
        if (isset($query['projectCity'])) {
            $payload['formQueryParams']['projectCity'] = trim($query['projectCity']);
        }
        if (isset($query['projectState'])) {
            $payload['formQueryParams']['projectState'] = trim($query['projectState']);
        }
        if (isset($query['projectZip'])) {
            $payload['formQueryParams']['projectZip'] = trim($query['projectZip']);
        }
        if (isset($query['projectCounty'])) {
            $payload['formQueryParams']['projectCounty'] = trim($query['projectCounty']);
        }
        if (isset($query['projectStatus'])) {
            $payload['formQueryParams']['projectStatus'] = trim($query['projectStatus']);
        }
        if (isset($query['applicationType'])) {
            $payload['formQueryParams']['applicationType'] = trim($query['applicationType']);
        }
        // Used with both
        if (isset($query['operatorName'])) {
            $payload['formQueryParams']['operatorName'] = trim($query['operatorName']);
        }
        if (isset($query['federalIndicator'])) {
            $payload['formQueryParams']['federalIndicator'] = trim($query['federalIndicator']);
        }
        if (isset($query['submittedDateFrom'])) {
            $payload['formQueryParams']['submittedDateFrom'] = trim($query['submittedDateFrom']);
        }
        if (isset($query['submittedDateTo'])) {
            $payload['formQueryParams']['submittedDateTo'] = trim($query['submittedDateTo']);
        }
        if (isset($query['updatedFrom'])) {
            $payload['formQueryParams']['updatedFrom'] = trim($query['updatedFrom']);
        }
        if (isset($query['updatedTo'])) {
            $payload['formQueryParams']['updatedTo'] = trim($query['updatedTo']);
        }
        if (isset($query['tribalIndicator'])) {
            $payload['formQueryParams']['tribalIndicator'] = trim($query['tribalIndicator']);
        }
        if (isset($query['tribalName'])) {
            $payload['formQueryParams']['tribalName'] = trim($query['tribalName']);
        }
        return $payload;
    }

    /**
     * Gets the response using params
     * @param $payload
     *
     * @return mixed|\Psr\Http\Message\ResponseInterface
     * @throws \GuzzleHttp\Exception\GuzzleException
     */
    private function get_form_query_response($payload)
    {
        if (isset($payload['formQueryParams'])) {
            // Creates array of parameters based on
            $parameters = [];
            foreach ($payload['formQueryParams'] as $param_key => $parameter) {
                array_push($parameters, $param_key . '=' . $parameter);
            }

            // Removes query params from response for naming purposes when loading queries into content
            unset($payload['formQueryParams']);

            // Replaces spaces with %20 in url string
            $form_url_raw = $this->request->getUri() . 'form?' . implode('&', $parameters);
            $form_url_cleaned = preg_replace('/\s+/', '%20', $form_url_raw);

            // Sets response based on request and JSON decodes
            $form_response = $this->make_request_and_receive_response($form_url_cleaned);
            $response = json_decode($form_response->getBody(), FALSE);

            // Sets formQueryResponse in the payload
            $payload['formQueryResponse'] = $response;
        }
        return $payload;
    }

    /**
     * Register utility queries
     * @param $payload
     * @param $query
     *
     * @return mixed|\Psr\Http\Message\ResponseInterface
     * @throws \GuzzleHttp\Exception\GuzzleException
     */
    private function register_utility_queries($payload, $query)
    {
        // Add the important query information into the payload for processing later
        (!isset($query['allForms'])) ?: $payload['allForms'][] = trim($query['allForms']);
        (!isset($query['formTypes'])) ?: $payload['formTypes'][] = trim($query['formTypes']);
        (!isset($query['formStatuses'])) ?: $payload['formStatuses'][] = trim($query['formStatuses']);
        (!isset($query['docs'])) ?: $payload['docs'][] = trim($query['docs']);
        return $payload;
    }

    /**
     * Gets utility queries
     * @param $payload
     *
     * @return mixed|\Psr\Http\Message\ResponseInterface
     * @throws \GuzzleHttp\Exception\GuzzleException
     */
    private function get_utility_queries($payload)
    {
        // Get all forms
        if (isset($payload['allForms'])) {
            /**
             * @TODO determine if loading all forms is allowable
             *
             * This tried to load all forms and breaks currently
             *
             * $form_url = $this->request->getUri() . 'form';
             * $form_response = $this->make_request_and_receive_response($form_url);
             * $response = json_decode($form_response->getBody(), FALSE);
             */
            $response = 'Unable to process retrieval of all forms at this time.';
            $payload['allForms'] = $response;
        }

        // Get formTypes
        if (isset($payload['formTypes'])) {
            $form_url = $this->request->getUri() . 'reference/formType';
            $form_response = $this->make_request_and_receive_response($form_url);
            $response = json_decode($form_response->getBody(), FALSE);
            $payload['formTypes'] = $response;
        }

        // Get formStatuses
        if (isset($payload['formStatuses'])) {
            $form_url = $this->request->getUri() . 'reference/formStatus';
            $form_response = $this->make_request_and_receive_response($form_url);
            $response = json_decode($form_response->getBody(), FALSE);
            $payload['formStatuses'] = $response;
        }

        // Get docs
        if (isset($payload['docs'])) {
            $payload['docs'] = $this->get_docs();
        }
        return $payload;
    }

    /**
     * Gets documentation
     */
    private function get_docs()
    {
        $docs_string = file_get_contents(__DIR__ . '/../../../docs/eep_permit_search_docs.json');
        return \GuzzleHttp\json_decode($docs_string);
    }
}
