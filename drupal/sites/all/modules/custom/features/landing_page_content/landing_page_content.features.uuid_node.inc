<?php
/**
 * @file
 * landing_page_content.features.uuid_node.inc
 */

/**
 * Implements hook_uuid_features_default_content().
 */
function landing_page_content_uuid_features_default_content() {
  $nodes = array();

  $nodes[] = array(
  'title' => 'Welcome',
  'log' => 'Adjusted CSS classes to use CIO.gov usa-grid instead of row.  Removed shaded CSS class.',
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
<div class="jumbotron"><div class="container"><div class="well"><div class="welcome-message"><h1>Modernizing the business of environmental protection</h1><p>E-Enterprise for the Environment is a new model for collaborative leadership among environmental co-regulators, engaging with all interested and affected parties, to achieve positive environmental, human health, and economic outcomes.</p></div>
<div id="login-group" class="container">
<ul><li><a class="usa-button usa-button-big" href="/bridge-landing" id="edit-log-in">Log in</a></li><li class="guest-login"><a href="/guest_login">Browse as Guest</a></li>
<li id="new-toeenterprise"><a href="/new-users" class="new-guestuser">New to E-Enterprise Portal?</a></li>
</li>
</div></div></div></div>
<div class="usa-grid" id="benefits"><h2 class="element-invisible">Benefits to you</h2><ul><li><a href="#streamlining">Streamlining processes</a></li><li><a href="#trusted-info">Trusted information</a></li><li><a href="#productivity">Enhanced productivity</a></li></ul>
<div id="streamlining"><span><h3>Streamlining processes</h3><p>E-Enterprise for the Environment simplifies regulation by streamlining and modernizing the implementation of our environmental programs.</p></span><img alt="" src="sites/all/themes/eenterprise/images/baton-folder.jpg"></div>
<div id="trusted-info"><span><h3>Trusted information</h3><p>E-Enterprise for the Environment fosters greater trust among the regulated community, the public, and their government by improving data integrity and communication of accurate information.</p></span><img alt="" src="sites/all/themes/eenterprise/images/market-analysis.jpg"></div>
<div id="productivity"><span><h3>Enhanced productivity</h3><p>E-Enterprise for the Environment enables more informed and timely decision making and better environmental results by improving the productivity of the environmental protection enterprise.</p></span><img alt="" src="sites/all/themes/eenterprise/images/runner-sprint.jpg"></div>
</div><!-- end benefits-->
<div class="usa-grid" id="including"><br><h2 class="col-lg-12">What we\'re including</h2><ul><li class="col-lg-6 col-md-6 col-sm-12" id="workbench"><img alt="" src="sites/all/themes/eenterprise/images/workbench.png"><div><h3>Workbench</h3><p>Tools, data, and resources to help you.</p></div></li><li class="col-lg-6 col-md-6 col-sm-12" id="facilities"><img alt="" src="sites/all/themes/eenterprise/images/environment.png"><div><h3>Environmental Reporting</h3><p>New ways to submit information.</p></div></li><li class="col-lg-6 col-md-6 col-sm-12" id="reporting"><img alt="" src="sites/all/themes/eenterprise/images/headline.png"><div><h3>Maps &amp; Displays</h3><p>Learn more about the environment thru maps and data mashups.</p></div></li><li class="col-lg-6 col-md-6 col-sm-12 last" id="reporting"><img alt="" src="sites/all/themes/eenterprise/images/settings.png"><div><h3>Developer Community (Future)</h3><p>Find APIs, widgets, and tools to build and use environmental data and resources.</p></div></li></ul><p>Want to know more? Visit our <a href="faqs">FAQs</a> and <a href="release-notes">Release Notes</a>.</p></div>',
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
