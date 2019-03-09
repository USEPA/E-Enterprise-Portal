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
class PermitSearchProxyServiceFilter extends ProxyServiceFilterBase {

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

        // Add the important query information into the payload for processing later
        (!isset($query['all_forms'])) ?: $this->payload['all_forms'][] = trim($query['all_forms']);
        (!isset($query['form_types'])) ?: $this->payload['form_types'][] = trim($query['form_types']);
        (!isset($query['form_status'])) ?: $this->payload['form_status'][] = trim($query['form_status']);


        // get all forms
        if(isset($query['all_forms'])) {
            $form_url = $this->request->getUri() . 'form';
            $form_response = $this->make_request_and_receive_response($form_url);
            $response = json_decode($form_response->getBody(), FALSE);
            $this->payload['all_forms'] = $response;
        }

        // get form_types
        if(isset($query['form_types'])) {
            $form_url = $this->request->getUri() . 'reference/formType';
            $form_response = $this->make_request_and_receive_response($form_url);
            $response = json_decode($form_response->getBody(), FALSE);
            $this->payload['form_types'] = $response;
        }

        // get form_status
        if(isset($query['form_status'])) {
            $form_url = $this->request->getUri() . 'reference/formStatus';
            $form_response = $this->make_request_and_receive_response($form_url);
            $response = json_decode($form_response->getBody(), FALSE);
            $this->payload['form_status'] = $response;
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
        // Build content
        $content = [];

        if($this->payload['all_forms'] != null) {
            $content['all_forms'] = $this->payload['all_forms'];
        }
        if ($this->payload['form_types'] != null) {
            $content['form_types'] = $this->payload['form_types'];
        }
        if ($this->payload['form_status'] != null) {
            $content['form_status'] = $this->payload['form_status'];
        }

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
}
