<?php

/**
 * @file
 * Contains EEnterpriseAPILGCResources__0_1.
 */


/**
 * Implements RestfulEntityBaseNode class for the "artist" content type.
 */
class EEnterpriseAPILGCResources extends \Drupal\restful\Plugin\resource\ResourceNode {

    /**
     * Overrides RestfulEntityBaseNode::publicFieldsInfo().
     */
    public function publicFieldsInfo() {
        $public_fields = parent::publicFields();

        $public_fields['title'] = array(
            'property' => 'title',
        );

        return $public_fields;
    }
}
