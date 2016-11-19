Template.event.onCreated(() => {
    let template = Template.instance();
    template.autorun(() => {
        template.initiative = Initiatives.findOne({_id: template.data.initiativeId});
    });
});

Template.event.helpers({
  initiative: function(){
    return Initiatives.findOne({_id: Template.instance().data.initiativeId});
  }
});

Template.event.events({
    'click #delete': function(event,template) {
        event.preventDefault();
        Meteor.call('deleteEvent', this._id,
        	function(error, slug) {

				if(error) {
					return alert(error.reason);
				}

				Router.go('Home');
			}
		);

  },

  'click #donateButton': function(event, template) {
      event.preventDefault();
      Router.go('Event-Donate', { slug: template.data.slug });
  },
});
