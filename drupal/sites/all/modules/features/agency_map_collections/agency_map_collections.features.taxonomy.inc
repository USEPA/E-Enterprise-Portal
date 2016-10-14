<?php
/**
 * @file
 * agency_map_collections.features.taxonomy.inc
 */

/**
 * Implements hook_taxonomy_default_vocabularies().
 */
function agency_map_collections_taxonomy_default_vocabularies() {
  return array(
    'ee_partner_agencies' => array(
      'name' => 'Partner Agencies',
      'machine_name' => 'ee_partner_agencies',
      'description' => 'State, tribal, and local agencies working with EPA on E-Enterprise',
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
