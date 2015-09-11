/**
 * Created by bai on 2015/9/6.
 */
BLL.mobile = {
    cityBasic: function (id) {
        var code = parseInt(id)
        if (code < 10000) {
            code *= 100
        }
        var city = Area.findOne({code: {$eq: code}})
        var zone = Area.find({
            code: {
                $gt: Math.floor(code / 100) * 100,
                $lt: ( Math.floor(code / 100) + 1) * 100
            }
        }, {fields: {code: 1, _id: 0}}).map(function (e) {
            return e.code
        })
        return {
            cityId: city.code,
            cityName: city.name,
            weather: 0,// Math.floor(Math.random() * 100) % 26,
            temperature: '30℃',
            zoneIdArray: zone
        }
    },
    areaDetail: function (id) {
        var code = parseInt(id)
        var area = Area.findOne({code: {$eq: code}})
        return {
            areaId: area.code,
            areaName: area.name,
            weather: 0,// Math.floor(Math.random() * 100) % 26,
            windDirection: 0,
            windPower: 0,
            temperature: '30℃',
            aqi: 32,
            aqiLevel: 0,
            pollutantLevel: [
                {type: 100, name: 'SO₂', value: '21μg/m³'},
                {type: 103, name: 'CO', value: '21μg/m³'},
                {type: 101, name: 'NO₂', value: '21μg/m³'},
                {type: 102, name: 'O₃', value: '21μg/m³'},
                {type: 104, name: 'PM10', value: '21μg/m³'},
                {type: 105, name: 'PM2.5', value: '21μg/m³'},
            ],
            healthyAdviceList: [1, 1, 0, 1, 0],
            aqPridictionList: [
                ['8月18日', '晴30-25℃', '优/良', 'PM10'],
                ['8月19日', '晴30-25℃', '优/良', 'PM10'],
            ],
            weatherPridiction: [
                {date: '今天', status: 0, temperature: '20-30℃'},
                {date: '明天', status: 0, temperature: '20-30℃'},
                {date: '周四', status: 0, temperature: '20-30℃'},
                {date: '周五', status: 0, temperature: '20-30℃'},
                {date: '周六', status: 0, temperature: '20-30℃'},
            ]
        }
    },
    cityHistory: function (param) {
        return {
            areaId: parseInt(param.areaId),
            aqiType: parseInt(param.aqiType),
            timeInterval: parseInt(param.timeInterval),
            aqiHistory: (function (timeInterval) {
                var arr = [];
                if (parseInt(timeInterval) == 0)  //hour
                {
                    var now = new Date();
                    for (var i = 0; i < 3; i++) {
                        var date = moment(now).format('YYYY-MM-DD')
                        var aqi = [];
                        for (var j = 0; j < 24; j++) {
                            aqi.push(j + '@' + Math.floor(Math.random() * 1000))
                        }
                        arr.push({date: date, aqi: aqi})
                        now.setDate(now.getDate() - 1)
                    }
                }
                else if (parseInt(timeInterval) == 1)  //day
                {
                    var now = new Date();
                    for (var i = 0; i < 3; i++) {
                        var date = moment(now).format('YYYY-MM')
                        var aqi = [];
                        var days = new Date(now.getFullYear(), (now.getMonth() + 1), 0).getDate()
                        for (var j = 1; j <= days; j++) {
                            aqi.push(j + '@' + Math.floor(Math.random() * 1000))
                        }
                        arr.push({date: date, aqi: aqi})
                        now.setMonth(now.getMonth() - 1)
                    }
                }
                return arr;
            })(param.timeInterval)
        }
    },
    getLatestVersion: function (deviceType) {
        var app = MobileApp.findOne({'metadata.deviceType': deviceType}, {sort: {'metadata.timestamp': -1}})
        return {
            deviceType: app.metadata.deviceType,
            latestVersion: app.metadata.version,
            downloadUrl: app.url()
        }
    }
}