/**
 * Created by bai on 2015/9/11.
 */

BLL.www = {
    cityAreaQuality: function () {
        var rand = function () {
            return Math.floor(Math.random() * 500);
        }
        return {
            currentCity: {
                code: 150100,
                name: '呼和浩特市',
                aqi: rand(),
                level: '优'
            },
            cityList: (function () {
                return Area.find({$and: [{code: {$mod: [100, 0]}}, {code: {$not: {$mod: [10000, 0]}}}]}, {
                    sort: {code: 1},
                    fields: {_id: 0}
                }).map(function (e) {
                    return {
                        code: e.code,
                        name: e.name,
                        AQI: rand(),
                        'PM2.5': rand(),
                        PM10: rand(),
                        O3: rand(),
                        level: '优',
                        primaryPollutant: 'PM2.5'
                    }
                });
            })()
        }
    },
    cityMonitorStation: function () {
        return Station.find({}, {
            sort: {UniqueCode: 1},
            fields: {UniqueCode: 1, PositionName: 1, Longitude: 1, Latitude: 1}
        }).map(function (e) {
            return {
                code: e.UniqueCode,
                name: e.PositionName,
                longitude: e.Longitude,
                latitude: e.Latitude,
                AQI: Math.floor(Math.random() * 500)
            }
        })
    },
    cityDetail: function (id) {
        id = parseInt(id)
        var city = Area.findOne({code: id})
        var pollutant = ['AQI', 'PM2.5', 'PM10', 'O3', 'CO', 'SO2', 'NO2'];
        return {
            cityCode: city.code,
            cityName: city.name,
            airQualityRealTime: {
                time: '2015年11月18日  14时',
                aqi: Math.floor(Math.random() * 500),
                level: '优',
                list: [1, 0, 1, 0, 0]
            },
            airQualityForecast: [
                {
                    time: '11日下午',
                    airQuality: '优到良',
                    primaryPollutant: 'PM2.5'
                }, {
                    time: '12日早晨',
                    airQuality: '优到良',
                    primaryPollutant: 'PM2.5'
                }
            ],
            pollutantLimit: (function (arr) {
                var res = {};
                arr.forEach(function (e) {
                    res[e] = 500;
                })
                return res;
            })(pollutant)
            ,
            pollutant24hour: (function (arr) {
                var res = {};
                arr.forEach(function (e) {
                    res[e] = function () {
                        var p = [];
                        var time = new Date()
                        time.setHours(time.getHours() - 24)
                        time.setMinutes(0)
                        time.setSeconds(0)
                        while (time < new Date()) {
                            p.push({
                                time: moment(time).format('YYYY-MM-DD HH:mm'),
                                value: Math.floor(Math.random() * 500)
                            })
                            time.setHours(time.getHours() + 1)
                        }
                        return p;
                    }
                })
                return res;
            })(pollutant),
            pollutant30day: (function (arr) {
                var res = {};
                arr.forEach(function (e) {
                    res[e] = function () {
                        var aqi = [];
                        var date = new Date();
                        date.setDate(date.getDate() - 30)
                        while (date < new Date()) {
                            aqi.push({
                                date: moment(date).format('YYYY-MM-DD'),
                                value: Math.floor(Math.random() * 500)
                            })
                            date.setDate(date.getDate() + 1)
                        }
                        if (aqi.length == 31) {
                            aqi.pop();
                        }
                        return aqi;
                    }
                })
                return res;
            })(pollutant),
            monitorStationList: (function (arr) {
                return Station.find({$and: [{UniqueCode: {$gt: id * 1000}}, {UniqueCode: {$lt: (id + 1) * 1000}}]}, {
                    sort: {UniqueCode: 1},
                    fields: {UniqueCode: 1, PositionName: 1}
                }).map(function (e) {
                    var res = {};
                    arr.forEach(function (e) {
                        res[e] = Math.floor(Math.random() * 500);
                    })
                    res.code = e.UniqueCode;
                    res.name = e.PositionName;
                    return res;
                })
            })(pollutant)
        }
    }
}