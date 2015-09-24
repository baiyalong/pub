/**
 * Created by bai on 2015/8/20.
 */

Template.layout.helpers({
    username: function () {
        var user = Meteor.user();
        if (user)
            return user.username;
    }
});

Template.layout.events({

    'click .logout': function (e) {
        Meteor.logout(function (err) {
            if (err)Util.modal('用户注销', err)
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