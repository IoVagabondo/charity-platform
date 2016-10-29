var handle = null;


Template.formStep1.onRendered(function() {
    $('#eventTitle').val(Session.get('eventTitle'));
    
});


Template.formStep1.events({
    'input #eventTitle': function(evt) {
        var self = this;
        if (handle)
            clearTimeout(handle);
        handle = setTimeout(function() {
            var query = $(evt.target).val();
            Session.set('eventTitle', query);
        }, 700);
    },


});
