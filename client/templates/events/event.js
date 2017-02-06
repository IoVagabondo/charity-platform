Template.event.onCreated(() => {
    let template = Template.instance();
    template.autorun(() => {
        template.initiative = Initiatives.findOne({_id: template.data.initiativeId});
        template.subscribe('single-city', template.initiative.cityId);
        template.subscribe('single-section', template.initiative.sectionId);
        template.subscribe('single-category', template.initiative.categoryId);

    });
});

Template.event.helpers({
  initiative: function(){
    var initiative = Initiatives.findOne({_id: Template.instance().data.initiativeId});
    initiative.city = Cities.findOne();
    initiative.category = Categories.findOne();
    initiative.section = Sections.findOne();
    return initiative;
  },

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
