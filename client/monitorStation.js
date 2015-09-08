/**
 * Created by bai on 2015/9/7.
 */

Template.monitorStation.helpers({
    cityList: function () {
        return Area.find()
    },
    stationList: function () {
        return Station.find()
    }
});

Template.monitorStation.events({
    'change select': function () {
        var city = parseInt($('select').val())
        $('tbody tr').each(function () {
            var position = parseInt($(this).children().first().text())
            if (position > city * 1000 && position < (city + 1) * 1000) {
                $(this).show()
            } else {
                $(this).hide()
            }
        })
    },
    'click .enable': function () {
        Station.update({_id: this._id}, {$set: {enableStatus: !this.enableStatus}}, function (err) {
            if (err)Util.modal('发布点位管理', err)
        })
    },
    'click .publish': function () {
        Station.update({_id: this._id}, {$set: {publishStatus: !this.publishStatus}}, function (err) {
            if (err)Util.modal('发布点位管理', err)
        })
    },
});

Template.monitorStation.onRendered(function () {
        var city = parseInt($('select').val())
        var tr = $('tbody tr').length
        if (!isNaN(city) && tr != 0) {
            $('tbody tr').each(function () {
                var position = parseInt($(this).children().first().text())
                if (position > city * 1000 && position < (city + 1) * 1000) {
                    $(this).show()
                } else {
                    $(this).hide()
                }
            })
        }
    }
);

Template.monitorStation.onCreated(function () {
    }
);