<?php
/**
 * @file
 * recommended_resources_feature.features.node_export_features.inc
 */

/**
 * Implements hook_node_export_features_default().
 */
function recommended_resources_feature_node_export_features_default() {
  $node_export = array(
  'code_string' => 'array(
  (object) array(
      \'vid\' => \'23520\',
      \'uid\' => \'1\',
      \'title\' => \'Placeholder Resource\',
      \'log\' => \'\',
      \'status\' => \'1\',
      \'comment\' => \'0\',
      \'promote\' => \'0\',
      \'sticky\' => \'0\',
      \'vuuid\' => \'cff566c2-d5f3-49ef-b79f-d31404dc3c74\',
      \'nid\' => \'23466\',
      \'type\' => \'lgc_resource\',
      \'language\' => \'und\',
      \'created\' => \'1466185992\',
      \'changed\' => \'1466185992\',
      \'tnid\' => \'0\',
      \'translate\' => \'0\',
      \'uuid\' => \'38a6c6f5-3bae-461d-971c-5c0c4996b949\',
      \'revision_timestamp\' => \'1466185992\',
      \'revision_uid\' => \'1\',
      \'field_lgc_availability\' => array(),
      \'field_lgc_category\' => array(
        \'und\' => array(
          array(
            \'tid\' => \'172929\',
          ),
        ),
      ),
      \'field_lgc_comments\' => array(),
      \'field_lgc_data_requirements\' => array(),
      \'field_lgc_description\' => array(),
      \'field_lgc_ease_of_use\' => array(),
      \'field_lgc_id\' => array(
        \'und\' => array(
          array(
            \'value\' => \'98765\',
            \'format\' => NULL,
            \'safe_value\' => \'98765\',
          ),
        ),
      ),
      \'field_lgc_link\' => array(
        \'und\' => array(
          array(
            \'value\' => \'http://sample.com\',
            \'format\' => NULL,
            \'safe_value\' => \'http://sample.com\',
          ),
        ),
      ),
      \'field_lgc_recommendation\' => array(),
      \'field_lgc_relevance\' => array(),
      \'field_lgc_topic\' => array(
        \'und\' => array(
          array(
            \'tid\' => \'173058\',
          ),
        ),
      ),
      \'field_lgc_training_level\' => array(),
      \'field_lgc_update_frequently\' => array(),
      \'field_tool_type\' => array(),
      \'field_lgc_title\' => array(),
      \'rdf_mapping\' => array(
        \'rdftype\' => array(
          \'sioc:Item\',
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
      \'path\' => FALSE,
      \'menu\' => NULL,
      \'node_export_drupal_version\' => \'7\',
    ),
)',
);
  return $node_export;
}
