Template.editProducts.onCreated(function(){
  Session.set('sliderValueIs', '45');
});

Template.editProducts.helpers({
    getProducts: function() {
        return this.products;
    },

    productsList: function() {
        // console.log(this._id);
        return Initiatives.findOne({ _id: this._id }).products;
    },

    sliderValue: function() {
      return Session.get('sliderValueIs');
    }

});


Template.editProducts.events({
    'click #addProduct': function(event, template) {
        event.preventDefault();
        $('#addNewProductModal').modal('show');
    },
    
    'submit form': function(e, tmpl) {
        e.preventDefault();
        var form = e.target,
            user = Meteor.user(),
            _this = this;

        // Insert the product in the initiative
        if (this._id) {
            Initiatives.update(this._id, {
                $push: {
                    products: { id: new Date().getTime().toString().substr(4), title: form.title.value, description: form.description.value, productValue: form.productValue.value }

                }
            }, function(error) {
                if (error) {
                    // display the error to the user
                    Bert.alert(error.reason, "warning");
                } else {
                    // Show confirmation
                    Bert.alert("Product successfully inserted", "success");
                    form.reset();
                    Session.set('sliderValueIs', '45');
                }
            });



        }
    },

    'input input[type=range]': function(event){
     var sliderValue = event.currentTarget.value
     Session.set('sliderValueIs', sliderValue)

    },


});
