var handle = null;

Template.formStep3.onRendered(function() {

    // Set values of Session variables to input fields
    var query = Session.get('description');
    $('#description').val(query);

    query = Session.get('date');
    $('#date').val(query);

    query = Session.get('location');
    $('#location').val(query);

    query = Session.get('eventTitle')
    $('#eventTitle').val(query);

    query = Session.get('suggestedValue');
    $('#suggestedValue').val(query);

    this.$('.datetimepicker').datetimepicker({
        format: 'DD/MM/YYYY',
    });

    if(Session.get('suggestedValueOption') == undefined){
      Session.set('suggestedValueOption', 'false');
    }


});

Template.formStep3.helpers({
  suggestedValueOption: function(){
    if (Session.get('suggestedValueOption')) {
      return false;
    }
    return true;
  },
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

    'input #location': function(evt) {
        var self = this;
        if (handle)
            clearTimeout(handle);
        handle = setTimeout(function() {
            var query = $(evt.target).val();
            Session.set('location', query);
        }, 500);
    },


    'click input.datetimepicker': function(event, template) {
        let value = $('#suggestedValue').val();
        if (handle)
            clearTimeout(handle);
        handle = setTimeout(function() {
            var query = $(event.target).val();
            Session.set('date', query);
        }, 500);

    },

    'input #description': function(event, template) {
        let value = event.target.value.trim();
        if (handle)
            clearTimeout(handle);
        handle = setTimeout(function() {
            var query = $(event.target).val();
            Session.set('description', query);
        }, 500);

    },

    'change .hide-completed input': function(event, template) {
          Session.set('suggestedValueOption', event.target.checked);
          // console.log(Session.get('suggestedValueOption'));
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
