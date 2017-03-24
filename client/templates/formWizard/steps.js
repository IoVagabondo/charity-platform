Template.steps.onCreated(function(){
  var currentStep =  Session.get('currentStep');
  if (currentStep == undefined){
    currentStep = 'welcome';
  }
  Session.set('currentStep', currentStep);
});

Template.steps.helpers({
  stepEquals: function(step){
    var currentStep = Session.get('currentStep');
    if (currentStep == undefined){
      currentStep = 'welcome';
    }
    Session.set('currentStep', currentStep);
    return currentStep == step;
  },

  initiativeNotSelected: function(){
    return (Session.get('selectedInitiativeId') == undefined);
  }

});


Template.steps.events({
  'click #welcome': function(event, template) {
      event.preventDefault();
      Session.set('currentStep', 'welcome');
  },

  'click #institutions': function(event, template) {
      event.preventDefault();
      Session.set('currentStep', 'institutions');
  },

  'click #details': function(event, template) {
      event.preventDefault();
      Session.set('currentStep', 'details');
  },

  'click #check': function(event, template) {
      event.preventDefault();
      Session.set('currentStep', 'check');
  },

  'click #user': function(event, template) {
      event.preventDefault();
      Session.set('currentStep', 'user');
  },

  'click #publishEvent': function(event, template) {

      var slug = _.slugify(Session.get('eventTitle'));
      event.preventDefault();

      Meteor.call('insertEvent', {
          title: Session.get('eventTitle'),
          slug: slug,
          date: Session.get('date'),
          location: Session.get('location'),
          suggestedValue: Session.get('suggestedValue'),
          noSuggestedValue: Session.get('suggestedValueOption'),
          description: Session.get('description'),
          initiativeId: Session.get('selectedInitiativeId'),
          pictureURL: Session.get('pictureURL')

      }, function(error, slug) {

          if (error) {
              return Bert.alert(error.reason, "warning");
          } else {
              Bert.alert("Event successfully published!", "success");
              // $('#publishEventModal').modal('show');
              Session.set('slug-new-event', slug);
              Router.go('Event', { slug: Session.get('slug-new-event') });

          }

          // Here we use the probably changed slug from the server side method
          // show slug in success message for the invitation message

      });
  },



});

Template.userDetails.events({

  'input #name': function(evt) {
      var self = this;
      if (handle)
          clearTimeout(handle);
      handle = setTimeout(function() {
          var query = $(evt.target).val();
          Session.set('name', query);
      }, 500);
  },

  'input #email': function(evt) {
      var self = this;
      if (handle)
          clearTimeout(handle);
      handle = setTimeout(function() {
          var query = $(evt.target).val();
          Session.set('email', query);
      }, 500);
  },

  'input #birthday': function(evt) {
      var self = this;
      if (handle)
          clearTimeout(handle);
      handle = setTimeout(function() {
          var query = $(evt.target).val();
          Session.set('birthday', query);
      }, 500);
  },

  'input #cpf': function(evt) {
      var self = this;
      if (handle)
          clearTimeout(handle);
      handle = setTimeout(function() {
          var query = $(evt.target).val();
          Session.set('cpf', query);
      }, 500);
  },

});
