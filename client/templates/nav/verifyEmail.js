Template.verifyEmail.onCreated(function(){
  Accounts.verifyEmail( Router.current().params.token, ( error ) =>{
      if ( error ) {
        Bert.alert( error.reason, 'danger' );
      } else {
        Router.go('Home');
        Bert.alert( 'Email verified! Thanks!', 'success' );
      }
    });
});

Template.verifyEmail.events({
  'click .resend-verification-link' ( event, template ) {
    Meteor.call( 'sendVerificationLink', ( error, response ) => {
      if ( error ) {
        Bert.alert( error.reason, 'danger' );
      } else {
        let email = Meteor.user().emails[ 0 ].address;
        Bert.alert( `Verification sent to ${ email }!`, 'success' );
      }
    });
  }
});
