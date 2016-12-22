<?php
/**
 * @file
 * chemical_laws_and_regulations_guest_favorites_modal_content.features.node_export_features.inc
 */

/**
 * Implements hook_node_export_features_default().
 */
function chemical_laws_and_regulations_guest_favorites_modal_content_node_export_features_default() {
  $node_export = array(
  'code_string' => 'array(
  (object) array(
      \'vid\' => \'50124\',
      \'uid\' => \'1\',
      \'title\' => \'Favorite Options for Guests\',
      \'log\' => \'\',
      \'status\' => \'1\',
      \'comment\' => \'0\',
      \'promote\' => \'0\',
      \'sticky\' => \'0\',
      \'vuuid\' => \'4ccc60fd-4c3e-4405-9572-8e0790f8f24f\',
      \'nid\' => \'50049\',
      \'type\' => \'page\',
      \'language\' => \'und\',
      \'created\' => \'1481513316\',
      \'changed\' => \'1481554978\',
      \'tnid\' => \'0\',
      \'translate\' => \'0\',
      \'uuid\' => \'dc87a283-65af-454e-baac-14fbec35e41a\',
      \'revision_timestamp\' => \'1481554978\',
      \'revision_uid\' => \'1\',
      \'body\' => array(
        \'und\' => array(
          array(
            \'value\' => \'<p>To save items as favorites, you must first log in.</p><p><a class="usa-button" href="/new-users">View log in options</a><a href="javascript:void(0)" id="close-favorite-msg">Cancel</a></p>\',
            \'summary\' => \'\',
            \'format\' => \'full_html\',
            \'safe_value\' => \'<p>To save items as favorites, you must first log in.</p><p><a class="usa-button" href="/new-users">View log in options</a><a href="javascript:void(0)" id="close-favorite-msg">Cancel</a></p>\',
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
      \'print_pdf_size\' => \'A4\',
      \'print_pdf_orientation\' => \'\',
      \'path\' => array(
        \'pid\' => \'13\',
        \'source\' => \'node/50049\',
        \'alias\' => \'guests-favorite-options\',
        \'language\' => \'und\',
      ),
      \'menu\' => NULL,
      \'node_export_drupal_version\' => \'7\',
    ),
)',
);
  return $node_export;
}
