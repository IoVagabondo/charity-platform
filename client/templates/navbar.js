Template.navbar.events({

    'click #logout': function(e, template) {
        Accounts.logout(function(){
            Router.go('Home');
        });

    },

});
