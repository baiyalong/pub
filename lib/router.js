/**
 * Created by bai on 2015/8/20.
 */
//����ƽ̨·��

Router.configure({
    layoutTemplate: 'layout',
    loadingTemplate: 'loading',
    notFoundTemplate: 'notFound',
    waitOn: function () {
    }
});

Router.route('/');
Router.route('/user');
Router.route('/login', function () {
    this.layout('emptyLayout')
});


Router.route('/monitorStation', {
    waitOn: function () {
        return [this.subscribe('county'), this.subscribe('station')]
    }
});
Router.route('/dataCorrection', {
    waitOn: function () {
        return [this.subscribe('city'), this.subscribe('station')]
    }
});
Router.route('/dataSync');
Router.route('/pollutantLimit', {
    waitOn: function () {
        return this.subscribe('limit')
    }
});
Router.route('/emergencyWarning', {
    waitOn: function () {
        return [this.subscribe('city'), this.subscribe('warning')]
    }
});
Router.route('/mobileClient', {
    waitOn: function () {
        return [this.subscribe('mobileApp')]
    }
})


Router.onBeforeAction(function () {
    if (!Meteor.userId()) {
        this.layout("emptyLayout");
        this.render('login');
    } else {
        this.layout("layout");
        this.next();
    }
});
