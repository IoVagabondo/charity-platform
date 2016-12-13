Template.homescreen.helpers({

    username: function() {
        return Meteor.user().profile.name;
    },

    // Listing events
    eventsList: function() {
        return Events.find({}, { sort: { timeCreated: -1 } });
    }

});

Template.homescreen.events({
    'click button.lazyload': function(e, template) {
        var currentLimit = Session.get('lazyloadLimit');
        Session.set('lazyloadLimit', currentLimit + 2);
    },

    'click button.newEvent': function(e, template) {
        Router.go('Create Event');
    }
});
