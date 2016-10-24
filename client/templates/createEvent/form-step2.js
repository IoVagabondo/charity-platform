 
var handle = null;

Template.formStep2.onRendered(function(){
	this.find('.searchQuery').value = Session.get('searchQuery');
});


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
  },
  'input input.searchQuery': function(evt) {
    var self = this;
    if (handle)
        clearTimeout(handle);
    handle = setTimeout(function() {
        var query = $(evt.target).val();
        Session.set('searchQuery', query);
        // console.log(Session.get('searchQuery'));
    }, 700);
  },
});

