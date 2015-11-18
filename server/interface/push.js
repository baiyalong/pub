/**
 * Created by bai on 2015/8/21.
 */
//��Ϣ���ͣ��ƶ��ͻ��ˡ�΢�š�΢����

//ios
Push.IOS.send = function (token, msg) {
    var myDevice = new apn.Device(token);
    var note = new apn.Notification();

    note.expiry = Math.floor(Date.now() / 1000) + 3600; // Expires 1 hour from now.
    note.badge = 3;
    note.sound = "ping.aiff";
    note.alert = msg;
    note.payload = {'messageFrom': '内蒙环保公众信息发布平台'};

    this.apnConnection().pushNotification(note, myDevice);
}



//android

Push.Android.send = function (key, msg) {
    HTTP.call('POST', this.path, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        content: "target=tokudu/" + key + "&message=" + msg
    }, function (err, res) {
        console.log(err, res)
    })

}