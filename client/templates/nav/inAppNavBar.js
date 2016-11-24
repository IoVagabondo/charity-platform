Template.inAppNavBar.events({

    'click li.previous': function(e, template) {
        e.preventDefault();
        history.back();
    },

});
