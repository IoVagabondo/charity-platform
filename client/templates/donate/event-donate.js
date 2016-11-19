Template.eventDonate.helpers({
  stepEquals: function(step){
    var currentStep = Session.get('currentStep');
    if (currentStep == undefined){
      Session.set('currentStep', 'stepOne');
      currentStep = 'stepOne';
    }
    return currentStep == step;
  },
});


Template.eventDonate.events({

  'click #stepOneButton': function(event, template) {
      event.preventDefault();
      Session.set('currentStep', 'stepTwo');
  },

  'click #stepTwoButtonBack': function(event, template) {
      event.preventDefault();
      Session.set('currentStep', 'stepOne');
  },

  'click #stepTwoButtonNext': function(event, template) {
      event.preventDefault();
      Session.set('currentStep', 'stepThree');
  },

  'click #stepThreeButtonBack': function(event, template) {
      event.preventDefault();
      Session.set('currentStep', 'stepTwo');
  },
});
