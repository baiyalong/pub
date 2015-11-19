/**
 * Created by bai on 2015/8/21.
 */
//��Ϣ���ͣ��ƶ��ͻ��ˡ�΢�š�΢����

//ios
Push2IOS.send = function (token, msg) {

    HTTP.call('POST', this.path, {
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        data: {
            token: token,
            msg: msg
        }
    }, function (err, res) {
        console.log('Push2IOS', err, res)
    })
    //Push.send({
    //    from: '内蒙环保公众信息发布平台',
    //    title: '内蒙环保公众信息发布平台',
    //    text: msg,
    //    badge: 1, //optional, use it to set badge count of the receiver when the app is in background.
    //    //query: {
    //    //    // Ex. send to a specific user if using accounts:
    //    //    userId: 'xxxxxxxxx'
    //    //} // Query the appCollection
    //    token: {apn: token},
    //    // tokens: array of appId's or tokens
    //    payload: {msg: msg}
    //    // delayUntil: Date
    //});

}


//// Internal events
//Push.addListener('token', function(token) {
//    console.log(token)
//    // Token is { apn: 'xxxx' } or { gcm: 'xxxx' }
//});
//
//Push.addListener('error', function(err) {
//    console.log(err)
//    if (error.type == 'apn.cordova') {
//        console.log(err.error);
//    }
//});

//android

Push2Android.send = function (key, msg) {
    HTTP.call('POST', Push2Android.path, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        content: "target=tokudu/" + key + "&message=" + msg
    }, function (err, res) {
        if (err)
            console.log('Push2Android', err, res)
    })

}