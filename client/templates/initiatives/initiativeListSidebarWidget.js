Template.initiativeListSidebarWidgets.onCreated(function(){
  let template = Template.instance();

      template.subscribe('categories');
      template.subscribe('sections');
      template.subscribe('cities');

});


Template.initiativeListSidebarWidgets.helpers({

    categoriesList: function() {
        return Categories.find();
    },

    sectionsList: function() {
        return Sections.find();
    },

    citiesList: function() {
        return Cities.find();
    },
});

Template.initiativeListSidebarWidgets.events({
  'click #suggestNGO': function(event, template) {
      event.preventDefault();
      $('#suggestNGOModal').modal('show');
  },
});
