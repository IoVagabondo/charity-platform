Template.productItem.helpers({
    isSelected: function() {
        return this.id === Session.get('selectedProductId');
	}
});


Template.productItem.events({
    'click #selectItem': function(event,template) {
        event.preventDefault();
        var currentSelection = Session.get('selectedProductId');
        if(currentSelection === this.id){
          Session.set('selectedProductId','');
          Session.set('selectedProductTitle','');
          Session.set('selectedProductDescription','');
          Session.set('selectedProductValue','');
        }
        else {
          Session.set('selectedProductId',this.id);
          Session.set('selectedProductTitle',this.title);
          Session.set('selectedProductDescription',this.description);
          Session.set('selectedProductValue',this.productValue);
        }
    }
});
