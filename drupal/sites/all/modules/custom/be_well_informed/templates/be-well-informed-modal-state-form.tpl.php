<div class="usa-grid-full">
  <div id="bwi-tabs">
    <ul class="navigation-tabs">
      <li><a href="#entry-results" id="entry-tab">Entry</a></li>
      <li><a href="#support-info">State/Tribe Resources</a></li>
    </ul>
    <div id="entry-results">
      <div id="be-well-informed-form-wrapper"
           class="be-well-informed-modal-wrapper">
        <h3>Enter the Results of Your Drinking Water Test</h3>
        <div class="bs-callout bs-callout-warning hidden">
          <h4>Please correct the errors below:</h4>
        </div>
    
        <div class="bs-callout bs-callout-info hidden">
          <h4>Everything appears valid</h4>
        </div>
    
        <form action="" id="water_analysis_results_form">
            <input type="hidden" name="StateCode" value="<?php echo $state_info['Code'] ?>">
          <div id="routine-contaminants" class="row usa-grid-full">
            <div class="row usa-width-one-whole">
              <div class="city-selection usa-width-one-half">
                <div class="section">
                  <label class="column one-half"
                         for="drpcity"></label>
                </div>
              </div>
    
              <div class="city-selection usa-width-one-half">
                <button class="column right" type="button" onclick="sampleData()">
                  Cycle through Sample Data
                </button>
              </div>
            </div>
            <div class="components usa-width-one-half">
              <h3>Routine Water Analysis</h3>
              <?php foreach ($water_components as $wc): ?>
                <div class="row section">
                  <input type="hidden"
                         name="RoutineContaminants[<?php echo $wc['machine_name'] ?>][Symbol]"
                         value="<?php echo $wc['machine_name'] ?>">
                  <input type="hidden"
                         name="RoutineContaminants[<?php echo $wc['machine_name'] ?>][Name]"
                         value="<?php echo $wc['name'] ?>">
                  <label class="column one-third"
                         for="txt[<?php echo $wc['machine_name'] ?>][Value]"><?php echo $wc['name'] ?>
                    <?php if ($wc['symbol_text']): echo '<span class="symbol">(' . $wc['symbol_text'] . ')</span>'; endif; ?>
                  </label>
                  <input class="column one-third"
                         name="RoutineContaminants[<?php echo $wc['machine_name'] ?>][Value]"
                         type="number" step="0.001"
                         id="txt<?php echo $wc['machine_name'] ?>" <?php if (in_array('required', $wc['validation'])): {
                    echo 'required=""';
                  } endif; ?>>
                  <select class="column one-third"
                          name="RoutineContaminants[<?php echo $wc['machine_name'] ?>][Unit]"
                          id="ddl<?php echo $wc['machine_name'] ?>">
                    <?php foreach ($wc['unit_types'] as $ut): ?>
                      <option
                        value="<?php echo $ut ?>" <?php if ($wc['default_unit_type'] == $ut): {
                        echo 'selected';
                      } endif; ?>> <?php echo $ut ?></option>
                    <?php endforeach; ?>
                  </select>
                </div>
              <?php endforeach; ?>
            </div>
            <div class="usa-width-one-half">
              <div class="microbiology">
                <h3>Bacteria / Microbiology</h3>
                <?php foreach ($microbiology as $m): ?>
                  <div class="row section">
                    <div <?php if (in_array('required', $m['validation'])): {
                      echo 'data-parsley-check-children="2" data-parsley-validate-if-empty=""';
                    } endif; ?>>
                      <input type="hidden"
                             name="BacterialContaminants[<?php echo $m['machine_name'] ?>][Symbol]"
                             value="<?php echo $m['machine_name'] ?>">
                      <input type="hidden"
                             name="BacterialContaminants[<?php echo $m['machine_name'] ?>][Name]"
                             value="<?php echo $m['name'] ?>">
                      <label class="column one-third"
                             for="BacterialContaminants[<?php echo $m['machine_name'] ?>][Value]"><?php echo $m['name'] ?></label>
                      <input class="column one-third"
                             name="BacterialContaminants[<?php echo $m['machine_name'] ?>][Value]"
                             type="number" step="0.001"
                             id="txt<?php echo $m['machine_name'] ?>" <?php if (in_array('required', $m['validation'])): {
                        echo 'data-parsley-group="block-1"';
                      } endif; ?>>
                      <select class="column one-third"
                              name="BacterialContaminants[<?php echo $m['machine_name'] ?>][Unit]"
                              id="ddl<?php echo $m['machine_name'] ?>">
                        <?php foreach ($m['unit_types'] as $ut): ?>
                          <option
                            value="<?php echo $ut ?>" <?php if ($m['default_unit_type'] == $ut): {
                            echo 'selected';
                          } endif; ?>> <?php echo $ut ?></option>
                        <?php endforeach; ?>
                      </select>
                      <div class="row absent-present">
                        <span class="column">Or Choose: </span>
                        <div class="column">
                          <input name="<?php echo $prefix . $m['radio_name'] ?>_G"
                                 type="radio"
                                 id="rdb_<?php echo $m['radio_name'] ?>_True"
                                 value="present" <?php if (in_array('required', $m['validation'])): {
                            echo 'data-parsley-multiple="' . $m['machine_name'] . '" data-parsley-group="block-2"';
                          } endif; ?>>
                          <label
                            for="rdb_<?php echo $m['radio_name'] ?>_True">Present</label>
                          <input name="<?php echo $prefix . $m['radio_name'] ?>_G"
                                 type="radio"
                                 id="rdb_<?php echo $m['radio_name'] ?>_False"
                                 value="absent" <?php if (in_array('required', $m['validation'])): {
                            echo 'data-parsley-multiple="' . $m['machine_name'] . '" data-parsley-group="block-2"';
                          } endif; ?>>
                          <label
                            for="rdb_<?php echo $m['radio_name'] ?>_False">Absent</label>
                        </div>
                      </div>
                    </div>
                  </div>
                <?php endforeach; ?>
              </div>
              <div class="radionuclides">
                <h3>Radionuclides</h3>
                <?php foreach ($radionuclides as $rn): ?>
                  <div class="row section">
                    <input type="hidden"
                           name="RadionuclideContaminants[<?php echo $rn['machine_name'] ?>][Symbol]"
                           value="<?php echo $rn['machine_name'] ?>">
                    <input type="hidden"
                           name="RadionuclideContaminants[<?php echo $rn['machine_name'] ?>][Name]"
                           value="<?php echo $rn['name'] ?>">
                    <label class="column one-third"
                           for="RadionuclideContaminants[<?php echo $rn['machine_name'] ?>][Value]"><?php echo $rn['name'] ?>
                      <?php if ($rn['symbol_text']): echo '<span class="symbol">(' . $rn['symbol_text'] . ')</span>'; endif; ?>
                    </label>
                    <input class="column one-third"
                           name="RadionuclideContaminants[<?php echo $rn['machine_name'] ?>][Value]"
                           type="number" step="0.001"
                           id="txt<?php echo $rn['machine_name'] ?>" <?php if (in_array('required', $rn['validation'])): {
                      echo 'required=""';
                    } endif; ?>>
                    <select class="column one-third"
                            name="RadionuclideContaminants[<?php echo $rn['machine_name'] ?>][Unit]"
                            id="ddl<?php echo $rn['machine_name'] ?>">
                      <?php foreach ($rn['unit_types'] as $ut): ?>
                        <option
                          value="<?php echo $ut ?>" <?php if ($rn['default_unit_type'] == $ut): {
                          echo 'selected';
                        } endif; ?>> <?php echo $ut ?></option>
                      <?php endforeach; ?>
                    </select>
                  </div>
                <?php endforeach; ?>
              </div>
            </div>
          </div>
          <div id="interactive-prompts"></div>
          <div class="row usa-width-one-whole reset-submit">
            <div class="column"></div>
            <div class="column right">
              <button id="water_analysis_reset"
                      class="usa-button usa-button-outline" type="button">Reset
              </button>
              <button id="water_analysis_submit" class="usa-button-primary"
                      type="button">Submit
              </button>
            </div>
          </div>
        </form>
      </div>
      <div id="be-well-informed-loading-wrapper"
           class="be-well-informed-modal-wrapper ">
        <h3>Loading Analysis</h3> <i class="fa fa-spinner" aria-hidden="true"></i>
      </div>

      <div id="be-well-informed-results-wrapper"
           class="be-well-informed-modal-wrapper">
      </div><!-- @end .be-well-informed-results-wrapper -->
    </div><!-- @end #entry-results tab pane -->
    <div id="support-info">
        <h3>State/Tribe Resources</h3>
        <?php
            foreach ($state_info['SupportInformation'] as $section) {
                echo '<div class="bwi-support-box">' . $section['@content'] . '</div>';
            }
        ?>
      </div>
    </div><!-- @end #support-info tab pane -->      
  </div><!-- @end tabs -->
</div><!-- @end .usa-grid-full -->
