<?php

/**
 * @file
 * 
 * This file contains the page callback methods for the module
 */

/**
 * Copied en masse from core taxonomy module and modified to support our new widget's layout
 * Page callback: Outputs JSON for taxonomy autocomplete suggestions.
 *
 * Path: term_ref_autocomplete/autocomplete
 *
 * @param $field_name
 *   The name of the term reference field.
 * @param $tags_typed
 *   (optional) A comma-separated list of term names entered in the
 *   autocomplete form element. Only the last term is used for autocompletion.
 *   Defaults to '' (an empty string).
 */
function term_ref_autocomplete_callback($field_name, $raw_tags_typed = '') {
  $field = field_info_field($field_name);

  // The user enters a comma-separated list of tags. We only autocomplete the last tag.
  $tids = _term_ref_autocomplete_parse_input($raw_tags_typed); 
  $tags_typed = drupal_explode_tags($raw_tags_typed);
  $tag_last = (count($tids) == count($tags_typed)) ? '' : drupal_strtolower(array_pop($tags_typed));

  $matches = array();
  $term_matches = array();
  if ($tag_last != '') {

    // Part of the criteria for the query come from the field's own settings.
    $vids = array();
    $vocabularies = taxonomy_vocabulary_get_names();
    foreach ($field['settings']['allowed_values'] as $tree) {
      $vids[] = $vocabularies[$tree['vocabulary']]->vid;
    }

    $query = db_select('taxonomy_term_data', 't');
    $query->addTag('translatable');
    $query->addTag('term_access');

    // Do not select already entered terms.
    if (!empty($tags_typed)) {
      $query->condition('t.tid', $tids, 'NOT IN');
    }
    // Select rows that match by term name.
    $tags_return = $query
      ->fields('t', array('tid', 'name'))
      ->condition('t.vid', $vids)
      ->condition('t.name', '%' . db_like($tag_last) . '%', 'LIKE')
      ->range(0, 10)
      ->execute()
      ->fetchAllKeyed();

    $prefix = count($tags_typed) ? drupal_implode_tags($tags_typed) . ', ' : '';

    foreach ($tags_return as $tid => $name) {
      $ancestors = array_reverse(taxonomy_get_parents_all($tid));
      $term_tmp = &$term_matches;
      foreach ($ancestors as $ancestor) {
        $n = $ancestor->name;
        // Term names containing commas or quotes must be wrapped in quotes.
        if (strpos($n, ',') !== FALSE || strpos($n, '"') !== FALSE) {
          $n = '"' . str_replace('"', '""', $n) . '"';
        }
        $term_tmp[$ancestor->tid]['display'] = $prefix . $n . '[tid:' . $ancestor->tid . ']';
        $term_tmp[$ancestor->tid]['position'] = count($tags_typed);
        $term_tmp[$ancestor->tid]['name'] = $ancestor->name;
        if (!isset($term_tmp[$ancestor->tid]['children'])) {
          $term_tmp[$ancestor->tid]['children'] = array();
        }
        $term_tmp = &$term_tmp[$ancestor->tid]['children'];
      }
    }
  }

  drupal_json_output($term_matches);
}
