
Template.EventDonatePayment.created = function() {
  var payerId = window.location.search.split('PayerID=')[1];
  var paymentId = window.location.search.split('?paymentId=')[1].split('&token')[0];
  Session.set('payerId', payerId);
  Session.set('paymentId', paymentId);
  Session.set('payment_in_progress', false);
  Session.set('payment_status', 'open');

  let template = Template.instance();
  template.autorun(() => {
    console.log('###autorun');
      template.subscribe('paypal_payments', paymentId);
  });

};

Template.EventDonatePayment.helpers ({
  payment_in_progress: function(){
    return Session.get('payment_in_progress');
  },

  payment_status: function(status){
    var current_status = Session.get('payment_status');
    return current_status == status;
  },

  initiative: function(){
    return Initiatives.findOne({_id: Template.instance().data.initiativeId});
  },

  paypal_payment: function(){
    return PaypalPayments.findOne();
  },

  paypal_fee: function(amount){
    return parseFloat(amount)*0.05;
  },

  surprese_fee: function(amount){
    return parseFloat(amount)*0.10;
  },

  bottom_line: function(amount){
      return parseFloat(amount)*0.85;
  }


});


Template.EventDonatePayment.events({
  'click #executePayment' : function(event, template){
    Session.set('payment_in_progress', true);
    var payerId = Session.get('payerId');
    // payerId = window.location.search.split('PayerID=')[1];
    Meteor.call('executePaypalPayment', payerId, function(err, res) {

      if (res === true) {
        Session.set('payment_status', 'successful')
      } else {
        Session.set('payment_in_progress', false);
        Session.set('payment_status', 'refused');
        console.log('Your payment has been refused.');
      }
    });
  }
});
