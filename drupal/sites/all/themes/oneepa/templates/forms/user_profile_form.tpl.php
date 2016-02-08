<script src="//ajax.googleapis.com/ajax/libs/jqueryui/1.11.2/jquery-ui.min.js"></script>
<?php
      drupal_add_js(drupal_get_path('module', 'eenterprise_utility') . '/eenterprise_utility.js');
drupal_add_css('https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css', 'external');

?>
<div class="edit-user-profile">
<div class="row">
	<div class="col-xs-12">
		<div class="panel panel-default">
		<div class="panel-body">
<h3>User Information</h3>
<?php
print render($form['field_profile_first_name']);
print render($form['field_profile_last_name']);
print render($form['account']['mail']);
?>
</div> <!--panel-body-->
</div> <!--panel-->
</div><!-- col-->
<div class="col-xs-12 col-md-12">
	<div class="panel panel-default">
		<div class="panel-body">
<h3>Locations of Interest</h3>
<p class="eenterprise-utility-form-item-description-p">
<?php
    $location_description = "Add your locations of interest to see environmental information relevant to those areas. Select your primary location
	by clicking the <i class='fa fa-key description-key'></i> icon. <br />";
$geolocation = false;
if (isset($_SESSION['geolocation_used'])) {
    if ($_SESSION['geolocation_used'] == 'true') {
        $geolocation = true;
        $location_description .=  'Until a location is specified, the location detected upon your initial login will be set as the default.';
    }
}
if ($geolocation == false) {
    $location_description  .=  'Until a location is specified, the default location is set to Durham, North Carolina.';
}
print $location_description;
?>
	<span class='zip_code_ajax_error'></span>
</p>
<div id='zipcode_description' class='form-group'>
<?php
print render($form['field_zip_code']);
?>
</div>

<!--<button id="add-field-zip-code" type="button" class="btn btn-success">+</button>-->
<!--<div class="add_more_holder">
	<button type="button" id="clear_all_zip_codes" class="btn btn-sm btn-danger">Clear All</button>
</div>-->
</div> <!--panel-body-->
</div> <!--panel-->
</div> <!-- col-->
</div>
<div class="col-xs-12 col-md-12">
	<div class="panel panel-default">
		<div class="panel-body">
<h3>Favorite Links</h3>
<p class="eenterprise-utility-form-item-description-p field-title-below">
		Add and manage your favorite links.</p>

<div id='links_description' class='form-group'>
<?php
print render($form['field_profile_favourites']);
?>
</div>

<!--<div class="add_more_holder">
<button type="button" id="clear_all_favorite_links" class="btn btn-sm btn-danger">Clear All</button>
</div>-->
</div> <!--panel-body-->
</div> <!--panel-->
</div><!-- col-->


</div> <!--panel-body-->
</div> <!--panel-->
</div> <!-- col-->
<!--
<div class="col-xs-12">
<div class="panel panel-default">
	<div class="panel-body">
<?php
	// print render($form['field_interests2']);	
?>
	</div>
</div>
	</div>col-->


<div class="col-xs-12">

<?php
	print drupal_render_children($form);
?>

</div> <!--col-->
</div> <!-- row-->



</div> <!-- edit user-profile -->
