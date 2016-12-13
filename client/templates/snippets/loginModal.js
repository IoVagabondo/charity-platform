Template.loginModal.events({
    'submit form': function(event, template) {
        event.preventDefault();
        var emailVar = event.target.username.value;
        var passwordVar = event.target.password.value;

        Meteor.loginWithPassword(emailVar, passwordVar, function(error){
        	if (error) {
        		Bert.alert(error.reason, "warning");
        	}
        	else{
            $('#loginModal').modal('hide');
        	}
        });

    }
});
