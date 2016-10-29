var handle = null;

Template.formStep3.onRendered(function() {

    // Set values of Session variables to input fields
    var query = Session.get('description');
    $('#description').value = query;

    query = Session.get('date');
    $('#date').value = query;

    query = Session.get('suggestedValue');
    $('#suggestedValue').value = query;

    this.$('.datetimepicker').datetimepicker({
        format: 'DD/MM/YYYY',
    });


});


Template.formStep3.events({

    

    'change input.datetimepicker': function(event, template) {
        let value = event.target.value.trim();
        console.log("value: " +value);
        if (handle)
            clearTimeout(handle);
        handle = setTimeout(function() {
            var query = $(event.target).val();
            Session.set('date', query);
        }, 700);

    },

    'input #description': function(event, template) {
        let value = event.target.value.trim();
        if (handle)
            clearTimeout(handle);
        handle = setTimeout(function() {
            var query = $(event.target).val();
            Session.set('description', query);
        }, 700);

    },

    'input #suggestedValue': function(event, template) {
        let value = event.target.value.trim();
        if (handle)
            clearTimeout(handle);
        handle = setTimeout(function() {
            var query = $(event.target).val();
            Session.set('suggestedValue', query);
        }, 700);

    },


});
