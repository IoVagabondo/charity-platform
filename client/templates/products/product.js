Template.product.events({

    'click a.inTable': function(e, template) {
        // ToDo: Aus Array in Initiative Doc entfernen
        // console.log("Pressed DELETE of Product");
        // console.log(this);
        // console.log(Template.parentData()._id);
        e.preventDefault();
        var form = e.target,
            initiativeId = Template.parentData()._id;

        Initiatives.update(initiativeId, {
            $pull: {
                products: { id: this.id}
            }
        }, function(error) {
            if (error) {
                // display the error to the user
                alert(error.reason);
            } else {
                // Show confirmation
                // console.log("done");

            }
        });
    },

});
