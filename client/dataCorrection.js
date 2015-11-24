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
            e.moment = moment(e.timestamp).format('YYYY-MM-DD HH:mm');
            var station = Station.findOne({UniqueCode: e.stationCode});
            e.cityName = station.Area;
            e.countyName = station.countyName ? station.countyName : station.Area;
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
        var date = $('#date').datepicker('getDate');
        var city = parseInt($('#city').val());
        var station = parseInt($('#station').val());
        if (isNaN(city) || isNaN(station)) {
            Util.modal('点位数据修正', '输入参数错误！')
            return
        }
        Session.set('condition', {
            type: 'hour',
            date: date,
            stationCode: station
        })
    },
    'click button.save': function () {
        var arr = [];
        $('input[type=number]').each(function () {
            var value = parseInt($(this).val());
            if (!isNaN(value) && value != $(this).attr('history')) {
                var id = $(this).parent().parent().attr('id');
                var code = parseInt($(this).attr('code'));
                arr.push({id: id, code: code, value: value})
            }
        })
        if (arr.length == 0)return;
        Meteor.call('dataCorrection', arr, function (err) {
            if (err)Util.modal('点位数据修正', err)
            else {
                Util.modal('点位数据修正', '更新成功！')
                $('input[type=number]').each(function () {
                    $(this).val($(this).attr('history'))
                })
            }
        })

    },
    'click button.cancel': function () {
        $('input[type=number]').each(function () {
            $(this).val($(this).attr('history'))
        })
    },
    'mouseenter tbody>tr': function () {
        $('#' + this._id).css({
            'border': '2px solid #186E37',
            'border-width': '0 0 0 2px'
        })
    },
    'mouseleave tbody>tr': function () {
        $('#' + this._id).css({
            'border': '1px dashed #D8D8D8',
        })
    }
});

Template.dataCorrection.onRendered(function () {
        $('#date').datepicker({
            language: "zh-CN",
            //autoclose: true
        });
        $('#date').datepicker('setDate', new Date())
        $('#date').datepicker('setStartDate', (function () {
            var d = new Date();
            d.setDate(d.getDate() - 60);
            return d;
        })())
        $('#date').datepicker('setEndDate', new Date())


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
            type: 'hour',
            date: new Date(),
            stationCode: Station.findOne({}, {fields: {UniqueCode: 1}, sort: {UniqueCode: 1}}).UniqueCode
        })
        this.autorun(function () {
            Meteor.subscribe('monitorData', Session.get('condition'))
        })
    }
);