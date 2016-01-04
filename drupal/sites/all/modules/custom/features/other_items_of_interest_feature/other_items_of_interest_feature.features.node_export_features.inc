<?php
/**
 * @file
 * other_items_of_interest_feature.features.node_export_features.inc
 */

/**
 * Implements hook_node_export_features_default().
 */
function other_items_of_interest_feature_node_export_features_default() {
  $node_export = array(
  'code_string' => 'array(
  (object) array(
      \'vid\' => \'4897\',
      \'uid\' => \'1\',
      \'title\' => \'EPA\',
      \'log\' => \'\',
      \'status\' => \'1\',
      \'comment\' => \'0\',
      \'promote\' => \'0\',
      \'sticky\' => \'0\',
      \'vuuid\' => \'667b2956-f646-4005-9f78-0e8f47408dc0\',
      \'nid\' => \'4881\',
      \'type\' => \'state_resource\',
      \'language\' => \'und\',
      \'created\' => \'1451333677\',
      \'changed\' => \'1451336405\',
      \'tnid\' => \'0\',
      \'translate\' => \'0\',
      \'uuid\' => \'3d0d615e-f342-4111-8682-262b1b297349\',
      \'revision_timestamp\' => \'1451336405\',
      \'revision_uid\' => \'1\',
      \'field_source\' => array(
        \'und\' => array(
          array(
            \'value\' => \'EPA Home\',
            \'format\' => NULL,
            \'safe_value\' => \'EPA Home\',
          ),
        ),
      ),
      \'field_source_url\' => array(
        \'und\' => array(
          array(
            \'value\' => \'http://epa.gov\',
            \'format\' => NULL,
            \'safe_value\' => \'http://epa.gov\',
          ),
        ),
      ),
      \'field_topic\' => array(
        \'und\' => array(
          array(
            \'value\' => \'All\',
          ),
        ),
      ),
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
  (object) array(
      \'vid\' => \'4900\',
      \'uid\' => \'1\',
      \'title\' => \'EPA\',
      \'log\' => \'\',
      \'status\' => \'1\',
      \'comment\' => \'0\',
      \'promote\' => \'0\',
      \'sticky\' => \'0\',
      \'vuuid\' => \'2bba415f-ebd8-4a91-ad6a-ed3145f258bf\',
      \'nid\' => \'4884\',
      \'type\' => \'state_resource\',
      \'language\' => \'und\',
      \'created\' => \'1451337272\',
      \'changed\' => \'1451337272\',
      \'tnid\' => \'0\',
      \'translate\' => \'0\',
      \'uuid\' => \'b077be98-3dfb-4e59-ae06-4697a00e909e\',
      \'revision_timestamp\' => \'1451337272\',
      \'revision_uid\' => \'1\',
      \'field_source\' => array(
        \'und\' => array(
          array(
            \'value\' => \'GI-WIZ\',
            \'format\' => NULL,
            \'safe_value\' => \'GI-WIZ\',
          ),
        ),
      ),
      \'field_source_url\' => array(
        \'und\' => array(
          array(
            \'value\' => \'http://cfpub.epa.gov/giwiz/\',
            \'format\' => NULL,
            \'safe_value\' => \'http://cfpub.epa.gov/giwiz/\',
          ),
        ),
      ),
      \'field_topic\' => array(
        \'und\' => array(
          array(
            \'value\' => \'All\',
          ),
        ),
      ),
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
