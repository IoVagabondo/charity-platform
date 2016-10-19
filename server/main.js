Meteor.startup(function(){

	console.log('Server started');


	// #Users and Permissions -> -> Creating the admin user
	if(Meteor.users.find().count() === 0) {

		console.log('Created Admin user');

		var userId = Accounts.createUser({
			username: 'sven',
			email: 'sven@example.com',
			password: '1234',
			profile: {
				name: 'Sven Rossmann'
			}
		});
		Meteor.users.update(userId, {$set: {
			roles: {admin: true},
		}})

		var userId = Accounts.createUser({
			username: 'mia',
			email: 'mia@example.com',
			password: '1234',
			profile: {
				name: 'Mia Rossmann'
			}
		});
	}
});