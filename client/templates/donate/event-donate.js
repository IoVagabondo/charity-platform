Template.eventDonate.onCreated(function() {
    Session.set('sliderMinPos',0);
    Session.set('sliderMaxPos',20);
    Session.set('minlval',Math.log(5));
    Session.set('maxlval', Math.log(10000));
    var scaleVar = (Session.get('maxlval') - Session.get('minlval')) / (Session.get('sliderMaxPos') - Session.get('sliderMinPos'));
    Session.set('scale',scaleVar);


});

Template.eventDonate.onRendered(function(){
    // var sliderPosition = Session.get('sliderMinPos') + (Math.log(Template.instance().data.suggestedValue) - Session.get('minlval')) / Session.get('scale');
    // console.log('suggestedValue', Template.instance().data.suggestedValue);
    // console.log('position',sliderPosition);
    // $("#slider").val(sliderPosition);

    // $('#value').val(Template.instance().data.suggestedValue).trigger("keyup");
    if (Session.get('donationAmount') == undefined){
      var donationAmount = parseInt(Template.instance().data.suggestedValue);
      Session.set('donationAmount',donationAmount);
    }

    if (Session.get('sliderPosition') == undefined){
      Session.set('sliderPosition',(Session.get('sliderMinPos') + (Math.log(Session.get('donationAmount')) - Session.get('minlval')) / Session.get('scale')));
    }

});


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
	},

  donationAmount: function(){
    return Session.get('donationAmount');
  },

  sliderPosition: function(){
    return Session.get('sliderPosition');
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
      price: Session.get('donationAmount')
    };
    var slug = Template.instance().data.slug
    Meteor.call('createPaypalPayment', product, slug, function(err, res) {
      console.log(res);
      return window.location.replace(res.links[1].href);
    });
  },

  'change #slider': function(){
    event.preventDefault();
    var sliderPosition = $('#slider').val();

    var value = Math.exp((sliderPosition - Session.get('sliderMinPos')) * Session.get('scale') + Session.get('minlval'));
    Session.set('donationAmount', value.toFixed(0));
    Session.set('sliderPosition',sliderPosition);

  },



});
