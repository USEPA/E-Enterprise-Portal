<div class="usa-grid-full">
  <h2>Be Well Informed &gt; Enter Your Water Analysis Results</h2>

  <div class="bs-callout bs-callout-warning hidden">
    <h4>Please correct the errors below:</h4>
  </div>

  <div class="bs-callout bs-callout-info hidden">
    <h4>Everything appears valid</h4>
  </div>

  <div id="interactive-prompts-modal" class="usa-width-one-whole">
    <form action="" id="interactive-prompts" class="">
      <div class="questions">
        <div class="section row">
          <div class="column usa-width-one-half">
            <p>Does your water taste salty?</p>
          </div>
          <div class="column usa-width-one-half text-right btn-group">
            <button for="" class="usa-button-primary" type="button"><input type="radio" value="1">Yes</button>
            <button for="" class="usa-button-primary" type="button"><input type="radio" value="0">No</button>
          </div>
        </div>
        <div class="section row">
          <div class="column usa-width-one-half">
            <p>Please enter the value for Iron (symbol is “Fe”) if there is a result within your lab report. If Iron was not tested as part of your water analysis, leave the box blank. Do not enter “0”.</p>
          </div>
          <div class="column usa-width-one-half text-right btn-group">
            <input class="one-third"
                   name=""
                   type="number"
                   id="" >
            <select class="one-third"
                    name="<?php echo $prefix . 'ddl' . $m['machine_name'] ?>"
                    id="ddl<?php echo $m['machine_name'] ?>">
              <?php foreach ($unit_types as $ut): ?>
                <option
                  value="<?php echo $ut ?>"> <?php echo $ut ?></option>
              <?php endforeach; ?>
            </select>
          </div>
        </div>
      </div>
      <div class="row usa-width-one-whole reset-submit">
        <div class="column right">
          <button id="water_analysis_reset" class="usa-button usa-button-outline" type="button">Reset</button>
          <button id="water_analysis_submit" class="usa-button-primary" type="button">Submit</button>
        </div>
      </div>
    </form>
  </div>

  <form action="" id="water_analysis_results_form">
    <div class="row usa-grid-full">
      <div class="row usa-width-one-whole">
        <div class="city-selection usa-width-one-half">
          <div class="section">
            <label class="column one-half"
                   for="CityName">New Hampshire /
              City</label>
            <select class="column one-half right"
                    name="CityName" id="drpcity"
                    required="">
              <option value="">Select a City</option>
              <?php foreach ($cities as $c): ?>
                <option value="<?php echo $c ?>"><?php echo $c ?></option>
              <?php endforeach; ?>
            </select>
          </div>
        </div>
      </div>
      <div class="components usa-width-one-half">
        <h3>Routine Water Analysis</h3>
        <?php foreach ($water_components as $wc): ?>
          <div class="row section">
            <input type="hidden" name="RoutineContaminants[<?php echo $wc['machine_name'] ?>][Symbol]" value="<?php echo $wc['machine_name'] ?>">
            <input type="hidden" name="RoutineContaminants[<?php echo $wc['machine_name'] ?>][Name]" value="<?php echo $wc['name'] ?>">
            <label class="column one-third"
                   for="RoutineContaminants[<?php echo $wc['machine_name'] ?>][Value]"><?php echo $wc['name'] ?>
              <span
                class="symbol">(<?php echo $wc['symbol_text'] ?>
                )</span></label>
            <input class="column one-third"
                   name="RoutineContaminants[<?php echo $wc['machine_name'] ?>][Value]"
                   type="number"
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
                <input type="hidden" name="BacterialContaminants[<?php echo $m['machine_name'] ?>][Symbol]" value="<?php echo $m['machine_name'] ?>">
                <input type="hidden" name="BacterialContaminants[<?php echo $m['machine_name'] ?>][Name]" value="<?php echo $m['name'] ?>">
                <label class="column one-third"
                       for="BacterialContaminants[<?php echo $m['machine_name'] ?>][Value]"><?php echo $m['name'] ?></label>
                <input class="column one-third"
                       name="BacterialContaminants[<?php echo $m['machine_name'] ?>][Value]"
                       type="number"
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
                           value="rdb_<?php echo $m['machine_name'] ?>_True" <?php if (in_array('required', $m['validation'])): {
                      echo 'data-parsley-multiple="' . $m['machine_name'] . '" data-parsley-group="block-2"';
                    } endif; ?>>
                    <label
                      for="rdb_<?php echo $m['radio_name'] ?>_True">Present</label>
                    <input name="<?php echo $prefix . $m['radio_name'] ?>_G"
                           type="radio"
                           id="rdb_<?php echo $m['radio_name'] ?>_False"
                           value="rdb_<?php echo $m['machine_name'] ?>_False" <?php if (in_array('required', $m['validation'])): {
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
              <input type="hidden" name="RadionuclideContaminants[<?php echo $rn['machine_name'] ?>][Symbol]" value="<?php echo $rn['machine_name'] ?>">
              <input type="hidden" name="RadionuclideContaminants[<?php echo $rn['machine_name'] ?>][Name]" value="<?php echo $rn['name'] ?>">
              <label class="column one-third"
                     for="RadionuclideContaminants[<?php echo $rn['machine_name'] ?>][Value]"><?php echo $rn['name'] ?> <?php if ($rn['symbol_text']): ?>
                  <span class="symbol">(<?php echo $rn['symbol_text'] ?>)</span><?php endif; ?></label>
              <input class="column one-third"
                     name="RadionuclideContaminants[<?php echo $rn['machine_name'] ?>][Value]"
                     type="number"
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
    <div class="row usa-width-one-whole reset-submit">
      <div class="column right">
        <button id="water_analysis_reset" class="usa-button usa-button-outline" type="button">Reset</button>
        <button id="water_analysis_submit" class="usa-button-primary" type="button">Submit</button>
      </div>
    </div>
  </form>
</div>
