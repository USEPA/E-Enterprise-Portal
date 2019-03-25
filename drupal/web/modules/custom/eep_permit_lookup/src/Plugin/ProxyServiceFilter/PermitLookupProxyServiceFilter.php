<?php

namespace Drupal\eep_permit_lookup\Plugin\ProxyServiceFilter;

use Drupal\eep_proxy_service\Plugin\ProxyServiceFilterBase;
use GuzzleHttp\Client;
use GuzzleHttp\Psr7\Request;
use GuzzleHttp\Psr7\Response;

/**
 * Class PermitLookupProxyServiceFilter
 *
 * @ProxyServiceFilter(
 *   id = "permitlookup",
 *   label = @Translation("Permit Lookup Filter")
 * )
 *
 * @package Drupal\eep_core\Plugin\ProxyServiceFilter
 */
class PermitLookupProxyServiceFilter extends ProxyServiceFilterBase
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
     * @throws \GuzzleHttp\Exception\GuzzleException
     */
    public function fetch()
    {
        // Get the query values
        $query = $this->getIncomingRequest()->query->all();

        // Shows docs if no queries set (for overall performance)
        if (sizeof($query) > 0) {
            // Register helper queries
            $this->payload = $this->register_helper_queries($this->payload, $query);

            // Register query params
            $this->payload = $this->register_form_query_params($this->payload, $query);

            // Get helper queries if any set (check is for overall performance)
            if (isset($this->payload['helperQueries'])) {
                $this->payload = $this->get_helper_queries($this->payload);
            }
            // Get form query response if any set (check is for overall performance)
            if (isset($this->payload['formQueryParams'])) {
                $this->payload = $this->get_form_query_response($this->payload);
            }
        } else {
            $this->payload['docs'] = $this->get_docs();
        }
    }

    /**
     * @return \GuzzleHttp\Psr7\Response
     */
    public function postfetch()
    {
        // Load final payload into content if not null
        $content = $this->load_payload_into_content($this->payload);

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
     * Loads final payload into content
     * @param $payload
     *
     * @return mixed|\Psr\Http\Message\ResponseInterface
     */
    private function load_payload_into_content($payload)
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
        (!isset($query['issuer'])) ?: $payload['formQueryParams']['issuer'] = trim($query['issuer']);
        (!isset($query['submissionType'])) ?: $payload['formQueryParams']['submissionType'] = trim($query['submissionType']);
        (!isset($query['coverageType'])) ?: $payload['formQueryParams']['coverageType'] = trim($query['coverageType']);
        (!isset($query['coverageStatus'])) ?: $payload['formQueryParams']['coverageStatus'] = trim($query['coverageStatus']);
        (!isset($query['npdesId'])) ?: $payload['formQueryParams']['npdesId'] = trim($query['npdesId']);
        (!isset($query['sector'])) ?: $payload['formQueryParams']['sector'] = trim($query['sector']);
        (!isset($query['subSector'])) ?: $payload['formQueryParams']['subSector'] = trim($query['subSector']);
        (!isset($query['sicCode'])) ?: $payload['formQueryParams']['sicCode'] = trim($query['sicCode']);
        (!isset($query['facilityName'])) ?: $payload['formQueryParams']['facilityName'] = trim($query['facilityName']);
        (!isset($query['facilityAddressLine1'])) ?: $payload['formQueryParams']['facilityAddressLine1'] = trim($query['facilityAddressLine1']);
        (!isset($query['facilityCity'])) ?: $payload['formQueryParams']['facilityCity'] = trim($query['facilityCity']);
        (!isset($query['facilityState'])) ?: $payload['formQueryParams']['facilityState'] = trim($query['facilityState']);
        (!isset($query['facilityZip'])) ?: $payload['formQueryParams']['facilityZip'] = trim($query['facilityZip']);
        (!isset($query['facilityCounty'])) ?: $payload['formQueryParams']['facilityCounty'] = trim($query['facilityCounty']);
        (!isset($query['masterPermitNumber'])) ?: $payload['formQueryParams']['masterPermitNumber'] = trim($query['masterPermitNumber']);
        // Used with CGP
        (!isset($query['projectSiteName'])) ?: $payload['formQueryParams']['projectSiteName'] = trim($query['projectSiteName']);
        (!isset($query['projectCity'])) ?: $payload['formQueryParams']['projectCity'] = trim($query['projectCity']);
        (!isset($query['projectState'])) ?: $payload['formQueryParams']['projectState'] = trim($query['projectState']);
        (!isset($query['projectZip'])) ?: $payload['formQueryParams']['projectZip'] = trim($query['projectZip']);
        (!isset($query['projectCounty'])) ?: $payload['formQueryParams']['projectCounty'] = trim($query['projectCounty']);
        (!isset($query['projectStatus'])) ?: $payload['formQueryParams']['projectStatus'] = trim($query['projectStatus']);
        (!isset($query['applicationType'])) ?: $payload['formQueryParams']['applicationType'] = trim($query['applicationType']);
        // Used with both
        (!isset($query['operatorName'])) ?: $payload['formQueryParams']['operatorName'] = trim($query['operatorName']);
        (!isset($query['federalIndicator'])) ?: $payload['formQueryParams']['federalIndicator'] = trim($query['federalIndicator']);
        (!isset($query['submittedDateFrom'])) ?: $payload['formQueryParams']['submittedDateFrom'] = trim($query['submittedDateFrom']);
        (!isset($query['submittedDateTo'])) ?: $payload['formQueryParams']['submittedDateTo'] = trim($query['submittedDateTo']);
        (!isset($query['updatedDateFrom'])) ?: $payload['formQueryParams']['updatedDateFrom'] = trim($query['updatedDateFrom']);
        (!isset($query['updatedDateTo'])) ?: $payload['formQueryParams']['updatedDateTo'] = trim($query['updatedDateTo']);
        (!isset($query['tribalIndicator'])) ?: $payload['formQueryParams']['tribalIndicator'] = trim($query['tribalIndicator']);
        (!isset($query['tribalName'])) ?: $payload['formQueryParams']['tribalName'] = trim($query['tribalName']);

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
                array_push($parameters, $param_key . '=' . rawurlencode($parameter));
            }

            // Removes query params from response for naming purposes when loading queries into content
            unset($payload['formQueryParams']);

            // Sets query parameters in url string
            $form_url = $this->request->getUri() . 'form?' . implode('&', $parameters);

            // Sets response based on request and JSON decodes
            $form_response = $this->make_request_and_receive_response($form_url);
            $response = json_decode($form_response->getBody(), FALSE);

            // Sets formQueryResponse in the payload
            $payload['formQueryResponse'] = $response;
        }
        return $payload;
    }

    /**
     * Register helper queries
     * @param $payload
     * @param $query
     *
     * @return mixed|\Psr\Http\Message\ResponseInterface
     */
    private function register_helper_queries($payload, $query)
    {
        // Add the important query information into the payload for processing later
        (!isset($query['allForms'])) ?: $payload['helperQueries']['allForms'][] = trim($query['allForms']);
        (!isset($query['formTypes'])) ?: $payload['helperQueries']['formTypes'][] = trim($query['formTypes']);
        (!isset($query['coverageTypes'])) ?: $payload['helperQueries']['coverageTypes'][] = trim($query['coverageTypes']);
        (!isset($query['submissionTypes'])) ?: $payload['helperQueries']['submissionTypes'][] = trim($query['submissionTypes']);
        (!isset($query['coverageStatuses'])) ?: $payload['helperQueries']['coverageStatuses'][] = trim($query['coverageStatuses']);
        (!isset($query['issuers'])) ?: $payload['helperQueries']['issuers'][] = trim($query['issuers']);
        (!isset($query['formStatuses'])) ?: $payload['helperQueries']['formStatuses'][] = trim($query['formStatuses']);
        (!isset($query['msgpDownloadUrlBase'])) ?: $payload['helperQueries']['msgpDownloadUrlBase'][] = trim($query['msgpDownloadUrlBase']);
        (!isset($query['cgpDownloadUrlBase'])) ?: $payload['helperQueries']['cgpDownloadUrlBase'][] = trim($query['cgpDownloadUrlBase']);
        (!isset($query['sics'])) ?: $payload['helperQueries']['sics'][] = trim($query['sics']);
        // oeca-services with no parameters
        (!isset($query['sectors'])) ?: $payload['helperQueries']['oecaSvc']['sectors'][] = trim($query['sectors']);
        (!isset($query['states'])) ?: $payload['helperQueries']['oecaSvc']['states'][] = trim($query['states']);
        (!isset($query['tribes'])) ?: $payload['helperQueries']['oecaSvc']['tribes'][] = trim($query['tribes']);
        // oeca-services with parameters
        (!isset($query['counties'])) ?: $payload['helperQueries']['oecaSvcWithParams']['counties'][] = trim($query['counties']);
        (!isset($query['subsectors'])) ?: $payload['helperQueries']['oecaSvcWithParams']['subsectors'][] = trim($query['subsectors']);

        // docs
        (!isset($query['docs'])) ?: $payload['helperQueries']['docs'][] = trim($query['docs']);
        return $payload;
    }

    /**
     * Gets helper queries
     * @param $payload
     *
     * @return mixed|\Psr\Http\Message\ResponseInterface
     * @throws \GuzzleHttp\Exception\GuzzleException
     */
    private function get_helper_queries($payload)
    {
        // Get all forms
        if (isset($payload['helperQueries']['allForms'])) {
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
            $payload['helperQueryResponse']['allForms'] = $response;
        }

        // Get msgpDownloadUrlBase
        if (isset($payload['helperQueries']['msgpDownloadUrlBase'])) {
            $msgpDownloadUrlBase = $this->request->getUri() . '';
            $payload['helperQueryResponse']['msgpDownloadUrlBase'] = $msgpDownloadUrlBase;
        }

        // Get cgpDownloadUrlBase
        if (isset($payload['helperQueries']['cgpDownloadUrlBase'])) {
            $cgpDownloadUrlBase = $this->request->getUri() . '';
            $payload['helperQueryResponse']['cgpDownloadUrlBase'] = $cgpDownloadUrlBase;
        }

        // Get formTypes
        if (isset($payload['helperQueries']['formTypes'])) {
            $form_url = $this->request->getUri() . 'reference/formType';
            $form_response = $this->make_request_and_receive_response($form_url);
            $response = json_decode($form_response->getBody(), FALSE);
            $payload['helperQueryResponse']['formTypes'] = $response;
        }

        // Get coverageTypes
        if (isset($payload['helperQueries']['coverageTypes'])) {
            $form_url = $this->request->getUri() . 'reference/coverageTypes';
            $form_response = $this->make_request_and_receive_response($form_url);
            $response = json_decode($form_response->getBody(), FALSE);
            $payload['helperQueryResponse']['coverageTypes'] = $response;
        }

        // Get submissionTypes
        if (isset($payload['helperQueries']['submissionTypes'])) {
            $form_url = $this->request->getUri() . 'reference/submissionTypes';
            $form_response = $this->make_request_and_receive_response($form_url);
            $response = json_decode($form_response->getBody(), FALSE);
            $payload['helperQueryResponse']['submissionTypes'] = $response;
        }

        // Get issuers
        if (isset($payload['helperQueries']['issuers'])) {
            $form_url = $this->request->getUri() . 'reference/issuers';
            $form_response = $this->make_request_and_receive_response($form_url);
            $response = json_decode($form_response->getBody(), FALSE);
            $payload['helperQueryResponse']['issuers'] = $response;
        }

        // Get formStatuses
        if (isset($payload['helperQueries']['formStatuses'])) {
            $form_url = $this->request->getUri() . 'reference/formStatus';
            $form_response = $this->make_request_and_receive_response($form_url);
            $response = json_decode($form_response->getBody(), FALSE);
            $payload['helperQueryResponse']['formStatuses'] = $response;
        }

        // Get coverageStatuses
        if (isset($payload['helperQueries']['coverageStatuses'])) {
            $form_url = $this->request->getUri() . 'reference/coverageStatus';
            $form_response = $this->make_request_and_receive_response($form_url);
            $response = json_decode($form_response->getBody(), FALSE);
            $payload['helperQueryResponse']['coverageStatuses'] = $response;
        }

        // Get oecaSvcs
        if (isset($payload['helperQueries']['oecaSvc'])) {
            $form_responses = array();
            foreach ($payload['helperQueries']['oecaSvc'] as $oeca_svc_key => $oeca_svc_value) {
                $form_url = $this->request->getUri() . $oeca_svc_key;
                $form_response = $this->make_request_and_receive_response($form_url);
                $response = json_decode($form_response->getBody(), FALSE);
                array_push($form_responses, $response);
            }
            $response = $form_responses;
            $payload['helperQueryResponse']['oecaSvc'] = $response;
        }

        // Get oecaSvcs with parameters
        if (isset($payload['helperQueries']['oecaSvcWithParams'])) {
            $form_responses = array();
            foreach ($payload['helperQueries']['oecaSvcWithParams'] as $oeca_svc_key => $oeca_svc_param) {
                $form_url = $this->request->getUri() . $oeca_svc_key . '/' . $oeca_svc_param[0];
                $form_response = $this->make_request_and_receive_response($form_url);
                $response = json_decode($form_response->getBody(), FALSE);
                array_push($form_responses, $response);
            }
            $response = $form_responses;
            $payload['helperQueryResponse']['oecaSvcWithParams'] = $response;
        }

        // Get docs
        if (isset($payload['helperQueries']['docs'])) {
            $payload['helperQueryResponse']['docs'] = $this->get_docs();
        }

        // Removes query params from response for naming purposes when loading queries into content
        unset($payload['helperQueries']);

        return $payload;
    }

    /**
     * Gets documentation
     */
    private function get_docs()
    {
        $docs_string = file_get_contents(__DIR__ . '/../../../docs/eep_permit_lookup_docs.json');
        return \GuzzleHttp\json_decode($docs_string);
    }
}
