<?php
/**
 * @file
 * chemical_laws_and_regulations_learn_more.features.uuid_node.inc
 */

/**
 * Implements hook_uuid_features_default_content().
 */
function chemical_laws_and_regulations_learn_more_uuid_features_default_content() {
  $nodes = array();

  $nodes[] = array(
  'title' => 'Chemical Resources - Learn More',
  'log' => 'Uses text from SOR-2655 from EPA team.',
  'status' => 1,
  'comment' => 0,
  'promote' => 0,
  'sticky' => 0,
  'type' => 'page',
  'language' => 'und',
  'created' => 1479832926,
  'tnid' => 0,
  'translate' => 0,
  'uuid' => '7cde65e7-769f-48a1-ab60-8e238a31c6c6',
  'body' => array(
    'und' => array(
      0 => array(
        'value' => '<div class="usa-grid-full"><p>The Chemical Laws &amp; Regulations widget searches federal laws and regulations that are related to chemicals of interest.</p><p>Links to relevant laws and regulations obtained from the Laws and Regulations Service (LRS) and chemical details are displayed in a popup window when the <strong>Search chemicals</strong> button is clicked. The widget leverages the <a href="https://iaspub.epa.gov/sor_internet/registry/substreg/home/overview/home.do" rel="external" target="_blank">Substance Registry Services (SRS)</a> to find the chemical substance, its synonyms, and other identifiers to determine applicable laws and regulations. Results are returned based on either the chemical searched or one of its synonyms.</p><p>For registered users, the widget provides the ability to save chemicals and/or laws and regulations&nbsp;as favorites for easy reference on return visits. Simply click the corresponding <strong>Save to My Chemicals</strong> link or <strong>click the heart icon</strong> in the Results dialog to add the items to user favorites.</p></div><!-- @end usa-grid-full for CR -->',
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
  'print_pdf_size' => 'LETTER',
  'print_pdf_orientation' => '',
  'date' => '2016-11-22 11:42:06 -0500',
  'user_uuid' => '920bc7f6-fa5c-4683-b66a-a485f120f697',
);
  return $nodes;
}
