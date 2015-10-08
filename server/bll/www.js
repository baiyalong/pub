/**
 * Created by bai on 2015/9/11.
 */

BLL.www = {
    cityAreaQuality: function () {
        return {
            currentCity: {
                code: 150100,
                name: '呼和浩特市',
                aqi: 23,
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
                        AQI: 23,
                        'PM2.5': 23,
                        PM10: 23,
                        O3: 23,
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
                AQI: 23,
            }
        })
    },
    cityDetail: function (id) {
        id = parseInt(id)
        var city = Area.findOne({code: id})
        var pollutant = function () {
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
        return {
            cityCode: city.code,
            cityName: city.name,
            airQualityRealTime: {
                time: '2015年11月18日  14时',
                aqi: 32,
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
            pollutantLimit: {
                AQI: 500,
                'PM2.5': 500,
                PM10: 500,
                O3: 500,
                NO2: 500,
            },
            pollutantConcentration: {
                AQI: pollutant(),
                'PM2.5': pollutant(),
                PM10: pollutant(),
                O3: pollutant(),
                NO2: pollutant(),
            },
            monitorStationList: (function () {
                return Station.find({$and: [{UniqueCode: {$gt: id * 1000}}, {UniqueCode: {$lt: (id + 1) * 1000}}]}, {
                    sort: {UniqueCode: 1},
                    fields: {UniqueCode: 1, PositionName: 1}
                }).map(function (e) {
                    return {
                        code: e.UniqueCode,
                        name: e.PositionName,
                        AQI: 23, 'PM2.5': 23, PM10: 23, O3: 23, NO2: 23
                    }
                })
            })(),
            AQI: (function () {
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
                return aqi;
            })()
        }
    }
}