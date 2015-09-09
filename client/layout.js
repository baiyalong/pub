/**
 * Created by bai on 2015/8/20.
 */

Template.layout.helpers({});

Template.layout.events({

    'click .logout': function (e) {
        Meteor.logout(function (err) {
            if (err)Util.modal('ÓÃ»§×¢Ïú', err)
            else
                Router.go('/')
        })
    }
});

Template.layout.onRendered(function () {

    }
);

Template.layout.onCreated(function () {

    }
);