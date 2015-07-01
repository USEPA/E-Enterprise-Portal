<?php
	  global $user;
  $user_data = user_load($user->uid);

  if (isset($user_data->field_profile_favourites[LANGUAGE_NONE])) {
		$user_urls = $user_data->field_profile_favourites[LANGUAGE_NONE];
		foreach($user_urls as $key=>$value) {
			echo '<input type="hidden" class="user_url" id="loaded_url_' . $key . '" value="' . $value['value'] .'">';
		}
  }
	?>


<ul>
	<li><a href="example.com">Example Link 1</a></li>
	<li><a href="example2.com">Example Link 2</a></li>
	<li><a href="example3.com">Example Link 3</a></li>
	<li><a href="example4.com">Example Link 4</a></li>
	<li><a href="example5.com">Example Link 5</a></li>
	<li><a href="example6.com">Example Link 6</a></li>
	<li><a href="example7.com">Example Link 7</a></li>
	<li><a href="example8.com">Example Link 8</a></li>
	<li><a href="example9.com">Example Link 9</a></li>
</ul>

