Template.register.events({
    'submit form': function(event) {
        event.preventDefault();
        var nameVar = event.target.registerName.value;
        var usernameVar = event.target.registerEmail.value;
        var emailVar = event.target.registerEmail.value;
        var passwordVar = event.target.registerPassword.value;
        
        Accounts.createUser({
            username: usernameVar,
            email: emailVar,
            password: passwordVar,
            profile: {
            	name: nameVar
            }
        }, function(error){
        	if (error) {
        		Bert.alert(error.reason, "warning");
        	}
        	else{
        		Bert.alert("Registirerung erfolgreich!", "success");
        		Router.go('Home');
        	}
        });
        
    }
});