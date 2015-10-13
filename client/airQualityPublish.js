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
    warningList: function () {
        var w = Warning.find({}, {sort: {timestamp: -1}}).fetch()
        w.forEach(function (e) {
            e.moment = moment(e.timestamp).format('YYYY-MM-DD')
        })
        return w;
    }
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
            Util.modal('紧急污染告警信息发布', '发布内容为空！')
            return;
        }
        Warning.insert({
            content: content,
            cityCode: parseInt($('select').val()),
            cityName: $('select').find("option:selected").text()
        }, function (err, id) {
            if (err)
                Util.modal('紧急污染告警信息发布', err)
            else {
                $('textarea').val('')
                Util.modal('紧急污染告警信息发布', '发布成功！')
            }

        });
    },
    'click .cancel': function () {
        $('textarea').val('')
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
