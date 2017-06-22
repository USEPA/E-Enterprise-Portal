<a class="about-widget ee-bootstrap-tooltip favorites-ignore" id="resources-lgc-help" href="javascript:void(0)"
   title="Learn more about the Resources for Local Communities widget"><img class="favorites-ignore"
                                                                            src="<?php print base_path() . path_to_theme(); ?>/images/question-circle.png"
                                                                            alt="Learn more about the Resources for Local Communities widget"></a>
<div id="resources-lgc-about" class="element-hidden">
  <?php print $recommended_resources_html; ?>
</div>
<div class="back-to-lgc-widget">
  <div class="usa-grid">
    <div class="usa-width-one-third">
      <span class="left-arrow"></span>
    </div>
    <div class="usa-width-two-thirds">
      <a href="javascript:void(0)">Back</a>
      <h4>Resources for Local Communities</h4>
    </div>
  </div>
</div>


<div id="local-resources-tabs" class="view-content">
  <?php
  // Load the currently logged in user.
  global $user;

  if ($user->name !== 'guest-user'): ?>
    <!-- link to manage My Profile Topics -->
    <div class="usa-width-one-whole manage-my-topics-grid-wrapper">
      <a class="manage-my-topics-grid" href="javascript:void(0)" title="Manage My Profile Topics">
        Manage My Profile Topics
        <i class="grid-selector fa fa-th" aria-hidden="true" title="Manage My Profile Topics"></i>
      </a>
    </div>

    <ul>
      <li id="all-local-resources-button"><a class="favorites-ignore" href="#all-local-resources-wrapper">All</a>
      </li>
      <li id="restrict-to-local-resources-button"><a class="favorites-ignore" href="#user-local-resources-wrapper">My
          Resources</a></li>
    </ul>
  <?php endif; ?>

  <div id="all-local-resources-wrapper" class="all local resources wrapper clearfix toggle-open">
    <div class="faceted-filters on left">
      <div class="toggle">
        <a href="#" class="favorites-ignore">
          Adjust selections
          <img src="<?php print drupal_get_path('module', 'local_government_resources'); ?>/images/chevron-left.png"
               alt="Click to collapse"/>
        </a>
      </div>
      <h3>
        <span class="icon on">
          <a href="#" class="favorites-ignore">
            <img src="<?php print drupal_get_path('module', 'local_government_resources'); ?>/images/arrow-down.png"
                 class="on" alt="Source expanded.  Click to collapse"/>
            <img src="<?php print drupal_get_path('module', 'local_government_resources'); ?>/images/arrow-right.png"
                 class="off" alt="Source collapsed.  Click to expand"/>            
          </a>
        </span>
        Source
      </h3>
      <div class="source facet"></div>
      <h3>
        <span class="icon on">
          <a href="#" class="favorites-ignore">
            <img src="<?php print drupal_get_path('module', 'local_government_resources'); ?>/images/arrow-down.png"
                 class="on" alt="Topic expanded. Click to collapse"/>
            <img src="<?php print drupal_get_path('module', 'local_government_resources'); ?>/images/arrow-right.png"
                 class="off" alt="Topic collapsed. Click to expand"/>
          </a>
        </span>
        Topic
      </h3>
      <div class="topic facet"></div>
      <h3>
        <span class="icon on">
          <a href="#" class="favorites-ignore">
            <img src="<?php print drupal_get_path('module', 'local_government_resources'); ?>/images/arrow-down.png"
                 class="on" alt="Category expanded. Click to collapse"/>
            <img src="<?php print drupal_get_path('module', 'local_government_resources'); ?>/images/arrow-right.png"
                 class="off" alt="Category collapsed. Click to expand"/>
          </a>
        </span>
        Category
      </h3>
      <div class="category facet"></div>
      <h3>
        <span class="icon on">
          <a href="#" class="favorites-ignore">
            <img src="<?php print drupal_get_path('module', 'local_government_resources'); ?>/images/arrow-down.png"
                 class="on" alt="Tool type expanded. Click to collapse"/>
            <img src="<?php print drupal_get_path('module', 'local_government_resources'); ?>/images/arrow-right.png"
                 class="off" alt="Tool type collapsed. Click to expand"/>
          </a>
        </span>
        Tool Type
      </h3>
      <div class="tool-type facet"></div>
      <h3>
        <span class="icon on">
          <a href="#" class="favorites-ignore">
            <img src="<?php print drupal_get_path('module', 'local_government_resources'); ?>/images/arrow-down.png"
                 class="on" alt="Training level expanded. Click to collapse"/>
            <img src="<?php print drupal_get_path('module', 'local_government_resources'); ?>/images/arrow-right.png"
                 class="off" alt="Training level collapsed. Click to expand"/>
          </a>
        </span>
        Training Level
      </h3>
      <div class="training-level facet"></div>
      <h3>
        <span class="icon on">
          <a href="#" class="favorites-ignore">
            <img src="<?php print drupal_get_path('module', 'local_government_resources'); ?>/images/arrow-down.png"
                 class="on" alt="Data Requirements expanded. Click to collapse"/>
            <img src="<?php print drupal_get_path('module', 'local_government_resources'); ?>/images/arrow-right.png"
                 class="off" alt="Data Requirements collapsed. Click to expand"/>
          </a>
        </span>
        Data Requirements
      </h3>
      <div class="data-requirements facet"></div>
      <h3>
        <span class="icon on">
          <a href="#" class="favorites-ignore">
            <img src="<?php print drupal_get_path('module', 'local_government_resources'); ?>/images/arrow-down.png"
                 class="on" alt="Relevance expanded. Click to collapse"/>
            <img src="<?php print drupal_get_path('module', 'local_government_resources'); ?>/images/arrow-right.png"
                 class="off" alt="Relevance collapsed. Click to expand"/>
          </a>
        </span>
        Relevance
      </h3>
      <div class="relevance facet"></div>
    </div>
    <div class="left">
      <div class="clearfix">
        <div class="faceted-filters off left">
          <div class="toggle">
            <a href="#" class="favorites-ignore">
              Adjust selections
              <img
                src="<?php print drupal_get_path('module', 'local_government_resources'); ?>/images/chevron-right.png"
                class="favorites-ignore" alt="Click to expand"/>
            </a>
          </div>
        </div>
        <div class="your-selections facets-expanded all-resources">Your selections</div>
        <div>
          <a class="clear-lgc-resources hidden" href="javascript:void(0);" onclick="clearResources();">Clear
            Selections</a>
        </div>
      </div>
      <div id="all-local-resources">
        <table id="lgc-table">
        </table>
      </div>
    </div>
  </div>
  <?php
  if ($user->name != 'guest-user'): ?>
    <div id="user-local-resources-wrapper" class="user local resources wrapper clearfix toggle-open">
      <div class="faceted-filters on left">
        <div class="toggle">
          <a href="#" class="favorites-ignore">
            Adjust selections
            <img src="<?php print drupal_get_path('module', 'local_government_resources'); ?>/images/chevron-left.png"
                 class="favorites-ignore" alt="Click to collapse"/>
          </a>
        </div>
        <h3>
          <span class="icon on">
            <a href="#" class="favorites-ignore">
              <img src="<?php print drupal_get_path('module', 'local_government_resources'); ?>/images/arrow-down.png"
                   class="on" alt="Click to collapse"/>
            </a>
            <a href="#" class="favorites-ignore">
              <img src="<?php print drupal_get_path('module', 'local_government_resources'); ?>/images/arrow-right.png"
                   class="off" alt="Click to expand"/>
            </a>
          </span>
          Source
        </h3>
        <div class="source facet"></div>
        <h3>
          <span class="icon on">
          <a href="#" class="favorites-ignore">
            <img src="<?php print drupal_get_path('module', 'local_government_resources'); ?>/images/arrow-down.png"
                 class="on" alt="Click to collapse"/>
          </a>
          <a href="#" class="favorites-ignore">
            <img src="<?php print drupal_get_path('module', 'local_government_resources'); ?>/images/arrow-right.png"
                 class="off" alt="Click to expand"/>
          </a>
        </span>
          Topic
        </h3>
        <div class="topic facet"></div>
        <h3>
          <span class="icon on">
          <a href="#" class="favorites-ignore">
            <img src="<?php print drupal_get_path('module', 'local_government_resources'); ?>/images/arrow-down.png"
                 class="on" alt="Click to collapse"/>
          </a>
          <a href="#" class="favorites-ignore">
            <img src="<?php print drupal_get_path('module', 'local_government_resources'); ?>/images/arrow-right.png"
                 class="off" alt="Click to expand"/>
          </a>
        </span>
          Category
        </h3>
        <div class="category facet"></div>
        <h3>
          <span class="icon on">
          <a href="#" class="favorites-ignore">
            <img src="<?php print drupal_get_path('module', 'local_government_resources'); ?>/images/arrow-down.png"
                 class="on" alt="Click to collapse"/>
          </a>
          <a href="#" class="favorites-ignore">
            <img src="<?php print drupal_get_path('module', 'local_government_resources'); ?>/images/arrow-right.png"
                 class="off" alt="Click to expand"/>
          </a>
        </span>
          Tool Type
        </h3>
        <div class="tool-type facet"></div>
        <h3>
          <span class="icon on">
          <a href="#" class="favorites-ignore">
            <img src="<?php print drupal_get_path('module', 'local_government_resources'); ?>/images/arrow-down.png"
                 class="on" alt="Click to collapse"/>
          </a>
          <a href="#" class="favorites-ignore">
            <img src="<?php print drupal_get_path('module', 'local_government_resources'); ?>/images/arrow-right.png"
                 class="off" alt="Click to expand"/>
          </a>
        </span>
          Training Level
        </h3>
        <div class="training-level facet"></div>
        <h3>
          <span class="icon on">
          <a href="#" class="favorites-ignore">
            <img src="<?php print drupal_get_path('module', 'local_government_resources'); ?>/images/arrow-down.png"
                 class="on" alt="Click to collapse"/>
          </a>
          <a href="#" class="favorites-ignore">
            <img src="<?php print drupal_get_path('module', 'local_government_resources'); ?>/images/arrow-right.png"
                 class="off" alt="Click to expand"/>
          </a>
        </span>
          Data Requirements
        </h3>
        <div class="data-requirements facet"></div>
        <h3>
          <span class="icon on">
            <a href="#" class="favorites-ignore">
              <img src="<?php print drupal_get_path('module', 'local_government_resources'); ?>/images/arrow-down.png"
                   class="on" alt="Click to collapse"/>
            </a>
            <a href="#" class="favorites-ignore">
              <img src="<?php print drupal_get_path('module', 'local_government_resources'); ?>/images/arrow-right.png"
                   class="off" alt="Click to expand"/>
            </a>
          </span>
          Relevance
        </h3>
        <div class="relevance facet"></div>
      </div>
      <div class="left">
        <div class="clearfix">
          <div class="faceted-filters off left">
            <div class="toggle">
              <a href="#" class="favorites-ignore">
                Adjust selections
                <img
                  src="<?php print drupal_get_path('module', 'local_government_resources'); ?>/images/chevron-right.png"
                  class="favorites-ignore" alt="Click to expand"/>
              </a>
            </div>
          </div>
          <div class="your-selections my-resources facets-expanded">Your selections</div>
          <div>
            <a class="clear-lgc-resources hidden" href="javascript:void(0);" onclick="clearResources();">Clear
              Selections</a>
          </div>
        </div>
        <div id="user-local-resources">
          <table id="lgc-user-table">

          </table>
        </div>
      </div>
    </div>
  <?php endif; ?>

</div>

<div id="manage-my-topics-wrapper">

</div>
