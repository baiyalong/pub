/**
 * Created by bai on 2015/11/17.
 */

Push = {}

Push.Android = {
    path: "http://127.0.0.1:8989/MQTT/send_mqtt.php"
}


Push.IOS = {
    options: {},
    apnConnection: function () {
        var instance;
        return function () {
            if (!instance)
                instance = new apn.Connection(Push.IOS.options);
            return instance;
        }()
    },
    feedback: function (fn) {
        var options = {
            "batchFeedback": true,
            "interval": 300
        };

        var feedback = new apn.Feedback(options);
        feedback.on("feedback", function (devices) {
            devices.forEach(function (item) {
                // Do something with item.device and item.time;
                fn(item);
            });
        });
    }
}

