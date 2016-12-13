// Template.steps.onCreated(function(){
//   var currentStep =  Session.get('currentStep');
//   if (currentStep == undefined){
//     currentStep = 'welcome';
//   }
//   Session.set('currentStep', currentStep);
// });

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



});
