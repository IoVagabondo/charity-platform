

Template.navbar.helpers({
    isRouteEvent: function(){
      return (Router.current().url.includes('events/'));
    }
});

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

    'click #login': function(event, template) {
        event.preventDefault();
        $('#loginModal').modal('show');
    },

    'click #register': function(event, template) {
        event.preventDefault();
        $('#registerModal').modal('show');
    },

    'click #createEvent': function(event, template) {
        Router.go('Create Event', {id: 0});
    },

});
