<?php
/**
 * @file
 * chemical_laws_and_regulations_learn_more.features.node_export_features.inc
 */

/**
 * Implements hook_node_export_features_default().
 */
function chemical_laws_and_regulations_learn_more_node_export_features_default() {
  $node_export = array(
  'code_string' => 'array(
  (object) array(
      \'vid\' => \'49688\',
      \'uid\' => \'1\',
      \'title\' => \'Chemical Resources - Learn More\',
      \'log\' => \'\',
      \'status\' => \'1\',
      \'comment\' => \'0\',
      \'promote\' => \'0\',
      \'sticky\' => \'0\',
      \'vuuid\' => \'c513b73e-4383-4f76-b88b-a8ac317ba860\',
      \'nid\' => \'49614\',
      \'type\' => \'page\',
      \'language\' => \'und\',
      \'created\' => \'1479832926\',
      \'changed\' => \'1479836169\',
      \'tnid\' => \'0\',
      \'translate\' => \'0\',
      \'uuid\' => \'7cde65e7-769f-48a1-ab60-8e238a31c6c6\',
      \'revision_timestamp\' => \'1479836169\',
      \'revision_uid\' => \'1\',
      \'body\' => array(
        \'und\' => array(
          array(
            \'value\' => \'<div class="usa-grid-full"><p>Chemical Laws &amp; Regulations widget provides federal laws and regulations that are related to chemicals that you search on.</p><p>Chemical details and links to relevant laws and regulations are displayed in a modal when the&nbsp;<strong>Search chemicals</strong>&nbsp;button is clicked. To obtain results, this widget is leveraging&nbsp;<a href="https://iaspub.epa.gov/sor_internet/registry/substreg/home/overview/home.do" rel="external" target="_blank">Substance Registry Services (SRS)</a>&nbsp;to find the chemical substance, its synonyms, and other identifiers and to determine applicable laws and regulations. Results are related to either the chemical searched or its synonym.</p><p>For registered users, the widget provides the ability to save chemicals as favorites for easy reference on return visits. Simply click the corresponding&nbsp;<strong>Save to My Chemicals</strong>&nbsp;link or click the heart icon.</p></div><!-- @end usa-grid-full for CR -->\',
            \'summary\' => \'\',
            \'format\' => \'full_html\',
            \'safe_value\' => \'<div class="usa-grid-full"><p>Chemical Laws &amp; Regulations widget provides federal laws and regulations that are related to chemicals that you search on.</p><p>Chemical details and links to relevant laws and regulations are displayed in a modal when the <strong>Search chemicals</strong> button is clicked. To obtain results, this widget is leveraging <a href="https://iaspub.epa.gov/sor_internet/registry/substreg/home/overview/home.do" rel="external" target="_blank">Substance Registry Services (SRS)</a> to find the chemical substance, its synonyms, and other identifiers and to determine applicable laws and regulations. Results are related to either the chemical searched or its synonym.</p><p>For registered users, the widget provides the ability to save chemicals as favorites for easy reference on return visits. Simply click the corresponding <strong>Save to My Chemicals</strong> link or click the heart icon.</p></div><!-- @end usa-grid-full for CR -->\',
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
        \'pid\' => \'12\',
        \'source\' => \'node/49614\',
        \'alias\' => \'chemical_rules-learnmore\',
        \'language\' => \'und\',
      ),
      \'menu\' => NULL,
      \'node_export_drupal_version\' => \'7\',
    ),
)',
);
  return $node_export;
}
