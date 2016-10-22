Template.login.events({
    'submit form': function(event) {
        event.preventDefault();
        var emailVar = event.target.inputEmail3.value;
        var passwordVar = event.target.inputPassword3.value;

        Meteor.loginWithPassword(emailVar, passwordVar, function(error){
        	if (error) {
        		Bert.alert(error.reason, "warning");
        	}
        	else{
        		Bert.alert("Login erfolgreich!", "success");
        		Router.go('Home');
        	}
        });
        
    }
});