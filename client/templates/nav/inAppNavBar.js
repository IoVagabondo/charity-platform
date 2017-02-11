Template.inAppNavBar.events({

    'click #previous': function(e, template) {
        e.preventDefault();
        history.back();
    },

});
