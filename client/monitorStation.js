/**
 * Created by bai on 2015/9/7.
 */

Template.monitorStation.helpers({
    cityList: function () {
        return Area.find({$and: [{code: {$mod: [100, 0]}}, {code: {$not: {$mod: [10000, 0]}}}]}, {sort: {code: 1}});
    },
    stationList: function () {
        return Station.find()
    },
    countyList: function (countyCode, UniqueCode) {
        var code = countyCode ? Math.floor(countyCode / 100) * 100 : Math.floor(UniqueCode / 100000) * 100;
        var a = Area.find({$and: [{code: {$gte: code}}, {code: {$lt: code + 100}}]}, {sort: {code: 1}}).fetch();
        var cCode = countyCode ? countyCode : Math.floor(UniqueCode / 1000)
        a.forEach(function (e) {
            if (e.code == cCode)
                e.selected = 'selected'
        })
        return a;
    }
});

Template.monitorStation.events({
    'change select.cityList': function () {
        var city = parseInt($('select.cityList').val())
        $('tbody tr').each(function () {
            var position = parseInt($(this).children().first().text())
            if (position > city * 1000 && position < (city + 1) * 1000) {
                $(this).show()
            } else {
                $(this).hide()
            }
        })
    },
    'change select.countyList': function () {
        var id = this._id;
        var countyCode = parseInt($('#' + id + ' select').val())
        var countryName = $('#' + id + ' select').find("option:selected").text();
        Station.update({_id: id}, {$set: {countyCode: countyCode, countyName: countryName}}, function (err) {
            if (err)Util.modal('发布点位管理', err)
            else
                Util.modal('发布点位管理', '修改成功！')
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
        var city = parseInt($('select.cityList').val())
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