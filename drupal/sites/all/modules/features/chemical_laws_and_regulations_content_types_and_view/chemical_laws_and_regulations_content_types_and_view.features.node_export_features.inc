<?php
/**
 * @file
 * chemical_laws_and_regulations_content_types_and_view.features.node_export_features.inc
 */

/**
 * Implements hook_node_export_features_default().
 */
function chemical_laws_and_regulations_content_types_and_view_node_export_features_default() {
  $node_export = array(
  'code_string' => 'array(
  (object) array(
      \'vid\' => \'13946\',
      \'uid\' => \'1\',
      \'title\' => \'Acetone Test Chemical\',
      \'log\' => \'\',
      \'status\' => \'1\',
      \'comment\' => \'0\',
      \'promote\' => \'1\',
      \'sticky\' => \'0\',
      \'vuuid\' => \'60102534-64eb-45d4-97d1-101a8ca0429a\',
      \'nid\' => \'13857\',
      \'type\' => \'chemical_searches\',
      \'language\' => \'und\',
      \'created\' => \'1476761607\',
      \'changed\' => \'1476761607\',
      \'tnid\' => \'0\',
      \'translate\' => \'0\',
      \'uuid\' => \'7bcd7c20-cc80-42d4-8630-781a4839fd4f\',
      \'revision_timestamp\' => \'1476761607\',
      \'revision_uid\' => \'1\',
      \'body\' => array(),
      \'field_chem_rules_casregistrynum\' => array(
        \'und\' => array(
          array(
            \'value\' => \'67-64-1\',
            \'format\' => NULL,
            \'safe_value\' => \'67-64-1\',
          ),
        ),
      ),
      \'field_chem_rules_epachemintnum\' => array(
        \'und\' => array(
          array(
            \'value\' => \'4309\',
            \'format\' => NULL,
            \'safe_value\' => \'4309\',
          ),
        ),
      ),
      \'field_chem_rules_systematicname\' => array(
        \'und\' => array(
          array(
            \'value\' => \'2-Propanone\',
            \'format\' => NULL,
            \'safe_value\' => \'2-Propanone\',
          ),
        ),
      ),
      \'field_chem_rules_username\' => array(
        \'und\' => array(
          array(
            \'target_id\' => \'1\',
          ),
        ),
      ),
      \'field_chem_rules_search_count\' => array(
        \'und\' => array(
          array(
            \'value\' => \'1\',
          ),
        ),
      ),
      \'field_chem_rules_last_update\' => array(
        \'und\' => array(
          array(
            \'value\' => \'1476761430\',
            \'timezone\' => \'UTC\',
            \'timezone_db\' => \'UTC\',
            \'date_type\' => \'datestamp\',
          ),
        ),
      ),
      \'field_chem_rules_laws_regs_count\' => array(
        \'und\' => array(
          array(
            \'value\' => \'7\',
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
