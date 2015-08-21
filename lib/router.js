/**
 * Created by bai on 2015/8/20.
 */
//管理平台路由

Router.configure({
    layoutTemplate: 'layout',
    loadingTemplate: 'loading',
    notFoundTemplate: 'notFound',
});

Router.route('/', {name: 'login'});
Router.route('/user');


Router.onBeforeAction(function () {
    if (!Meteor.userId()) {
        this.render('login');
    } else {
        this.next();
    }
});

