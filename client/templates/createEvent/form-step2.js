 var handle = null;

 Template.formStep2.onCreated(() => {
     let template = Template.instance();

     template.searchQuery = new ReactiveVar();
     template.searching = new ReactiveVar(false);

     template.autorun(() => {
         template.subscribe('searchableInitiatives', template.searchQuery.get(), () => {
             setTimeout(() => {
                 template.searching.set(false);
             }, 300);
         });
     });
 });

 Template.formStep2.onRendered(function() {
     this.find('.searchQuery').value = Session.get('searchQuery');
     query = Session.get('searchQuery');
     if(query !== ''){
        Template.instance().searchQuery.set(query);
        Template.instance().searching.set(true);
     }
 });


 Template.formStep2.helpers({

     // Listing posts
     initiativesList: function() {
         return Initiatives.find({}, { sort: { timeCreated: -1 } });
     },

     searching() {
         return Template.instance().searching.get();
     },

     query() {
         return Template.instance().searchQuery.get();
     },

     initiatives() {
         let initiatives = Initiatives.find();
         if (initiatives) {
             return initiatives;
         }
     }

 });

 Template.formStep2.events({
     'click button.lazyload': function(e, template) {
         var currentLimit = Session.get('lazyloadLimit_initiatives');
         Session.set('lazyloadLimit_initiatives', currentLimit + 2);
     },

     'input input.searchQuery': function(event, template) {

         let value = event.target.value.trim();
         var self = this;

        
             if (handle)
                 clearTimeout(handle);
             handle = setTimeout(function() {
                 var query = $(event.target).val();
                 Session.set('searchQuery', query);
                 template.searchQuery.set(value);
                 template.searching.set(true);
             }, 700);

     },

     'keyup [name="search"]' (event, template) {
         let value = event.target.value.trim();

         if (value !== '' && event.keyCode === 13) {
             template.searchQuery.set(value);
             template.searching.set(true);
         }

         if (value === '') {
             template.searchQuery.set(value);
         }
     }
 });
