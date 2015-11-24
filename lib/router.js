/**
 * Created by bai on 2015/8/20.
 */
//����ƽ̨·��

Router.configure({
    layoutTemplate: 'emptyLayout',
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
Router.route('/ipNotTrust', function () {
    this.layout('emptyLayout')
});
Router.route('/app', {
    //waitOn: function () {
    //    return [this.subscribe('mobileApp'), this.subscribe('file')]
    //}
}, function () {
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
Router.route('/dataSync', {
    waitOn: function () {
        return [this.subscribe('airQuality')]
    }
});
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
        return [this.subscribe('mobileApp'), this.subscribe('file')]
    }
})
Router.route('/terminalStatus', {
    waitOn: function () {
        return [this.subscribe('terminal'), this.subscribe('city')]
    }
})
Router.route('/ipTrustList', {
    waitOn: function () {
        return [this.subscribe('ipTrustList')]
    }
})
Router.route('/airQualityReview', {
    waitOn: function () {
        return [this.subscribe('airQuality')]
    }
});
Router.route('/airQualityPublish', {
    waitOn: function () {
        return [this.subscribe('county'), this.subscribe('airQuality')]
    }
});

Router.onBeforeAction(function () {
    if (this.url == '/app') {
        this.layout("emptyLayout");
        this.render('app');
    }
    //var self = this;
    //Meteor.call('checkIP', function (err, trust) {
    //    if (err) console.log(err)
    //    else if (!trust) {
    //        self.layout("emptyLayout");
    //        self.render('ipNotTrust');
    //    }
    //})
    else if (!Meteor.userId()) {
        this.layout("emptyLayout");
        this.render('login');
    } else {
        this.layout("layout");
        this.next();
    }
});
