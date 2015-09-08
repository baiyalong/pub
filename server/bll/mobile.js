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
            weather: '晴',
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
            weather: '晴',
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
    cityHistory: function (id, type) {
        var code = parseInt(id)
        if (code < 10000) {
            code *= 100
        }

        var city = Area.findOne({code: {$eq: code}})

        return {
            areaId: city.code,
            aqiType: 100,
            timeInterval: 0,
            aqiHistory: [
                {
                    date: '2015-07-30',
                    aqi: ['10@2', '31@37']
                },
                {
                    date: '2015-07-30',
                    aqi: ['10@2', '31@37']
                },
                {
                    date: '2015-07-30',
                    aqi: ['10@2', '31@37']
                }
            ]
        }
    }
}