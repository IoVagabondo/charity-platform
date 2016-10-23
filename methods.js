// #Security with allow and deny rules -> Adding posts using a method call
Meteor.methods({
    insertPost: function(postDocument) {

        if (this.isSimulation) {
            Session.set('saveButton', 'Saving...');

        } else {
            var user = Meteor.user();

            // ensure the user is logged in
            if (!user)
                throw new Meteor.Error(401, "You need to login to write a post");


            // prevent duplicate link names, we just add a random string like: "my-page-c5g"
            if (Posts.findOne({ slug: postDocument.slug }))
                postDocument.slug = postDocument.slug + '-' + Math.random().toString(36).substring(3);


            // add properties on the serverside
            postDocument.timeCreated = moment().unix();
            postDocument.author = user.profile.name;
            postDocument.owner = user._id;


            Posts.insert(postDocument);

            // this will be received as the second parameter of the method callback
            return postDocument.slug;
        }
    },

    deletePost: function(postId) {

        var user = Meteor.user();

        if (!user)
            throw new Meteor.Error(401, "You need to login");

        return Posts.remove(postId);

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
