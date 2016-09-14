<h1>Be Well Informed > Enter Your Water Analysis Results</h1>
<?php


$water_components = [
  [
    'name'=>'Arsenic',
    'machine_name'=>'arsenic',
    'symbol'=>'As',
    'default_unit_type'=>'mg/L',
    'validation'=>[]
  ]
];

$unit_types = [
  [
    'name' => 'mg/L',
    'machine_name' => 'mg_l',
    ],
  [
    'name' => 'units',
    'machine_name' => 'units',
  ],
 ];
?>

<form action="">
  <div class="row">
    <div class="col-xs-12 col-sm-6">
      <?php foreach($water_components as $wc): ?>
        <div class="row">
          <label for="<?php echo $wc['machine_name'] ?>"><?php echo $wc['name'] ?> <span class="symbol">(<?php echo $wc['symbol'] ?>)</span></label>
          <input name="<?php echo $wc['machine_name'] ?>" type="text">
          <select name="" id="">
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
