Template.newsletterSection.onCreated( function (){
  if (Session.get('newsletter_subscribed') == undefined){
    Session.set('newsletter_subscribed', 'false');
  }
});

Template.newsletterSection.helpers({
  newsletter_subscribed: function() {
      return Session.get('newsletter_subscribed') == 'false';
  },
});


Template.newsletterSection.events({

    'click #btn-newsletter-footer': function (event, template){

      event.preventDefault();

      Meteor.call('insertNewsletterSubscriber', {
          email: $('#email').val(),
          confirmed: false

      }, function(error) {

          if (error) {
              return Bert.alert(error.reason, "warning");
          }

          Session.set('newsletter_subscribed', 'true');
          $('#email').val("");
      });

    },


});
