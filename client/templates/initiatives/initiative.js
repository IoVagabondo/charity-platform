Template.initiative.helpers({
  products: function(){
		return Template.instance().data.products;
	}
});

Template.initiative.events({
    'click #delete': function(event,template) {
        event.preventDefault();
        Meteor.call('deleteInitiative', this._id,
        	function(error, slug) {

				if(error) {
					return alert(error.reason);
				}

				Router.go('Initiatives');
			}
		);

    }
});
