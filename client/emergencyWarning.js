/**
 * Created by bai on 2015/9/7.
 */

Template.emergencyWarning.helpers({
    cityList: function () {
        return Area.find()
    },
    warningList: function () {
        var w = Warning.find({}, {sort: {timestamp: -1}}).fetch()
        w.forEach(function (e) {
            e.moment = moment(e.timestamp).format('YYYY-MM-DD')
        })
        return w;
    }
});

Template.emergencyWarning.events({
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
    }
});

Template.emergencyWarning.onRendered(function () {

    }
);

Template.emergencyWarning.onCreated(function () {

    }
);