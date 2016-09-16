<div class="usa-grid-full">
  <div id="be-well-informed-form-wrapper" class="be-well-informed-modal-wrapper">
    <h1>Be Well Informed > Enter Your Water Analysis Results</h1>
    <?php

    $unit_types = ['mg/L', 'μg/L', 'ppm', 'ppb', 'gpg', 'units', 'CFU/100 mL', 'MPN/100 mL', 'mpn_100_ml'];

    $water_components = [
      [
        'name' => 'Arsenic',
        'machine_name' => 'arsenic',
        'symbol' => 'As',
        'default_unit_type' => 'mg/L',
        'validation' => [],
        'unit_types' => ['mg/L', 'μg/L', 'ppm', 'ppb']
      ],
      [
        'name' => 'Lead',
        'machine_name' => 'lead',
        'symbol' => 'Pb',
        'default_unit_type' => 'mg/L',
        'validation' => [],
        'unit_types' => ['mg/L', 'ppm']
      ],
      [
        'name' => 'Chloride',
        'machine_name' => 'chloride',
        'symbol' => 'Cl',
        'default_unit_type' => 'mg/L',
        'validation' => [],
        'unit_types' => ['mg/L', 'μg/L', 'ppm', 'ppb']
      ],
      [
        'name' => 'Lead, Stagnant',
        'machine_name' => 'leadst',
        'symbol' => 'Cl',
        'default_unit_type' => 'mg/L',
        'validation' => [],
        'unit_types' => ['mg/L', 'ppm']
      ],
      [
        'name' => 'Copper',
        'machine_name' => 'copper',
        'symbol' => 'Cu',
        'default_unit_type' => 'mg/L',
        'validation' => [],
        'unit_types' => ['mg/L', 'ppm']
      ],
      [
        'name' => 'Manganese',
        'machine_name' => 'manganese',
        'symbol' => 'Mn',
        'default_unit_type' => 'mg/L',
        'validation' => [],
        'unit_types' => ['mg/L', 'ppm']
      ],
      [
        'name' => 'Copper, Stagnant',
        'machine_name' => 'copperst',
        'symbol' => 'Cu',
        'default_unit_type' => 'mg/L',
        'validation' => [],
        'unit_types' => ['mg/L', 'ppm']
      ],
      [
        'name' => 'Nitrate-N',
        'machine_name' => 'nitrate',
        'symbol' => 'NO3',
        'symbol_text' => 'NO<span class="sub">3</span>',
        'default_unit_type' => 'mg/L',
        'validation' => [],
        'unit_types' => ['mg/L', 'ppm']
      ],
      [
        'name' => 'Fluoride',
        'machine_name' => 'fluoride',
        'symbol' => 'F',
        'default_unit_type' => 'mg/L',
        'validation' => [],
        'unit_types' => ['mg/L', 'ppm']
      ],
      [
        'name' => 'Nitrite-N',
        'machine_name' => 'nitrite',
        'symbol' => 'NO2',
        'symbol_text' => 'NO<span class="sub">2</span>',
        'default_unit_type' => 'mg/L',
        'validation' => [],
        'unit_types' => ['mg/L', 'ppm']
      ],
      [
        'name' => 'Hardness as CaCO3',
        'machine_name' => 'hardness',
        'symbol' => 'CaCO3',
        'symbol_test' => 'CaCO<span class="sub">3</span>',
        'default_unit_type' => 'mg/L',
        'validation' => [],
        'unit_types' => ['mg/L', 'ppm', 'gpg']
      ],
      [
        'name' => 'pH',
        'machine_name' => 'ph',
        'symbol' => 'ph',
        'default_unit_type' => 'unit',
        'validation' => [],
        'unit_types' => ['units']
      ],
      [
        'name' => 'Iron',
        'machine_name' => 'iron',
        'symbol' => 'Cl',
        'default_unit_type' => 'mg/L',
        'validation' => [],
        'unit_types' => ['mg/L', 'ppm']
      ],
      [
        'name' => 'Sodium',
        'machine_name' => 'sodium',
        'symbol' => 'na',
        'default_unit_type' => 'mg/L',
        'validation' => [],
        'unit_types' => ['mg/L', 'ppm']
      ]
    ];

    $microbiology = [
      [
        'name' => 'Total Coliform',
        'machine_name' => 'totalcoliform',
        'default_unit_type' => 'CFU/100 mL',
        'validation' => [],
        'unit_types' => ['CFU/100 mL', 'MPN/100 mL'],
        'radio_name' => 'Bac',
      ],
      [
        'name' => 'E. Coli',
        'machine_name' => 'ecolibacteria',
        'default_unit_type' => 'CFU/100 mL',
        'validation' => [],
        'unit_types' => ['CFU/100 mL', 'MPN/100 mL'],
        'radio_name' => 'Ecoli',
      ],
    ];

    $radionuclides = [
      [
        'name' => 'Radon',
        'machine_name' => 'radon',
        'symbol' => 'na',
        'default_unit_type' => 'pCi/L',
        'validation' => [],
        'unit_types' => ['pCi/L']
      ],
      [
        'name' => 'Uranium',
        'machine_name' => 'uranium',
        'symbol' => 'U',
        'default_unit_type' => 'μg/L',
        'validation' => [],
        'unit_types' => ['pCi/L', 'μg/L']
      ],
      [
        'name' => 'Gross Alpha',
        'machine_name' => 'grossalpha',
        'symbol' => '',
        'default_unit_type' => 'pCi/L',
        'validation' => [],
        'unit_types' => ['pCi/L']
      ],
    ];

    $cities = ["Anonymous", "New England", "Acworth", "Albany", "Alexandria", "Allenstown", "Alstead", "Amherst", "Andover", "Antrim", "Ashland", "Atkinson", "Auburn", "Barnstead", "Barrington", "Bartlett", "Bath", "Bedford", "Belmont", "Bennington", "Benton", "Berlin", "Bethlehem", "Boscawen", "Bow", "Bradford", "Brentwood", "Bridgewater", "Bristol", "Brookfield", "Brookline", "Campton", "Canaan", "Candia", "Canterbury", "Carroll", "Center Harbor", "Charlestown", "Chatham", "Chester", "Chesterfield", "Chichester", "Claremont", "Clarksville", "Colebrook", "Columbia", "Concord", "Conway", "Cornish", "Croydon", "Dalton", "Danbury", "Danville", "Deerfield", "Deering", "Derry", "Dixville", "Dorchester", "Dover", "Dublin", "Dummer", "Dunbarton", "Durham", "East Kingston", "Easton", "Eaton", "Effingham", "Ellsworth", "Enfield", "Epping", "Epsom", "Errol", "Exeter", "Farmington", "Fitzwilliam", "Francestown", "Franconia", "Franklin", "Freedom", "Fremont", "Gilford", "Gilmanton", "Gilsum", "Goffstown", "Gorham", "Goshen", "Grafton", "Grantham", "Greenfield", "Greenland", "Greenville", "Groton", "Hampstead", "Hampton", "Hampton Falls", "Hancock", "Hanover", "Harrisville", "Hart's Location", "Haverhill", "Hebron", "Henniker", "Hill", "Hillsborough", "Hinsdale", "Holderness", "Hollis", "Hooksett", "Hopkinton", "Hudson", "Jackson", "Jaffrey", "Jefferson", "Keene", "Kensington", "Kingston", "Laconia", "Lancaster", "Landaff", "Langdon", "Lebanon", "Lee", "Lempster", "Lincoln", "Lisbon", "Litchfield", "Littleton", "Londonderry", "Loudon", "Lyman", "Lyme", "Lyndeborough", "Madbury", "Madison", "Manchester", "Marlborough", "Marlow", "Mason", "Meredith", "Merrimack", "Middleton", "Milan", "Milford", "Milton", "Monroe", "Mont Vernon", "Moultonborough", "Nashua", "Nelson", "New Boston", "Newbury", "New Castle", "New Durham", "Newfields", "New Hampton", "Newington", "New Ipswich", "New London", "Newmarket", "Newport", "Newton", "Northfield", "North Hampton", "Northumberland", "Northwood", "Orange", "Orford", "Ossipee", "Pelham", "Pembroke", "Peterborough", "Piermont", "Pittsburg", "Pittsfield", "Plainfield", "Plaistow", "Plymouth", "Portsmouth", "Randolph", "Raymond", "Richmond", "Rindge", "Rochester", "Rollinsford", "Roxbury", "Rumney", "Rye", "Salem", "Salisbury", "Sanbornton", "Sandown", "Sandwich", "Seabrook", "Sharon", "Shelburne", "Somersworth", "South Hampton", "Springfield", "Stark", "Stewartstown", "Stoddard", "Strafford", "Stratham", "Sugar Hill", "Sullivan", "Sunapee", "Surry", "Sutton", "Swanzey", "Tamworth", "Temple", "Thornton", "Tilton", "Troy", "Tuftonboro", "Unity", "Wakefield", "Walpole", "Warner", "Warren", "Washington", "Waterville Valley", "Weare", "Webster", "Wentworth", "West Chesterfield", "Westmoreland", "Whitefield", "Wilmot", "Wilton", "Winchester", "Windham", "Windsor", "Wolfeboro", "Woodstock"];

    $prefix = 'ct100$MainContent$';

    ?>

    <form action="" id="be-well-informed-form">
      <div class="row usa-grid-full ">
        <div class="row usa-width-one-whole">
          <div class="city-selection section usa-width-one-half">
            <label class="column one-half" for="<?php echo $prefix . 'drp' ?>city">New Hampshire / City -<span
                class="red"> Required</span></label>
            <select class="column one-half right" name="<?php echo $prefix . 'drp' ?>city" id="drpcity">
              <?php foreach ($cities as $c): ?>
                <option value="<?php echo $c ?>"><?php echo $c ?></option>
              <?php endforeach; ?>
            </select>
          </div>
        </div>
        <div class="components usa-width-one-half">
          <h3>Routine Water Analysis</h3>
          <?php foreach ($water_components as $wc): ?>
            <div class="row section">
              <label class="column one-third"
                     for="<?php echo $prefix . 'txt' . $wc['machine_name'] ?>"><?php echo $wc['name'] ?> <span
                  class="symbol">(<?php echo ($wc['symbol_text']) ? $wc['symbol_text'] : $wc['symbol'] ?>
                  )</span></label>
              <input class="column one-third" name="<?php echo $prefix . 'txt' . $wc['machine_name'] ?>" type="number"
                     id="txt<?php echo $wc['machine_name'] ?>">
              <select class="column one-third" name="<?php echo $prefix . 'ddl' . $wc['machine_name'] ?>"
                      id="ddl<?php echo $wc['machine_name'] ?>">
                <?php foreach ($wc['unit_types'] as $ut): ?>
                  <option
                    value="<?php echo $ut ?>" <?php echo ($wc['default_unit_type'] == $ut) ?: 'selected'; ?>> <?php echo $ut ?></option>
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
                <label class="column one-third"
                       for="<?php echo $prefix . 'txt' . $m['machine_name'] ?>"><?php echo $m['name'] ?></label>
                <input class="column one-third" name="<?php echo $prefix . 'txt' . $m['machine_name'] ?>" type="number"
                       id="txt<?php echo $m['machine_name'] ?>">
                <select class="column one-third" name="<?php echo $prefix . 'ddl' . $m['machine_name'] ?>"
                        id="ddl<?php echo $m['machine_name'] ?>">
                  <?php foreach ($m['unit_types'] as $ut): ?>
                    <option
                      value="<?php echo $ut ?>" <?php echo ($m['default_unit_type'] == $ut) ?: 'selected'; ?>> <?php echo $ut ?></option>
                  <?php endforeach; ?>
                </select>
                <div class="row absent-present">
                  <span class="column">Or Choose: </span>
                  <div class="column">
                    <input name="<?php echo $prefix . $m['radio_name'] ?>_G" type="radio"
                           id="rdb_<?php echo $m['radio_name'] ?>_True"
                           value="rdb_<?php echo $m['machine_name'] ?>_True">
                    <label for="rdb_<?php echo $m['radio_name'] ?>_True">Present</label>
                    <input name="<?php echo $prefix . $m['radio_name'] ?>_G" type="radio"
                           id="rdb_<?php echo $m['radio_name'] ?>_False"
                           value="rdb_<?php echo $m['machine_name'] ?>_False">
                    <label for="rdb_<?php echo $m['radio_name'] ?>_False">Absent</label>
                  </div>
                </div>
              </div>
            <?php endforeach; ?>
          </div>
          <div class="radionuclides">
            <h3>Radionuclides</h3>
            <?php foreach ($radionuclides as $rn): ?>
              <div class="row section">
                <label class="column one-third"
                       for="<?php echo $prefix . 'txt' . $rn['machine_name'] ?>"><?php echo $rn['name'] ?> <?php if ($rn['symbol_text'] || $rn['symbol']): ?>
                    <span class="symbol">(<?php echo ($rn['symbol_text']) ? $rn['symbol_text'] : $rn['symbol'] ?>
                    )</span><?php endif; ?></label>
                <input class="column one-third" name="<?php echo $prefix . 'txt' . $rn['machine_name'] ?>" type="number"
                       id="txt<?php echo $rn['machine_name'] ?>">
                <select class="column one-third" name="<?php echo $prefix . 'ddl' . $rn['machine_name'] ?>"
                        id="ddl<?php echo $rn['machine_name'] ?>">
                  <?php foreach ($rn['unit_types'] as $ut): ?>
                    <option
                      value="<?php echo $ut ?>" <?php echo ($rn['default_unit_type'] == $ut) ?: 'selected'; ?>> <?php echo $ut ?></option>
                  <?php endforeach; ?>
                </select>
              </div>
            <?php endforeach; ?>
          </div>
        </div>
      </div>
      <div class="row usa-width-one-whole reset-submit">
        <div class="column right">
          <button id="water_analysis_reset" class="usa-button-primary-alt">Reset</button>
          <button type="button" id="submit-form" class="usa-button-primary">Submit</button>
        </div>
      </div>
    </form>
  </div>
  <div id="be-well-informed-loader-wrapper" class="be-well-informed-modal-wrapper">

  </div>
  <div id="be-well-informed-results-wrapper" class="be-well-informed-modal-wrapper">
    <h1>Be Well Informed > View Your Water Analysis Results</h1>
    <div id="be-well-informed-accordion">
      <h1>
        <i class="fa fa-caret-down" aria-hidden="true"></i>
        About the Results
      </h1>
      <div>
        <p>
          The Results below compare your water to federal and state health-based standards (Maximum Contaminant Levels -
          MCLs)
          and other guidelines (Secondary Maximum Contaminant Levels - SMCLs, health advisory levels, etc.). These
          standards
          and guidelines are often referred to as "limits" on your laboratory report. If your water exceeds or is
          approaching
          established federal/state drinking water limits or advisory levels for the contaminant(s) entered, additional
          health
          information and treatment options will be shown.
        </p>
        <p>
          Several contaminants, such as radon and sodium, do not have state
          or federal standards. Instead, when radon is present in drinking water at 2,000 pCi/L or greater, we recommend
          you
          check the
          <a href="http://des.nh.gov/organization/commissioner/pip/factsheets/dwgb/documents/dwgb-3-12.pdf">
            Drinking Water Fact Sheet
          </a>.
          For sodium, health and treatment information is shown when sodium is
          present at
          levels above 20 mg/L, U.S. EPA's federal "health advisory" for persons on a physician-prescribed “no salt
          diet.”
        </p>
      </div>
      <h1>
        <i class="fa fa-caret-right" aria-hidden="true"></i>
        Results Summary
      </h1>
      <div class="datatable usa-width-one-whole">
        <div class="bwi-legend">
          <div class="bwi-key one-fifth">Key</div>
          <div class="bwi-meets-limit one-fifth">Meets the Drinking Water Limit</div>
          <div class="bwi-close-to-limit one-fifth">Close to the Drinking Water Limit</div>
          <div class="bwi-above-limit one-fifth">Above the Drinking Water Limit</div>
          <div class="bwi-no-entry one-fifth">No Input Entered</div>
        </div>
        <table id="be-well-informed-results-table" class="responsive-table usa-table-borderless">
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
<!--      <h1>-->
<!--        <i class="fa fa-caret-right" aria-hidden="true"></i>-->
<!--        Results Details-->
<!--      </h1>-->
<!--      <table id="be-well-informed-result-details-table" class="responsive-table usa-table-borderless">-->
<!--        <thead>-->
<!--        <tr>-->
<!--          <th>Result</th>-->
<!--          <th>Element</th>-->
<!--          <th>Your Entry</th>-->
<!--          <th>Limit</th>-->
<!--          <th>About Your Well Water</th>-->
<!--          <th>Interpretation of Results</th>-->
<!--          <th>Health Concerns</th>-->
<!--          <th>Treatment Options</th>-->
<!--        </tr>-->
<!--        </thead>-->
<!--        <tbody>-->
<!--        </tbody>-->
<!--      </table>-->
    </div>
  </div>
</div>
