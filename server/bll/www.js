/**
 * Created by bai on 2015/9/11.
 */

BLL.www = {
    area: function () {
        return Area.find({}, {sort: {code: 1}, fields: {_id: 0}}).fetch()
    },
    airQualityForcast: function () {
        var collection = Area.find({$and: [{code: {$mod: [100, 0]}}, {code: {$not: {$mod: [10000, 0]}}}]}, {
            sort: {code: 1},
            fields: {_id: 0}
        }).map(function (e) {
            return {
                code: e.code,
                name: e.name,
                primaryPollutant: 'PM2.5',
                airQualityLevel: '一级',
                airQualityClass: '优',
                airQualityValue: Math.round(Math.random() * 500),
                visibility: '一般'
            }
        });

        function laterDate(d) {
            var date = new Date();
            date.setDate(date.getDate() + d);
            return moment(date).format('MM月DD日');
        }

        return [{
            date: laterDate(1),
            value: collection
        }, {
            date: laterDate(2),
            value: collection
        }, {
            date: laterDate(3),
            value: collection
        }]
    },
    cityAreaQuality: function (id) {
        id = parseInt(id);
        var rand = function () {
            return Math.floor(Math.random() * 500);
        }
        var current = CityDailyRaw.findOne({CITYCODE:id},{sort:{MONITORTIME:-1}})
        return {
            currentCity: {
                code: id,
                name: current.AREA,
                aqi: current.AQI,
                level: current.TYPENAME
            },
            cityList: (function () {
                return Area.find({$and: [{code: {$mod: [100, 0]}}, {code: {$not: {$mod: [10000, 0]}}}]}, {
                    sort: {code: 1},
                    fields: {_id: 0}
                }).map(function (e) {
                    var current = CityDailyRaw.findOne({CITYCODE:e.code},{sort:{MONITORTIME:-1}})
                    return {
                        code: e.code,
                        name: e.name,
                        AQI: current.AQI,
                        'PM2.5': current.PM25,
                        PM10: current.PM10,
                        O3: current.O31H,
                        level: current.TYPENAME,
                        primaryPollutant: current.PRIMARYPOLLUTANT
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
            var data = StationDailyRaw.findOne({UNIQUECODE:e.UniqueCode},{sort:{MONITORTIME:-1}});
            return {
                code: e.UniqueCode,
                name: e.PositionName,
                longitude: e.Longitude,
                latitude: e.Latitude,
                AQI: data.AQI
            }
        })
    },
    cityDetail: function (id) {
        id = parseInt(id)
        var city = Area.findOne({code: id})
        var pollutant = ['AQI', 'PM2.5', 'PM10', 'O3', 'CO', 'SO2', 'NO2'];
        var data = CityDailyRaw.findOne({CITYCODE:id},{sort:{MONITORTIME:-1}})
        return {
            cityCode: city.code,
            cityName: city.name,
            airQualityRealTime: {
                time:(function(){return moment(new Date()).format('YYYY年MM月DD日 HH时')})(),
                aqi: data.AQI,
                level: data.TYPENAME,
                list: [1, 0, 1, 0, 0]
            },
            airQualityForecast: [
                {
                    time: '今天晚上',
                    airQuality: '优到良',
                    primaryPollutant: 'PM2.5'
                }, {
                    time: '明天白天',
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
                    res[e] = (function () {
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
                    })()
                })
                return res;
            })(pollutant),
            pollutant30day: (function (arr) {
                var res = {};
                arr.forEach(function (e) {
                    res[e] = (function () {
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
                    })()
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