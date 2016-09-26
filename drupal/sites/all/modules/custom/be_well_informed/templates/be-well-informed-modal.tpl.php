<div class="usa-grid-full">
  <div id="be-well-informed-form-wrapper"
       class="be-well-informed-modal-wrapper">
    <h2>Be Well Informed &gt; Enter Your Water Analysis Results</h2>

    <div class="bs-callout bs-callout-warning hidden">
      <h4>Please correct the errors below:</h4>
    </div>

    <div class="bs-callout bs-callout-info hidden">
      <h4>Everything appears valid</h4>
    </div>

    <!--  <div id="interactive-prompts-modal" class="usa-width-one-whole">
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
                    name="<?php /*echo $prefix . 'ddl' . $m['machine_name'] */ ?>"
                    id="ddl<?php /*echo $m['machine_name'] */ ?>">
              <?php /*foreach ($unit_types as $ut): */ ?>
                <option
                  value="<?php /*echo $ut */ ?>"> <?php /*echo $ut */ ?></option>
              <?php /*endforeach; */ ?>
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
-->
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

          <div class="city-selection usa-width-one-half">
            <button class="column right" type="button" onclick="sampleData()">
              Sample Data
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
                     for="RoutineContaminants[<?php echo $wc['machine_name'] ?>][Value]"><?php echo $wc['name'] ?>
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
      <div class="row usa-width-one-whole reset-submit">
        <div class="column">
          <a href="https://xml2.des.state.nh.us/DWITool/Welcome.aspx"
             target="_blank" class="be-well-inform-source">NHDES Be
            <em>Well</em> Informed Guide</a>
        </div>
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
    <h2>Loading Analysis</h2> <i class="fa fa-spinner" aria-hidden="true"></i>
  </div>
  <div id="be-well-informed-results-wrapper"
       class="be-well-informed-modal-wrapper">
    <h1>Be Well Informed > View Your Water Analysis Results</h1>
    <div id="be-well-informed-accordion" class="ui-accordion">
      <h1 class="head ui-accordion-header" role="tab" tabindex="0">
        <i class="fa fa-caret-down" aria-hidden="true"></i>
        About the Results
      </h1>
      <div>
        <p>
          The Results below compare your water to federal and state health-based
          standards (Maximum Contaminant Levels -
          MCLs)
          and other guidelines (Secondary Maximum Contaminant Levels - SMCLs,
          health advisory levels, etc.). These
          standards
          and guidelines are often referred to as "limits" on your laboratory
          report. If your water exceeds or is
          approaching
          established federal/state drinking water limits or advisory levels for
          the contaminant(s) entered, additional
          health
          information and treatment options will be shown.
        </p>
        <p>
          Several contaminants, such as radon and sodium, do not have state
          or federal standards. Instead, when radon is present in drinking water
          at 2,000 pCi/L or greater, we recommend
          you
          check the
          <a
            href="http://des.nh.gov/organization/commissioner/pip/factsheets/dwgb/documents/dwgb-3-12.pdf">
            Drinking Water Fact Sheet
          </a>.
          For sodium, health and treatment information is shown when sodium is
          present at
          levels above 20 mg/L, U.S. EPA's federal "health advisory" for persons
          on a physician-prescribed “no salt
          diet.”
        </p>
      </div>
      <h1 class="head ui-accordion-header" role="tab" tabindex="0">
        <i class="fa fa-caret-down" aria-hidden="true"></i>
        Results Summary
      </h1>
      <div class="datatable usa-width-one-whole">
        <div class="bwi-legend">
          <div class="bwi-key one-fifth">Key</div>
          <div class="bwi-meets-limit one-fifth">Meets the Drinking Water
            Limit
          </div>
          <div class="bwi-close-to-limit one-fifth">Close to the Drinking Water
            Limit
          </div>
          <div class="bwi-above-limit one-fifth">Above the Drinking Water
            Limit
          </div>
          <div class="bwi-no-entry one-fifth">No Input Entered</div>
        </div>
        <table id="be-well-informed-results-table"
               class="responsive-table usa-table-borderless">
          <thead>
          <tr>
            <th>Result</th>
            <th>Element</th>
            <th>Your Entry</th>
            <th>Limit</th>
            <th>About Your Well Water</th>
          </tr>
          </thead>
          <tbody>
          </tbody>
        </table>
      </div>

      <h1 class="head ui-accordion-header hide treatment-header" role="tab" tabindex="0">
        <i class="fa fa-caret-down" aria-hidden="true"></i>
        Water Treatment Systems That Remove <span class="treatment-text"></span>
      </h1>
      <div class="datatable usa-width-one-whole hide treatment-content">
        <table>
          <tbody>
          <tr>
            <td>
              The following water treatment is based on the water quality
              information
              you entered. <font style="color: red;">Details concerning water
                treatment are below.</font>
            </td>
          </tr>
          </tbody>
        </table>
        <h3 id="treatment_order_title">Treatment Order</h3>
        <div class="step_class">
          <div id="step_As" class="clearfix hide">
            <div class="col-sm-1">
              <div class="step"><span>Step 1</span></div>
            </div>

            <div class="col-sm-11">
              <div class="step_boxes text-center">
                <div class="home_icon"></div>
                <div class="box_main"><span>Whole House Anion Exchange Water Treatment System followed by an Acid Neutralizer</span></div>
                <div class="or"><span>OR</span></div>
                <div class="facut_icon"></div>
                <div class="box_main"><span>Point-of-Use (POU) Arsenic Adsorption Media Filter System</span></div>
              </div>
            </div>
          </div>
          <div id="treatment-step-1" class="clearfix treatment-step">
            <div class="col-sm-1">
              <div class="step"><span>Step 1</span></div>
            </div>
            <div class="col-sm-11">
              <div class="step_boxes text-center">
                <div class="home_icon"></div>
                <span class="caret"></span>
                <div id="a1_box" class="box_main">Whole House Oxidizing Filter System</div>
                <span id="or_1_1" class="or">OR</span>
                <div id="b1_box" class="box_main">Whole House Cation Exchange Water Softener</div>
              </div>
            </div>
          </div>
          <div id="treatment-step-2" class="clearfix treatment-step hide">
            <div class="col-sm-1">
              <div id="div_step_2_circle" class="">
                <span id="step_2_no"></span></div>
            </div>
            <div class="col-sm-11">
              <div class="step_boxes text-center">
                <div class="home_icon">
                  <img src="Images/water/smallhome2.png">
                </div>
                <span class="caret"></span>
                <div id="a2_box" class="box_main hide">
                  <span id="a2">Whole House Anion Exchange Water Treatment System followed by an Acid Neutralizer</span>
                </div>
                <span id="or_As" class="or hide"
                      style="margin-left: 30px;">OR</span>
                <div id="img_facut_As" style="float: none; margin-right: 30px;"
                     class="home_icon hide">
                  <img src="Images/water/facut.jpg">
                </div>
                <div id="a5_box_As" class="box_main hide">
                  <span id="a5_As">Point-of-Use (POU) Arsenic Adsorption Media Filter System</span>
                </div>
              </div>
            </div>
          </div>
          <div id="treatment-step-3" class="clearfix treatment-step">
            <div class="col-sm-1">
              <div id="div_step_3_circle" class="step_circle">
                <span id="step_3_no">Step 2</span></div>
            </div>
            <div class="col-sm-11">
              <div class="step_boxes text-center">
                <div class="treat_icon text-center">
                  <img src="Images/water/treatment_recommend.png">
                </div>
                <div class="home_icon">
                  <img src="Images/water/smallhome2.png">
                </div>
                <span class="caret"></span>
                <div id="a3_box" class="box_main">
                  <span id="a3">Whole House Aeration Device</span>
                </div>
                <span id="or_3_1" class="or hide">OR</span>
                <div id="b3_box" class="box_main hide">
                  <span id="b3">Whole House Granular Activated Carbon (GAC) Filter</span>
                </div>
              </div>
            </div>
          </div>
          <div id="treatment-step-4" class="clearfix treatment-step">
            <div class="col-sm-1">
              <div id="div_step_4_circle" class="step_circle">
                <span id="step_4_no">Step 3</span></div>
            </div>
            <div class="col-sm-11">
              <div class="step_boxes text-center">
                <div class="home_icon">
                  <img src="Images/water/smallhome2.png">
                </div>
                <span class="caret"></span>
                <div id="a4_box" class="box_main">
                  <span id="a4">Whole House Acid Neutralizer System</span>
                </div>
              </div>
            </div>
          </div>
          <div id="treatment-step-5" class="clearfix treatment-step">
            <div class="col-sm-1">
              <div id="div_step_5_circle" class="step_circle">
                <span id="step_5_no">Step 4</span></div>
            </div>
            <div class="col-sm-11">
              <div class="step_boxes text-center">
                <div class="home_icon">
                  <img src="Images/water/facut.jpg">
                </div>
                <span class="caret"></span>
                <div id="a5_box" class="box_main hide">
                  <span id="a5">Point-of-Use (POU) Arsenic Adsorption Media Filter System</span>
                </div>
                <span id="or_5_1" class="or hide">OR</span>
                <div id="b5_box" class="box_main">
                  <span
                    id="b5">Point-of-Use (POU) Reverse Osmosis (RO) System</span>
                </div>
                <span id="or_5_2" class="or hide">OR</span>
                <div id="c5_box" class="box_main hide">
                  <span id="c5">Point-of-Use (POU) Activated Alumina Filter System</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div id="div_tt_wh" class="step_class">
          <br><span>Regardless of water treatment technology, it is essential that system maintenance be
                            performed on schedule to maintain system effectiveness.
                            </span><br>
          <br><span>
                            </span><br>
          <span><b>What does “whole house” mean?</b> The term whole house indicates that the treatment
                            technology is installed at the point where water enters your home to treat all of
                            the water used in your home.
                            </span>
        </div>
        <div id="div_tt_pou" class="step_class">
          <b>What does “Point of Use” (POU) mean?</b> Point of Use technologies
          are installed
          and treat water at one specific location in your Home where water is
          used, like
          your kitchen faucet.
        </div>
        <div id="div_tt_wh_detail" class="portlet-body">
          <span>Print this report and make final water treatment decisions with a qualified <a
              target="_blank"
              href="http://www.wqa.org/Programs-Services/Resources/Find-Providers/Find-Certified-Professionals">water treatment professional.</a></span>
          <br>
          <br>
          <span>More Information about selecting appropriate water treatment devices is available
                                from <a target="_blank"
                                        href="http://www.nsf.org/consumer-resources/what-is-nsf-certification/water-filters-treatment-certification/selecting-a-water-treatment-system/">
                                    NSF</a> and <a target="_blank"
                                                   href="http://www.extension.org/pages/31581/home-water-treatment-devices#.VIdCJcgo7cs">
                                        Cooperative Extension</a>.
                                <br>
                            </span>
        </div>
        <br>
        <div id="div19" class="portlet-body">
                            <span>More Information is available from <a
                                target="_blank"
                                href="http://des.nh.gov/organization/commissioner/pip/factsheets/dwgb/index.htm">
                                NHDES</a> and <a target="_blank"
                                                 href="http://water.epa.gov/drink/contaminants/index.cfm">US EPA</a></span>
        </div>
        <div>
        </div>
      </div>
      <h1 class="head ui-accordion-header" role="tab" tabindex="0">
        <i class="fa fa-caret-down" aria-hidden="true"></i>
        Results Details
      </h1>
      <div class="datatable usa-width-one-whole">
        <table id="be-well-informed-result-details-table"
               class="responsive-table usa-table-borderless">
          <thead>
          <tr>
            <th>Result</th>
            <th>Element</th>
            <th>Your Entry</th>
            <th>Limit</th>
            <th>About Your Well Water</th>
          </tr>
          </thead>
          <tbody>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</div>