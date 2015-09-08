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

Router.route('/', {name: 'login'});
Router.route('/user');


Router.route('/monitorStation', {
    waitOn: function () {
        return [this.subscribe('city'), this.subscribe('station')]
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

/*
 Router.onBeforeAction(function () {
 if (!Meteor.userId()) {
 this.render('login');
 } else {
 this.next();
 }
 });
 */