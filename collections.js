// #Storing Data -> Setup a collection
Events = new Mongo.Collection('events');
Initiatives = new Mongo.Collection('initiatives');


// #Security with allow and deny rules -> Restricting database updates
if (Meteor.isServer) {

    Initiatives._ensureIndex({ title: 1, vision: 1, howithelps: 1, whatitneeds: 1 });

    Meteor.users.deny({
        insert: function(userId, document) {
            return true;
        },
        update: function(userId, document, fields, modifier) {
            return true;
        },
        remove: function(userId, document) {
            return true;
        }
    });

    Events.allow({
        insert: function(userId, doc) {
            return userId && doc.owner === userId;
        },
        update: function(userId, doc, fields, modifier) {
            return userId && doc.owner === userId;
        },
        remove: function(userId, doc) {
            return userId && doc.owner === userId;
        },
        // make sure we only get this field from the documents
        fetch: ['owner']
    });

    Events.deny({
        update: function(userId, docs, fields, modifier) {
            // Can't change owners, timeCreated and slug
            return _.contains(fields, 'owner') || _.contains(fields, 'timeCreated') || _.contains(fields, 'slug');
        }
    });

    Initiatives.allow({
        insert: function(userId, doc) {
            // The user must be logged in, and the document must be owned by the user
            return userId && doc.owner === userId && Meteor.user().roles.admin;
        },
        update: function(userId, doc, fields, modifier) {
            // User must be an admin
            return Roles.userIsInRole(userId, 'admin');
        },
        remove: function(userId, doc) {
            // User must be an admin
            return userId && Roles.userIsInRole(userId, 'admin');
        },
        // make sure we only get this field from the documents
        fetch: ['owner']
    });

    Initiatives.deny({
        update: function(userId, docs, fields, modifier) {
            // Can't change owners, timeCreated and slug
            return _.contains(fields, 'owner') || _.contains(fields, 'timeCreated') || _.contains(fields, 'slug');
        }
    });

}
