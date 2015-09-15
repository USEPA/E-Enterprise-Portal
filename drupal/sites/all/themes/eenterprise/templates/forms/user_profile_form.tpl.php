<?php
drupal_add_js(drupal_get_path('module', 'eenterprise_utility') . '/location_input_engine.js');
drupal_add_css("sites/all/libraries/jqueryui/themes/base/jquery.ui.tabs.css", "file");
drupal_add_js("sites/all/libraries/jqueryui/ui/jquery.ui.tabs.js", "file");
drupal_add_js(drupal_get_path('module', 'eenterprise_utility') . '/eenterprise_utility.js');
drupal_add_css('https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css', 'external');
?>
<div class="edit-user-profile">
  <div id="profile-tabs">
    <ul>
      <li><a class="favorites-ignore" href="#profile-account">Account</a></li>
      <li><a class="favorites-ignore" href="#profile-locations">Locations</a></li>
      <li><a class="favorites-ignore" href="#profile-favorites">Favorites</a></li>
    </ul>
    <div id="profile-account">
      <h3>User Information</h3>
      <?php
      print render($form['field_profile_first_name']);
      print render($form['account']['mail']);
      ?>
    </div>
    <div id="profile-locations">
      <h3>Locations of Interest</h3>
      <p class="eenterprise-utility-form-item-description-p">
        <?php
        print location_description();
        ?>
        <span class='zip_code_ajax_error'></span>
      </p>
      <div id='zipcode_description' class='form-group'>
        <?php
        print render($form['field_zip_code']);
        ?>
      </div>
      <div style="clear:both"></div>
    </div>
    <div id="profile-favorites">
      <h3>Favorite Links</h3>
      <p class="eenterprise-utility-form-item-description-p field-title-below">
        Add and manage your favorite links.</p>

      <div id='links_description' class='form-group'>
        <?php
        print render($form['field_profile_favourites']);
        ?>
      </div>
    </div>
  </div>
  <div class="col-xs-12">
    <?php
    print drupal_render_children($form);
    ?>
      <div id="delete-holder" style="display:none">
          <div>This will delete your entire profile, including any selected preferences, from the E-Enterprise Platform and will log you out from the system. Are you sure that you want to do this?</div>
          <div class="pull-right"><button id="cancel-delete-profile" class="btn btn-default" type="button">Back</button> <button id="confirm-delete-profile" type="button" class="btn btn-danger">Delete Profile</button></div>
      </div>

  </div> <!--col-->

</div> <!-- edit user-profile -->
