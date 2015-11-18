/**
 * Created by bai on 2015/11/17.
 */


Meteor.methods({
    push: function () {
        var warning = Warning.findOne({}, {sort: {timestamp: -1}});
        if (!warning)
            return;
        var ts = Terminal.find({$and: [{subscription: {$elemMatch: {$eq: warning.cityCode}}}, {$not: {uninstall: true}}]}).fetch();
        ts.forEach(function (e) {
            if (e.OS == 'IOS') {
                Push.IOS.send(e.ID, warning.content);
            } else if (e.OS == 'Android') {
                if (e.online)
                    Push.Android.send(e.ID, warning.content);
            }
        })
    }
});

//Push.IOS.feedback(function(item){
//    console.log(item)
//})