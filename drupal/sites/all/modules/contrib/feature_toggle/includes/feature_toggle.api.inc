<?php

/**
 * @file
 * API functions for feature toggle.
 */

/*
 * Function to get status of a feature
 * 
 * @param feature_name the name of the feature.
 * @return TRUE if feature is enabled and FALSE if disabled or not exists.
 */
function feature_toggle_get_status($feature_name){
  $feature_flags_status = variable_get('feature_flags_status', array());
  if(isset($feature_flags_status[$feature_name])){
    return TRUE;
  }else{
    return FALSE;
  }
}
