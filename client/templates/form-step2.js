 
Template.formStep2.helpers({
	  
  	// Listing posts
	initiativesList: function(){
		return Initiatives.find({}, {sort: {timeCreated: -1}}); 
	}

});

Template.formStep2.events({
  'click button.lazyload': function(e, template){
	  var currentLimit = Session.get('lazyloadLimit_initiatives');
	  Session.set('lazyloadLimit_initiatives', currentLimit + 2);
  }
});

