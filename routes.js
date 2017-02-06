if(Meteor.isClient) {
    Session.setDefault('lazyloadLimit', 4);
    Session.setDefault('lazyloadLimit_initiatives', 4);
}

Router.configure({
    layoutTemplate: 'layout',
    notFoundTemplate: 'notFound',
    loadingTemplate: 'loading',
});

CreateEventController = RouteController.extend({
  waitOn: function() {
      return Meteor.subscribe('single-initiative-with-id', this.params.id);
  },
  data: function() {
      return Initiatives.findOne();
  }
});

EventController = RouteController.extend({
    waitOn: function() {
    	Meteor.subscribe("all-initiatives");
      return Meteor.subscribe('single-event', this.params.slug);
    },

    data: function() {
        return Events.findOne({slug: this.params.slug});
    }
});

InitiativeController = RouteController.extend({
    waitOn: function() {
        return Meteor.subscribe('single-initiative', this.params.slug);
    },

    data: function() {
        return Initiatives.findOne({slug: this.params.slug});
    }
});

Router.map(function() {

    this.route('Home', {
        path: '/',
        template: 'home',
        subscriptions: function(){

        	return Meteor.subscribe("lazyload-events", Session.get('lazyloadLimit'));
    	}
    });

    this.route('Sobre nos', {
        path: '/sobre-nos',
        template: 'sobreNos',
    });

    this.route('Como funciona', {
        path: '/como-funciona',
        template: 'comofunctiona',
    });



    this.route('Initiatives', {
        path: '/initiatives',
        template: 'initiatives',
        subscriptions: function(){
        	return Meteor.subscribe("lazyload-initiatives", Session.get('lazyloadLimit_initiatives'));
    	}
    });

    this.route('Create Event', {
        path: '/createEvent',
        template: 'createEvent',
        controller: 'CreateEventController'
    });

    this.route('Login', {
        path: '/login',
        template: 'login'
    });

    this.route('Register', {
        path: '/register',
        template: 'register'
    });

    this.route('AdminPanel', {
        path: '/admin',
        template: 'adminPanel'
    });

    // ++++++++++++++++++ Events ++++++++++++

    this.route('Event', {
	    path: '/events/:slug',
	    template: 'event',
	    controller: 'EventController'
	   });

     this.route('Event-Donate', {
 	    path: '/events/:slug/donate',
 	    template: 'eventDonate',
 	    controller: 'EventController'
 	   });

      this.route('Event-Donate-Payment', {
        path: '/events/:slug/donate/execute',
        template: 'EventDonatePayment',
        controller: 'EventController'
      });


	// this.route('Create Event', {
	//     path: '/create-event',
	//     template: 'editEvent',
	//     subscriptions: function(){
 //        	return Meteor.subscribe("all-initiatives");
 //    	}
	// });

	this.route('Edit Event', {
	    path: '/events/:slug/edit',
	    template: 'editEvent',
	    controller: 'EventController'
	});


	// ++++++++++++++++++ Initiatives ++++++++++++

	this.route('Initiative', {
	    path: '/initiatives/:slug',
	    template: 'initiativesDetailItem',
	    controller: 'InitiativeController'
	});

	this.route('Create Initiative', {
	    path: '/create-initiative',
	    template: 'editInitiative'
	});

	this.route('Edit Initiative', {
	    path: '/initiatives/:slug/edit',
	    template: 'editInitiative',
	    controller: 'InitiativeController'
	});

    this.route('Edit Products', {
        path: '/initiatives/:slug/edit-products',
        template: 'editProducts',
        controller: 'InitiativeController'
    });

});




var requiresLogin = function(){
    if (!Meteor.user()) {
        this.render('notFound');

    } else {
        this.next();
    }
};


var requiresAdmin = function(){
    if (!Meteor.user() && Roles.userIsInRole( Meteor.userId(), 'admin' ) ){
        this.render('notFound');

    } else {
        this.next();
    }
};



Router.onBeforeAction(requiresLogin, {only: ['Edit Event', 'Create Event']});
Router.onBeforeAction(requiresAdmin, {only: ['AdminPanel']});
