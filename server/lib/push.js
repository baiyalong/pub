/**
 * Created by bai on 2015/11/17.
 */

//Push = {}

Push2Android = {
    path: "http://127.0.0.1:8989/MQTT/send_mqtt.php"
}


Push2IOS = {
    path: 'http://127.0.0.1:8089/',
    //apnConnection: function () {
    //    var instance;
    //    return function () {
    //        if (!instance)
    //            instance = new apn.Connection(Push.IOS.options);
    //        return instance;
    //    }()
    //},
    //feedback: function (fn) {
    //    var options = {
    //        "batchFeedback": true,
    //        "interval": 300
    //    };
    //
    //    var feedback = new apn.Feedback(options);
    //    feedback.on("feedback", function (devices) {
    //        devices.forEach(function (item) {
    //            // Do something with item.device and item.time;
    //            fn(item);
    //        });
    //    });
    //}
}

//
//var apn = Meteor.npmRequire("apn"),
////path = Npm.require('path'),
//    apnOptions = Meteor.settings.apnOptions || {},
//    alertSound = apnOptions.sound || "alert.aiff",
//    apnConnection;
//
//// default apn connection options
//var path = '/opt/pub/private/';
//apnOptions.cert = path + "cert.pem";
//apnOptions.key = path + "key.pem";
//
//
//console.log(apnOptions)
////console.log(Meteor.rootPath)
//apnConnection = new apn.Connection(apnOptions);
//
//
//sendAppleNotifications = function (token, msg) {
//    var note = new apn.Notification()
//
//    // expires 1 hour from now
//    note.expiry = Math.floor(Date.now() / 1000) + 3600  // Expires 1 hour from now.
//    note.badge = 3;
//    note.sound = alertSound;
//    note.alert = "\uD83D\uDCE7 \u2709 You have a new message";
//    note.payload = {'messageFrom': 'Caroline'};
//
//    var device = new apn.Device(token)
//    apnConnection.pushNotification(note, device)
//
//}  // end sendAppleNotifications
//
//
//var options = {
//    "batchFeedback": true,
//    "interval": 300
//};
//
//var feedback = new apn.Feedback(options);
//feedback.on("feedback", function (devices) {
//    devices.forEach(function (item) {
//        // Do something with item.device and item.time;
//        console.log(item)
//    });
//});