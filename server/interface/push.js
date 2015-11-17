/**
 * Created by bai on 2015/8/21.
 */
//��Ϣ���ͣ��ƶ��ͻ��ˡ�΢�š�΢����

//ios


//android

Push.Android.send = function (key, msg) {
    HTTP.call(Push.Android.method, Push.Android.path, {
        headers: Push.Android.headers,
        content: "target=tokudu/" + key + "&message=" + msg
    }, function (err, res) {
        console.log(err, res)
    })

}