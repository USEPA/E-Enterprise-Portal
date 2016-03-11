<?php

class ResourceWithDocsController
{

    /**
     * @SWG\Get(
     *     path="/resources/{id}",
     *     description="Returns a resource based on a single ID",
     *     operationId="findResourceById",
     *     @SWG\Parameter(
     *         description="ID of resource to fetch",
     *         format="int64",
     *         in="path",
     *         name="id",
     *         required=true,
     *         type="integer"
     *     ),
     *     produces={
     *         "application/json",
     *         "application/xml",
     *         "text/html",
     *         "text/xml"
     *     },
     *     @SWG\Response(
     *         response=200,
     *         description="resource response",
     *         @SWG\Schema(ref="#/definitions/Resource")
     *     ),
     *     @SWG\Response(
     *         response="default",
     *         description="unexpected error",
     *         @SWG\Schema(ref="#/definitions/ErrorModel")
     *     )
     * )
     */
    public function findResourceById()
    {
    }
    /**
     * @SWG\Get(
     *     path="/resources",
     *     description="Returns all resources from the system that the user has access to",
     *     operationId="findResources",
     *     produces={"application/json", "application/xml", "text/xml", "text/html"},
     *     @SWG\Parameter(
     *         name="limit",
     *         in="query",
     *         description="Limit items returned per request",
     *         required=false,
     *         type="integer",
     *         format="int32"
     *     ),
     *     @SWG\Parameter(
     *         name="page",
     *         in="query",
     *         description="page number if using pagination",
     *         required=false,
     *         type="integer",
     *         format="int32"
     *     ),
     *     @SWG\Response(
     *         response=200,
     *         description="resource response",
     *         @SWG\Schema(
     *             type="array",
     *             @SWG\Items(ref="#/definitions/Resource")
     *         ),
     *     ),
     *     @SWG\Response(
     *         response="default",
     *         description="unexpected error",
     *         @SWG\Schema(
     *             ref="#/definitions/ErrorModel"
     *         )
     *     ),
     * )
     */
    public function findResources()
    {
    }

}
