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

        selectedInitiative: function(){
        	return 'INITIATIVE';
        }

});
