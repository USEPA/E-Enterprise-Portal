<div class="usa-grid-full">
  <h1>Be Well Informed > Enter Your Water Analysis Results</h1>
  <?php

  $unit_types = ['mg/L','μg/L','ppm','ppb','gpg','units','CFU/100 mL','MPN/100 mL','mpn_100_ml'];

  $water_components = [
    [
      'name'=>'Arsenic',
      'machine_name'=>'arsenic',
      'symbol'=>'As',
      'default_unit_type'=>'mg/L',
      'validation'=>[],
      'unit_types' => ['mg/L','μg/L','ppm','ppb']
    ],
    [
      'name'=>'Lead',
      'machine_name'=>'lead',
      'symbol'=>'Pb',
      'default_unit_type'=>'mg/L',
      'validation'=>[],
      'unit_types' => ['mg/L','ppm']
    ],
    [
      'name'=>'Chloride',
      'machine_name'=>'chloride',
      'symbol'=>'Cl',
      'default_unit_type'=>'mg/L',
      'validation'=>[],
      'unit_types' => ['mg/L','μg/L','ppm','ppb']
    ],
    [
      'name'=>'Lead, Stagnant',
      'machine_name'=>'leadst',
      'symbol'=>'Cl',
      'default_unit_type'=>'mg/L',
      'validation'=>[],
      'unit_types' => ['mg/L','ppm']
    ],
    [
      'name'=>'Copper',
      'machine_name'=>'copper',
      'symbol'=>'Cu',
      'default_unit_type'=>'mg/L',
      'validation'=>[],
      'unit_types' => ['mg/L','ppm']
    ],
    [
      'name'=>'Manganese',
      'machine_name'=>'manganese',
      'symbol'=>'Mn',
      'default_unit_type'=>'mg/L',
      'validation'=>[],
      'unit_types' => ['mg/L','ppm']
    ],
    [
      'name'=>'Copper, Stagnant',
      'machine_name'=>'copperst',
      'symbol'=>'Cu',
      'default_unit_type'=>'mg/L',
      'validation'=>[],
      'unit_types' => ['mg/L','ppm']
    ],
    [
      'name'=>'Nitrate-N',
      'machine_name'=>'nitrate',
      'symbol'=>'NO3',
      'symbol_text'=>'NO<span class="sub">3</span>',
      'default_unit_type'=>'mg/L',
      'validation'=>[],
      'unit_types' => ['mg/L','ppm']
    ],
    [
      'name'=>'Fluoride',
      'machine_name'=>'fluoride',
      'symbol'=>'F',
      'default_unit_type'=>'mg/L',
      'validation'=>[],
      'unit_types' => ['mg/L','ppm']
    ],
    [
      'name'=>'Nitrite-N',
      'machine_name'=>'nitrite',
      'symbol'=>'NO2',
      'symbol_text'=>'NO<span class="sub">2</span>',
      'default_unit_type'=>'mg/L',
      'validation'=>[],
      'unit_types' => ['mg/L','ppm']
    ],
    [
      'name'=>'Hardness as CaCO3',
      'machine_name'=>'hardness',
      'symbol'=>'CaCO3',
      'symbol_test'=>'CaCO<span class="sub">3</span>',
      'default_unit_type'=>'mg/L',
      'validation'=>[],
      'unit_types' => ['mg/L','ppm','gpg']
    ],
    [
      'name'=>'pH',
      'machine_name'=>'ph',
      'symbol'=>'ph',
      'default_unit_type'=>'unit',
      'validation'=>[],
      'unit_types' => ['units']
    ],
    [
      'name'=>'Iron',
      'machine_name'=>'iron',
      'symbol'=>'Cl',
      'default_unit_type'=>'mg/L',
      'validation'=>[],
      'unit_types' => ['mg/L','ppm']
    ],
    [
      'name'=>'Sodium',
      'machine_name'=>'sodium',
      'symbol'=>'na',
      'default_unit_type'=>'mg/L',
      'validation'=>[],
      'unit_types' => ['mg/L','ppm']
    ]
  ];

  $microbiology = [
    [
      'name'=>'Total Coliform',
      'machine_name'=>'totalcoliform',
      'default_unit_type'=>'CFU/100 mL',
      'validation'=>[],
      'unit_types' => ['CFU/100 mL','MPN/100 mL'],
      'radio_name' => 'Bac',
    ],
    [
      'name'=>'E. Coli',
      'machine_name'=>'ecolibacteria',
      'default_unit_type'=>'CFU/100 mL',
      'validation'=>[],
      'unit_types' => ['CFU/100 mL','MPN/100 mL'],
      'radio_name' => 'Ecoli',
    ],
  ];

  $radionuclides = [
    [
      'name'=>'Radon',
      'machine_name'=>'radon',
      'symbol'=>'na',
      'default_unit_type'=>'pCi/L',
      'validation'=>[],
      'unit_types' => ['pCi/L']
    ],
    [
      'name'=>'Uranium',
      'machine_name'=>'uranium',
      'symbol'=>'U',
      'default_unit_type'=>'μg/L',
      'validation'=>[],
      'unit_types' => ['pCi/L', 'μg/L']
    ],
    [
      'name'=>'Gross Alpha',
      'machine_name'=>'grossalpha',
      'symbol'=>'',
      'default_unit_type'=>'pCi/L',
      'validation'=>[],
      'unit_types' => ['pCi/L']
    ],
  ];

  $prefix = 'ct100$MainContent$';

  ?>

  <form action="" id="be-well-informed-form">
    <div class="row usa-grid-full ">
      <div class="components usa-width-one-half">
        <h3>Routine Water Analysis</h3>
        <?php foreach($water_components as $wc): ?>
          <div class="row section">
            <label class="column one-third" for="<?php echo $prefix.'txt'.$wc['machine_name'] ?>"><?php echo $wc['name'] ?> <span class="symbol">(<?php echo ($wc['symbol_text'])? $wc['symbol_text'] :$wc['symbol'] ?>)</span></label>
            <input class="column one-third" name="<?php echo $prefix.'txt'.$wc['machine_name'] ?>" type="number" id="txt<?php echo $wc['machine_name'] ?>">
            <select class="column one-third" name="<?php echo $prefix.'ddl'.$wc['machine_name']?>" id="ddl<?php echo $wc['machine_name'] ?>">
              <?php foreach($wc['unit_types'] as $ut): ?>
                <option value="<?php echo $ut ?>" <?php echo ($wc['default_unit_type']==$ut) ?: 'selected'; ?>> <?php echo $ut ?></option>
              <?php endforeach; ?>
            </select>
          </div>
        <?php endforeach; ?>
      </div>
      <div class="usa-width-one-half">
        <div class="microbiology">
          <h3>Bacteria / Microbiology</h3>
          <?php foreach($microbiology as $m): ?>
            <div class="row section">
              <label class="column one-third" for="<?php echo $prefix.'txt'.$m['machine_name'] ?>"><?php echo $m['name'] ?></label>
              <input class="column one-third" name="<?php echo $prefix.'txt'.$m['machine_name'] ?>" type="number" id="txt<?php echo $m['machine_name'] ?>">
              <select class="column one-third" name="<?php echo $prefix.'ddl'.$m['machine_name']?>" id="ddl<?php echo $m['machine_name'] ?>">
                <?php foreach($m['unit_types'] as $ut): ?>
                  <option value="<?php echo $ut ?>" <?php echo ($m['default_unit_type']==$ut) ?: 'selected'; ?>> <?php echo $ut ?></option>
                <?php endforeach; ?>
              </select>
              <div class="row absent-present">
                <span class="column">Or Choose: </span>
                <div class="column">
                  <input name="<?php echo $prefix.$m['radio_name'] ?>_G" type="radio" id="rdb_<?php echo $m['radio_name'] ?>_True" value="rdb_<?php echo $m['machine_name'] ?>_True">
                  <label for="rdb_<?php echo $m['radio_name'] ?>_True">Present</label>
                  <input name="<?php echo $prefix.$m['radio_name'] ?>_G" type="radio" id="rdb_<?php echo $m['radio_name'] ?>_False" value="rdb_<?php echo $m['machine_name'] ?>_False">
                  <label for="rdb_<?php echo $m['radio_name'] ?>_False">Absent</label>
                </div>
              </div>
            </div>
          <?php endforeach; ?>
        </div>
        <div class="radionuclides">
          <h3>Radionuclides</h3>
          <?php foreach($radionuclides as $rn): ?>
            <div class="row section">
              <label class="column one-third" for="<?php echo $prefix.'txt'.$rn['machine_name'] ?>"><?php echo $rn['name'] ?> <span class="symbol">(<?php echo ($rn['symbol_text'])? $rn['symbol_text'] :$rn['symbol'] ?>)</span></label>
              <input class="column one-third" name="<?php echo $prefix.'txt'.$rn['machine_name'] ?>" type="number" id="txt<?php echo $rn['machine_name'] ?>">
              <select class="column one-third" name="<?php echo $prefix.'ddl'.$rn['machine_name']?>" id="ddl<?php echo $rn['machine_name'] ?>">
                <?php foreach($rn['unit_types'] as $ut): ?>
                  <option value="<?php echo $ut ?>" <?php echo ($rn['default_unit_type']==$ut) ?: 'selected'; ?>> <?php echo $ut ?></option>
                <?php endforeach; ?>
              </select>
            </div>
          <?php endforeach; ?>
        </div>
      </div>
    </div>
  </form>
  <button id="submit-form" type="button">Submit(fake)</button>
</div>
