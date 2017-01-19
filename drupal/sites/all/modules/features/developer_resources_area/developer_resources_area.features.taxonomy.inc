<?php
/**
 * @file
 * developer_resources_area.features.taxonomy.inc
 */

/**
 * Implements hook_taxonomy_default_vocabularies().
 */
function developer_resources_area_taxonomy_default_vocabularies() {
  return array(
    'developer_resource' => array(
      'name' => 'Developer Resource',
      'machine_name' => 'developer_resource',
      'description' => 'Used to categorize content on For Developers view and page',
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
