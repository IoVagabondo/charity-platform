
// #Controlling the data flow -> Lazy load posts or how to change subscriptions
Meteor.publish('lazyload-events', function (limit) {
	return Events.find({owner: this.userId}, {
		limit: limit,
		fields: {
			text: 0
		},
		sort: {timeCreated: -1}
	});
});


Meteor.publish("single-event", function(slug) {
  return Events.find({slug: slug});
});


Meteor.publish('all-initiatives', function () {
	return Initiatives.find();
});

Meteor.publish('single-initiative-with-id', function (_initiativeId) {
  return Initiatives.find({_id: _initiativeId});
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
        { vision: regex },
        { howithelps: regex },
        { whatitneeds: regex }
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

Meteor.publish( 'categories', function() {
  if (this.userId) {
    return Categories.find( {}, { fields: { "title": 1 } } );
  } else {
    return null;
  }
});

Meteor.publish( 'single-category', function(categoryId) {
  if (this.userId) {
    return Categories.findOne( {_id: categoryId}, { fields: { "title": 1 } } );
  } else {
    return null;
  }
});


Meteor.publish( 'sections', function() {
  if (this.userId) {
    return Sections.find( {}, { fields: { "title": 1 } } );
  } else {
    return null;
  }
});

Meteor.publish( 'single-section', function(sectionId) {
  if (this.userId) {
    return Sections.findOne( {_id: sectionId}, { fields: { "title": 1 } } );
  } else {
    return null;
  }
});


Meteor.publish( 'cities', function() {
  if (this.userId) {
    return Cities.find( {}, { fields: { "name": 1, "country": 1 } } );
  } else {
    return null;
  }
});

Meteor.publish( 'single-city', function(cityId) {
  if (this.userId) {
    return Cities.findOne( {_id: cityId}, { fields: { "name": 1, "country": 1 } } );
  } else {
    return null;
  }
});

Meteor.publish( 'countries', function() {
  if (this.userId) {
    return Countries.find( {}, { fields: { "name": 1, "code": 1 } } );
  } else {
    return null;
  }
});

Meteor.publish( 'single-country', function(countryCode) {
  if (this.userId) {
    return Countries.findOne({code: countryCode}, { fields: { "name": 1, "code": 1 } } );
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

Meteor.publish("paypal_payments", function (paymentId) {
 if (paymentId) {
  return PaypalPayments.find({id: paymentId, state: 'created'}, {fields: {'id': 1, 'payer': 1, 'transactions': 1, }});
 } else {
  this.ready();
 }
});
