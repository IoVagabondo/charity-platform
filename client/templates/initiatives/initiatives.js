
Template.initiatives.helpers({

  	// Listing posts
	initiativesList: function(){
		return Initiatives.find({}, {sort: {timeCreated: -1}}); 
	}

});

Template.initiatives.events({
  'click #lazyload': function(e, template){
	  var currentLimit = Session.get('lazyloadLimit_initiatives');
	  Session.set('lazyloadLimit_initiatives', currentLimit + 2);
  }
});
