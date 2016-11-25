Template.eventDonate.helpers({
  stepEquals: function(step){
    var currentStep = Session.get('currentStep');
    if (currentStep == undefined){
      Session.set('currentStep', 'stepOne');
      currentStep = 'stepOne';
    }
    return currentStep == step;
  },

  products: function(){
		return Initiatives.findOne({_id: Template.instance().data.initiativeId}).products;
	}
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
      name: Session.get('selectedProductTitle'),
      description: Session.get('selectedProductDescription'),
      price: Session.get('selectedProductValue')
    };
    var slug = Template.instance().data.slug
    Meteor.call('createPaypalPayment', product, slug, function(err, res) {
      return window.location.replace(res.links[1].href);
    });
  }

});
