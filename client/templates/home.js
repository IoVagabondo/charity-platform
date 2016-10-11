Template.home.created = function(){
  console.log('Created the home template');
};
Template.home.rendered = function(){
  console.log('Rendered the home template');
  // Replace the all p-Tag in template home created by markdown block helper
  // this.$('p').html('We just replaced that text! DAMM');
};

Template.home.destroyed = function(){
  console.log('Destroyed the home template');
}; 


// Template.home.helpers({
//   exampleHelper: function(){
//     return 'This text came from a helper with some <strong>HTML</strong>.';
//   }
// });


Template.home.helpers({
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

Template.home.events({
  'click button.lazyload': function(e, template){
  var currentLimit = Session.get('lazyloadLimit');

  Session.set('lazyloadLimit', currentLimit + 2);
  }
});

