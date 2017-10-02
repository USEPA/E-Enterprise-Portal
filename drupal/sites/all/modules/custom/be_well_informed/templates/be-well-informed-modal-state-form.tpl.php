<div class="usa-grid-full">
  <div id="bwi-tabs">
    <ul class="navigation-tabs">
      <li><a href="#entry-results" id="entry-tab">Entry</a></li>
      <li><a href="#support-info">State/Tribe Resources</a></li>
    </ul>
    <div id="entry-results">
      <div id="be-well-informed-form-wrapper"
           class="be-well-informed-modal-wrapper">
        <h3>Enter the Results of Your Drinking Water Test</h3>
        <div class="bs-callout bs-callout-warning hidden">
          <h4>Please correct the errors below:</h4>
        </div>
    
        <div class="bs-callout bs-callout-info hidden">
          <h4>Everything appears valid</h4>
        </div>
    
        <form action="" id="water_analysis_results_form">
            <input type="hidden" name="StateCode" value="<?php echo $state_info['Code'] ?>">
          <div id="routine-contaminants" class="row usa-grid-full">
            <div class="row usa-width-one-whole">
              <div class="city-selection usa-width-one-half">
                <div class="section">
                  <label class="column one-half"
                         for="drpcity"></label>
                </div>
              </div>
    
              <div class="city-selection usa-width-one-half">
                <button class="column right" type="button" onclick="sampleData()">
                  Cycle through Sample Data
                </button>
              </div>
            </div>
            <?php echo $contaminant_sections; ?>
          </div>
          <div id="interactive-prompts"></div>
          <div class="row usa-width-one-whole reset-submit">
            <div class="column"></div>
            <div class="column right">
              <button id="water_analysis_reset"
                      class="usa-button usa-button-outline" type="button">Reset
              </button>
              <button id="water_analysis_submit" class="usa-button-primary"
                      type="button">Submit
              </button>
            </div>
          </div>
        </form>
      </div>
      <div id="be-well-informed-loading-wrapper"
           class="be-well-informed-modal-wrapper ">
        <h3>Loading Analysis</h3> <i class="fa fa-spinner" aria-hidden="true"></i>
      </div>

      <div id="be-well-informed-results-wrapper"
           class="be-well-informed-modal-wrapper">
      </div><!-- @end .be-well-informed-results-wrapper -->
    </div><!-- @end #entry-results tab pane -->
    <div id="support-info">
        <h3>State/Tribe Resources</h3>
        <?php
            foreach ($state_info['SupportInformation'] as $section) {
                echo '<div class="bwi-support-box">' . $section['@content'] . '</div>';
            }
        ?>
      </div>
    </div><!-- @end #support-info tab pane -->      
  </div><!-- @end tabs -->
</div><!-- @end .usa-grid-full -->
