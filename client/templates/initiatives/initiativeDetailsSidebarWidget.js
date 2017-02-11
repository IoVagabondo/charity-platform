Template.initiativeDetailsSidebarWidgets.events({
  'click #suggestNGO': function(event, template) {
      event.preventDefault();
      $('#suggestNGOModal').modal('show');
  },

  'click #deleteInitiative': function(event,template) {
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
