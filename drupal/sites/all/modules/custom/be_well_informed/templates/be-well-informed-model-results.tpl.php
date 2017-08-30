<div id="be-well-informed-accordion" class="ui-accordion">
    <span class="be-well-pdf-title">
      <?php echo $state_info['Results']['Heading']; ?><br>
        Created <?php print date("M j, Y"); ?>
    </span>
    <?php echo $state_info['Results']['Introduction']; ?>
    <div class="print-icon"><a                href="/be_well_informed/water_analysis_results_pdf"
                                              target="_blank"><img
                    src="/sites/all/modules/custom/be_well_informed/images/pdf_icon.png"></a>
    </div>
    <h1 class="head" role="tab" tabindex="0">
        <span class="bwi-result-title">About the Results</span>
    </h1>
    <?php echo $state_info['Results']['AboutTheResults']; ?>

    <h1 class="head" role="tab" tabindex="0">
        <span class="bwi-result-title">Results Summary</span>
    </h1>
    <div>
        <h3 class="bwi-key">Key</h3>
        <div class="bwi-legend clearfix">
            <div class="bwi-meets-limit one-half"><?php echo $state_info['Results']['Key']['MeetsLimit']; ?>
            </div>
            <div class="bwi-close-to-limit one-half"><?php echo $state_info['Results']['Key']['CloseToLimit']; ?>
            </div>
            <div class="bwi-above-limit one-half"><?php echo $state_info['Results']['Key']['AboveLimit']; ?>
            </div>
            <div class="bwi-consult one-half"><?php echo $state_info['Results']['Key']['Consult']; ?></div>
            <div class="bwi-no-entry one-half">No Input Entered</div>
        </div>
    </div>
    <div>
        <table id="be-well-informed-results-table" cellspacing=0 cellpadding=0
               class="eportal-responsive-table usa-table-borderless no-footer summary-table-pdf">
            <thead>
            <tr role="row">
                <th class="sorting_disabled small-screen-td-header" rowspan="1"
                    colspan="1">Result
                </th>
                <th class="sorting_disabled" rowspan="1" colspan="1">Element</th>
                <th class="sorting_disabled" rowspan="1" colspan="1">Your Entry</th>
                <th class="sorting_disabled" rowspan="1" colspan="1">Limit</th>
                <th class="sorting_disabled" rowspan="1" colspan="1">About Your Well
                    Water
                </th>
            </tr>
            </thead>

            <tbody>
            <?php foreach ($response_json_data_pdf['result_summary'] as $res_summary): ?>
              <?php if ($res_summary[2] !== "<span class='bwi-hide-row'>None</span>"): ?>
                    <tr>
                        <td class='icon-column'><?php print str_replace('sites', $doc_root . '/sites', $res_summary[0]); ?></td>
                        <td class='element-col'><?php print $res_summary[1]; ?></td>
                        <td><?php print $res_summary[2]; ?></td>
                        <td class='limit-col'><?php print $res_summary[3]; ?></td>
                        <td><?php print $res_summary[4]; ?></td>
                    </tr>
              <?php endif; ?>
            <?php endforeach; ?>
            </tbody>
        </table>
    </div>

  <?php if (count($response_json_data_pdf['TreatmentSteps'])): ?>
    <br><br>
    <h1 class="head treatment-header" role="tab"
        tabindex="0">
        <span class="bwi-result-title">Water Treatment Systems That Remove <?php print $contaminants_title ?></span>
    </h1>
    <div class="datatable usa-width-one-whole treatment-content">
        <div class='water-treatment-head'>The following water treatment is based
            on the water quality information you entered. <span
                    class='detail-show'>Details concerning water treatment are below.</span>
        </div>
      <?php
      $toShow = [];   //added forpdf
      foreach ($response_json_data_pdf['TreatmentSteps'] as $key => $value) {
        array_push($toShow, $key);
      }
      $count = count($toShow);

      echo "<h3 class=\"treatment_order_title of-{$count}\">Treatment Order</h3>";
      ?>
        <div class="step-class">
          <?php
          $system_type = [];
          $stepLabel = 1;   //added forpdf
          foreach ($treatments as $c => $t):
            if (in_array($c, $toShow)):   //added forpdf
              array_push($system_type, strtolower($t['icon']));
              ?>
                <div class="clearfix treatment-step">
                    <div class="caret"></div>
                    <div class="step">
                        <span class='<?php if ($t['icon']): print "treatment-icon {$t['icon']}-icon"; endif;
                        print " of-{$count}" ?> step-icon'><?php print " Step " . $stepLabel; //added forpdf
                          ?></span>
                    </div>
                    <div class="float-center">
                        <div class="step-boxes text-center clearfix">
                          <?php if ($t['text']): echo "<div class='additional-text'>{$t['text']}</div>"; endif; ?>
                          <?php
                          $or_count = 1;
                          $total_items = count($response_json_data_pdf['TreatmentSteps'][$c]['OrInstructions']);
                          foreach ($response_json_data_pdf['TreatmentSteps'][$c]['OrInstructions'] as $ix => $bx):
                            array_push($system_type, strtolower($bx['SystemType']));
                            ?>
                              <div class="box-main"
                                   title="<?php echo $bx['Recommendation']; ?>"><?php echo $bx['Recommendation']; ?></div>
                            <?php if ($total_items != $or_count): echo "<div class='or'>Or</div>";
                            $or_count++; endif; ?>
                          <?php endforeach; ?>
                        </div>
                    </div>
                </div>
              <?php
              $stepLabel++;
            endif;
            ?>
          <?php endforeach;
          if (in_array('house', $system_type) || in_array('home', $system_type)) : ?>
              <p class="step-class system-type-house hide">
          <span>Regardless of water treatment technology, it is essential that system maintenance be
                            performed on schedule to maintain system effectiveness.
                            </span><br>
                  <br><span>
                            </span><br>
                  <span><b>What does “whole house” mean?</b> The term whole house indicates that the treatment
                            technology is installed at the point where water enters your home to treat all of
                            the water used in your home.
                            </span>
              </p>
          <?php endif;
          if (in_array('facet', $system_type) || in_array('water', $system_type)) : ?>
        </div>

        <p class="step-class system-type-water hide">
            <b>What does “Point of Use” (POU) mean?</b> Point of Use
            technologies
            are installed
            and treat water at one specific location in your Home where water is
            used, like
            your kitchen faucet.
        </p>

    <?php endif; ?>
      <?php echo $state_info['Results']['WaterTreatmentSystem']; ?>
      <?php endif;    //added forpdf ?>
    </div>
    <h1 class="head" role="tab" tabindex="0">
        <span class="bwi-result-title">Results Details</span>
    </h1>
    <div
            class="datatable usa-width-one-whole be-well-informed-result-details">
        <h3 class="bwi-key">Key</h3>
        <div class="bwi-legend clearfix">
            <div class="bwi-meets-limit one-half"><?php echo $state_info['Results']['Key']['MeetsLimit']; ?>
            </div>
            <div class="bwi-close-to-limit one-half"><?php echo $state_info['Results']['Key']['CloseToLimit']; ?>
            </div>
            <div class="bwi-above-limit one-half"><?php echo $state_info['Results']['Key']['AboveLimit']; ?>
            </div>
            <div class="bwi-consult one-half"><?php echo $state_info['Results']['Key']['Consult']; ?></div>
            <div class="bwi-no-entry one-half">No Input Entered</div>
        </div>
        <div>
            <table cellspacing=0 cellpadding=0
                   class="eportal-responsive-table usa-table-borderless no-footer summary-table-pdf">
                <thead>
                <tr role="row">
                    <th class="sorting_disabled small-screen-td-header" rowspan="1"
                        colspan="1">Result
                    </th>
                    <th class="sorting_disabled" rowspan="1" colspan="1">Element
                    </th>
                    <th class="sorting_disabled" rowspan="1" colspan="1">Your
                        Entry
                    </th>
                    <th class="sorting_disabled" rowspan="1" colspan="1">Limit</th>
                    <th class="sorting_disabled" rowspan="1" colspan="1">About Your
                        Well Water
                    </th>
                </tr>
                </thead>
                <tbody>
                <?php
                $i = 0;
                $titles = [
                  'Interpretation of Results:',
                  'Health Concerns:',
                  'Treatment Options:',
                ];
                $detail_objs = $response_json_data_pdf['result_details'];
                foreach ($response_json_data_pdf['result_summary'] as $res_summary): ?>
                    <tr>
                        <td class='icon-column'><?php print str_replace('sites', $doc_root . '/sites', $res_summary[0]); ?></td>
                        <td class='element-col'><?php print $res_summary[1]; ?></td>
                        <td><?php print $res_summary[2]; ?></td>
                        <td class='limit-col'><?php print $res_summary[3]; ?></td>
                        <td><?php print $res_summary[4]; ?></td>
                    </tr>
                  <?php
                  $result = $detail_objs[$i]['result'];
                  if (count($detail_objs[$i]['data_array']) > 0) {
                    for ($j = 0; $j < count($detail_objs[$i]['data_array']); $j++) {
                      $res_det_title = "";
                      if (!empty($detail_objs[$i]['data_array'][$j])) {
                        $res_det_title = $titles[$j];
                        print "<tr><td class='bwi-detail-td " . $result . "' colspan='5'><h4>" . $res_det_title . "</h4>" . $detail_objs[$i]['data_array'][$j] . "</td></tr>";
                      }
                    }
                  }
                  $i++;
                endforeach; ?>
                </tbody>

            </table>
        </div>
    </div>
</div>