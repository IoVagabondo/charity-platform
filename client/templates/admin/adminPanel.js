Template.adminPanel.onCreated(() => {
    Template.instance().subscribe('users');
    Template.instance().subscribe('categories');
});


Template.adminPanel.helpers({
    users: function() {
        var users = Meteor.users.find();

        if (users) {
            return users;
        }
    },

    categories: function() {
        return Categories.find();
    },
});


Template.adminPanel.events({
    'change [name="userRole"]': function(event, template) {
        let role = $(event.target).find('option:selected').val();

        Meteor.call("setRoleOnUser", {
            user: this._id,
            role: role
        }, (error, response) => {
            if (error) {
                Bert.alert(error.reason, "warning");
            } else {
                Bert.alert("Role updated!", "success");
            }
        });
    },


    'submit form': function(event, template) {

        event.preventDefault();
        var form = event.target;

        Meteor.call('insertCategory', {
            title: form.inputCategory.value,

        }, function(error) {

            if (error) {
                return Bert.alert(error.reason, "warning");
            }

            Bert.alert("Category added", "success");
            form.reset();
        });

    },

    'click #deleteCategory': function(event, template) {

        // console.log(this._id);
        Meteor.call('deleteCategory', {
            id: this._id,

        }, function(error) {

            if (error) {
                return Bert.alert(error.reason, "warning");
            }

            Bert.alert("Category deleted", "success");
        });

    },

});
