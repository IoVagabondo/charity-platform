var handle = null;

Template.formStep3.onRendered(function() {

    // Set values of Session variables to input fields
    var query = Session.get('description');
    $('#description').val(query);

    query = Session.get('date');
    $('#date').val(query);

    query = Session.get('suggestedValue');
    $('#suggestedValue').val(query);

    this.$('.datetimepicker').datetimepicker({
        format: 'DD/MM/YYYY',
    });


});


Template.formStep3.events({

    

    'click input.datetimepicker': function(event, template) {
        let value = $('#suggestedValue').val();
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
