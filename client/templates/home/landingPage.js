Template.landingPage.events({

    'click #btn-newsletter': function(event, template) {
        event.preventDefault();
        $('#newsletterModal').modal('show');
    },

});
