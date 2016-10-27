
var handle = null;

Template.formStep3.events({

     'input #title': function(event, template) {
        console.log('test');
         let value = event.target.value.trim();
         if (handle)
             clearTimeout(handle);
         handle = setTimeout(function() {
             var query = $(event.target).val();
             Session.set('title', query);
         }, 700);

     },

     'input #date': function(event, template) {
         let value = event.target.value.trim();
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
             Session.set('value', query);
         }, 700);

     },

 });