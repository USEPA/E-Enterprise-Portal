<div class="usa-grid-full">
  <h1>Be Well Informed > Enter Your Water Analysis Results</h1>
  <?php

  $water_components = [
    [
      'name'=>'Arsenic',
      'machine_name'=>'arsenic',
      'symbol'=>'As',
      'default_unit_type'=>'mg_l',
      'validation'=>[]
    ],
    [
      'name'=>'Chloride',
      'machine_name'=>'chloride',
      'symbol'=>'Cl',
      'default_unit_type'=>'mg_l',
      'validation'=>[]
    ],
    [
      'name'=>'Copper',
      'machine_name'=>'copper',
      'symbol'=>'Cu',
      'default_unit_type'=>'mg_l',
      'validation'=>[]
    ],
    [
      'name'=>'Copper, Stagnant',
      'machine_name'=>'copper_stagnant',
      'symbol'=>'Cu',
      'default_unit_type'=>'mg_l',
      'validation'=>[]
    ],
    [
      'name'=>'Fluoride',
      'machine_name'=>'fluoride',
      'symbol'=>'F',
      'default_unit_type'=>'mg_l',
      'validation'=>[]
    ],
    [
      'name'=>'Hardness as CaCO3',
      'machine_name'=>'hardness_as_caco3',
      'symbol'=>'CaCO3',
      'symbol_test'=>'CaCO<span class="sub">3</span>span>',
      'default_unit_type'=>'mg_l',
      'validation'=>[]
    ],
    [
      'name'=>'Iron',
      'machine_name'=>'iron',
      'symbol'=>'Cl',
      'default_unit_type'=>'mg_l',
      'validation'=>[]
    ],
    [
      'name'=>'Lead',
      'machine_name'=>'lead',
      'symbol'=>'Pb',
      'default_unit_type'=>'mg_l',
      'validation'=>[]
    ],
    [
      'name'=>'Lead, Stagnant',
      'machine_name'=>'lead_stagnant',
      'symbol'=>'Cl',
      'default_unit_type'=>'mg_l',
      'validation'=>[]
    ],
    [
      'name'=>'Manganese',
      'machine_name'=>'manganese',
      'symbol'=>'Mn',
      'default_unit_type'=>'mg_l',
      'validation'=>[]
    ],
    [
      'name'=>'Nitrate',
      'machine_name'=>'nitrate',
      'symbol'=>'NO3',
      'symbol_text'=>'NO<span class="sub">3</span>span>',
      'default_unit_type'=>'mg_l',
      'validation'=>[]
    ],
    [
      'name'=>'Nitrite',
      'machine_name'=>'nitrite',
      'symbol'=>'NO2',
      'symbol_text'=>'NO<span class="sub">2</span>span>',
      'default_unit_type'=>'mg_l',
      'validation'=>[]
    ],
    [
      'name'=>'Chloride',
      'machine_name'=>'chloride',
      'symbol'=>'Cl',
      'default_unit_type'=>'mg_l',
      'validation'=>[]
    ],
    [
      'name'=>'pH',
      'machine_name'=>'ph',
      'symbol'=>'ph',
      'default_unit_type'=>'unit',
      'validation'=>[]
    ],
    [
      'name'=>'Sodium',
      'machine_name'=>'sodium',
      'symbol'=>'na',
      'default_unit_type'=>'mg_l',
      'validation'=>[]
    ]
  ];

  $microbiology = [
    [
      'name'=>'Total Coliform',
      'machine_name'=>'coliform',
      'default_unit_type'=>'cfu_100_ml',
      'validation'=>[]
    ],
    [
      'name'=>'E. Coli',
      'machine_name'=>'e_coli',
      'default_unit_type'=>'cfu_100_ml',
      'validation'=>[]
    ],
  ];

  $radionuclides = [
    [
      'name'=>'Gross Alpha',
      'machine_name'=>'gross_alpha',
      'symbol'=>'',
      'default_unit_type'=>'pci_l',
      'validation'=>[]
    ],
    [
      'name'=>'Radon',
      'machine_name'=>'radon',
      'symbol'=>'na',
      'default_unit_type'=>'pci_l',
      'validation'=>[]
    ],
    [
      'name'=>'Uranium',
      'machine_name'=>'uranium',
      'symbol'=>'U',
      'default_unit_type'=>'μg_l',
      'validation'=>[]
    ],
  ];

  $unit_types_components = [
    [
      'name' => 'mg/L',
      'machine_name' => 'mg_l',
    ],
    [
      'name' => 'μg/L',
      'machine_name' => 'μg_l',
    ],
    [
      'name' => 'ppm',
      'machine_name' => 'ppm',
    ],
    [
      'name' => 'ppb',
      'machine_name' => 'ppb',
    ],
    [
      'name' => 'gpg',
      'machine_name' => 'gpg',
    ],
    [
      'name' => 'units',
      'machine_name' => 'units',
    ],
    [
      'name' => 'CFU/100 mL',
      'machine_name' => 'cfu_100_ml',
    ],
    [
      'name' => 'MPN/100 mL',
      'machine_name' => 'mpn_100_ml',
    ],
  ];

  $unit_types_micros = [
    [
      'name' => 'CFU/100 mL',
      'machine_name' => 'cfu_100_ml',
    ],
    [
      'name' => 'MPN/100 mL',
      'machine_name' => 'mpn_100_ml',
    ],
  ];

  $unit_types_radio = [
    [
      'name' => 'pCi/L',
      'machine_name' => 'pci_l',
    ],
    [
      'name' => 'μg/L',
      'machine_name' => 'μg_l',
    ]
  ];

  ?>

  <form action="">
    <div class="row">
      <h3>Routine Water Analysis</h3>
      <div class="usa-grid-full components">
        <?php foreach($water_components as $wc): ?>
          <div class="row component">
            <label class="column one-third" for="<?php echo $wc['machine_name'] ?>"><?php echo $wc['name'] ?> <span class="symbol">(<?php echo ($wc['symbol_text'])? $wc['symbol_text'] :$wc['symbol'] ?>)</span></label>
            <input class="column one-third" name="<?php echo $wc['machine_name'] ?>" type="number">
            <select class="column one-third" name="" id="">
              <?php foreach($unit_types as $ut): ?>
                <option value="<?php echo $ut['machine_name'] ?>" <?php echo ($wc['default_unit_type']==$ut['machine_name']) ?: 'selected'; ?>> <?php echo $ut['name'] ?></option>
              <?php endforeach; ?>
            </select>
          </div>
        <?php endforeach; ?>

      </div>
      <div class="col-xs-6 col-sm-6">

      </div>
    </div>
  </form>
</div>
