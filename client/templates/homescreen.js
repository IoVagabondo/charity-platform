

Template.homescreen.helpers({
	  exampleHelper: function(){
	    return new Spacebars.SafeString('This text came from a helper with some <strong>HTML</strong>.');
	  },
	  dataContextHelper: function(){
	    return {
	      someText: 'This text was set using a helper of the parent template.',
	      someNested: {
	        text: 'That comes from "someNested.text"'
	      }
	    };
	  },

  	// Listing posts
	postsList: function(){
		return Posts.find({}, {sort: {timeCreated: -1}}); 
	}

});

Template.homescreen.events({
  'click button.lazyload': function(e, template){
	  var currentLimit = Session.get('lazyloadLimit');
	  Session.set('lazyloadLimit', currentLimit + 2);
  }
});

