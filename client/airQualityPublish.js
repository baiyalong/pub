/**
 * Created by bai on 2015/9/7.
 */

Template.airQualityPublish.helpers({
    cityList: function () {
        return Area.find({$and: [{code: {$mod: [100, 0]}}, {code: {$not: {$mod: [10000, 0]}}}]}, {sort: {code: 1}});
    },
    countyList: function () {
        return Area.find();
    },
    airQualityList: function () {
        var w = AirQuality.find({userId: Meteor.userId()}, {sort: {timestamp: -1}}).fetch()
        w.forEach(function (e) {
            e.moment = moment(e.date).format('YYYY-MM-DD')
            e.statusColor = e.statusCode == 1 ? 'green' : e.statusCode == -1 ? 'red' : '';
        })
        return w;
    },
    operation: function (statusCode) {
        return statusCode;
    },
});

Template.airQualityPublish.events({
    'change #city': function () {
        var city = parseInt($('#city').val())
        var select = false;
        $('#county option').each(function () {
            var county = parseInt($(this).attr('value'))
            if (county > city && county < (city + 100)) {
                $(this).show()
                if (!select) {
                    select = true;
                    $('#county').val(county)
                }
            } else {
                $(this).hide()
            }
        })
    },
    'click .save': function () {
        var content = $('textarea').val();
        if (content.replace(/(^\s*)|(\s*$)/g, "").length == 0) {
            Util.modal('空气质量预报发布', '发布内容为空！')
            return;
        }
        var airQuality = {
            date: (function (d) {
                if (d == '')return new Date(); else return new Date(d)
            })($('#date').val()),
            cityCode: parseInt($('#city').val()),
            cityName: $('#city').find("option:selected").text(),
            countyCode: parseInt($('#county').val()),
            countyName: $('#county').find("option:selected").text(),
            content: content,
            statusCode: 0,
            statusName: '未审核',
            userId: Meteor.userId(),
            userName: Meteor.user().username
        }
        var _id = Session.get('_id');
        if (_id == '') { //new
            AirQuality.insert(airQuality, function (err, id) {
                if (err)
                    Util.modal('空气质量预报发布', err)
                else {
                    Util.modal('空气质量预报发布', '提交成功！')
                    $('textarea').val('')
                    Session.set('_id', '')
                    $('#date').val(moment(new Date()).format('YYYY-MM-DD'));
                    var city = parseInt($('#city').val())
                    var county = parseInt($('#county').val())
                    if (!isNaN(city) && !isNaN(county)) {
                        var select = false;
                        $('#county option').each(function () {
                            var county = parseInt($(this).attr('value'))
                            if (county > city && county < (city + 100)) {
                                $(this).show()
                                if (!select) {
                                    select = true;
                                    $('#county').val(county)
                                }
                            } else {
                                $(this).hide()
                            }
                        })
                    }
                }
            });
        } else { //edit
            AirQuality.update({_id: _id}, {$set: airQuality}, function (err) {
                if (err)
                    Util.modal('空气质量预报发布', err)
                else {
                    Util.modal('空气质量预报发布', '更新成功！')
                    $('textarea').val('')
                    Session.set('_id', '')
                    $('#date').val(moment(new Date()).format('YYYY-MM-DD'));
                    var city = parseInt($('#city').val())
                    var county = parseInt($('#county').val())
                    if (!isNaN(city) && !isNaN(county)) {
                        var select = false;
                        $('#county option').each(function () {
                            var county = parseInt($(this).attr('value'))
                            if (county > city && county < (city + 100)) {
                                $(this).show()
                                if (!select) {
                                    select = true;
                                    $('#county').val(county)
                                }
                            } else {
                                $(this).hide()
                            }
                        })
                    }
                }
            })
        }
    },
    'click .cancel': function () {
        $('textarea').val('')
        Session.set('_id', '')
        $('#date').val(moment(new Date()).format('YYYY-MM-DD'));
        var city = parseInt($('#city').val())
        var county = parseInt($('#county').val())
        if (!isNaN(city) && !isNaN(county)) {
            var select = false;
            $('#county option').each(function () {
                var county = parseInt($(this).attr('value'))
                if (county > city && county < (city + 100)) {
                    $(this).show()
                    if (!select) {
                        select = true;
                        $('#county').val(county)
                    }
                } else {
                    $(this).hide()
                }
            })
        }
    },
    'click .edit': function () {
        $('#date').val(moment(this.date).format('YYYY-MM-DD'));
        $('#city').val(this.cityCode);
        $('#county').val(this.countyCode);
        $('textarea').val(this.content);
        Session.set('_id', this._id)
    },
    'click .remove': function () {
        AirQuality.remove({_id: this._id}, function (err) {
            if (err)
                Util.modal('空气质量预报发布', err)
            else {
                Util.modal('空气质量预报发布', '删除成功！')
            }
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

Template.airQualityPublish.onRendered(function () {
        Session.set('_id', '')
        $('#date').val(moment(new Date()).format('YYYY-MM-DD'));
        var city = parseInt($('#city').val())
        var county = parseInt($('#county').val())
        if (!isNaN(city) && !isNaN(county)) {
            var select = false;
            $('#county option').each(function () {
                var county = parseInt($(this).attr('value'))
                if (county > city && county < (city + 100)) {
                    $(this).show()
                    if (!select) {
                        select = true;
                        $('#county').val(county)
                    }
                } else {
                    $(this).hide()
                }
            })
        }
    }
)
;

Template.airQualityPublish.onCreated(function () {

    }
);
