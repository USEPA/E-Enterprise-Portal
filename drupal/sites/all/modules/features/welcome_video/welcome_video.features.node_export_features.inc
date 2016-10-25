<?php
/**
 * @file
 * welcome_video.features.node_export_features.inc
 */

/**
 * Implements hook_node_export_features_default().
 */
function welcome_video_node_export_features_default() {
  $node_export = array(
  'code_string' => 'array(
  (object) array(
      \'vid\' => \'23506\',
      \'uid\' => \'1\',
      \'title\' => \'Welcome - Option B Video Placement\',
      \'log\' => \'Changes aspect ratio for video to 16by9\',
      \'status\' => \'1\',
      \'comment\' => \'0\',
      \'promote\' => \'0\',
      \'sticky\' => \'0\',
      \'vuuid\' => \'3a22675e-89da-44be-af5f-5b639950cbf5\',
      \'nid\' => \'23387\',
      \'type\' => \'page\',
      \'language\' => \'und\',
      \'created\' => \'1463767449\',
      \'changed\' => \'1464021758\',
      \'tnid\' => \'0\',
      \'translate\' => \'0\',
      \'uuid\' => \'8bb3c737-82bb-48fa-b579-4ec56a0a5895\',
      \'revision_timestamp\' => \'1464021758\',
      \'revision_uid\' => \'1\',
      \'body\' => array(
        \'und\' => array(
          array(
            \'value\' => "<?php\\r\\nif(isset($_SESSION[\'trusted_login\']) && $_SESSION[\'trusted_login\'] == \'NO\')\\r\\nprint \\"<div class=\'messages error\'>Even though you have successfully reported for CDX, you are currently not allowed to access this application.</div>\\";\\r\\nunset($_SESSION[\'trusted_login\']);\\r\\n?>\\r\\n<div class=\\"jumbotron\\"><div class=\\"container\\"><div class=\\"well\\"><div class=\\"welcome-message\\"><h1>Modernizing the business of environmental protection</h1><p>E-Enterprise for the Environment is a new model for collaborative leadership among environmental co-regulators, engaging with all interested and affected parties, to achieve positive environmental, human health, and economic outcomes.</p></div>\\r\\n<div id=\\"login-group\\" class=\\"container\\">\\r\\n<ul><li><a class=\\"usa-button usa-button-big\\" href=\\"/bridge-landing\\" id=\\"edit-log-in\\">Log in</a></li><li class=\\"guest-login\\"><a href=\\"/guest_login\\">Browse as Guest</a></li>\\r\\n<li id=\\"new-toeenterprise\\"><a href=\\"/new-users\\" class=\\"new-guestuser\\">New to E-Enterprise Portal?</a></li>\\r\\n</li>\\r\\n</div></div></div></div>\\r\\n<div class=\\"usa-grid\\" id=\\"benefits\\"><h2 class=\\"element-invisible\\">Benefits to you</h2><ul><li><a href=\\"#streamlining\\">Streamlining processes</a></li><li><a href=\\"#trusted-info\\">Trusted information</a></li><li><a href=\\"#productivity\\">Enhanced productivity</a></li></ul>\\r\\n<div id=\\"streamlining\\"><span><h3>Streamlining processes</h3><p>E-Enterprise for the Environment simplifies regulation by streamlining and modernizing the implementation of our environmental programs.</p></span><img alt=\\"\\" src=\\"sites/all/themes/eenterprise/images/baton-folder.jpg\\"></div>\\r\\n<div id=\\"trusted-info\\"><span><h3>Trusted information</h3><p>E-Enterprise for the Environment fosters greater trust among the regulated community, the public, and their government by improving data integrity and communication of accurate information.</p></span><img alt=\\"\\" src=\\"sites/all/themes/eenterprise/images/market-analysis.jpg\\"></div>\\r\\n<div id=\\"productivity\\"><span><h3>Enhanced productivity</h3><p>E-Enterprise for the Environment enables more informed and timely decision making and better environmental results by improving the productivity of the environmental protection enterprise.</p></span><img alt=\\"\\" src=\\"sites/all/themes/eenterprise/images/runner-sprint.jpg\\"></div>\\r\\n</div><!-- end benefits-->\\r\\n<div class=\\"usa-grid\\" id=\\"ee-video\\"><div class=\\"video-holder usa-width-one-half\\"><div class=\\"embed-responsive embed-responsive-16by9\\"><iframe title=\\"Welcome to E-Enterprise video\\" width=\\"560\\" height=\\"315\\" src=\\"https://www.youtube.com/embed/iFv0DYnW1-A\\" frameborder=\\"0\\" allowfullscreen></iframe></div></div><div class=\\"video-details usa-width-one-half\\"><h2><span class=\\"sr-only\\">Welcome Video</span>Addressing Unique Needs of Many</h2><p>The E-Enterprise Portal provides an important new means by which users can customize the types of information presented to them, find and select tools and other resources, and, conduct transactions with EPA.</p></div></div>\\r\\n<div class=\\"usa-grid\\" id=\\"including\\"><br><h2>What we\'re including</h2><ul><li class=\\"col-lg-6 col-md-6 col-sm-12\\" id=\\"workbench\\"><img alt=\\"\\" src=\\"sites/all/themes/eenterprise/images/workbench.png\\"><div><h3>Workbench</h3><p>Tools, data, and resources to help you.</p></div></li><li class=\\"col-lg-6 col-md-6 col-sm-12\\" id=\\"facilities\\"><img alt=\\"\\" src=\\"sites/all/themes/eenterprise/images/environment.png\\"><div><h3>Environmental Reporting</h3><p>New ways to submit information.</p></div></li><li class=\\"col-lg-6 col-md-6 col-sm-12\\" id=\\"reporting\\"><img alt=\\"\\" src=\\"sites/all/themes/eenterprise/images/headline.png\\"><div><h3>Maps &amp; Displays</h3><p>Learn more about the environment thru maps and data mashups.</p></div></li><li class=\\"col-lg-6 col-md-6 col-sm-12 last\\" id=\\"reporting\\"><img alt=\\"\\" src=\\"sites/all/themes/eenterprise/images/settings.png\\"><div><h3>Developer Community (Future)</h3><p>Find APIs, widgets, and tools to build and use environmental data and resources.</p></div></li></ul><p>Want to know more? Visit our <a href=\\"faqs\\">FAQs</a> and <a href=\\"release-notes\\">Release Notes</a>.</p></div>",
            \'summary\' => \'\',
            \'format\' => \'php_code\',
          ),
        ),
      ),
      \'rdf_mapping\' => array(
        \'rdftype\' => array(
          \'foaf:Document\',
        ),
        \'title\' => array(
          \'predicates\' => array(
            \'dc:title\',
          ),
        ),
        \'created\' => array(
          \'predicates\' => array(
            \'dc:date\',
            \'dc:created\',
          ),
          \'datatype\' => \'xsd:dateTime\',
          \'callback\' => \'date_iso8601\',
        ),
        \'changed\' => array(
          \'predicates\' => array(
            \'dc:modified\',
          ),
          \'datatype\' => \'xsd:dateTime\',
          \'callback\' => \'date_iso8601\',
        ),
        \'body\' => array(
          \'predicates\' => array(
            \'content:encoded\',
          ),
        ),
        \'uid\' => array(
          \'predicates\' => array(
            \'sioc:has_creator\',
          ),
          \'type\' => \'rel\',
        ),
        \'name\' => array(
          \'predicates\' => array(
            \'foaf:name\',
          ),
        ),
        \'comment_count\' => array(
          \'predicates\' => array(
            \'sioc:num_replies\',
          ),
          \'datatype\' => \'xsd:integer\',
        ),
        \'last_activity\' => array(
          \'predicates\' => array(
            \'sioc:last_activity_date\',
          ),
          \'datatype\' => \'xsd:dateTime\',
          \'callback\' => \'date_iso8601\',
        ),
      ),
      \'name\' => \'admin\',
      \'picture\' => \'0\',
      \'data\' => \'b:0;\',
      \'path\' => array(
        \'pid\' => \'9\',
        \'source\' => \'node/23387\',
        \'alias\' => \'eenterprise-alternate\',
        \'language\' => \'und\',
      ),
      \'menu\' => NULL,
      \'node_export_drupal_version\' => \'7\',
    ),
)',
);
  return $node_export;
}
