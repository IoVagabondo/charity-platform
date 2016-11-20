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

  'click #paypal': function() {
    var product;
    product = {
      name: 'product name',
      description: 'production description',
      price: 30.00
    };
    var slug = Template.instance().data.slug
    Meteor.call('createPaypalPayment', product, slug, function(err, res) {
      return window.location.replace(res.links[1].href);
    });
  }

});
