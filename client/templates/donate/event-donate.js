var handle = null;

Template.eventDonate.onCreated(function() {
    Session.set('sliderMinPos',0);
    Session.set('sliderMaxPos',20);
    Session.set('minlval',Math.log(5));
    Session.set('maxlval', Math.log(10000));
    var scaleVar = (Session.get('maxlval') - Session.get('minlval')) / (Session.get('sliderMaxPos') - Session.get('sliderMinPos'));
    Session.set('scale',scaleVar);




    let template = Template.instance();
    template.autorun(() => {
        template.initiative = Initiatives.findOne({_id: template.data.initiativeId});
        template.subscribe('single-city', template.initiative.cityId);
        template.subscribe('single-section', template.initiative.sectionId);
        template.subscribe('single-category', template.initiative.categoryId);

    });


});

Template.eventDonate.onRendered(function(){
    // var sliderPosition = Session.get('sliderMinPos') + (Math.log(Template.instance().data.suggestedValue) - Session.get('minlval')) / Session.get('scale');
    // console.log('suggestedValue', Template.instance().data.suggestedValue);
    // console.log('position',sliderPosition);
    // $("#slider").val(sliderPosition);

    // $('#value').val(Template.instance().data.suggestedValue).trigger("keyup");

    $('#registerName').val(Session.get('registerName'));
    $('#registerBirthday').val(Session.get('registerBirthday'));
    $('#registerEmail').val(Session.get('registerEmail'));
    $('#registerCPF').val(Session.get('registerCPF'));


    if (Session.get('donationAmount') == undefined){
      var donationAmount = parseInt(Template.instance().data.suggestedValue);
      Session.set('donationAmount',donationAmount);
    }

    if (Session.get('sliderPosition') == undefined){
      Session.set('sliderPosition',(Session.get('sliderMinPos') + (Math.log(Session.get('donationAmount')) - Session.get('minlval')) / Session.get('scale')));
    }

});


Template.eventDonate.helpers({

  initiative: function(){
    var initiative = Initiatives.findOne({_id: Template.instance().data.initiativeId});
    initiative.city = Cities.findOne();
    initiative.category = Categories.findOne();
    initiative.section = Sections.findOne();
    return initiative;
  },

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
  },

  name: function(){
    return Session.get('registerName');
  },

  birthday: function(){
    return Session.get('registerBirthday');
  },

  cpf: function(){
    return Session.get('registerCPF');
  },

  email: function(){
    return Session.get('registerEmail');
  },



});


Template.eventDonate.events({

  'click #stepOneButton': function(event, template) {
      event.preventDefault();
      var radioElement = template.find('input:radio[name=inlineRadioGender]:checked');
      // Session.set('registerName',$('#registerName').val());
      // Session.set('registerBirthday',$('#registerBirthday').val());
      // Session.set('registerEmail',$('#registerEmail').val());
      // Session.set('registerCPF',$('#registerCPF').val());


      // console.log($(element).val());
      if(Session.get('registered') == undefined || Session.get('registered') == 'false'){
        Meteor.call('insertNewDonor', {
            event_id: template.data._id,
            name: Session.get('registerName'),
            email: Session.get('registerEmail'),
            birthday: Session.get('registerBirthday'),
            cpf: Session.get('registerCPF'),
            gender: $(radioElement).val(),

        }, function(error, response) {

            if (error) {
                Session.set('registered', 'false');
                return Bert.alert(error.reason, "warning");
            } else {
                  Session.set('donorId', response);
                  Session.set('registered', 'true');

                  Session.set('currentStep', 'stepTwo');
            }

        });
      }
      else if(Session.get('registered') == 'true'){
        Session.set('currentStep', 'stepTwo');
      }






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
    var slug = Template.instance().data.slug;
    var initiativeId = Template.instance().data.initiativeId;
    var eventId = Template.instance().data._id;
    Meteor.call('createPaypalPayment', product, slug, Session.get('donorId'),initiativeId, eventId, function(err, res) {
      return window.location.replace(res.links[1].href);
    });
  },

  'change #slider': function(){
    event.preventDefault();
    var sliderPosition = $('#slider').val();

    var value = Math.ceil(Math.exp((sliderPosition - Session.get('sliderMinPos')) * Session.get('scale') + Session.get('minlval'))/5)*5;;
    Session.set('donationAmount', value.toFixed(0));
    Session.set('sliderPosition',sliderPosition);

  },

  'input #registerName': function(evt) {
      var self = this;
      if (handle)
          clearTimeout(handle);
      handle = setTimeout(function() {
          var query = $(evt.target).val();
          Session.set('registerName', query);
      }, 300);
  },

  'input #registerBirthday': function(evt) {
      var self = this;
      if (handle)
          clearTimeout(handle);
      handle = setTimeout(function() {
          var query = $(evt.target).val();
          Session.set('registerBirthday', query);
      }, 300);
  },

  'input #registerCPF': function(evt) {
      var self = this;
      if (handle)
          clearTimeout(handle);
      handle = setTimeout(function() {
          var query = $(evt.target).val();
          Session.set('registerCPF', query);
      }, 300);
  },

  'input #registerEmail': function(evt) {
      var self = this;
      if (handle)
          clearTimeout(handle);
      handle = setTimeout(function() {
          var query = $(evt.target).val();
          Session.set('registerEmail', query);
      }, 300);
  },





});
