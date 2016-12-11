Template.navbar.events({

    'click #logout': function(e, template) {
        Accounts.logout(function(){
            Router.go('Home');
        });
    },

    'click #home': function(e, template) {
            var item = $('#home').addClass("active");
            $(".navbar-nav li").not(item).removeClass("active");
    },

    'click #initiatives': function(e, template) {
            var item = $('#initiatives').addClass("active");
            $(".navbar-nav li").not(item).removeClass("active");
    },

    'click #admin': function(e, template) {
            var item = $('#admin').addClass("active");
            $(".navbar-nav li").not(item).removeClass("active");
    },

});
