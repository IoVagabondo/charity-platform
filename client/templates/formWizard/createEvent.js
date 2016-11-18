

Template.createEvent.onCreated(function() {
    this.currentTab = new ReactiveVar("formStep1");

    // Set Session variables to default
    // Session.set('searchQuery', '');
    // Session.set('filer1', 'none');
    // Session.set('filer2', 'none');
    // Session.set('eventTitle', '');
    // Session.set('date', '');
    // Session.set('description', '');
    // Session.set('suggestedValue', '');
});

Template.createEvent.helpers({
    tab: function() {
        return Template.instance().currentTab.get();
    },

    activeBackButton: function() {
      return (Template.instance().currentTab.get() !== "formStep1");
    },

    activeNextButton: function(){
      var currentTab = Template.instance().currentTab.get();
      
      if (currentTab == "formStep1") {
        if (Session.get('eventTitle') == undefined || Session.get('eventTitle') == ""){
            return false;
        } else {
          return true;
        }
      } else if (currentTab == "formStep2") {
        if (Session.get('selectedInitiativeId') == undefined){
          return false;
        } else {
          return true;
        }
      } else if (currentTab == "formStep3") {
        if (Session.get('date') == undefined || Session.get('description') == undefined || Session.get('suggestedValue') == undefined ){
          return false;
        } else {
          return true;
        }
      } else if (currentTab == "formStep4") {
          return false
      }
    }

});

Template.createEvent.events({
    // 'click .nav-pills li': function(event, template) {
    //     var currentTab = $(event.target).closest("li");
    //     currentTab.addClass("active");
    //     $(".nav-pills li").not(currentTab).removeClass("active");
    //     template.currentTab.set(currentTab.data("template"));
    // },

    'click a.back': function(e, template) {
        var currentTabTemplate = template.currentTab.get();
        var currentTab = $('#' + currentTabTemplate);
        var newTab;

        if (currentTabTemplate === "formStep2") {
            newTab = $("#formStep1");
        } else if (currentTabTemplate === "formStep3"){
            newTab = $("#formStep2");
        } else {
            newTab = $("#formStep3");
        }

        if (currentTabTemplate !== "formStep1") {
            newTab.addClass("active");
            $(".nav-pills li").not(newTab).removeClass("active");
            template.currentTab.set(newTab.data("template"));
        }

    },

    'click a.next': function(e, template) {
        var currentTabTemplate = template.currentTab.get();
        var currentTab = $('#' + currentTabTemplate);
        var newTab;
        if (currentTabTemplate === "formStep1") {
            newTab = $("#formStep2");
        } else if (currentTabTemplate === "formStep2") {
            newTab = $("#formStep3");
        } else if (currentTabTemplate === "formStep3") {
            newTab = $("#formStep4");
        }

        if (currentTabTemplate !== "formStep4") {
            newTab.addClass("active");
            $(".nav-pills li").not(newTab).removeClass("active");
            template.currentTab.set(newTab.data("template"));
        }

    }

});
