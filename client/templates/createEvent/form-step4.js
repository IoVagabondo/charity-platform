Template.formStep4.helpers({

        title: function() {
            return Session.get('title');
        },

        description: function() {
            return Session.get('description');
        },

        date: function() {
            return Session.get('date');
        },

        suggestedValue: function() {
            return Session.get('value');
        },

        selectedInitiative: function(){
        	return 'INITIATIVE';
        }

});
