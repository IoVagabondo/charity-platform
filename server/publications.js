



// // #Controlling the data flow -> Publish only parts of data
// Meteor.publish('limited-posts', function () {
// 	return Posts.find({}, {
// 		limit: 2,
// 		sort: {timeCreated: -1}
// 	});
// });


// // #Controlling the data flow -> Publish specific fields
// Meteor.publish('specificfields-posts', function () {
// 	return Posts.find({}, {
// 		fields: {
// 			title: 1
// 		}
// 	});
// });


// #Controlling the data flow -> Lazy load posts or how to change subscriptions
Meteor.publish('lazyload-posts', function (limit) {
	return Posts.find({owner: this.userId}, {
		limit: limit,
		fields: {
			text: 0
		},
		sort: {timeCreated: -1}
	});
});


Meteor.publish("single-post", function(slug) {
  return Posts.find({slug: slug});
});


Meteor.publish('all-initiatives', function () {
	return Initiatives.find();
});


Meteor.publish( 'searchableInitiatives', function( search ) {
  check( search, Match.OneOf( String, null, undefined ) );

  let query      = {},
      projection = { limit: 10, sort: { title: 1 } };

  if ( search ) {
    let regex = new RegExp( search, 'i' );

    query = {
      $or: [
        { title: regex },
        { artist: regex },
        { year: regex }
      ]
    };

    projection.limit = 100;
  }

  return Initiatives.find( query, projection );
});


// #Controlling the data flow -> Lazy load posts or how to change subscriptions
Meteor.publish('lazyload-initiatives', function (limit) {
	return Initiatives.find({}, {
		limit: limit,
		sort: {timeCreated: -1}
	});
});

Meteor.publish("single-initiative", function(slug) {
  return Initiatives.find({slug: slug});
});


Meteor.publish( 'users', function() {

  if ( Roles.userIsInRole( this.userId, 'admin') ) {
    return [
      Meteor.users.find( {}, { fields: { "profile.name": 1, "emails.address": 1, "roles": 1 } } ),
    ];
  } else {
    return null;
  }
});



Meteor.publish("userRoles", function () {
 if (this.userId) {
  return Meteor.users.find({_id: this.userId}, {fields: {roles: 1}});
 } else {
  this.ready();
 }
});

