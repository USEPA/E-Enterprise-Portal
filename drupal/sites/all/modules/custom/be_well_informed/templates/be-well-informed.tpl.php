<div id="be-well-informed-widget-template-wrapper">
    <!-- @todo: Add a message area for the service is not available -->

    <div class="bwi-api-status error hide">
        <h4>The BWI external service is not available at this time. Please try
            again
            later.</h4>
    </div>
    <form id="bwi-state-selection-form" name="bwi-state-selection" data-parsley-validate novalidate>
        <div class="usa-grid-full">
            <div id="bwi-state-selection" class="ee-grid">
                <div class="form-elements">
                    <div class="line">
                        <div class="col-md-4"><label
                                    for="bwi-state">State/Tribe</label></div>
                        <div class="col-md-8">
                            <select id="bwi-state" name="bwi-state" required="" data-parsley-errors-messages-disabled>
                                <option value="">Select a State/Tribe</option>
                                <option value="MA">Massachusetts</option>
                                <option value="NH">New Hampshire</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
        </div><!-- @end .usa-grid-full -->
        <div id="bwi-widget-state-content">
            <p> Have a well and wonder what your water testing results mean?</p>
            <p> The Be Well Informed Guide lets you enter your test results and
                get feedback about health concerns and water
                treatment choices for your state or tribe.</p>
            <p> Be Well Informed was created for residents, and has the most
                common contaminants that affect wells. It may not
                have all the contaminants present in your area - for those it
                does have, it can provide useful information.</p>
            <p> A quick disclaimer before we start.</p>
            <p class="widget-note"> Information provided on this website is for
                informational purposes only and should not be
                substituted for direct consultation with a qualified water
                treatment professional. Other conditions or factors
                related to your well or home not considered by this online guide
                may determine the most appropriate water
                treatment option.</p>
            <p class="widget-note powered-by-nhbwi">Powered by: <a
                        href="https://xml2.des.state.nh.us/DWITool/Welcome.aspx"
                        target="_blank">New Hampshire Be <em>Well</em> Informed</a>
            </p>
            <div class="be-well-informed-modal-state-content">
                <p class="text-right">
                    <button id="bwi-check-water-btn">
                        Check your water
                    </button>
                  <?php if ($bwi_admin): ?>
                      <a href="be_well_informed/configuration_form"
                         class="favorites-ignore">Edit Configurations</a>
                  <?php endif; ?>
                </p>
            </div>
        </div>
    </form>
    <div id="be-well-informed-modal-state-selection"></div>
</div>
