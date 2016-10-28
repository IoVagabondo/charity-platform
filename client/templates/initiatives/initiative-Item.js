

Template.initiativeItem.helpers({
    isSelected: function() {
        return this._id === Session.get('selectedInitiativeId');
	}
});


Template.initiativeItem.events({
    'click #selectItem': function(event,template) {
        event.preventDefault();
        Session.set('selectedInitiativeId', this._id);
    }
});