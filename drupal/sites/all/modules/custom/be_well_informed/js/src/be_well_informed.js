(function($) {

  $('#bwi-check-water-btn').click(function() {
    $('#be-well-informed-modal')
      .html(Drupal.settings.be_well_informed.modal)
      .dialog({
        width: 'auto',
        modal: true,
        dialogClass: 'be-well-informed-modal'
      });
  });

})(jQuery);
