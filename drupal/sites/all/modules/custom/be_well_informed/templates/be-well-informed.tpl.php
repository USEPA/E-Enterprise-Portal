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
                                <?php echo $partner_list_options; ?>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
        </div><!-- @end .usa-grid-full -->
        <div id="bwi-widget-state-content">
          <?php echo $body ?>
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
