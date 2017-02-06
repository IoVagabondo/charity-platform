// #Security with allow and deny rules -> Adding Events using a method call

this.paypalConf = {
  host: "api.sandbox.paypal.com",
  clientId: "AdaNORaU1gtMWFEyG6iTARnLpMBAiUC2R0S4Nsqxjo3Vj7l6XqNIX6RHR6FAMSY5F-Skrw5hS5F7m33L",
  clientSecret: "EFb3aZIbppN68udKdFGNGuPLxBZBMJ42e5bw5HqqsShj0qgUgdzQozPYZZcpcuNpD171d81igJpPchXb"
};

Meteor.methods({
    insertEvent: function(postDocument) {

        if (this.isSimulation) {
            Session.set('saveButton', 'Saving...');

        } else {
            var user = Meteor.user();

            // ensure the user is logged in
            if (!user)
                throw new Meteor.Error(401, "You need to login to create an event");


            // prevent duplicate link names, we just add a random string like: "my-page-c5g"
            if (Events.findOne({ slug: postDocument.slug }))
                postDocument.slug = postDocument.slug + '-' + Math.random().toString(36).substring(3);


            // add properties on the serverside
            // postDocument.timeCreated = moment().unix();
            postDocument.author = user.profile.name;
            postDocument.owner = user._id;

            Events.insert(postDocument);

            // this will be received as the second parameter of the method callback
            return postDocument.slug;
        }
    },

    deleteEvent: function(postId) {

        var user = Meteor.user();

        if (!user)
            throw new Meteor.Error(401, "You need to login");

        return Events.remove(postId);

    },


    // ########### Initiatives ##########

    insertInitiative: function(initiativeDocument) {

        if (this.isSimulation) {
            Session.set('saveButton', 'Saving...');

        } else {
            var user = Meteor.user();

            // ensure the user is logged in
            if (!user)
                throw new Meteor.Error(401, "You need to login to insert a initiative");


            // prevent duplicate link names, we just add a random string like: "my-page-c5g"
            if (Initiatives.findOne({ slug: initiativeDocument.slug }))
                initiativeDocument.slug = initiativeDocument.slug + '-' + Math.random().toString(36).substring(3);


            // add properties on the serverside
            initiativeDocument.timeCreated = moment().unix();
            initiativeDocument.author = user.profile.name;
            initiativeDocument.owner = user._id;


            Initiatives.insert(initiativeDocument);

            // this will be received as the second parameter of the method callback
            return initiativeDocument.slug;
        }
    },

    deleteInitiative: function(initiativeId) {

        var user = Meteor.user();

        if (!user)
            throw new Meteor.Error(401, "You need to login");

        return Initiatives.remove(initiativeId);

    },

    // ########### Categories ##########

    insertCategory: function(category) {

        var user = Meteor.user();

        // ensure the user is logged in
        if (!user)
            throw new Meteor.Error(401, "You need to login to add an category");

        // prevent duplicate link names, we just add a random string like: "my-page-c5g"
        if (Categories.findOne({ title: category.title }))
            throw new Meteor.Error(401, "Title already exists");

        Categories.insert(category);

        return true;

    },

    deleteCategory: function(category) {

        var user = Meteor.user();

        if (!user)
            throw new Meteor.Error(401, "You need to login to add an category");

        return Categories.remove({ _id: category.id });

    },

    // ########### Public/Sections ##########

    insertSection: function(section) {

        var user = Meteor.user();

        // ensure the user is logged in
        if (!user)
            throw new Meteor.Error(401, "You need to login to add an section");

        // prevent duplicate link names, we just add a random string like: "my-page-c5g"
        if (Sections.findOne({ title: section.title }))
            throw new Meteor.Error(401, "Section already exists");

        Sections.insert(section);

        return true;

    },

    deleteSection: function(section) {

        var user = Meteor.user();

        if (!user)
            throw new Meteor.Error(401, "You need to login to add an section");

        return Sections.remove({ _id: section.id });

    },

    // ########### Cities ##########

    insertCity: function(city) {

        var user = Meteor.user();

        // ensure the user is logged in
        if (!user)
            throw new Meteor.Error(401, "You need to login to add an Cities");

        // prevent duplicate link names, we just add a random string like: "my-page-c5g"
        if (Cities.findOne({ name: city.name }))
            throw new Meteor.Error(401, "Title already exists");

        Cities.insert(city);

        return true;

    },

    deleteCity: function(city) {

        var user = Meteor.user();

        if (!user)
            throw new Meteor.Error(401, "You need to login to add an Cities");

        return Cities.remove({ _id: city.id });

    },

    insertNewsletterSubscriber: function(subscriber) {

        // prevent duplicate entries
        if (SubscribersNewsletter.findOne({ email: subscriber.email }))
            throw new Meteor.Error(401, "Email already exists");

        SubscribersNewsletter.insert(subscriber);

        return true;

    },

    insertNewDonor: function(donorObject) {
        var donorId;
        // TODO: Check if user with email already exists
        return Donors.insert(donorObject);


    },

    // ########### Set roles on users ##########

    setRoleOnUser: function(options) {
        check(options, {
            user: String,
            role: String
        });

        try {
            Roles.setUserRoles(options.user, [options.role]);
        } catch (exception) {
            return exception;
        }
    },

    // ########### Begin section for paypal integration ##########

    // ########### get token from paypal ##########

    'getPaypalToken': function() {
      var auth, isTokenValid, token;
      isTokenValid = 0;
      token = PaypalTokens.findOne({
        timestamp: {
          $exists: true
        }
      }, {
        sort: {
          timestamp: -1
        }
      });
      if (token != null) {
        isTokenValid = Math.ceil((new Date().getTime() - token.timestamp) / 1000);
      }
      if (isTokenValid === 0 || isTokenValid > token.expires_in) {
        console.log('#### No TOKEN found');
        auth = paypalConf['clientId'] + ':' + paypalConf['clientSecret'];
        token = EJSON.parse(Meteor.http.post('https://api.sandbox.paypal.com/v1/oauth2/token', {
          headers: {
            'Accept': 'application/json',
            'Accept-Language': 'en_US'
          },
          auth: auth,
          params: {
            'grant_type': 'client_credentials'
          }
        }).content);
        token['timestamp'] = new Date().getTime();
        PaypalTokens.insert(token);
      }
      return token;
    },

    // ########### get paypal token and redirect to paypal.com for login ##########


    'createPaypalPayment': function(product, slug, donorId, initiativeId, eventId) {
      // console.log('donorId', donorId);
      // console.log('initiativeId', initiativeId);
      var payment, res, token;
      token = Meteor.call('getPaypalToken');

      payment = {
        intent: 'sale',
        payer: {
          payment_method: 'paypal'
        },
        redirect_urls: {
          return_url: 'https://surprese.me/events/'+slug+'/donate/execute',
          cancel_url: 'https://surprese.me/events/'+slug+'/donate'
        },
        transactions: [
          {
            item_list: {
              'items': [
                {
                  'name': product.name,
                  'price': product.price,
                  'currency': 'BRL',
                  'quantity': 1
                }
              ]
            },
            amount: {
              total: product.price,
              currency: 'BRL'
            },
            description: product.description
          }
        ]
      };
      res = Meteor.http.post('https://api.sandbox.paypal.com/v1/payments/payment', {
        headers: {
          Authorization: 'Bearer ' + token.access_token,
          'Content-Type': 'application/json'
        },
        data: payment
      });
      res.data['donorId'] = donorId;
      res.data['initiativeId'] = initiativeId;
      res.data['eventId'] = eventId;

      PaypalPayments.insert(res.data);
      return res.data;
    },

    // ########### Execute paypal payment when user is back on our domain and confirm payment ##########

    'executePaypalPayment': function(payerId) {
      var payment, ref, res, token, url;
      payment = PaypalPayments.findOne({
        userId: this.userId
      }, {
        sort: {
          'create_time': -1
        }
      });
      token = Meteor.call('getPaypalToken');
      url = 'https://api.sandbox.paypal.com/v1/payments/payment/' + payment.id + '/execute';
      res = Meteor.http.post(url, {
        headers: {
          Authorization: 'Bearer ' + token.access_token,
          'Content-Type': 'application/json'
        },
        data: {
          payer_id: payerId
        }
      });
      payment = res.data;
      if ((ref = payment.state) === 'approved' || ref === 'pending') {
        PaypalPayments.insert(payment);
      }
      if (payment.state === 'approved') {
        return true;
      } else {
        return false;
      }
    }

    // ########### End of paypal section ##########


});
