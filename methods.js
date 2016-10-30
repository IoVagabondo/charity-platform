// #Security with allow and deny rules -> Adding Events using a method call
Meteor.methods({
    insertEvent: function(postDocument) {

        if (this.isSimulation) {
            Session.set('saveButton', 'Saving...');

        } else {
            var user = Meteor.user();

            // ensure the user is logged in
            if (!user)
                throw new Meteor.Error(401, "You need to login to create an event");


            // prevent duplicate link names, we just add a random string like: "my-page-c5g"
            if (Events.findOne({ slug: postDocument.slug }))
                postDocument.slug = postDocument.slug + '-' + Math.random().toString(36).substring(3);


            // add properties on the serverside
            postDocument.timeCreated = moment().unix();
            postDocument.author = user.profile.name;
            postDocument.owner = user._id;


            Events.insert(postDocument);

            // this will be received as the second parameter of the method callback
            return postDocument.slug;
        }
    },

    deleteEvent: function(postId) {

        var user = Meteor.user();

        if (!user)
            throw new Meteor.Error(401, "You need to login");

        return Events.remove(postId);

    },


    // ########### Initiatives ##########

    insertInitiative: function(initiativeDocument) {

        if (this.isSimulation) {
            Session.set('saveButton', 'Saving...');

        } else {
            var user = Meteor.user();

            // ensure the user is logged in
            if (!user)
                throw new Meteor.Error(401, "You need to login to insert a initiative");


            // prevent duplicate link names, we just add a random string like: "my-page-c5g"
            if (Initiatives.findOne({ slug: initiativeDocument.slug }))
                initiativeDocument.slug = initiativeDocument.slug + '-' + Math.random().toString(36).substring(3);


            // add properties on the serverside
            initiativeDocument.timeCreated = moment().unix();
            initiativeDocument.author = user.profile.name;
            initiativeDocument.owner = user._id;


            Initiatives.insert(initiativeDocument);

            // this will be received as the second parameter of the method callback
            return initiativeDocument.slug;
        }
    },

    deleteInitiative: function(initiativeId) {

        var user = Meteor.user();

        if (!user)
            throw new Meteor.Error(401, "You need to login");

        return Initiatives.remove(initiativeId);

    },

    insertCategory: function(category) {

        var user = Meteor.user();

        // ensure the user is logged in
        if (!user)
            throw new Meteor.Error(401, "You need to login to add an category");

        // prevent duplicate link names, we just add a random string like: "my-page-c5g"
        if (Categories.findOne({ title: category.title }))
            throw new Meteor.Error(401, "Title already exists");

        Categories.insert(category);

        return true;

    },

    deleteCategory: function(category) {

        var user = Meteor.user();

        if (!user)
            throw new Meteor.Error(401, "You need to login to add an category");

        return Categories.remove({_id: category.id});

    },

    setRoleOnUser: function(options) {
        check(options, {
            user: String,
            role: String
        });

        try {
            Roles.setUserRoles(options.user, [options.role]);
        } catch (exception) {
            return exception;
        }
    },


});
