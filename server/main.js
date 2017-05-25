Meteor.startup(function(){

	console.log('Server started');

	process.env.MAIL_URL = "smtp://postmaster%40sandboxc73b665f63324f0d842b88a770d2a74e.mailgun.org:8ee0576232e1fae2e684ecd99e082c44@smtp.mailgun.org:587";
	
	// #Users and Permissions -> -> Creating the admin user
	if(Meteor.users.find().count() === 0) {

		var userId = Accounts.createUser({
			username: 'sven@surprese.me',
			email: 'sven@surprese.me',
			password: '1234',
			profile: {
				name: 'Sven Rossmann'
			}
		});

		Roles.addUsersToRoles(userId, ['admin']);

		var userId = Accounts.createUser({
			username: 'bea@surprese.me',
			email: 'bea@surprese.me',
			password: '1234',
			profile: {
				name: 'Ana Beatriz G. Zanforlin'
			}
		});

		Roles.addUsersToRoles(userId, ['admin']);

		var userId = Accounts.createUser({
			username: 'gabi@surprese.me',
			email: 'gabi@surprese.me',
			password: '1234',
			profile: {
				name: 'Gabriela Marques'
			}
		});

		Roles.addUsersToRoles(userId, ['admin']);

		var userId = Accounts.createUser({
			username: 'mia@surprese.me',
			email: 'mia@surprese.me',
			password: '1234',
			profile: {
				name: 'Mia Zehnicker'
			}
		});

		Roles.addUsersToRoles(userId, ['user']);
	}
});
