Template.adminPanel.onCreated(() => {
    Template.instance().subscribe('users');
    Template.instance().subscribe('categories');
    Template.instance().subscribe('sections');
    Template.instance().subscribe('cities');
    Template.instance().subscribe('countries');
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

    sections: function() {
        return Sections.find();
    },

    cities: function() {
        return Cities.find();
    },

    countries: function(){
        return Countries.find();
    }
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

    'submit .newSection': function(event, template) {

        event.preventDefault();
        var form = event.target;

        Meteor.call('insertSection', {
            title: form.inputSection.value,

        }, function(error) {

            if (error) {
                return Bert.alert(error.reason, "warning");
            }

            Bert.alert("Section added", "success");
            form.reset();
        });

    },

    'click #deleteSection': function(event, template) {

        // console.log(this._id);
        Meteor.call('deleteSection', {
            id: this._id,

        }, function(error) {

            if (error) {
                return Bert.alert(error.reason, "warning");
            }

            Bert.alert("Section deleted", "success");
        });

    },


    'submit .newCity': function(event, template) {

        event.preventDefault();
        var form = event.target;

        var countryCode;
        if(form.country.value !== 'none')
            countryCode = form.country.value;

        Meteor.call('insertCity', {
            name: form.inputCity.value,
            country: countryCode

        }, function(error) {

            if (error) {
                return Bert.alert(error.reason, "warning");
            }

            Bert.alert("City added", "success");
            form.reset();
        });

    },

    'click #deleteCity': function(event, template) {

        // console.log(this._id);
        Meteor.call('deleteCity', {
            id: this._id,

        }, function(error) {

            if (error) {
                return Bert.alert(error.reason, "warning");
            }

            Bert.alert("City deleted", "success");
        });

    },

});
