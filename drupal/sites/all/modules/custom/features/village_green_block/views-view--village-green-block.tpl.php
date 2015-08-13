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
    <div>
        <div class="paddedSubContainer">

            <select id="currentSiteID">
                <option value="24292">Philadelphia, PA</option>
                <option value="24293">Washington, DC</option>
                <option value="24294">Kansas City, KS</option>
                <option value="24290">Durham, NC</option>
            </select>

            <div class="row-fluid center-block">
                <div id="curLeftReading" class="marginBottom-10 col-xs-12 col-sm-12 col-md-6 col-lg-6">
                    <table id="currentReadingLeftTbl">
                        <tbody>
                            <tr>
                                <td class="topCol"><span class="curOzoneReading">36</span></td>
                                <td>
                                    <span class="paramDisplayName">Ozone</span> <br>
                                    <span id="currentTempUnit">ppb</span>
                                </td>
                            </tr>

                            <tr>
                                <td class="topCol"><span class="curPMReading">8</span></td>
                                <td>
                                    <span class="paramDisplayName">PM<sub>2.5</sub></span> <br>
                                        &mu;g/m<sup>3</sup>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div id="curRightReading" class="marginBottom-10 col-xs-12 col-sm-12 col-md-6 col-lg-6">

                    <table id="currentReadingRightTbl">
                        <tbody>
                            <tr>
                                <td>
                                    <span class="curTempReading">88</span>
                                    <span class="paramUnitCell">&deg;F</span>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <span class="curHumidReading">30.9</span><span class="paramUnitCell">%</span> <br>
                                    <span>humidity</span>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <span class="curWSReading">3.8</span>
                                    <span>mph</span>
                                    <span class="curWDReading">W</span><br>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="marginBottom-10 col-xs-13 col-sm-13 col-md-7 col-lg-7">
                <span class="currentObsDate">observed Thu 2:43 PM EDT</span>
            </div>
            <div class="marginBottom-10 col-xs-11 col-sm-11 col-md-5 col-lg-5" style="text-align: right;">
                <span class="countdownContainer">Updating in 9</span>
            </div>
        </div>
    </div>
</div>
<div style="clear:both"></div>
<div class="marginBottom-10 col-xs-11 col-sm-11 col-md-12 col-lg-12">
    Source: <a target="_blank" href="http://villagegreen.airnowtech.org" class="village-green-external-link">villagegreen.airnowtech.org</a>
</div>
<div style="clear:both"></div>