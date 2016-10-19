
Template.editProducts.helpers({
  getProducts: function(){
    return this.products;
  },

  productsList: function(){
        // console.log(this._id);
        return Initiatives.findOne({_id : this._id}).products;
    }

});


Template.editProducts.events({
    'submit form': function(e, tmpl){
        e.preventDefault();
        var form = e.target,
            user = Meteor.user(),
            _this = this;

        // Insert the product in the initiative
        if(this._id) {
            Initiatives.update(this._id, {$push: { 
                products:       {title: form.title.value, description: form.description.value, productValue: form.productValue.value}
            
            }}, function(error) {
                if(error) {
                    // display the error to the user
                    alert(error.reason);
                    console.log('edit Products with ID');
                } else {
                    // Show confirmation
                    form.reset();
                }
            });

            
        
        } 
    },


    
});