Template.adminPanel.onCreated( () => {
  Template.instance().subscribe( 'users' );
});


Template.adminPanel.helpers({
  users: function() {
    var users = Meteor.users.find();

    if ( users ) {
      return users;
    }
  },
  // [...]
});


Template.adminPanel.events({
  'change [name="userRole"]': function( event, template ) {
    let role = $( event.target ).find( 'option:selected' ).val();

    Meteor.call( "setRoleOnUser", {
      user: this._id,
      role: role
    }, ( error, response ) => {
      if ( error ) {
        Bert.alert( error.reason, "warning" );
      }
      else{
      	Bert.alert( "Role updated!", "success" );
      }
    });
  },
  // [...]
});
