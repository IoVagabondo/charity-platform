// #Storing Data -> Setup a collection
Events = new Mongo.Collection('events');
Initiatives = new Mongo.Collection('initiatives');
Categories = new Mongo.Collection('categories');
Sections = new Mongo.Collection('sections');
Cities = new Mongo.Collection('cities');
Countries = new Mongo.Collection('countries');
SubscribersNewsletter = new Mongo.Collection('subscribers_newsletter');

Donors = new Mongo.Collection('donors');

PaypalPayments = new Meteor.Collection('paypal_payments');
PaypalTokens = new Meteor.Collection('paypal_tokens');

var Schemas = {};


Schemas.Donors = new SimpleSchema({
    event_id: {
      type: String
    },
    name: {
      type: String,
    },
    email: {
        type: String,
    },
    birthday: {
        type: String,
    },
    gender: {
      type: String,
    },
    email_verified: {
      type: Boolean,
      defaultValue: false,
    },

    donated: {
      type: Boolean,
      defaultValue: false,
    },

    bankPayment: {
      type: Number,
      optional: true,
    },

    donationAmount: {
      type: Number,
      optional: true,
    },

    timeCreated: {
        type: Date,
        autoValue: function() {
            if (this.isInsert) {
                return new Date;
            }
        }
    },
});

Schemas.SubscribersNewsletter = new SimpleSchema({
    email: {
        type: String,
    },
    confirmed: {
        type: Boolean,
    },
    timeCreated: {
        type: Date,
        autoValue: function() {
            if (this.isInsert) {
                return new Date;
            }
        }
    },
});

Schemas.Cities = new SimpleSchema({
    name: {
        type: String,
    },
    country: {
        type: String,
    }
});

Schemas.Events = new SimpleSchema({
    title: {
        type: String,
        label: "Title"
    },
    slug: {
        type: String,
        label: "Slug"
    },
    date: {
        type: String,
        label: "Date of Event"
    },
    location: {
        type: String,
        label: "Location of Event"
    },
    suggestedValue: {
        type: String,
        label: "Suggested Value for Funding",
        optional: true,
    },
    noSuggestedValue: {
      type: String,
      label: "True if no suggested value",
      optional: true,
    },
    description: {
        type: String,
        label: "Event Description"
    },
    initiativeId: {
        type: String,
        label: "ID of Initiative"
    },
    timeCreated: {
        type: Date,
        label: "Time Created",
        autoValue: function() {
            if (this.isInsert) {
                return new Date;
            }
        }
    },
    author: {
        type: String,
        label: "Author of Event"
    },
    owner: {
        type: String,
        label: "Owner of the Event"
    },
    pictureURL: {
        type: String,
        optional: true,
        label: "Picture of Event"
    }
});

//Arrach Schemas to MongoDB Collections
Events.attachSchema(Schemas.Events);
Cities.attachSchema(Schemas.Cities);
SubscribersNewsletter.attachSchema(Schemas.SubscribersNewsletter);
Donors.attachSchema(Schemas.Donors);


// #Security with allow and deny rules -> Restricting database updates
if (Meteor.isServer) {

    Initiatives._ensureIndex({ title: 1, vision: 1, howithelps: 1, whatitneeds: 1 });
    Categories._ensureIndex({ title: 1 });
    Sections._ensureIndex({ title: 1 });
    Cities._ensureIndex({ title: 1 });

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

    Categories.allow({
        insert: function(userId, document) {
            return Roles.userIsInRole(userId, 'admin');
        },
        update: function(userId, document, fields, modifier) {
            return Roles.userIsInRole(userId, 'admin');
        },
        remove: function(userId, document) {
            return Roles.userIsInRole(userId, 'admin');
        }
    });

    Sections.allow({
        insert: function(userId, document) {
            return Roles.userIsInRole(userId, 'admin');
        },
        update: function(userId, document, fields, modifier) {
            return Roles.userIsInRole(userId, 'admin');
        },
        remove: function(userId, document) {
            return Roles.userIsInRole(userId, 'admin');
        }
    });

    Cities.allow({
        insert: function(userId, document) {
            return Roles.userIsInRole(userId, 'admin');
        },
        update: function(userId, document, fields, modifier) {
            return Roles.userIsInRole(userId, 'admin');
        },
        remove: function(userId, document) {
            return Roles.userIsInRole(userId, 'admin');
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

    SubscribersNewsletter.deny({
        update: function(userId, docs, fields, modifier) {
            // Can't change email and timeCreated
            return _.contains(fields, 'timeCreated') || _.contains(fields, 'email');
        }
    });

    SubscribersNewsletter.allow({
        update: function(userId, doc, fields, modifier) {
            // User must be an admin
            return Roles.userIsInRole(userId, 'admin');
        }
    });


}
