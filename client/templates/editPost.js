
Session.setDefault('saveButton', 'Save Post');

Template.editPost.helpers({
  saveButtonText: function(){
    return Session.get('saveButton');
  },
  initiatives: function(){
    return Initiatives.find({});

   }
});


Template.editPost.events({
    'submit form': function(e, tmpl){
        e.preventDefault();
        var form = e.target,
            user = Meteor.user(),
            _this = this; // we need this to reference the slug in the callback

        // Edit the post
        if(this._id) {

            Posts.update(this._id, {$set: { 
				title:          form.title.value,
                description:    form.description.value,
                text:           form.text.value,
                initiative:     form.initiative.value
            
            }}, function(error) {
                if(error) {
                    // display the error to the user
                    alert(error.reason);
                } else {
                    // Redirect to the post
                    Router.go('Post', {slug: _this.slug});
                }
            });

            
        // SAVE
        } else {

            var slug = _.slugify(form.title.value);

			Meteor.call('insertPost', {
				title: 			form.title.value,
				slug: 			slug,
				description: 	form.description.value,
				text: 			form.text.value,
                initiative:     form.initiative.value
			
			}, function(error, slug) {
				Session.set('saveButton', 'Save Post');

				if(error) {
					return alert(error.reason);
				}

				// Here we use the probably changed slug from the server side method
				Router.go('Post', {slug: slug});
			});

        }
    },

    
});