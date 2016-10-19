
Session.setDefault('saveButton', 'Save Post');

Template.editInitiative.helpers({
  saveButtonText: function(){
    return Session.get('saveButton');
  },
  hasId: function(){
    return this._id;
  },
  getProducts: function(){
    return this.products;
  }
});


Template.editInitiative.events({
    'submit form': function(e, tmpl){
        e.preventDefault();
        var form = e.target,
            user = Meteor.user(),
            _this = this; // we need this to reference the slug in the callback

        // Edit the initiative
        if(this._id) {

            Initiatives.update(this._id, {$set: { 
				title:          form.title.value,
                vision:         form.vision.value,
                howithelps:     form.howithelps.value,
                whatitneeds:    form.whatitneeds.value,
                website:        form.website.value,
                description:    form.description.value,
                cause:          form.cause.value,
                location:       form.location.value,
                contactperson:  form.contactperson.value,
                // contactemail:   form.contactEmail.value,
                // contacttel:     form.contactTal.value,
                // contactadress:  form.contactadress.value,
                foundingyear:   form.foundingyear.value, 
            
            }}, function(error) {
                if(error) {
                    // display the error to the user
                    alert(error.reason);
                    console.log('edit Inititative with ID')
                } else {
                    // Redirect to the post
                    Router.go('Initiatives', {slug: _this.slug});
                }
            });

            
        // SAVE
        } else {

            var slug = _.slugify(form.title.value);

			Meteor.call('insertInitiative', {
				title: 			form.title.value,
				slug: 			slug,
                vision:         form.vision.value,
                howithelps:     form.howithelps.value,
                whatitneeds:    form.whatitneeds.value,
                website:        form.website.value,
				description: 	form.description.value,
				cause:          form.cause.value,
                location:       form.location.value,
                contactperson:  form.contactperson.value,
                // contactemail:   form.contactEmail.value,
                // contacttel:     form.contactTal.value,
                // contactadress:  form.contactadress.value,
                foundingyear:   form.foundingyear.value,
			
			}, function(error, slug) {
				Session.set('saveButton', 'Save Post');

				if(error) {
					return alert(error.reason);
				}

				// Here we use the probably changed slug from the server side method
				Router.go('Initiatives', {slug: slug});
			});

        }
    },

    
});