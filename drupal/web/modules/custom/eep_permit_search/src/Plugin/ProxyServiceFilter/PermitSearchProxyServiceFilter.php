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

        // Default response
        $response = 'no response';

        // Add the important query information into the payload for processing later
        (!isset($query['allForms'])) ?: $this->payload['allForms'][] = trim($query['allForms']);
        (!isset($query['formTypes'])) ?: $this->payload['formTypes'][] = trim($query['formTypes']);
        (!isset($query['formStatuses'])) ?: $this->payload['formStatuses'][] = trim($query['formStatuses']);
        (!isset($query['docs'])) ?: $this->payload['docs'][] = trim($query['docs']);

        /**
         *  Add form param(s) from query(s) to form query results
         */
        // Used with MSGP
        if (isset($query['issuer'])) {
            $this->payload['formQueryParams']['issuer'] = trim($query['issuer']);
        }
        if (isset($query['submissionType'])) {
            $this->payload['formQueryParams']['submissionType'] = trim($query['submissionType']);
        }
        if (isset($query['coverageType'])) {
            $this->payload['formQueryParams']['coverageType'] = trim($query['coverageType']);
        }
        if (isset($query['coverageStatus'])) {
            $this->payload['formQueryParams']['coverageStatus'] = trim($query['coverageStatus']);
        }
        if (isset($query['npdesId'])) {
            $this->payload['formQueryParams']['npdesId'] = trim($query['npdesId']);
        }
        if (isset($query['sector'])) {
            $this->payload['formQueryParams']['sector'] = trim($query['sector']);
        }
        if (isset($query['subSector'])) {
            $this->payload['formQueryParams']['subSector'] = trim($query['subSector']);
        }
        if (isset($query['sicCode'])) {
            $this->payload['formQueryParams']['sicCode'] = trim($query['sicCode']);
        }
        if (isset($query['facilityName'])) {
            $this->payload['formQueryParams']['facilityName'] = trim($query['facilityName']);
        }
        if (isset($query['facilityAddressLine1'])) {
            $this->payload['formQueryParams']['facilityAddressLine1'] = trim($query['facilityAddressLine1']);
        }
        if (isset($query['facilityCity'])) {
            $this->payload['formQueryParams']['facilityCity'] = trim($query['facilityCity']);
        }
        if (isset($query['facilityState'])) {
            $this->payload['formQueryParams']['facilityState'] = trim($query['facilityState']);
        }
        if (isset($query['facilityZip'])) {
            $this->payload['formQueryParams']['facilityZip'] = trim($query['facilityZip']);
        }
        if (isset($query['facilityCounty'])) {
            $this->payload['formQueryParams']['facilityCounty'] = trim($query['facilityCounty']);
        }
        if (isset($query['masterPermitNumber'])) {
            $this->payload['formQueryParams']['masterPermitNumber'] = trim($query['masterPermitNumber']);
        }
        // Used with CGP
        if (isset($query['projectSiteName'])) {
            $this->payload['formQueryParams']['projectSiteName'] = trim($query['projectSiteName']);
        }
        if (isset($query['projectCity'])) {
            $this->payload['formQueryParams']['projectCity'] = trim($query['projectCity']);
        }
        if (isset($query['projectState'])) {
            $this->payload['formQueryParams']['projectState'] = trim($query['projectState']);
        }
        if (isset($query['projectZip'])) {
            $this->payload['formQueryParams']['projectZip'] = trim($query['projectZip']);
        }
        if (isset($query['projectCounty'])) {
            $this->payload['formQueryParams']['projectCounty'] = trim($query['projectCounty']);
        }
        if (isset($query['projectStatus'])) {
            $this->payload['formQueryParams']['projectStatus'] = trim($query['projectStatus']);
        }
        if (isset($query['applicationType'])) {
            $this->payload['formQueryParams']['applicationType'] = trim($query['applicationType']);
        }
        // Used with both
        if (isset($query['operatorName'])) {
            $this->payload['formQueryParams']['operatorName'] = trim($query['operatorName']);
        }
        if (isset($query['federalIndicator'])) {
            $this->payload['formQueryParams']['federalIndicator'] = trim($query['federalIndicator']);
        }
        if (isset($query['submittedDateFrom'])) {
            $this->payload['formQueryParams']['submittedDateFrom'] = trim($query['submittedDateFrom']);
        }
        if (isset($query['submittedDateTo'])) {
            $this->payload['formQueryParams']['submittedDateTo'] = trim($query['submittedDateTo']);
        }
        if (isset($query['updatedFrom'])) {
            $this->payload['formQueryParams']['updatedFrom'] = trim($query['updatedFrom']);
        }
        if (isset($query['updatedTo'])) {
            $this->payload['formQueryParams']['updatedTo'] = trim($query['updatedTo']);
        }
        if (isset($query['tribalIndicator'])) {
            $this->payload['formQueryParams']['tribalIndicator'] = trim($query['tribalIndicator']);
        }
        if (isset($query['tribalName'])) {
            $this->payload['formQueryParams']['tribalName'] = trim($query['tribalName']);
        }

        // Get form by params
        if (isset($this->payload['formQueryParams'])) {
            // Creates array of parameters based on
            $parameters = [];
            foreach ($this->payload['formQueryParams'] as $param_key => $parameter) {
                array_push($parameters, $param_key . '=' . $parameter);
            }

            // Removes query params from response for naming purposes when loading queries into content
            unset($this->payload['formQueryParams']);

            // Replaces spaces with %20 in url string
            $form_url_raw = $this->request->getUri() . 'form?' . implode('&', $parameters);
            $form_url_cleaned = preg_replace('/\s+/', '%20', $form_url_raw);

            // Sets response based on request and JSON decodes
            $form_response = $this->make_request_and_receive_response($form_url_cleaned);
            $response = json_decode($form_response->getBody(), FALSE);

            // Sets formQueryResponse in the payload
            $this->payload['formQueryResponse'] = $response;
        }

        // Get all forms
        if (isset($this->payload['allForms'])) {
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
            $this->payload['allForms'] = $response;
        }

        // Get formTypes
        if (isset($this->payload['formTypes'])) {
            $form_url = $this->request->getUri() . 'reference/formType';
            $form_response = $this->make_request_and_receive_response($form_url);
            $response = json_decode($form_response->getBody(), FALSE);
            $this->payload['formTypes'] = $response;
        }

        // Get formStatuses
        if (isset($this->payload['formStatuses'])) {
            $form_url = $this->request->getUri() . 'reference/formStatus';
            $form_response = $this->make_request_and_receive_response($form_url);
            $response = json_decode($form_response->getBody(), FALSE);
            $this->payload['formStatuses'] = $response;
        }

        // Get docs
        if (isset($this->payload['docs'])) {
            $this->payload['docs'] = $this->get_docs();
        }

        return $response;
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
     * @todo replace with Proxy Service call
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

    private function get_docs()
    {
        $docs_string = file_get_contents(__DIR__ . '/../../../docs/eep_permit_search_docs.json');
        return \GuzzleHttp\json_decode($docs_string);
    }
}
