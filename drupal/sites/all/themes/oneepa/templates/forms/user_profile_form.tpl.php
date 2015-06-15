<?php
print "<div class=\"edit-user-profile\">";
print "<h3>User Information</h3>";
print render($form['field_profile_first_name']);
print render($form['field_profile_last_name']);
print render($form['account']['mail']);
?>
<h3>Locations of Interest</h3>
<p id="user-profile-form" class="eenterprise-utility-form-item-description-p">Add your locations of interest to see environmental maps and information relevant to those areas. We will use the first location as your primary location.</p>
<?php
print render($form['field_zip_code']);
print "<h3>Topics of Interest</h3>";
print '<p id="user-profile-form" class="eenterprise-utility-form-item-description-p field-title-below">'
		. 'What topics are you interested in? '
		. 'This information will help us suggest content that is most relevant to you.</p>';
print render($form['field_profile_interests']);
print "<h3>Favorite Links</h3>";
print '<p id="user-profile-form" class="eenterprise-utility-form-item-description-p field-title-below">'
		. 'Add and manage your favorite links.</p>';
print render($form['field_profile_favourites']);
print drupal_render_children($form);
print "</div>";
?>