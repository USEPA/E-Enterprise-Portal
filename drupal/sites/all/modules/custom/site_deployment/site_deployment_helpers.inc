<?php

/**
 * @param $features_to_revert
 * @param $features_per_pass
 * @param $sandbox
 */
function update_revert_features($features_to_revert, $features_per_pass, &$sandbox) {

// If this is the first pass through this update function then set some variables.
  if (!isset($sandbox['progress'])) {
    if ($features_to_revert[0] === 'all') {
      $features_to_revert = features_get_features();
      if ($features_to_revert) {
        $sandbox['total'] = count($features_to_revert);
        $sandbox['features_array'] = array_keys($features_to_revert);
      }
    } else {
      $sandbox['total'] = count($features_to_revert);
      $sandbox['features_array'] = $features_to_revert;
    }
    $sandbox['progress'] = 0;
  }
  $progress_pass = $sandbox['progress'];

  for ($i = $progress_pass; $i < ($features_per_pass + $progress_pass); $i++) {
    revert_features([$sandbox['features_array'][$i]]);
    drupal_set_message(t("Reverted feature " . $sandbox['features_array'][$i]));
    $sandbox['progress']++;
  }

  $sandbox['#finished'] = $sandbox['progress'] / $sandbox['total'];
}

/**
 * @param $features_to_revert
 */
function revert_features($features_to_revert) {
  if ($features_to_revert[0] === 'all') {
  // revert all features
  $features_to_revert = array_keys(features_get_features());
}
  foreach ($features_to_revert as $feature) {
    $feature = features_get_features($feature);
    $components = array_keys($feature->info['features']);
    features_revert(array($feature->name => $components));
  }

}