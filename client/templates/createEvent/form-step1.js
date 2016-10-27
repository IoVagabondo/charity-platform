var handle = null;


Template.formStep1.onRendered(function() {
    this.find('.searchQuery').value = Session.get('searchQuery');
    $('#filter1').val(Session.get('filter1'));
    $('#filter2').val(Session.get('filter2'));
});


Template.formStep1.events({
    'input input.searchQuery': function(evt) {
        var self = this;
        if (handle)
            clearTimeout(handle);
        handle = setTimeout(function() {
            var query = $(evt.target).val();
            Session.set('searchQuery', query);
        }, 700);
    },

    'change #filter1': function(event, template) {
         var filter1 = $(event.target).val();
         Session.set('filter1', filter1);
     },

     'change #filter2': function(event, template) {
         var filter2 = $(event.target).val();
         Session.set('filter2', filter2);
     }


});
