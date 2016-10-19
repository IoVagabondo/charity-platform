Template.product.events({
  
  'click button.inTable': function(e, template){ 
    // ToDo: Aus Array in Initiative Doc entfernen
    console.log("Pressed DELETE of Product");
    console.log(this.title);
  },

});