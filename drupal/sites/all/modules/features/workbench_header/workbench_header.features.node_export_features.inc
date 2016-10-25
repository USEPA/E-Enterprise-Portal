<?php
/**
 * @file
 * workbench_header.features.node_export_features.inc
 */

/**
 * Implements hook_node_export_features_default().
 */
function workbench_header_node_export_features_default() {
  $node_export = array(
  'code_string' => 'array(
  (object) array(
      \'vid\' => \'13936\',
      \'uid\' => \'1\',
      \'title\' => \'About the E-Enterprise Portal\',
      \'log\' => \'\',
      \'status\' => \'1\',
      \'comment\' => \'0\',
      \'promote\' => \'0\',
      \'sticky\' => \'0\',
      \'vuuid\' => \'731475c4-9787-4098-9f3a-1dcc3e70e416\',
      \'nid\' => \'13852\',
      \'type\' => \'page\',
      \'language\' => \'und\',
      \'created\' => \'1470839052\',
      \'changed\' => \'1470839052\',
      \'tnid\' => \'0\',
      \'translate\' => \'0\',
      \'uuid\' => \'92bc53bc-ad8a-43a6-96d0-b722b034f0db\',
      \'revision_timestamp\' => \'1470839052\',
      \'revision_uid\' => \'1\',
      \'body\' => array(
        \'und\' => array(
          array(
            \'value\' => \'<p>The E-Enterprise for the Environment Portal is a new user-friendly web platform that will modernize the way the public, regulated community, and environmental co-regulators conduct environmental transactions and access web resources. EPA is working with states and tribes to develop an interoperable portal integrating data and functionality over time to create a dynamic tool for collaboration and innovation.</p><p>The E-Enterprise for the Environment Portal will:</p><ul><li>Decrease the time and effort needed to perform transactions with EPA, tribal, state, and local governments</li><li>Provide a more consistent way for environmental agencies to interact with regulated entities and the public</li><li>Allow the regulated community and the public to discover the information that is important to them</li></ul>\',
            \'summary\' => \'\',
            \'format\' => \'full_html\',
            \'safe_value\' => "<p>The E-Enterprise for the Environment Portal is a new user-friendly web platform that will modernize the way the public, regulated community, and environmental co-regulators conduct environmental transactions and access web resources. EPA is working with states and tribes to develop an interoperable portal integrating data and functionality over time to create a dynamic tool for collaboration and innovation.</p>\\n<p>The E-Enterprise for the Environment Portal will:</p>\\n<ul><li>Decrease the time and effort needed to perform transactions with EPA, tribal, state, and local governments</li>\\n<li>Provide a more consistent way for environmental agencies to interact with regulated entities and the public</li>\\n<li>Allow the regulated community and the public to discover the information that is important to them</li>\\n</ul>",
            \'safe_summary\' => \'\',
          ),
        ),
      ),
      \'rdf_mapping\' => array(
        \'rdftype\' => array(
          \'foaf:Document\',
        ),
        \'title\' => array(
          \'predicates\' => array(
            \'dc:title\',
          ),
        ),
        \'created\' => array(
          \'predicates\' => array(
            \'dc:date\',
            \'dc:created\',
          ),
          \'datatype\' => \'xsd:dateTime\',
          \'callback\' => \'date_iso8601\',
        ),
        \'changed\' => array(
          \'predicates\' => array(
            \'dc:modified\',
          ),
          \'datatype\' => \'xsd:dateTime\',
          \'callback\' => \'date_iso8601\',
        ),
        \'body\' => array(
          \'predicates\' => array(
            \'content:encoded\',
          ),
        ),
        \'uid\' => array(
          \'predicates\' => array(
            \'sioc:has_creator\',
          ),
          \'type\' => \'rel\',
        ),
        \'name\' => array(
          \'predicates\' => array(
            \'foaf:name\',
          ),
        ),
        \'comment_count\' => array(
          \'predicates\' => array(
            \'sioc:num_replies\',
          ),
          \'datatype\' => \'xsd:integer\',
        ),
        \'last_activity\' => array(
          \'predicates\' => array(
            \'sioc:last_activity_date\',
          ),
          \'datatype\' => \'xsd:dateTime\',
          \'callback\' => \'date_iso8601\',
        ),
      ),
      \'name\' => \'admin\',
      \'picture\' => \'0\',
      \'data\' => \'b:0;\',
      \'path\' => array(
        \'pid\' => \'10\',
        \'source\' => \'node/13852\',
        \'alias\' => \'about\',
        \'language\' => \'und\',
      ),
      \'menu\' => NULL,
      \'node_export_drupal_version\' => \'7\',
    ),
)',
);
  return $node_export;
}
