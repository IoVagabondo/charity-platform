var handle = null;


Template.formStep1.onRendered(function(){
	this.find('.searchQuery').value = Session.get('searchQuery');
});


Template.formStep1.events({
  'input input.searchQuery': function (evt) {
    var self = this;
    if (handle)
        clearTimeout(handle);
    handle = setTimeout(function () {
        var query = $(evt.target).val();
        Session.set('searchQuery', query);
    }, 700);
},
});


