/**
 * Created by bai on 2015/11/17.
 */

Push = {}

Push.Android = {
    path: "http://127.0.0.1:8989/MQTT/send_mqtt.php"
}


Push.IOS = {
    options: {

    },
    apnConnection: function () {
        var instance;
        return function () {
            if (!instance)
                instance = new apn.Connection(Push.IOS.options);
            return instance;
        }()
    }
}

