<?php
/**
 * @file
 * epa_ee_263_content_type_release_notes.features.taxonomy.inc
 */

/**
 * Implements hook_taxonomy_default_vocabularies().
 */
function epa_ee_263_content_type_release_notes_taxonomy_default_vocabularies() {
  return array(
    'epa_release_status' => array(
      'name' => 'EPA Release Status',
      'machine_name' => 'epa_release_status',
      'description' => 'Status to categorize In Progress and Done release notes',
      'hierarchy' => 0,
      'module' => 'taxonomy',
      'weight' => 0,
      'rdf_mapping' => array(
        'rdftype' => array(
          0 => 'skos:ConceptScheme',
        ),
        'name' => array(
          'predicates' => array(
            0 => 'dc:title',
          ),
        ),
        'description' => array(
          'predicates' => array(
            0 => 'rdfs:comment',
          ),
        ),
      ),
    ),
  );
}
