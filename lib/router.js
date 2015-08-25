/**
 * Created by bai on 2015/8/20.
 */
//����ƽ̨·��

Router.configure({
    layoutTemplate: 'layout',
    loadingTemplate: 'loading',
    notFoundTemplate: 'notFound',
});

Router.route('/', {name: 'login'});
Router.route('/user');


Router.route('/map');
Router.route('/detail');

/*
Router.onBeforeAction(function () {
    if (!Meteor.userId()) {
        this.render('login');
    } else {
        this.next();
    }
});
*/