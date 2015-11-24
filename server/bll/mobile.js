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
        var num = function () {
            return Math.floor(Math.random() * 500);
        }
        return {
            areaId: area.code,
            areaName: area.name,
            weather: 0,// Math.floor(Math.random() * 100) % 26,
            windDirection: 0,
            windPower: 0,
            temperature: '30℃',
            aqi: num(),
            aqiLevel: 0,
            pollutantLevel: [
                {type: 100, name: 'SO₂', value: num() + 'μg/m³'},
                {type: 103, name: 'CO', value: num() + 'μg/m³'},
                {type: 101, name: 'NO₂', value: num() + 'μg/m³'},
                {type: 102, name: 'O₃', value: num() + 'μg/m³'},
                {type: 104, name: 'PM10', value: num() + 'μg/m³'},
                {type: 105, name: 'PM2.5', value: num() + 'μg/m³'},
            ],
            healthyAdviceList: [1, 1, 0, 0],
            aqPridictionList: [
                ['8月18日', '晴30-25℃', '优/良', 'PM2.5'],
                ['8月19日', '晴30-25℃', '优/良', 'PM10'],
            ],
            airQualityPridiction: '天气闷热天气闷热天气闷热天气闷热天气闷热天气闷热天气闷热天气闷热天气闷热天气闷热天气闷热天气闷热',
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
            aqiType: parseInt(param.aqiType),//AQI:90
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
                return arr.reverse();
            })(param.timeInterval)
        }
    },
    stationMonitor: function (id) {
        var num = function () {
            return Math.floor(Math.random() * 500)
        }
        return {
            areaId: parseInt(id),
            stationMonitor: (function (id) {
                return Station.find({countyCode: id}, {
                    sort: {UniqueCode: 1},
                    fields: {UniqueCode: 1, PositionName: 1}
                }).map(function (e) {
                    return {
                        name: e.PositionName,
                        topPollution: 'PM2.5',
                        aqi: num(),
                        pm25: num(),
                        pm10: num(),
                        o3: num(),
                        so2: num(),
                        no2: num(),
                        co: num(),
                    }
                })
            })(parseInt(id))
        }
    },
    getLatestVersion: function (deviceType) {
        var app = MobileApp.findOne({deviceType: deviceType}, {sort: {timestamp: -1}})
        return {
            deviceType: app.deviceType,
            latestVersion: app.version,
            downloadUrl: (function (app) {
                if (deviceType == 'IOS') {
                    return app.conf;
                } else {
                    return FileFS.findOne({_id: app.app}).url();
                }
                //var id = deviceType == 'IOS' ? app.conf : app.app;
                //return FileFS.findOne({_id: id}).url();
            })(app),
            description: app.description || ''
        }
    },
    map: function (level) {
        var res = [];
        var rand = function () {
            return Math.floor(Math.random() * 500)
        }
        switch (parseInt(level)) {
            case 0:
            {
                res = Area.find({$and: [{code: {$mod: [100, 0]}}, {code: {$not: {$mod: [10000, 0]}}}]}, {sort: {code: 1}}).map(function (e) {
                    return {
                        code: e.code,
                        name: e.name,
                        longitude: e.longitude,
                        latitude: e.latitude,
                        aqi: rand(),
                        PM25: rand(),
                        PM10: rand(),
                        O3: rand(),
                        SO2: rand(),
                        NO2: rand(),
                        CO: rand(),
                        timestamp: moment(new Date()).format('YYYY年MM月DD日')
                    }
                })
                break;
            }
            case 1:
            {
                res = Area.find({code: {$not: {$mod: [100, 0]}}}, {sort: {code: 1}}).map(function (e) {
                    return {
                        code: e.code,
                        name: e.name,
                        longitude: e.longitude,
                        latitude: e.latitude,
                        aqi: rand(),
                        PM25: rand(),
                        PM10: rand(),
                        O3: rand(),
                        SO2: rand(),
                        NO2: rand(),
                        CO: rand(),
                        timestamp: moment(new Date()).format('YYYY年MM月DD日')
                    }
                })
                break;
            }
            case 2:
            {
                res = Station.find().map(function (e) {
                        return {
                            code: e.UniqueCode,
                            name: e.PositionName,
                            longitude: e.Longitude,
                            latitude: e.Latitude,
                            aqi: rand(),
                            PM25: rand(),
                            PM10: rand(),
                            O3: rand(),
                            SO2: rand(),
                            NO2: rand(),
                            CO: rand(),
                            timestamp: moment(new Date()).format('YYYY年MM月DD日 HH时mm分ss秒')
                        }
                    }
                )
            }
            default:
            {
            }
        }
        return res;
    },
    pollutantLimit: function () {
        var arr = Pollutant.find({$and: [{pollutantCode: {$gte: 90}}, {pollutantCode: {$lte: 105}}]}, {sort: {pollutantCode: 1}}).fetch();
        var fun = function (code) {
            return arr.filter(function (e) {
                return e.pollutantCode == code
            })[0].limit;
        }
        return {
            AQI: 500,
            'PM2.5': fun(105),
            PM10: fun(104),
            O3: fun(102),
            SO2: fun(100),
            NO2: fun(101),
            CO: fun(103)
        }
    },
    rank: function () {
        var rand = function () {
            return Math.floor(Math.random() * 500)
        }
        return Area.find({code: {$not: {$mod: [100, 0]}}}).fetch().map(function (e) {
            return {
                cityCode: Math.floor(e.code / 100) * 100,
                cityName: Area.findOne({code: Math.floor(e.code / 100) * 100}).name,
                countyCode: e.code,
                countyName: e.name,
                aqi: rand(),
                PM25: rand(),
                PM10: rand(),
                O3: rand(),
                SO2: rand(),
                NO2: rand(),
                CO: rand(),
            }
        }).sort(function (a, b) {
            return a.aqi - b.aqi;
        })
    },
    terminalStatus: function (req) {
        //console.log(req)
        return Terminal.upsert({ID: req.ID}, {$set: req});
    }
}
