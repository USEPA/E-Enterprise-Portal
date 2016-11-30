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
      \'vid\' => \'49692\',
      \'uid\' => \'1\',
      \'title\' => \'Chemical Resources - Learn More\',
      \'log\' => \'Uses text from SOR-2655 from EPA team.\',
      \'status\' => \'1\',
      \'comment\' => \'0\',
      \'promote\' => \'0\',
      \'sticky\' => \'0\',
      \'vuuid\' => \'8b8a92ec-0dbe-434b-aba9-57b398224a49\',
      \'nid\' => \'49614\',
      \'type\' => \'page\',
      \'language\' => \'und\',
      \'created\' => \'1479832926\',
      \'changed\' => \'1480529971\',
      \'tnid\' => \'0\',
      \'translate\' => \'0\',
      \'uuid\' => \'7cde65e7-769f-48a1-ab60-8e238a31c6c6\',
      \'revision_timestamp\' => \'1480529971\',
      \'revision_uid\' => \'1\',
      \'body\' => array(
        \'und\' => array(
          array(
            \'value\' => \'<div class="usa-grid-full"><p>The Chemical Laws &amp; Regulations widget searches federal laws and regulations that are related to chemicals of interest.</p><p>Links to relevant laws and regulations obtained from the Laws and Regulations Service (LRS) and chemical details are displayed in a popup window when the <strong>Search chemicals</strong> button is clicked. The widget leverages the <a href="https://iaspub.epa.gov/sor_internet/registry/substreg/home/overview/home.do" rel="external" target="_blank">Substance Registry Services (SRS)</a> to find the chemical substance, its synonyms, and other identifiers to determine applicable laws and regulations. Results are returned based on either the chemical searched or one of its synonyms.</p><p>For registered users, the widget provides the ability to save chemicals and/or laws and regulations&nbsp;as favorites for easy reference on return visits. Simply click the corresponding <strong>Save to My Chemicals</strong> link or <strong>click the heart icon</strong> in the Results dialog to add the items to user favorites.</p></div><!-- @end usa-grid-full for CR -->\',
            \'summary\' => \'\',
            \'format\' => \'full_html\',
            \'safe_value\' => \'<div class="usa-grid-full"><p>The Chemical Laws &amp; Regulations widget searches federal laws and regulations that are related to chemicals of interest.</p><p>Links to relevant laws and regulations obtained from the Laws and Regulations Service (LRS) and chemical details are displayed in a popup window when the <strong>Search chemicals</strong> button is clicked. The widget leverages the <a href="https://iaspub.epa.gov/sor_internet/registry/substreg/home/overview/home.do" rel="external" target="_blank">Substance Registry Services (SRS)</a> to find the chemical substance, its synonyms, and other identifiers to determine applicable laws and regulations. Results are returned based on either the chemical searched or one of its synonyms.</p><p>For registered users, the widget provides the ability to save chemicals and/or laws and regulations as favorites for easy reference on return visits. Simply click the corresponding <strong>Save to My Chemicals</strong> link or <strong>click the heart icon</strong> in the Results dialog to add the items to user favorites.</p></div><!-- @end usa-grid-full for CR -->\',
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
      \'print_pdf_size\' => \'LETTER\',
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
