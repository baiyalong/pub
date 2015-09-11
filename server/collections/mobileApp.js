/**
 * Created by bai on 2015/9/6.
 */



//MobileApp.attachSchema(new SimpleSchema({
//    code: {
//        type: Number
//    },
//    name: {
//        type: String
//    },
//
//}));


Meteor.publish('mobileApp', function () {
    return MobileApp.find();
});

