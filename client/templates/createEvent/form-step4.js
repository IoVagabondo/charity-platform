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

    suggestedValue: function() {
        return Session.get('suggestedValue');
    },

    selectedInitiative: function() {
        // console.log();
        return Initiatives.find({});
    }

});
