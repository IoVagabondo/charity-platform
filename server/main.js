Meteor.startup(function(){

	console.log('Server started');


	// #Users and Permissions -> -> Creating the admin user
	if(Meteor.users.find().count() === 0) {

		var userId = Accounts.createUser({
			username: 'sven@primi.io',
			email: 'sven@primi.io',
			password: '1234',
			profile: {
				name: 'Sven Rossmann'
			}
		});

		Roles.addUsersToRoles(userId, ['admin']);

		var userId = Accounts.createUser({
			username: 'bea@primi.io',
			email: 'bea@primi.io',
			password: '1234',
			profile: {
				name: 'Bea Zanforlin'
			}
		});

		Roles.addUsersToRoles(userId, ['admin']);

		var userId = Accounts.createUser({
			username: 'mia',
			email: 'mia@example.com',
			password: '1234',
			profile: {
				name: 'Mia Zehnicker'
			}
		});

		Roles.addUsersToRoles(userId, [], 'default-group');
	}
});
