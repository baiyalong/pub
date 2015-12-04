/**
 * Created by bai on 2015/11/26.
 */

weather = {
    appid: 'efb1b150432032da',
    private_key: '5fa7e3_SmartWeatherAPI_96bd783',
    key: function (public_key) {
        return encodeURIComponent(CryptoJS.HmacSHA1(public_key, weather.private_key).toString(CryptoJS.enc.Base64));
    },
    type: ['index_f', 'index_v', 'forecast_f', 'forecast_v'],
    getData: function (areaid, type, date) {
        var baseUrl = 'http://open.weather.com.cn/data/?areaid=' + areaid.join('|') + '&type=' + type + '&date=' + moment(date).format('YYYYMMDDHHmm') + '&appid=';
        var key = weather.key(baseUrl + weather.appid);
        var url = baseUrl + weather.appid.substring(0, 6) + '&key=' + key;
        HTTP.call('GET', url, function (err, res) {
            if (res.content != 'data error')
                Weather.insert({
                    areaid: areaid,
                    type: type,
                    date: date,
                    content: JSON.parse(res.content)
                })
        })
    }
}

//
//weather.getData([101010100], weather.type[0], new Date());
weather.getData([101010100|101020100|101030100], weather.type[1], new Date());
//weather.getData([101010100], weather.type[2], new Date());
//weather.getData([101010100], weather.type[3], new Date());
