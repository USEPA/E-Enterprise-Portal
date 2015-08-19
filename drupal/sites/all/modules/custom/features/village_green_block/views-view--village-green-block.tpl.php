<?php

/**
* @file
* Main view template.
*
* Variables available:
* - $classes_array: An array of classes determined in
*   template_preprocess_views_view(). Default classes are:
*     .view
*     .view-[css_name]
*     .view-id-[view_name]
*     .view-display-id-[display_name]
*     .view-dom-id-[dom_id]
* - $classes: A string version of $classes_array for use in the class attribute
* - $css_name: A css-safe version of the view name.
* - $css_class: The user-specified classes names, if any
* - $header: The view header
* - $footer: The view footer
* - $rows: The results of the view query, if any
* - $empty: The empty text to display if the view is empty
* - $pager: The pager next/prev links to display, if any
* - $exposed: Exposed widget form/info to display
* - $feed_icon: Feed icon to display, if any
* - $more: A link to view more, if any
*
* @ingroup views_templates
*/

drupal_add_css(drupal_get_path('module', 'village_green_block') ."/css/village_green.css", "file");
drupal_add_js(drupal_get_path('module', 'village_green_block') ."/js/chosen.jquery.js", "file");
drupal_add_js(drupal_get_path('module', 'village_green_block') ."/js/backstretch.js", "file");
drupal_add_js(drupal_get_path('module', 'village_green_block') ."/js/STI.js", "file");
drupal_add_js(drupal_get_path('module', 'village_green_block') ."/js/VillageGreenDAL.js", "file");
drupal_add_js(drupal_get_path('module', 'village_green_block') ."/js/welcome.js", "file");
?>

    <script type="text/javascript">
        (function() {
            if (!window.VG) {
                window.VG = {}
            }

            VG.config = {
                baseUrl : ""
            };
        })();

    </script>

<div class="view-content">
<small class="village-green-updated-every-minute">Updated every minute</small>
    <div>
        <div class="paddedSubContainer">
            <div class="marginBottom-10 col-xs-12 col-sm-4 col-md-4 col-lg-4" style="padding:0">
                <label for="currentSiteID">
                  City
                </label>
                <select id="currentSiteID">
                    <option value="24292">Philadelphia, PA</option>
                    <option value="24293">Washington, DC</option>
                    <option value="24294">Kansas City, KS</option>
                    <option value="24290">Durham, NC</option>
                </select>

            </div>
            <div class="marginBottom-10 col-xs-12 col-sm-8 col-md-8 col-lg-8" style="padding:0">

                <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                <label>Last update</label>
                    <span class="currentObsDate"></span>
                </div>
                <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                <label>Update in</label>
                <div class="progress">
                  <div class="progress-bar progress-bar-success progress-bar-striped active village-green-countdown" role="progressbar" aria-valuenow="0"
                      aria-valuemin="0" aria-valuemax="100">
                      <span class="countdownContainer"></span>
                  </div>
                </div>
                </div>

            </div>
            <div style="clear:both"></div>
            <div class="vg-numbers-container">
              <ul class="vg-numbers">
                  <li><h4 id="temp-label" aria-labelledby="">Temp</h4><p aria-labelledby="temp-label"><span class="curTempReading">0</span> <span class="vg-units" id="temp-units"><abbr title="Degrees fahrenheit">&deg; F</abbr></span></p></li>
                  <li><h4 id="humid-label" aria-labelledby="">Humidity</h4><p aria-labelledby="humid-label"><span class="curHumidReading">0</span> <span class="vg-units" id="humid-units">%</span></p></li>
                  <li><h4 id="wind-label" aria-labelledby="">Wind</h4><p aria-labelledby="wind-label"><span class="curWSReading">0</span> <span class="vg-units" id="wind-units"><abbr title="Miles per hour">mph</abbr> <span class="curWDReading"></span></span></p></li>
                  <li><h4 id="ozone-label" aria-labelledby="">Ozone</h4><p aria-labelledby="ozone-label"><span class="curOzoneReading">0</span> <span class="vg-units" id="ozone-units"><abbr title="Parts per billion">ppb</abbr></span></p></li>
                  <li><h4 id="pm-label">PM<sub>2.5<sub></h4><p aria-labelledby="pm-label"><span class="curPMReading">0</span><span class="vg-units" id="pm-units"><abbr title="Micrograms per cubic meter">&mu;g/m<sup>3</sup></abbr></span></p></li>
              </ul>
              <div style="clear:both"></div>
            </div>
        </div>
    </div>
</div>
<div style="clear:both"></div>
<small class="village-green-source">Source: <a target="_blank" href="http://villagegreen.airnowtech.org" class="village-green-external-link">Village Green</a></small>