Template.registerModal.events({
    'submit form': function(event, template) {
        event.preventDefault();
        var emailVar = event.target.email.value;
        var passwordVar = event.target.password.value;

        Accounts.createUser({
            username: emailVar,
            email: emailVar,
            password: passwordVar,

        }, function(error) {
            if (error) {
                Bert.alert(error.reason, "warning");
            } else {
                Meteor.call("setupUserAndSendVerificationLink", {
                    user: Meteor.userId(),
                    role: 'user'
                }, (error, response) => {
                    if (error) {
                        Bert.alert(error.reason, "warning");
                    }
                });
                Bert.alert("Registrierung erfolgreich! Wir haben dir eine Email mit deinen Zugangsdaten zugeschickt", "success");
                $('#registerModal').modal('hide');
            }
        });

        // Meteor.loginWithPassword(emailVar, passwordVar, function(error){
        // 	if (error) {
        // 		Bert.alert(error.reason, "warning");
        // 	}
        // 	else{
        //     $('#loginModal').modal('hide');
        // 	}
        // });

    }
});
