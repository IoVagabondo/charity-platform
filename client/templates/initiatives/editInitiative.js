Session.setDefault('saveButton', 'Save Post');

Template.editInitiative.onCreated(() => {
    let template = Template.instance();

    template.autorun(() => {
        template.subscribe('categories');
        template.subscribe('sections');
        template.subscribe('cities');
    });
});

Template.editInitiative.helpers({


    categoriesList: function() {
        return Categories.find();
    },

    sectionsList: function() {
        return Sections.find();
    },

    citiesList: function() {
        return Cities.find();
    },

    //select category dynamic in html select dropdown by comparison of option id & stored category id
    selectedCategory: function() {
        if (!Template.instance().data) {
            return this.value == 'none' ? 'selected' : '';
        }
        return this._id == Template.instance().data.categoryId ? 'selected' : '';
    },

    selectedSection: function() {
        if (!Template.instance().data) {
            return this.value == 'none' ? 'selected' : '';
        }
        return this._id == Template.instance().data.sectionId ? 'selected' : '';
    },

    selectedCity: function() {
        if (!Template.instance().data) {
            return this.value == 'none' ? 'selected' : '';
        }
        return this._id == Template.instance().data.cityId ? 'selected' : '';
    },

    saveButtonText: function() {
        return Session.get('saveButton');
    },
    hasId: function() {
        return this._id;
    },
    getProducts: function() {
        return this.products;
    }
});


Template.editInitiative.events({
    'submit form': function(e, tmpl) {
        e.preventDefault();
        var form = e.target,
            user = Meteor.user(),
            _this = this; // we need this to reference the slug in the callback

        // Edit the initiative
        if (this._id) {

            Initiatives.update(this._id, {
                $set: {
                    title: form.title.value,
                    slug: slug,
                    vision: form.vision.value,
                    howithelps: form.howithelps.value,
                    whatitneeds: form.whatitneeds.value,
                    website: form.website.value,
                    description: form.description.value,
                    categoryId: form.category.value,
                    sectionId: form.section.value,
                    cityId: form.city.value,
                    contact: {
                        contactPerson: form.contactPerson.value,
                        contactEmail: form.contactEmail.value,
                        contactTel: form.contactTel.value,
                        contactStreet: form.contactStreet.value,
                        contactZip: form.contactZip.value,
                        contactCity: form.contactCity.value,
                        contactCountry: form.contactCountry.value
                    },
                    foundingYear: form.foundingYear.value,

                }
            }, function(error) {
                if (error) {
                    // display the error to the user
                    alert(error.reason);
                } else {
                    // Redirect to the post
                    Router.go('Initiatives', { slug: _this.slug });
                }
            });


            // SAVE
        } else {

            var slug = _.slugify(form.title.value);

            Meteor.call('insertInitiative', {
                title: form.title.value,
                slug: slug,
                vision: form.vision.value,
                howithelps: form.howithelps.value,
                whatitneeds: form.whatitneeds.value,
                website: form.website.value,
                description: form.description.value,
                categoryId: form.category.value,
                sectionId: form.section.value,
                cityId: form.city.value,
                contact: {
                    contactPerson: form.contactPerson.value,
                    contactEmail: form.contactEmail.value,
                    contactTel: form.contactTel.value,
                    contactStreet: form.contactStreet.value,
                    contactZip: form.contactZip.value,
                    contactCity: form.contactCity.value,
                    contactCountry: form.contactCountry.value
                },
                foundingYear: form.foundingYear.value,

            }, function(error, slug) {
                Session.set('saveButton', 'Save Post');

                if (error) {
                    return alert(error.reason);
                }

                // Here we use the probably changed slug from the server side method
                Router.go('Initiatives', { slug: slug });
            });

        }
    },

    'change input[type="file"]' (event, template) {
        file = Modules.client.uploadToAmazonS3({ event: event, template: template, id: this._id }, function(id, url) {
            if (url) {
                // console.log(url);
                console.log(id);
                if (id) {
                    Initiatives.update(id, {
                        $set: {
                            imageURL: url

                        }
                    }, function(error) {
                        if (error) {
                            Bert.alert(error.reason, "warning");
                        } else {
                            // TODO
                        }
                    });

                }

            }
        });
    }

});
