Template.landingPage.events({

    'click #btn-newsletter': function(event, template) {
        event.preventDefault();
        $('#newsletterModal').modal('show');
    },

    'click #btn-newsletter-footer': function (event, template){
      event.preventDefault();
      
    }

});
