Template.formStep4.onCreated(() => {
    let template = Template.instance();

    template.autorun(() => {
        template.subscribe('single-initiative-with-id', Session.get('selectedInitiativeId'), () => {
            setTimeout(() => {

            }, 300);
        });
    });
});

Template.formStep4.helpers({

    title: function() {
        return Session.get('eventTitle');
    },

    description: function() {
        return Session.get('description');
    },

    date: function() {
        return Session.get('date');
    },

    location: function() {
        return Session.get('location');
    },

    suggestedValue: function() {
        return Session.get('suggestedValue');
    },

    selectedInitiative: function() {
        // console.log();
        return Initiatives.find({});
    },

    pictureURL: function(){
      return Session.get('pictureURL');
    }

});

Template.formStep4.events({
    'click #publishEvent': function(event, template) {

        var slug = _.slugify(Session.get('eventTitle'));
        event.preventDefault();

        Meteor.call('insertEvent', {
            title: Session.get('eventTitle'),
            slug: slug,
            date: Session.get('date'),
            suggestedValue: Session.get('suggestedValue'),
            description: Session.get('description'),
            initiativeId: Session.get('selectedInitiativeId'),
            pictureURL: Session.get('pictureURL')

        }, function(error, slug) {

            if (error) {
                return Bert.alert(error.reason, "warning");
            } else {
                // Bert.alert("Event successfully published!", "success");
                $('#publishEventModal').modal('show');
                Session.set('slug-new-event', slug);

            }

            // Here we use the probably changed slug from the server side method
            // show slug in success message for the invitation message

        });
    },


});


Template.publishEventModalTemplate.events({
    'click #goButtonModal': function(event, template) {
        event.preventDefault();
        // $('#publishEventModal').modal('hide');

        // Set Session variables to default
        Session.set('searchQuery', '');
        Session.set('filer1', 'none');
        Session.set('filer2', 'none');
        Session.set('eventTitle', '');
        Session.set('date', '');
        Session.set('description', '');
        Session.set('selectedInitiativeId', '');
        Session.set('suggestedValue', '');
        Session.set('pictureURL', '');


        $('#publishEventModal')
        .on('hidden.bs.modal', function() {
           Router.go('Event', { slug: Session.get('slug-new-event') });
        })
        .modal('hide');


    },
});
