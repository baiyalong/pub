/**
 * Created by bai on 2015/9/7.
 */

Template.dataCorrection.helpers({
    cityList: function () {
        return Area.find()
    },
    stationList: function () {
        return Station.find()
    },
    dataList: function () {
        var m = MonitorData.find().fetch();
        m.forEach(function (e) {
            e.moment = moment(e.timestamp).format('YYYY-MM-DD HH:mm:ss');
            var station = Station.findOne({UniqueCode: e.stationCode});
            e.cityName = station.Area;
            e.stationName = station.PositionName;
        })
        return m;
    }
});

Template.dataCorrection.events({
    'change #city': function () {
        var city = parseInt($('#city').val())
        var select = false;
        $('#station option').each(function () {
            var position = parseInt($(this).attr('value'))
            if (position > city * 1000 && position < (city + 1) * 1000) {
                $(this).show()
                if (!select) {
                    select = true;
                    $('#station').val(position)
                }
            } else {
                $(this).hide()
            }
        })
    },
    'change #station': function () {
    },
    'click button.search': function (e) {
        e.preventDefault()
        var tt = $('#tt').val();
        var city = parseInt($('#city').val());
        var station = parseInt($('#station').val());
        if (tt == '' || isNaN(city) || isNaN(station)) {
            Util.modal('点位数据修正', '输入参数错误！')
            return
        }
        Session.set('condition', {
            date: new Date(tt),
            stationCode: station
        })
    },
    'click button.save': function () {
        $('input[type=number]').each(function () {
            var value = parseInt($(this).val());
            if (!isNaN(value) && value != $(this).attr('history')) {
                var id = $(this).parent().attr('id');
                var code = $(this).attr('code');
                MonitorData.update({_id:id,'pollutant.code':code}, {}, function (err) {
                    if (err)Util.modal('点位数据修正', err)
                    else Util.modal('点位数据修正', '更新成功！')
                })
            }
        })
    },
    'click button.cancel': function () {
        $('input[type=number]').each(function () {
            $(this).val($(this).attr('history'))
        })
    }
});

Template.dataCorrection.onRendered(function () {
        var city = parseInt($('#city').val())
        var station = parseInt($('#station').val())
        if (!isNaN(city) && !isNaN(station)) {
            var select = false;
            $('#station option').each(function () {
                var position = parseInt($(this).attr('value'))
                if (position > city * 1000 && position < (city + 1) * 1000) {
                    $(this).show()
                    if (!select) {
                        select = true;
                        $('#station').val(position)
                    }
                } else {
                    $(this).hide()
                }
            })
        }
    }
);

Template.dataCorrection.onCreated(function () {
        Session.set('condition', {
            date: new Date(),
            stationCode: Station.findOne({}, {fields: {UniqueCode: 1}, sort: {UniqueCode: 1}}).UniqueCode
        })
        this.autorun(function () {
            Meteor.subscribe('monitorData', Session.get('condition'))
        })
    }
);