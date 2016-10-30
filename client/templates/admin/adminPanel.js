Template.adminPanel.onCreated(() => {
    Template.instance().subscribe('users');
    Template.instance().subscribe('categories');
    Template.instance().subscribe('locations');
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

    locations: function() {
        return Locations.find();
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


    'submit .newCategory': function(event, template) {

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


    'submit .newLocation': function(event, template) {

        event.preventDefault();
        var form = event.target;

        Meteor.call('insertLocation', {
            title: form.inputLocation.value,

        }, function(error) {

            if (error) {
                return Bert.alert(error.reason, "warning");
            }

            Bert.alert("Location added", "success");
            form.reset();
        });

    },

    'click #deleteLocation': function(event, template) {

        // console.log(this._id);
        Meteor.call('deleteLocation', {
            id: this._id,

        }, function(error) {

            if (error) {
                return Bert.alert(error.reason, "warning");
            }

            Bert.alert("Location deleted", "success");
        });

    },

});
