Template.post.events({
    'click #delete': function(event,template) {
        event.preventDefault();
        Meteor.call('deletePost', this._id,
        	function(error, slug) {

				if(error) {
					return alert(error.reason);
				}

				Router.go('Home');
			}
		);
        
    }
});