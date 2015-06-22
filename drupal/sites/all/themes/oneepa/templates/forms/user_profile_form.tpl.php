
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
<p id="user-profile-form" class="eenterprise-utility-form-item-description-p">
	Add your locations of interest to see environmental maps and 
	information relevant to those areas. Please indicate your default 
	location by clicking the key icon. <br />	
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
<p id="user-profile-form" class="eenterprise-utility-form-item-description-p field-title-below">
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


<div class="col-xs-12">
	<div class="panel panel-default">
		<div class="panel-body">
<h3>Topics of Interest</h3>
<p id="user-profile-form" class="eenterprise-utility-form-item-description-p field-title-below">
		What topics are you interested in?
		This information will help us suggest content that is most relevant to you.</p>
<?php
print render($form['field_profile_interests']);
?>
</div> <!--panel-body-->
</div> <!--panel-->
</div> <!-- col-->

<div class="col-xs-12">

<?php
	print drupal_render_children($form);
?>

</div> <!--col-->
</div> <!-- row-->



</div> <!-- edit user-profile -->
