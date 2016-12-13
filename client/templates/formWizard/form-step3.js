var handle = null;

Template.formStep3.onRendered(function() {

    // Set values of Session variables to input fields
    var query = Session.get('description');
    $('#description').val(query);

    query = Session.get('date');
    $('#date').val(query);

    query = Session.get('eventTitle')
    $('#eventTitle').val(query);

    query = Session.get('suggestedValue');
    $('#suggestedValue').val(query);

    this.$('.datetimepicker').datetimepicker({
        format: 'DD/MM/YYYY',
    });


});


Template.formStep3.events({
    'input #eventTitle': function(evt) {
        var self = this;
        if (handle)
            clearTimeout(handle);
        handle = setTimeout(function() {
            var query = $(evt.target).val();
            Session.set('eventTitle', query);
        }, 700);
    },


    'click input.datetimepicker': function(event, template) {
        let value = $('#suggestedValue').val();
        console.log("value: " +value);
        if (handle)
            clearTimeout(handle);
        handle = setTimeout(function() {
            var query = $(event.target).val();
            Session.set('date', query);
        }, 500);

    },

    'input #description': function(event, template) {
        let value = event.target.value.trim();
        console.log('input');
        if (handle)
            clearTimeout(handle);
        handle = setTimeout(function() {
            var query = $(event.target).val();
            Session.set('description', query);
        }, 500);

    },

    'input #suggestedValue': function(event, template) {
        let value = event.target.value.trim();
        if (handle)
            clearTimeout(handle);
        handle = setTimeout(function() {
            var query = $(event.target).val();
            Session.set('suggestedValue', query);
        }, 500);

    },

    'change input[type="file"]' (event, template) {
        file = Modules.client.uploadToAmazonS3({ event: event, template: template, id: this._id }, function(id, url) {
            if (url) {
                Session.set('pictureURL', url);
            }
        });
    }


});
