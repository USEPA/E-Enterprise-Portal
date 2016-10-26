<?php
/**
 * @file
 * workbench_header.features.uuid_node.inc
 */

/**
 * Implements hook_uuid_features_default_content().
 */
function workbench_header_uuid_features_default_content() {
  $nodes = array();

  $nodes[] = array(
  'title' => 'About the E-Enterprise Portal',
  'log' => '',
  'status' => 1,
  'comment' => 0,
  'promote' => 0,
  'sticky' => 0,
  'type' => 'page',
  'language' => 'und',
  'created' => 1470839052,
  'tnid' => 0,
  'translate' => 0,
  'uuid' => '92bc53bc-ad8a-43a6-96d0-b722b034f0db',
  'body' => array(
    'und' => array(
      0 => array(
        'value' => '<p>The E-Enterprise for the Environment Portal is a new user-friendly web platform that will modernize the way the public, regulated community, and environmental co-regulators conduct environmental transactions and access web resources. EPA is working with states and tribes to develop an interoperable portal integrating data and functionality over time to create a dynamic tool for collaboration and innovation.</p><p>The E-Enterprise for the Environment Portal will:</p><ul><li>Decrease the time and effort needed to perform transactions with EPA, tribal, state, and local governments</li><li>Provide a more consistent way for environmental agencies to interact with regulated entities and the public</li><li>Allow the regulated community and the public to discover the information that is important to them</li></ul>',
        'summary' => '',
        'format' => 'full_html',
        'safe_summary' => '',
      ),
    ),
  ),
  'rdf_mapping' => array(
    'rdftype' => array(
      0 => 'foaf:Document',
    ),
    'title' => array(
      'predicates' => array(
        0 => 'dc:title',
      ),
    ),
    'created' => array(
      'predicates' => array(
        0 => 'dc:date',
        1 => 'dc:created',
      ),
      'datatype' => 'xsd:dateTime',
      'callback' => 'date_iso8601',
    ),
    'changed' => array(
      'predicates' => array(
        0 => 'dc:modified',
      ),
      'datatype' => 'xsd:dateTime',
      'callback' => 'date_iso8601',
    ),
    'body' => array(
      'predicates' => array(
        0 => 'content:encoded',
      ),
    ),
    'uid' => array(
      'predicates' => array(
        0 => 'sioc:has_creator',
      ),
      'type' => 'rel',
    ),
    'name' => array(
      'predicates' => array(
        0 => 'foaf:name',
      ),
    ),
    'comment_count' => array(
      'predicates' => array(
        0 => 'sioc:num_replies',
      ),
      'datatype' => 'xsd:integer',
    ),
    'last_activity' => array(
      'predicates' => array(
        0 => 'sioc:last_activity_date',
      ),
      'datatype' => 'xsd:dateTime',
      'callback' => 'date_iso8601',
    ),
  ),
  'date' => '2016-08-10 10:24:12 -0400',
  'user_uuid' => '920bc7f6-fa5c-4683-b66a-a485f120f697',
);
  return $nodes;
}
