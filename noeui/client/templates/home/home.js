/**
 * Created by cfell on 3/22/2017.
 */
Template.HomeOld.helpers({
});

Template.Home.events({
    'click button': function(event) {
        console.log('button clicked');
        Router.go('Soap');
    }
});
