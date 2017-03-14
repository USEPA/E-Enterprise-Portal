<?php
/**
 * @file
 * welcome_video.features.uuid_node.inc
 */

/**
 * Implements hook_uuid_features_default_content().
 */
function welcome_video_uuid_features_default_content() {
  $nodes = array();

  $nodes[] = array(
  'title' => 'Welcome',
  'log' => 'Adjusts slide 1 content per EE-1708.',
  'status' => 1,
  'comment' => 0,
  'promote' => 0,
  'sticky' => 0,
  'type' => 'page',
  'language' => 'und',
  'created' => 1442376945,
  'tnid' => 0,
  'translate' => 0,
  'uuid' => '2b189056-dc9f-485b-98a7-ab313ec78c6a',
  'body' => array(
    'und' => array(
      0 => array(
        'value' => '<?php
if(isset($_SESSION[\'trusted_login\']) && $_SESSION[\'trusted_login\'] == \'NO\')
print "<div class=\'messages error\'>Even though you have successfully reported for CDX, you are currently not allowed to access this application.</div>";
unset($_SESSION[\'trusted_login\']);
?>
<div class="jcarousel-wrapper">
<div class="jcarousel" data-jcarousel="true" tabindex="0">
    <ul class="slides">
        <li class="usa-grid video-slide"><div class="video-details"><h2>Customize your information</h2><p>The E-Enterprise Portal provides an important new means by which users can customize the types of information presented to them, find and select tools and other resources, and conduct transactions with EPA, Tribes, and States.</p><p>See the video <span aria-hidden="true">>></span></p></div><div class="video-holder"><div class="embed-responsive embed-responsive-16by9"><iframe title="Welcome to E-Enterprise video" width="560" height="315" src="https://www.youtube.com/embed/iFv0DYnW1-A" frameborder="0" allowfullscreen></iframe></div></div><!-- @end video-holder --></li>
        <li class="including"><h2>What\'s Included</h2><ul class="including_items"><li class="slide-row2"><img alt="" src="sites/all/themes/eenterprise/images/environment.png"><div><h3>Environmental Reporting</h3><p>New ways to submit information.</p></div></li><li class="slide-row2"><img alt="" src="sites/all/themes/eenterprise/images/settings.png"><div><h3>Developer Community (Future)</h3><p>New ways to submit information.</p></div></li><li class="slide-row2"><img alt="" src="sites/all/themes/eenterprise/images/workbench.png"><div><h3>Workbench</h3><p>Tools, data, and resources to help you.</p></div></li><li class="slide-row2"><img alt="" src="sites/all/themes/eenterprise/images/headline.png"><div><h3>Maps &amp; Dashboard</h3><p>Learn more about the environment thru maps and data mashups.</p><p class="learn-more">&hellip;<a href="<?php print base_path() ?>about">and more</a></p></div></li></ul></li>
<li class="lgc-slide"><div class="slide-image"><img class="lgc-roles" alt="Through our What Matters to You screen, you can select locations, organizations, and roles that matter to you to see relevant content, including local government resources." src="sites/all/themes/eenterprise/images/lgc-select-role-magnified.png"><img class="lgc-highlight" alt="You can see and update topics that matter to you in our Resources for Local Communities widget also." src="sites/all/themes/eenterprise/images/my-topics-large.png"></div><div class="slide-details"><h2>Find Local Government Resources</h2><p>The local government component will provide powerful, easy-to-use tools that will enable local governments to make better decisions, save staff time and money, and provide higher levels of service to community members.</p></div><p class="lgc-calltoaction">Select your location, organization, and role to find resources.</p></li>
    </ul>
</div>
        <a href="#" class="jcarousel-control-next" data-jcarouselcontrol="true"><img src="<?php print base_path() . path_to_theme(); ?>/images/white/chevron-next.svg" alt="Next slide"></a>
        <a href="#" class="jcarousel-control-prev" data-jcarouselcontrol="true"><img src="<?php print base_path() . path_to_theme(); ?>/images/white/chevron-prev.svg" alt="Previous slide"></a>
<p class="jcarousel-pagination" data-jcarouselpagination="true"><a href="#1" class="active">1</a><a href="#2">2</a><a href="#3">3</a></p>
</div>',
        'summary' => '',
        'format' => 'php_code',
      ),
    ),
  ),
  'rdf_mapping' => array(
    'rdftype' => array(
      0 => 'foaf:Document',
    ),
    'title' => array(
      'predicates' => array(
        0 => 'dc:title',
      ),
    ),
    'created' => array(
      'predicates' => array(
        0 => 'dc:date',
        1 => 'dc:created',
      ),
      'datatype' => 'xsd:dateTime',
      'callback' => 'date_iso8601',
    ),
    'changed' => array(
      'predicates' => array(
        0 => 'dc:modified',
      ),
      'datatype' => 'xsd:dateTime',
      'callback' => 'date_iso8601',
    ),
    'body' => array(
      'predicates' => array(
        0 => 'content:encoded',
      ),
    ),
    'uid' => array(
      'predicates' => array(
        0 => 'sioc:has_creator',
      ),
      'type' => 'rel',
    ),
    'name' => array(
      'predicates' => array(
        0 => 'foaf:name',
      ),
    ),
    'comment_count' => array(
      'predicates' => array(
        0 => 'sioc:num_replies',
      ),
      'datatype' => 'xsd:integer',
    ),
    'last_activity' => array(
      'predicates' => array(
        0 => 'sioc:last_activity_date',
      ),
      'datatype' => 'xsd:dateTime',
      'callback' => 'date_iso8601',
    ),
  ),
  'date' => '2015-09-16 00:15:45 -0400',
  'user_uuid' => '920bc7f6-fa5c-4683-b66a-a485f120f697',
);
  return $nodes;
}
