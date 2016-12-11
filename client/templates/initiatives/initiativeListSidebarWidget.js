
Template.initiativeListSidebarWidgets.events({
  'click #suggestNGO': function(event, template) {
      event.preventDefault();
      $('#suggestNGOModal').modal('show');
  },
});
