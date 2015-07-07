<?php
print "<div class=\"view-user-profile\">";
print "<h3>User</h3>";
print render($user_profile['field_profile_first_name']); 
print render($user_profile['field_profile_last_name']); 
print render($user_profile['account']['mail']);
print "<h3>Locations of Interest</h3>";
print render($user_profile['field_zip_code']);
print render($user_profile['field_zip_code'][0]);
print "<h3>Interests</h3>";
print render($user_profile['field_profile_interests'][0]);
print "<h3>Favorites</h3>";
print render($user_profile['field_profile_favourites']);
print "</div>";
global $user;
print "<h3><a href='/user/".$user->uid."/edit'>Edit Profile</a></h3>";
?>