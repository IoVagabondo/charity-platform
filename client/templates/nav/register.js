Template.register.events({
    'submit form': function(event) {
        event.preventDefault();
        var form = event.target;

        var nameVar = form.registerName.value;
        var birthdayVar = form.registerBirthday.value;

        var usernameVar = form.registerEmail.value;
        var emailVar = form.registerEmail.value;
        var passwordVar = form.registerPassword.value;

        var genderVar = 'male';

        if ($('#radioButtonFemale').checked) {
            genderVar = 'female';
        }

        Accounts.createUser({
            username: usernameVar,
            email: emailVar,
            password: passwordVar,
            profile: {
                name: nameVar,
                birthday: birthdayVar,
                gender: genderVar,
            }
        }, function(error) {
            if (error) {
                Bert.alert(error.reason, "warning");
            } else {
                Meteor.call("setRoleOnUser", {
                    user: Meteor.userId(),
                    role: 'user'
                }, (error, response) => {
                    if (error) {
                        Bert.alert(error.reason, "warning");
                    }
                });
                Bert.alert("Registirerung erfolgreich!", "success");
                Router.go('Home');
            }
        });

    }
});
