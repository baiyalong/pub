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

    },
    cityHistory: function (id, type) {

    }
}