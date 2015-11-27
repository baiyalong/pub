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
        var list = [];
        StationHourlyRaw.find().forEach(function (e) {
            var correction = StationHourlyCorrection.findOne({$and: [{stationCode: parseInt(e.POINTCODE)}, {monitorTime: e.MONITORTIME}]});
            var index = list.findIndex(function (ee) {
                return ee.monitorTime.getTime() == e.MONITORTIME.getTime()
            })
            if (index == -1) {
                var line = {
                    stationCode: parseInt(e.POINTCODE),
                    monitorTime: e.MONITORTIME
                };
                line[e.CODEPOLLUTE] = correction ? correction.value : parseFloat(e.AVERVALUE)
                list.push(line)
            } else {
                list[index][e.CODEPOLLUTE] = correction ? correction.value : parseFloat(e.AVERVALUE)
            }
        })
        console.log(list,StationHourlyRaw.find().fetch())
        return list;
    },
    moment: function (t) {
        return moment(t).format('HH:mm:ss');
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

        Router.go('/dataCorrection/' + station + '/' + date.getTime())
        //$('.editableCorrection').editable('destroy')
        //Meteor.call('stationHourlyCorrection', {date: date, station: station}, function (err, res) {
        //    if (err)
        //        Util.modal('点位数据修正', err.message)
        //    else
        //        Session.set('dataCorrectionList', res)
        //    editableCorrection()
        //})

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
        //$('#date').datepicker('setDate', new Date())
        $('#date').datepicker('setDate', new Date(Number(this.data.date)));
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
        //
        //var station = this.data.station;
        //var date = this.data.date;

        //Meteor.call('stationHourlyCorrection', this.data, function (err, res) {
        //    if (err)
        //        Util.modal('点位数据修正', err.message)
        //    else
        //        Session.set('dataCorrectionList', res)
        //    editableCorrection();
        //})


        $('#city').val(Math.floor(Number(this.data.station) / 1000))
        $('#station').val(Number(this.data.station))

        editableCorrection()
    }
);

Template.dataCorrection.onCreated(function () {

    }
);

function editableCorrection() {
    $('.editableCorrection').editable({
        //success: function (response, newValue) {
        //    console.log(response, newValue)
        //},
        url: function (params) {
            var value = params.value;
            var stationCode = this.parentElement.parentElement.getAttribute('stationCode');
            var monitorTime = this.parentElement.parentElement.getAttribute('monitorTime');

            var d = new $.Deferred;
            //async saving data in js model\
            d.resolve()
            return d.promise();
        },
        emptytext: '',
        showbuttons: false,
        mode: 'inline',
        validate: function (value) {
            if ($.trim(value) == '') {
                return '输入不能为空！';
            }
            if (isNaN(Number(value)) || parseInt(value) < 0) {
                return '输入参数错误！'
            }
        }
    })
}