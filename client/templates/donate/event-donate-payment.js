
Template.EventDonatePayment.created = function() {

  Session.set('payment_in_progress', false);
  Session.set('payment_status', 'open');

};

Template.EventDonatePayment.helpers ({
  payment_in_progress: function(){
    return Session.get('payment_in_progress');
  },

  payment_status: function(status){
    var current_status = Session.get('payment_status');
    return current_status == status;
  }
});


Template.EventDonatePayment.events({
  'click #executePayment' : function(event, template){
    Session.set('payment_in_progress', true);
    var payerId;
    payerId = window.location.search.split('PayerID=')[1];
    Meteor.call('executePaypalPayment', payerId, function(err, res) {

      if (res === true) {
        Session.set('payment_status', 'successful')
      } else {
        Session.set('paymentStatus', 'refused')
        console.log('Your payment has been refused.');
      }
    });
  }
});
