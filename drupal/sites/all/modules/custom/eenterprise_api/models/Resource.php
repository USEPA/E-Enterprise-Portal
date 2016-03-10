<?php

/**
 * @SWG\Definition(
 *   required={"nid","title", "resource", "topic", "url"},
 *   )
 * )
 */

class Resource
{
    /**
     * @SWG\Property(type="string")
     */
    public $title;
    /**
     * @SWG\Property(type="string")
     */
    public $resource;
    /**
     * @SWG\Property(type="string")
     */
    public $url;
    /**
     * @SWG\Property(type="string")
     */
    public $topic;
    /**
     * @SWG\Property(type="integer", format="int64")
     */
    public $nid;



}