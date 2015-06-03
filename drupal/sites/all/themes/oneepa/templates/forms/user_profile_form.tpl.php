<?php
print "<div class=\"edit-user-profile\">";
print "<h3>User</h3>";
print render($form['field_profile_first_name']);
print render($form['field_profile_last_name']);
print render($form['account']['mail']);
?>
<h3>Locations of Interest</h3>
<p>Add your locations of interest to see environmental maps and information relevant to those areas. We will use the first location as your primary.</p>
<?php
print render($form['field_zip_code']);
print "<h3>Interests</h3>";
print render($form['field_profile_interests']);
print "<h3>Favorites</h3>";
print render($form['field_profile_favourites']);
print drupal_render_children($form);
print "</div>";
?>