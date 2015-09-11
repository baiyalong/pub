/**
 * Created by bai on 2015/9/6.
 */




Meteor.publish('mobileApp', function () {
    return MobileApp.find();
});

Meteor.methods({
    checkVersion: function (param) {
        return MobileApp.findOne({$and: [{'metadata.deviceType': param.deviceType}, {'metadata.version': param.version}]})
    }
})


MobileApp.allow({
    insert: function () {
        return true;
    },
    download: function () {
        return true;
    },
    remove: function () {
        return true;
    },
    update: function () {
        return true;
    }
})