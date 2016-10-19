// Template.initiatives.created = function(){
//   console.log('Created the initiatives template');
// };
// Template.initiatives.rendered = function(){
//   console.log('Rendered the initiatives template');
//   // Replace the all p-Tag in template initiatives created by markdown block helper
//   // this.$('p').html('We just replaced that text! DAMM');
// };

// Template.initiatives.destroyed = function(){
//   console.log('Destroyed the initiatives template');
// }; 


// Template.initiatives.helpers({
//   exampleHelper: function(){
//     return 'This text came from a helper with some <strong>HTML</strong>.';
//   }
// });


Template.initiatives.helpers({
	  
	  dataContextHelper: function(){
	    return {
	      someText: 'This text was set using a helper of the parent template.',
	      someNested: {
	        text: 'That comes from "someNested.text"'
	      }
	    };
	  },

  	// Listing posts
	initiativesList: function(){
		return Initiatives.find({}, {sort: {timeCreated: -1}}); 
	}

});

Template.initiatives.events({
  'click button.lazyload': function(e, template){
	  var currentLimit = Session.get('lazyloadLimit_initiatives');
	  Session.set('lazyloadLimit_initiatives', currentLimit + 2);
  }
});

