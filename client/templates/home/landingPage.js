

Template.landingPage.events({

    'click #btn-newsletter': function(event, template) {
        event.preventDefault();
        $('#newsletterModal').modal('show');
    },

    'click #btn-newsletter-modal': function (event, template){

      event.preventDefault();


      Meteor.call('insertNewsletterSubscriber', {
          email: $('#email-newsletter-modal').val(),
          confirmed: false

      }, function(error) {

          if (error) {
              return Bert.alert(error.reason, "warning");
          }

          Session.set('newsletter_subscribed', 'true');
          $('#newsletterModal').modal('hide');
          $('#email-newsletter-modal').val("");

      });

    }

});
